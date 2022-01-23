
/**
 * Checks if at least 12 beacons are present in both sets
 * @param {Array} a Array of relative beacon positions
 * @param {Array} b Array of relative beacon positions
 * @returns {Boolean} true/false
 */
const checkMatch = (a, b) => {

    const aStrings = a.map(v => v.join(','));
    const bStrings = b.map(v => v.join(','));

    const matching = aStrings.filter(aString => {

        return bStrings.includes(aString);
    });

    // if (matching.length > 1) console.log('Matches:', matching.length);

    return matching.length >= 12;

};

module.exports = checkMatch;
