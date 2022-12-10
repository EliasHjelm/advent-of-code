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

const head = [[0,0]];
const tails = new Array(9).fill(null).map(_ => [[0,0]]);

console.log('tail', tails);

const moveHeadLeft = () => {
  const pos = head[head.length - 1];
  const newPos = [pos[0] - 1, pos[1]];
  head.push(newPos);
}

const moveHeadRight = () => {
  const pos = head[head.length - 1];
  const newPos = [pos[0] + 1, pos[1]];
  head.push(newPos);
}

const moveHeadUp = () => {
  const pos = head[head.length - 1];
  const newPos = [pos[0], pos[1] + 1];
  head.push(newPos);
}

const moveHeadDown = () => {
  const pos = head[head.length - 1];
  const newPos = [pos[0], pos[1] - 1];
  head.push(newPos);
}

const yankTail = (n) => {
  const headPos = n ? tails[n - 1][tails[n-1].length - 1] : head[head.length - 1];
  const tailPos = tails[n][tails[n].length - 1];

  const xDiff = Math.abs(headPos[0] - tailPos[0]);
  const yDiff = Math.abs(headPos[1] - tailPos[1]);

  const isTouching = xDiff <= 1 && yDiff <= 1;

  if (!isTouching) {
    let newX = tailPos[0];
    let newY = tailPos[1];

    if (xDiff > 0) {
      if (headPos[0] < tailPos[0]) {
        newX--;
      } else {
        newX++;
      }
    }

    if (yDiff > 0) {
      if (headPos[1] < tailPos[1]) {
        newY--;
      } else {
        newY++;
      }
    }

    tails[n].push([newX, newY]);
  }
}

for (const line of lines) {
  const [d, n] = line.split(' ');

  range(1, +n).forEach(s => {

    if (d == 'L') {
      moveHeadLeft()
    } else if (d == 'R') {
      moveHeadRight();
    } else if (d == 'U') {
      moveHeadUp();
    } else if (d == 'D') {
      moveHeadDown();
    }

    range(0, 8).forEach((tail) => {
      yankTail(tail);
    });

  });
}

console.log(new Set(tails[8].map(t => t.join('-'))).size);
