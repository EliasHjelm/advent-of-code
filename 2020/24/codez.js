const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

const dirs = {
    e: {
        x: 2,
    },
    se: {
        x: 1,
        y: -1,
    },
    sw: {
        x: -1,
        y: -1,
    },
    w: {
        x: -2,
    },
    nw: {
        x: -1,
        y: 1,
    },
    ne: {
        x: 1,
        y: 1,
    },
};

let blackTiles = [];

lines.forEach(line => {

    const tile = {
        x: 0,
        y: 0,
    };

    let i = 0;

    while (i < line.length) {

        let instr = line[i];

        if (instr == 'n' || instr == 's') {
            instr = line.slice(i, i + 2);
            i++;
        } 
        i++;

        tile.x += dirs[instr].x;
        tile.y += (dirs[instr].y || 0);
    };


    const tstring = JSON.stringify(tile);

    if (!blackTiles.includes(tstring)) {
        blackTiles.push(tstring);
    } else {
        blackTiles = blackTiles.filter(t => t !== tstring);
    }
});

console.log('blac tiles', blackTiles.length);

/**
 * Part 2
 */

const getAdjacentTiles = (tile) => {
    const { x, y } = JSON.parse(tile);

    const adjacentDiffs = Object.values(dirs);

    const adjacentTiles = adjacentDiffs.map(diff => {

        return JSON.stringify({
            x: x + diff.x,
            y: y + (diff.y || 0),
        });
    });

    return adjacentTiles;
};

const flipTiles = (blackTiles) => {

    // bc of flipping logic, we only need to look at tiles adjacent to black tiles + all black tiles
    const tilesToCheck = new Set(blackTiles);

    let newBlackTiles = [...blackTiles];

    /**
     * helper function to flip a tile
     */
    const flipTile = (tile) => {

        if (newBlackTiles.includes(tile)) {
            newBlackTiles = newBlackTiles.filter(t => t !== tile);
        } else {
            newBlackTiles.push(tile);
        }
    }

    /**
     * Add all adjacent tiles to the black tiles to tilesToCheck
     */
    blackTiles.forEach(tile => {

        const adjacentTiles = getAdjacentTiles(tile);

        adjacentTiles.forEach(tile => {
            tilesToCheck.add(tile);
        });
    });

    /**
     * Check each tile and flip accordingly
     */
    tilesToCheck.forEach(tile => {

        const blackTile = blackTiles.includes(tile);

        const adjacentTiles = getAdjacentTiles(tile);

        const adjacentBlackTiles = adjacentTiles.filter(tile => blackTiles.includes(tile));

        if (blackTile && (adjacentBlackTiles.length === 0 || adjacentBlackTiles.length > 2)) {
            flipTile(tile);
        }
        if (!blackTile && adjacentBlackTiles.length === 2) {
            flipTile(tile);
        }


    });

    return newBlackTiles;

}

let days = 0;

while (++days <= 100) {

    const newBlackTiles = flipTiles(blackTiles);

    blackTiles = newBlackTiles;

    console.log(`After ${days} days we have ${blackTiles.length} black tiles`);

}
