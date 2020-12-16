
module.exports = (start, end) => {

    const length = end - start + 1;

    const arr = new Array(length).fill(null);

    const r = arr.map((_, i) => start + i);

    return r;
}
