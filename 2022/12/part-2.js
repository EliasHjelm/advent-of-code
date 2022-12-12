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

let start, goal;

const unvisited = new Set();
let cache = {};

const as = [];


lines.forEach((line,i) => {
  [...line].forEach((c,ii) => {
    if (c === 'S') {
      start = [i, ii];
    }
    cache[`${i}-${ii}`] = Number.MAX_SAFE_INTEGER;
    if (c === 'E') {
      goal = [i,ii];
      cache[`${i}-${ii}`] = 0;
    }
    if (c === 'a') {
      as.push(`${i}-${ii}`);
    }
    unvisited.add(`${i}-${ii}`);
  });
});

let current = `${goal[0]}-${goal[1]}`;


console.log('start', start, 'goal', goal, 'current', current);

console.log('unvisisted', unvisited);

let i = 0;

const calc = () => {

  const [x, y] = current.split('-').map(Number);
  const label = `${x}-${y}`;

  const adjacent = [];
  const currentHeight = lines[x][y] === 'E' ? 'z'.charCodeAt(0) : lines[x].charCodeAt(y);

  // console.log(current, x, y, 'current height', currentHeight);

  if (lines[x + 1]) {
    const height = lines[x + 1].charCodeAt(y);
    if (height >= currentHeight - 1 || height === 83) {
      adjacent.push([x + 1, y]);
    }
  }
  if (lines[x][y + 1]) {
    const height = lines[x].charCodeAt(y + 1);
    if (height >= currentHeight - 1 || height === 83) {
      adjacent.push([x,y+1]);
    }
  }
  if (lines[x - 1]) {
    const height = lines[x - 1].charCodeAt(y);
    if (height >= currentHeight - 1 || height === 83) {
      adjacent.push([x - 1, y]);
    }
  }
  if (lines[x][y - 1]) {
    const height = lines[x].charCodeAt(y - 1);
    if (height >= currentHeight - 1 || height === 83) {
      adjacent.push([x,y-1]);
    }
  }

  adjacent.forEach(([x2, y2]) => {
    const label2 = `${x2}-${y2}`;
    const distance = Math.min(cache[label2], cache[label] + 1);
    cache[label2] = distance;
  });

  // console.log(`Current is ${current} - has ${adjacent.length} adjacent = ${adjacent.join(' , ')}`);
  unvisited.delete(label);

  if (unvisited.size > 0) {

    let min = Math.min(...[...unvisited].map(label => {
      // console.log('label', label, 'val', cache[label]);
      return cache[label]
      }
    ));

    // console.log('new min', min);

    unvisited.forEach(label => {
      if (cache[label] === min) {
        current = label;
        // console.log('NEXT IS', label);
      }
    });
  }

}

while (as.some(start => unvisited.has(`${start[0]}-${start[1]}`))) {
  // console.log('unvis', unvisited);
  calc();
}

console.log('done', cache);
console.log('ans', Math.min(...as.map(start => cache[start])));
