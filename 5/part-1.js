const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');

const seats = input.split('\n');

const highestID = Math.max(...seats.map(seat => {

    const rowDesignator = seat.slice(0, 7);
    const columnDesignator = seat.slice(-3);

    const rowBinary = rowDesignator.replace(/F/g, '0').replace(/B/g, '1');
    const columnBinary = columnDesignator.replace(/R/g, '1').replace(/L/g, '0');

    const rowDecimal = parseInt(rowBinary, 2);
    const columnDecimal = parseInt(columnBinary, 2);

    const seatID = rowDecimal * 8 + columnDecimal;

    return seatID;

}));

console.log('the highest seat ID is', highestID);
