// SDI 1301 Project 4
// Michael Behan
// string.js - String library functions.



// Test string for valid US phone number (10 digit with hyphens)i
// e.g.:  407-555-1212
// Returns: boolean
String.prototype.validPhone = function () {
    var selfAsArray = this.split('-');

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
// Returns: boolean
String.prototype.validEmail = function() {
    var userAndHost = this.split('@');

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
// Returns: boolean
String.prototype.isValidUrl = function() {
    var pieces = this.split(':');

    if (pieces.length !== 2) {
        return false;
    }

    var protocol = pieces[0];

    if (protocol === 'http' || protocol == 'https') {
        return true;
    }

    return false;
};


// Title Case a string of words
// Returns: String with each word having its first letter capitalized.
String.prototype.titleCase = function() {
    var words           = this.split(' '),
        titleCasedWords = [],
        len             = words.length;

    for (var i = 0; i < len; i++) {
        words[i] = words[i].substr(0, 1).toUpperCase() + words[i].substr(1, words[i].length);
    }

    return words.join(' ');
};


// Swap string separators
// @param currentSeparator (character currently separating characters of the string)
// @param newSeperator (new character seperator to replace the current one with)
// Returns: String
String.prototype.swapSeparators = function(currentSeperator, newSeparator) {
    return this.split(currentSeperator).join(newSeparator);
};


// Convert string to integer
// Returns: number or NaN if string is not parsable.
String.prototype.toInteger = function() {
    return parseInt(this, 10);
};

