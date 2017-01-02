var bakgrunnsLag = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw'
});


var mymap = L.map('mapid', {
    center: [60.39, 5.33],
    maxBounds: [[55.86, -0.26], [64.89, 18.50]],
    minZoom: 6,
    zoom: 15,
});

bakgrunnsLag.addTo(mymap);


function highlightFeature (e) {
    console.log(e.target.options.title);
}


var trafikkulykker = L.markerClusterGroup({
    maxClusterRadius: 50
});
mymap.addLayer(trafikkulykker);


var vegobjekter = {};

document.querySelector('.js-hentdata').addEventListener('click', function() {

    var kartutsnitt = mymap.getBounds().toBBoxString();

    var url = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/570.json?inkluder=geometri&srid=wgs84&kartutsnitt=' + kartutsnitt;

    fetch(url)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            for (var i = 0; i < json.objekter.length; i++) {
                var wkt = json.objekter[i].geometri.wkt;
                var point = Terraformer.WKT.parse(wkt);

                vegobjekter[json.objekter[i].id] = L.marker(point.coordinates, {
                    title: json.objekter[i].id
                });

                vegobjekter[json.objekter[i].id].on({
                    click: highlightFeature
                });

                trafikkulykker.addLayer(vegobjekter[json.objekter[i].id]);

            }

        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })

}, false)
