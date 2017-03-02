# Workshop: Visualisering av data på kart

I denne workshopen vil dere få en innføring i å visualisere informasjon på kart i nettleseren, ved hjelp av Javascript-biblioteket Leaflet.

Workshopen er bygd opp av en rekke praktiske oppgaver. Hver oppgave har en tilhørende HTML- og en javascript-fil, og javascript-filen inneholder flere feil som dere må rette opp i, for å få applikasjonen til å fungere som forventet.




## Kort om kart


Jordkloden vår kan modelleres som et flatt kart bestående av breddegrader (*latitude*) og lengdegrader (*longitude*). 

Breddegrader går fra -90 til +90, der 0-breddegraden er ekvator. Lengdegrader går fra -180 til +180, der 0-lengdegraden går gjennom Greenwich i London.

Et punkt på kartet kan angis ved hjelp av en koordinat, angitt på følgende måte `[*breddegrad*, *lengdegrad*]`. Bredde- og lengdegrader kan angis som desimaltall. I denne workshopen vil det flere steder være nødvendig å angi 4 desimaler, for å få en nøyaktig nok posisjon på kart.

Et punkt i Bergen sentrum kan for eksempel uttrykkes med følgende koordiant: `[60.3912, 5.3305]`

Det finnes flere ulike projeksjoner og koordinatsystemer for å plassere objekter nøyaktig på kart, men i denne workshopen vil vi utelukkende bruke lengde- og breddegrader, også kalt WGS84. 

