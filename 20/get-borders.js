/**
 * Get borders from one tile
 * coded by index:
 * top 0
 * right 1
 * bottom 2
 * left 3
 */
const getBorders = (tile) => {

    const top = tile[0];
    const right = tile.map(row => row[row.length - 1]).join('');
    const bottom = tile[tile.length -1];
    const left = tile.map(row => row[0]).join('');

    return [
        top,
        right,
        bottom,
        left,
    ];

};

module.exports = getBorders;
