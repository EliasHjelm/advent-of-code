const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');

const passports = input.split('\n\n');

const validPassports = passports.filter(passport => {

    const passportFields = passport.split(/[\s\n]/);

    const hasCid = passportFields.some(field => /^cid/.test(field));

    return passportFields.length === 8 || (passportFields.length === 7 && !hasCid);
});

console.log('valid passports', validPassports.length);
