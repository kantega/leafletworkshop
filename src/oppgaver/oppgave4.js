


var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>';

var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr});
var streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});




var steder = new L.LayerGroup();


var akvariet = L.polygon([
    [60.39973, 5.30204], 
    [60.40063, 5.30399], 
    [60.40011, 5.30590], 
    [60.39863, 5.30412]
], 
{
  color: '#0f0'
});
akvariet.bindPopup('Akvariet');
akvariet.addTo(steder);

var bryggen = L.marker([60.3973, 5.3233]);
bryggen.bindPopup('Bryggen');
bryggen.addTo(steder);

var floibanen = L.polyline([
    [60.3964173561773, 5.328556895256043], 
    [60.39660550579725, 5.329484939575195], 
    [60.396311355912495, 5.331035256385803], 
    [60.39560644537202, 5.333991050720216], 
    [60.39533878737165, 5.337563753128053], 
    [60.39480346476893, 5.342504382133484]
], 
{
  color: '#f00'
});
floibanen.bindPopup('Fløibanen');
floibanen.addTo(steder);


var baseLayers = {
    "Streets": streets,
    "Grayscale": grayscale
};

var overlays = {
    "Steder": steder
};

var mymap = L.map('mapid', {
    center: [60.39, 5.33],
    layers: [streets, steder],
    maxBounds: [[55.86, -0.26], [64.89, 18.50]],
    minZoom: 6,
    zoom: 12,
});

var layerControl = L.control.layers(baseLayers, overlays, {
    collapsed: false
});
layerControl.addTo(mymap);


document.querySelector('.js-akvariet').addEventListener('click', function() {
    mymap.flyToBounds(akvariet.getBounds(), {
        duration: 0.5,
    });
}, false)

document.querySelector('.js-bryggen').addEventListener('click', function() {
    mymap.flyTo(bryggen.getLatLng(), 18, {
        duration: 0.5,
    });
}, false)

document.querySelector('.js-floien').addEventListener('click', function() {
    mymap.flyToBounds(floibanen.getBounds(), {
        duration: 0.5,
    });
}, false)

document.querySelector('.js-helebergen').addEventListener('click', function() {
    mymap.flyTo([60.39, 5.33], 12, {
        duration: 0.5,
    });
}, false)



document.querySelector('.js-bomstasjoner').addEventListener('click', function() {

    var bomstasjoner = new L.LayerGroup();
    layerControl.addOverlay(bomstasjoner, 'Bomstasjoner');

    var url = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/45.json?inkluder=geometri,egenskaper&srid=wgs84&fylke=12';

    fetch(url)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            for (var i = 0; i < json.objekter.length; i++) {
                var wkt = json.objekter[i].geometri.wkt;
                var point = Terraformer.WKT.parse(wkt);

                L.marker(point.coordinates).addTo(bomstasjoner);
            }

        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })

}, false)

document.querySelector('.js-tunneler').addEventListener('click', function() {

    var tunneler = new L.LayerGroup();
    layerControl.addOverlay(tunneler, 'Tunneler');

    var url = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/67.json?inkluder=geometri,egenskaper&srid=wgs84&fylke=12';

    fetch(url)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            for (var i = 0; i < json.objekter.length; i++) {
                var wkt = json.objekter[i].geometri.wkt;
                var line = Terraformer.WKT.parse(wkt);

                L.polyline(line.coordinates).addTo(tunneler);
            }

        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })

}, false)


function onMapClick(e) {
    console.log('Du klikket på koordinaten [' + e.latlng.lat + ', ' + e.latlng.lng + ']');
}

mymap.on('click', onMapClick);


