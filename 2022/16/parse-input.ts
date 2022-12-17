export interface Valve {
  flowRate: number;
  connections: string[];
  name: string;
}

const parseInput = () => {
  const input: string = require('fs').readFileSync(require.resolve('./input'), 'utf-8');

  const lines = input.split('\n').slice(0, -1);

  const valves: Record<string, Valve> = {};

  lines.forEach((line) => {
    const match = line.match(/[A-Z]{2}/g);
    if (match) {
      const [valve, ...connections] = match;
      const flowRate = Number(line.match(/\d+/g)?.[0]);

      valves[valve] = {
        flowRate,
        connections,
        name: valve,
      };
    }
  });

  return valves;
};

export default parseInput;
