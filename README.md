# Workshop: Visualisering av data på kart

I denne workshopen vil dere få en innføring i å visualisere informasjon på kart i nettleseren, ved hjelp av Javascript-biblioteket [Leaflet](https://leafletjs.com/).

Workshopen er bygd opp av en rekke praktiske oppgaver. Hver oppgave har en tilhørende HTML- og en javascript-fil, og javascript-filen inneholder flere feil som dere må rette opp i, for å få applikasjonen til å fungere som forventet.




## Kort om kart


Jordkloden vår kan modelleres som et flatt kart bestående av breddegrader (*latitude*) og lengdegrader (*longitude*). 

Breddegrader går fra -90 til +90, der 0-breddegraden er ekvator. Lengdegrader går fra -180 til +180, der 0-lengdegraden går gjennom Greenwich i London.

Et punkt på kartet kan angis ved hjelp av koordinater, angitt på følgende måte `[breddegrad, lengdegrad]`. Bredde- og lengdegrader kan angis som desimaltall. I denne workshopen vil det flere steder være nødvendig å angi 4 desimaler, for å få en nøyaktig nok posisjon på kart.

Et punkt i Trondheim sentrum kan for eksempel uttrykkes med følgende koordinater: `[63.4304, 10.3950]`

Det finnes flere ulike projeksjoner og koordinatsystemer for å plassere objekter nøyaktig på kart, men i denne workshopen vil vi utelukkende bruke lengde- og breddegrader, også kalt WGS84. 

![Illustrasjon av lengde- og breddegrader, av Djexplo (CC0), via Wikimedia Commons](https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Latitude_and_Longitude_of_the_Earth.svg/800px-Latitude_and_Longitude_of_the_Earth.svg.png)


## Oppgaver 

Oppgavene står beskrevet i javascript-filene under `src/`. Begynne med å åpne `oppgave1.html` i nettleseren, og `oppgave1.js` i en editor.

## Bonusoppgaver

Gjennom denne workshopen har dere fått en god grunnleggende kunnskap om Leaflet, og er godt rustet til å lage mye spennende. Her er noen forslag til hva dere kan se på videre: 

* Eksperimenter med de metodene og klassene dere har blitt introdusert for. 
* Hent flere datasett fra NVDB, og kombiner dem sammen
* Legg til andre typer diagrammer fra Chart.js, for andre typer egenskaper
* Se gjennom det brede utvalget av [Leaflet-plugins](http://leafletjs.com/plugins.html), og la deg inspirere
* Bruk [Leaflet.Editable](https://github.com/Leaflet/Leaflet.Editable) til å tegne dine egne geometrier
* Bruk [Leaflet.photo](https://github.com/turban/Leaflet.Photo) til å lage et bildegalleri
* Bruk [Leaflet.MiniMap](https://github.com/Norkart/Leaflet-MiniMap) til å legge til et minimap
* Bruk [Leaflet.fullscreen](https://github.com/Leaflet/Leaflet.fullscreen) til å legge til en fullskjermvisning
