/**
 * Flip tile on specified axis
 */
const flipTile = (tile, axis) => {

    if (axis == 'h') {
        return tile.map(row => {
            return [...row].reverse().join('');
        });
    } else {
        return [...tile].reverse();
    }
};


// shorter flip function based on integer system
const flip = (tile, steps) => {

    if (steps == 0) return tile;
    if (steps == 1) return flipTile(tile, 'h');
    if (steps == 2) return flipTile(tile, 'v');
    if (steps == 3) return flipTile(flipTile(tile, 'h'), 'v');
};

module.exports = flip;
