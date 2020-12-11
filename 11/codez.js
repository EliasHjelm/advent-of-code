const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./inpu'), 'utf-8');

const rows = input.split('\n');

// let state = rows.map(row => [...row]);
let state = rows;

function getSeatStateChange(row, seat) {

    if (state[row][seat] === '.') return '.';

    const adjacentSeats = [
        [row-1, seat-1],
        [row-1, seat+1],
        [row-1, seat],
        [row, seat-1],
        [row, seat+1],
        [row+1, seat-1],
        [row+1, seat],
        [row+1, seat+1],
    ];

    const adjacentStatuses = adjacentSeats.map(([row, seat]) => state[row] ? state[row][seat] : '').filter(Boolean);

    if (adjacentStatuses.every(status => status !== '#')) {
        return '#';
    }

    if (state[row][seat] === '#' && adjacentStatuses.filter(status => status === '#').length > 3) {
        return 'L';
    }

    return state[row][seat];

};

let reference = [[]];

while (
    reference.flat().join() !== state.flat().join()
) {

    reference = state;

    const newState = state.map((_, row) => {

        return [..._].map((seat, index) => getSeatStateChange(row, index)).join('');
    });

    state = newState;

}


const answer = state.reduce((seats, row) => {
    return seats + [...row].reduce((acc, seat) => {
        return seat === '#' ? 1 + acc : acc;
    }, 0)
}, 0)

/**
 * Part 1 answer
 */

console.log('asnwer is', answer);

const directions = [
    [-1, 0],
    [1, 0],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
    [0, 1],
    [0, -1],
];

/**
 * reset
 */
reference = [[]];
state = input.split('\n');

function findAdjacentSeat(direction, row, seat) {

    let acc = 1;
    let found = '.';

    while (found === '.') {

        const newRow = row + (acc * direction[0]);
        const newSeat = seat + (acc * direction[1]);
        found = state[newRow] ? state[newRow][newSeat] : null;
        acc++;

    }

    return found;

}

function getSeatStateChange2(row, seat) {

    if (state[row][seat] === '.') return '.';

    const adjacentStatuses = directions.map(direction => findAdjacentSeat(direction, row, seat)).filter(Boolean);

    if (adjacentStatuses.every(status => status !== '#')) {
        return '#';
    }

    if (state[row][seat] === '#' && adjacentStatuses.filter(status => status === '#').length > 4) {
        return 'L';
    }

    return state[row][seat];

};



/**
 * Go forth
 */
while (
    reference.flat().join() !== state.flat().join()
) {

    reference = state;

    const newState = state.map((_, row) => {

        return [..._].map((seat, index) => getSeatStateChange2(row, index)).join('');
    });


    state = newState;

}


const answer2 = state.reduce((seats, row) => {
    return seats + [...row].reduce((acc, seat) => {
        return seat === '#' ? 1 + acc : acc;
    }, 0)
}, 0)

/**
 * Part 2 answer
 */

console.log('asnwer is', answer2);