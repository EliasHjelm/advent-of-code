console.log('Advent of code day 18 part 1');

let input: string = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');

console.log('input', input);

const cubes = input.split('\n').slice(0, -1);

let exposedSides = 0;

cubes.forEach((cube) => {
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
      exposedSides++;
    }
  });
});

console.log('exposed sides', exposedSides);