![Lengde- og breddegrader](http://www.hicksvillepublicschools.org/cms/lib2/NY01001760/Centricity/Domain/1236/latitude_longitude.gif)





## Oppgave 1: Kom i gang

I denne oppgaven lærer vi å opprette et helt enkelt Leaflet-kart. Gjerne ta en titt på [Leaflet Quick Start Guide](http://leafletjs.com/examples/quick-start/) ved siden av. Legg merke til at [`L.map`](http://leafletjs.com/reference-1.0.3.html#map) Instansierer Leaflet-kartet, og [`L.tileLayer`](http://leafletjs.com/reference-1.0.3.html#tilelayer) angir et bakgrunnskart. 




### 1.1 Finn koordinater

Gjennom oppgavene i denne workshopen vil det være nyttig å vite hvilken koordinat et bestemt punkt i kartet har. Vi vil derfor implementere en funksjon gjør at det skrives en koordinat til utviklerkonsollet, hver gang det trykkes på et punkt i kartet. 

For å få til dette, må vi bruke metoden [`map.on`](http://leafletjs.com/reference-1.0.3.html#evented-on) til å lytte til eventen `click`.


### 1.2 Endre startposisjon

Metoden [`map.setView`](http://leafletjs.com/reference-1.0.3.html#map-setview) brukes til å angi startposisjonen til kartet. I dag vises Timbuktu som standard, men det er ikke interessant for oss skkurat i dag. Endre startposisjon til Bergen sentrum, med zoom-nivå `12`.


### 1.3 Naviger mellom severdigheter

Ovenfor kartet er det knapper med samme navn som kjente severdigheter i Bergen. Når dere prøver å trykke på dem, skjer det imidlertid ikke noe. 

Gjør det mulig å navigere mellom Bergens severdigheter kun ved å trykke på noen knapper. Metoden [`map.flyTo`](http://leafletjs.com/reference-1.0.3.html#map-flyto) kan brukes til dette. 


### 1.4 Øk navigasjonshastigheten

Greit, nå har vi fått navigasjonen til å fungere, men animasjonen går litt for sakte for de flestes smak. For de fleste metoder er det mulig å angi et valgfritt options-objekt som et siste parameter når metoden kalles. 

Legg til et objekt som inneholder `duration: 0.5` på `map.flyTo`-metoden for å øke animasjonshastigheten.


### 1.5 Legg til en markør

Et godt designet bakgrunnskart er vel og bra, men det fine med Leaflet er at dere kan legge til en hel mengde ulike markører og lag på toppen av bakgrunnskartet. 

Bruk klassen [`L.marker`](http://leafletjs.com/reference-1.0.3.html#marker) til å opprette en markør for ditt favorittsted i Bergen, og legge markøren til kartet ved hjelp av metoden [`map.addLayer`](http://leafletjs.com/reference-1.0.3.html#map-addlayer).








## Oppgave 2: Markører og popups

I denne oppgaven vil vi fortsette på det gode grunnlaget vi etablerte i oppgave 1, og lære mer om markører og geometrier. 




### 2.1 Avgrens kartets ytre rammer

Kartets startposisjon er Bergen, og i denne workshopen vil vi kun forholde oss til Bergen og omegn. Derfor ønsker vi også å avgrense kartets ytre rammer, så det ikke blir mulig å navigere seg vekk fra Vestlandet.

`L.map` tar også imot et options-objekt. Angi [`maxBounds`](http://leafletjs.com/reference-1.0.3.html#map-maxbounds) og [`minZoom`](http://leafletjs.com/reference-1.0.3.html#map-minzoom).


### 2.2 Legg til Akvariet

Akkurat nå er det mulig å navigere seg frem til Akvariet, men vil gjerne at Akvariets beliggenhet skal bli enda mer synlig.

For å oppnå dette, kan vi legge til et polygon som viser Akvariets utstrekning, ved hjelp av klassen [`L.polygon`](http://leafletjs.com/reference-1.0.3.html#polygon). Et polygon angis ved hjelp av et sett med punktkoordinater, på denne formen: `[[60.39973, 5.30204], [60.40063, 5.30399], [60.40011, 5.30590], [60.39863, 5.30412]]`.

Husk å legge til polygon-laget ved hjelp av `map.addLayer`. `L.polygon` godtar også et options-objekt som parameter, der dere for eksempel kan angi `color: '#f00'`


### 2.3 Legg til Bryggen

Bruk [`L.marker`](http://leafletjs.com/reference-1.0.3.html#marker) fra oppgave 1.5 til å legge til Bryggen på kartet. 


### 2.4 Legg til Fløibanen

Det vil være mer praktisk å bruke en linje enn et polygon eller en markør for å visualisere Fløibanen. Bruk klassen [`L.polyline`](http://leafletjs.com/reference-1.0.3.html#polyline) for å lage en linje som markerer Fløibanens trasé. 

`L.polyline` tar imot koordinater på samme format som `L.polygon`. Gjerne la linjen få en rød farge. 


### 2.5 Legg til popups med informasjon

Metoden [`.bindPopup`](http://leafletjs.com/reference-1.0.3.html#layer-bindpopup) kan brukes til å aktivere en popup når dere trykker på et lag i kartet. 

Legg til popups på Akvariet, Bryggen og Fløibanen med navn på severdigheten, og eventuell annen relevant informasjon. `bindPopup` godtar HTML, så det er mulig å formatere teksten og legge til bilder.


### 2.6 Refaktoriser navigasjonen

I oppgave 1.3 brukte vi `map.flyTo` til å navigere til bestemte koordinater på kartet. 

Bryggens koordinater er akkurat nå oppgitt to ulike steder i kildekoden. Både i `.flyTo`-metoden vi benyttet i oppgave 1.3, men også i markøren vi introduserte i oppgave 2.3. 

En mer elegant løsning er å la `map.flyTo` bruke Bryggen-markørens koordinater direkte. Disse koordinatene finner dere ved å bruke metoden [`.getLatLng()`](http://leafletjs.com/reference-1.0.3.html#marker-getlatlng). 

For Akvariet og Fløibanen kan `map.flyTo` erstattes av [`map.flyToBounds`](http://leafletjs.com/reference-1.0.3.html#map-flytobounds), som flyr til severdighetens utstrekning i stedet for et angitt punkt. Bruk metoden [`.getBounds()`](http://leafletjs.com/reference-1.0.3.html#polyline-getbounds) for å finne lagenes utstrekning. 














## Oppgave e: Hent data

Kartet blir enda mer livlig, når dere fyller det med nyttige data fra eksterne kilder. I dag er det vanlig å hente data fra et REST API.

I denne oppgaven vil vi hente data fra [Nasjonal vegdatabank](http://www.vegvesen.no/fag/teknologi/Nasjonal+vegdatabank) (NVDB). Gjerne ha [API-dokumentasjonen](https://www.vegvesen.no/nvdb/apidokumentasjon/) lett tilgjengelig, og bruk [Vegkart](https://www.vegvesen.no/vegkart/vegkart/) til å få et innsyn i datagrunnlaget.   

Vi bruker Javascript-APIet [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) til å hente data. Vær oppmerksom på at fetch ikke er støttet i alle nettlesere ennå, og det er nødvendig å legge til et [polyfill](https://github.com/github/fetch) for [blant annet Internet Explorer 11](http://caniuse.com/#search=fetch).

Tips: Test APIet i nettleseren for å verifisere at dere får tilbake riktig respons. Legg til `.json` i API-kallene for å få responsen på json-format, og bruk et tillegg som [`JSON formatter`](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa) for å gjøre den mer lesbar.

Eksempel: Dette API-kallet returnerer en liste over alle tilgjengelige datasett fra NVDB:

```
https://www.vegvesen.no/nvdb/api/v2/vegobjekttyper.json
```




### e.1 Hent bomstasjoner

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


### e.2 Hent tunneler

Tunneler er en annen vegobjekttype det er mye av i Bergen. Men i motsetning til bomstasjon, har tunneler en utstrekning som visualiseres ved hjelp av en linje, i stedet for et punkt. 

API-kallet i forrige oppgave hentet alle bomstasjoner i hele Norge, og ikke bare i Bergen. Dette gikk problemfritt, siden det er et lite datasett, men for tunneler ønsker vi å begrense responsen som returneres. Vi kan gjøre dette ved å legge til et områdefilter på API-kallet, som kun henter tunneler i Hordaland (fylke=12). Vi henter vegobjekttypen **tunnelløp**, med id lik `67`.  

```
https://www.vegvesen.no/nvdb/api/v2/vegobjekter/67.json?inkluder=geometri&srid=wgs84&fylke=12
```

Hent alle tunnelløp i Hordaland, og legg til en linje på kartet for hvert tunnelløp som returneres.


### e.3 Legg til loading-indikator

Det er et godt prinsipp å gi brukeren en indikasjon på nettsiden venter på data som lastes ned i bakgrunnen. 

Legg til en loading-indikator som startes idet det gjøres et API-kall, og skjules når API-kallet er fullført.








## Oppgave 4: Markercluster

I denne oppgaven vil vi jobbe med et mye større datasett: Vegobjekttypen **trafikkulykke**, med id lik `570`. For datasett av denne størrelsen, er vi nødt til å bruke andre teknikker for å få til en fornuftig visualisering på kart.




### 4.1 Hent trafikkulykker innenfor kartutsnitt

Datasettet for trafikkulykker er så stort at vi er nødt til å begrense oss til kun å hente data innenfor det aktive kartutsnittet.

Metoden [`map.getBounds`](http://leafletjs.com/reference-1.0.3.html#map-getbounds) kan benyttes til å hente det aktive kartutsnittet, og [`.toBBoxString()`](http://leafletjs.com/reference-1.0.3.html#latlngbounds-tobboxstring) konverterer det returnerte arrayet til en string.

APIet tilbyr parameteren `kartutsnitt` for begrense søkeområdet. Parameteren `antall` kan i tillegg benyttes til å begrense antall vegobjekter som returneres i responsen.

Hent alle trafikkulykker innenfor kartutsnittet. Legg til hver trafikkulykke som en markør i en layerGroup, som igjen legges til kartet. 


### 4.2 Legg til markercluster

API-kallet i forrige oppgave resulterte i et uhåndterlig antall markører. Nettleseren ble delvis uresponsiv, og visningen på kart ga heller ikke stor mening.

Når vi opererer med så mange markører, gir det ikke mening å vise hver enkelt markør. Vi ønsker heller å gruppere markører som er nære hverandre, og fortelle med tall hvor mange markører som befinner seg innenfor hver gruppering. For å få til dette, kan vi bruke pluginen [`Leaflet.markercluster`](https://github.com/Leaflet/Leaflet.markercluster).

Legg til trafikkulykkene i `L.markerClusterGroup`, i stedet for å bruke `L.layerGroup`.


### 4.3 Oppdater data ved panorering

Nå hentes data første gang kartet lastes, men det skjer ingenting når dere zoomer inn/ut eller panorerer kartet. Det kan vi gjøre noe med!

Bruk metoden [`map.on`](http://leafletjs.com/reference-1.0.3.html#evented-on) til å lytte til eventen `moveend`, og flytt funksjonen som henter data. 


### 4.4 Ikke legg til duplikater

Har dere sett nøye på tallet innenfor hver markercluster? Om dere panorerer mye frem og tilbake, vokser det! Det skyldes at vi ved nye API-kall får returnert vegobjekter som allerede finnes på kartet, og vi legger dem ukritisk til kartet på nytt igjen.

Modifiser Javascript-koden, og sørg for at vi ikke legger til duplikater. 


### 4.5 Vis egenskapsdata

Punkter på kart er bare halve moroa! Trafikkulykker har også mange spennende egenskapsdata, med detaljert informasjon om hver eneste trafikkulykke. For eksempel ulykkesdato, vær og føreforhold, og antall involverte personer. 

Vi ønsker at det skal komme opp informasjon om trafikkulykken i feltet til høyre, når dere klikker på en markør i kartet. 

I NVDB har Hver trafikkulykke har en unik id. Vi lagrer denne iden på hver markør, ved å sende inn et options-objekt med 
[`title`](http://leafletjs.com/reference-1.0.3.html#marker-title) når vi oppretter markøren. Når dere klikker på markøren, bruker vi denne iden til å gjøre et nytt API-kall hvor vi henter detaljert informasjon om akkurat denne trafikkulykken.








## Oppgave 5: Heatmap

Trafikkulykker kan også visualiseres i form av et heatmap eller et diagram.

I denne oppgaven henter vi både geometri og egenskaper for alle trafikkulykker i hvert eneste API-kall, og har derfor lagt inn et datofilter for å begrense datamengden. 

```
https://www.vegvesen.no/nvdb/api/v2/vegobjekter/570.json?inkluder=geometri,egenskaper&srid=wgs84&egenskap="5055>'1999-12-31'"
```

Les mer [egenskapsfilter](https://www.vegvesen.no/nvdb/apidokumentasjon/#/parameter/egenskapsfilter) og [vegobjekttypen trafikkulykke](https://www.vegvesen.no/nvdb/api/v2/vegobjekttyper/570.json) for å finne flere måter å filtrere datasettet på.
 



### 5.1 Legg til heatmap

Bruk pluginen [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat) til å visualisere trafikkulykkene som et heatmap. Klassen `L.heatLayer` kan brukes i stedet for `L.markerClusterGroup`.


### 5.2 Legg til søylediagram

[Chart.js](http://www.chartjs.org/) er et nyttig bibliotek for å visualisere data i form av en rekke typer diagrammer. Trafikkulykker har også mange interessante egenskaper som kan visualiseres på denne måten. 

Tips: Grunnlagsdata logges til utviklerkonsollet.

Bruk Chart.js til å lage et søylediagram som viser antall trafikkulykker, fordelt på ukedag.


### 5.3 Endre fargeskala

Det er ikke alltid lett å finne gode fargekombinasjoner. Verken til markører, eller til diagrammer. 

Finn en pen fargekombinasjon hos [ColorBrewer](http://colorbrewer2.org/#type=diverging&scheme=Spectral&n=7), og oppdater fargeskalaen til søylediagrammet. 








## Oppgave 6: Grupper lag

I denne oppgaven vil vi se nærmere på gruppering og aktivering/deaktivering av kartlag. Det vil være nyttig å ha [Layer Groups and Layers Control](http://leafletjs.com/examples/layers-control/) åpen mens dere løser disse oppgavene. 




### 6.1 Grupper severdigheter

Bruk klassen [`L.layerGroup`](http://leafletjs.com/reference-1.0.3.html#layergroup) til å gruppere severdighetene, som dere så legger til kartet.


### 6.2 Slå kartlag av og på

Kartlag kan deles inn i to kategorier. **Baselayers** og **Overlays**. Baselayers er selve bakgrunnskartet, mens alle markører og andre geometrier er overlays.

Klassen [`L.control.layers`](http://leafletjs.com/reference-1.0.3.html#control-layers) er et verktøy som gjør det mulig bytte baselayers, og slå overlays av og på.

Legg til en mulighet for å bytte mellom det ordinære bakgrunnskartet og et bakgrunnskart i gråtoner. Gjør det også mulig å slå visningen av severdigheter av og på.








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





