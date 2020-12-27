const getUniqueBorders = require('./get-unique-borders');
const getBorders = require('./get-borders');

const getCornerConnectionPoints = (corners, patterns) => {
    const connectionPoints = corners.flatMap(tile => {
    
        const cps = getBorders(tile);

        const uniqueBorders = getUniqueBorders(tile, patterns);
    
        uniqueBorders.forEach(edge => {
            delete cps[edge];
        });
    
        return Object.values(cps);
    
    });

    return connectionPoints;

}

module.exports = getCornerConnectionPoints;
