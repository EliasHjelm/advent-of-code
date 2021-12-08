const range = require('../../utils/range');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

const drawOrder = lines[0].split(',').map(Number);
const draw = [];

const winningLines = [
    range(0, 4),
    range(5, 9),
    range(10, 14),
    range(15, 19),
    range(20, 24),
    ...range(0, 4).map(offset => {
        return range(0, 4).map(n => n * 5 + offset);
    }),
];

const boards = input.split('\n\n').slice(1).map(raw => {
    return raw.replace(/\n/g, ' ').split(' ').filter(n => n !== '').map(Number);
});

console.log('boards', boards.map(b => b.join('')));

function checkWinner() {

    console.log('checking against', draw);

    let win;

    for (const board of boards) {

        win = winningLines.some(line => {

            return line.every(i => {
                return draw.includes(board[i]);
            });
        });

        if (win) {
            console.log('WIN');

            const sumOfUnmarked = board.filter(n => !draw.includes(n)).reduce((acc, curr) => acc + curr);
            console.log(', sum of unmarked', sumOfUnmarked);
            console.log('recently drawn', draw[draw.length - 1]);
            console.log('ans', sumOfUnmarked * draw[draw.length -1])
            break;
        }

    }

    return win;

}

while (!checkWinner() && drawOrder.length) {

    const num = drawOrder.shift();

    draw.push(num);

    console.log('drawing', num);

};

