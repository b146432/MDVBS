// SDI 1301 Project 3
// Michael Behan


// Global variables

// Itinerary JSON
var json = {
    "itinerary": [
        {
            "park": "Magic Kingdom",
            "fastPasses": [
                {
                    "location": "Space Mountain",
                    "arrival": "2:00pm-2:25pm"
                },
                {
                    "location": "Celebrate a Dream Come True Parade",
                    "arrival": "2:45pm-3:00pm"
                }
            ]
        },
        {
            "park": "Hollywood Studios",
            "fastPasses": [
                {
                    "location": "Twilight Zone Tower of Terror",
                    "arrival": "10:00am-10:15am"
                }
            ]
        }
    ]
};

// FastPass Object
var FastPass = function(place, time) {
    var location = place,
        arrival  = time;

    return {
        location: location,
        arrival: arrival
    };
};

// Itinerary Object
var Itinerary = function() {
    var rawData       = null,
        parks         = [],
        fastPasses    = [],
        fastPassCount = 0,
        favoritePark  = '',
        hasData       = false;

    function getHasData() {
        return hasData;
    }

    function getFavoritePark() {
        return favoritePark;
    }

    // Initialize from data
    // Parameter:
    //  data (raw JSON)
    function init(data) {
        rawData = data;

        for (var i = 0, len = json.itinerary.length; i < len; i++) {
            parks.push(json.itinerary[i].park);

            for (var j = 0, len2 = json.itinerary[i].fastPasses.length; j < len2; j++) {
                var fastPass = json.itinerary[i].fastPasses[j];
                fastPasses.push(fastPass);
            }
        }

        hasData = true;
        console.log('Itinerary Initialized');
    }

    function getParks() {
        if (parks.length > 0) {
            return parks;
        } else {
            return null;
        }
    }

    function setFavoritePark(name) {
        favoritePark = name;
    }

    function list() {
        console.log('Itinerary List:');
        if (parks.length > 0) {
            if (fastPasses.length > 0) {

                for (var j = 0, len2 = fastPasses.length; j < len2; j++) {
                    console.log("\t" + fastPasses[j].location + ' ' + fastPasses[j].arrival);
                }
            }
        }
    }

    function getFastPass(number) {
        return fastPasses[number] || 'Not Found';
    }

    return {
        getHasData: getHasData,
        init: init,
        rawData: rawData,
        getParks: getParks,
        setFavoritePark: setFavoritePark,
        favoritePark: favoritePark,
        list: list,
        getFastPass: getFastPass,
        getFavoritePark: getFavoritePark
    };
};

var i = new Itinerary();
console.log('Itinerary has data', i.getHasData())
i.init(json);
console.log('Itinerary has data', i.getHasData())
i.list();
i.setFavoritePark('Magic Kingdom');
var favorite = i.getFavoritePark();
var fastPass2 = i.getFastPass(1);

console.log('Favorite Park: ', favorite);
console.log('Second FastPass Location: ', fastPass2.location);

