import range from '../../utils/range-ts';

const logMap = (rows: Record<number, Record<number, string>>) => {
  const rowMin = Math.min(...Object.keys(rows).map(Number));
  const rowMax = Math.max(...Object.keys(rows).map(Number));

  const colMin = Math.min(
    ...Object.values(rows).flatMap((column) => Object.keys(column).map(Number))
  );
  const colMax = Math.max(
    ...Object.values(rows).flatMap((column) => Object.keys(column).map(Number))
  );

  for (const row of range(rowMin - 1, rowMax + 1)) {
    let line = '';

    for (const col of range(colMin - 1, colMax + 1)) {
      const tile = rows[row]?.[col];

      line += tile || '.';
    }

    console.log(line);
  }
};

export default logMap;
