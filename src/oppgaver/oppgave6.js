
const NVDBAPI = 'https://www.vegvesen.no/nvdb/api/v2';

const bakgrunnsLag = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
});


const heat = L.heatLayer([], {
    radius: 10
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
    maxBounds: [[55.86, -0.26], [64.89, 18.50]],
    minZoom: 6,
});

map.addLayer(bakgrunnsLag);
map.addLayer(heat);

map.on('moveend', function () {
    hentData();
});

map.setView([60.39, 5.33], 16);



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

            vegobjekter[vegobjekt.id] = L.marker(point.coordinates);

            heat.addLatLng(point.coordinates);

        }
    })
}



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

            myChart.data.datasets[0].data[0] = statistikk.Ukedag['Mandag'].length;
            myChart.data.datasets[0].data[1] = statistikk.Ukedag['Tirsdag'].length;
            myChart.data.datasets[0].data[2] = statistikk.Ukedag['Onsdag'].length;
            myChart.data.datasets[0].data[3] = statistikk.Ukedag['Torsdag'].length;
            myChart.data.datasets[0].data[4] = statistikk.Ukedag['Fredag'].length;
            myChart.data.datasets[0].data[5] = statistikk.Ukedag['Lørdag'].length;
            myChart.data.datasets[0].data[6] = statistikk.Ukedag['Søndag'].length;
            myChart.update(); 

        }).catch(function(ex) {
            console.log('parsing failed', ex);
        })
}



const ctx = document.querySelector('#myChart');

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
            label: "Ukedag",
            backgroundColor: [
                "#d53e4f",
                "#fc8d59",
                "#fee08b",
                "#ffffbf",
                "#e6f598",
                "#99d594",
                "#3288bd"
            ],
            borderColor: [
                "#d53e4f",
                "#fc8d59",
                "#fee08b",
                "#ffffbf",
                "#e6f598",
                "#99d594",
                "#3288bd"
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







