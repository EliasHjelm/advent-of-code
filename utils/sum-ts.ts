const sum = (array: number[]) => {
  return array.length ? array.reduce((acc, curr) => acc + curr) : 0;
};

export default sum;
