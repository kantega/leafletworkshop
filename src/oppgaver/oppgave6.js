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
    center: [63.430, 10.395],
    maxBounds: [[62.61356, 7.51465], [65.14611, 14.89746]],
    minZoom: 6,
    zoom: 12
});
map.addLayer(streets);

const nidarosdomen = L.polygon([
    [63.42739, 10.39341],
    [63.4278, 10.39983],
    [63.42555, 10.40006],
    [63.42459, 10.39742],
    [63.4246, 10.39416]
], {
  color: '#0f0'
});
nidarosdomen.bindPopup('Nidarosdomen');


const lerkendal = L.marker([63.41231, 10.40447]);
lerkendal.bindPopup('Lerkendal');

const sykkelheisen = L.polyline([
    [63.428, 10.40337],
    [63.42797, 10.40402],
    [63.42798, 10.40513],
    [63.42797, 10.40596]
], {
  color: '#f00'
});
sykkelheisen.bindPopup('Sykkelheisen');

/*
 Oppgave 6.1 - layerGroup

 I forrige oppgave lagde vi tre kartlag (Nidarosdomen, Lerkendal og Sykkelheisen) og
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
document.querySelector('.js-nidarosdomen').addEventListener('click', () => {
    map.flyToBounds(nidarosdomen.getBounds(), {
        duration
    });
});

document.querySelector('.js-lerkendal').addEventListener('click', () => {
    map.flyTo(lerkendal.getLatLng(), 18, {
        duration
    });
});

document.querySelector('.js-sykkelheisen').addEventListener('click', () => {
    map.flyToBounds(sykkelheisen.getBounds(), {
        duration
    });
});

document.querySelector('.js-heletrondheim').addEventListener('click', () => {
    map.flyTo([63.430, 10.395], 12, {
        duration
    });
});
