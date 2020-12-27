const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');

const passports = input.split('\n\n');

const validateByr = (byr) => {
    return byr >= 1920 && byr <= 2002;
};

const validateIyr = (iyr) => {
    return iyr >= 2010 && iyr <= 2020;
};

const validateEyr = (eyr) => {
    return eyr >= 2020 && eyr <= 2030;
};

const validateHgt = (hgt) => {
    const height = hgt.slice(0, -2);
    const unit = hgt.slice(-2);

    if (unit === 'cm') {
        return height >= 150 && height <= 193;
    } else if (unit === 'in') {
        return height >= 59 && height <= 76;
    } else {
        return false;
    }
};

const validateHcl = (hcl) => {
    return /^#[0-9a-f]{6}$/.test(hcl);
};

const validateEcl = (ecl) => {
    const validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
    return validColors.includes(ecl);
};

const validatePid = (pid) => {
    return /^\d{9}$/.test(pid);
};

const validatorFunctions = {
    byr: validateByr,
    iyr: validateIyr,
    eyr: validateEyr,
    hgt: validateHgt,
    hcl: validateHcl,
    ecl: validateEcl,
    pid: validatePid,
    cid: () => true,
};

console.log('total asswords', passports.length);

const validPassports = passports.filter(passport => {

    const passportFields = passport.split(/[\s\n]/);
    const hasCid = passportFields.some(field => /^cid/.test(field));
    if (passportFields.length < 7 || (passportFields.length === 7 && hasCid)) {
        return false;
    }

    // all passports are valid until proven otherwise
    let valid = true;


    passportFields.forEach(field => {

        const [fieldName, value] = field.split(':');

        const validatorFunction = validatorFunctions[fieldName];

        const isFieldValid = validatorFunction ? validatorFunction(value) : false;

        const isFieldDuplicate = passportFields.filter(field => {
            field.split(':')[0] === fieldName
        }).length > 1;

        if (!isFieldValid || isFieldDuplicate) {
            valid = false;
        }

    });

    return valid;

});

console.log(validPassports.length, 'valid passpords');
