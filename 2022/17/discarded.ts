import detectCollision2 from './detect-collision-2';

console.log(`Advent of code day 17 part 2`);

const shapes = [
  // horizontal line shape
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  // cross shape
  [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 2],
  ],
  // reverse L shape
  [
    [2, 2],
    [2, 1],
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  // vertical line shape
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  // square shape
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
];

let rows: string[][] = [[]];

let level = 0;

let input: string = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
const instructions = [...input].slice(0, -1);

// function to get max y value (height of rock formation in chamber)
const getMaxY = (absolute: boolean = false) =>
  absolute ? level + rows.length : rows.length;

const verbose = false;

const cycleLength =
  instructions.length % shapes.length === 0
    ? instructions.length
    : instructions.length * shapes.length;

console.log('cycle length', cycleLength);

// const ITERATIONS = 1000000000000;
const ITERATIONS = cycleLength * 2;
/**
 * Main solution loop
 */
let j = 0;
for (let i = 0; i < ITERATIONS; i++) {
  const shape = shapes[i % shapes.length];

  const startX = 2;
  const startY = getMaxY() + 3;

  let rock = shape.map((pebble) => {
    return [pebble[0] + startX, pebble[1] + startY];
  });

  let done = false;

  let ii = 0;
  while (!done) {
    const instruction = instructions[j++ % instructions.length];
    const modifier = instruction === '>' ? 1 : -1;

    if (verbose) {
      let lines: string[][] = new Array(getMaxY() + 3)
        .fill(null)
        .map(() => new Array(7).fill('.'));

      rows.forEach((row, r) => {
        row.forEach((column, c) => {
          lines[r][c] = column !== null ? column : '.';
        });
      });

      rock.forEach(([column, row]) => {
        lines[row] = lines[row] || new Array(7).fill('.');
        lines[row][column] = '@';
      });

      [...lines].reverse().forEach((line, i) => {
        console.log(
          `Line ${lines.length - i}: ${
            lines.length - i === 1 ? '-------' : line.join('')
          }`
        );
      });
    }

    // slide right either left or right
    let newRock = rock.map(([x, y]) => {
      return [x + modifier, y];
    });

    const collision = detectCollision2(newRock, rows);

    // if sideways movement causes collision, undo it
    if (collision) {
      // console.log('SIDEWAYS COLLISON');
      newRock = rock;
    } else {
      rock = newRock;
      // console.log('sideways movement OK');
    }

    if (verbose) {
      console.log('slide left/right', instruction);
      let lines: string[][] = new Array(getMaxY() + 3)
        .fill(null)
        .map(() => new Array(7).fill('.'));

      rows.forEach((row, r) => {
        row.forEach((column, c) => {
          lines[r][c] = column !== null ? column : '.';
        });
      });

      rock.forEach(([column, row]) => {
        lines[row] = lines[row] || new Array(7).fill('.');
        lines[row][column] = '@';
      });

      [...lines].reverse().forEach((line, i) => {
        console.log(
          `Line ${lines.length - i}: ${
            lines.length - i === 1 ? '-------' : line.join('')
          }`
        );
      });
    }

    // then drop rock down one step
    newRock = rock.map(([x, y]) => {
      return [x, y - 1];
    });

    // if dropping the rock would collide it
    if (detectCollision2(newRock, rows)) {
      // say we are done
      done = true;
      // put the rocks position into chamber
      rock.forEach(([x, y]) => {
        rows[y] = rows[y] || new Array(7).fill(null);
        rows[y][x] = '#';
      });
    } else {
      rock = newRock;
    }

    if (verbose) {
      console.log('DROP DOWN');
      let lines: string[][] = new Array(getMaxY() + 3)
        .fill(null)
        .map(() => new Array(7).fill('.'));

      rows.forEach((row, r) => {
        row.forEach((column, c) => {
          lines[r][c] = column !== null ? column : '.';
        });
      });

      rock.forEach(([column, row]) => {
        lines[row] = lines[row] || new Array(7).fill('.');
        lines[row][column] = '@';
      });

      [...lines].reverse().forEach((line, i) => {
        console.log(
          `Line ${lines.length - i}: ${
            lines.length - i === 1 ? '-------' : line.join('')
          }`
        );
      });
    }
  }

  // rock is dropped - now see if map is unaccesable anywhere, then cut off that lower part
  const blockedRowIndex = rows.findIndex((row, index) => {
    try {
      return index && row?.length === 7 && row.every((pebble) => pebble);
    } catch (error) {
      console.log('ROWS', rows, 'ROW', row);
    }
  });

  if (blockedRowIndex !== -1) {
    // console.log('MAP IS BLOCKED AT ROW', blockedRowIndex);

    rows = rows.slice(blockedRowIndex);
    level += blockedRowIndex;
  }
}

const ans = getMaxY(true) - 1;

console.log('ans', ans, rows.length, level);

// const lines: string[][] = [];

// Object.keys(chamber).forEach((column) => {
//   Object.keys(chamber[column]).forEach((row) => {
//     lines[row] = lines[row] || new Array(7).fill('.');
//     lines[row][column] = row !== '0' ? '#' : FLOOR;
//   });
// });

// [...lines].reverse().forEach((line) => {
//   console.log(line.join(''));
// });
