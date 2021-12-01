const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');


// remove newline at end of file
const lines = input.split('\n').slice(0, -1);

const instructions = lines.map(line => {

    const [ instruction, value ] = line.split(' = ');

    if (instruction === 'mask') {

        return {
            type: instruction,
            value,
        }
    } else {

        const addr = +instruction.replace('mem[', '').slice(0, -1);

        return {
            type: 'mem',
            addr,
            value: +value,
        }
    }


});

let mem = [];

let mask;

for (let i = 0; i < instructions.length; i++) {

    const instruction = instructions[i];

    if (instruction.type === 'mask') {
        mask = instruction.value;
    } else {

        const { value, addr } = instruction;

        const binary = value.toString(2).padStart(36, '0');

        const newBinary = [...binary].map((x, index) => {
            return mask[index] === 'X' ? x : mask[index];
        }).join('');

        const newDecimal = parseInt(newBinary, 2);

        mem[addr] = newDecimal;


    }
}

const answer = mem.reduce((acc, curr) => acc + curr);

console.log('answer is', answer);


/** 
 * part 2
 */

mem = {};
mask = null;

for (let i = 0; i < instructions.length; i++) {

    const instr = instructions[i];
    console.log('processing', instr);

    if (instr.type === 'mask') {
        mask = instr.value;
    } else {

        const { value, addr } = instr;

        const addrBinary = addr.toString(2).padStart(36, '0');

        const masked = [...addrBinary].map((x, i) => {

            if (mask[i] === '0') return x;
            if (mask[i] === '1') return '1';
            if (mask[i] === 'X') return 'X';
        }).join('');

        const addressesToWrite = [''];

        for (const bit of masked) {

            if (bit === 'X') {

                const clones = [...addressesToWrite];

                addressesToWrite.forEach((addr, i) => {
                    addressesToWrite[i] += '1';
                });

                clones.forEach((clone, i) => {
                    clones[i] += '0';
                });

                addressesToWrite.push(...clones);

            } else {
                addressesToWrite.forEach((addr, i) => {
                    addressesToWrite[i] += bit;
                })

            }
        }

        addressesToWrite.forEach(addr => {
            const dec = parseInt(addr, 2);
            mem[dec] = value;
        });

    }

}



let a2 = 0;

for (const key in mem) {
    console.log('procesing', key);

    const val = mem[key];

    a2 += val;
}

console.log('answer is', a2);