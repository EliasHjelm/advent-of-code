const range = require('../../utils/range');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

let gamma = [];
let epsilon = [];


range(0, lines[0].length - 1).forEach(pos => {

    const count1 = lines.filter(line => {

        return Boolean(Number(line[pos]));
    }).length;

    console.log('ones', )

    gamma[pos] = Number(count1 > lines.length / 2);
    epsilon[pos] = Number(!gamma[pos]);

});

console.log('gamma', gamma);
console.log('epsiolon', epsilon);

const valG = parseInt(gamma.join(''), 2);
const valE = parseInt(epsilon.join(''), 2);

console.log('answer', valG * valE);

