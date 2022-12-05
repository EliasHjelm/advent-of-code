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

const overlaps = lines.filter(pair => {

  const [a, b] = pair.split(',').map(r => {

    const [start, end] = r.split('-').map(c => Number(c));

    return range(start, end);
  });

  console.log('a', a, 'b', b);

  return a.every(s => b.includes(s)) || b.every(s => a.includes(s));
});

console.log('overlaps', overlaps.length);

// 5:20
