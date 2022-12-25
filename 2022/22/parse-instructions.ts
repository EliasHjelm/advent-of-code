const parseInstructions = (instr: string) => {
  let currentInstruction: string = '';
  const instructions: (string | number)[] = [];

  [...instr].forEach((c) => {
    if (c === 'L' || c === 'R') {
      if (currentInstruction) {
        instructions.push(parseInt(currentInstruction));
        currentInstruction = '';
      }
      instructions.push(c);
    } else {
      currentInstruction += c;
    }
  });

  if (currentInstruction) {
    instructions.push(parseInt(currentInstruction));
  }

  return instructions;
};

export default parseInstructions;
