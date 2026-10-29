# Controle — 29 oktober 2026

## Community-update

- Nieuwe rode “Ayın oyuncusunu sen seç” sectie; alle 32 spelers kiesbaar.
- Werkende lokale SQLite-backend. Voorbereide Cloudflare Worker/D1-backend; niet online uitgerold.
- 6 tests geslaagd, inclusief vervangende maandstem, positiegebonden tellingen, ongeldige/dubbele opstellingen, verkeerde origins, verkeerde rondes, stemsluiting en kalendermaand in Istanbul.
- Echte browserinzending op de aparte in-memory testserver 4178 geslaagd. Maandstem van Osimhen naar Torreira veranderd: totaal blijft 1. Volledige basiself verstuurd: 1 kadro, Osimhen 1 keer als santrfor; na herladen blijft het totaal staan.
- Gebruikersdatabase op 4177 niet met teststemmen gevuld. Bestaande opstelling van 5 spelers behouden.
- Geen horizontale overflow of mislukte geladen afbeeldingen op 390, 768 en 1440 px bij de community-update. Geen consolefouten of waarschuwingen op de testtab.
- Nieuwe publiceerbare frontend: 1.436.201 bytes, inclusief audio. Backend en database vallen buiten deze frontendmeting.
- Statische assetcheck slaagt; /api/community.csv is terecht een serverroute, geen statisch bestand.
- Nieuwe backend-ZIP sluit database, lokale browsersleutels, credentials en testdata uit.
- Volledige Lighthouse/frameprofilering en externe D1-deployment blijven niet uitgevoerd.

- Publiceerbare bestanden: 1.422.114 bytes inclusief supportersaudio, exclusief optionele achtergrondvideo. Onder 2 MB.
- Lokale assetcontrole: geen ontbrekende verwijzingen.
- Eén H1. Geen horizontale overflow op 390, 768 en 1440 px.
- Geen fout- of waarschuwingsmeldingen in de browserconsole tijdens de controle.
- Geen mislukte geladen afbeeldingen op de gecontroleerde schermen.
- Zoekpaneel toont 32 spelers; zoeken op Osimhen geeft één resultaat.
- Spelerskeuze blijft na herladen staan. Dubbele selectie is geblokkeerd.
- Laatste basiself levert 11 verschillende spelers. Testselecties weer gewist.
- Supportersaudio geladen: duur 30 s; afspelen geverifieerd na gebruikersinteractie.
- Drie betekenisvolle state-tests geslaagd: corrupte opslag, dubbele spelers, geldige laatste basiself.
- WhatsApp-link verwijst naar 905016401479 met Galatasaray-specifieke Turkse tekst. Geen bericht verzonden.
- CSS bevat reduced-motion-afhandeling; volledige aparte reduced-motion/no-JS-browseraudit en Lighthouse/frameprofilering zijn niet uitgevoerd. Geen claims over Lighthouse-scores of Core Web Vitals.
- Alleen lokaal gebouwd; geen deploy, commit of push.

## Vrijstaande portretten en officiële tegenstanderlogo’s

- Alle 32 portretten hebben echte alpha-transparantie. Oorspronkelijke clubfoto-RGB gebruikt met achtergrondmaskers; geen gegenereerde gezichten in de website.
- Gouden kaarten, laatste basiself, Dream 11 en de spelerskiezer gebruiken de nieuwe uitsneden. Witte rechthoeken verwijderd en kaartweergave aangepast met object-fit: contain.
- Konyaspor- en Fenerbahçe-logo’s komen rechtstreeks uit officiële clubbronnen; letterplaatsvervangers vervangen.
- Browser: 11 vrijstaande portretten in de laatste basiself; alle 5 bestaande Dream 11-portretten gebruiken de uitsneden; geen mislukte geladen afbeeldingen en geen horizontale overflow op mobiel.
- Bestaande opstelling en stemmen zijn niet gewijzigd. Zes state/API-tests blijven geslaagd.
