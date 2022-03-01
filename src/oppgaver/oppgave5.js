/*
## Oppgave 5: Heatmap

Trafikkulykker kan også visualiseres i form av et heatmap eller et diagram.

I denne oppgaven henter vi både geometri og egenskaper for alle trafikkulykker i
hvert eneste API-kall, og har derfor lagt inn et datofilter for å begrense
datamengden.

https://www.vegvesen.no/nvdb/api/v2/vegobjekter/570.json?inkluder=geometri,egenskaper&srid=wgs84&egenskap="5055>'1999-12-31'"

Les mer om
[egenskapsfilter](https://www.vegvesen.no/nvdb/apidokumentasjon/#/parameter/egenskapsfilter)
og [vegobjekttypen
trafikkulykke](https://www.vegvesen.no/nvdb/api/v2/vegobjekttyper/570.json) for
å finne flere måter å filtrere datasettet på.
 */

const NVDBAPI = 'https://www.vegvesen.no/nvdb/api/v2';

const bakgrunnsLag = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
});


let vegobjekter = {};


const loadingIndicator = document.querySelector('.loading');

function showLoadingIndicator () {
    loadingIndicator.style.opacity = 1;
}

function hideLoadingIndicator () {
    loadingIndicator.style.opacity = 0;
}


const map = L.map('mapid', {
    maxBounds: [[62.61356, 7.51465], [65.14611, 14.89746]],
    minZoom: 6,
});

map.addLayer(bakgrunnsLag);

/*
    5.1 Legg til heatmap

    Bruk pluginen Leaflet.heat (https://github.com/Leaflet/Leaflet.heat) til å visualisere trafikkulykkene som et heatmap. 
    Klassen L.heatLayer kan brukes i stedet for L.markerClusterGroup.

    Tips: 
    Du kan velge hvordan heatmapen skal se ut og oppføre seg.
    Prøv å endre radius for å få kartet til se penere ut.

 */


// Deklarer heat som et heatlayer og legg laget til på map.
// Fjern i tillegg utkommenteringen under funksjonen addVegobjekter.

// const heat = ;
// map.addLayer(heat);


map.on('moveend', function () {
    hentData();
});

map.setView([63.430, 10.395], 16);



function getStatistics (vegobjekter) {

    let statistikk = {};

    vegobjekter.forEach(vegobjekt => {

        if (statistikk.hasOwnProperty('id')) {
            statistikk.id.push(vegobjekt.id);
        } else {
            statistikk.id = [vegobjekt.id];
        }

        vegobjekt.egenskaper.forEach(egenskap => {

            if (!statistikk.hasOwnProperty(egenskap.navn)) {
                statistikk[egenskap.navn] = {};
            }

            if (statistikk[egenskap.navn].hasOwnProperty(egenskap.verdi)) {
                statistikk[egenskap.navn][egenskap.verdi].push(vegobjekt.id);

            } else {
                statistikk[egenskap.navn][egenskap.verdi] = [vegobjekt.id];
            }

        });
    });

    return statistikk;
}



function addVegobjekter (result) {
    result.forEach(vegobjekt => {

        if (!vegobjekter.hasOwnProperty(vegobjekt.id)) {

            var wkt = vegobjekt.geometri.wkt;
            var point = Terraformer.WKT.parse(wkt);

            vegobjekter[vegobjekt.id] = true;

            //heat.addLatLng(point.coordinates);

        }
    })
}

/*
 5.2 Legg til søylediagram

 Chart.js er et nyttig bibliotek for å visualisere data i form av en rekke typer diagrammer. 
 Trafikkulykker har også mange interessante egenskaper som kan visualiseres på denne måten.

 Tips: Grunnlagsdata logges til utviklerkonsollet.

 Bruk Chart.js til å lage et søylediagram som viser antall trafikkulykker, fordelt på ukedag.
 */


function hentData () {

    const kartutsnitt = map.getBounds().toBBoxString();

    const url = NVDBAPI + '/vegobjekter/570.json?inkluder=geometri,egenskaper&srid=wgs84&antall=10000&egenskap="5074!=6431 AND 5055>\'1999-12-31\'"&kartutsnitt=' + kartutsnitt;

    showLoadingIndicator();

    fetch(url)
        .then(function(response) {
            return response.json()

        }).then(function(json) {

            hideLoadingIndicator();

            const statistikk = getStatistics(json.objekter);

            console.log(statistikk);

            addVegobjekter(json.objekter);

            // legg inn kode for å sette myChart.
            //myChart.data.datasets[0].data[0] = ?
            //myChart.update();

        }).catch(function(ex) {
            console.log('parsing failed', ex);
        })
}



const ctx = document.querySelector('#myChart');

/*
 5.3 Endre fargeskala

 Det er ikke alltid lett å finne gode fargekombinasjoner. Verken til markører, eller til diagrammer.

 Finn en pen fargekombinasjon hos ColorBrewer (http://colorbrewer2.org/), 
 og oppdater fargeskalaen til søylediagrammet.
 */

const data = {
    labels: [
        "Mandag",
        "Tirsdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lørdag",
        "Søndag"
    ],
    datasets: [
        {
            data: [0, 0, 0, 0, 0, 0, 0],
            label: "Antall ulykker",
            backgroundColor: [
                "#f00",
                "#f00",
                "#f00",
                "#f00",
                "#f00",
                "#f00",
                "#f00"
            ],
            borderColor: [
                "#000",
                "#000",
                "#000",
                "#000",
                "#000",
                "#000",
                "#000"
            ]
        }]
};


const myChart = new Chart(ctx,{
    type: 'bar',
    data: data,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});







