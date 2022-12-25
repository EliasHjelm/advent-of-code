const LIMIT = 300;

const logMap = (
  rows: Record<number, Record<number, string>>,
  path: Record<number, Record<number, string>>
) => {
  for (const row in rows) {
    const length = Math.max(...Object.keys(rows[row]).map(Number));

    let line = '';

    for (let i = 0; i <= length; i++) {
      const tile = rows[row][i];
      const pathd = path[row]?.[i] ? `\x1b[36m${path[row][i]}\x1b[0m` : null;

      line += pathd || tile || ' ';
    }

    if (Number(row) <= LIMIT) {
      console.log(line);
    }
  }
};

export default logMap;
