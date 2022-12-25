import { strict as assert } from 'node:assert';
import sum from '../../utils/sum-ts';
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import range from '../../utils/range-ts';
import combinations from '../../utils/combinations';
import logMap from './log-map';
let input: string = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');

const dirNames = ['North', 'South', 'West', 'East'];

const directions = [
  // N, NE, NW
  [
    [-1, 0],
    [-1, 1],
    [-1, -1],
  ],
  // S, SE, SW
  [
    [1, 0],
    [1, 1],
    [1, -1],
  ],
  // W, NW, SW
  [
    [0, -1],
    [-1, -1],
    [1, -1],
  ],
  // E, NE, SE
  [
    [0, 1],
    [-1, 1],
    [1, 1],
  ],
];

const matches = __filename.match(/(\d{4})\/(\d{2})\/part-(\d)/);
assert(matches);
const [_, year, date, part] = matches;
console.log(`Advent of code ${year} day ${date} part ${part}!`);
const rl = readline.createInterface({ input: stdin, output: stdout });

console.log(input);

const lines = input.split('\n').slice(0, -1);

let rows: Record<string, Record<string, string>> = {};

lines.forEach((line, row) => {
  [...line].forEach((value, col) => {
    if (value === '#') {
      rows[row] = rows[row] || {};
      rows[row][col] = value;
    }
  });
});

logMap(rows);

let elves = 0;
let ans = 0;
const run = async () => {
  let moved = false;

  let i = 0;
  do {
    moved = false;
    elves = 0;
    const newRows: Record<string, Record<string, string>> = {};
    const proposedMoves: Record<string, string> = {};

    // loop through all elves and gather movement proposals
    for (const row in rows) {
      const columns = rows[row];

      for (const column in columns) {
        assert(columns[column]);
        elves++;

        const adjacent = combinations(
          range(+row - 1, +row + 1),
          range(+column - 1, +column + 1)
        ).filter((adj) => !(adj[0] === +row && adj[1] === +column));
        assert(adjacent.length === 8);

        // if all adj are free, elf does nothing
        if (adjacent.every(([row, col]) => !rows[row]?.[col])) {
          newRows[row] = newRows[row] || {};
          newRows[row][column] = '\x1b[32m#\x1b[0m';
          continue;
        }

        // else elf propses to move

        let proposal: string = '';

        for (const n of range(0, 3)) {
          const direction = (n + (i % 4)) % 4;

          const adjacent = directions[direction].filter(([adjRow, adjCol]) => {
            const r = +row + adjRow;
            const c = +column + adjCol;
            const val = rows[r]?.[c];
            return val;
          });

          if (adjacent.length === 0) {
            proposal = `${+row + directions[direction][0][0]}_${
              +column + directions[direction][0][1]
            }`;
            break;
          }
        }

        if (proposal) {
          proposedMoves[`${row}_${column}`] = proposal;
        } else {
          newRows[row] = newRows[row] || {};
          newRows[row][column] = '\x1b[33m#\x1b[0m';
        }
      }
    }

    // move the elves
    for (const elf in proposedMoves) {
      const target = proposedMoves[elf];

      // if elf is alone in moving to target, move elf
      if (Object.values(proposedMoves).filter((move) => move === target).length === 1) {
        const [row, col] = target.split('_').map(Number);
        newRows[row] = newRows[row] || {};
        newRows[row][col] = '\x1b[36m#\x1b[0m';
        moved = true;
      } else {
        const [row, col] = elf.split('_').map(Number);
        newRows[row] = newRows[row] || {};
        newRows[row][col] = '\x1b[31m#\x1b[0m';
      }
    }

    rows = newRows;

    console.log('After round', i + 1, ' - favor moving ', dirNames[i % 4]);
    i++;
    // logMap(rows);
    // await rl.question(`You have ${elves} elves. go?`);
  } while (moved);

  rl.close();

  logMap(rows);

  const rowMin = Math.min(...Object.keys(rows).map(Number));
  const rowMax = Math.max(...Object.keys(rows).map(Number));

  const colMin = Math.min(
    ...Object.values(rows).flatMap((column) => Object.keys(column).map(Number))
  );
  const colMax = Math.max(
    ...Object.values(rows).flatMap((column) => Object.keys(column).map(Number))
  );

  console.log('Rows min', rowMin, 'rowmax', rowMax, 'col min', colMin, 'colmax', colMax);
  console.log('ans', (rowMax - rowMin + 1) * (colMax - colMin + 1) - elves);

  console.log('round', i);
};

run();

// 963 too low
