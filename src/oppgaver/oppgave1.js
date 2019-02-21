/*
 Oppgave 1: Kom i gang

 I denne oppgaven lærer vi å opprette et helt enkelt Leaflet-kart. Gjerne ta en
 titt på http://leafletjs.com/examples/quick-start/ ved siden av. Legg merke til
 at L.map instansierer Leaflet-kartet, og L.tileLayer angir et bakgrunnskart.
 */

// bakgrunnsLag definerer kartdataene som vi viser i kartet. Vi har satt det opp
// for dere, men til andre prosjekter kan dere hente data fra mapbox.com
const bakgrunnsLag = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
});

// map definerer selve kartet. Vi bruker den hver gang vi skal legge til noe i
// kartet, eller endre kartet på noe vis.
const map = L.map('mapid');
// addLayer legger til et kartlag, i dette tilfellet kartdataene som viser verdenskartet. 
map.addLayer(bakgrunnsLag);


/*
 Oppgave 1.1

 Gjennom oppgavene i denne workshopen vil det være nyttig å vite hvilken
 koordinat et bestemt punkt i kartet har. Vi vil derfor implementere en funksjon
 gjør at det skrives en koordinat til utviklerkonsollet, hver gang det trykkes
 på et punkt i kartet.

 For å få til dette, må vi bruke metoden map.on().

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

 Endre startposisjonen til å vise et oversiktsbilde over Trondheim. Vi har gitt
 dere koordinatene til Olav Tryggvason-statuen på Torget.
 */
const olavTryggvason = [63.430, 10.395];
// Endre den neste linjen slik at kartet viser Trondheim. Bruk zoomnivå 12. Se
// Se http://leafletjs.com/reference-1.0.3.html#map-methods-for-modifying-map-state
map.setView([0,0], 4);


/*
 Oppgave 1.3

 Få navigasjonen til å fungere. Over kartet er det fire knapper, som ikke gjør
 noe (enda). Når man klikker på dem, skal kartet vise enten Nidarosdomen, Lerkendal,
 Sykkelheisen eller hele Trondheim. Under har vi lagt til en event listener på
 Nidarosdomen-knappen, men den gjør ingenting enda. Fyll inn funksjonen slik at
 kartet endrer visning til Nidarosdomen, og zoomer inn. Legg også til event
 listeners for de andre knappene. Koordinatene for Nidarosdomen og Lerkendal har vi
 definert. Koordinatene for Sykkelheisen på Bakklandet kan du finne ved å klikke i kartet.
 Gjerne zoom inn til zoomnivå 18.

 Metoden flyTo() kan brukes til dette: http://leafletjs.com/reference-1.0.3.html#map-flyto

 Se ellers http://leafletjs.com/reference-1.0.3.html#map-methods-for-modifying-map-state


*/


const nidarosdomen = [63.42683, 10.39693];
const lerkendal = [63.41235, 10.40446];
document.querySelector('.js-nidarosdomen').addEventListener('click', () => {
    // din kode her
});


/*
 Oppgave 1.4

 Når navigasjonen fungerer: juster duration i options-objektet, til en verdi du synes passer. For eksempel 0.5 sekunder. 

 Legg merke til at funksjonen du brukte i oppgave 1.3 tar et valgfritt argument
 "Zoom/pan options". Se http://leafletjs.com/reference-1.0.3.html#pan-options
 for flere detaljer.
 */

// Endre koden ovenfor oppgaveteksten til oppgave 1.4



/*
 Oppgave 1.5

 Et godt designet bakgrunnskart er vel og bra, men det fine med Leaflet er at
 dere kan legge til en hel mengde ulike markører og lag på toppen av
 bakgrunnskartet.

 Finn koordinatene til ditt favorittsted i Trondheim, eller et annet sted, om du
 vil. Legg til en markør med L.marker på det stedet.

 Se http://leafletjs.com/reference-1.0.3.html#marker
 */

// din kode her
