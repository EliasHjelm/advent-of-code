let filename = 'input';
// filename = 'i2';
// filename = 'i3';

let decks = require('fs').readFileSync(require.resolve(`./${filename}`), 'utf-8').split('\n\n');


decks = decks.map(d => d.split('\n').slice(1).map(Number));
console.log('decks', decks);

let depth = 0;

const play = (deck1, deck2) => {
    let r = 0;

    depth++;

    // clone decks
    const p1 = [...deck1];
    const p2 = [...deck2];

    const prev = [];

    let defaultWin = false;

    while (p1.length && p2.length && !defaultWin) {

        // console.log(`-- Round ${++r} -- (Depth: ${depth})`);
        // console.log(`Player 1's deck: ${p1.join(', ')}`);
        // console.log(`Player 2's deck: ${p2.join(', ')}`);

        const startingDecks = p1.join() + '-' + p2.join();

        if (prev.includes(startingDecks)) {
            // console.log(`Player 1 won by default`)
            defaultWin = true;
            break;
        }

        prev.push(startingDecks);


        const p1card = p1.splice(0, 1)[0];
        const p2card = p2.splice(0, 1)[0];

        // console.log('Player 1 plays:', p1card);
        // console.log('Player 2 plays:', p2card);

        let winner = null;
        const prize = [p1card, p2card];

        if (p1.length >= p1card && p2.length >= p2card) {

            const p1subdeck = p1.slice(0, p1card);
            const p2subdeck = p2.slice(0, p2card);

            const result = play(p1subdeck, p2subdeck);
            winner = result.winner == 1 ? p1 : p2;

            // winners card above losers card
            result.winner == 2 ? prize.reverse() : null;

            // console.log(`Player ${result.winner} wins the round by recursive combat`);

        } else if (+p1card > +p2card) {

            // console.log('Player 1 wins the round');
            winner = p1;

        } else {

            // console.log('Player 2 wins the round');
            winner = p2;

            // winners card above losers card
            prize.reverse();

        }

        winner.push(...prize);
    }

    const winningDeck = defaultWin ? p1 : [p1, p2].find(d => d.length);
    const winner = defaultWin ? 1 : Number(Boolean(p2.length)) + 1;

    depth--;

    return {
        deck: winningDeck,
        winner,
    };
}

const result = play(decks[0], decks[1]);

console.log('result', result);
const score = result.deck.reduce((total, card, index) => total + card * (result.deck.length - index), 0);

console.log(`Winning player score is ${score}`);