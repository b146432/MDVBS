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

