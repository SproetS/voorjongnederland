# Handleiding voor redactie
## Doel
Met deze handleiding kun je eenvoudig pagina's, nieuwsberichten en radio-items aanpassen.

Belangrijk: homepage-afbeelding beheer je in `src/content/pages/home.md`.
De URL `/voor-jong-nederland/` verwijst door naar `/`.

## 1) Bestaande content bewerken
1. Open het juiste contentbestand.
2. Pas titel en tekst aan.
3. Sla op.
4. Controleer in de site of alles goed staat.

## 2) Nieuw nieuwsbericht toevoegen
1. Maak een nieuw berichtbestand aan in de map voor nieuws/blog.
2. Vul minimaal in:
   - titel
   - publicatiedatum
3. Schrijf de inhoud van het bericht onder de kopgegevens.
4. Sla op en controleer de nieuwspagina.

Als je een feature image wilt tonen, voeg dan dit toe in de kopgegevens (frontmatter):

```md
featureImage: /assets/images/mijn-afbeelding.jpg
featureImageAlt: Korte omschrijving van de afbeelding
showFeatureImage: true
```

## 3) Vaste pagina bijwerken
1. Open de pagina die je wilt aanpassen (bijvoorbeeld Home, Cultuur of Archief).
2. Werk tekst en eventueel afbeelding bij.
3. Sla op en controleer de pagina.

## 4) Nieuw radio-item toevoegen
1. Maak een nieuw item in de radio/podcast map.
2. Vul titel en publicatiedatum in.
3. Voeg samenvatting, duur en audiolink toe als die beschikbaar zijn.
4. Sla op en controleer het item op de radiosectie.

## 5) Concept bewaren zonder publicatie
Wil je iets voorbereiden maar nog niet tonen? Zet het item op concept (`draft: true`).

## 6) Controle voor publicatie
Controleer altijd:
- titel klopt
- datum klopt
- links werken
- afbeelding en audio werken
- tekst heeft geen typfouten

## 7) Praktische werkwijze
- Werk in kleine stappen.
- Controleer na elke wijziging.
- Houd titels kort en duidelijk.
- Gebruik een korte samenvatting voor overzichtspagina's.
