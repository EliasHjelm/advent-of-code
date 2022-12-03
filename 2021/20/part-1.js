const range = require('../../utils/range');
const combinations = require('../../utils/combinations');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);

const sep = lines.findIndex(line => line === '');

console.log('sep is at ', sep);

const codex = lines.slice(0, sep).join('');

let image = lines.slice(sep + 1);

console.log('codex', codex.length, codex[0], codex[511]);


let newImage;


let iterations = 50;

for (let i = 0; i < iterations; i++) {
  const newLength = image.length + 2;

  const VOID = codex[0] === '.' ? '.' : i % 2 === 1 ? codex[0] : codex[511];

  console.log('void', VOID, VOID.length, 'new length', newLength);

  image = image.map(line => [VOID, ...line, VOID].join(''));
  image.push(new Array(newLength).fill(VOID).join(''));
  image.unshift(new Array(newLength).fill(VOID).join(''));

  newImage = new Array(image.length).fill(null).map(_ => []);

  console.log('new image', newImage.length);
  // image.forEach(line => console.log(line));

  combinations(range(0, image.length - 1), range(0, image[0].length - 1)).forEach(comb => {

    const [col, row] = comb;

    const pixelsToConsider = combinations(range(col-1, col+1), range(row-1, row+1));

    const binary = pixelsToConsider.map(([col, row]) => {

      const pixel = (row > -1 && col > -1) ? (image[row]?.[col] || VOID) : VOID;

      return pixel === '#' ? '1' : '0';
    });

    const index = parseInt(binary.join(''), 2);

    const value = codex[index];

    newImage[row].push(value);

  });

  image = newImage.map(line => line.join(''));
  console.log('DONE WITH ITERATION', i + 1, 'image length', image.length,  'x', image[0].length);
}

image.forEach(line => console.log(line));

const lit = image.reduce((count, line) => {
  const lineCount = [...line].filter(char => char === '#').length;
  return count + lineCount;
}, 0);

console.log(lit, 'pixels lit');

