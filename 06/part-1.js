const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');

const groups = input.split('\n\n');

const yesCount = groups.reduce((total, group) => {

    const individualAnswers = group.split('\n');

    const positiveAnswers = new Set;

    individualAnswers.forEach(answer => {
        [...answer].forEach(question => {
            positiveAnswers.add(question);
        });
    });

    return total + positiveAnswers.size;
}, 0);

console.log('the yes count is', yesCount);
