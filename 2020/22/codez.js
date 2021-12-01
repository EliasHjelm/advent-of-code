let filename = 'input';
// filename = 'i2';

let decks = require('fs').readFileSync(require.resolve(`./${filename}`), 'utf-8').split('\n\n');


decks = decks.map(d => d.split('\n').slice(1).map(Number));
console.log('decks', decks);

let p1 = decks[0];
let p2 = decks[1];

let r = 0;

while (p1.length && p2.length) {

    console.log(`-- Round ${++r} --`);
    console.log(`Player 1's deck: ${p1.join(', ')}`);
    console.log(`Player 2's deck: ${p2.join(', ')}`);

    const p1card = p1.splice(0, 1)[0];
    const p2card = p2.splice(0, 1)[0];

    console.log('Player 1 plays:', p1card);
    console.log('Player 2 plays:', p2card);

    const prize = [p1card, p2card].sort((a, b) => b - a);

    if (+p1card > +p2card) {

        console.log('Player 1 wins the round');
        p1.push(...prize);

    } else {

        console.log('Player 2 wins the round');
        p2.push(...prize);

    }
}

const winner = [p1, p2].find(d => d.length);

const score = winner.reduce((total, card, index) => total + card * (winner.length - index), 0);

console.log('Winners deck is', winner.join(', '));

console.log('winners score is', score);