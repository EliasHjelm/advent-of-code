const getNewRowCol = (facing: 0 | 1 | 2 | 3, pos: [number, number]): [number, number] => {
  if (facing === 0) {
    return [pos[0], pos[1] + 1];
  } else if (facing === 1) {
    return [pos[0] + 1, pos[1]];
  } else if (facing === 2) {
    return [pos[0], pos[1] - 1];
  } else {
    return [pos[0] - 1, pos[1]];
  }
};

const getWrapRowCol = (
  rows: Record<number, Record<number, string>>,
  facing: 0 | 1 | 2 | 3,
  pos: [number, number]
) => {
  let [row, col] = pos;

  const reverseFacing: 0 | 1 | 2 | 3 = ((facing + 2) % 4) as 0 | 1 | 2 | 3;

  let newPos = getNewRowCol(reverseFacing, [row, col]);

  while (rows[newPos[0]]?.[newPos[1]]) {
    row = newPos[0];
    col = newPos[1];
    newPos = getNewRowCol(reverseFacing, [row, col]);
  }

  return [row, col];
};

const getNewPos = (
  rows: Record<number, Record<number, string>>,
  facing: 0 | 1 | 2 | 3,
  pos: [number, number]
): [number, number] => {
  const [newRow, newCol] = getNewRowCol(facing, pos);

  const newTile = rows[newRow]?.[newCol];

  // if new tile is empty space, keep walking
  if (newTile === '.') {
    return [newRow, newCol];
  }

  // if new tile is blocked, can't move
  if (newTile === '#') {
    return pos;
  }

  // if new tile is non existant, wrap around map
  const [wrappedRow, wrappedCol] = getWrapRowCol(rows, facing, pos);

  const wrappedTile = rows[wrappedRow][wrappedCol];

  // if we wrap into a wall, stop
  if (wrappedTile === '#') {
    return pos;
  }

  // else, move to wrapped square
  return [wrappedRow, wrappedCol];
};

export default getNewPos;
