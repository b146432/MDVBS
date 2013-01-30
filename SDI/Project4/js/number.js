// SDI 1301 Project 4
// Michael Behan
// number.js - Number library functions.


// Show a number with the specified amount of decimal places
// @param number        - Floating point number
// @param decimalPlaces - Number of decimal places to show
// Returns: number
var showDecimals = function(number, decimalPlaces) {
    return number.toFixed(decimalPlaces);
};


// Fuzzy match a number
// @param number     - Number to fuzzy match
// @param number2    - number
// @param percentage - Percentage to use in comparison (number)
// Returns: boolean (true if fuzziness factor is less than the percentage supplied)
var fuzzy = function(number, number2, percent) {

    if (number === 0 || number2 === 0) {
        // don't allow division by zero
        return false;
    }

    var fuzziness = (number/number2) * 100;

    if (number === number2) {
        console.log(number + ' is equal to ' + number2 + ' and is therefore has a fuzzy factor of ' + fuzziness + '%');
    } else if (number < number2) {
        console.log(number + ' is less than ' + number2 + ' and has a fuzziness factor of ' + fuzziness + '%');
    } else {
        console.log(number + ' is more than ' + number2 + ' and has a fuzziness factor of ' + fuzziness + '%');
    }

    return (fuzziness <= percent);
};


// Returns the difference in hours or days given a date.
// @param type        - String, 'hours' or 'days'
// @param earlierDate - Can be a Date object or a String, e.g. 'Decemeber 25 2012'
// @param laterDate   - Can be a Date object or a String, e.g. 'Decemeber 28 2012'
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
