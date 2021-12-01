const range = require('../utils/range');
/**
 * 
 * Rotate tile 90 deg clockwise
 */
const rotateTile = (tile) => {

    // size of square tile
    const size = tile.length - 1;

    // create \empty\ rows
    const newTile = range(0, size).map(() => range(0, size)); 


    // put characters in the right place
    tile.forEach((row, i) => {

        [...row].forEach((c, ii) => {
            newTile[ii][size - i] = c;
        });
    });

    return newTile.map(row => row.join(''));
};

// short rotate function
const rotate = (tile, steps) => {

    let count = 0;
    let newTile = [...tile];

    while (count++ < steps) {
        newTile = rotateTile(newTile);
    }

    return newTile;
}

module.exports = rotate;

