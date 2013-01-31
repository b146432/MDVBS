// SDI 1301 Project 4
// Michael Behan
// array.js - Array library functions.



// Returns the smallest number in an array that is greater than the supplied number.
// @param arr    - Array of numbers
// @param number - The number to check
// Returns: number or null if none found
var numberInArraySmallerThan = function (arr, number) {
    var arr2         = [],
        sortCallback = function(a, b) { return (a - b); }; // sort ascending

    arr = arr.sort(sortCallback);

    for (var i = arr.length; i >= 0; i--) {
        if (arr[i] > number) {
            arr2.push(arr[i]);
        }
    }

    arr2 = arr2.sort(sortCallback);

    return arr2[0];
};


// Return sum of all numeric values in the array
// @param: arr  - Array
var sumOfNumbersInArray = function(arr) {
    var sum = 0,
        len = arr.length;

    for (var i = 0; i < len; i++) {
        var el = arr[i];

        if (!isNaN(el)) {
            sum += el;
        }
    }

    return sum;
};


// Sorts an array of objects based on the value of a key
// in each of the objects.
// @param arr - Array
// @param key - Key name to look for in each object of the array.
// Returns: sorted array as described above.
// Note: the value of each key must be numeric (type number)
var sortArrayOfObjectsByKey = function(arr, key) {
    var sortCallback = function(a, b) {
        return (a[key] - b[key]);
    };

    return arr.sort(sortCallback);
};

