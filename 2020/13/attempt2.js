// const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');
const input = require('fs').readFileSync(require.resolve('./t3'), 'utf-8');

const schedule = input.split('\n')[1].split(',').map(x => x === 'x' ? 'x' : +x);

console.log('sschedule', schedule);

/**
 * Requirements for solution X
 * 1. Must be a multiple of schedule[0] (17) -> [[ x % schedule[0] === 0 ]]
 *  - because of this, we can call our start time X, and our 'factor', which we multiply shecdule[0] with, F
 * 2. For every bus n at index i in schedule:
 *  - Must have a multiple of n at x + i -> [[ x + i % n === 0 ]]
 *  - this can in turn be expressed like this -> [[ F % n === a constant that is easy to calculate]]
 * 
 *  it is easy to find one such x for every bus n - it takes too long to find an x that satifies every bus by raw computing of the above conditions
 *  even if using some clever optimizations, such as only checking every x that is a multiple of the largest bus numbers
 */


/**
 * Second attempt at writing concise requirements, trying to ignore the 'factor' thought
 * Requirements for solution T:
 *      For every bus B at offset O:
 * 
 *          Must have a multiple of B at position T + O -> [[ T + O % B === 0]]
 * 
 * This is easy to compute for small numbers, but when T is in the trillions, some clever rule must be deviced.
 * 
 * T Constraints:
 * 
 *      1. T must be a multiple of bus with offset 0 -> this will reduce the number of brute force checks by a factor equal to the buss' number
 * 
 * The 'factor' must be brought back...
 * 
 *      Because of constraint 1, the solution can be expressed as a factor F of schedule[0] (#bus1);
 *
 *      If you remove all but the first two busses from the example, you will find some multiple of #bus1 that solves the problem.
 *      
 *      Because bus #1 is 'solved' by all multiples of bus #1, the next solution has the following constraints:
 *      
 *          It must be a multiple of bus #1
 *          The factor F must be congruent modulo bus #2 with the first solution
 *          IE, we must add bus #2 to F, IE and bus #2 * bus #1 to the solution
 *
 *      Looking at only solutions that are a multiple of #1, solving #2 is trivial:
 *          Find the first multiple of #1, where a multiple of #2 is at offset O
 * 
 *      Solving a timetable with with 3 busses
 *          
 *          The factor F needs to be congruent modulo bus #2 with the solution to only #1 and #2,
 *          and congruent modulo bus #3 with the first solution to #1 and #3
 * 
 *          A way to bruteforce this:
 *              Take solution F to table that contains #1 and #2 - then add multiples of #2 until F is congruent modulu #3 with F in #1 and #3 solution.
 *           --- not quick enough
 *              while working on the chinese remainder solution i let this code run for 2-3hours, and it still did not solve the problem
 */

const singles = schedule.map((bus, index) => {

    if (bus === 'x') return null;

    let factor = 0;
    let i = 0;

    while (factor === 0) {
        const T = schedule[0] * ++i + index;
        if (T % bus === 0) {
            factor = i;
        }
    }

    return {
        bus,
        solution: factor,
    };

}).filter(Boolean).filter(({ bus }) => bus !== schedule[0]);

console.log('singles', singles);

let answer = null;
let i = 0;

const biggest = singles.find(({ bus }) => bus === Math.max(...schedule.slice(1).filter(x => typeof x === 'number')));
console.log('biggest', biggest);

while (!answer) {

    const F = (biggest.bus * ++i - (biggest.bus - biggest.solution));

    console.log('checking factor', F);

    answer = singles.every(({ bus, solution }) => {

        return F % bus === solution;
    }) ? F : null;
}

console.log('answer', answer * schedule[0]);