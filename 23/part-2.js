const range = require('../utils/range');

let file = 'input';
// file = 'i2';

const input = require('fs').readFileSync(require.resolve(`./${file}`), 'utf-8');

console.log('input', input);
/**
 * Part 1 state
 */
// let prestate = input.split('');

/**
 * Part 2 state
 */
let prestate = [ ...input.split(''), ...range(Math.max(...input) + 1, 1000000).map(String) ];

/**
 * Rather than having state as an array
 * have it as an object, where the key is the cup, and the value is the next cup
 * this way, we don't have to slice up an array with 1 million elements every iteration
 * only change the pointers of affected cups
 */
let state = {};
prestate.forEach((l, i) => state[l] = prestate[i + 1] || prestate[0]);

let current = input[0];

let moves = 0;

const totalMoves = 10000000;

while (++moves <= totalMoves) {
    // console.log(`\n-- move ${moves} --`);
    // console.log('-- current:', current);

    /**
     * Pick 3
     */
    const picked = [state[current]];
    range(1, 2).forEach(r => {
        picked.push(state[picked[picked.length -1 ]]);
    });

    // console.log('picked:', picked);

    /**
     * Get destination cup
     */
    let dcup = current - 1 || prestate.length;
    while (picked.includes(String(dcup))) {
        dcup = (dcup - 1) || prestate.length;
    }

    // console.log('-- dest', dcup);

    /**
     * Update pointers
     */
    state[current] = state[picked[2]];
    state[picked[2]] = state[dcup];
    state[picked[1]] = picked[2];
    state[picked[0]] = picked[1]; 
    state[dcup] = picked[0];


    /**
     * Update current
     */
    current = state[current];

}

const a1 = state['1'];
const a2 = state[a1];

console.log(`Answer: ${a1} * ${a2} = ${a1 * a2}`);
