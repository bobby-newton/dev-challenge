// Object that represents a User.
function User(data) {
    var self = this;
    self.name = data.name;
    self.id = data.id;
}

// Object that represents an Album.
function Album(data) {
    var self = this;
    self.title = data.title;
    self.id = data.id;
}

// Object that represents a Photo.
function Photo(data) {
    var self = this;
    self.id = data.id;
    self.title = data.title;
    self.url = data.url;
}

// Represents the data and operations in the UI.
var ViewModel = function () {
    // 1. Declare the data variables
    var self = this;
    self.users = ko.observableArray([]); // Stores an observable array of User objects.
    self.user = ko.observable(); // Stores a reference to the selected User object.
    self.showAlbums = ko.observable(false); // Controls the visibility of the section list-albuns (User name / Albums drop-down menu).
    self.albums = ko.observableArray([]); // Stores an observable array of Album objects.
    self.album = ko.observable(); // Stores a reference to the selected Album object.
    self.photos = ko.observableArray([]); // Stores an obervable array of Photo objects.

    // 2. Declare the operations
    self.onClickUser = function (user) {
        self.user(user.name);
        self.showAlbums(true);
        self.photos([])

        // Load user albums from JSONPlaceholder, convert it to Album instances, then populate self.albums
        $.getJSON("https://jsonplaceholder.typicode.com/albums", {
            "userId": user.id
        }, function (allData) {
            var mappedAlbums = $.map(allData, function (data) {
                return new Album(data);
            });
            self.albums(mappedAlbums);
        });
    };

    self.onClickAlbum = function () {

        
        if (self.album()) { // If selected album is defined/ not null, fetch photos for the selected album

            // Load album photos from JSONPlaceholder, convert it to Photos instances, then populate self.photos
            $.getJSON("https://jsonplaceholder.typicode.com/photos", {
                "albumId": self.album().id
            }, function (allData) {
                var mappedPhotos = $.map(allData, function (data) {
                    return new Photo(data);
                });
                self.photos(mappedPhotos);
            });

        } else { // Otherwise reset photos (for example, when we click the select album captions 'Albums')
            self.photos([]);
        }
        

    }

    // 3. Load users from JSONPlaceholder, convert it to User instances, then populate self.users
    $.getJSON("https://jsonplaceholder.typicode.com/users", function (allData) {
        var mappedUsers = $.map(allData, function (data) {
            return new User(data)
        });
        self.users(mappedUsers);
    });

};

ko.applyBindings(new ViewModel());