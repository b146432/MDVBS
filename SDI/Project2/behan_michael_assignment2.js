// SDI 1301 Project 2
// Michael Behan


// Define variables
var restaurant     = 'Be Our Guest',
    guestsPerTable = 6,
    guestNames     = ['Tom', 'Carol', 'Renee', 'Michael', 'Jenny'];

// Greeting procedure.
// parameter: names (array of strings)
function greetGuests(names) {
    names = names || [];

    if (names.length === 0) {
        console.log('We have no guests to greet. Stay sharp.');
    } else {
        console.log('Welcome, folks!');
    }
}

// Boolean function
function canSitAtOneTable(names, guestsPerTable) {
    var tablesRequired = Math.ceil((names.length / guestsPerTable));

    if (tablesRequired !== 1) {
        console.log('You will have to sit at ' + tablesRequired + ' tables.');
    } else {
        console.log('We have tables large enough to accomodate your party!')
    }

    return (tablesRequired === 1);
}

// Number function
function announceSeatAssignments(numberOfGuests) {
    var i = 0;

    while (i < numberOfGuests) {
        console.log(guestNames[i] + ' will by sitting in seat ' + (i + 1));

        i = i + 1;
    }

    return numberOfGuests;
}

// String function
function getVipGuests(name1, name2) {
    var names = '';

    names = name1 + ' and ' + name2;

    return names;
}

// Array function
function inviteBossIfNotInParty(numberOfGuests, guestNames) {
    var i = 0,
        len = guestNames.length,
        bossName = 'Mickey Mouse',
        bossFound = false;


    for (; i < len; i++) {
        if (guestNames[i] === bossName) {
            bossFound = true;
        }
    }

    if (!bossFound) {
        guestNames.push(bossName);
        console.log('We are bringing in the Big Cheese to dine with you!')
    }

    return guestNames;
}


// Let's start'er up
greetGuests(guestNames);

var oneTable  = canSitAtOneTable(guestNames, guestsPerTable);
var seatCount = announceSeatAssignments(guestNames.length);
var vipGuests = getVipGuests(guestNames[2], guestNames[0]);
guestNames    = inviteBossIfNotInParty(guestNames.length, guestNames);

console.log((oneTable ? 'You can all fit at one table!' : 'You cannot fit at one table'));
console.log('You initially have ' + seatCount + ' seats occupied');
console.log('Your VIP Guests are ' + vipGuests);
console.log('Your full dining party consists of ' + guestNames.join(' and ') + '. Woo hoo!');


// EOF




