/*
 Oppgave 2: Markører og popups

 I denne oppgaven vil vi fortsette på det gode grunnlaget vi etablerte i oppgave
 1, og lære mer om markører og geometrier.
 */

const bakgrunnsLag = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
});
const duration = 0.5;

// Avgrensning av kartet for oppgave 2.1
const boundarySouthWest = [55.86, -0.26];
const boundaryNorthEash = [64.89, 18.50];

/*
 Oppgave 2.1 - Avgrens kartet

 Kartets startposisjon er Bergen, og i denne workshopen vil vi kun forholde oss
 til Bergen og omegn. Derfor ønsker vi også å avgrense kartets ytre rammer, så
 det ikke blir mulig å navigere seg vekk fra Vestlandet.

 Vi ønsker ikke at det skal være mulig å zoom/flytte kartet for langt. Over har
 vi gitt dere koordinatene til to punkter, som bestemmer avgrensningen. Bruk
 options-objektet til L.map for å avgrense kartet. Se
 http://leafletjs.com/reference-1.0.3.html#map-maxbounds og
 http://leafletjs.com/reference-1.0.3.html#map-minzoom.
 */
const map = L.map('mapid', {
    // din kode her
});
map.addLayer(bakgrunnsLag);
map.setView([60.39, 5.33], 12);

/*
 Oppgave 2.2 - polygon rundt akvariet

 Akkurat nå er det mulig å navigere seg frem til Akvariet, men vil gjerne at
 Akvariets beliggenhet skal bli enda mer synlig.

 Under har vi gitt dere koordinatene til området som avgrenser Akvariet i
 Bergen. Bruk L.polygon til å tegne et polygon på kartet. L.polygon tar også et
 options-objekt som parameter, der man blant annet kan sette fargen. Fargen skal
 være grønn.

 Se http://leafletjs.com/reference-1.0.3.html#polygon
 */
const akvariet = [
    [60.39973, 5.30204],
    [60.40063, 5.30399],
    [60.40011, 5.30590],
    [60.39863, 5.30412]
];
// din kode her


/*
 Oppgave 2.3 - Markør på Bryggen

 Konstanten bryggen er koordinatene til Bryggen. Vis en markør på Bryggen med
 L.marker. Se http://leafletjs.com/reference-1.0.3.html#marker
 */
const bryggen = [60.3973, 5.3233];
// din kode her

/*
 Oppgave 2.4 - Fløibanen

 Det vil være mer praktisk å bruke en linje enn et polygon eller en markør for å
 visualisere Fløibanen.

 Bruk L.polyline for å markere traséen til Fløibanen. Koordinatene er gitt
 under. Linjen til Fløibanen skal være rød.

 Se http://leafletjs.com/reference-1.0.3.html#polyline
 */
const floibanen = [
    [60.3964173561773, 5.328556895256043],
    [60.39660550579725, 5.329484939575195],
    [60.396311355912495, 5.331035256385803],
    [60.39560644537202, 5.333991050720216],
    [60.39533878737165, 5.337563753128053],
    [60.39480346476893, 5.342504382133484]
];
// din kode her

/*
 Oppgave 2.5 - Popups

 Når man klikker på de forskjellige markørene i kartet, skal det dukke opp en
 popup som forklarer hva du klikket på. Bruk bindPopup for å legge til en markør
 på Akvariet, Bryggen og Fløibanen.

 Legg til popups på Akvariet, Bryggen og Fløibanen med navn på severdigheten, og
eventuell annen relevant informasjon. bindPopup godtar HTML, så det er mulig å
formatere teksten og legge til bilder.
    
 Se http://leafletjs.com/reference-1.0.3.html#popup
 */
// din kode her


/*
 Oppgave 2.6 - refaktorisering av navigasjonen

 Alle flyTo-kallene har nå hardkodete koordinater. Skriv dem om til å hente
 koordinatene fra markørene som vi har laget tidligere, slik at tallene bare er
 skrevet inn ett sted. Endre også flyTo til flyToBounds der det er aktuelt, slik
 at Leaflet regner ut zoom-nivå på egen hånd.

 Se http://leafletjs.com/reference-1.0.3.html#map-flytobounds
 */
document.querySelector('.js-akvariet').addEventListener('click', () => {
    map.flyTo([60.399737639725814, 5.304079055786133], 18, {
        duration
    });
});

document.querySelector('.js-bryggen').addEventListener('click', () => {
    map.flyTo([60.3973, 5.3233], 18, {
        duration
    });
});

document.querySelector('.js-floien').addEventListener('click', () => {
    map.flyTo([60.39573099834468, 5.334892272949219], 18, {
        duration
    });
});


// Denne snutten skal ikke refaktoriseres
document.querySelector('.js-helebergen').addEventListener('click', () => {
    map.flyTo([60.39, 5.33], 12, {
        duration
    });
});


function onMapClick(e) {
    console.log('Du klikket på koordinaten [' + e.latlng.lat + ', ' + e.latlng.lng + ']');
}
map.on('click', onMapClick);
