const range = require('../utils/range');
const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');

// remove newline at end of file
const [rules, myTicket, nearby] = input.slice(0, -1).split('\n\n');

const validNumbes = new Set();

rules.split('\n').forEach(rule => {

    const ranges = rule.split(': ')[1].split(' or ').map(r => ({
        max: +r.split('-')[1],
        min: +r.split('-')[0],
    }));

    ranges.forEach(({ max, min }) => {
        range(min, max).forEach(num => {
            validNumbes.add(num);
        });
    });
});

/**
 * Part 1 answer
 */
let err = 0;

const validTickets = nearby.split('\n').slice(1).filter(tick => {

    const values = tick.split(',');

    let v = true;

    values.forEach(value => {

        if (!validNumbes.has(+value)) {
            err += +value;
            v = false;
        }
    });

    return v;
});

/**
 * Get list of rules and valid ranges for each rule
 */
const rs = rules.split('\n').map(rule => {

    const valid = new Set();

    const [name, val] = rule.split(': ');

    const ranges = val.split(' or ').map(r => ({
        max: +r.split('-')[1],
        min: +r.split('-')[0],
    }));

    ranges.forEach(({ max, min }) => {
        range(min, max).forEach(num => {
            valid.add(num);
        });
    });

    return {
        name,
        valid
    };
});

/**
 * Get all possible indices for each field
 */
const fs = rs.map(rule => {

    const { valid, name } = rule;

    const possible = [];

    for (i = 0; i < rs.length; i++) {

        const check = validTickets.every((ticket, index) => {

            return valid.has(+ticket.split(',')[i]);
        });

        if (check) possible.push(i);
    }

    return {
        name,
        possible,
    }
});

console.log('fs', fs);

/**
 * Boil it down
 */
while (fs.some(({ possible }) => possible.length > 1)) {

    fs.forEach(f => {

        if (f.possible.length === 1) {

            fs.forEach(f2 => {

                if (f2.name !== f.name) {
                    f2.possible = f2.possible.filter(i => i !== f.possible[0]);
                }
            });
        }
    });
}

console.log('solved', fs);

let deps = 1;
const myVals = myTicket.split('\n')[1].split(',').map(Number);

fs.forEach(f => {

    if (/^departure/.test(f.name)) {

        deps *= myVals[f.possible[0]];

    }
})


console.log('deps', deps);
