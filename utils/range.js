
module.exports = (start, end) => {

    const length = Math.abs(end - start) + 1;

    const arr = Array(length).fill(null);

    const r = arr.map((_, i) => Math.min(start, end) + i);

    return r;
}
