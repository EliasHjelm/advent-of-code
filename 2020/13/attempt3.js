const modInverse = require('./mod-inverse');
const input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');

/**
 * Solution using imeplementation of chinese remainder theorem and BigInts
 *  */

const schedule = input.split('\n')[1].split(',').map(x => x === 'x' ? 'x' : BigInt(x));

console.log('sschedule', schedule);

const singles = schedule.map((bus, index) => {

    if (bus === 'x') return null;

    let factor = 0n;
    let i = 0n;

    let found = false;

    while (found === false) {
        const T = schedule[0] * i + BigInt(index);
        if (T % bus === 0n) {
            factor = i;
            found = true;
        }
        i = i + 1n;
    }

    return {
        modulo: BigInt(bus),
        residue: BigInt(factor),
    };

}).filter(Boolean).filter(({ modulo }) => modulo != schedule[0]);

console.log('singles', singles);
singles.forEach(({ modulo, residue }) => {
    console.log(`X should be congruent with ${residue} (mod ${modulo})`);
})

let constant = 0;
let factor = 0;

const sections = singles.map(({ modulo, residue }, index) => {

    let section = singles.reduce((acc, { modulo: newmod }) => modulo !== newmod ? newmod * acc : acc, 1n);
    
    console.log(`Section ${index} is at ${section}`);

    singles.forEach(single => {
        console.log(`Section ${index} mod ${single.modulo} is ${section % single.modulo}`);
    });

    let rez = section % modulo;

    if (rez !== residue) {

        const inverse = BigInt(modInverse(rez, modulo));

        section = section * inverse * residue;

        rez = section % modulo;

    }

    console.log(`Residue for section ${section} is ${rez} modulo ${modulo}`);

    return {
        modulo,
        residue,
        section,
    };

});

const ans = sections.reduce((acc, curr) => acc + curr.section, 0n);

const product = sections.reduce((acc, curr) => acc * curr.modulo, 1n);

console.log('an answer', ans);

console.log(' a product', product);

let answer = ans;


// get the smallest answer
while (answer > product) {
    answer -= product;
}

console.log(`My final answer is ${answer * schedule[0]} `);

