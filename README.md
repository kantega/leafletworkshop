# Leaflet workshop




## Oppgave 1: Kom i gang

I denne oppgaven lærer vi å opprette et helt enkelt Leaflet-kart. Gjerne ta en titt på [Leaflet Quick Start Guide](http://leafletjs.com/examples/quick-start/) ved siden av. Legg merke til at [`L.map`](http://leafletjs.com/reference-1.0.3.html#map) Instansierer Leaflet-kartet, og [`L.tileLayer`](http://leafletjs.com/reference-1.0.3.html#tilelayer) angir et bakgrunnskart. 


### 1.1 Finn koordinat

Gjennom oppgavene i denne workshopen vil det være nyttig å vite hvilken koordinat et bestemt punkt i kartet har. Vi vil derfor implementere en funksjon gjør at det skrives en koordinat til utviklerkonsollet, hver gang det trykkes på et punkt i kartet. 

For å få til dette, må vi bruke metoden [`map.on`](http://leafletjs.com/reference-1.0.3.html#evented-on).


### 1.2 Endre startposisjon

Metoden [`map.setView`](http://leafletjs.com/reference-1.0.3.html#map-setview) brukes til å angi startposisjonen til kartet. I dag vises Timbuktu som standard, men det er ikke interessant for oss skkurat i dag. Endre startposisjon til Bergen sentrum, med zoom-nivå `12`.


### 1.3 Naviger mellom severdigheter

Ovenfor kartet er det knapper med samme navn som kjente severdigheter i Bergen. Når du prøver å trykke på dem, skjer det imidlertid ikke noe. 

Gjør det mulig å navigere mellom Bergens severdigheter kun ved å trykke på noen knapper. Metoden [`map.flyTo`](http://leafletjs.com/reference-1.0.3.html#map-flyto) kan brukes til dette. 


### 1.4 Øk navigasjonshastigheten

Greit, nå har vi fått navigasjonen til å fungere, men animasjonen går litt for sakte for de flestes smak. For de fleste metoder er det mulig å angi et valgfritt options-objekt som et siste parameter når metoden kalles. 

Legg til et objekt som inneholder `duration: 0.5` på `map.flyTo`-metoden for å øke animasjonshastigheten.


### 1.5 Legg til en markør

Et godt designet bakgrunnskart er vel og bra, men det fine med Leaflet er at du kan legge til en hel mengde ulike markører og lag på toppen av bakgrunnskartet. 

Bruk klassen [`L.marker`](http://leafletjs.com/reference-1.0.3.html#marker) til å opprette en markør for ditt favorittsted i Bergen, og legge markøren til kartet ved hjelp av metoden [`map.addLayer`](http://leafletjs.com/reference-1.0.3.html#map-addlayer).




## Oppgave 2: Markører og popups

I denne oppgaven vil vi fortsette på det gode grunnlaget vi etablerte i oppgave 1, og lære mer om markører og geometrier. 


### 2.1 Avgrens kartets ytre rammer

Kartets startposisjon er Bergen, og i denne workshopen vil vi kun forholde oss til Bergen og omegn. Derfor ønsker vi også å avgrense kartets ytre rammer, så det ikke blir mulig å navigere seg vekk fra Vestlandet.

`L.map` tar også imot et options-objekt. Angi [`maxBounds`](http://leafletjs.com/reference-1.0.3.html#map-maxbounds) og [`minZoom`](http://leafletjs.com/reference-1.0.3.html#map-minzoom).


### 2.2 Legg til Akvariet

Akkurat nå er det mulig å navigere seg frem til Akvariet, men vil gjerne at Akvariets beliggenhet skal bli enda mer synlig.

For å oppnå dette, kan vi legge til et polygon som viser Akvariets utstrekning, ved hjelp av klassen [`L.polygon`](http://leafletjs.com/reference-1.0.3.html#polygon). Et polygon angis ved hjelp av et sett med punktkoordinater, på denne formen: `[[60.39973, 5.30204], [60.40063, 5.30399], [60.40011, 5.30590], [60.39863, 5.30412]]`.

Husk å legge til polygon-laget ved hjelp av `map.addLayer`. `L.polygon` godtar også et options-objekt som parameter, der du for eksempel kan angi `color: '#f00'`


### 2.3 Legg til Bryggen

Bruk [`L.marker`](http://leafletjs.com/reference-1.0.3.html#marker) fra oppgave 1.5 til å legge til Bryggen på kartet. 


### 2.4 Legg til Fløibanen

Det vil være mer praktisk å bruke en linje enn et polygon eller en markør for å visualisere Fløibanen. Bruk klassen [`L.polyline`](http://leafletjs.com/reference-1.0.3.html#polyline) for å lage en linje som markerer Fløibanens trasé. 

`L.polyline` tar imot koordinater på samme format som `L.polygon`. Gjerne la linjen få en rød farge. 


### 2.5 Legg til popups med informasjon

Metoden [`.bindPopup`](http://leafletjs.com/reference-1.0.3.html#layer-bindpopup) kan brukes til å aktivere en popup når du trykker på et lag i kartet. 

Legg til popups på Akvariet, Bryggen og Fløibanen med navn på severdigheten, og eventuell annen relevant informasjon. `bindPopup` godtar HTML, så det er mulig å formatere teksten og legge til bilder.


### 2.6 Refaktoriser navigasjonen

I oppgave 1.3 brukte vi `map.flyTo` til å navigere til bestemte koordinater på kartet. 

Bryggens koordinater er akkurat nå oppgitt to ulike steder i kildekoden. Både i `.flyTo`-metoden vi benyttet i oppgave 1.3, men også i markøren vi introduserte i oppgave 2.3. 

En mer elegant løsning er å la `map.flyTo` bruke Bryggen-markørens koordinater direkte. Disse koordinatene finner du ved å bruke metoden [`.getLatLng()`](http://leafletjs.com/reference-1.0.3.html#marker-getlatlng). 

For Akvariet og Fløibanen kan `map.flyTo` erstattes av [`map.flyToBounds`](http://leafletjs.com/reference-1.0.3.html#map-flytobounds), som flyr til severdighetens utstrekning i stedet for et angitt punkt. Bruk metoden [`.getBounds()`](http://leafletjs.com/reference-1.0.3.html#polyline-getbounds) for å finne lagenes utstrekning. 




## Oppgave 3

I denne oppgaven vil vi se nærmere på gruppering og aktivering/deaktivering av kartlag. Det vil være nyttig å ha [Layer Groups and Layers Control](http://leafletjs.com/examples/layers-control/) åpen mens dere løser disse oppgavene. 




### 3.1 Grupper severdigheter

Bruk klassen [`L.layerGroup`](http://leafletjs.com/reference-1.0.3.html#layergroup) til å gruppere severdighetene, som du så legger til kartet.


### 3.2 Slå kartlag av og på

Kartlag kan deles inn i to kategorier. **Baselayers** og **Overlays**. Baselayers er selve bakgrunnskartet, mens alle markører og andre geometrier er overlays.

Klassen [`L.control.layers`](http://leafletjs.com/reference-1.0.3.html#control-layers) er et verktøy som gjør det mulig bytte baselayers, og slå overlays av og på.

Legg til en mulighet for å bytte mellom det ordinære bakgrunnskartet og et bakgrunnskart i gråtoner. Gjør det også mulig å slå visningen av severdigheter av og på.




## Oppgave 4: Hent data

Kartet blir enda mer livlig, når du fyller det med nyttige data fra eksterne kilder. I dag er det vanlig å hente data fra et REST API.

I denne oppgaven vil vi hente data fra [Nasjonal vegdatabank](http://www.vegvesen.no/fag/teknologi/Nasjonal+vegdatabank) (NVDB). Gjerne ha [API-dokumentasjonen](https://www.vegvesen.no/nvdb/apidokumentasjon/) lett tilgjengelig, og bruk [Vegkart](https://www.vegvesen.no/vegkart/vegkart/) til å få et innsyn i datagrunnlaget.   

Vi bruker Javascript-APIet [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) til å hente data. Vær oppmerksom på at fetch ikke er støttet i alle nettlesere ennå, og det er nødvendig å legge til et [polyfill](https://github.com/github/fetch) for [blant annet Internet Explorer 11](http://caniuse.com/#search=fetch).

Tips: Test APIet i nettleseren for å verifisere at du får tilbake riktig respons. Legg til `.json` i API-kallene for å få responsen på json-format, og bruk et tillegg som [`JSON formatter`](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa) for å gjøre den mer lesbar.

Eksempel: Dette API-kallet returnerer en liste over alle tilgjengelige datasett fra NVDB:

```
https://www.vegvesen.no/nvdb/api/v2/vegobjekttyper.json
```


### 4.1 Hent bomstasjoner

Vi ønsker å hente alle bomstasjoner, og vise posisjonen til hver enkelt bomstasjon på kartet ved hjelp av en markør. NVDB har en vegobjekttype som heter **bomstasjon**, med id lik `45`. 

API-kall for å hente bomstasjoner blir derfor:

```
https://www.vegvesen.no/nvdb/api/v2/vegobjekter/45.json
```

I tillegg vil vi angi at geometri skal returneres som en del av API-responsen, med WGS84-koordinater.


```
https://www.vegvesen.no/nvdb/api/v2/vegobjekter/45.json?inkluder=geometri&srid=wgs84
```

APIet returnerer geometri på WKT-format, så vi har inkludert et bibliotek som konverterer en WKT-string til et Javascript-array.

Bruk fetch til å hente alle bomstasjoner, og legg til en markør på kartet for hver bomstasjon som returneres.


### 4.2 Hent tunneler


### 4.3 Legg til loading-indikator


## Alle oppgaver


- [ ] 1.1 Finn koordinat
- [ ] 1.2 Endre startposisjon
- [ ] 1.3 Naviger mellom severdigheter
- [ ] 1.4 Øk navigasjonshastigheten
- [ ] 1.5 Legg til en markør


- [ ] 2.1 Avgrens kartets ytre rammer
- [ ] 2.2 Legg til Akvariet
- [ ] 2.3 Legg til Bryggen
- [ ] 2.4 Legg til Fløibanen
- [ ] 2.5 Legg til popups med informasjon
- [ ] 2.6 Refaktoriser navigasjonen


- [ ] 3.1 Grupper severdigheter
- [ ] 3.2 Slå kartlag av og på


- [ ] 4.1 Hent bomstasjoner
- [ ] 4.2 Hent tunneler
- [ ] 4.3 Legg til loading-indikator

[``]() 







