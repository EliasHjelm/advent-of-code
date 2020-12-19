// const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
const input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


const [ruleLines, msgLines] = input.split('\n\n');

const rules = Object.fromEntries(ruleLines.split('\n').map(line => {

    const [nr, rule] = line.split(': ');

    return [nr, rule];
}));

console.log('rules', rules);

/**
 * Adjust flag based on if input is updated or not
 */
let updatedRules = true;

const getPattern = (n) => {

    const rule = rules[n];

    if (rule[0] === '"') return rule[1];

    if (n == '8' && updatedRules) return `${getPattern('42')}+`;
    if (n == '11' && updatedRules) return `(?<g1>${getPattern('42')}+)(?<g2>${getPattern('31')}+)`;

    const conditionals = rule.split(' | ').map(c => {
        const patterns = c.split(' ').map(getPattern).join('');
        return patterns;
    });

    const pattern = conditionals.length ? `(${conditionals.join('|')})` : conditionals[0];

    return pattern;

};

/**
 * Part 1
 */
const regex1 = new RegExp(`^${getPattern(0)}$`);

/**
 * Part 2
 */
// special case because rule 0 says '8 11', where 8 can repeat pattern(42) any number of times
// and 11 must repeat pattern 42 followed by pattern 31 the same number of times
// regex cannot solve this, so filter matches after the fact
// for a solution to be valid, g1 count must be higher than g2 count
const regex = new RegExp(`^(?<g1>${getPattern('42')}+)(?<g2>${getPattern('31')}+)$`);

const messages = msgLines.split('\n').slice(0, -1);

const valid = messages.filter(msg => {
    const result = regex.exec(msg);

    if (!result) return false;

    if (!updatedRules) return true;

    /**
     * Part 2 filtering logic
     */
    const { g1, g2 } = result.groups;

    // get count of matches for group1 and group 2
    let g1c, g2c;

    for (let i = 1; (!g1c || !g2c); i++) {
        const r42 = new RegExp(`^${getPattern(42)}{${i}}$`);
        const r31 = new RegExp(`^${getPattern(31)}{${i}}$`);

        if (r42.test(g1)) g1c = i;
        if (r31.test(g2)) g2c = i;

    }

    return g1c > g2c;

});

console.log('valid msg', valid.length);
