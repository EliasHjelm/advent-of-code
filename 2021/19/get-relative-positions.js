
/**
 * The default beacon positions are given relative to the scanner
 * This function returns one array for each beacon, containing
 * Each other beacons position relative to that beacon
 * @param {Array} beacons Array of beacons
 * @returns {Array} Array of beacons arrays
 */
const getRelativePositions = (beacons) => {

    // for each beacons position relative to scanner...
    const allRelativePositions = beacons.map(beacon => {

        // ... get the position of every beacon relative to that beacon ...
        const newBeacons =  beacons.map(beacon2 => {

            // ... by transforming the x, y, z coordinates ...
            return beacon2.map((val, i) => {

                // ... to make the original beacon '0, 0, 0'
                return val - beacon[i];
            });

        });

        const offset = beacon;

        return {
            offset,
            beacons: newBeacons,
        };
    });

    return allRelativePositions;

};

module.exports = getRelativePositions;
