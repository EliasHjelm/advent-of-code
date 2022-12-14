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

const numbers = lines.map(Number);

let iterations = 10;

for (let i = 0; i < iterations; i++) {

}

const packets = [[]];

lines.forEach(line => {
  if (line === '') {
    packets.push([]);
  } else {
    packets[packets.length - 1].push(JSON.parse(line));
  }
})

console.log('packets', packets);

const correct = [];

packets.forEach((pair, i) => {
  const [a, b] = pair;

  console.log('PAIR', i + 1, 'a, ',a, 'b', b);
  try {
    check(a, b);
    correct.push(i + 1);
  } catch (error) {
    console.error(error);
  }
});

function check(a, b) {

  if (typeof a === 'number' && typeof b === 'number') {
    if (b < a) {
      console.log('b', b, 'a', a);
      throw new Error('wrong order - right is bigger');
    }
    if (a < b) {
      return true;
    }
  } else if (typeof a === 'number' && Array.isArray(b)) {
    return check([a], b);
  } else if (typeof b=== 'number' && Array.isArray(a)) {
    return check(a, [b]);
  } else if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length === 0 && b.length !== 0) {
      return true;
    }
    if (a.length !== 0) {
      const found = range(0, a.length - 1).findIndex((i) => {
        if (typeof b[i] === 'undefined') {
          console.log('i', i);
          throw new Error('right side ran out first');
        }
        return check(a[i], b[i]);
      });

      if (found !== -1) {
        return true;
      }

      if (a.length < b.length) {
        return true;
      }

    }
  }
}

console.log('correct', correct);

console.log('ans', sum(correct));
