const range = require('../../utils/range');
const combinations = require('../../utils/combinations');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

const dots = lines.slice(0, lines.indexOf(''));
const folds = lines.slice(lines.indexOf('') + 1, lines.indexOf('') + 2);

let grid = [];

dots.forEach(dot => {

    const [x,y] = dot.split(',').map(Number);

    grid[x] = grid[x] || [];
    grid[x][y] = 1;
});


console.log('folds', folds);

folds.forEach(fold => {

    const [axis,n] = fold.replace('fold along ', '').split('=');

    console.log('fold', axis, n);

    grid.forEach((row, x) => {

        (row || []).forEach((val, y) => {

            if (val && axis === 'y' && y > n) {

                const newY = n - Math.abs(y - n);

                console.log('folding - moving', x, y, 'to', x, newY);

                grid[x] = grid[x] || [];
                grid[x][newY] = 1;
            } else if (val && axis === 'x' && x > n) {

                const newX = n - Math.abs(x - n);

                console.log('folding x - moving', x, y, 'to', newX, y);

                grid[newX] = grid[newX] || [];
                grid[newX][y] = 1;

                delete grid[x];
            }
        });
    });

    if (axis === 'y') {
        grid = grid.map((row, x) => {
            return (row || []).map((y, index) => index >= n ? null : y);
        });
    } else {
        // grid = grid.map((row, x) => x >= n ? row : null).filter(row => row !== null);
    }

    console.log('fold', axis, n);

});

console.log(grid.length, 'rows');

const ans = grid.map(row => (row || []).reduce((acc, curr) => acc + (curr || 0), 0));
// console.log('ans', ans);

//804 too high
// 424 too low
console.log('ans', ans.reduce((acc, curr) => acc + curr));
