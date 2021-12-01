let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
// console.log('input', lines);

const numbers = lines.map(Number);

let ref = null;

let count = 0;

let i = 0;

while (numbers[i+2] !== undefined) {

    const val = numbers[i] + numbers[i+1] + numbers[i+2];

    if (ref !== null && val > ref) {
        ++count;
    }

    ref = val;

    i++;
}


console.log('increased', count, 'times');
