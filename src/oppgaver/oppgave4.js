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
    center: [60.39, 5.33],
    maxBounds: [[55.86, -0.26], [64.89, 18.50]],
    minZoom: 6,
    zoom: 12
});
map.addLayer(bakgrunnsLag);


const loadingIndicator = document.querySelector('.loading');

function showLoadingIndicator () {
    loadingIndicator.style.opacity = 1;
}

function hideLoadingIndicator () {
    loadingIndicator.style.opacity = 0;
}

/*
 Oppgave 4.1 - hent bomstasjoner

 I denne oppgaven skal vi bruke fetch til å hente alle bomstasjoner, og vise en
 markør på kartet for hver stasjon.

 Først henter vi dataene, og gjør dem om til JSON-format. Så bruker vi
 Terraformer for å konvertere koordinatene fra WKT-format til lister med lengde-
 og breddegrad, som vi er vant til fra de tidligere oppgavene. Til slutt blir
 funksjonen drawMarkers kalt. Argumentet geometryList er en liste med punkter
 som skal tegnes i kartet.

 http://leafletjs.com/reference-1.0.3.html#marker
 https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 */
function drawMarkers(geometryList) {
    // din kode her
}

const bomstasjonURL = NVDBAPI + '/vegobjekter/45.json?inkluder=geometri&srid=wgs84';
document.querySelector('.js-bomstasjoner').addEventListener('click', () => {
    showLoadingIndicator();

    fetch(bomstasjonURL)
        .then(response => {
            hideLoadingIndicator();
            return response.json();
        })
        .then(json => {
            return json.objekter.map(vegobjekt => {
                const wkt = vegobjekt.geometri.wkt;
                const geometry = Terraformer.WKT.parse(wkt);
                return geometry.coordinates;
            });
        })
        .then(drawMarkers)
        .catch((ex) => {
            console.log('parsing failed', ex);
        });
});


/*
 Oppgave 4.2 - hent tunneler

 I denne oppgaven skal vi hente data om tunneler i og rundt Bergen, og tegne dem
 i kartet. Det er mye likt med oppgave 4.1, med unntak av to ting:

 1. URL-en er forskjellig.
 2. Tunnelene er linjer, ikke punkter. Altså er koordinatene en liste med punkter.

 Følg framgangsmåten fra oppgave 4.1 for å hente dataene og tegne tunnelene i
 Hordaland på kartet.

 http://leafletjs.com/reference-1.0.3.html#polyline
 */
const tunnelURL = NVDBAPI + '/vegobjekter/67.json?inkluder=geometri&srid=wgs84&fylke=12';

document.querySelector('.js-tunneler').addEventListener('click', () => {
    // din kode her
});


