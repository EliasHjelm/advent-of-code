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

const objects = {};

lines.forEach((line, index) => {

  const points = line.split(' -> ');

  console.log('--------- LINE ', index, 'has ', points.length, 'points');

  points.forEach((point, i) => {
    const [x,y] = point.split(',').map(Number);

    const label = `${x}-${y}`;
    objects[label] = '#';

    const prevPoint = i ? points[i - 1] : null;

    console.log(`Point ${label} has prevPoint ${prevPoint}`);

    if (prevPoint) {
      const [prevX, prevY] = prevPoint.split(',').map(Number);

      const linePoints = combinations(range(x, prevX), range(y, prevY));

      console.log(`Draw a line from ${label} to ${prevX}-${prevY}`);

      linePoints.forEach(linePoint => {
        const [lineX, lineY] = linePoint;
        const lineLabel = `${lineX}-${lineY}`;
        objects[lineLabel] = '#';
        console.log(`Line goes through ${lineLabel}`);
      });
      console.log('Line done');
    }

  })
})

console.log('objects', objects);

const bottom = Math.max(...Object.keys(objects).map(key => key.split('-').map(Number)[1])) + 1;
console.log('bottom', bottom);

let sandCapacity = true;
let restingGrains = 0;
let grains = 0;

const pourSand = () => {
  console.log('pouring grain', grains++);
  let sandX = 500;
  let sandY = 0;

  let adjacent = [[500, 1], [499, 1], [501, 1]];

  while (adjacent.some(([x, y]) => {
    return objects[`${x}-${y}`] === undefined;
  }) && sandY <= bottom) {

    const [newX, newY] = adjacent.find(([adjX, adjY]) => !objects[`${adjX}-${adjY}`]);
    sandX = newX;
    sandY = newY;

    adjacent = [[sandX, sandY + 1], [sandX - 1, sandY + 1], [sandX + 1, sandY + 1]].filter(([x, y]) => y <= bottom);

  }

  console.log(`Grain ${grains} came to rest at ${sandX}-${sandY}`);
  objects[`${sandX}-${sandY}`] = 'o';
  restingGrains++;

  if (sandX === 500 && sandY === 0) {
    sandCapacity = false;
  }


}

while (sandCapacity) {
  pourSand();
}

console.log('RESTING GRAINS', restingGrains);