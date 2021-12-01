// 12345678901234567890
//                   # 
// #    ##    ##    ###
//  #  #  #  #  #  #   

// the sea monster is 20 characters long
// start at the head and look down and back

// look for these patterns below heads
const body = '#    ##    ##    ###';
const feet = ' #  #  #  #  #  #   ';

const bodyIndices = [...body].map((c, i) => c == '#' ? i : null).filter(c => c !== null);
const feetIndices = [...feet].map((c, i) => c == '#' ? i : null).filter(c => c !== null);



const countSeaMonsters = (pic) => {
    let count = 0;

    // can't find any sea monster heads on the bottom two rows
    pic.slice(0, -2).forEach((pixels, row) => {

        [...pixels].forEach((p, index) => {

            if (p === '#' && index > 17) {

                const bodyString = pic[row + 1].slice(index - 18);
                const bodyTest = bodyIndices.every(i => bodyString[i] == '#');

                const feetString = pic[row + 2].slice(index- 18);
                const feetTest = feetIndices.every(i => feetString[i] == '#');

                if (feetTest && bodyTest) {
                    count ++;
                }

            }
        })

    });

    return count;
};

module.exports = countSeaMonsters;

