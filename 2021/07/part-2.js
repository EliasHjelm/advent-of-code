const range = require('../../utils/range');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

const numbers = lines[0].split(',').map(Number);


const max = Math.max(...numbers);
const min = Math.min(...numbers);

console.log('max', max, 'min', min);

let minDistance;

const costsByPos = [];

console.log('numbers', numbers);

for (let pos = 0; pos < max; pos++) {

    let total = 0;

    for (let i = 0; i < numbers.length; i++) {

        // console.log('i', i, 'num', numbers[i]);

        const distance = Math.abs(numbers[i] - pos);

        // console.log('dist', distance);

        const cost = distance > 1 ? range(1, distance).reduce((acc, curr) => acc + curr) : distance;

        // console.log('cost', cost);

        total += cost;

        // console.log('total', total);

        if (minDistance && (total > minDistance)) {
            console.log('save the trouble');
            break;
        }
    }

    console.log('result', { total, pos });

    if (!minDistance || (total < minDistance)) {
        minDistance = total;
    }

    costsByPos.push({
        total,
        pos,
    });

}

console.log('done');

costsByPos.sort((a, b) => a.total - b.total);

console.log(costsByPos[0], costsByPos[costsByPos.length - 1]);


