function User(data) {
    var self = this;
    self.name = data.name;
    self.id = data.id;
}

function Album(data) {
    var self = this;
    self.title = data.title;
    self.id = data.id;
    self.userId = data.userId;
}


function Photo(data) {
    var self = this;
    self.albumId = data.albumId;
    self.id = data.id;
    self.title = data.title;
    self.url = data.url;
    self.thumbnailUrl = data.thumbnailUrl;
}

var ViewModel = function () {
    // Data
    var self = this;
    self.users = ko.observableArray([]);
    self.user = ko.observable();
    self.showAlbums = ko.observable(false);
    self.albums = ko.observableArray([]);
    self.album = ko.observable();
    self.photos = ko.observableArray([]);

    // Operations
    self.onClickUser = function(user) {
        self.user(user.name);
        self.showAlbums(true);

        // Load user albums from JSONPlaceholder, convert it to Album instances, then populate self.albums
        $.getJSON("https://jsonplaceholder.typicode.com/albums", function (allData) {
            var mappedAlbums = $.map(allData, function (data) {
                if (data.userId === user.id) {
                    return new Album(data);
                } else {
                    return undefined;
                }
            });

            self.albums(mappedAlbums);
        });
    };

    self.onClickAlbum = function() {

        // Load album photos from JSONPlaceholder, convert it to Photos instances, then populate self.photos
        $.getJSON("https://jsonplaceholder.typicode.com/photos", function (allData) {
            var mappedPhotos = $.map(allData, function (data) {
                if (data.albumId === self.album().id) {
                    return new Photo(data);
                } else {
                    return undefined;
                }
            });

            self.photos(mappedPhotos);
        });
    }

    // Load users from JSONPlaceholder, convert it to User instances, then populate self.users
    $.getJSON("https://jsonplaceholder.typicode.com/users", function (allData) {
        var mappedUsers = $.map(allData, function (data) {
            return new User(data)
        });
        self.users(mappedUsers);
    });

};

ko.applyBindings(new ViewModel());