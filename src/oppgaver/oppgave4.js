const NVDBAPI = 'https://www.vegvesen.no/nvdb/api/v2';

const bakgrunnsLag = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw'
});


const mymap = L.map('mapid', {
    center: [60.39, 5.33],
    maxBounds: [[55.86, -0.26], [64.89, 18.50]],
    minZoom: 6,
    zoom: 12,
});

bakgrunnsLag.addTo(mymap);


const loadingIndicator = document.querySelector('.loading');

function showLoadingIndicator () {
    loadingIndicator.style.opacity = 1;
}

function hideLoadingIndicator () {
    loadingIndicator.style.opacity = 0;
}



document.querySelector('.js-bomstasjoner').addEventListener('click', () => {

    showLoadingIndicator();

    const url = NVDBAPI + '/vegobjekter/45.json?inkluder=geometri,egenskaper&srid=wgs84&fylke=12';

    fetch(url)

        .then((response) => {
            return response.json()

        }).then((json) => {

            hideLoadingIndicator();

            json.objekter.forEach(vegobjekt => {
                
                const wkt = vegobjekt.geometri.wkt;
                const geometry = Terraformer.WKT.parse(wkt);

                L.marker(geometry.coordinates).addTo(mymap);
                
            });

        }).catch((ex) => {
            console.log('parsing failed', ex)

        })

}, false)


document.querySelector('.js-tunneler').addEventListener('click', () => {

    showLoadingIndicator();

    const url = NVDBAPI + '/vegobjekter/67.json?inkluder=geometri,egenskaper&srid=wgs84&fylke=12';

    fetch(url)

        .then((response) => {
            return response.json()

        }).then((json) => {

            hideLoadingIndicator();


            json.objekter.forEach(vegobjekt => {

                const wkt = vegobjekt.geometri.wkt;
                const geometry = Terraformer.WKT.parse(wkt);

                L.polyline(geometry.coordinates).addTo(mymap);
                
            });


        }).catch((ex) => {
            console.log('parsing failed', ex)

        })

}, false)


