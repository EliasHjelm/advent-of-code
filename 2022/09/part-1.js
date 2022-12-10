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
const tail = [[0,0]];

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

const yankTail = () => {
  const headPos = head[head.length - 1];
  const tailPos = tail[[tail.length - 1]];

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

    tail.push([newX, newY]);
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

    yankTail();

    console.log('HEAD', head[head.length - 1], 'TAIL', tail[tail.length - 1]);
  });
}

console.log('tail', tail);



console.log(new Set(tail.map(t => t.join('-'))).size);
