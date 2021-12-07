const range = require('../../utils/range');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

const numbers = lines[0].split(',').map(Number);


const max = Math.max(...numbers);
const min = Math.min(...numbers);

console.log('max', max, 'min', min);

const costsByPos = range(min, max).map(pos => {

    const total = numbers.reduce((acc, curr) => {
        return acc + Math.abs(curr - pos);
    }, 0);

    return {
        pos,
        total,
    };
});

console.log('done');

costsByPos.sort((a, b) => a.total - b.total);

console.log(costsByPos[0], costsByPos[costsByPos.length - 1]);
