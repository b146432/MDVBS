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
