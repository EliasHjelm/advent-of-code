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


const es = lines.map(line => {

    const d = {
        '{': 0,
        '[': 0,
        '<': 0,
        '(': 0,
    };

    console.log('line', Object.fromEntries([...line].map((c, i) => [i, c])));
    let openings = [...line].map((c, i) => c in d ? i : null).filter(i => i !== null);

    console.log('line openings', openings);

    const error = [...line].find((c, index) => {
        let error = null;
        if (c in is) {
            
            const mostRecentOpeningIndex = Math.max(...openings.filter(o => o < index));
            console.log('closing chunk on ',index, c, ' - most recently opened', mostRecentOpeningIndex, '=', line[mostRecentOpeningIndex]);

            if (line[mostRecentOpeningIndex] !== is[c]) {
                console.log('got', c, 'expected', line[mostRecentOpeningIndex]);
                error = c;
            }

            openings = openings.filter(o => o !== mostRecentOpeningIndex);

        } else {
            console.log('opening chunk on',index, c);
        }

        return error;

    });

    console.log('LINE DONE error=', error);

    return error;
}).filter(Boolean);
const score = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};

console.log('es', es);

console.log('ans', es.reduce((acc, curr) => acc + score[curr], 0))
