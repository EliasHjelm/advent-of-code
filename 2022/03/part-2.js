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

const priorities = lines.map(rucksack => {

  const a = rucksack.slice(0, rucksack.length / 2);
  const b = rucksack.slice(rucksack.length / 2);

  const common = [...a].find(item => b.includes(item));

  let score = common.charCodeAt(0);

  if (score >= 97) score -= 96;
  else score -= 38;

  return score;

});

const groups = [];

lines.forEach((line, index) => {

  if (index % 3 === 0) {
    groups.push([]);
  }

  groups[groups.length - 1].push(line);
});

const scores = groups.map(group => {

  const [a, b, c] = group;

  const common = [...a].find(item => b.includes(item) && c.includes(item));

  let score = common.charCodeAt(0);

  if (score >= 97) score -= 96;
  else score -= 38;

  return score;
});

const total = sum(scores);

console.log('total', total);