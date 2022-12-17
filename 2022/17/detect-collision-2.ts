const detectCollision2 = (rock: number[][], rows: string[][]) => {
  return rock.some(([x, y]) => {
    return Boolean(rows[y]?.[x] || x < 0 || x > 6 || y === 0);
  });
};

export default detectCollision2;
