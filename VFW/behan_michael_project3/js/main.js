// VFW 1302
// Project 2
// Michael Behan

(function() {

    // Define variables
    var $ = function(id) {
            return document.getElementById(id);
        },
        CATEGORY_ID = 'category',
        // These are the form fields we will loop through.
        // The systems field is not included because it is a special case (multi-select)
        FORM_FIELDS = [
            'game': {
                pattern: /\w+/
            },
            'code': {
                pattern: /\w+/
            },
            'author': {
                pattern: /\w+/
            },
            'thorough': {
                pattern: /.+/
            },
            'description': {
                pattern: /\w+/
            },
            'date': {
                pattern: /^\d{4}-\d{2}-\d{2}$/
            }
        ],
        categories = ['Cheat Code', 'Secret', 'Glitch'],
        CheatCode = function() {};


    // Title Case a string of words.
    // @param: str - String of words separated by spaces
    // Returns: String with each word having its first letter capitalized.
    // Note: Taken from SDI work.
    var titleCase = function(str) {
        var words           = str.split(' '),
            titleCasedWords = [],
            len             = words.length;

        for (var i = 0; i < len; i++) {
            words[i] = words[i].substr(0, 1).toUpperCase()
                     + words[i].substr(1, words[i].length).toLowerCase();
        }

        return words.join(' ');
    };


    // Set event bindings for various elements.
    var setupEvents = function() {
        $('ease').addEventListener('change', function(evt) {
            $('ease-display').innerHTML = evt.target.value;
        });

        $('save').addEventListener('click', function(evt) {
            var result = storeCheat();

            evt.preventDefault();

            if (result) {
                location.reload();
            } else {
                alert('Please fill in all required fields!');
                return false;
            }
        });

        $('clear-storage').addEventListener('click', function(evt) {
            evt.preventDefault();
            localStorage.clear();
            location.reload();
        });

        $('display-cheats').addEventListener('click', function(evt) {
            evt.preventDefault();
            toggleDisplay(evt);
            return false;
        });
    };


    // Toggle between form display and stored
    // cheat code display.
    // @param evt - Event passed from handler.
    var toggleDisplay = function(evt) {
        var form = $('cheat-form'),
            display = $('display');

        if (form.style.display === 'none') {
            form.style.display = 'block';
            display.style.display = 'none';
            evt.target.innerHTML = 'Display Cheats';
        } else {
            form.style.display = 'none';
            display.style.display = 'block';
            evt.target.innerHTML = 'Add Cheat';
        }
    };


    // Retrieve JSON array string of the selected gaming systems
    var getSelectedSystems = function() {
        var el = $('systems');

        if (el === null) {
            return false;
        }

        var systems = [],
            i = 0,
            selectedSystems = el.selectedOptions,
            len = selectedSystems.length;

        for (; i < len; i++) {
            systems.push(selectedSystems[i].value);
        }

        return systems.join(',');
    };


    // Store data from the form and add/append it
    // to the session storage as a JSON string.
    var storeCheat = function() {
        var obj = new CheatCode(),
            i   = 0,
            len = FORM_FIELDS.length,
            key = Math.ceil(Math.random()*1000000).toString(),
            errors = $('errors'),
            hasErrors = false;

        // Loop through form fields and store them
        // into our object.
        for (; i < len; i++) {
            var value = $(FORM_FIELDS[i]).value;

            if (!value) {
                errors.innerHTML += '<li>' + FORM_FIELDS[i] + ' is required.</li>';
                hasErrors = true;
            }

            obj[FORM_FIELDS[i]] = value;
        }

        // Add systems separately since it is a
        // multi-select box.
        obj.systems = getSelectedSystems();

        localStorage.setItem(key, JSON.stringify(obj));

        return (false === hasErrors);
    };


    // Get data from loal storage
    // @return Array of CheatCode objects
    var getStoredCheats = function() {
        var i = 0,
            j = localStorage.length,
            arr = [];

        for (; i < j; i++) {
            var idx = localStorage.key(i);
            var item = JSON.parse(localStorage.getItem(idx));
            arr.push(item);
        }

        return arr;
    };


    // Cycle through cheat codes from localStorage
    // and display them.
    var displayStoredCheats= function() {
        var data = getStoredCheats(),
            display = $('display');

        if (!data) {
            display.innerHTML = 'No codes stored';
            return false;
        }

        var len = data.length;

        // Loop through each object in data
        for (var i = 0; i < len; i++) {
            var article = document.createElement('article');
                article.className = 'entry';

            // Loop through each owned property in object,
            // creating markup and appending it to our display element.
            for (var o in data[i]) {
                dl = document.createElement('dl');

                if (data[i].hasOwnProperty(o)) {
                    var dt = document.createElement('dt'),
                        dd = document.createElement('dd');

                    dt.innerHTML = titleCase(o) + ':';

                    if (o === 'systems') {
                        dd.innerHTML = data[i][o].split(',').join(' , ' ).toUpperCase();
                        dd.className = 'systems';
                    } else {
                        dd.innerHTML = data[i][o];
                        dd.className = o;
                    }

                    dl.appendChild(dt);
                    dl.appendChild(dd);
                    article.appendChild(dl);
                    display.appendChild(article);
                }
            } // end property loop
        } // end object loop
    };


    // Populate the category dropdown
    var populateCategory = function() {
        var el = $(CATEGORY_ID);

        if (el === null) {
            return false;
        }

        var i = 0,
            len = categories.length;

        for (; i < len; i++) {
            var node = document.createElement('option');
            // Truncate spaces and lower case string to obtain value
            // of the option element we're adding to the category dropdown.
            node.value = categories[i].replace(' ', '').toLowerCase();
            node.innerHTML = categories[i];
            el.appendChild(node);
        }

        return true;
    };


    // Begin execution:
    setupEvents();
    // Set default value of our ease-display SPAN:
    $('ease-display').innerHTML = $('ease').value;
    populateCategory();
    displayStoredCheats();

})();