const input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');

const seats = input.split('\n');

const allSeatIDs = seats.map(seat => {

    const rowDesignator = seat.slice(0, 7);
    const columnDesignator = seat.slice(-3);

    const rowBinary = rowDesignator.replace(/F/g, '0').replace(/B/g, '1');
    const columnBinary = columnDesignator.replace(/R/g, '1').replace(/L/g, '0');

    const rowDecimal = parseInt(rowBinary, 2);
    const columnDecimal = parseInt(columnBinary, 2);

    const seatID = rowDecimal * 8 + columnDecimal;

    return seatID;

});

const sortedIds = allSeatIDs.sort();

const offset = sortedIds[0];

const seatAfterFirstGap = sortedIds.find((id, index) => {

    return id !== index + offset;
});

const mySeat = seatAfterFirstGap - 1;

console.log('my seat is', mySeat);
