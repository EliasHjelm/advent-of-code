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

console.log(p1, p2);

// make games into objects such as [p1score][p2score][p1pos][p2pos] = amt of games
let positions = {
  [`0-0-${p1}-${p2}`]: 1,
};

const LIMIT = 21;

let TURN = 1;

const wonGames = {
  1: 0,
  2: 0,
};

const distributions = {
  3: 1,
  4: 3,
  5: 6,
  6: 7,
  7: 6,
  8: 3,
  9: 1,
};

function getPos(start, score) {
  let pos = start + score;
  while (pos > 10) pos -= 10;
  return pos;
}

function play() {

  const newPositions = {};

  for (const game in positions) {
    const [p1score, p2score, p1pos, p2pos] = game.split('-').map(Number);

    const factor = positions[game];

    if (TURN == 1) {
      for (totalDice in distributions) {
        const n = distributions[totalDice];
        const newp1pos = getPos(p1pos, Number(totalDice));
        const newScore = p1score + newp1pos;
        if (newScore >= LIMIT) {
          wonGames[1] += factor * n;
        } else {
          const gameId = `${newScore}-${p2score}-${newp1pos}-${p2pos}`;
          newPositions[gameId] = newPositions[gameId] || 0;
          newPositions[gameId] += n * factor;
        }
      }
    } else {
      for (totalDice in distributions) {
        const n = distributions[totalDice];
        const newp2pos = getPos(p2pos, Number(totalDice));
        const newScore = p2score + newp2pos;
        if (newScore >= LIMIT) {
          wonGames[2] += factor * n;
        } else {
          const gameId = `${p1score}-${newScore}-${p1pos}-${newp2pos}`;
          newPositions[gameId] = newPositions[gameId] || 0;
          newPositions[gameId] += factor * n;
        }
      }
    }
  }

  // change turn
  TURN = TURN == 1 ? 2 : 1;

  positions = newPositions;
}

let rounds = 0;

while (Object.keys(positions).length > 0) {
// while (rounds < 2) {
  console.log('Round', ++rounds, 'player', TURN);
  console.log('positions', positions);
  play();
}

console.log('positions', positions);
console.log('won', wonGames);
console.log('ans', Math.max(...Object.values(wonGames)));
