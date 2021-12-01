// Problem #2
const input = require('fs').readFileSync('./input', 'utf-8');

const passwords = input.split('\n').map(string => {
    const [rule, password] = string.split(': ');

    const [span, character] = rule.split(' ');

    const [min, max] = span.split('-').map(Number);

    return {
        rule: {
            character,
            min,
            max,
        },
        password
    };
});

const validPasswords = passwords.filter(({ rule, password }) => {

    return (Number(password[rule.min - 1] === rule.character) + Number(password[rule.max - 1] === rule.character)) === 1;
});

console.log('valid passwords', validPasswords.length);
