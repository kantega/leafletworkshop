# Leaflet workshop



## Oppgave 1: Kom i gang

I denne oppgaven lærer vi å opprette et helt enkelt Leaflet-kart. Gjerne ta en titt på [Leaflet Quick Start Guide](http://leafletjs.com/examples/quick-start/) ved siden av. 

Et par tips: 

* [`L.map`](http://leafletjs.com/reference-1.0.3.html#map) Instansierer Leaflet-kartet
* [`L.tileLayer`](http://leafletjs.com/reference-1.0.3.html#tilelayer) angir et bakgrunnskart


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

Bruk klassen [`L.marker`](http://leafletjs.com/reference-1.0.3.html#marker) til å opprette en markør for ditt favorittsted i Bergen, og legge markøren til kartet ved hjelp av metoden. [`map.addLayer`]().

Metoden [`.bindPopup`]() kan brukes til å aktivere en popup når du trykker på markøren i kartet. 


## Oppgave 2: Markører og popups

Nå skal vi bygge videre på det gode arbeidet vi gjorde i oppgave 1, og 


[``]() 







