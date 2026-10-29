# Centrale telling online activeren

De lokale implementatie werkt en slaat echt in SQLite op. Voor publiek gebruik is dezelfde API voorbereid als Cloudflare Worker met D1. Er is nog geen externe database gemaakt of deployment uitgevoerd. Alleen een statische ZIP publiceren activeert geen centrale telling.

## Voorbereide bestanden

- `server/worker.mjs`: Worker-entrypoint, met assets en API.
- `server/api.mjs`: validatie, stemmen en geaggregeerde resultaten.
- `server/migrations/0001_community.sql`: databaseschema.
- `wrangler.jsonc`: configuratie; database-ID blijft `TO_CONFIRM_DATABASE_ID` tot een echte database is aangemaakt.

De verbinding gebruikt een [D1-binding](https://developers.cloudflare.com/d1/worker-api/d1-database/) en een [Worker-assetsbinding](https://developers.cloudflare.com/workers/static-assets/binding/). Er staan geen tokens of wachtwoorden in de broncode. Voor `node:sqlite` gebruikt de lokale server de aanwezige Node 24 API; de Worker gebruikt uitsluitend D1.

## Activatie na keuze van account en domein

Voer in PowerShell in de projectmap uit. Een eventuele Cloudflare-login moet Utku zelf voltooien. Accountkeuze, databaseaanmaak en publicatie zijn niet automatisch uitgevoerd.

1. `npx.cmd wrangler d1 create galatasaray-community`
2. Vul de teruggegeven database-ID in `wrangler.jsonc` in. Behoud binding `DB`.
3. `npx.cmd wrangler d1 migrations apply galatasaray-community --remote`
4. Publiceer na akkoord met `npx.cmd wrangler deploy` en verbind het gekozen eigen domein. De statische bestanden en API moeten op dezelfde origin draaien.

Na deployment: stem via twee browsers, controleer dat wijzigen de telling niet ophoogt, controleer spelers/posities, download CSV, controleer console, HTTP-fouten en mobiele layout op de echte URL. De D1-variant is voorbereid maar nog niet op een externe Cloudflare-omgeving getest.

## Datagebruik

POST `/api/vote/monthly`: kalendermaand, speler-ID, willekeurige browsersleutel.
POST `/api/vote/lineup`: wedstrijd-ID, elf unieke spelers per positie, browsersleutel.
GET `/api/community`: alleen geaggregeerde resultaten.
GET `/api/community.csv`: alleen geaggregeerde resultaten als CSV.

Stemmen hebben geen account nodig. De API bewaart gehashte sleutels per ronde, speler-ID’s/opstelling en laatste wijzigingstijd. Naam, contactgegevens en IP worden niet in de stemtabellen opgeslagen. Observability staat standaard uit in de Worker-configuratie. Controleer vóór livegang de hostinginstellingen en hoe lang je stemrondes wilt bewaren.

Gelijke browsersleutels overschrijven binnen dezelfde ronde de vorige inzending. Requests van een andere origin, onbekende spelers, onvolledige/dubbele opstellingen en gesloten rondes worden afgewezen. Updates binnen twee seconden worden afgeremd. Dit beperkt herhaalde klikken, maar bewijst geen unieke personen en blokkeert geen doelgerichte botcampagne.

De lokale database (`data/`) is uitgesloten van Git en ZIP-bestanden. Kopieer bestaande stemdata nooit ongemerkt mee naar een demo of nieuwe clubversie.
