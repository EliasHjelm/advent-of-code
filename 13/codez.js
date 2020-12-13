// const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
const input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const stuff = input.split('\n').slice(0, -1);
console.log('Input', stuff);


let acc = 0;
let ip = 0;
let flag = false;
let answer = false;

const start = stuff[0];

const busses = stuff[1].split(',').filter(x => x !== 'x').map(Number);

console.log('busses', busses);

for (let i = start; i < start + 10000000; i++) {

    const bus = busses.find(no => {

        return i % no === 0;
    });

    if (bus) {
        console.log('bus no', bus);
        console.log('answer', bus * (i- start));
        break;
    }
}

/**
 * Part 2
 */

const schedule = stuff[1].split(',');

const highestBus = Math.max(...busses);
const highestIndex = schedule.indexOf(String(highestBus));

console.log('highest', highestBus, highestIndex);

console.log('schedule', schedule);

const factors = busses.map(bus => {

    const index = schedule.indexOf(String(bus));

    let factor = 0;
    for (let i = 1; factor === 0; i++) {
    
        const minute = Number(schedule[0] * i);

        const rem = (minute + index) % +bus;

        if (rem === 0) {

            console.log('factor for bus', bus, 'is', i, 'minute', minute + index, '(index', index );
            factor = i;
            break;
        }
    
    }
    return {
        bus,
        remainder: factor,
        offset: bus - factor,
    };
}).sort((a, b) => b.bus - a.bus);

console.log('factors', factors);

const infoz = factors.reduce((total, { remainder, bus }) => {

    if (bus == schedule[0]) return {
        ...total,
        product: total.product * bus,
    };

    const offset = bus - remainder;

    const compound = factors.filter(factor => factor.bus !== bus && factor.bus != schedule[0]);
    
    
    const number = compound
    .reduce((total, {bus}) => bus * total, 1) * offset;
    console.log('compound', number);
    
    return {
        additive: total.additive + offset,
        multiplicative: total.multiplicative * offset,
        product: total.product * bus,
        compound: total.compound + number,
    };

}, {
    additive: 0,
    multiplicative: 1,
    product: 1,
    compound: 0,
});

console.log('info', infoz);

console.log('additive', infoz.product - (+schedule[0] * infoz.additive));
console.log('multi', infoz.product - (+schedule[0] * infoz.multiplicative));
console.log('compound', infoz.product - (1* infoz.compound));



for (let i = 1; !answer; i++) {


    const factor = (infoz.product / +schedule[0]) - i;

    // console.log('factor', factor);

    const check = factors[0].bus * factor - (factors[0].bus - factors[0].remainder);
    // const check = i;

    answer = factors.every(({ bus, remainder }) => {

        if (bus % schedule[0] == 0) return true;
        return check % bus === remainder;

    }) ? check : null;
};

console.log('i', answer);

console.log('answer is', answer * schedule[0]);



schedule.forEach((bus, index) => {
    if (bus === 'x') return null;

    const start = answer * schedule[0];
    // const start = 3417;

    console.log('bus', bus, 'departs at', start + index);

    console.log(`${start+index} % ${bus} === ${(start + index) % bus}`);

});