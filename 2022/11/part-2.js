const range = require('../../utils/range');
const combinations = require('../../utils/combinations');
const sum = require('../../utils/sum');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

const numbers = lines.map(Number);

let iterations = 10000;

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
    monkeys[monkey].operation = operation;
  } else if (/Test/.test(line)) {
    const n = Number(line.replace('  Test: divisible by ', ''));
    monkeys[monkey].factor = n;
  } else if (/If true:/.test(line)) {
    const n = Number(line.replace('    If true: throw to monkey ', ''));
    monkeys[monkey].trueTarget = n;
  } else if (/If false:/.test(line)) {
    const n = Number(line.replace('    If false: throw to monkey ', ''));
    monkeys[monkey].falseTarget = n;
  }
});


const factors = Object.values(monkeys).map(monkey => {
  return monkey.factor;
});

console.log('factors', factors);

Object.values(monkeys).forEach(monkey => {

  monkey.items = monkey.items.map(level => {

    const remainders = {};

    factors.forEach(factor => {
      remainders[factor] = level % factor;
    });

    return remainders;
  });

  const [op, n] = monkey.operation;

  monkey.operation = (val) => {


    const after = {}
    for (const factor in val) {
      const q = n === 'old' ? val[factor] : +n;

      if (op === '*') {
        after[factor] = (val[factor] * q) % factor;
        if (Number.isNaN(after[factor])) {
          console.log('VAL', val);
          console.log('FACTOR', factor, 'Q', q);
          throw new Error('NaN');
        }
      } else {
        after[factor] = (val[factor] + q) % factor;
        if (Number.isNaN(after[factor])) {
          throw new Error('NaN');
        }
      }
    }

    return after;
  }

  monkey.test = (val) => {
    return val[monkey.factor] === 0;
  }

});

console.log('factz', Object.values(monkeys).map(m => m.items));
console.log('monkeys', monkeys);

for (let i = 0; i < iterations; i++) {

  Object.values(monkeys).forEach((monkey, i) => {

    while (monkey.items.length) {

      const item = monkey.items.shift();
      inspects[i] = inspects[i] || 0;
      inspects[i]++;
      let level = monkey.operation(item);

      if (monkey.test(level)) {
        monkeys[monkey.trueTarget].items.push(level);
      } else {
        monkeys[monkey.falseTarget].items.push(level);
      }
    }
  })

  // console.log('after round', i);
  // console.log(monkeys);

}

console.log('inspects', inspects);

const ans = Object.values(inspects).sort((a, b) => b - a).slice(0, 2).reduce((a, c) => a * c);

console.log('ans', ans);
