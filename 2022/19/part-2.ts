import { strict as assert } from 'node:assert';
import sum from '../../utils/sum-ts';
console.log('Advent of code day 19 part 1');

enum Resource {
  ore = 'ore',
  clay = 'clay',
  obsidian = 'obsidian',
  geode = 'geode',
}

interface Robot {
  name: string;
  price: Record<Resource, number>;
}

interface Blueprint {
  robots: Robot[];
  maxPrices: Record<Resource, number>;
}

let input: string = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');

console.log('input', input);

const blueprints: Blueprint[] = [];

const lines = input.split('\n').slice(0, -1);

lines.forEach((line) => {
  const matches = line.match(/\d+/g)?.map(Number);

  assert(matches);

  const [
    blueprintNr,
    oreCost,
    clayCost,
    obsidianOreCost,
    obsidianClayCost,
    geodeOreCost,
    geodeObsidianCost,
  ] = matches;

  const blueprint: Blueprint = {
    maxPrices: {
      // ore: Math.max(geodeOreCost, obsidianOreCost, clayCost, oreCost),
      ore: 4,
      clay: obsidianClayCost,
      // clay: 10,
      obsidian: geodeObsidianCost,
      geode: 0,
    },
    robots: [
      {
        name: Resource.ore,
        price: {
          ore: oreCost,
          clay: 0,
          obsidian: 0,
          geode: 0,
        },
      },
      {
        name: Resource.clay,
        price: {
          ore: clayCost,
          clay: 0,
          obsidian: 0,
          geode: 0,
        },
      },
      {
        name: Resource.obsidian,
        price: {
          ore: obsidianOreCost,
          clay: obsidianClayCost,
          obsidian: 0,
          geode: 0,
        },
      },
      {
        name: Resource.geode,
        price: {
          ore: geodeOreCost,
          clay: 0,
          obsidian: geodeObsidianCost,
          geode: 0,
        },
      },
    ],
  };

  blueprints.push(blueprint);
});

const TURNS = 32;

let iterations = 0;
let blueprintsCount = 0;
const getScore = (
  resources: Record<Resource, number>,
  turns: number,
  robots: Record<Resource, number>,
  blueprint: Blueprint,
  caches: Map<string, number>[]
) => {
  const key = `${Object.values(resources).join('_')}_${turns}_${Object.values(
    robots
  ).join('_')}`;

  if (iterations++ % 1000000 === 0) {
    console.log(
      'bp',
      blueprintsCount,
      'size',
      caches.map((cache) => cache.size),
      'key',
      key
    );
  }

  if (turns === 0) {
    return 0;
  }

  let cached: boolean | number = false;

  caches.forEach((cache) => {
    const val = cache.get(key);
    if (val) {
      cached = val;
    }
  });

  if (cached) {
    return cached;
  }

  let score = 0;

  /**
   * Figure out which robots we can afford
   */
  const possibleRobots = blueprint.robots.filter((robot) => {
    // console.log(`Check if we can build ${robot.name}`);
    // dont allow to build mroe than the max price of a robog
    if (
      robots[robot.name] >= blueprint.maxPrices[robot.name] &&
      robot.name !== Resource.geode
    ) {
      return false;
    }

    return Object.keys(robot.price).every((resource) => {
      // console.log(`Of resource ${resource} we have res`)
      return resources[resource] >= robot.price[resource];
    });
  });

  // console.log(`We have ${resources.ore} ore, ${resources.clay} clay, ${resources.obsidian} obsidian - which robots can we build?`, possibleRobots.map(robot => robot.name));

  // dont allow piling up ore
  if (resources.ore < 7) {
    const newResources: Record<Resource, number> = {
      ore: resources.ore + robots.ore,
      clay: resources.clay + robots.clay,
      obsidian: resources.obsidian + robots.obsidian,
      geode: resources.geode + robots.geode,
    };

    score = Math.max(score, getScore(newResources, turns - 1, robots, blueprint, caches));
  }

  possibleRobots.forEach((robot) => {
    const newResources: Record<Resource, number> = {
      ore: resources.ore + robots.ore - robot.price.ore,
      clay: resources.clay + robots.clay - robot.price.clay,
      obsidian: resources.obsidian + robots.obsidian - robot.price.obsidian,
      geode: resources.geode + robots.geode - robot.price.geode,
    };

    const newRobots: Record<Resource, number> = {
      ore: robots.ore + (robot.name === Resource.ore ? 1 : 0),
      clay: robots.clay + (robot.name === Resource.clay ? 1 : 0),
      obsidian: robots.obsidian + (robot.name === Resource.obsidian ? 1 : 0),
      geode: robots.geode + (robot.name === Resource.geode ? 1 : 0),
    };

    let newScore = getScore(newResources, turns - 1, newRobots, blueprint, caches);

    if (robot.name === Resource.geode) {
      newScore += turns - 1;
    }

    score = Math.max(score, newScore);
  });

  const lastCache = caches[caches.length - 1];
  if (lastCache.size < 16549527) {
    lastCache.set(key, score);
  } else {
    caches.push(new Map<string, number>());
    caches[caches.length - 1].set(key, score);
  }

  return score;
};

const initResources: Record<Resource, number> = {
  ore: 0,
  clay: 0,
  obsidian: 0,
  geode: 0,
};

const initRobots: Record<Resource, number> = {
  ore: 1,
  clay: 0,
  obsidian: 0,
  geode: 0,
};

const answers = blueprints.slice(0, 3).map((blueprint, i) => {
  const cache = new Map<string, number>();
  const caches = [cache];
  blueprintsCount++;
  const score = getScore(initResources, TURNS, initRobots, blueprint, caches);
  return score;
});

console.log('answers', answers);

console.log('ans', answers[0] * answers[1] * answers[2]);

// 2192 too high
// 1163 too low
