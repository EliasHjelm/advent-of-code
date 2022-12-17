const detectCollision = (
  rock: number[][],
  chamber: Record<number, Record<number, string>>
) => {
  return rock.some(([x, y]) => {
    return Boolean(chamber[x]?.[y] || x < 0 || x > 6 || y === 0);
  });
};

export default detectCollision;
