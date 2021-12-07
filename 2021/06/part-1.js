const range = require('../../utils/range');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

let state = lines[0].split(',').map(Number);

const iterations = 256;

range(1, iterations).forEach(day => {

    let spawns = 0;

    state = state.map(fish => {
        if (fish == 0) {
            spawns++;
            return 6;
        }

        return Number(fish) - 1;

    });

    while (spawns) {
        state.push(8);
        spawns--;
    }
});

console.log(`After ${iterations} days there are ${state.length} fish`);



