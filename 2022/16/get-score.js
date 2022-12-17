const getDistance  = require('./get-distance');

const valves = require('./input.json');

const valveNames = Object.keys(valves);

const iterations = 30;

const cache = {};

const getScore = (turn, openValves, position) => {

  const remaining = iterations - turn;

  const key = `${position}-${turn}-${openValves}`;
  if (cache[key] !== undefined) {
    return cache[key];
  }

  // get distances to closed valves w/ flow rates
  const targets = valveNames.filter(name => {
    const valve = valves[name];
    const hasFlow = valve.flowRate;
    const isOpen = openValves.includes(name);

    return hasFlow && !isOpen;
  }).map(name => valves[name]);

  const targetsWithDistance = targets.map(target => {
    const distance = getDistance(position, target.name);
    const value =  Math.max((remaining - distance - 1) * target.flowRate, 0);
    return {
      ...target,
      distance,
      value,
    };
  }).filter(target => {
    return target.value > 0;
  });

  // this is as far as we can go
  if (targetsWithDistance.length === 0) {
    return 0;
  }

  const withScores = targetsWithDistance.map(target => {
    const score = getScore(turn + target.distance + 1, [...openValves, target.name], target.name);
    return target.value + score;
  });

  const maxScore = Math.max(...withScores);

  cache[key] = maxScore;

  return maxScore;

};

const ans = getScore(1, [], 'AA');
console.log('ans', ans);

// module.exports = getScore;
