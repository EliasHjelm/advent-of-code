const range = require('../../utils/range');
const combinations = require('../../utils/combinations');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t3'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t4'), 'utf-8');

const numz = input.split('\n').slice(0, -1).map(l => JSON.parse(l));

const add = (acc, curr) => {

    let s = JSON.stringify([acc, curr]).split(/(\D)/).filter(c => c !== '');

    let reduced;

        let once = false;
    
    let u = 0;
    const limit = Number.MAX_SAFE_INTEGER;
    while (!reduced && u++ < limit) {

        let depth = 0;
        let exploded = false;
        let split = false;

        // check explodes
        for (let i = 0; i < s.length; i++) {

            const c = s[i];

            if (c == '[') {
                depth++;
            }
            if (c == ']') {
                depth--;
            }

            if (depth == 5) {
                // explode

                exploded = true;

                const left = Number(s[i+1]);
                const right = Number(s[i+3]);

                let leftmost, rightmost;

                let li = i, ri = i + 4;

                while (leftmost === undefined && --li >= 0) {
                    if (/\d/.test(s[li])) {
                        leftmost = s[li];
                        s[li] = Number(leftmost) + left;
                    }
                }

                while (rightmost === undefined && ++ri < s.length) {
                    if (/\d/.test(s[ri])) {
                        rightmost = s[ri];
                        s[ri] = Number(rightmost) + right;
                    }
                }

                s.splice(i, 5, '0');

                break;

            }


        };

        if (exploded) continue;


        // check splits
        if (/\d\d/.test(s.join(''))) {

            once = true;

            const i = s.findIndex((v, i) => {
                return /^\d\d$/.test(v);
            });

            const v = Number(s[i]);

            s[i] = `[${Math.floor(v/2)},${Math.ceil(v/2)}]`;

            s.splice(i, 1, '[', `${Math.floor(v/2)}`, ',', `${Math.ceil(v/2)}`, ']');

            split = true;
        }

        if (split) continue;

        reduced = true;
    }

    console.log('RESULT AFTER REDUCE:', s.join(''))

    return JSON.parse(s.join(''));

}

const getMagn = ([left, right]) => {

    const leftv = Array.isArray(left) ? getMagn(left) : left;
    const rightv = Array.isArray(right) ? getMagn(right) : right;

    return leftv * 3 + rightv * 2;

}

const sums = combinations(range(0, numz.length - 1), range(0, numz.length - 1)).map(([i1, i2]) => {

    if (i1 == i2) return null;

    const sum = add(numz[i1], numz[i2]);

    return sum;
}).filter(Boolean);

const magns = sums.map(getMagn);

console.log('max', Math.max(...magns));

