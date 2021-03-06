// MIU 1303
// Project 1
// Michael Behan

// Auto-executing closure
(function($) {

    // Show Body
    // (Combats undesired FOUC effects)
    $('body').fadeIn();

    var $validator = $('#cheat-form').validate({
       rules:{
           game:{
               required: true,
           },
           code:{
               required: true
           },
           author:{
               required: true
           },
           thorough:{
               required: true
           },
           description:{
               required: true
           },
           date:{
               required: true
           }
       }
    });

    // Define variables
    var CATEGORY_ID = 'category',
        // These are the form fields we will loop through.
        // The systems field is not included because it is a special case (multi-select)
        FORM_FIELDS      = ['game', 'systems', 'code', 'author', 'thorough', 'description', 'date'],
        SYSTEMS          = ['xbox', 'ps3', 'pc', 'wii', 'wii-u', 'ds'],
        CATEGORIES       = ['Cheat Code', 'Secret', 'Glitch'],
        CheatCode        = function () {},
        STUBS_LOADED_KEY = 'cheat-codes-stubs-loaded', // @TODO Remove before go-live!
        displayStoredCheats,
        systems

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
            words[i] = words[i].substr(0, 1).toUpperCase() +
                       words[i].substr(1, words[i].length).toLowerCase();
        }

        return words.join(' ');
    };

    // Return an array of selected systems
    var getSelectedSystems = function() {
        var systems = [];

        $('[name=systems]').each(function() {
            var $this = $(this);
            if ($this.attr('checked')) {
                systems.push($this.attr('value'));
            }
        });

        return systems.join(',');
    };

    // Store data from the form and add/append it
    // to the session storage as a JSON string.
    var storeCheat = function() {
        var obj   = new CheatCode(),
            key   = getRandomKey(),
            $fields = $('#cheat-form :input');

        obj.key = key;

        // Loop through form fields and store them
        // into our object.
        $fields.each(function() {
           $this = $(this);

           if ($this.attr('name') !== 'systems') {
               obj[$this.attr('id')] = $this.attr('value');
           }
        });

        // Add systems separately since it is a
        // multi-select box.
        obj.systems = getSelectedSystems();

        // Was a key supplied? If so we're in edit mode
        // and will simply overwrite the existing content
        // in local storage.
        var $keyInput = $('#key');
        if ($keyInput.attr('value') !== '') {
            obj.key = $keyInput.attr('value');
            localStorage.setItem(obj.key, JSON.stringify(obj));
            console.log(obj);
        } else {
            localStorage.setItem(key, JSON.stringify(obj));
        }
    };


    // Get data from loal storage
    // @return Array of CheatCode objects
    var getStoredCheats = function(system, search) {
        var i = 0,
            j = localStorage.length,
            arr = [],
            idx, item;


        function systemMatches(item) {
            if (!item.systems) {
                return false;
            }
            if (system !== '' && item.systems.match(system)) {
                return true;
            }
            return false;
        }

        function searchMatches(item) {
            for (var o in item) {
                if (item[o].toString().match(search)) {
                    return true;
                }
            }
            return false;
        }

        for (; i < j; i++) {
            idx  = localStorage.key(i);
            item = JSON.parse(localStorage.getItem(idx));

            if (system && search) {
                if (systemMatches(item) && searchMatches(item)) {
                    arr.push(item);
                }
            } else if (system !== '') {
                if (systemMatches(item)) {
                    arr.push(item);
                }
            } else if (search !== '') {
                if (searchMatches(item)) {
                    arr.push(item);
                }
            } else {
                arr.push(item);
            }

        }

        return arr;
    };


    // Loads the form for editing of an existing cheat code
    var editCode = function(id) {
        var key  = id.split('-')[1],
            data = JSON.parse(localStorage.getItem(key)),
            i, len, o, option, systems;

        // Loop through owned properties and pre-fill the
        // form fields for editing.
        for (o in data) {
            // Handle Affected Systems
            if (o === 'systems') {
                systems = data[o].toLowerCase().split(',');

                if (!$.isArray(systems)) {
                    systems = [systems];
                }

                $(systems).each(function(idx, value) {
                    $('input[value="' + value + '"]').click();
                });
            }

            // Handle all other fields:
            $('#' + o).attr('value', data[o]);
        }

        $.mobile.changePage($("#add-or-edit"), "slide", true, true);
    };


    // Deletes entry from local storage and fades out DOM element.
    // @param id - Local storage key to remove
    var deleteCode = function(id) {
        if (!window.confirm('Delete this entry?')) {
            return false;
        }

        localStorage.removeItem(id.toString);

        $('#' + id).animate({
           'opacity': 0,
        }).slideUp();
    };


    // Cycle through cheat codes from localStorage
    // and display them.
    displayStoredCheats = function(system, search) {
        var data      = getStoredCheats(system, search),
            $display  = $('#display'),
            $article, $dl, $dt, $dd, o, $aside, i, len,
            $editButton, $deleteButton;

        len = data.length;
        if (len === 0) {
            $display.html('No codes stored');
            return false;
        }

        // Loop through each object in data
        for (i = 0; i < len; i++) {
            $article = $('<article/>', {
                'class': 'entry'
            });

            // Loop through each owned property in object,
            // creating markup and appending it to our display element.
            for (o in data[i]) {
                $dl = $('<dl/>');

                if (o === 'key') {
                    // Handle 'key'
                    $article.attr('id', ('entry-' + data[i][o]));
                } else if (o === 'category') {
                    // Create element that will store icon:
                    $aside = $('<aside/>').addClass('icon ' + data[i][o]);
                    $aside.appendTo($article);
                } else {
                    // Handle all other types
                    $dt = $('<dt/>').html(titleCase(o) + ':');
                    $dd = $('<dd/>');

                    if (o === 'systems') {
                        $dd.html(data[i][o].split(',').join(' , ' ).toUpperCase())
                        .addClass('systems');
                    } else {
                        $dd.html(data[i][o])
                        .addClass(o);
                    }

                    $dl.append($dt);
                    $dl.append($dd);
                    $article.append($dl);
                }
            } // end property loop

            // Add edit/delete buttons to entry:
            $editButton = $('<a/>', {
                'href': '#',
                'data-role': 'button',
                'data-inline': true,
                'data-mini': true
            })
            .html('Edit')
            .addClass('edit')
            .click((function(article) {
                return function(evt) {
                    evt.preventDefault();
                    editCode(article.attr('id'));
                    return false;
                };
            })($article));

            $deleteButton = $('<a/>', {
                'href': '#',
                'data-role': 'button',
                'data-inline': true,
                'data-mini': true
            })
            .html('Delete')
            .click((function (article) {
                return function(evt) {
                    evt.preventDefault();
                    deleteCode(article.attr('id'));
                    return false;
                };
            })($article));


            $article.append($editButton);
            $article.append($deleteButton);
            $display.append($article);

        } // end object loop
    };


    // Set event bindings for various elements.
    var setupEvents = function() {

        $('#cheat-form').on('submit', function(evt) {
           evt.preventDefault();
           if ($(this).valid()) {
               storeCheat();
               displayStoredCheats();
               $.mobile.changePage($('#show'), 'slide', true, true);
               return false;
           }
        });

        $('#search-form').on('submit', function(evt) {
            evt.preventDefault();
            var text = $('#search-box')[0].value;
            displayStoredCheats('', text);
            $('#display article dt, #display article dd').each(function(idx, value) {
                $value = $(value);

                // Highlight search terms found
                $value.html(
                    $value.html().replace(text, '<span class="match">' + text + '</span>')
                );
            });
            $.mobile.changePage($('#show'), 'slide', true, true);
            return false;
        });

        $('ul#systems li a').on('click', function(evt) {
            evt.preventDefault();
            var system = $(this).find('span.ui-btn-text').html().toLowerCase();
            displayStoredCheats(system, null);
            $.mobile.changePage($('#show'), 'slide', true, true);
        });

        $('#save').click(function(evt) {
            var result = storeCheat(),
                $errorDiv = $('#error');

            evt.preventDefault();

            if (result) {
                alert('Saved!');
                location.reload();
                // Scroll to top
                window.scrollTo(0,0);
            } else {
                // Scroll to top
                window.scrollTo(0,0);
                $errorDiv.hide();
                return false;
            }
        });

        $('#clear-storage').click(function(evt) {
            evt.preventDefault();
            localStorage.clear();
            alert('All cheat codes have been deleted.');
            displayStoredCheats();
        });
    };


    // Populate the category dropdown
    var populateCategory = function() {
        var $el = $('#' + CATEGORY_ID);

        if (!$el) {
            return false;
        }

        var i = 0,
            len = CATEGORIES.length;

        for (; i < len; i++) {
            var node = $('<option/>', {
                value: CATEGORIES[i].replace(' ', '').toLowerCase()
            }).html(CATEGORIES[i]);

            $el.append(node);
        }

        return true;
    };


    // Create navigation panels dynamically
    // @param $el - Page element to append navigation to
    var loadNavigationInPage = function($el) {
            var $navigation = $('<nav/>', {
                'data-role': 'navbar',
                'data-position': 'fixed',
                'data-transition': 'slide',
                'data-tap-toggle': false
            }),
            links = [
                {
                    href: '#home',
                    icon: 'home',
                    text: 'Home'
                },
                {
                    href: '#add-or-edit',
                    icon: 'plus',
                    text: 'Add'
                },
                {
                    href: '#about',
                    icon: 'info',
                    text: 'About'
                },
                {
                    href: '#news',
                    icon: 'check',
                    text: 'News'
                }
            ],
            i = 0,
            len = links.length,
            $ul = $('<ul/>');

        $ul.appendTo($navigation);

        $.each(links, function(idx) {
            var $li = $('<li/>'),
                $anchor = $('<a/>',{
                    href: links[idx].href,
                    'data-icon': links[idx].icon
                });
                $anchor.html(links[idx].text);

            $anchor.appendTo($li);
            $li.appendTo($ul);
        });

        $navigation.appendTo($el);
    };

    // Begin execution
    loadStubs(); // @TODO: Remove before this goes live!
    setupEvents();
    populateCategory();

    // Initalize toolbars on all pages
    $(['#home', '#add-or-edit', '#show', '#about', '#news']).each(function(idx, val) {
       loadNavigationInPage($(val));
    });


}) (jQuery);
