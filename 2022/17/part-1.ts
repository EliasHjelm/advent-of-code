import { isObjectBindingPattern } from 'typescript';
import detectCollision from './detect-collision';

console.log(`Advent of code day 17 part 1`);

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

const FLOOR = '-';

const chamber: Record<number, Record<number, string>> = {
  0: {
    0: FLOOR,
  },
  1: {
    0: FLOOR,
  },
  2: {
    0: FLOOR,
  },
  3: {
    0: FLOOR,
  },
  4: {
    0: FLOOR,
  },
  5: {
    0: FLOOR,
  },
  6: {
    0: FLOOR,
  },
};

let input: string = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
const instructions = [...input].slice(0, -1);

// function to get max y value (height of rock formation in chamber)
const getMaxY = (chamber: Record<number, Record<number, string>>) => {
  return Math.max(
    ...Object.values(chamber).flatMap((column) => {
      return Object.keys(column).map(Number);
    }),
    0
  );
};

const ITERATIONS = 2022;
/**
 * Main solution look
 */
let j = 0;
for (let i = 0; i < ITERATIONS; i++) {
  const shape = shapes[i % shapes.length];
  // console.log(`Rock ${i + 1} - ${shape.join(' ')}`);

  const startX = 2;
  const startY = getMaxY(chamber) + 4;

  // console.log(`x: ${startX} - y: ${startY}`);

  let rock = shape.map((pebble) => {
    return [pebble[0] + startX, pebble[1] + startY];
  });

  // console.log('rock', rock);

  let done = false;

  let ii = 0;
  while (!done) {
    const instruction = instructions[j++ % instructions.length];
    const modifier = instruction === '>' ? 1 : -1;

    // slide right either left or right
    let newRock = rock.map(([x, y]) => {
      return [x + modifier, y];
    });

    const collision = detectCollision(newRock, chamber);

    // if sideways movement causes collision, undo it
    if (collision) {
      // console.log('SIDEWAYS COLLISON');
      newRock = rock;
    } else {
      rock = newRock;
      // console.log('sideways movement OK');
    }

    // then drop rock down one step
    newRock = rock.map(([x, y]) => {
      return [x, y - 1];
    });

    // if dropping the rock would collide it
    if (detectCollision(newRock, chamber)) {
      // say we are done
      done = true;
      // put the rocks position into chamber
      rock.forEach(([x, y]) => {
        chamber[x] = chamber[x] || {};
        chamber[x][y] = '#';
      });
    } else {
      rock = newRock;
    }

    // console.log('new rock position', rock);

    // let lines: string[][] = new Array(getMaxY(chamber) + 4) .fill(null)
    //   .map(() => new Array(7).fill('.'));

    // Object.keys(chamber).forEach((column) => {
    //   Object.keys(chamber[column]).forEach((row) => {
    //     lines[row] = lines[row] || new Array(7).fill('.');
    //     lines[row][column] = row !== '0' ? '#' : FLOOR;
    //   });
    // });

    // rock.forEach(([column, row]) => {
    //   lines[row] = lines[row] || new Array(7).fill('.');
    //   lines[row][column] = '@';
    // });

    // [...lines].reverse().forEach((line) => {
    //   console.log(line.join(''));
    // });
  }
}

const ans = getMaxY(chamber);

console.log('ans', ans);

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
