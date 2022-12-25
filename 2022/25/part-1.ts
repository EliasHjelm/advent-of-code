import { strict as assert } from 'node:assert';
import sum from '../../utils/sum-ts';
const matches = __filename.match(/(\d{4})\/(\d{2})\/part-(\d)/);
assert(matches);
const [_, year, date, part] = matches;
console.log(`Advent of code ${year} day ${date} part ${part}!`);

let input: string = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');

const lines = input.split('\n').slice(0, -1);

const values = {
  2: 2,
  1: 1,
  0: 0,
  '-': -1,
  '=': -2,
};

const snafuValues = {
  2: '2',
  1: '1',
  0: '0',
  '-1': '-',
  '-2': '=',
};

const RADIX = 5;

const parseSNAFU = (snafu: string) => {
  let decimal = 0;

  [...snafu].reverse().forEach((c, i) => {
    const factor = Math.pow(RADIX, i) || 1;
    decimal += values[c] * factor;
  });

  return decimal;
};

const decimalToSnafu = (decimal: number) => {
  let snafu = '';

  let spillover = 0;
  while (parseSNAFU(snafu) !== decimal) {
    const factor = Math.pow(RADIX, snafu.length);
    const biggerFactor = Math.pow(RADIX, snafu.length + 1);

    // console.log('factor at ', snafu.length, factor, 'bigger factor', biggerFactor);

    const remainder = decimal % biggerFactor;
    let magnitude = Math.floor(remainder / factor);
    if (spillover && magnitude < RADIX - 2) {
      magnitude += spillover;
      spillover = 0;
    } else if (spillover && magnitude === RADIX - 2) {
      magnitude = -2;
    }

    // console.log('magnitude', magnitude, 'remainder', remainder);
    if (magnitude >= RADIX - 2) {
      spillover = 1;
      magnitude = magnitude - RADIX;
    }
    snafu = String(snafuValues[magnitude]) + snafu;
  }

  console.log(`Decimal: ${decimal} = snafu ${snafu}`);
  return snafu;
};

const realNumbes = lines.map(parseSNAFU);

console.log('ans', sum(realNumbes));
console.log(decimalToSnafu(sum(realNumbes)));
