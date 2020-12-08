const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');

const executed = [];

let instructions = input.split('\n');

let nextInstruction = 0;
let acc = 0;

while (!executed.includes(nextInstruction)) {
    const instruction = instructions[nextInstruction];
    executed.push(nextInstruction);

    const [command, argument] = instruction.split(' ');

    if (command === 'nop') {
        nextInstruction++;
    } else if (command === 'jmp') {
        nextInstruction += Number(argument);
    } else {
        acc += Number(argument);
        nextInstruction++;
    }
}

console.log('acc is', acc);

// part 2
function boot(instructions, verbose = false) {

    const executed = [];
    let nextInstruction = 0;
    let acc = 0;

    while (!executed.includes(nextInstruction) && nextInstruction < instructions.length) {
        const instruction = instructions[nextInstruction];
        executed.push(nextInstruction);

        if (!instruction) {
            console.log('instruction missing at ', nextInstruction);
        }

        const [command, argument] = instruction.split(' ');

        if (command === 'nop') {
            nextInstruction++;
        } else if (command === 'jmp') {
            nextInstruction += Number(argument);
        } else {
            acc += Number(argument);
            nextInstruction++;
        }
    }

    return nextInstruction >= instructions.length ? acc : false;
}

function swapInstruction(instruction) {
    if (instruction.includes('nop')) {
        return 'jmp' + instruction.slice(3);
    } else if (instruction.includes('jmp')) {
        return 'nop' + instruction.slice(3);
    } else {
        return instruction;
    }
}

let answer = null;
let indexToChange = 0;

while (!answer && indexToChange < instructions.length) {

    instructions[indexToChange] = swapInstruction(instructions[indexToChange]);

    if (indexToChange === 273) {
        answer = boot(instructions, true);
    }

    answer = boot(instructions);

    instructions[indexToChange] = swapInstruction(instructions[indexToChange++]);
}

console.log('the answer is', answer);