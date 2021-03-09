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
    $('.template .N').each(function(idx) {
        const classes = $(this).attr("class");
    });
}