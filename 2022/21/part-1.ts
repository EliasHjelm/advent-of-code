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

let iterations = 0;

console.log('monkeys', monkeys, monkeys.root, monkeys['root']);

while (typeof monkeys['root'] === 'string') {
  console.log('iteration', iterations + 1);
  const newMonkeys: Record<string, number | string> = {};
  for (const monkey in monkeys) {
    const val = monkeys[monkey];

    if (typeof val === 'number') {
      newMonkeys[monkey] = val;
    } else {
      const [a, op, b] = val.split(' ');

      if (typeof monkeys[a] === 'number' && typeof monkeys[b] === 'number') {
        const valA = monkeys[a];
        const valB = monkeys[b];
        const result = eval(`${valA} ${op} ${valB}`) as number;
        console.log(`${valA} ${op} ${valB} = `, result);
        newMonkeys[monkey] = result;
      } else {
        newMonkeys[monkey] = val;
      }
    }
  }

  monkeys = newMonkeys;

  iterations++;
}

console.log(monkeys['root']);
