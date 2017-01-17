
const mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>';

const mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

const grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr});
const streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

const DURATION = 0.5;



const steder = new L.LayerGroup();


const akvariet = L.polygon([
    [60.39973, 5.30204], 
    [60.40063, 5.30399], 
    [60.40011, 5.30590], 
    [60.39863, 5.30412]
], 
{
  color: '#0f0'
});
akvariet.bindPopup('Akvariet');
akvariet.addTo(steder);



const bryggen = L.marker([60.3973, 5.3233]);
bryggen.bindPopup('Bryggen');
bryggen.addTo(steder);

const floibanen = L.polyline([
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
floibanen.addTo(steder);


const baseLayers = {
    "Streets": streets,
    "Grayscale": grayscale
};

const overlays = {
    "Steder": steder
};

const mymap = L.map('mapid', {
    center: [60.39, 5.33],
    layers: [streets, steder],
    maxBounds: [[55.86, -0.26], [64.89, 18.50]],
    minZoom: 6,
    zoom: 12,
});

const layerControl = L.control.layers(baseLayers, overlays, {
    collapsed: false
});
layerControl.addTo(mymap);


document.querySelector('.js-akvariet').addEventListener('click', () => {
    mymap.flyToBounds(akvariet.getBounds(), {
        duration: DURATION,
    });
}, false)

document.querySelector('.js-bryggen').addEventListener('click', () => {
    mymap.flyTo(bryggen.getLatLng(), 18, {
        duration: DURATION,
    });
}, false)

document.querySelector('.js-floien').addEventListener('click', () => {
    mymap.flyToBounds(floibanen.getBounds(), {
        duration: DURATION,
    });
}, false)

document.querySelector('.js-helebergen').addEventListener('click', () => {
    mymap.flyTo([60.39, 5.33], 12, {
        duration: DURATION,
    });
}, false)




