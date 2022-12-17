const combinations = require('../../utils/combinations');
const getDistance = require('./get-distance');

const valves = require('./input.json');

const valveNames = Object.keys(valves);

const MAX_TURNS = 26;

let paths = [
  {
    score: 0,
    players: [
      {
        turns: 0,
        position: 'AA',
      },
      {
        turns: 0,
        position: 'AA',
      },
    ],
    openValves: [],
    timestamps: [],
  },
];

let counter = 0;

while (paths.some((path) => path.players.some((player) => player.turns < MAX_TURNS))) {
  const turns = paths.flatMap((path) => path.players.map((player) => player.turns));

  const maxTurns = Math.max(...turns);
  const minTurns = Math.min(...turns);
  console.log(
    `Iteration ${++counter} on ${
      paths.length
    } paths - progress min turns = ${minTurns}, max turns = ${maxTurns} `
  );

  const newPaths = [];

  paths.forEach((path) => {
    let targets = valveNames
      .filter((name) => {
        const valve = valves[name];
        const hasFlow = valve.flowRate;
        const isOpen = path.openValves.includes(name);

        return hasFlow && !isOpen;
      })
      .map((name) => valves[name]);

    const targetsByPlayer = path.players.map((player) => {
      const targetsWithDistance = targets
        .map((target) => {
          const distance = getDistance(player.position, target.name);
          const value = Math.max(
            (MAX_TURNS - player.turns - (distance + 1)) * target.flowRate,
            0
          );
          return {
            ...target,
            distance,
            value,
          };
        })
        .filter((target) => {
          return target.value > 0;
        });

      return targetsWithDistance;
    });

    if (targetsByPlayer.every((t) => t.length === 0)) {
      path.players[0].turns = MAX_TURNS;
      path.players[1].turns = MAX_TURNS;
      newPaths.push(path);
    } else if (targetsByPlayer.some((t) => t.length === 0)) {
      const playing = targetsByPlayer.findIndex((targets) => targets.length > 0);
      targetsByPlayer[playing].forEach((target) => {
        const newPath = {
          ...path,
          score: path.score + target.value,
          openValves: [...path.openValves, target.name],
          players: path.players.map((player) => ({ ...player })),
          timestamps: [
            ...path.timestamps,
            {
              player: playing,
              turns: path.players[playing].turns + target.distance + 1,
              valve: target.name,
            },
          ],
        };
        newPath.players[playing].turns =
          path.players[playing].turns + target.distance + 1;
        newPath.players[playing].position = target.name;
        newPaths.push(newPath);
      });
    } else {
      combinations(targetsByPlayer[0], targetsByPlayer[1]).forEach(
        ([p0target, p1target]) => {
          if (p0target.name !== p1target.name) {
            const newPath = {
              ...path,
              score: path.score + p0target.value + p1target.value,
              openValves: [...path.openValves, p0target.name, p1target.name],
              players: [
                {
                  turns: path.players[0].turns + p0target.distance + 1,
                  position: p0target.name,
                },
                {
                  turns: path.players[1].turns + p1target.distance + 1,
                  position: p1target.name,
                },
              ],
              timestamps: [
                ...path.timestamps,
                {
                  player: 0,
                  turns: path.players[0].turns + p0target.distance + 1,
                  valve: p0target.name,
                },
                {
                  player: 1,
                  turns: path.players[1].turns + p1target.distance + 1,
                  valve: p1target.name,
                },
              ],
            };

            newPaths.push(newPath);
          }
        }
      );
    }
  });

  paths = newPaths.sort((a, b) => b.score - a.score).slice(0, 60);
}

// console.log('paths', paths);
const highscore = Math.max(...paths.map((path) => path.score));

// 2471 too high?
// 2397 too low
// 2428 too low
// 2429 wrong
// 2450 wrong
// 2456 wrong
console.log(
  'high score',
  highscore,
  'path',
  paths.find((path) => path.score === highscore)
);
