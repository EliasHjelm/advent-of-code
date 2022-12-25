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
  value: number;
}

let input: string = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');

// console.log('input', input);

const numbers = input
  .split('\n')
  .slice(0, -1)
  .map((n) => {
    return {
      value: Number(n),
    };
  });

const map = new Map<GPS, GPS>();

numbers.forEach((number, i) => {
  map.set(number, numbers[i + 1] || numbers[0]);
});

const start = numbers.find((n) => n.value === 0);
assert(start);

// console.log('le map', map);

const run = async () => {
  let num2: GPS = start;
  try {
    let i = 0;
    for (const GPS of numbers) {
      num2 = GPS;
      if (i > 750) {
        // await rl.question(`Next up: Number ${GPS.value} iteration ${i + 1}`);
      }
      let steps = GPS.value;

      while (steps >= numbers.length) {
        steps -= numbers.length - 1;
      }

      while (steps < 0) {
        steps = numbers.length + steps - 1;
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

      if (i > 700) {
        // console.log('Number', GPS, 'Steps: ', steps);
        // console.log('Target', target);
        // console.log('Target of Target', targetOfTarget);
        // console.log('prev', prev);
        // console.log('next', next);
      }

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

      if (++i % 50 === 0) {
        console.log('iteration', i, 'size', map.size, 'number', GPS.value);
      }

      numbers.forEach((GPS) => {
        const hasNumber = [...map.values()].includes(GPS);

        if (!hasNumber) {
          console.log('number', GPS, 'missing');
          throw new Error('number missing');
        }
      });

      // logMap(map, start);
    }

    const vals: number[] = [];
    let target = map.get(start);
    for (let i = 1; i < 3001; i++) {
      assert(target);
      if (i === 1000 || i === 2000 || i === 3000) {
        vals.push(target.value);
      }
      target = map.get(target);
    }

    console.log('vals', vals);

    console.log('ans', sum(vals));
  } catch (error) {
    console.error(error);
    console.log('num', num2);
  }

  rl.close();
};

run();

// -10074 wrong
// 336 too low
