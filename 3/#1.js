const input = require('./input.js');


const rows = input.split('\n');

console.log('rows', rows);

let count = 0;
let position = 0;

rows.forEach(row => {

    // calculate position

    const stringLength = row.length;

    const indexToCheck = position % stringLength;

    if (row[indexToCheck] === '#') {

        ++count;
        // CRAASH
    } else {
        // no crash
    }

    position += 3;
});

console.log('you hit', count, 'trees');

// the nasty one liner
const trees = require('fs').readFileSync('./input', 'utf-8').split('\n').reduce((trees, current, index) => trees + Number(current[index * 3 % current.length] === '#'), 0);

console.log('breeze', trees);
