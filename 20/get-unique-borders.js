const getBorders = require('./get-borders');

const getUniqueBorders = (tile, patterns) => {

    const borders = getBorders(tile);

    const uniqueBorders = Object.keys(borders).filter(side => patterns[borders[side]] == 1);

    return uniqueBorders;
};

module.exports = getUniqueBorders;
