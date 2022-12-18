function combinations<T>(...combs: T[][]) {
  let combos: T[][] = [];

  combs.forEach((combination, index) => {
    const newCombs: T[][] = [];

    if (index == 0) {
      combination.forEach((n) => {
        newCombs.push([n]);
      });
    } else {
      combination.forEach((n) => {
        combos.forEach((combo) => {
          newCombs.push([...combo, n]);
        });
      });
    }

    combos = newCombs;
  });

  return combos;
}

export default combinations;
