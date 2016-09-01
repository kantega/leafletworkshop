// Bakgrunnskart
var bakgrunnsLag = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
});

// Steder
var kantegaLokasjon = L.marker([63.4357, 10.4161]);
var festningenLokasjon = L.marker([63.8, 10.1]);


// DOM
var zoominnKantega = document.querySelector('#zoominnKantega');
var zoominnFestningen = document.querySelector('#zoominnFestningen');



// Initialisering av kart
var mymap = L.map('mapid');

mymap.setView([63.43, 10.39], 13);
bakgrunnsLag.addTo(mymap);



// EventListeners
zoominnKantega.addEventListener('click', function() {
    kantegaLokasjon.addTo(mymap);
    mymap.setView([63.4357, 10.4161], 18);
}, false)

zoominnFestningen.addEventListener('click', function() {
    festningenLokasjon.addTo(mymap);
    mymap.setView([63.4357, 10.4161], 18);
}, false)


function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

mymap.on('click', onMapClick);

mymap.on('moveend', function() {
    console.log(mymap.getCenter());
});