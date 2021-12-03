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

    gamma[pos] = Number(count1 > lines.length / 2);
    epsilon[pos] = Number(!gamma[pos]);

});

console.log('gamma', gamma);
console.log('epsiolon', epsilon);

const valG = parseInt(gamma.join(''), 2);
const valE = parseInt(epsilon.join(''), 2);

// part 1
console.log('answer', valG * valE);

let oxy = [ ...lines ];
let co2 = [ ...lines ];

let oi = 0;
let ci = 0;

while (oxy.length > 1) {

    const count1 = oxy.filter(line => {
        return line[oi] === '1';
    }).length;

    const filter = count1 >= oxy.length / 2;

    // console.log('filter', filter);

    oxy = oxy.filter(line => line[oi] == Number(filter));

    oi++;

}

while (co2.length > 1) {

    const count1 = co2.filter(line => {
        return line[ci] === '1';
    }).length;

    const filter = count1 >= co2.length / 2;

    console.log('filter', filter);

    co2 = co2.filter(line => line[ci] == Number(!filter));

    ci++;

}
console.log('co2', co2);

console.log('oxy', oxy);

const valC = parseInt(co2.join(''), 2);
const valO = parseInt(oxy.join(''), 2);

console.log('ans', valC * valO);



