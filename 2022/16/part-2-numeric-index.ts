import { strict as assert } from 'node:assert';
import sum from '../../utils/sum-ts';
import getDistance from './get-distance-ts';
import parseInput from './parse-input';

console.log('hello');

const valves = parseInput();

console.log('valves', valves);

const MAX_TURNS = 30;

const cache: Record<number, number> = {};

let iterations = 0;

const start = Object.values(valves).find((valve) => valve.start)?.name;

assert(start);

const getScore = (
  position: number,
  openValves: number[],
  turns: number,
  otherPlayers: number
) => {
  const key =
    otherPlayers +
    turns * 2 +
    position * 31 * 2 +
    sum(openValves.map((valve) => valve * 31 * 2 * Object.keys(valves).length + 1));

  if (iterations++ % 1000 === 0) {
    console.log(iterations, 'key', key);
  }

  if (turns == 0) {
    return otherPlayers > 0
      ? getScore(start, openValves, MAX_TURNS, otherPlayers - 1)
      : 0;
  }

  if (cache[key] !== undefined) {
    return cache[key];
  }

  let score = 0;

  const valve = valves[position];

  if (valve.flowRate > 0 && !openValves.includes(valve.name)) {
    score = Math.max(
      score,
      (turns - 1) * valve.flowRate +
        getScore(position, [...openValves, position].sort(), turns - 1, otherPlayers)
    );
  }

  valve.connections.forEach((connection) => {
    score = Math.max(score, getScore(connection, openValves, turns - 1, otherPlayers));
  });

  cache[key] = score;

  return score;
};

const ans = getScore(start, [], MAX_TURNS, 0);

console.log('ans', ans);

// 2471 too high?
// 2397 too low
// 2428 too low
// 2429 wrong
// 2450 wrong
// 2456 wrong
// 2431 wrong
