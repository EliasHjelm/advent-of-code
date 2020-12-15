const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);

const numbers = lines[0].split(',');

const dict = {};

numbers.forEach((num, index) => {
    dict[num] = [index + 1];
});

let i = numbers.length;
let last = numbers[numbers.length - 1];

/**
 * Part 1 and 2
 */
const target = 30000000; 

while (i++ < target) {

    const prevInd = dict[last] || [];

    if (prevInd.length < 2) {
        last = '0';
    } else {
        last = String(prevInd[0] - prevInd[1]);

        if (Number.isNaN(last)) {
            console.log(`Got NaN from ${prevInd}`);
        }
    }
    dict[last] = dict[last] || [];
    dict[last].unshift(i);
    dict[last].length = Math.min(dict[last].length, 2);


    if (i % 100000 === 0) {
        console.log(`Another 100k in the bank: ${i / 100000}/${target/100000}`);
    }



}

console.log('answer', last);
