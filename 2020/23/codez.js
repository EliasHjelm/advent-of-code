const range = require('../utils/range');

let file = 'input';
file = 'i2';

const input = require('fs').readFileSync(require.resolve(`./${file}`), 'utf-8');

console.log('input', input);

/**
 * Part 1 state
 */
// let state = input.split('');

/**
 * Part 2 state
 */
let state = [ ...input.split(''), ...range(Math.max(...input) + 1, 1000000).map(String) ];

// console.log('state', state.join('-') ,'\n\n');

let moves = 0;

const geti = (i) => {
    return i % state.length;
};

let curr = 0;

let start = new Date();

while (++moves <= 10000000) {

    let t = new Date();

    console.log(`-- move ${moves} --`);

    const currentValue = state[curr];

    console.log(`cups: ${state.map(c => c == currentValue ? `(${c})` : `${c}`).join(' ')}`);

    const picked = [
        state[geti(curr + 1)],
        state[geti(curr + 2)],
        state[geti(curr + 3)],
    ];


    // console.log(`pick up: ${picked.join(', ')}`);

    let newState = state.filter(n => !picked.includes(n));
    // console.log(`Filtered in ${new Date() - t} ms`);


    let dcup = -1;

    let i = 0;

    while (dcup < 0) {
        let desired = String(currentValue - ++i);

        if (picked.includes(desired)) {
            continue;
        }

        if (desired == '0') {
            desired = String(newState.length + 3);
        }

        dcup = newState.findIndex(c => c == desired);

    }

    // console.log(`destination: ${newState[dcup]} \n`);


    newState.splice(dcup + 1, 0, ...picked);

    const newCurrentIndex = newState.findIndex(c => c == currentValue);

    curr = geti(newCurrentIndex + 1);

    state = newState;

    if (moves % 100 == 0) {
        const now = new Date();

        console.log(`Done ${moves} iterations in ${((now - start) / 1000).toFixed(1)} seconds`);

        const factor = 10000000 / moves;

        console.log(`Estimated time left: ${((factor * (now - start)) / 1000).toFixed(1)} seconds`);
    }

    console.log('completed loop in ', new Date() - t, 'ms');

}

// console.log(`After ${moves - 1} turns state is ${state.join(' ')}`)

const indexOf1 = state.indexOf('1');

const ans = state[geti(indexOf1 + 1)] * state[geti(indexOf1 + 2)];

console.log('p2 ans', ans);