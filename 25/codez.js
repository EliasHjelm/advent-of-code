const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);

const numbers = lines.map(Number);

let count1 = 1;
let count2 = 1;

const alg = (i, subj) => {

    return (+i * subj) % 20201227;
}

let f1 = false;
let f2 = false;

let i = 1;

while (!f1 || !f2) {

    const val = alg(i, 7);

    // console.log(`i ${i} val ${val} count1 ${count1} count2 ${count2}`);

    if (!f2 && val == numbers[1]) {
        f2 = true;
    } else if (!f2) {
        count2++;
    }

    if (!f1 && val == numbers[0]) {
        f1 = true;
    } else if (!f1) {
        count1++;
    }

    i = val;

}

console.log(count1, count2);

let key = 1;

console.log(`start key ${key}`)

for (let i = 0; i < count1; i++) {

    key = alg(key, numbers[1]);
    // console.log(`i ${i} key ${key}`);
}

console.log('encr key', key);