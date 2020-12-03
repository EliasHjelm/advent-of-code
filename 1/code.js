// Problem #2
const input = require('./input.json');

let answer = null;

for (let i = 0; i < input.length; i++) {

    const expense1 = input[i];

    for (let j = 1; j < input.length - i; j++) {

        const expense2 = input[i + j];

        for (let k = 1; k < input.length - i - j; k++) {

            const expense3 = input[i + j + k];

            if (expense1 + expense2 + expense3 === 2020) {
                answer = expense1 * expense2 * expense3;
                break;
            }

        }

        if (answer) break;

    }

    if (answer) break;
}

console.log('done!', answer);