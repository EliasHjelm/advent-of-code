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
  X: 0,
  Y: 3,
  Z: 6,
};

const results = {
  A: {
    X: 3,
    Y: 1,
    Z: 2,
  },
  B: {
    X: 1,
    Y: 2,
    Z: 3,
  },
  C: {
    X: 2,
    Y: 3,
    Z: 1,
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

