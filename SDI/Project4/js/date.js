// SDI 1301 Project 4
// Michael Behan
// string.js - String library functions.



// Returns the difference in hours or days given a date.
// @param type        - String, 'hours' or 'days'
// @param earlierDate - Can be a Date object or a String, e.g. 'Decemeber 25 2012'
// @param laterDate   - Can be a Date object or a String, e.g. 'Decemeber 25 2012'
// Returns: number
dateDifference = function(type, earlierDate, laterDate) {
    var differenceInMS = 0;

    if (typeof earlierDate === 'string') {
        earlierDate = new Date(earlierDate);
    }

    if (typeof laterDate === 'string') {
        laterDate = new Date(laterDate);
    }

    differenceInMS = laterDate.getTime() - earlierDate.getTime();

    if (type === 'hours') {
        // Return difference in hours
        // (milliseconds > seconds > minutes > hours)
        return Math.floor(differenceInMS / 1000 / 60 / 60);
    } else {
        // Return difference in days
        // (milliseconds > seconds > minutes > hours > days)
        return Math.floor(differenceInMS / 1000 / 60 / 60 / 24);
    }
};