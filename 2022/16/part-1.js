// const getScore =require('./get-score');

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
const valves = {};

lines.forEach(line => {

  const [valve, ...connections] = line.match(/[A-Z]{2}/g);
  const flowRate = Number(line.match(/\d+/g)[0]);

  valves[valve] = {
    flowRate,
    connections,
    name: valve,
  };

});


require('fs').writeFileSync('./t1.json', JSON.stringify(valves, null, 2));

module.exports.iterations = 30;

module.exports.valves = valves;
module.exports.valveNames = Object.keys(valves);
