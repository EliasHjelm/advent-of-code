const range = require('../../utils/range');
const combinations = require('../../utils/combinations');
const sum = require('../../utils/sum');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);

const msg = [...lines[0]];

let start;
let end;

msg.forEach((c, i) => {

  if (i < 13) {
    return;
  }

  const seq = msg.slice(i - 13, i + 1);

  console.log('seq', seq);

  if (new Set(seq).size === 14) {
    // hit

    if (!start) {
      start = i + 1;
    } else {
       
    }
  }
});
console.log('start', start);