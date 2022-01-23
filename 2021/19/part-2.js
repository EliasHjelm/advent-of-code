const range = require('../../utils/range');
const combinations = require('../../utils/combinations');
const getPolarityVariations = require('./get-polarity-variations');
const getOrderVariations = require('./get-order-variations');
const getRelativePositions = require('./get-relative-positions');
const checkMatch = require('./check-match');
const restoreBeaconPositions = require('./restore-beacon-positions');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');

const scanners = input.split(/\n--- scanner \d{1,2} ---\n/).map(s => s.split('\n').slice(0, -1).map(s => s.split(',').map(Number)).filter(a => !a.includes(NaN)));

// this gets 48 rotations - not 24 as stated - but does it really matter? we will see
const getAllVariations = (beacons) => {
    const ov = getOrderVariations(beacons);
    const all = ov.flatMap(v => getPolarityVariations(v));
    const allRelative = all.flatMap(v => getRelativePositions(v));
    return allRelative;
};

// goal: get all scanners relative positions to scanner 0
let scannersWithOffsets = scanners.map((beacons, i) => {

    if (!i) {
        return {
            beacons,
            offset: [0, 0, 0],
        };
    } else {
        return {
            beacons,
            offset: null,
        };
    }

});

let sanity = 0;
let limit = 1000;

while (scannersWithOffsets.some(scanner => !scanner.offset) && ++sanity < limit) {
    console.log('going once');

    const unknowns = scannersWithOffsets.filter(scanner => !scanner.offset);
    const knowns = scannersWithOffsets.filter(scanner => scanner.offset);

    // for each unknown scanner ...
    unknowns.forEach(unknown => {

        // ... try to find an overlap with a known once
        knowns.find(known => {

            // dont rotate known scanner
            const as = getRelativePositions(known.beacons);
            // rotate unknown scanner
            const bs = getAllVariations(unknown.beacons);

            let matches = null;
            let matchedIndex = null;

            for (const a of as) {

                for (let i = 0; i < bs.length; i++) {

                    const b = bs[i];

                    if (checkMatch(a.beacons, b.beacons)) {

                        matches = [a, b];
                        matchedIndex = i;
                        break;
                    }
                }

                if (matches) break;
            }

            if (matches) {

                const [a, b] = matches;

                // figure out unknown scanners pos relative to known scanner
                const relativeOffset = a.offset.map((v, i) => {

                    return v - b.offset[i];
                });

                // rotate previously unknown scanner to match rotation of scanner 0
                const bBeacons = restoreBeaconPositions(b);
                // add new offset to existing offset to get offset from scanner 0
                const bOffset = known.offset.map((v, i) => {

                    return v + relativeOffset[i];
                });

                // lazily update object
                unknown.beacons = bBeacons;
                unknown.offset = bOffset;

            }

            return matches;
        })
    })
}

// get all beacons relative to scanner 0
const beaconsRelativeToHome = scannersWithOffsets.flatMap(restoreBeaconPositions);


const scannerOffsets = scannersWithOffsets.map(scanner => scanner.offset);

console.log('scanner offset', scannerOffsets);

const distances = scannerOffsets.flatMap(a => {

    const values = a;

    const distances = scannerOffsets.map(b => {

        const bValues = b;

        return bValues.reduce((acc, current, i) => {

            return acc + Math.abs(values[i] - current);
        }, 0);
    });

    return distances;
});

console.log('biggest', Math.max(...distances));