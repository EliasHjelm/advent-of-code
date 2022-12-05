const range = require('../../utils/range');
const combinations = require('../../utils/combinations');
const sum = require('../../utils/sum');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

const stacks = [];

let stacking = true;
lines.forEach(line => {

  if (/\[[A-Z]\]/.test(line)) {

    [...line].forEach((char, i) => {

      if (/[A-Z]/.test(char)) {
        const stack = Math.floor(i / 4);

        stacks[stack] = stacks[stack] || [];
        stacks[stack].push(char);
      }
    });
  }

  if (line.includes('move')) {

    const [_, n, __, from, ___ , to] = line.split(' ');

    for (let i = 0; i < n; i++) {

      stacks[+to - 1].unshift(stacks[+from - 1].shift());
    }
  }

console.log('stacks', stacks);
})

console.log(stacks.map(stack => stack[0]).join(''));
