

// Global variables


// FastPass - stores information about a guest's fastpass for a facility
// Parameters:
//  attraction - String
//  time       - String
var FastPass = function(attraction, time) {
    this.attraction = attraction;
    this.time = time;
};

// Itinerary class; stores information about a guest's itinerary
// Parameters:
//  themePark: String
var Itinerary = function(themePark) {
    var park       = '',
        fastPasses = [];

    park = themePark;

    // Parameter:
    //  fastPass (FastPass instance)
    function addFastPass(fastPass) {
        fastPasses.push(fastPass);
        return this;
    }

    function list() {
        console.log('Itinerary:');
        for (var i in fastPasses) {
            console.log(fastPasses[i].attraction + ' at ' + fastPasses[i].time)
        }
        return this;
    }

    return {
      addFastPass: addFastPass,
      list: list,
      park: themePark
    };
};