import getDistance from './get-distance-ts';
import parseInput from './parse-input';

interface PathPlayer {
  turns: number;
  position: string;
}

interface Path {
  score: number;
  openValves: string[];
  players: PathPlayer[];
}

console.log('hello');

const valves = parseInput();

const MAX_TURNS = 26;

const cache = new Map<string, number>();
const cache2 = new Map<string, number>();

const LIMIT = 20000001;

let iterations = 0;

const getCached = (key: string) => {
  return cache.get(key) || cache2.get(key);
};

const setCache = (key: string, value: number) => {
  // need this to prevent map from reaching max size
  if (cache.size < 16713297) {
    cache.set(key, value);
  } else {
    cache2.set(key, value);
  }
};

const getScore = (
  position: string,
  openValves: string[],
  turns: number,
  otherPlayers: number
) => {
  const key = `${position}_${openValves.join(',')}_${turns}_${otherPlayers}`;

  if (iterations++ % 1000000 === 0) {
    console.log('size 1', cache.size, 'size 2:', cache2.size, 'key', key);
  }

  if (turns == 0) {
    return otherPlayers > 0 ? getScore('AA', openValves, MAX_TURNS, otherPlayers - 1) : 0;
  }

  if (getCached(key) !== undefined) {
    return getCached(key);
  }

  let score = 0;

  const valve = valves[position];

  if (valve.flowRate > 0 && !openValves.includes(valve.name)) {
    score = Math.max(
      score,
      (turns - 1) * valve.flowRate +
        getScore(position, [...openValves, valve.name].sort(), turns - 1, otherPlayers)
    );
  }

  valve.connections.forEach((connection) => {
    score = Math.max(score, getScore(connection, openValves, turns - 1, otherPlayers));
  });

  setCache(key, score);

  return score;
};

const ans = getScore('AA', [], MAX_TURNS, 1);

console.log('ans', ans);
