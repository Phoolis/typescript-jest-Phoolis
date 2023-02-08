# Yksikkötestaus Jest-työkalulla

Tässä tehtävässä harjoitellaan yksikkötestausta [Jest-työkalulla](https://jestjs.io/) Node.js-ympäristössä. Tehtävänäsi on kirjoittaa yksikkötestit valmiiksi annetulle [`finnishDateString`-funktiolle](./src/dateFormatter.ts), joka muotoilee sille annetun `Date`-olion suomenkieliseksi merkkijonoksi.

Tehtävä on kaksiosainen:

1. Ensimmäisessä osassa sinun tulee kirjoittaa funktiolle yksikkötestit, joiden avulla löydät funktiossa mahdollisesti piilevät virheet.

2. Toisessa osassa sinun tulee muokata annettua koodia niin, että funktio toimii toivotulla tavalla ja testit menevät läpi.


## Testattava ja korjattava koodi

Tässä tehtävässä käsitellään [`dateFormatter.ts`-tiedostossa](./src/dateFormatter.ts) sijaitsevaan `finnishDateString`-funktiota. Funktion on tarkoitus muotoilla sille annettu `Date`-olion suomenkieliseksi merkkijonoksi ja palauttaa esimerkiksi teksti `'maanantai 1. tammikuuta 2024'`:

```ts
const dayNames: readonly string[] = [
    'maanantai', 'tiistai', 'keskiviikko',
    'torstai', 'perjantai', 'lauantai', 'sunnuntai'
];

const monthNames: readonly string[] = [
    'tammi', 'helmi', 'maalis', 'huhti', 'touko', 'kesä',
    'heinä', 'elo', 'syys', 'loka', 'marras', 'joulu'
];

/**
 * Formats and returns the given date as a Finnish date string, such as
 * 'maanantai 1. tammikuuta 2024'.
 *
 * @param date the date to format
 * @returns the formatted string, in Finnish
 */
export function finnishDateString(date: Date): string {
    const dayName = dayNames[date.getUTCDay() - 1];
    const monthName = monthNames[date.getUTCMonth() - 1];

    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return `${dayName} ${day}. ${monthName}kuuta ${year}`;
}
```

Valmis koodi sisältää kuitenkin virheitä, joiden vuoksi muodostetut merkkijonot eivät välttämättä vastaa odotettuja...


### Koodin aikavyöhykkeet 🕚 vs. 🕐

Aikavyöhykkeisiin ja kesä- sekä talviaikaan liittyvien mahdollisten ongelmien välttämiseksi annetussa koodissa annettua ajanhetkeä käsitellään [UTC-ajassa (Coordinated Universal Time)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time). "Normaalit" metodit (`getDate()`, `getFullYear()`...) palauttavat puolestaan samalle ajanhetkelle eri arvoja käyttöjärjestelmän aikavyöhykkeestä riippuen. GitHub classroom -testit ajetaan eri aikavyöhykkeellä kuin millä kirjoitat koodisi, joten sekaannusten välttämiseksi suosittelemme vahvasti käyttämään tässä tehtävässä ainoastaan UTC-aikavyöhykkeelle sijoittuvia aikoja.

Luodessasi `Date`-olioita merkkijonojen perusteella, ne tulkitaan UTC-ajaksi, mikäli merkkijonossa ei esiinny kellonaikaa. Jos taas lisäät mukaan kellonajan, tulkitaan se paikalliseksi ajaksi:

> *"Date-only strings (e.g. "1970-01-01") are treated as UTC, while date-time strings (e.g. "1970-01-01T12:00") are treated as local."*
>
> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#date_string

Luontitavasta riippuen `Date`-oliosi saattavat siis olla eri aikavyöhykkeellä kuin millä tarkoitit, joten niiden päivämäärät saattavat vaihdella. Mikäli kohtaat aikavyöhykeongelmia, suosittelemme tutustumaan [Date-luokan dokumentaatioon](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date) ja kysymään tarvittaessa vinkkejä Teamsissa.


## GitHub classroom

Tehtävä arvostellaan käyttäen [GitHub classroom](https://classroom.github.com/) -palvelua, joka suorittaa ohjelmasi ja tarkastaa sekä pisteyttää tulokset automaattisesti. Taustalla GitHub classroom hyödyntää [GitHub actions](https://github.com/features/actions) -nimistä jatkuvan integroinnin palvelua, johon tutustumme kurssilla lisää myöhemmillä viikoilla.

Voit tarvittaessa lähettää tehtävän tarkastettavaksi monta kertaa. Tee tällöin uusi commit ja vie (push) muutokset GitHubiin. Varmista kuitenkin, että viimeisin tekemäsi commit tuottaa parhaat pisteet.

💡 Automaattisen arvioinnin vuoksi et saa muuttaa `dateFormatter.ts`-tiedoston etkä sieltä julkaistavan `finnishDateString`-funktion nimeä tai parametreja.


## Tehtävän kloonaaminen

Kun olet hyväksynyt tehtävän GitHub classroomissa ja saanut repositoriosta henkilökohtaisen kopion, kloonaa se itsellesi `git clone` -komennolla. Siirry sen jälkeen VS Codeen editoimaan tiedostoja.

Kloonatessasi repositoriota **varmista, että Git-osoitteen lopussa on oma GitHub-käyttäjänimesi**. Jos käyttäjänimesi puuttuu osoitteesta, kyseessä ei ole henkilökohtainen kopiosi tehtävästä. Luo tässä tapauksessa oma classroom-kopio tehtävästä itsellesi Teams-tehtävästä löytyvän linkin avulla.


## Riippuvuuksien asentaminen

Aloita asentamalla projektin riippuvuudet, jotka on määritelty `package.json`-tiedostossa:

```sh
$ npm install
```

Riippuvuudet sisältävät sekä [TypeScript-kielen](https://www.npmjs.com/package/typescript), [Jest-testaustyökalun](https://www.npmjs.com/package/jest) että [`ts-node`](https://www.npmjs.com/package/ts-node)- ja [`ts-jest`](https://www.npmjs.com/package/ts-jest)-paketit TypeScript-kielisen koodin ja testien suorittamiseksi Node.js:llä. Itse Node.js sinulta tulee löytyä valmiina.


## Ohjelman suorittaminen

Tässä tehtävässä tarkoituksena on harjoitella yksikkötestausta, eli testata yksittäistä ohjelman osaa erillään muusta mahdollisesta koodista. Tehtävässä ei siis ole lainkaan käyttöliittymää, jonka kautta voisit kokeilla funktion toimintaa manuaalisesti.

Oman "pääohjelman" kirjoittaminen `finnishDateString`-funktion kokeilemiseksi ei ole kiellettyä, mutta kannustamme vahvasti keskittymään funktion yksikkötestaukseen ja jättämään mahdolliset muut skriptit kirjoittamatta.


## Testien suorittaminen

Tehtävän yksikkötestit suoritetaan [Jest-testityökalun](https://jestjs.io/) avulla komennolla `npm test`:

```sh
$ npm test
```

Taustalla `npm` suorittaa `test`-nimisen skriptin, joka on määritetty `package.json`-tiedostossa seuraavasti:

```json
{
    "scripts": {
        "test": "jest --verbose --coverage"
    }
}
```

Yllä [Jest-komennolle](https://jestjs.io/docs/cli) annetaan kaksi parametria, joiden merkitykset ovat seuraavat:

* `--verbose` "Display individual test results with the test suite hierarchy." ([jestjs.io](https://jestjs.io/docs/cli))

* `--coverage` "Indicates that test coverage information should be collected and reported in the output." ([jestjs.io](https://jestjs.io/docs/cli))

Älä muuta testien käynnistyskomentoa. Mikäli testit eivät mene läpi, kiinnitä erityisesti huomiota saamasi virheraportin *Message*-kohtiin.


## Osa 1: Omien testien kirjoittaminen (2p)

Tehtävän ensimmäisessä osassa sinun tulee kirjoittaa yksikkötestit [`dateFormatter.ts`-tiedostossa](./src/dateFormatter.ts) sijaitsevalle `finnishDateString`-funktiolle. Funktion on tarkoitus muotoilla sille annettu `Date`-olion suomenkieliseksi merkkijonoksi ja palauttaa esimerkiksi teksti `'maanantai 1. tammikuuta 2024'`.

Suosittelemme kirjoittamaan testit tiedostoon [src/tests/dateFormatter.test.ts](./src/tests/dateFormatter.test.ts). Mikäli kirjoitat myös muita testitiedostoja, lisää niiden nimen päätteeksi `.test.ts` ja huolehdi, että testit ovat `src`-hakemiston alla, jotta Jest löytää ja suorittaa testit. Voit hyödyntää testeissäsi joko [Jest:in `expect`-syntaksia](https://jestjs.io/docs/expect) tai [Node.js:n `assert`-syntaksia](https://nodejs.org/api/assert.html).

**Tehtävän ensimmäisessä osassa testisi saavat tuottaa `failed`-tuloksen**, mutta testiraportista on käytävä ilmi, että `dateFormatter.ts`-tiedosto on testattu:

```
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------|---------|----------|---------|---------|-------------------
All files         |     100 |      100 |     100 |     100 |
 dateFormatter.ts |     100 |      100 |     100 |     100 |
------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```


## Osa 2: Funktiossa olevien virheiden korjaaminen (3p)

Tehtävän toisessa osassa sinun tulee muokata annettua koodia siten, että funktio läpäisee kirjoittamasi testit. Palautetun merkkijonon tulee olla välimerkkejä myöten samassa muodossa kuin tehtävänannossa, eli esim. `'maanantai 1. tammikuuta 2024'` tai `'sunnuntai 31. joulukuuta 2023'`.

Ratkaisusi testataan GitHub classroom -palvelussa **kirjoittamiesi testien lisäksi** myös valmiilla testeillä. Mikäli korjattu koodi läpäisee omat testisi mutta ei näitä valmiita testejä, kiinnitä GitHub actions -välilehdellä erityistä huomiota seuraavien testien tuloksiin:

```
PASS  allBugsNeedToBeFixed.test.ts
  Verify that the function has been fixed properly
    √ formats Monday January 1st 2024 correctly
    √ formats Sunday December 31st 2023 correctly
    √ formats months correctly
    √ formats days correctly
```


## Vinkit ohjelmalogiikan korjaamiseksi

Ohjelmalogiikan korjaamiseksi on ensiarvoisen tärkeää tietää, miten siinä käytetyt yksittäiset osat toimivat. Annetussa koodissa olevat virheet johtuvat kenties virheellisistä olettamuksista esimerkiksi yksittäisten numeroarvojen merkityksessä viikonpäivien ja kuukausien numeroinnin yhteydessä.

Tutustu siis JavaScriptin `Date`-luokan dokumentaatioon esimerkiksi [Mozillan mdn web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) -sivustolla. Siellä kannattaa lukea erityisesti kohdat [getDate()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate) sekä [getMonth()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth).

Voit kysellä lisää vinkkejä kurssin keskustelukanavalla.


## Date-luokan historia ja tulevaisuus

Tehtävässä ilmenneet bugit johtuvat mahdollisesti joistain `Date`-luokan epäloogisuuksista:

> *"It is now common knowledge that in 1995 Brendan \[Eich\] was given only 10 days to write the JavaScript language and get it into Netscape. Date handling is a fundamental part of almost all programming languages, and JavaScript had to have it. That said, it’s a complex problem domain and there was a short timeline. Brendan, under orders to “make it like Java” copied the date object from the existing, infant, `java.Util.Date` date implementation. This implementation was frankly terrible. In fact, basically all of it’s methods were deprecated and replaced in the Java 1.1 release in 1997. Yet we’re still living with this API 20 years later in the JavaScript programming language."*
>
> Maggie Pint, 2017. Fixing JavaScript Date – Getting Started. https://maggiepint.com/2017/04/09/fixing-javascript-date-getting-started/

`Date`-luokan epäkohtia on tunnistettu laajasti ja niiden ratkaisemiseksi on luotu mm. lukuisia erillisiä npm-paketteja. JavaScriptin tuleviin versioihin on myös ehdotettu uutta [Temporal-oliota](https://tc39.es/proposal-temporal/docs/index.html), jonka hyväksymisprosessi on vielä kesken. `Temporal` on kokeiltavissa jo etukäteen [erillisenä npm-pakettina](https://www.npmjs.com/package/@js-temporal/polyfill).


## Lisenssit ja tekijänoikeudet

Tämän tehtävän on kehittänyt Teemu Havulinna ja se on lisensoitu [Creative Commons BY-NC-SA -lisenssillä](https://creativecommons.org/licenses/by-nc-sa/4.0/).
