const X_UPPER_BOUND = 3;
const X_LOWER_BOUND = -5;
const Y_LOWER_BOUND = -5;
const Y_UPPER_BOUND = 5;
const R_UPPER_BOUND = 5
const R_LOWER_BOUND = 1;
const ALERT_MSG_X = "X value is not an integer between(inclusive) " + X_LOWER_BOUND + " and " + X_UPPER_BOUND;
const ALERT_MSG_Y = "Y value is not a float between(exclusive) " + Y_LOWER_BOUND  + " and " +  Y_UPPER_BOUND;

function validateForm(event) {
    if (validateX() && validateY() && validateR())
        return true;
    event.preventDefault();
    return false;
}



function validateX() {
    let x = parseInt(document.getElementById("x").value);
    if (!Number.isInteger(x)) {
        alert(ALERT_MSG_X);
        return false;
    }

    if (x < X_LOWER_BOUND || x > X_UPPER_BOUND) {
        alert(ALERT_MSG);
        return false;
    }

    return true;
}


function validateY() {
    let y = parseFloat(document.getElementById("y").value);
    if (Number.isNaN(y)) {
        alert(ALERT_MSG_Y);
        return false;
    }

    if (y <= Y_LOWER_BOUND || y >= Y_UPPER_BOUND) {
        alert(ALERT_MSG)
        return false;
    }
    return true;
    
}


function validateR() {
    return true; // add validation later
}