/*
Oppgave 3: Hent data

Kartet blir enda mer livlig, når dere fyller det med nyttige data fra eksterne kilder. I dag er det vanlig å hente data fra et REST API.

I denne oppgaven vil vi hente data fra [Nasjonal
vegdatabank](http://www.vegvesen.no/fag/teknologi/Nasjonal+vegdatabank) (NVDB).
Gjerne ha [API-dokumentasjonen](https://www.vegvesen.no/nvdb/apidokumentasjon/)
lett tilgjengelig, og bruk [Vegkart](https://www.vegvesen.no/vegkart/vegkart/)
til å få et innsyn i datagrunnlaget.

Vi bruker Javascript-APIet
[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) til å hente
data. Vær oppmerksom på at fetch ikke er støttet i alle nettlesere ennå, og det
er nødvendig å legge til et [polyfill](https://github.com/github/fetch) for
[blant annet Internet Explorer 11](http://caniuse.com/#search=fetch).

Tips: Test APIet i nettleseren for å verifisere at dere får tilbake riktig
respons. Legg til .json i API-kallene for å få responsen på json-format, og bruk
et tillegg som [JSON
formatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa)
for å gjøre den mer lesbar.

Eksempel: Dette API-kallet returnerer en liste over alle tilgjengelige datasett
fra NVDB:

https://www.vegvesen.no/nvdb/api/v2/vegobjekttyper.json
 */
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
    center: [63.430, 10.395],
    maxBounds: [[62.61356, 7.51465], [65.14611, 14.89746]],
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
 Oppgave 3.1 - hent bomstasjoner

 Vi ønsker å hente alle bomstasjoner, og vise posisjonen til hver enkelt
 bomstasjon på kartet ved hjelp av en markør. NVDB har en vegobjekttype som
 heter bomstasjon, med id lik 45.

 API-kall for å hente bomstasjoner blir derfor:

 https://www.vegvesen.no/nvdb/api/v2/vegobjekter/45.json

 Vi skal bruke fetch til å hente alle bomstasjoner, og vise en markør på kartet
 for hver stasjon.

 Først henter vi dataene, og gjør dem om til JSON-format. Så bruker vi
 Terraformer for å konvertere koordinatene fra WKT-format til lister med lengde-
 og breddegrad, som vi er vant til fra de tidligere oppgavene. Til slutt blir
 funksjonen drawMarkers kalt. Argumentet geometryList er en liste med punkter
 som skal tegnes i kartet.

 http://leafletjs.com/reference-1.7.1.html#marker
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
 Oppgave 3.2 - hent tunneler

 Tunneler er en annen vegobjekttype det er mye av i Trondheim. Men i motsetning til
 bomstasjon, har tunneler en utstrekning som visualiseres ved hjelp av en linje,
 i stedet for et punkt.

 API-kallet i forrige oppgave hentet alle bomstasjoner i hele Norge, og ikke
 bare i Trondheim. Dette gikk problemfritt, siden det er et lite datasett, men for
 tunneler ønsker vi å begrense responsen som returneres. Vi kan gjøre dette ved
 å legge til et områdefilter på API-kallet, som kun henter tunneler i Sør-Trøndelag
 (fylke=16). Vi henter vegobjekttypen tunnelløp, med id lik 67.

 https://www.vegvesen.no/nvdb/api/v2/vegobjekter/67.json?inkluder=geometri&srid=wgs84&fylke=50

 Vi skal hente data om tunneler i og rundt Trondheim, og tegne dem
 i kartet. Det er mye likt med oppgave 3.1, med unntak av to ting:

 1. URL-en er forskjellig.
 2. Tunnelene er linjer, ikke punkter. Altså er koordinatene en liste med punkter.

 Følg framgangsmåten fra oppgave 3.1 for å hente dataene og tegne tunnelene i
 Sør-Trøndelag på kartet.

 http://leafletjs.com/reference-1.7.1.html#polyline
 */
const tunnelURL = NVDBAPI + '/vegobjekter/67.json?inkluder=geometri&srid=wgs84&fylke=50';

document.querySelector('.js-tunneler').addEventListener('click', () => {
    // din kode her
});


