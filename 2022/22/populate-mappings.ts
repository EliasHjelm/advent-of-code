import { strict as assert } from 'node:assert';
import range from '../../utils/range-ts';
const CUBE_SIZE = 50;
const CUBE_GRID_SIZE = 3;

const transformations: [number, number][] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

// // for test data
// const cubeMaps: Record<
//   number,
//   Partial<Record<0 | 1 | 2 | 3, [number, 0 | 1 | 2 | 3, boolean, boolean]>>
// > = {
//   // cube nr
//   2: {
//     0: [11, 2, false, false],
//     // key: facing, value 1: cube nr, value 2: new facing
//     2: [5, 1, false, false],
//     3: [4, 2, false, false],
//   },
//   4: {
//     1: [10, 3, false, false],
//     2: [11, 3, false, false],
//     3: [2, 1, false, false],
//   },
//   5: {
//     1: [10, 0, false, false],
//     3: [2, 0, true, false],
//   },
//   6: {
//     0: [11, 1, false, true],
//   },
//   10: {
//     1: [4, 3, false, true],
//     2: [5, 3, false, false],
//   },
//   11: {
//     0: [3, 1, false, false],
//     1: [4, 0, false, false],
//     3: [6, 2, false, false],
//   },
// };

const realCubeMaps: Record<
  number,
  Partial<Record<0 | 1 | 2 | 3, [number, 0 | 1 | 2 | 3, boolean, boolean]>>
> = {
  // top side
  1: {
    2: [6, 0, true, false],
    3: [9, 0, true, false],
  },
  // right side
  2: {
    0: [7, 2, true, false],
    1: [4, 2, true, false],
    3: [9, 3, false, true],
  },
  // front side
  4: {
    0: [2, 3, false, true],
    2: [6, 1, false, true],
  },
  // left side
  6: {
    2: [1, 0, true, false],
    3: [4, 0, true, false],
  },
  // bottom side
  7: {
    0: [2, 2, true, false],
    1: [9, 2, true, false],
  },
  // back side
  9: {
    0: [7, 3, false, true],
    1: [2, 1, false, true],
    2: [1, 1, false, true],
  },
};

// absolute to relative
const getRelativeCoords = (row: number, col: number): [number, number] => {
  return [row % CUBE_SIZE, col % CUBE_SIZE];
};

// relative to absolute
const getAbsoluteCoords = (
  row: number,
  col: number,
  cubeNo: number
): [number, number] => {
  const cubeRow = Math.floor(cubeNo / CUBE_GRID_SIZE);
  const cubeCol = cubeNo % CUBE_GRID_SIZE;

  const startRow = cubeRow * CUBE_SIZE;
  const startCol = cubeCol * CUBE_SIZE;

  if (row === 0 && col === 2 && cubeNo === 11) {
    console.log(
      `Row: ${row} col: ${col} Cube nr: ${cubeNo} gives startRow: ${startRow} startCol: ${startCol}`
    );
  }

  return [row + startRow, col + startCol];
};

// translate relative coords based on x number of clockwise rotations
const translateCoords = (
  coords: [number, number],
  rotations: 0 | 1 | 2 | 3,
  flipHorizontal: boolean,
  flipVertical: boolean
): [number, number] => {
  let [row, column] = coords;
  for (let i = 0; i < rotations; i++) {
    const newColumn = CUBE_SIZE - row - 1;
    const newRow = column;

    row = newRow;
    column = newColumn;
  }

  if (flipHorizontal) {
    column = CUBE_SIZE - 1 - column;
  }

  if (flipVertical) {
    row = CUBE_SIZE - 1 - row;
  }

  return [row, column];
};

const populateMap = (rows: Record<number, Record<number, string>>) => {
  const mappings: Record<string, [[number, number], 0 | 1 | 2 | 3]> = {};

  for (const row in rows) {
    const columns = rows[row];
    for (const column in columns) {
      const val = rows[row]?.[column];

      // check all 4 adjacent squares in all 4 facings
      const adjacent = transformations.map(([rDiff, cDiff]) => {
        return [Number(row) + rDiff, Number(column) + cDiff];
      });

      const cubeRow = Math.floor(+row / CUBE_SIZE);
      const cubeCol = Math.floor(+column / CUBE_SIZE);

      const cubeNo = CUBE_GRID_SIZE * cubeRow + cubeCol;

      adjacent.forEach(([adjRow, adjCol], facing) => {
        assert(range(0, 3).includes(facing));

        // if the adjacent tile is not part of the grid, the warping begins
        if (!rows[adjRow]?.[adjCol]) {
          if (!realCubeMaps[cubeNo]?.[facing]) {
            console.log('missing info', cubeNo, facing);
          }
          const [targetCube, targetFacing, flipHorizontal, flipVertical] =
            realCubeMaps[cubeNo][facing];
          const key = `${row}-${column}-${facing}`;
          // get relative coords inside square that makes up cube side
          const relativeCoords = getRelativeCoords(+row, +column);
          // count no of clockwise rotations
          const rotations = Math.abs(
            facing - (targetFacing < facing ? targetFacing + 4 : targetFacing)
          );
          assert([0, 1, 2, 3].includes(rotations));
          // get new relative coords
          const newRelativeCoords = translateCoords(
            relativeCoords,
            rotations as 0 | 1 | 2 | 3,
            flipHorizontal,
            flipVertical
          );
          // get new absolute coords
          const newAbsoluteCoords = getAbsoluteCoords(
            newRelativeCoords[0],
            newRelativeCoords[1],
            targetCube
          );

          if (targetCube === 11 && +row === 5 && +column === 11) {
            console.log(
              'relative coords is',
              relativeCoords,
              flipHorizontal,
              flipVertical
            );
            console.log('new relative', newRelativeCoords);
            console.log('new absolute', newAbsoluteCoords);
          }

          mappings[key] = [newAbsoluteCoords, targetFacing];
        }
      });
    }
  }

  return mappings;
};

export default populateMap;
