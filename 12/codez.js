const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./test1'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./test2'), 'utf-8');

let direction = 90;

const stuff = input.split('\n');

let x = 0;
let y = 0;

const dirs = {
    90: {
        x: 1,
        y: 0,
    },
    180: {
        x: 0,
        y: -1,
    },
    270: {
        x: -1,
        y: 0,
    },
    0: {
        x: 0,
        y: 1,
    },
};

stuff.forEach(instruction => {

    const dir = instruction[0];
    const val = Number(instruction.slice(1));

    if (dir === 'N') {
        y += val;
    } else if (dir === 'E') {
        x += val;
    } else if (dir === 'S') {
        y -= val;
    } else if (dir === 'W') {
        x -= val;
    } else if (dir === 'R') {
        direction = (direction + val) % 360
    } else if (dir === 'L') {
        direction = (direction + (360 - val)) % 360
    } else if (dir === 'F') {
        x += dirs[direction].x * val;
        y += dirs[direction].y * val;
    }

});

// part 1
console.log('answer is', Math.abs(x) + Math.abs(y));


x = 0;
y = 0;

let wp = {
    x: 10,
    y: 1,
};

stuff.forEach(instruction => {
    const dir = instruction[0];
    const val = Number(instruction.slice(1));

    let toTurn = 0;

    if (dir === 'N') {
        wp.y += val;
    } else if (dir === 'E') {
        wp.x += val;
    } else if (dir === 'S') {
        wp.y -= val;
    } else if (dir === 'W') {
        wp.x -= val;
    } else if (dir === 'R') {
        toTurn = val;
    } else if (dir === 'L') {
        toTurn = 360 - val;
    } else if (dir === 'F') {
        x += wp.x * val;
        y += wp.y * val;
    }

    if (toTurn) {

        const newWp = {};
        if (toTurn === 90) {
            newWp.x = wp.y;
            newWp.y = -wp.x;
        } else if (toTurn === 180) {
            newWp.x = -wp.x;
            newWp.y = -wp.y;
        } else if (toTurn === 270) {
            newWp.x = -wp.y;
            newWp.y = wp.x;
        }
        wp = newWp;
    }
});

console.log('answer is', Math.abs(x) + Math.abs(y));
