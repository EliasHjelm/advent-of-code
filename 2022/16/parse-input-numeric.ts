export interface Valve {
  flowRate: number;
  connections: number[];
  name: number;
  start: boolean;
}

interface InterimValve {
  flowRate: number;
  connections: string[];
  start: boolean;
  name: number;
  oldName: string;
}

interface NoobValve {
  flowRate: number;
  connections: string[];
  name: string;
  start: boolean;
}
function testPrime(n: number) {
  if (n === 1) {
    return false;
  } else if (n === 2) {
    return false;
  } else {
    for (let x = 2; x < n; x++) {
      if (n % x === 0) {
        return false;
      }
    }
    return true;
  }
}

function getPrimes(n: number) {
  const primes: number[] = [];

  let i = 3;
  while (primes.length < n) {
    if (testPrime(i)) {
      primes.push(i);
    }

    i += 2;
  }

  return primes;
}

const parseInput = () => {
  const input: string = require('fs').readFileSync(require.resolve('./input'), 'utf-8');

  const lines = input.split('\n').slice(0, -1);

  const valves: NoobValve[] = [];

  lines.forEach((line) => {
    const match = line.match(/[A-Z]{2}/g);
    if (match) {
      const [valve, ...connections] = match;
      const flowRate = Number(line.match(/\d+/g)?.[0]);

      valves.push({
        flowRate,
        connections,
        name: valve,
        start: valve === 'AA',
      });
    }
  });

  valves.sort((a, b) => b.flowRate - a.flowRate);

  const primes = getPrimes(valves.length);

  const coolValves: InterimValve[] = valves.map((valve, i) => {
    return {
      flowRate: valve.flowRate,
      start: valve.start,
      name: primes[i],
      connections: valve.connections,
      oldName: valve.name,
    };
  });

  const sweetValves: Valve[] = coolValves.map((valve, i) => {
    return {
      ...valve,
      connections: valve.connections.map((name) => {
        return coolValves.find((valve) => valve.oldName === name)?.name || -1;
      }),
    };
  });

  const megaCoolValves: Record<number, Valve> = {};

  sweetValves.forEach((valve) => {
    megaCoolValves[valve.name] = valve;
  });

  return megaCoolValves;
};

export default parseInput;
