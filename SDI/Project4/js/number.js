// SDI 1301 Project 4
// Michael Behan
// number.js - Number library functions.



// Show a number with the specified amount of decimal places
// @param number - Number of decimal places to show
// Returns: number
Number.prototype.showDecimals = function(number) {
    return this.toFixed(number);
};


// Fuzzy match a number
// @param numbertoCompare - number
// @param percentage - Percentage to use in comparison (number)
// Returns: boolean
Number.prototype.isFuzzy = function(compare, percent) {
    var dev= compare*(percent/100), n= +this;
    return n>= compare-dev && n<= compare+dev;
}





