import { strict as assert } from 'node:assert';
import sum from '../../utils/sum-ts';
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import logMap from './log-map';
const matches = __filename.match(/(\d{4})\/(\d{2})\/part-(\d)/);
assert(matches);
const [_, year, date, part] = matches;
console.log(`Advent of code ${year} day ${date} part ${part}!`);

const rl = readline.createInterface({ input: stdin, output: stdout });

export interface GPS {
  value: string;
}

let input: string = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');

// console.log('input', input);

const numbers = input
  .split('\n')
  .slice(0, -1)
  .map((n) => {
    return {
      value: String(Number(n) * 811589153),
    };
  });

const map = new Map<GPS, GPS>();

numbers.forEach((number, i) => {
  map.set(number, numbers[i + 1] || numbers[0]);
});

const start = numbers.find((n) => n.value === '0');
assert(start);

// console.log('le map', map);

const run = async () => {
  for (let j = 0; j < 10; j++) {
    console.log('begin round', j + 1);
    for (const GPS of numbers) {
      let steps = Number(GPS.value);

      if (steps >= numbers.length) {
        steps = steps % numbers.length;
      }

      if (steps < 0) {
        // steps = numbers.length + steps - 1;
        steps = numbers.length - (Math.abs(steps) % numbers.length);
      }

      if (steps === 0) {
        logMap(map, start);
        continue;
      }

      let pointer = map.get(GPS);
      const next = pointer;

      for (let i = 1; i < steps; i++) {
        assert(pointer);
        pointer = map.get(pointer);
      }

      assert(pointer);
      const target = pointer;
      const targetOfTarget = map.get(target);
      assert(targetOfTarget);

      for (let i = 1; i < numbers.length - steps; i++) {
        assert(pointer);
        pointer = map.get(pointer);
      }

      const prev = pointer;
      assert(prev);
      assert(next);

      assert(map.get(prev) === GPS);
      assert(map.get(GPS) === next);

      if (target !== prev) {
        map.set(target, GPS);
        map.set(GPS, targetOfTarget);
        map.set(prev, next);
      } else {
        console.log('target is prev');
        console.log('Number', GPS, 'Steps: ', steps);
        console.log('Target', target);
        console.log('Target of Target', targetOfTarget);
        console.log('prev', prev);
        console.log('next', next);
        // map.set(GPS, next);
      }

      numbers.forEach((GPS) => {
        const hasNumber = [...map.values()].includes(GPS);

        if (!hasNumber) {
          console.log('number', GPS, 'missing');
          throw new Error('number missing');
        }
      });
    }
  }

  const vals: number[] = [];
  let target = map.get(start);
  for (let i = 1; i < 3001; i++) {
    assert(target);
    if (i === 1000 || i === 2000 || i === 3000) {
      vals.push(Number(target.value));
    }
    target = map.get(target);
  }

  console.log('vals', vals);

  console.log('ans', sum(vals));

  rl.close();
};

run();

// -10074 wrong
// 336 too low
