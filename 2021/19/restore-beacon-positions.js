
/**
 * 
 * @param {Object} scanner Scanner object with beacons and offset
 * @returns {Array} Array of beacons with '0 offset'
 */
const restoreBeaconPositions = (scanner) => {

    return scanner.beacons.map(beacon => {

        return beacon.map((v, i) => {

            return v + scanner.offset[i];
        });
    });
};

module.exports = restoreBeaconPositions;
