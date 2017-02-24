

const bakgrunnsLag = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
});

const map = L.map('mapid');
map.addLayer(bakgrunnsLag);


/*
 Oppgave 1.1

 map.on('click', onMapClick) kjører funksjonen onMapClick hver gang
 vi klikker i kartet. Argumentet til onMapClick er en event, som inneholder data
 om hvor vi klikket. Fyll inn onMapClick for å skrive ut lengde- og breddegrad i
 konsollen. Se http://leafletjs.com/examples/quick-start/#dealing-with-events
 for hjelp.
*/
function onMapClick(e) {
    // skriv koden din her
}

map.on('click', onMapClick);


/*
 Oppgave 1.2

 Endre startposisjonen til å vise et oversiktsbilde over Bergen. Vi har gitt
 dere koordinatene til Bergen sentrum.
 */
const bergenSentrum = [60.39, 5.33];
// Endre den neste linjen slik at kartet viser Bergen. Se
// Se http://leafletjs.com/reference-1.0.3.html#map-methods-for-modifying-map-state
map.setView([0,0], 4);


/*
 Oppgave 1.3

 Få navigasjonen til å fungere. Over kartet er det fire knapper, som ikke gjør
 noe (enda). Når man klikker på dem, skal kartet vise enten Akvariet, Bryggen,
 Fløien eller hele Bergen. Under har vi lagt til en event listener på
 Akvariet-knappen, men den gjør ingenting enda. Fyll inn funksjonen slik at
 kartet endrer visning til Akvariet, og zoomer inn. Legg også til event
 listeners for de andre knappene. Koordinatene kan du finne ved å klikke i
 kartet.

 Se http://leafletjs.com/reference-1.0.3.html#map-methods-for-modifying-map-state

 Oppgave 1.4

 Når navigasjonen fungerer: øk animasjonshastigheten, slik at det ikke tar så lang tid å fly til hvert sted. Vi anbefaler 0.5 sekunder.

 Legg merke til at funksjonen du brukte i oppgave 1.3 tar et valgfritt argument
 "Zoom/pan options". Se http://leafletjs.com/reference-1.0.3.html#pan-options
 for flere detaljer.
 */
document.querySelector('.js-akvariet').addEventListener('click', () => {
    // din kode her
});


/*
 Oppgave 1.5

 Finn koordinatene til ditt favorittsted i Bergen, eller et annet sted, om du
 vil. Legg til en markør (marker) på det stedet.

 Se http://leafletjs.com/reference-1.0.3.html#marker
 */

// din kode her
