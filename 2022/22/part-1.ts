import { strict as assert } from 'node:assert';
import sum from '../../utils/sum-ts';
import getNewPos from './get-new-pos';
import parseInstructions from './parse-instructions';
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import logMap from './log-map';
console.log('advent of code 2022 day 22 part 1');
const rl = readline.createInterface({ input: stdin, output: stdout });

let input: string = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');

console.log('input', input);

const facings = ['>', 'V', '<', '↑'];

const lines = input.split('\n').slice(0, -1);

const rows: Record<number, Record<number, string>> = {};

lines.slice(0, -2).forEach((line, i) => {
  rows[i] = {};
  [...line].forEach((c, ii) => {
    if (c !== ' ') {
      rows[i][ii] = c;
    }
  });
});

const instructions = parseInstructions(lines[lines.length - 1]);

console.log('instructions', instructions);

let facing: 0 | 1 | 2 | 3 = 0;

let pos: [number, number] = [0, Math.min(...Object.keys(rows[0]).map(Number))];

console.log('starting pos', pos, rows[pos[0]][pos[1]], rows[0][pos[1] - 1]);

const path: Record<number, Record<number, string>> = {};

path[0] = {};
path[0][pos[1]] = facings[facing];

const run = async () => {
  for (const instruction of instructions) {
    // logMap(rows, path);
    // await rl.question(`Instruction: ${instruction} - Pos: ${pos} - Facing: ${facing}`);
    if (typeof instruction === 'number') {
      for (let i = 0; i < instruction; i++) {
        const newPos = getNewPos(rows, facing, pos);
        if (newPos[0] === pos[0] && newPos[1] === pos[1]) {
          break;
        }
        pos = newPos;
        path[pos[0]] = path[pos[0]] || {};
        path[pos[0]][pos[1]] = facings[facing];
        // logMap(rows, path);
        // await rl.question(`Moved ${i + 1} / ${instruction}`);
      }
    } else if (typeof instruction === 'string') {
      if (instruction === 'R') {
        facing = ((facing + 1) % 4) as 0 | 1 | 2 | 3;
      } else if (instruction === 'L') {
        facing = ((facing + 3) % 4) as 0 | 1 | 2 | 3;
      }
      path[pos[0]][pos[1]] = facings[facing];
    }
  }

  path[pos[0]][pos[1]] = 'F';

  console.log('pos', pos, 'facing', facing);

  const ans = sum([(pos[0] + 1) * 1000, (pos[1] + 1) * 4, facing]);

  console.log('ans', ans);

  // 1036 too low
  // 79360 too low

  rl.close();
};

run();
