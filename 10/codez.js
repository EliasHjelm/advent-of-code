const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');

const numbers = input.split('\n').map(Number);

let counter = 1;

const sorted = numbers.sort((a, b) => a-b);

sorted.unshift(0);
sorted.push(sorted[sorted.length - 1] + 3);

const diffs = {};
sorted.forEach((num, index) => {
    if (sorted[index + 1]) {
        const diff = sorted[index + 1] - num;
        diffs[diff] = (diffs[diff] || 0) + 1;
    }
});

console.log('diffs', diffs);

/**
 * part 1 answer
 */
console.log('answer', diffs[1] * diffs[3]);

// valid permutations for n sequential numbers
const codex = {
    3: 2,
    4: 4,
    5: 7,
};

const sequences = {};
let arse = 1;
sorted.forEach((number, index) => {

    if (sorted[index+1]) {
        const diff = sorted[index+1] - number;

        if (diff === 1) {
            counter++;
        } else {
            sequences[counter] = (sequences[counter] || 0) + 1;
            const factor = codex[counter] || 1;
            arse = arse * factor;

            counter = 1;
        }

    }
});

console.log('sequences', sequences);

/**
 * part 2 answer
 */
console.log('answer', arse);
