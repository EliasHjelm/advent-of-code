import { strict as assert } from 'node:assert';

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
  mappings: Record<string, [[number, number], 0 | 1 | 2 | 3]>,
  facing: 0 | 1 | 2 | 3,
  pos: [number, number]
): [[number, number], 0 | 1 | 2 | 3] => {
  const key = `${pos[0]}-${pos[1]}-${facing}`;

  const target = mappings[key];

  if (!target) {
    console.log(`target missing for pos ${pos}, facing ${facing}`);
  }
  assert(target);

  return target;
};

const getNewPos2 = (
  rows: Record<number, Record<number, string>>,
  facing: 0 | 1 | 2 | 3,
  pos: [number, number],
  mappings: Record<string, [[number, number], 0 | 1 | 2 | 3]>
): [[number, number], 0 | 1 | 2 | 3] => {
  const [newRow, newCol] = getNewRowCol(facing, pos);

  const newTile = rows[newRow]?.[newCol];

  // if new tile is empty space, keep walking
  if (newTile === '.') {
    return [[newRow, newCol], facing];
  }

  // if new tile is blocked, can't move
  if (newTile === '#') {
    return [pos, facing];
  }

  // if new tile is non existant, wrap around map
  const [[wrappedRow, wrappedCol], newFacing] = getWrapRowCol(mappings, facing, pos);

  const wrappedTile = rows[wrappedRow][wrappedCol];

  // if we wrap into a wall, stop
  if (wrappedTile === '#') {
    return [pos, facing];
  }

  // else, move to wrapped square
  return [[wrappedRow, wrappedCol], newFacing];
};

export default getNewPos2;
