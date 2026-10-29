# Galatasaray — onafhankelijk fanconcept

Zelfstandige Turkstalige Galatasaray-website in `dist/`. Aparte versie naast het Fenerbahçe-concept; geen officiële opdracht of samenwerking met de club. De stemfuncties gebruiken nu ook de API in `server/`.

## Starten

Node.js 24+ vereist. Open deze map en voer `npm start` uit. Preview: http://127.0.0.1:4177/. Geen installatie of build nodig. Stemmen worden lokaal in `data/community.sqlite` bewaard. Alleen `dist/` uploaden is voor de stemfuncties onvoldoende: daarvoor moeten de Worker en D1-database uit DEPLOY-COMMUNITY.md ook worden geactiveerd. Gebruik in Turkije een eigen domein.

## Inhoud en functies

- Rood, geel en donker bordeaux; echte clubbeelden, officieel logo en zelf gehoste fonts met Turkse tekens.
- Afteller naar Konyaspor – Galatasaray, 30 oktober 2026, 20.00 TSİ. Gegevens gecontroleerd op 29 oktober; geen live koppeling.
- Vorige derby, Osimhen-sectie en laatste basiself volgens het officiële wedstrijdverslag.
- Elftalbouwer met 32 officiële selectiespelers, alle spelers beschikbaar per positie, zoeken, groepsfilters, dubbele spelers geblokkeerd, laatste basiself en reset.
- Eigen localStorage-sleutel `uluks-gala-favourite-eleven-v1`; raakt Fenerbahçe-keuzes niet aan.
- Drie officiële 2026/27 GSStore-tenues. Links openen de echte winkel; geen betalingen op het concept.
- Supportersclip “Çocukluk Aşkımsın”, volume en uitknop. Geluid staat standaard aan; browsers kunnen een eerste aanraking vereisen.
- WhatsApp-afspraak naar U-LUKSSTUDYO, +90 501 640 14 79, met Turks vooringevuld bericht. Opent uitsluitend een gesprek.
- Drie duidelijk als concept gemarkeerde fanpakketten, zonder verzonnen prijzen of inschrijving.

Optionele achtergrondvideo: voeg `dist/media/stadium-drone.mp4` toe. Zonder video blijft de echte clubfoto zichtbaar.

## Bestanden

`dist/index.html`: inhoud. `style.css`, `official.css`, `gala.css`, `squad-builder.css`: ontwerp. `squad-data.js`: selectie. `squad-state.js`: opstelling. `squad-builder.js`: interactie. `app.js`: navigatie, afteller en slider. `music.js`: audio.

`npm test` controleert opslagherstel, dubbele spelers en de basiself. `node check.mjs` controleert lokale assets, achtergebleven Fenerbahçe-code en het budget van 2 MB.

De technische studio-starterhandleiding en controles zijn bewaard in `starter-reference/`; de zelfstandige fanwebsite gebruikt de bestaande buildloze Fenerbahçe-architectuur.

Niet gecommit, gepusht of gepubliceerd.

## Ayın oyuncusu en opstellingsstatistieken

De rode maandspelersectie laat bezoekers uit alle 32 spelers kiezen. De kalendermaand volgt Europe/Istanbul. Een willekeurige browsersleutel wordt uitsluitend voor stemmen gebruikt. De server bewaart daarvan een hash per maand of wedstrijd, geen naam, telefoon, e-mail of IP in de stemtabellen. De hostingprovider kan wel technische toegangslogs verwerken; de beloften op de site gaan over de stemgegevens in deze applicatie.

De elftalbouwer verstuurt pas na “Kadromu gönder” een complete, gevalideerde opstelling. Losse klikken blijven lokaal. Eén actuele opstelling per browsersleutel per wedstrijd; opnieuw inzenden vervangt de oude selectie. De statistiek toont aantallen per speler EN positie. Percentages gebruiken het aantal ingezonden opstellingen als noemer. Links- en rechtscentraal worden apart geteld.

De resultaten en de CSV bevatten alleen totalen en zijn publiek zichtbaar. De CSV omvat alle gekozen spelers en posities; de schermranglijsten tonen maximaal vijf spelers per positie/maand. Geen verzonnen beginstanden. Verschillende browsers of gewiste opslag kunnen als aparte stemmen tellen: dit is een fanpeiling, geen gegarandeerde één-persoon-één-stemverkiezing.

De huidige opstellingsronde sluit automatisch bij de geplande aftrap op 30 oktober 2026 om 20.00 TSİ. Werk `fixture` in server/api.mjs bij voor een volgende wedstrijd. Oude rondes blijven in de database; de publieke resultaten tonen de ingestelde wedstrijd en actuele kalendermaand. Maak een back-up voordat je de database beheert.

Controles: `npm test` (zes tests), `node check.mjs`. Browserinzendingen zijn in een aparte vluchtige testdatabase op poort 4178 gecontroleerd. De gebruikersdatabase op 4177 en de bestaande opgeslagen vijf spelers zijn daarbij niet gewijzigd.
