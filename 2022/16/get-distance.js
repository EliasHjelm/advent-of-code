const valves = require('./input.json');

// get distance to valve
const getDistance = (from, to) => {

  if (from === to) return 0;

  const start = valves[from];

  let steps = 0;
  let done = false;

  let current = [start];

  while (!done) {
    const newCurrent = [];
    current.forEach(current => {

      if (current.connections.includes(to)) {
        done = true;
      }
      newCurrent.push(...current.connections.map(n => valves[n]));
    });
    current = newCurrent;
    steps++;
  }

  return steps;

}

module.exports = getDistance;
