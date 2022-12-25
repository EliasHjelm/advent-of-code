import { strict as assert } from 'node:assert';
import sum from '../../utils/sum-ts';
// import * as readline from 'node:readline/promises';
// import { stdin, stdout } from 'node:process';
import { isIterationStatement } from 'typescript';
import moveBlizzards from './move-blizzards';
import logBoard from './log-board';
const matches = __filename.match(/(\d{4})\/(\d{2})\/part-(\d)/);
assert(matches);
const [_, year, date, part] = matches;
console.log(`Advent of code ${year} day ${date} part ${part}!`);

// const rl = readline.createInterface({ input: stdin, output: stdout });

let input: string = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');

const lines = input.split('\n').slice(0, -1);

export interface Blizzards {
  down: [number, number][];
  up: [number, number][];
  left: [number, number][];
  right: [number, number][];
}
const blizzards: Blizzards = {
  down: [],
  up: [],
  left: [],
  right: [],
};

lines.forEach((line, row) => {
  [...line].forEach((c, col) => {
    if (c === '>') {
      blizzards.right.push([row, col]);
    } else if (c === '<') {
      blizzards.left.push([row, col]);
    } else if (c === 'v') {
      blizzards.down.push([row, col]);
    } else if (c === '^') {
      blizzards.up.push([row, col]);
    }
  });
});

console.log('lines', lines.length, 'line', lines[0].length);

console.log('blizzards', blizzards);

const boardStates: Blizzards[] = [blizzards];

const ITERATIONS = 5000;

const HEIGHT = lines.length;
const WIDTH = lines[0].length;

for (let i = 0; i < ITERATIONS; i++) {
  boardStates.push(
    moveBlizzards(boardStates[boardStates.length - 1], lines.length, lines[0].length)
  );
}

const start: [number, number] = [0, 1];
const goal: [number, number] = [HEIGHT - 1, WIDTH - 2];

const cache = new Map<string, number>();

const MAX_TURNS = 500;

const getScore = (
  turn: number,
  position: [number, number],
  goal: [number, number],
  caches: Map<string, number>[],
  start: [number, number],
  startTurn: number
) => {
  const [row, col] = position;

  const key = `${turn}_${row}_${col}`;

  if (turn > startTurn + MAX_TURNS) {
    return Number.MAX_SAFE_INTEGER;
  }

  // console.log('get', key);

  let cached: boolean | number = false;

  caches.forEach((cache) => {
    const val = cache.get(key);
    if (val) {
      cached = val;
    }
  });

  if (cached) {
    return cached;
  }

  if (row === goal[0] && col === goal[1]) {
    return 0;
  }

  // get all blizzards on next turn
  const blizzards = boardStates[turn + 1];
  const allBlizzards = Object.values(blizzards).flat();

  const possiblePositions: [number, number][] = [
    position,
    [row + 1, col],
    [row - 1, col],
    [row, col + 1],
    [row, col - 1],
  ].filter((pos) => {
    return (
      (pos[0] === goal[0] && pos[1] === goal[1]) ||
      (pos[0] === start[0] && pos[1] === start[1]) ||
      (!allBlizzards.some(
        (blizzardPos) => blizzardPos[0] === pos[0] && blizzardPos[1] === pos[1]
      ) &&
        pos[0] > 0 &&
        pos[0] < HEIGHT - 1 &&
        pos[1] > 0 &&
        pos[1] < WIDTH - 1)
    );
  }) as [number, number][];

  // if possible positions are 0, we cannot reach our goal
  if (possiblePositions.length === 0) {
    return Number.MAX_SAFE_INTEGER;
  }

  debugger;

  let score = Number.MAX_SAFE_INTEGER;

  possiblePositions.forEach((position) => {
    score = Math.min(
      score,
      getScore(turn + 1, position, goal, caches, start, startTurn) + 1
    );
  });

  const lastCache = caches[caches.length - 1];
  if (lastCache.size < 16549527) {
    lastCache.set(key, score);
  } else {
    caches.push(new Map<string, number>());
    caches[caches.length - 1].set(key, score);
  }

  return score;
};

const score = getScore(0, start, goal, [cache], start, 0);
console.log('There', score);

const backCache = new Map<string, number>();

const backToSart = getScore(score, goal, start, [backCache], goal, score);

console.log('and back again', backToSart);

// const freshCache = new Map<string, number>();

const thereAgainScore = getScore(
  backToSart + score,
  start,
  goal,
  [cache],
  start,
  backToSart + score
);

console.log(' and there again', thereAgainScore);

console.log('ans', sum([score, backToSart, thereAgainScore]));
