const range = require('../../utils/range');
const combinations = require('../../utils/combinations');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

const values = {
  X: 1,
  Y: 2,
  Z: 3,
};

const results = {
  A: {
    X: 3,
    Y: 6,
    Z: 0,
  },
  B: {
    X: 0,
    Y: 3,
    Z: 6,
  },
  C: {
    X: 6,
    Y: 0,
    Z: 3,
  },
};

const scores = lines.map(round => {
  console.log('round', round);
  const [a, b] = round.split(' ');

  const score = results[a][b] + values[b];

  return score;

});

const total = scores.reduce((a, c) => a + c);

console.log('total score', total);

