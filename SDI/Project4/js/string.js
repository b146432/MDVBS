// SDI 1301 Project 4
// Michael Behan
// string.js - String library functions.


// Test string for valid US phone number (10 digit with hyphens)i
// @param str - String e.g.:  407-555-1212
// Returns: boolean
var validPhone = function(str) {
    var selfAsArray = str.split('-');

    if (selfAsArray.length !== 3) {
        return false;
    }

    function validSegment(segment, expectedLength) {
        if (segment && !isNaN(segment) && segment.toString().length === expectedLength) {
          return true;
        }
        return false;
    }

    var firstSegment  = selfAsArray.shift(),
        secondSegment = selfAsArray.shift(),
        thirdSegment  = selfAsArray.shift();

    if (!validSegment(firstSegment, 3) || !validSegment(secondSegment, 3) || !validSegment(thirdSegment, 4)) {
        return false;
    }

    return true;
};


// Test string for valid email address.
// @param str - String (email address)
// Returns: boolean
var validEmail = function(str) {
    var userAndHost = str.split('@');

    if (userAndHost.length !== 2) {
        return false;
    }

    var user = userAndHost[0],
        host = userAndHost[1];

    var hostAndTld = host.split('.');

    if (hostAndTld.length !== 2) {
        return false;
    }

    var tld = hostAndTld[1];

    return ((user.length > 0) && (host.length > 0) && (tld.length > 1));
};


// Test string for valid URL
// @param url - String
// Returns: boolean
var isValidUrl = function(url) {
    var pieces = url.split(':');

    if (pieces.length !== 2) {
        return false;
    }

    var protocol = pieces[0];

    if (protocol === 'http' || protocol == 'https') {
        return true;
    }

    return false;
};


// Title Case a string of
// @param: str - String of words separated by spaces
// Returns: String with each word having its first letter capitalized.
var titleCase = function(str) {
    var words           = str.split(' '),
        titleCasedWords = [],
        len             = words.length;

    for (var i = 0; i < len; i++) {
        words[i] = words[i].substr(0, 1).toUpperCase() + words[i].substr(1, words[i].length).toLowerCase();
    }

    return words.join(' ');
};


// Swap string separators
// @param str              - String
// @param currentSeparator - String (character currently separating characters of the string)
// @param newSeperator     - string (new character seperator to replace the current one with)
// Returns: String
var swapSeparators = function(str, currentSeperator, newSeparator) {
    return str.split(currentSeperator).join(newSeparator);
};


// Convert string to integer
// @param str - String (number as a String)
// Returns: number (log10) or NaN if string is not parsable.
var toInteger = function(str) {
    return parseInt(str, 10);
};
