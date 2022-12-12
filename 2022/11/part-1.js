const range = require('../../utils/range');
const combinations = require('../../utils/combinations');
const sum = require('../../utils/sum');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

const numbers = lines.map(Number);

let iterations = 20;

const inspects = {};
const monkeys = {};

lines.forEach((line, i) => {
  const monkey = Math.floor(i / 7);

  if (/Starting items/.test(line)) {
    const items = line.split(' ').slice(4).map(n => Number(n.replace(',', '')));
    monkeys[monkey] = {
      items,
    };
  } else if (/Operation/.test(line)) {
    const operation = line.replace('  Operation: new = old ', '').split(' ');
    const [op, n] = operation;
    monkeys[monkey].operation = (old) => {
      const q = n === 'old' ? old : +n;
      if (op === '*') {
        return old * q;
      } else {
        return old + q;
      }
    };
  } else if (/Test/.test(line)) {
    const n = Number(line.replace('  Test: divisible by ', ''));
    monkeys[monkey].test = (arg) => {
      return arg % n === 0;
    };
  } else if (/If true:/.test(line)) {
    const n = Number(line.replace('    If true: throw to monkey ', ''));
    monkeys[monkey].trueTarget = n;
  } else if (/If false:/.test(line)) {
    const n = Number(line.replace('    If false: throw to monkey ', ''));
    monkeys[monkey].falseTarget = n;
  }
});

console.log('monkz', monkeys);

for (let i = 0; i < iterations; i++) {

  Object.values(monkeys).forEach((monkey, i) => {

    while (monkey.items.length) {

      const item = monkey.items.shift();
      inspects[i] = inspects[i] || 0;
      inspects[i]++;
      let level = Math.floor(monkey.operation(item) / 3);

      if (monkey.test(level)) {
        monkeys[monkey.trueTarget].items.push(level);
      } else {
        monkeys[monkey.falseTarget].items.push(level);
      }
    }
  })

  console.log('after round', i);
  console.log(monkeys);

}

console.log('inspects', inspects);

const ans = Object.values(inspects).sort((a, b) => b - a).slice(0, 2).reduce((a, c) => a * c);

console.log('ans', ans);
