// utility functions for generating random stuff
const randFloat = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(randFloat(min, max));
const choice = array => array[randInt(0, array.length)];
const choices = function (array, amt, joined = false, delim = '') {
    let temp = [];
    for (let i = 0; i < amt; i++) {
        temp.push(choice(array));
    }
    return joined ? temp.join(delim) : temp;
};