const input2 = require('fs').readFileSync(require.resolve('./input'), 'utf-8');

const numbers = input2.split('\n').map(Number);

let ip = 0;

const input = numbers.slice(25);

const number = input.find((number, index) => {

    const preamble = numbers.slice(index, index + 25);

    return !preamble.some(pre => {

        return preamble.some(pre2 => {

            return pre !== pre2 && (pre + pre2 === number);

        });
    });
});

// part 1
console.log('number is', number);

let answer = false;

while (!answer) {

    let acc = 0;

    let i = ip++;

    while (acc < number) {

        acc += numbers[i++];

    }

    if (acc === number) {
        const answers = numbers.slice(ip, i);
        const min = Math.min(...answers);
        const max = Math.max(...answers);
        // part 2
        console.log('answers', min + max)
        answer = true;
    }
}
