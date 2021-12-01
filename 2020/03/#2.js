const trees = Object.values(require('fs').readFileSync('./input', 'utf-8').split('\n').reduce((prev, current, index) => Object.keys(prev).reduce((acc, x) => ({ ...acc, [x]: prev[x] + (current[index * x % current.length] === '#')}), {}), { 0.5: 0, 1: 0, 3: 0, 5: 0, 7: 0})).reduce((total, current) => current * total);

console.log('trees', trees);