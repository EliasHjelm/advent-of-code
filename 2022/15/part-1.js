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

const points = {};
const specials = {};
const beacons = new Set();

const lineToCheck = 2000000;
// const lineToCheck = 10;

lines.forEach(line => {

  const matches = line.match(/-?\d+/g).map(Number);
  console.log('matches', matches);

  const [sensorX, sensorY, beaconX, beaconY] = matches;

  specials[`${sensorX}_${sensorY}`] = 'S';
  specials[`${beaconX}_${beaconY}`] = 'B';

  if (beaconY === lineToCheck) {
    beacons.add(`${beaconY}_${beaconX}`);
  }

  const diffX = Math.abs(sensorX - beaconX);
  const diffY = Math.abs(sensorY - beaconY);

  const totalDiff = diffX + diffY;

  range(0, totalDiff).forEach(diffy => {

    const diffx = totalDiff - diffy;

    const row1 = sensorY + diffy;
    const row2 = sensorY - diffy;

    const xStart = sensorX - diffx;
    const xEnd = sensorX + diffx;

    points[row1] = points[row1] || [];
    points[row2] = points[row2] || [];

    points[row1].push([xStart, xEnd]);
    points[row2].push([xStart, xEnd]);

  });

});

let beaconCount = beacons.size;


const checkOverlap = (array, [a, b]) => {
  return array.filter(([aa, bb]) => (aa >= a && aa <= b) || (bb >= a && bb <= b) );
}

const consolidateRow = (row) => {

  let newRow = [...row];
  while (newRow.some(range => checkOverlap(newRow, range).length > 1)) {

    newRow.forEach(([a, b]) => {
      const overlaps = checkOverlap(newRow, [a, b]);

      if (!overlaps.length) {
        // newRow.push([a, b]);
      } else {
        const min = Math.min(...overlaps.flat());
        const max = Math.max(...overlaps.flat());
        newRow = newRow.filter(range => !overlaps.includes(range));
        newRow.push([min, max]);
      }
    });
    
    // row = newRow;
  }
  return newRow;
}

const consolidated = {};


for (const row in points) {
  // consolidated[row] = consolidateRow(points[row]);
}

const min = Math.min(...Object.values(consolidated).flat(3));
const max = Math.max(...Object.values(consolidated).flat(3));


Object.keys(consolidated).sort((a, b) => a- b).forEach(key => {
  const row = consolidated[key];
  const pop = [key.padStart(3, '0'), ': '];
  let i = 1;
  range(min, max).forEach(x => {
    let val = row.some(([a, b]) => x >= a && x <= b) ? '#' : '..';
    const label = `${x}_${key}`;
    if (specials[label]) {
      val = specials[label];
    }
    if (val === '#') {
      val = i++;
    }
    pop.push(String(val).padStart(2, ' '));
  });
  pop.push(' = ', row.reduce((total, [a, b]) => total + b - a + 1, 0));
  console.log(pop.join(''));

});

const row = consolidateRow(points[lineToCheck]);

console.log('ans', row.reduce((total, [a, b]) => total + b - a + 1, 0) - beaconCount);
