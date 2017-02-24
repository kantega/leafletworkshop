
const NVDBAPI = 'https://www.vegvesen.no/nvdb/api/v2';

const bakgrunnsLag = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
});


const map = L.map('mapid', {
    maxBounds: [[55.86, -0.26], [64.89, 18.50]],
    minZoom: 6,
});


bakgrunnsLag.addTo(map);

/*
 5.2 Legg til markercluster

 API-kallet i forrige oppgave resulterte i et uhåndterlig antall markører. Nettleseren ble delvis uresponsiv, og visningen på kart ga heller ikke stor mening.

 Når vi opererer med så mange markører, gir det ikke mening å vise hver enkelt markør. Vi ønsker heller å gruppere markører som er nære hverandre, og fortelle med tall hvor mange markører som befinner seg innenfor hver gruppering. For å få til dette, kan vi bruke pluginen Leaflet.markercluster.

 Legg til trafikkulykkene i L.markerClusterGroup, i stedet for å bruke L.layerGroup.
 */

const trafikkulykker = L.layerGroup(); // bytt ut layerGroup med markerClusterGroup


trafikkulykker.addTo(map);


let vegobjekter = {};


const loadingIndicator = document.querySelector('.loading');

function showLoadingIndicator () {
    loadingIndicator.style.opacity = 1;
}

function hideLoadingIndicator () {
    loadingIndicator.style.opacity = 0;
}

const trafikkulykkeTittel = document.querySelector('.trafikkulykke__id');
const trafikkulykkeEgenskaper = document.querySelector('.trafikkulykke__egenskaper');


/*
 5.4 Vis egenskapsdata

 Punkter på kart er bare halve moroa! Trafikkulykker har også mange spennende egenskapsdata, med detaljert informasjon om hver eneste trafikkulykke.
 For eksempel ulykkesdato, vær og føreforhold, og antall involverte personer.

 Vi ønsker at det skal komme opp informasjon om trafikkulykken i feltet til høyre, når dere klikker på en markør i kartet.

 I NVDB har Hver trafikkulykke har en unik id. Vi lagrer denne iden på hver markør, ved å sende inn et options-objekt med title når vi oppretter markøren.
 Når dere klikker på markøren, bruker vi denne iden til å gjøre et nytt API-kall hvor vi henter detaljert informasjon om akkurat denne trafikkulykken.

 */
function showInfo (vegobjekt) {

    trafikkulykkeTittel.innerHTML = vegobjekt.id;
    trafikkulykkeEgenskaper.innerHTML = '';

    vegobjekt.egenskaper.forEach(egenskap => {

        const tittel = document.createElement('dt');
        const verdi = document.createElement('dd');

        tittel.innerHTML = egenskap.navn;
        verdi.innerHTML = egenskap.verdi;

        // legg til tittel og verdi på trafikkulykkeEgenskaper. Dette kan gjøres med javascriptfunksjonen appendChild.
    });
}



function highlightFeature (e) {

    const id = e.target.options.title;
    const url = NVDBAPI + '/vegobjekter/570/' + id + '.json';

    fetch(url)
        .then((response) => {
            return response.json()

        }).then((json) => {
            showInfo(json);

        }).catch((ex) => {
            console.log('parsing failed', ex);
        })
}



function addVegobjekter (result) {
    result.forEach(vegobjekt => {

        if (!vegobjekter.hasOwnProperty(vegobjekt.id)) {

            const wkt = vegobjekt.geometri.wkt;
            const point = Terraformer.WKT.parse(wkt);

            vegobjekter[vegobjekt.id] = null;
            /* I stedet for at objektet settes til null skal du opprett et markerobjekt. Se http://leafletjs.com/reference.html#marker
             Ved klikk skal funksjonen highlightFeature kalles.
             */

            trafikkulykker.addLayer(vegobjekter[vegobjekt.id]);
        }

    })

}


/*
 Oppgave 5.1 Hent trafikkulykker innenfor kartutsnitt

 Datasettet for trafikkulykker er så stort at vi er nødt til å begrense oss til kun å hente data innenfor det
 aktive kartutsnittet. Metoden map.getBounds kan benyttes til å hente det aktive kartutsnittet, og .toBBoxString()
 konverterer det returnerte arrayet til en string.

 APIet tilbyr parameteren kartutsnitt for begrense søkeområdet.
 Parameteren antall kan i tillegg benyttes til å begrense antall vegobjekter som returneres i responsen.

 Hent alle trafikkulykker innenfor kartutsnittet. Legg til hver trafikkulykke som en markør i en layerGroup,
 som igjen legges til kartet.
 */

function fetchVegobjekter () {

    // URL mangler antall og kartutsnitt, det er din oppgave å rette på det.
    const url = NVDBAPI + '/vegobjekter/570.json?inkluder=geometri&srid=wgs84';

    showLoadingIndicator();

    fetch(url)
        .then((response) => {
            return response.json()

        }).then((json) => {
            hideLoadingIndicator();

            addVegobjekter(json.objekter);

        }).catch(function(ex) {
            console.log('parsing failed', ex);

        })
}

/*
 5.3 Oppdater data ved panorering

 Nå hentes data første gang kartet lastes, men det skjer ingenting når dere zoomer inn/ut eller panorerer kartet. Det kan vi gjøre noe med!

 Bruk metoden map.on til å lytte til eventen moveend, og referer til funksjonen som henter data.
 Se http://leafletjs.com/reference-1.0.3.html#evented
 */

// skriv inn koden for map.on her.

map.setView([60.39, 5.33], 15);

