const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('Input', stuff);

const numbers = lines.map(Number);

let acc = 0;
let ip = 0;
let flag = false;
let answer = false;