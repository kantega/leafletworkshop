// Bakgrunnskart
var bakgrunnsLag = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw'
});

// La koordinatene vøre tilgjengelig i kildekoden, eller i oppgaveteksten. 
var akvariet = L.polygon([
    [60.39973, 5.30204], 
    [60.40063, 5.30399], 
    [60.40011, 5.30590], 
    [60.39863, 5.30412]
], 
{
  color: '#0f0'
});

// Legg inn denne koden manuelt.
akvariet.bindPopup('Akvariet');

var bryggen = L.marker([60.3973, 5.3233]);
bryggen.bindPopup('Bryggen');

var floibanen = L.polyline([
    [60.3964173561773, 5.328556895256043], 
    [60.39660550579725, 5.329484939575195], 
    [60.396311355912495, 5.331035256385803], 
    [60.39560644537202, 5.333991050720216], 
    [60.39533878737165, 5.337563753128053], 
    [60.39480346476893, 5.342504382133484]
], 
{
  color: '#f00'
});
floibanen.bindPopup('Fløibanen');



// Oppgave: Kommenter ut maxBounds-linje, og henvis til dokumentasjonen

var mymap = L.map('mapid', {
    maxBounds: [[55.86, -0.26], [64.89, 18.50]],
    minZoom: 6 
});

mymap.setView([60.39, 5.33], 12);
bakgrunnsLag.addTo(mymap);

// Kan ha én av linjene nedenfor, som må dupliseres
akvariet.addTo(mymap);
bryggen.addTo(mymap);
floibanen.addTo(mymap);


document.querySelector('.js-akvariet').addEventListener('click', function() {
    mymap.flyToBounds(akvariet.getBounds(), {
        duration: 0.5,
    });
}, false)

document.querySelector('.js-bryggen').addEventListener('click', function() {
    mymap.flyTo(bryggen.getLatLng(), 18, {
        duration: 0.5,
    });
}, false)

document.querySelector('.js-floien').addEventListener('click', function() {
    mymap.flyToBounds(floibanen.getBounds(), {
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


