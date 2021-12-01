const range = require('../utils/range');
const getUniqueBorders = require('./get-unique-borders');
const getBorders = require('./get-borders');
const flip = require('./flip');
const rotate = require('./rotate');
const removeBorders = require('./remove-borders');
const countSeaMonsters = require('./count-sea-monsters');

let input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');

const patterns = {};

const tiles = input.split('\n\n').slice(0, -1).map(t => {
    
    const n = t.split('\n')[0].split(' ')[1].slice(0, -1);
    const tile = t.split('\n').slice(1);

    // get original borders of tile;
    const borders = getBorders(tile);

    /**
     * Each tile can be rotated four ways and flipped four ways
     * store this as rotation in steps clockwise (0-3), and flipped in 'steps' 0-3 (no flip, horizontal flip, vertical flip, both flips)
     * store the borders for each variation
     */

    const variations = range(0, 3).map(rotation => {

        const flipz = range(0, 3).map(f => {

            return flip(tile, f);
        });

        const rotated = flipz.map((tile, i) => rotate(tile, rotation));

        return rotated;
    });

    const borderVariations = variations.map(tiles => {

        return tiles.map(getBorders);
    });


    return {
        n,
        tile,
        variations,
        borderVariations,
        borders,
    };

});


/**
 * Count occurences of border patterns
 * When doing this, you spot that each pattern appears in exactly 1 or two tiles
 */
tiles.forEach(tile => {

    const borders = getBorders(tile.tile);

    Object.values(borders).forEach(pat => {
        const inverted = [...pat].reverse().join('');
        patterns[pat] = (patterns[pat] || 0) + 1;
        patterns[inverted] = (patterns[inverted] || 0) + 1;
    });
});


const cornerTiles = tiles.filter(({ tile }) => getUniqueBorders(tile, patterns).length == 2);

const puzzle = range(1, 12).map(_ => []);

// put one corner tile in the top left corner
puzzle[0].push(cornerTiles[0]);

// rotate until unique borders are facing top and left
while (getUniqueBorders(puzzle[0][0].tile, patterns).join('') !== '03') {
    puzzle[0][0].tile = rotate(puzzle[0][0].tile, 1);
}

// lay one piece at a time until puzzle is complete
while (puzzle.some(row => row.length < 12)) {

    // establish the current row we are working on, and the previous row
    const rowIndex = puzzle.findIndex(row => row.length < 12);
    const row = puzzle[rowIndex];
    const prevRow = puzzle[rowIndex - 1] || [];

    const prevPiece = row[row.length - 1];
    const abovePiece = prevRow[row.length];

    const prevBorders = prevPiece ? getBorders(prevPiece.tile) : [];
    const aboveBorders = abovePiece ? getBorders(abovePiece.tile) : [];

    // this is what is above and to the left of the piece we are laying
    const leftBorder = prevBorders[1];
    const aboveBorder = aboveBorders[2];

    // this solution is based on the fact that each border pattern appears only once or twice - ie this array should only contain one
    // possible fit
    const possibleFits = tiles.filter(tile => {

        const uniqueLeft = prevPiece ? tile.n !== prevPiece.n : true;
        const uniqueTop = abovePiece ? tile.n !== abovePiece.n : true;

        return uniqueLeft && uniqueTop && tile.borderVariations.some(rotations => {
            return rotations.some(set => {
                return set.some(border => {
                    return border === aboveBorder || border === leftBorder;
                });
            });
        });
    });

    // get the variation that fits
    const bestFit = possibleFits[0].variations.flat(1).find(tile => {
        const borders = getBorders(tile);

        const conditionLeft = leftBorder ? borders[3] == leftBorder : true;
        const conditionAbove = aboveBorder ? borders[0] == aboveBorder : true;

        return conditionAbove && conditionLeft;
    });

    row.push({
        n: possibleFits[0].n,
        tile: bestFit,
    });


}

/**
 * Picture built successfully
 * strip borders
 */
const withoutBorders = puzzle.map(row => row.map(tile => removeBorders(tile.tile)));

/**
 * Join the tiles into one unit
 */
const megaPuzzle = range(0, (12 * 8) - 1).map(row => {

    // row in above puzzle made up of tiles
    const puzzleRow = Math.floor(row / 8);
    // row in each tile
    const tileRow = row % 8;
    // get the correct row in each tile
    const complete = withoutBorders[puzzleRow].map(tile => {

        return tile[tileRow];
    });

    // put them together
    return complete.join('');


});

console.log('mega puzzle', megaPuzzle);

/**
 * Test all variations of flip/rotation
 */
const puzzleVariations = range(0, 3).map(rotation => {

    const flipz = range(0, 3).map(f => {

        return flip(megaPuzzle, f);
    });

    const rotated = flipz.map((puzz, i) => rotate(puzz, rotation));

    return rotated;
});

// this should be mostly 0s, and one value appearing twice
const monsterCounts = puzzleVariations.flat().map(countSeaMonsters);

const seaMonsterCount = Math.max(...monsterCounts);

/**
 * Count hashes
 */
const hashesInWater = [...megaPuzzle.join('')].filter(c => c == '#').length;

console.log(`There are ${seaMonsterCount} sea monsters and ${hashesInWater} hashes in the water`);

/**
 * Subtract sea monsters from hashes to determine roughness
 */
const roughness = hashesInWater - (15 * seaMonsterCount);

// answer
console.log(`The water roughness is ${roughness}`);
