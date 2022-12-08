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

let p1 = Number(lines[0].slice(-1));
let p2 = Number(lines[1].slice(-1));

let p1score = 0;
let p2score = 0;

console.log(p1, p2);

let dice = 0;
let rolls = 0;
function rollDice() {
  dice = (dice + 1) % 100;
  rolls++;
  return dice;
};

let turn = 1;

function play() {
  console.log('Play! turn', turn);

  const diceRolls = ([rollDice(), rollDice(), rollDice()]);
  const diceTotal = sum(diceRolls);

  const startingPos = turn === 1 ? p1 : p2;

  let pos = (startingPos + diceTotal);
  while (pos > 10) pos -= 10;

  if (turn === 1) {
    p1score += pos;
    p1 = pos;
    turn = 2;
  } else {
    p2score += pos;
    p2 = pos;
    turn = 1;
  }
  // console.log(`Player ${turn == 1 ? '2' : '1'} rolls ${diceRolls.join('+')}=${diceTotal} and moves to space ${turn == 2 ? p1 : p2} for a total score of ${turn == 2 ? p1score : p2score }`)

}

const limit = 1000;

while (p1score < limit && p2score < limit) {
  play();
}

console.log(`game finished after ${rolls} rolls and the scores were ${p1score} and ${p2score}`);

const answer = Math.min(p1score, p2score) * rolls;

console.log('ans', answer);

