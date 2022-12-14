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

const packets = [];

lines.forEach(line => {
  if (line === '') {
  } else {
    packets.push(JSON.parse(line));
  }
})

console.log('packets', packets);

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

packets.push([[2]], [[6]]);

packets.sort((a, b) => {

  try {
    check(a, b);
    return -1;
  } catch (error) {
    return 1;
  }
});

const x = packets.findIndex((packet) => Array.isArray(packet[0]) && packet[0][0] === 2 && packet.length === 1 && packet[0].length === 1);
const y = packets.findIndex((packet) => Array.isArray(packet[0]) && packet[0][0] === 6 && packet.length === 1 && packet[0].length === 1);
console.log('x', x, 'y', y);

const ans = (x + 1) * (y + 1);

console.log('ans', ans);

