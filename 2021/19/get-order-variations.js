const range = require('../../utils/range');
const combinations = require('../../utils/combinations');

const getOrderVariations = (beacons) => {

    const variations = [];

    // get all possible configurations of inverting axes
    combinations([0,1,2], [0,1], [0]).forEach(order => {

        const variation = beacons.map(beacon => {

            const pool = [...beacon];

            const bs = [];

            order.forEach(i => {
                bs.push(pool.splice(i, 1)[0]);
            });

            return bs;

        });

        variations.push(variation);
    });

    return variations;
}

module.exports = getOrderVariations
