const combinations = require('../utils/combinations');
const range = require('../utils/range');

const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

let grid = {
    0: Object.fromEntries(lines.map((line, index) => {

        return [
            index,
            Object.fromEntries([...line].entries())
        ];
    })),
};

let grid4d = {
    0: {
        0: Object.fromEntries(lines.map((line, index) => {
            return [
                index,
                Object.fromEntries([...line].entries())
            ];
        })),

    }
};

/**
 * z, x, y, w.. whatever
 */
const get4d = (z,x,y,w) => {

    try {
        return grid4d[z][x][y][w] || '.';
    } catch {
        return '.';
    }
};


const get = (z,x,y) => {

    try {
        return grid[z][x][y] || '.';
    } catch {
        return '.';
    }
};


let turns = 0;

while (++turns <= 6) {

    const newGrid = {};

    const zDims = Object.keys(grid4d);
    const xDims = Object.keys(grid4d[0]);
    const yDims = Object.keys(grid4d[0][0]);
    const wDims = Object.keys(grid4d[0][0][0]);


    const zToCheck = range(Math.min(...zDims) -1, Math.max(...zDims) +1);
    const xToCheck = range(Math.min(...xDims) -1, Math.max(...xDims) + 1);
    const yToCheck = range(Math.min(...yDims) -1, Math.max(...yDims) + 1); 
    const wToCheck = range(Math.min(...wDims) -1, Math.max(...wDims) + 1); 

    const toCheck = combinations(zToCheck, xToCheck, yToCheck, wToCheck);

    toCheck.forEach(([z,x,y,w]) => {

        let cube= get4d(z, x, y, w);

        const neighborCubes = combinations(range(z-1, z+1), range(x-1, x+1), range(y-1, y+1), range(w-1, w+1)).map(([z1, x1, y1, w1]) => {
            if (z1 == z && x1 == x && y1 == y && w1 == w) {
                return null;
            } else {
                return {
                    val: get4d(z1, x1, y1, w1),
                    coords: [z1, x1, y1, w1],
                };
            }
        }).filter(Boolean);

        let newVal = '.';
        const nearbyActive = neighborCubes.filter(c => c.val === '#').length;

        if (cube === '#') {

            if (nearbyActive === 2 || nearbyActive === 3) {
                newVal = '#';
            }
        } else if (nearbyActive === 3) {
            newVal = '#';
        }

            newGrid[z] = newGrid[z] || {};
            newGrid[z][x] = newGrid[z][x] || {};
            newGrid[z][x][y] = newGrid[z][x][y] || {};
            newGrid[z][x][y][w] = newVal;

    });

    grid4d = newGrid;


    /**
     * Cool looking console logs
     */
    for (const z in newGrid) {

        const next = newGrid[z];

        for (const w in next) {

            const entries = next[w];

            const sorted = Object.keys(entries).sort((a, b) => a - b);
    
            const values = sorted.map(x => entries[x]);
    
            const sortedValues = values.map(val => Object.keys(val).sort((a, b) => a-b).map(y => val[y]).join(''));
    
    
            console.log(`Z: ${z} W:${w}`);
            sortedValues.forEach(v => console.log(v))
        }

    }
}


/**
 * Dig up the answer
 */
const cubes = Object.values(grid4d).flatMap(x => Object.values(x).flatMap(y => Object.values(y).flatMap(w => Object.values(w))));

console.log('cubes', cubes.filter(c => c !== '.'))

const active = cubes.filter(c => c === '#');

console.log(`Active cubes ${active.length}`);



