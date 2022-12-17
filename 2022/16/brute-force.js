const getDistance  = require('./get-distance');

const valves = require('./input.json');

const valveNames = Object.keys(valves);

const MAX_TURNS = 30;

let paths = [{
  position: 'AA',
  turns: 0,
  score: 0,
  openValves: [],
}];

let counter = 0;

while (paths.some(path => path.turns < MAX_TURNS)) {

  const turns = paths.map(path => path.turns);

  const maxTurns = Math.max(...turns);
  const minTurns = Math.min(...turns);
  console.log(`Iteration ${++counter} on ${paths.length} paths - progress min turns = ${minTurns}, max turns = ${maxTurns} `);

  const newPaths = [];

  paths.forEach((path) => {

    const targets = valveNames.filter(name => {
      const valve = valves[name];
      const hasFlow = valve.flowRate;
      const isOpen = path.openValves.includes(name);

      return hasFlow && !isOpen;
    }).map(name => valves[name]);

    const targetsWithDistance = targets.map(target => {
      const distance = getDistance(path.position, target.name);
      const value = Math.max((MAX_TURNS - path.turns - (distance + 1)) * target.flowRate, 0);
      return {
        ...target,
        distance,
        value,
      };
    }).filter(target => {
      return target.value > 0;
    });

    if (targetsWithDistance.length === 0) {
      newPaths.push({
        ...path,
        turns: MAX_TURNS,
      });
    } else {
      // branch out
      targetsWithDistance.forEach(target => {

        const newPath = {
          position: target.name,
          score: path.score + target.value,
          turns: path.turns + target.distance + 1,
          openValves: [...path.openValves, target.name],
        };

        newPaths.push(newPath);
      });
    }
  });

  paths = newPaths.sort((a, b) => b.score - a.score).slice(0, 20);
}

console.log('paths', paths);
const highscore = Math.max(...paths.map(path => path.score));

// 375 too low
console.log('high score', highscore, 'path', paths.find(path => path.score === highscore));

