
module.exports = (start, end) => {

    if (end < start) {
        throw 'Error: range end smaller than start';
    }

    const length = end - start + 1;

    const arr = Array(length).fill(null);

    const r = arr.map((_, i) => start + i);

    return r;
}
