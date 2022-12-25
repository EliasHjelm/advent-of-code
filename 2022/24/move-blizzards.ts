import { Blizzards } from './part-1';

const moveBlizzards = (blizzards: Blizzards, height: number, width: number) => {
  const newBlizzards: Blizzards = {
    up: [],
    down: [],
    left: [],
    right: [],
  };

  blizzards.up.forEach((blizzard) => {
    let newRow = blizzard[0] - 1;

    if (newRow === 0) {
      newRow = height - 2;
    }

    newBlizzards.up.push([newRow, blizzard[1]]);
  });

  blizzards.down.forEach((blizzard) => {
    let newRow = blizzard[0] + 1;

    if (newRow === height - 1) {
      newRow = 1;
    }

    newBlizzards.down.push([newRow, blizzard[1]]);
  });

  blizzards.left.forEach((blizzard) => {
    let newCol = blizzard[1] - 1;

    if (newCol === 0) {
      newCol = width - 2;
    }

    newBlizzards.left.push([blizzard[0], newCol]);
  });

  blizzards.right.forEach((blizzard) => {
    let newCol = blizzard[1] + 1;

    if (newCol === width - 1) {
      newCol = 1;
    }

    newBlizzards.right.push([blizzard[0], newCol]);
  });

  return newBlizzards;
};

export default moveBlizzards;
