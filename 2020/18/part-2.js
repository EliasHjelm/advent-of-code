let input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');

const lines = input.split('\n').slice(0, -1).map(s => [...s.replace(/\s/g, '')]);

const evalP = (string) => {

    let s = string;

    let i = 0;
    let level = 0;
    let start = 0;

    while (i < s.length) {

        const n = s[i];

        if (n == '(') {
            if (!level) {
                start = i;
            }
            level++;
        } else if (n ==')') {
            level--;

            if (!level) {

                const expr = s.slice(start + 1, i);

                console.log('found expr', expr.join(''));

                const value = evaluate(expr);

                console.log('value is', typeof value, ...value)

                s.splice(start, i - start + 1, value);

                i = start + value.length - 1;
            }
        }

        i++;
    }

    return s;

}

const add = (input, op) => {

    let s = input;

    let i = 0;

    while ( i < s.length) {

        const n = s[i];

        if (n === op) {

            const op1 = +s[i-1];
            const op2 = +s[i+1];

            const sum = eval(`${op1}${op}${op2}`);

            s.splice(i-1, 3, sum);

            i--;

        }

        i++;
    }

    return s;


}

const evaluate = (input) => {

    let s = input;

    console.log('starting with', input.join(''));

    // 1st unfold parenthesis
    s = evalP(s);

    //2nd  perform addition
    s = add(s, '+');

    // 3rd mulitply
    s = add(s, '*');

    console.log('evaluates to', s[0]);

    return s;

}

console.log(evaluate(lines[0]));
const ans = lines.reduce((acc, line) => acc + evaluate(line)[0], 0);

console.log('ans', ans);
