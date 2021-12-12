const range = require('../../utils/range');
const combinations = require('../../utils/combinations');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t3'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

const numbers = lines.map(Number);

let iterations = 10;

for (let i = 0; i < iterations; i++) {

}

const cache = {};

const connections = {};

lines.forEach(line => {
    const [c1, c2] = line.split('-');

    connections[c1] = connections[c1] || [];
    connections[c2] = connections[c2] || [];

    connections[c1].push(c2);
    connections[c2].push(c1);

    connections[c1].sort();
    connections[c2].sort();

});

console.log('connections', connections);

let paths = [['end']];

let sanity = 0;

const checkPathValidity = (path) => {

    // console.log('CHECK PATH VALIDITY', path);

    const smallCaves = path.filter(cave => /[a-z]+/.test(cave));

    const tooBig = smallCaves.some(cave => path.filter(c => cave == c).length > 2);

    let double = false;

    const doubles = [ ...new Set(smallCaves.filter(cave => {

        return smallCaves.filter(c => c == cave).length == 2;
    }))];

    const smallValid = doubles.length < 2 && !/start|end/.test(doubles[0]);

    const valid = smallValid && !tooBig;
    // console.log('PATH', path, 'smallcaves', smallCaves, 'doubles', doubles, 'valid s tb t', smallValid, tooBig , valid);
    return valid;

    return smallCaves.every(cave => {

        const visits = smallCaves.filter(c => c === cave).length;

        if (visits == 2 && !double && !/start|end/.test(cave)) {
            double = cave;
        }

        const valid = visits === 1 || (visits === 2 && double == cave);

        // console.log('small cave', cave, 'visists', visits, 'valid=', valid, '(dobule = ', double);

        return valid;

    });

}

while (paths.some(path => path[0] !== 'start') && sanity++ < 20) {

    paths = paths.flatMap(path => {

        if (path[0] == 'start') {
            return [path];
        }

        const conns = connections[path[0]];

        return conns.map(conn => [conn, ...path]).filter(checkPathValidity);
    });

    console.log(sanity, 'paths', paths.length);
    // console.log(sanity, 'paths', paths);
}

// 170658 -- wrong -- too high
// console.log('paths', paths);
console.log('total', paths.length, 'paths');

