// random hex number
const hexDigits = '0123456789abcdef';
function randHex(n) {
    return choices(hexDigits, n, joined = true, delim = '');
}

// copies the template that is created and assigns unique classes
// to each of the interactible elements
function createNewRow() {
    const postfix = randHex(6);
    let template = $('.template');
    let clone = template.clone();
    clone.removeClass('template');
    clone.find('.N').each(function (idx) {
        const classes = $(this).attr("class");
        $(this).attr("class", classes.replace(/N/g, postfix));
    });
    return clone;
}
// adds the clone to the DOM
function addClone(clone) {
    clone.removeClass('hidden');
    $('.rtable').append(clone);
}

let dice = {};

// reroll button
$('.rtable').on('click', '.reroll', function () {
    const classes = $(this).attr("class");
    const id = classes.split(' ')[1];
    let result = dice[id].roll();
    $(`.res.${id}`).html(result);
});

// save button, saves the equation of the dice
// into a new dice object and replaces the old one 
// with it
$('.rtable').on('click', '.save', function () {
    const classes = $(this).attr("class");
    const id = classes.split(' ')[1];
    dice[id] = new Dice($(`.eq.${id}`).val());
});

// button to add a new dice
$('.add').click(function () {
    addClone(createNewRow());
});