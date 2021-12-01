const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');

const rules = input.split('\n');

const structuredRules = rules.map(rawRule => {

    const [bagType, contents] = rawRule.split(' bags contain ');

    if (contents === 'no other bags.') {
        return {
            bagType,
            empty: true,
            contents: [],
        };
    }

    const contentEntries = contents.split(', ');

    const structuredContentEntries = contentEntries.map(entry => {
        const quantity = entry[0];
        const bagName = entry.match(/\d+\s(.+)\sbag/)[1];

        return {
            bagType: bagName,
            quantity,
        };
    });

    return {
        bagType,
        empty: false,
        contents: structuredContentEntries,
    };
});

const bagsThatMayContainGold = new Set();

let bagTypesToCheck = ['shiny gold'];

while (structuredRules.some(rule => {
    return rule.contents.some(({ bagType }) => bagTypesToCheck.includes(bagType))
})) {

    const newBagTypesToCheck = [];

    structuredRules.forEach(rule => {
        if (rule.contents.some(({ bagType }) => bagTypesToCheck.includes(bagType))) {
            bagsThatMayContainGold.add(rule.bagType);

            newBagTypesToCheck.push(rule.bagType);
        }
    });

    bagTypesToCheck = newBagTypesToCheck;
};

// part #1
console.log('this many bags may contain gold', bagsThatMayContainGold.size);

// part #2
let minimumContent = 0;

bagTypesToCheck = [{
    type: 'shiny gold',
    quantity: 1,
}];

while (structuredRules.some(rule => {
    return bagTypesToCheck.some(({ type }) => type === rule.bagType) && !rule.empty;
})) {

    const newBagTypesToCheck = [];

    bagTypesToCheck.forEach(({ type, quantity }) => {
        const rule = structuredRules.find(({ bagType }) => bagType === type);

        rule.contents.forEach(content => {
            minimumContent += quantity * Number(content.quantity);
            newBagTypesToCheck.push({ type: content.bagType, quantity: quantity * content.quantity });
        });
    });

    bagTypesToCheck = newBagTypesToCheck;
}

console.log('the minimum amount of bags you must put inside a shiny gold bag is', minimumContent);
