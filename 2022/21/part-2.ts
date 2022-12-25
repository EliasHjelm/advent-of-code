import { strict as assert } from 'node:assert';
console.log('advent of code 2022 day 21 part 1');

let input: string = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');

console.log('input', input);

const lines = input.split('\n').slice(0, -1);

let monkeys: Record<string, number | string> = {};

lines.forEach((monkey) => {
  const [name, op] = monkey.split(': ');

  monkeys[name] = /\d/.test(op) ? Number(op) : op;
});

const getValue = (monkey: string, humnVal: number): number | string => {
  const value = monkeys[monkey];

  if (typeof value === 'number') {
    return value;
  } else {
    assert(typeof value === 'string');
    const [a, op, b] = value.split(' ');

    if (a === 'humn') {
      return eval(`(${humnVal} ${op} ${getValue(b, humnVal)})`);
    } else if (b === 'humn') {
      return eval(`(${getValue(a, humnVal)} ${op} ${humnVal})`);
    }

    const valA = getValue(a, humnVal);
    const valB = getValue(b, humnVal);

    if (typeof valA === 'number' && typeof valB === 'number') {
      const monkeyVal = eval(`${valA} ${op} ${valB}`) as number;

      return monkeyVal;
    } else {
      return `(${valA} ${op} ${valB})`;
    }
  }
};

const rootStatement = monkeys.root;

assert(typeof rootStatement === 'string');

const [a, op, b] = rootStatement.split(' ');

// very painful process led to this starting point
let humn = 3059361893000;
let x = getValue(a, 0);
let y = getValue(b, 0);

console.log(`${x} -- = -- ${y}`);

console.log('x', x, 'y', y);

while (x !== y) {
  x = getValue(a, ++humn);

  if (humn % 1000 === 0) {
    console.log('humn', humn, 'x', x, x < y, +x / +y);
  }
}

console.log('ANSWER', humn);
