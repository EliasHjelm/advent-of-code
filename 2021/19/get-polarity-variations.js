const range = require('../../utils/range');
const combinations = require('../../utils/combinations');

const getPolarityVariations = (beacons) => {

    const variations = [];

    // get all possible configurations of inverting axes
    combinations([0,1], [0,1], [0,1]).forEach(codex => {

        const variation = beacons.map(beacon => {

            return beacon.map((n, i) => {
                if (codex[i]) {
                    return n * -1;
                } else {
                    return n;
                }
            });

        });

        variations.push(variation);
    });

    return variations;
}

module.exports = getPolarityVariations
