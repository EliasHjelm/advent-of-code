const range = require('../../utils/range');
const combinations = require('../../utils/combinations');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

const elves = [[]];

let pointer = 0;

lines.forEach(line => {
  if (line === '') {
    pointer++;
  }
  elves[pointer] = elves[pointer] || [];
  elves[pointer].push(Number(line));
});

console.log('elves', elves);

const max = Math.max(...elves.map(elf => elf.reduce((acc, curr) => acc + curr)));


console.log(',ax', max);

const sorter = elves.sort((a, b) => b.reduce((acc, curr) => acc + curr) - a.reduce((acc, curr) => acc + curr));

console.log('sorted', sorter);

const top = sorter.slice(0, 3);

console.log('top ', top.length);

const cals = top.map(elf => elf.reduce((acc, curr) => acc + curr)).reduce((a, c ) => a + c);

console.log('top 3 cals', cals);
