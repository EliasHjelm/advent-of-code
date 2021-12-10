const combinations = require('../../utils/combinations');
const range = require('../../utils/range');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1).map(s => [...s].map(Number));

const basins = [];

function getConnected(x, y) {

    const val = lines[x]?.[y];

    if (val === undefined || val == 8) return [];

    const adjacent = [[x-1,y], [x+1,y], [x,y-1], [x,y+1]];

    const connected = adjacent.filter(([x,y]) => lines[x]?.[y] > val && lines[x]?.[y] !== 9);

    return connected;

};

combinations(range(0, lines.length - 1), range(0, lines[0].length - 1)).forEach(([x, y]) => {

    const adjacent = [lines[x-1]?.[y], lines[x+1]?.[y], lines[x][y+1], lines[x][y-1]].filter(v => v !== undefined);

    const val = lines[x][y];

    if (adjacent.every(v => v > val)) {

        // console.log('low point', x, y);

        const basin = [[x, y]]

        let toCheck = [[x, y]];

        while (toCheck.some(c => getConnected(...c).length)) {
            const connected = toCheck.flatMap(tc => getConnected(...tc));
            basin.push(...connected);
            toCheck = connected;
        }

        basins.push(basin);
    }

});


const unique = basins.map(basin => [ ...new Set(basin.map(p => p.join('-')))]);


unique.sort((a, b) => b.length - a.length);

const ans = unique.slice(0, 3).reduce((acc, curr) => acc * curr.length, 1);

console.log('ans', ans);
