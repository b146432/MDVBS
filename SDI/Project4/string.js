// Chain method courtesy of
// http://webreflection.blogspot.com/2010/02/javascript-override-patterns.html
var chain = (function () {
    // recycled empty callback
    // used to avoid constructors execution
    // while extending
    function __proto__() {}

    // chain function
    return function ($prototype) {
        // associate the object/prototype
        // to the __proto__.prototype
        __proto__.prototype = $prototype;
        // and create a chain
        return new __proto__;
    };
}());


function FSString(){};
FSString.prototype = chain(String.prototype);


// Test string for valid US phone number (10 digit with hyphens)i
// e.g.:  407-555-1212
// Returns: boolean
FSString.prototype.validPhone = function () {
    var selfAsArray = this.split('-');

    if (selfAsArray.length !== 3) {
        return false;
    }

    function validSegment(segment, expectedLength) {
        if (segment && !isNaN(segment) && segment.toFSString().length === expectedLength) {
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
FSString.prototype.validEmail = function() {
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
FSString.prototype.isValidUrl = function() {
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


// Title Case a string.
// Returns: FSString
FSString.prototype.titleCase = function() {
    var words = this.split(' '),
        titleCasedWords = [];


    for (var i = 0, len = words.length; i < len; i++) {
        var word  = words[i];
        var word2 = '';

        for (var j = 0, len2 = word.length; j < len2; j++) {
            if (j === 0) {
                word2[j] = word[j].toUpperCase();
            } else {
                word2[j] = word[j].toLowerCase();
            }
        }

        console.log(word2);

        titleCasedWords.push(word2);
    }

    return titleCasedWords.join(' ');
};



