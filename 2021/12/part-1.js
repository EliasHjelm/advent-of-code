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

});

console.log('connections', connections);

let paths = [['end']];

let sanity = 0;

const checkPathValidity = (path) => {

    const smallCaves = path.filter(cave => /[a-z]+/.test(cave));

    return new Set(smallCaves).size == smallCaves.length;
}

while (paths.some(path => path[0] !== 'start') && sanity++ < 500) {

    paths = paths.flatMap(path => {

        if (path[0] == 'start') {
            return [path];
        }

        const conns = connections[path[0]];

        return conns.map(conn => [conn, ...path]).filter(checkPathValidity);
    });

    console.log(sanity, 'paths', paths.length);
}

console.log('total', paths.length, 'paths');

