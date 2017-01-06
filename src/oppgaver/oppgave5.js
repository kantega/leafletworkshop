var bakgrunnsLag = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw'
});


var mymap = L.map('mapid', {
    maxBounds: [[55.86, -0.26], [64.89, 18.50]],
    minZoom: 6,
});


bakgrunnsLag.addTo(mymap);



var vegobjekter = {};


var heat = L.heatLayer([], {
    radius: 10
}).addTo(mymap);



function hentData () {



    var statistikk = {};
    var kartutsnitt = mymap.getBounds().toBBoxString();

    var url = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/570.json?inkluder=geometri,egenskaper&srid=wgs84&antall=10000&egenskap="5074!=6431 AND 5055>\'1999-12-31\'"&kartutsnitt=' + kartutsnitt;

    document.querySelector('.loading').innerHTML = 'Laster ...';

    fetch(url)
        .then(function(response) {
            return response.json()
        }).then(function(json) {

            document.querySelector('.loading').innerHTML = '';

            for (var i = 0; i < json.objekter.length; i++) {



                if (statistikk.hasOwnProperty('id')) {
                    statistikk.id.push(json.objekter[i].id);
                } else {
                    statistikk.id = [json.objekter[i].id];
                }

                for (var j = 0; j < json.objekter[i].egenskaper.length; j++) {
                    var egenskap = json.objekter[i].egenskaper[j];

                    if (!statistikk.hasOwnProperty(egenskap.navn)) {
                        statistikk[egenskap.navn] = {};
                    }

                    if (statistikk[egenskap.navn].hasOwnProperty(egenskap.verdi)) {
                        statistikk[egenskap.navn][egenskap.verdi].push(json.objekter[i].id);
                    } else {
                        statistikk[egenskap.navn][egenskap.verdi] = [json.objekter[i].id];
                    }

                }



                if (!vegobjekter.hasOwnProperty(json.objekter[i].id)) {


                    var wkt = json.objekter[i].geometri.wkt;
                    var point = Terraformer.WKT.parse(wkt);

                    vegobjekter[json.objekter[i].id] = L.marker(point.coordinates);

                    heat.addLatLng(point.coordinates);


                }

            }



            console.log(statistikk);


            document.querySelector('.ukedag').innerHTML = '';


            myPieChart.data.datasets[0].data[0] = statistikk.Ukedag['Mandag'].length;
            myPieChart.data.datasets[0].data[1] = statistikk.Ukedag['Tirsdag'].length;
            myPieChart.data.datasets[0].data[2] = statistikk.Ukedag['Onsdag'].length;
            myPieChart.data.datasets[0].data[3] = statistikk.Ukedag['Torsdag'].length;
            myPieChart.data.datasets[0].data[4] = statistikk.Ukedag['Fredag'].length;
            myPieChart.data.datasets[0].data[5] = statistikk.Ukedag['Lørdag'].length;
            myPieChart.data.datasets[0].data[6] = statistikk.Ukedag['Søndag'].length;
            myPieChart.update(); 

            Object.keys(statistikk.Ukedag).forEach(function(value) {

                var tittel = document.createElement('dt');
                var verdi = document.createElement('dd');

                tittel.innerHTML = value;
                verdi.innerHTML = statistikk.Ukedag[value].length;

                document.querySelector('.ukedag').appendChild(tittel);
                document.querySelector('.ukedag').appendChild(verdi);
            })



        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })
}




mymap.on('moveend', function () {
    hentData();
});

mymap.setView([60.39, 5.33], 16);


var ctx = document.getElementById("myChart");


var data = {
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
            data: [1, 1, 1, 1, 1, 1, 1],
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


var myPieChart = new Chart(ctx,{
    type: 'bar',
    data: data,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});







