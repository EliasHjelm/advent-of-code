const range = require('../../utils/range');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

const is = {
    '}': '{',
    ']': '[',
    '>': '<',
    ')': '(',
};

const vals = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
};


const inc = lines.map(line => {

    const d = {
        '{': 0,
        '[': 0,
        '<': 0,
        '(': 0,
    };

    let openings = [...line].map((c, i) => c in d ? i : null).filter(i => i !== null);

    const error = [...line].find((c, index) => {
        let error = null;
        if (c in is) {
            
            const mostRecentOpeningIndex = Math.max(...openings.filter(o => o < index));

            if (line[mostRecentOpeningIndex] !== is[c]) {
                error = c;
            }

            openings = openings.filter(o => o !== mostRecentOpeningIndex);

        } else {
        }

        return error;

    });

    console.log('LINE DONE error=', error);
    if (!error) {
        console.log('openings left', openings);
        const score = openings.reverse().reduce((acc, curr) => {

            console.log('curr', curr, line[curr], vals[line[curr]]);




            return 5 * acc + vals[line[curr]];
        },0)
        console.log('line', line, 'score', score);
        return score;
    }

    return null;
}).filter(l => l !== null);

inc.sort((a, b) => a - b);

console.log('ans', inc[(inc.length - 1)  / 2])