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


/**
 * Trying to do a dynamic programming solution
 */

const cache = {};

// function to get valid paths to end from a given index
const getSolutions = index => {

    // if you have reached the end, there's only one way to go
    if (index === numbers.length - 1) return 1;

    // check cache 1st
    if (cache[index]) return cache[index];

    // get to work
    const all = numbers.slice(index + 1, index + 4).reduce((paths, num, index2) => {
        if (num - numbers[index] <= 3) {
            return paths + getSolutions(index + index2 + 1);
        } else {
            return paths;
        }
    }, 0);

    cache[index] = all;

    return all;

}

console.log('the combinatinos are ', getSolutions(0));
