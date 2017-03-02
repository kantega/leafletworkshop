/*
Oppgave 6: Grupper lag

I denne oppgaven vil vi se nærmere på gruppering og aktivering/deaktivering av
kartlag. Det vil være nyttig å ha [Layer Groups and Layers
Control](http://leafletjs.com/examples/layers-control/) åpen mens dere løser
disse oppgavene.
 */
const mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>';

const mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

const grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr});
const streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

const map = L.map('mapid', {
    center: [60.39, 5.33],
    maxBounds: [[55.86, -0.26], [64.89, 18.50]],
    minZoom: 6,
    zoom: 12
});
map.addLayer(streets);

const akvariet = L.polygon([
    [60.39973, 5.30204],
    [60.40063, 5.30399],
    [60.40011, 5.30590],
    [60.39863, 5.30412]
], {
  color: '#0f0'
});
akvariet.bindPopup('Akvariet');


const bryggen = L.marker([60.3973, 5.3233]);
bryggen.bindPopup('Bryggen');

const floibanen = L.polyline([
    [60.3964173561773, 5.328556895256043],
    [60.39660550579725, 5.329484939575195],
    [60.396311355912495, 5.331035256385803],
    [60.39560644537202, 5.333991050720216],
    [60.39533878737165, 5.337563753128053],
    [60.39480346476893, 5.342504382133484]
], {
  color: '#f00'
});
floibanen.bindPopup('Fløibanen');

/*
 Oppgave 6.1 - layerGroup

 I forrige oppgave lagde vi tre kartlag (Akvariet, Bryggen og Fløibanen) og
 viste dem på kartet. Vi kan samle disse lagene i en gruppe med L.layerGroup,
 slik at vi kan behandle dem som ett lag i stedet. Bruk L.layerGroup til å lage
 en gruppe, og legg den til i kartet. Se
 http://leafletjs.com/examples/layers-control/
 */
// din kode her


/*
 Oppgave 6.2 - slå kartlag av og på

 Kartlag kan deles inn i to kategorier. Baselayers og Overlays. Baselayers er
 selve bakgrunnskartet, mens alle markører og andre geometrier er overlays.

 L.control.layers tar to argumenter: baseLayers og overlays. Bruk
 L.control.layers til velge mellom gatekart og et kart i gråtoner. Variablene
 `grayscale` og `streets`, som er definert øverst i denne fila, definerer de to
 kartlagene.
 */
const baseLayers = {
    // definer kartlagene her
};
const overlays = {
    // definer gruppen fra 6.1 her
};
// bruk L.control.layers til å legge til kartlagene og stedene, og legg dem til
// i kartet med .addTo(map)


const duration = 0.5;
document.querySelector('.js-akvariet').addEventListener('click', () => {
    map.flyToBounds(akvariet.getBounds(), {
        duration
    });
});

document.querySelector('.js-bryggen').addEventListener('click', () => {
    map.flyTo(bryggen.getLatLng(), 18, {
        duration
    });
});

document.querySelector('.js-floien').addEventListener('click', () => {
    map.flyToBounds(floibanen.getBounds(), {
        duration
    });
});

document.querySelector('.js-helebergen').addEventListener('click', () => {
    map.flyTo([60.39, 5.33], 12, {
        duration
    });
});
