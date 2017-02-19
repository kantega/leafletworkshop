
const NVDBAPI = 'https://www.vegvesen.no/nvdb/api/v2';

const bakgrunnsLag = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
});


const mymap = L.map('mapid', {
    maxBounds: [[55.86, -0.26], [64.89, 18.50]],
    minZoom: 6,
});


bakgrunnsLag.addTo(mymap);

const selectedLayer = L.layerGroup();
selectedLayer.addTo(mymap);
//mymap.addLayer(selectedLayer);

const trafikkulykker = L.markerClusterGroup({
    maxClusterRadius: 50
});
trafikkulykker.addTo(mymap);
//mymap.addLayer(trafikkulykker);

const vegobjekter = {};

const trafikkulykkeTittel = document.querySelector('.trafikkulykke__id');
const trafikkulykkeEgenskaper = document.querySelector('.trafikkulykke__egenskaper');


function showInfo (vegobjekt) {

    trafikkulykkeTittel.innerHTML = vegobjekt.id;
    trafikkulykkeEgenskaper.innerHTML = '';

    vegobjekt.egenskaper.forEach(egenskap => {

        const tittel = document.createElement('dt');
        const verdi = document.createElement('dd');

        tittel.innerHTML = egenskap.navn;
        verdi.innerHTML = egenskap.verdi;

        trafikkulykkeEgenskaper.appendChild(tittel);
        trafikkulykkeEgenskaper.appendChild(verdi);

    });
}


function highlightFeature (e) {

    selectedLayer.clearLayers();
    L.circleMarker(e.target._latlng, {
        color: '#f00',
        radius: 10
    }).addTo(selectedLayer);


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


const loadingIndicator = document.querySelector('.loading');

function showLoadingIndicator () {
    loadingIndicator.style.opacity = 1;
}

function hideLoadingIndicator () {
    loadingIndicator.style.opacity = 0;
}


function addVegobjekter (result) {
    result.forEach(vegobjekt => {

        if (!vegobjekter.hasOwnProperty(vegobjekt.id)) {

            const wkt = vegobjekt.geometri.wkt;
            const point = Terraformer.WKT.parse(wkt);

            vegobjekter[vegobjekt.id] = L.marker(point.coordinates, {
                title: vegobjekt.id
            }).on({
                click: highlightFeature
            });

            trafikkulykker.addLayer(vegobjekter[vegobjekt.id]);
        }

    })
    
}


function fetchVegobjekter () {
    const kartutsnitt = mymap.getBounds().toBBoxString();

    const url = NVDBAPI + '/vegobjekter/570.json?inkluder=geometri&srid=wgs84&antall=10000&kartutsnitt=' + kartutsnitt;

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


mymap.on('moveend', () => {
    fetchVegobjekter();
});

mymap.setView([60.39, 5.33], 15);

