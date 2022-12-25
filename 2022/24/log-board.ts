import range from '../../utils/range-ts';
import { Blizzards } from './part-1';

const getBlizzard = (blizzards: Blizzards, pos: [number, number]) => {
  const bs: string[] = [];

  blizzards.up.forEach((bPos) => {
    if (bPos[0] === pos[0] && bPos[1] === pos[1]) {
      bs.push('^');
    }
  });

  blizzards.down.forEach((bPos) => {
    if (bPos[0] === pos[0] && bPos[1] === pos[1]) {
      bs.push('v');
    }
  });
  blizzards.right.forEach((bPos) => {
    if (bPos[0] === pos[0] && bPos[1] === pos[1]) {
      bs.push('>');
    }
  });
  blizzards.left.forEach((bPos) => {
    if (bPos[0] === pos[0] && bPos[1] === pos[1]) {
      bs.push('<');
    }
  });

  if (bs.length === 0) {
    return false;
  } else if (bs.length === 1) {
    return bs[0];
  } else {
    return bs.length;
  }
};

const logBoard = (blizzards: Blizzards, width: number, height: number) => {
  for (const row of range(0, height - 1)) {
    let line = '#';
    for (const col of range(1, width - 2)) {
      if (row === 0) {
        line += col === 1 ? ' ' : '#';
      } else if (row === height - 1) {
        line += col === width - 2 ? ' ' : '#';
      } else {
        const bs = getBlizzard(blizzards, [row, col]);
        line += bs || '.';
      }
    }

    line += '#';
    console.log(line);
  }
};

export default logBoard;
