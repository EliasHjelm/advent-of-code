let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

let x = 0;
let y = 0;

let aim = 0;

lines.forEach(line => {

    let [dir, n] = line.split(' ');

    n = Number(n);

    console.log('dir', dir, 'n', n);

    if (dir === 'forward') {
        x += n;
        y += (aim * n)
    } else if (dir === 'up') {
        aim -= n;
    } else if (dir === 'down') {
        aim += n;
    } else {
        console.error('unkknown', dir);
    }

    console.log('x', x, 'y', y);
});

console.log('answer', x * y);
