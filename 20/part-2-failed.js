const combinations = require('../utils/combinations');
const range = require('../utils/range');
const getUniqueBorders = require('./get-unique-borders');
const getBorders = require('./get-borders');
const flip = require('./flip');
const rotate = require('./rotate');
const getCornerConnectionPoints = require('./get-corner-connection-points');

let input = require('fs').readFileSync(require.resolve('./input'), 'utf-8');
// input = require('fs').readFileSync(require.resolve('./t1'), 'utf-8');
// const input = require('fs').readFileSync(require.resolve('./t2'), 'utf-8');

const patterns = {};

const tiles = input.split('\n\n').slice(0, -1).map(t => {
    
    const n = t.split('\n')[0].split(' ')[1].slice(0, -1);
    const tile = t.split('\n').slice(1);

    // get original borders of tile;
    const borders = getBorders(tile);

    /**
     * Each tile can be rotated four ways and flipped four ways
     * store this as rotation in steps clockwise (0-3), and flipped in 'steps' 0-3 (no flip, horizontal flip, vertical flip, both flips)
     * store the borders for each variation
     */

    const variations = range(0, 3).map(rotation => {

        const flipz = range(0, 3).map(f => {

            return flip(tile, f);
        });

        const rotated = flipz.map((tile, i) => rotate(tile, rotation));

        return rotated;
    });

    const borderVariations = variations.map(tiles => {

        return tiles.map(getBorders);
    });


    return {
        n,
        tile,
        variations,
        borderVariations,
        borders,
    };

});


tiles.forEach(tile => {

    const borders = getBorders(tile.tile);

    // count occurences of patterns
    Object.values(borders).forEach(pat => {
        const inverted = [...pat].reverse().join('');
        patterns[pat] = (patterns[pat] || 0) + 1;
        patterns[inverted] = (patterns[inverted] || 0) + 1;
    });
});


const cornerTiles = tiles.filter(({ tile }) => getUniqueBorders(tile, patterns).length == 2);
const edgeTiles = tiles.filter(({ tile }) => getUniqueBorders(tile, patterns).length == 1);

console.log('found ', cornerTiles.length, 'corner tiles and', edgeTiles.length, 'edge tiles');

// lay the 4 corner tiles in whichever way - the inward facing edges are the connection points for the edge tiles

const possibleCornerRotations = combinations(range(0, 3), range(0, 3), range(0, 3), range(0, 3)).map((rotations) => {

    const corners = cornerTiles.map((tile, i) => {
        const t = flip(tile.tile, rotations[i])
        return t;
    });

    return {
        rotations,
        corners,
    };

});

console.log('found ', possibleCornerRotations.length, 'possible corner rotations');

const getEdgeTileConnections = (edgeTiles, connectionPoints) => {

    const edgeTilesConnectables = edgeTiles.filter(tile => {
    
        const unique = getUniqueBorders(tile.tile, patterns)[0];
    
        const sidesOfUnique = [tile.borders[(unique - 1 + 4) % 4], tile.borders[(unique + 1) % 4]];
    
        const withRev = [ ...sidesOfUnique, ...sidesOfUnique.map(s => [...s].reverse().join(''))]
    
        return withRev.some(pat => connectionPoints.includes(pat));
    
    });

    return edgeTilesConnectables;
};

const viableCornerRotations = possibleCornerRotations.filter(rot => {

    console.log('rot is', rot);

    const connectionPoints = getCornerConnectionPoints(rot.corners, patterns);

    const edgeTilesConnections = getEdgeTileConnections(edgeTiles, connectionPoints);

    console.log('found', edgeTilesConnections.length);


    return edgeTilesConnections.length >= 8;
});



console.log('found', viableCornerRotations.length, 'viable corner rotations');