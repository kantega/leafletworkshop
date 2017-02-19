

const bakgrunnsLag = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
});

const DURATION = 0.5;

const favorittsted = L.marker([60.39, 5.33]);


const map = L.map('mapid');
map.setView([60.39, 5.33], 12);
map.addLayer(bakgrunnsLag);
map.addLayer(favorittsted);


document.querySelector('.js-akvariet').addEventListener('click', () => {
    map.flyTo([60.3995, 5.3036], 18, {
        duration: DURATION,
    });
}, false);

document.querySelector('.js-bryggen').addEventListener('click', () => {
    map.flyTo([60.3973, 5.3233], 18, {
        duration: DURATION,
    });
}, false);

document.querySelector('.js-floien').addEventListener('click', () => {
    map.flyTo([60.3944, 5.3436], 18, {
        duration: DURATION,
    });
}, false);

document.querySelector('.js-helebergen').addEventListener('click', () => {
    map.flyTo([60.39, 5.33], 12, {
        duration: DURATION,
    });
}, false);


function onMapClick(e) {
    console.log('Du klikket på koordinaten [' + e.latlng.lat + ', ' + e.latlng.lng + ']');
}

map.on('click', onMapClick);


