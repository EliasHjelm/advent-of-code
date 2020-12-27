let filename = 'input';
// filename = 'i2';

let lines = require('fs').readFileSync(require.resolve(`./${filename}`), 'utf-8').split('\n');

const recipes = lines.map(line => {

    let [ingr, allergens] = line.split(' (contains ');

    ingr = ingr.split(' ');
    allergens = allergens.slice(0, -1).split(', ');

    return {
        ingr,
        all: allergens,
    };
});

const byAllergen = {};
const byIngr = {};

recipes.forEach(rec => {

    const { ingr, all } = rec;

    all.forEach(a => {
        
            byAllergen[a] = byAllergen[a] || [];
        
            byAllergen[a].push(ingr);

    });

    ingr.forEach(i => {

        byIngr[i] = byIngr[i] || [];
        byIngr[i].push(all);
    })
});

console.log('by all', byAllergen);

console.log('by ingrd', byIngr);

let known = {};
let prev = {};

do {

    prev = { ...known };
    for (const all in byAllergen) {
    
        const recipes = byAllergen[all];
    
        const ingredients = recipes[0].filter(i => {
            return !(i in known) && recipes.every(r => r.includes(i));
        });
    
        if (ingredients.length === 1) {
    
            known[ingredients[0]] = all;
    
        }
    }
} while (Object.keys(known).length !== Object.keys(prev).length)


console.log('known', known);

console.log(Object.keys(byIngr))

const nonAllergenic = Object.keys(byIngr).filter(i => !(i in known));

console.log('non allergenic', nonAllergenic);

let count = 0;

recipes.forEach(r => {
    const { ingr } = r;

    ingr.forEach(i => {
        if (nonAllergenic.includes(i)) count++;
    });
});

/**
 * Part 1
 */
console.log('Appearing', count, 'times');

const sortedKnown = Object.keys(known).sort((a, b) => known[a].localeCompare(known[b]));

/**
 * Part 2
 */
console.log('sortedknown', sortedKnown.join());