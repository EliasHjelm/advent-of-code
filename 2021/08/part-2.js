const range = require('../../utils/range');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

const all = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

const lengths = {};

let sum = 0;

lines.forEach(line => {
    const [input, output] = line.split(' | ');

    console.log('line', line);
    const inputVals = input.split(' ').map(v => [...v].sort().join(''));
    const outputVals = output.split(' ').map(v => [...v].sort().join(''));

    console.log('input vals', inputVals);

    const codex = {
        a: null,
        b: null,
        c: null,
        d: null,
        e: null,
        f: null,
        g: null,
    };

    const values = {
    };


    const one = inputVals.find(val => val.length == 2);
    const four = inputVals.find(val => val.length == 4);
    const seven = inputVals.find(val => val.length == 3);
    const eight = inputVals.find(val => val.length == 7);

    if (!one) {
        throw new Error('no 1');
    }

    const zerosixnine = inputVals.filter(val => val.length == 6);
    console.log('0 6 9', zerosixnine);

    let a = [...seven].find(c => !one.includes(c));
    codex.a = a;

    let bandd = [...four].filter(c => !one.includes(c));

    console.log('bandd', bandd, bandd[0], bandd[1]);

    const zero = zerosixnine.find(v => {
        console.log('v', v);
        const cond1 = !v.includes(bandd[0]);
        const cond2 = !v.includes(bandd[1]);
        console.log('cond1', cond1, cond2);
        return cond1 || cond2;
    });
    console.log('0 = ', zero);

    let d = bandd.find(c => !zerosixnine.every(val => val.includes(c)));
    codex.d = d;

    let b = bandd.find(c => c !== codex.d);
    codex.b = b;

    const sixnine = zerosixnine.filter(val => val !== zero);
    console.log('sixnine', sixnine);

    const six = sixnine.find(val => !val.includes(one[0]) || !val.includes(one[1]));

    if (!six) {
        console.log('one', one);
        throw new Error('no 6');
    }

    let c = [...one].find(c => !sixnine.every(val => val.includes(c)));
    codex.c = c;
    let f = [...one].find(c => c !== codex.c);
    codex.f = f;

    const nine = sixnine.find(val => val !== six);

    const twothreefive = inputVals.filter(val => val.length == 5);

    const two = twothreefive.find(val => !val.includes(codex.b) && !val.includes(codex.f));

    const threefive = twothreefive.filter(val => val !== two);

    const three = threefive.find(val => val.includes(codex.c));
    const five = threefive.find(val => val !== three);

    values[zero] = 0;
    values[one] = 1;
    values[two] = 2;
    values[three] = 3;
    values[four] = 4;
    values[five] = 5;
    values[six] = 6;
    values[seven] = 7;
    values[eight] = 8;
    values[nine] =  9;

    console.log('values', values);
    console.log('output', outputVals);


    const total = Number(outputVals.map(val => values[val]).join(''));

    console.log('total', total);

    sum += total;

});

console.log('sum', sum);
