let input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');

const lines = input.split('\n').slice(0, -1);

function getNextOperator(s, i) {

    let j = i;
    let operator = s[j];
    while (!/[+*]/.test(operator)) {
        const n = s[++j];
        operator = n;
    }

    return {
        operator,
        j,
    };
}

function getNextOperand(s, i) {

    let j = i;
    let operand = s[j];

    while (!/[(0-9]/.test(operand)) {
        operand = s[++j];
    }

    if (operand === '(') {

        let level = 1;

        while (level) {
            const n = s[++j];

            if (n === '(') level++;
            if (n === ')') level--;

            operand += n;
        }

        operand = evaluate(operand.slice(1, -1));

    }

    return {
        operand,
        j,
    };
}

let f = 0;

function evaluate(s) {

    let { operand: sum, j: i } = getNextOperand(s, 0);

    while (i < s.length -1 ) {

        const {operator, j: j2} = getNextOperator(s, i);
        i = j2;
        const {operand, j} = getNextOperand(s, i);
        i = j;

        sum = operator === '+' ? +sum + +operand : +sum * +operand;

    }

    return +sum;

}

const ans = lines.reduce((acc, line) => acc + evaluate(line), 0);

console.log('ans', ans);