const input = require('fs').readFileSync('./input', 'utf-8');

const rows = input.split('\n');

let count = 0;

rows.forEach((row, index) => {

    // calculate position

    const stringLength = row.length;

    const indexToCheck = index * 3 % stringLength;

    if (row[indexToCheck] === '#') {

        ++count;
        // CRAASH
    } else {
        // no crash
    }
});

console.log('you hit', count, 'trees');

// the nasty one liner
const trees = require('fs').readFileSync('./input', 'utf-8').split('\n').reduce((trees, current, index) => trees + Number(current[index * 3 % current.length] === '#'), 0);

console.log('breeze', trees);
