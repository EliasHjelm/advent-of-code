let input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');

const patterns= {};


// remove newline at end of file
const tiles = input.split('\n\n').slice(0, -1).map(t => {
    const n = t.split('\n')[0].split(' ')[1].slice(0, -1);

    const tile = t.split('\n').slice(1);

    const vEdges = [tile[0], tile[tile.length - 1]];
    const hEdges = [tile.map(l => l[0]).join(''), tile.map(l => l[l.length -1]).join('')];
    const vFlipped = [...vEdges].map(v => v.split('').reverse().join(''));
    const hFlipped = [...hEdges].map(h => h.split('').reverse().join(''));

    const vertical = [...vEdges, ...vFlipped];
    const horizontal = [...hEdges, ...hFlipped];

    console.log('v edges', vertical);

    console.log('h edges', horizontal);

    [...vertical, ...horizontal].forEach(pattern => {
        patterns[pattern] = (patterns[pattern] || []);
        patterns[pattern].push(n);
    });

    return {
        n,
        tile,
        horizontal,
        vertical,
    };
});

console.log(tiles.length);

console.log('pats', patterns);

const unique = Object.values(patterns).filter(v => v == 1);

console.log(unique.length, 'unique patterns');

const cornerTiles = tiles.filter(t => {
    const {n } = t;

    const uniqueEdges = Object.values(patterns).filter(v => v.length === 1).filter(v => v[0] == n);

    return uniqueEdges.length === 4;
});

console.log('corner tiles', cornerTiles);

const ans1 = cornerTiles.reduce((acc, { n }) => acc * +n, 1);

console.log('ans1', ans1);

