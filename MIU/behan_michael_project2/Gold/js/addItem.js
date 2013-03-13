// MIU 1303
// Project 1
// Michael Behan

// Auto-executing closure
(function() {

    // Define variables
    var CATEGORY_ID = 'category',
        // These are the form fields we will loop through.
        // The systems field is not included because it is a special case (multi-select)
        FORM_FIELDS = {
            'game': {
                pattern: /\w+/
            },
            'systems': {
                pattern: /\w+/
            },
            'code': {
                pattern: /\w+/
            },
            'author': {
                pattern: /\w+/
            },
            'thorough': {
                pattern: /^on$/
            },
            'ease': {
                pattern: /\d+/
            },
            'description': {
                pattern: /\w+/
            },
            'date': {
                pattern: /^\d{4}-\d{2}-\d{2}$/
            }
        },
        CATEGORIES = ['Cheat Code', 'Secret', 'Glitch'],
        CheatCode = function () {},
        STUBS_LOADED_KEY = 'cheat-codes-stubs-loaded'; // @TODO Remove before go-live!


    // Generate random key for localStorage.
    // @return string
    var getRandomKey = function() {
        return Math.ceil(Math.random()*1000000).toString();
    };


    // Load stubbed JSON into localStorage
    var loadStubs = function() {
        if (localStorage.getItem(STUBS_LOADED_KEY)) {
            return;
        }

        var key = null,
            o   = null;

        for (o in json) {
            key = getRandomKey();
            json[o].key = key;
            localStorage.setItem(key, JSON.stringify(json[o]));
        }

        // Set a flag in local storage that says stubs have
        // been loaded. This is checked above so that stubs
        // are not reloaded every time the page reloads.
        localStorage.setItem(STUBS_LOADED_KEY, 'true');
    };


    // Title Case a string of words.
    // @param: str - String of words separated by spaces
    // Returns: String with each word having its first letter capitalized.
    // Note: Taken from SDI work.
    var titleCase = function(str) {
        var words           = str.split(' '),
            titleCasedWords = [],
            len             = words.length,
            i               = 0;

        for (; i < len; i++) {
            words[i] = words[i].substr(0, 1).toUpperCase()
                     + words[i].substr(1, words[i].length).toLowerCase();
        }

        return words.join(' ');
    };


    // Set event bindings for various elements.
    var setupEvents = function() {
        // Add validate hooks to form fields:
        for (var o in FORM_FIELDS) {
            if (FORM_FIELDS.hasOwnProperty(o)) {
                $(o).blur(function(evt) {
                   validate(evt.target);
                });
            }
        }

        $('#ease').change(function(evt) {
            $('#ease-display').html(evt.target.value);
        });

        $('#save').click(function(evt) {
            var result = storeCheat(),
                $errorDiv = $('#error');

            evt.preventDefault();

            if (result) {
                alert('Saved!')
                location.reload();
                // Scroll to top
                window.scrollTo(0,0);
            } else {
                // Scroll to top
                window.scrollTo(0,0);
                $errorDiv.hide()
                return false;
            }
        });

        $('#clear-storage').click(function(evt) {
            evt.preventDefault();
            localStorage.clear();
            alert('All cheat codes have been deleted.')
            location.reload();
        });

        $('#display-cheats').click(function(evt) {
            evt.preventDefault();
            displayStoredCheats();
            toggleDisplay(evt);
            return false;
        });
    };


    // Update the value of the ease span based
    // on its associated input[type=range]
    var updateEaseDisplay = function() {
        $('#ease-display').html($('ease').value);
    };


    // Toggle between form display and stored
    // cheat code display.
    // @param evt - Event passed from handler.
    var toggleDisplay = function(evt) {
        var $form = $('#cheat-form'),
            $display = $('#display');

        if (!$form.is(":visible")) {
            $form.show();
            $display.hide();
            $(evt.target).html('Display Cheats');
        } else {
            $form.hide();
            $display.show();
            $(evt.target).html('Add Cheat');
        }
    };


    // Retrieve JSON array string of the selected gaming systems
    var getSelectedSystems = function() {
        var $el = $('#systems');

        if (!$el) {
            return false;
        }

        var systems = [],
            i = 0,
            selectedSystems = $el.get(0).selectedOptions,
            len = selectedSystems.length;

        for (; i < len; i++) {
            systems.push(selectedSystems[i].value);
        }

        return systems.join(',');
    };


    // Determine whether or not a form field is valid
    // @return boolean
    // @throw exception if element is not found.
    var isValid = function(domId) {
        if (domId) {
            return FORM_FIELDS[domId].pattern.test($('#' + domId).value);
        }

        throw 'isValid() failed for id ' + domId + ': element not found';
    };


    // Validate a form field
    var validate = function($el) {
        if (!isValid(el.getAttribute('id'))) {
            $el.addClass('error');
            return false;
        } else {
            $el.removeClass('error');
            return true;
        }
    };


    // Store data from the form and add/append it
    // to the session storage as a JSON string.
    var storeCheat = function() {
        var obj = new CheatCode(),
            key = getRandomKey(),
            $errors = $('#error-messages'),
            hasErrors = false;

        errors.innerHTML = '';
        obj.key = key;

        // Loop through form fields and store them
        // into our object.
        for (var o in FORM_FIELDS) {
            if (FORM_FIELDS.hasOwnProperty(o)) {
                var $field = $('#' + o);

                if (!validate($field)) {
                    $errors.html($error.html() + '<li>' + field.getAttribute('title') + ' is required.</li>');
                    hasErrors = true;
                } else {
                    obj[field.getAttribute('id')] = $field.value;
                }
            }
        }

        if (!hasErrors) {
            // Add systems separately since it is a
            // multi-select box.
            obj.systems = getSelectedSystems();

            // Was a key supplied? If so we're in edit mode
            // and will simply overwrite the existing content
            // in local storage.
            var $keyInput = $('#key');
            if ($keyInput.value !== '') {
                obj.key = $keyInput.value;
                localStorage.setItem($keyInput.value, JSON.stringify(obj));
            } else {
                localStorage.setItem(key, JSON.stringify(obj));
            }
        }

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
    var displayStoredCheats = function(category, search) {
        var data            = getStoredCheats(),
            $display         = $('#display'),
            len             = data.length;

        if (len === 0) {
            $display.html('No codes stored');
            return false;
        }

        // Loop through each object in data
        for (var i = 0; i < len; i++) {
            var article = document.createElement('article');
                article.className = 'entry';

            // Loop through each owned property in object,
            // creating markup and appending it to our display element.
            for (var o in data[i]) {
                dl = document.createElement('dl');

                if (o === 'key') {
                    // Handle 'key'
                    article.id = 'entry-' + data[i][o];
                } else if (o === 'category') {
                    // Handle category

                    // Create element that will store icon:
                    var aside = document.createElement('aside');
                        aside.className = 'icon ' + data[i][o];
                    article.appendChild(aside);
                } else {
                    // Handle all other types
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

                }
            } // end property loop

            // Add edit/delete buttons to entry:
            var editButton = undefined;
                editButton = document.createElement('a');
                editButton.innerHTML = 'Edit';
                editButton.href = '#';
                editButton.className = 'edit';
                // This format is required due to variable hoisting of article
                editButton.addEventListener('click', (function (article) {
                    return function(evt) {
                        evt.preventDefault();
                        $('save').innerHTML = 'Update Cheat';
                        editCode(article.id);
                        return false;
                    };
                })(article));
            article.appendChild(editButton);

            var deleteButton = undefined;
                deleteButton = document.createElement('a');
                deleteButton.innerHTML = 'Delete';
                deleteButton.href = '#';
                // This format is required due to variable hoisting of article
                deleteButton.addEventListener('click', (function (article) {
                    return function(evt) {
                        evt.preventDefault();
                        deleteCode(article.id);
                        return false;
                    };
                })(article));
            article.appendChild(deleteButton);

            display.appendChild(article);

        } // end object loop
    };


    // Loads the form for editing of an existing cheat code
    var editCode = function(id) {
        var key  = id.split('-')[1],
            data = JSON.parse(localStorage.getItem(key));

        // Loop through owned properties and pre-fill the
        // form fields for editing.
        for (var o in data) {
            $(o).value = data[o];
        }

        // Handle 'Affected Systems' multi-select:
        if (data['systems']) {
            var affectedSystems = data['systems'].split(','),
                el = $('systems');

            for (var i = 0, len = el.options.length; i < len; i++) {
                var option = el.options[i];

                if (affectedSystems.indexOf(option.value) !== -1) {
                    option.selected = true;
                }
            }
        }

        updateEaseDisplay();
        $('display-cheats').click();
    };


    // Deletes entry from local storage and fades out DOM element.
    // @param id - Local storage key to remove
    var deleteCode = function(id) {
        if (!window.confirm('Delete this entry?')) {
            return false;
        }

        var el = $(id);
            el.style.backgroundColor = 'rgb(200, 100, 100)';

        var opacity = 1.0,
            intervalId = 0;

        var fadeItem = function() {
            el.style.opacity = opacity;
            opacity -= 0.01;

            if (opacity < 0.0) {
                el.style.display = 'none';
                localStorage.removeItem(id.split('-')[1]);
                clearTimeout(intervalId);
                displayStoredCheats();
                return;
            }

            intervalId = setTimeout(fadeItem, 5);
        };

        intervalId = setTimeout(fadeItem, 5);
    };


    // Populate the category dropdown
    var populateCategory = function() {
        var el = $(CATEGORY_ID);

        if (el === null) {
            return false;
        }

        var i = 0,
            len = CATEGORIES.length;

        for (; i < len; i++) {
            var node = document.createElement('option');
            // Truncate spaces and lower case string to obtain value
            // of the option element we're adding to the category dropdown.
            node.value = CATEGORIES[i].replace(' ', '').toLowerCase();
            node.innerHTML = CATEGORIES[i];
            el.appendChild(node);
        }

        return true;
    };


    // Begin execution
    loadStubs(); // @TODO: Remove before this goes live!
    setupEvents();
    updateEaseDisplay();
    populateCategory();

})();
