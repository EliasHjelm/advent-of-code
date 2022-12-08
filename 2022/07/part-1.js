const range = require('../../utils/range');
const combinations = require('../../utils/combinations');
const sum = require('../../utils/sum');

let input
input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);
console.log('input', lines);

let currentDir = [];

const fs = {};

const files = {};

for (const line of lines) {

  if (/^\$/.test(line)) {

    const [_, command, arg] = line.split(' ');

    if (command === 'cd') {

      if (arg === '/') {
        currentDir = ['/'];
      } else if (arg === '..') {
        currentDir.pop();
      } else {
        currentDir.push(arg);
      }
    } else if (command === 'ls') {

    }

  } else {

    if (/^\d/.test(line)) {
      const path = currentDir.join('/').slice(1);
      const [size, name] = line.split(' ');
      files[`${path}/${name}`] = Number(size);
    }
  }
}

const dirs = {};

console.log('files', files);

  const regexp = /(.+)\/[a-z\.]+/i;
for (const file in files) {
  const match = file.match(regexp);
  console.log('file', file,);
  console.log('match', match);
  if (match) {
    const folders = match[1].split('/');
    console.log('folders', folders);
    let current = ['/'];
    for (const folder of folders) {
      if (folder) {
        current.push(folder);
      }
      const path = current.join('/').slice(1);
      dirs[path] = dirs[path] || 0;
      dirs[path] += files[file];
    }
  }
}

console.log('dirs', dirs);

let total = 0;

for (const dir in dirs) {
  const size = dirs[dir];

  if (size <= 100000) {
    total += size;
  }
}

console.log('ans', total);
