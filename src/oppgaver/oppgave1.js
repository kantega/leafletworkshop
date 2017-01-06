// Bakgrunnskart
var bakgrunnsLag = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw'
});


var favorittsted = L.marker([60.39, 5.33]);
favorittsted.bindPopup('Dette er mitt favorittsted i Bergen');

// Initialisering av kart
var mymap = L.map('mapid');

mymap.setView([60.39, 5.33], 12);
bakgrunnsLag.addTo(mymap);
favorittsted.addTo(mymap);


document.querySelector('.js-akvariet').addEventListener('click', function() {
    mymap.flyTo([60.3995, 5.3036], 18, {
        duration: 0.5,
    });
}, false)

document.querySelector('.js-bryggen').addEventListener('click', function() {
    mymap.flyTo([60.3973, 5.3233], 18, {
        duration: 0.5,
    });
}, false)

document.querySelector('.js-floien').addEventListener('click', function() {
    mymap.flyTo([60.3944, 5.3436], 18, {
        duration: 0.5,
    });
}, false)

document.querySelector('.js-helebergen').addEventListener('click', function() {
    mymap.flyTo([60.39, 5.33], 12, {
        duration: 0.5,
    });
}, false)


function onMapClick(e) {
    console.log('Du klikket på koordinaten [' + e.latlng.lat + ', ' + e.latlng.lng + ']');
}

mymap.on('click', onMapClick);


