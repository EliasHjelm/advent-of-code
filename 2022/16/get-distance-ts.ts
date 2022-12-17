import { Valve } from './parse-input';

// get distance to valve
const getDistance = (from: string, to: string, valves: Record<string, Valve>) => {
  if (from === to) return 0;

  const start = valves[from];

  let steps = 0;
  let done = false;

  let current = [start];

  while (!done) {
    const newCurrent: Valve[] = [];
    current.forEach((current) => {
      if (current.connections.includes(to)) {
        done = true;
      }
      newCurrent.push(...current.connections.map((n) => valves[n]));
    });
    current = newCurrent;
    steps++;
  }

  return steps;
};

export default getDistance;
