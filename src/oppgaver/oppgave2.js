/*
 Oppgave 2: Markører og popups

 I denne oppgaven vil vi fortsette på det gode grunnlaget vi etablerte i oppgave
 1, og lære mer om markører og geometrier.
 */

const bakgrunnsLag = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
});
const duration = 0.5;

// Avgrensning av kartet for oppgave 2.1
const boundarySouthWest = [62.61356, 7.51465];
const boundaryNorthEast = [65.14611, 14.89746];

/*
 Oppgave 2.1 - Avgrens kartet

 Kartets startposisjon er Trondheim, og i denne workshopen vil vi kun forholde oss
 til Trondheim og omegn. Derfor ønsker vi også å avgrense kartets ytre rammer, så
 det ikke blir mulig å navigere seg vekk fra Trøndelag.

 Vi ønsker ikke at det skal være mulig å zoom/flytte kartet for langt. Over har
 vi gitt dere koordinatene til to punkter, som bestemmer avgrensningen. Bruk
 options-objektet til L.map for å avgrense kartet. Se
 http://leafletjs.com/reference-1.7.1.html#map-maxbounds og
 http://leafletjs.com/reference-1.7.1.html#map-minzoom.
 */
const map = L.map('mapid', {
    // din kode her
});
map.addLayer(bakgrunnsLag);
map.setView([63.430, 10.395], 12);

/*
 Oppgave 2.2 - Polygon rundt Nidarosdomen

 Akkurat nå er det mulig å navigere seg frem til Nidarosdomen, men vil gjerne at
 området rundt Nidarosdomen og Erkebispegården skal bli enda mer synlig.

 Under har vi gitt dere koordinatene til området som omkranser Nidarosdomen og Marinen. 
 Bruk L.polygon til å tegne et polygon på kartet. L.polygon tar også et
 options-objekt som parameter, der man blant annet kan sette fargen. Fargen skal
 være grønn.

 Se http://leafletjs.com/reference-1.7.1.html#polygon
 */
const nidarosdomen = [
    [63.42739, 10.39341],
    [63.4278, 10.39983],
    [63.42555, 10.40006],
    [63.42459, 10.39742],
    [63.4246, 10.39416]
];
// din kode her


/*
 Oppgave 2.3 - Markør på Lerkendal

 Konstanten lerkendal er koordinatene til Lerkendal. Vis en markør på Lerkendal med
 L.marker. Se http://leafletjs.com/reference-1.7.1.html#marker
 */
const lerkendal = [63.41231, 10.40447];
// din kode her

/*
 Oppgave 2.4 - Sykkelheisen

 Det vil være mer praktisk å bruke en linje enn et polygon eller en markør for å
 visualisere Trampe sykkelheis på Bakklandet.

 Bruk L.polyline for å markere traséen til Sykkelheisen. Koordinatene er gitt
 under. Linjen til Sykkelheisen skal være rød.

 Se http://leafletjs.com/reference-1.7.1.html#polyline
 */
const sykkelheisen = [
    [63.428, 10.40337],
    [63.42797, 10.40402],
    [63.42798, 10.40513],
    [63.42797, 10.40596]
];
// din kode her

/*
 Oppgave 2.5 - Popups

 Når man klikker på de forskjellige markørene i kartet, skal det dukke opp en
 popup som forklarer hva du klikket på. Bruk bindPopup for å legge til en markør
 på Nidarosdomen, Lerkendal og Sykkelheisen.

 Legg til popups på Nidarosdomen, Lerkendal og Sykkelheisen med navn på severdigheten, og
eventuell annen relevant informasjon. bindPopup godtar HTML, så det er mulig å
formatere teksten og legge til bilder.
    
 Se http://leafletjs.com/reference-1.7.1.html#popup
 */
// din kode her


/*
 Oppgave 2.6 - refaktorisering av navigasjonen

 Alle flyTo-kallene har nå hardkodete koordinater. Skriv dem om til å hente
 koordinatene fra markørene som vi har laget tidligere, slik at tallene bare er
 skrevet inn ett sted. Endre også flyTo til flyToBounds der det er aktuelt, slik
 at Leaflet regner ut zoom-nivå på egen hånd.

 Se http://leafletjs.com/reference-1.7.1.html#map-flytobounds
 */
document.querySelector('.js-nidarosdomen').addEventListener('click', () => {
    map.flyTo([63.42683, 10.39693], 18, {
        duration
    });
});

document.querySelector('.js-lerkendal').addEventListener('click', () => {
    map.flyTo([63.41235, 10.40446], 18, {
        duration
    });
});

document.querySelector('.js-sykkelheisen').addEventListener('click', () => {
    map.flyTo([63.428, 10.40339], 18, {
        duration
    });
});


// Denne snutten skal ikke refaktoriseres
document.querySelector('.js-heletrondheim').addEventListener('click', () => {
    map.flyTo([63.430, 10.395], 12, {
        duration
    });
});


function onMapClick(e) {
    console.log('Du klikket på koordinaten [' + e.latlng.lat + ', ' + e.latlng.lng + ']');
}
map.on('click', onMapClick);
