const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');

const groups = input.split('\n\n');

const yesCount = groups.reduce((total, group) => {

    const groupEntries = group.split('\n');

    const positiveAnswers = new Set;

    groupEntries.forEach(entry => {

        [...entry].forEach(answer => {

            if (groupEntries.every(entry => entry.includes(answer))) {

                positiveAnswers.add(answer);

            }

        });
    });

    return total + positiveAnswers.size;
}, 0);

console.log('the yes count is', yesCount);
