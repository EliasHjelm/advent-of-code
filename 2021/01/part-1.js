const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
// console.log('input', lines);

const numbers = lines.map(Number);

let ref = null;

let count = 0;

for (const number of numbers) {

    if (ref !== null && number > ref) {
        ++count;
    }

    ref = number;
}

console.log('increased', count, 'times');
