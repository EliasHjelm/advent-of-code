
module.exports = (...combs) => {

    let combos = [];

    combs.forEach((combination, index) => {

        const newCombs = [];

        if (index == 0) {
            combination.forEach(n => {
                newCombs.push([n]);
            });
        } else {
            combination.forEach(n => {

                combos.forEach(combo => {

                    newCombs.push([...combo, n]);
                });
            });
        }

        combos = newCombs;

    });

    return combos;

};
