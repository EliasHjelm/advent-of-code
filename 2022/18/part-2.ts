import combinations from '../../utils/combinations';

console.log('Advent of code day 18 part 1');

let input: string = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');

console.log('input', input);

const cubes = input.split('\n').slice(0, -1);

const maxX = Math.max(...cubes.map((cube) => Number(cube.split(',')[0])));
const maxY = Math.max(...cubes.map((cube) => Number(cube.split(',')[1])));
const maxZ = Math.max(...cubes.map((cube) => Number(cube.split(',')[2])));

const minX = Math.min(...cubes.map((cube) => Number(cube.split(',')[0])));
const minY = Math.min(...cubes.map((cube) => Number(cube.split(',')[1])));
const minZ = Math.min(...cubes.map((cube) => Number(cube.split(',')[2])));
console.log('maxes', maxX, maxY, maxZ, 'minis', minX, minY, minZ);

let exposedSides = 0;

const getAdjacent = (x: number, y: number, z: number) => {
  const transformations = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, 1],
  ];

  return transformations.map((transformation) => {
    return [x + transformation[0], y + transformation[1], z + transformation[2]];
  });
};

const isWalledIn = (x: number, y: number, z: number) => {
  let wall = true;

  let adjacent = getAdjacent(x, y, z);

  // get all free adjacent spaces
  let freeAdjacent = adjacent.filter(([x, y, z]) => {
    return !cubes.includes(`${x},${y},${z}`);
  });

  const visited = new Set<string>();

  let i = 0;
  // as long as we have free adjacent space, keep checking
  while (freeAdjacent.length && wall) {
    const newFreeAdjacent: number[][] = [];

    freeAdjacent.forEach(([x, y, z]) => {
      const adjacent = getAdjacent(x, y, z);

      // if we made it out, set wall to false
      adjacent.forEach(([x, y, z]) => {
        if (x < minX || x > maxX || y < minY || y > maxY || z < minZ || z > maxZ) {
          wall = false;
        } else if (!cubes.includes(`${x},${y},${z}`) && !visited.has(`${x},${y},${z}`)) {
          visited.add(`${x},${y},${z}`);
          newFreeAdjacent.push([x, y, z]);
        }
      });
    });

    freeAdjacent = newFreeAdjacent;
  }

  return wall;
};

cubes.forEach((cube, i) => {
  const [x, y, z] = cube.split(',').map(Number);

  const adjacent = [
    [x - 1, y, z],
    [x + 1, y, z],
    [x, y + 1, z],
    [x, y - 1, z],
    [x, y, z + 1],
    [x, y, z - 1],
  ];

  adjacent.forEach((adjacent) => {
    const [x, y, z] = adjacent;
    if (!cubes.includes(`${x},${y},${z}`)) {
      // side is not connected to another cube

      if (!isWalledIn(x, y, z)) {
        exposedSides++;
      }
    }
  });
});

console.log('exposed sides', exposedSides);

// 4216 too high
// 2530 too low
