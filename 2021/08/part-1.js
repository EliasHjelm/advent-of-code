const range = require('../../utils/range');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

const lengths = {};

lines.forEach(line => {
    const [input, output] = line.split(' | ');

    const outputVals = output.split(' ');

    outputVals.forEach(val => {

        lengths[val.length] = (lengths[val.length] || 0) + 1;

    });

});

console.log('lenghts', lengths);

// part 1

console.log('ans', lengths[2] + lengths[4] + lengths[3] + lengths[7])
