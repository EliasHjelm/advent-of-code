const removeBorders = (tile) => {

    return tile.slice(1, -1).map(row => row.slice(1, -1));
}

module.exports = removeBorders;
