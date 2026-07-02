# Korte tutorial: content toevoegen en bewerken
## 1) Waar staat de content?

Belangrijk: de homepage is `src/content/pages/home.md`.
De URL `/voor-jong-nederland/` is alleen een redirect naar `/` en is geen aparte homepage-contentbron.

De site leest Markdown-content uit drie mappen:

- `src/content/pages/` voor vaste pagina's (zoals home, cultuur, archief)
- `src/content/blog/` voor nieuws/blog-berichten (gebruikt op zowel `/nieuws/` als `/blog/`)
- `src/content/podcasts/` voor radio/podcast afleveringen (o.a. `/radio/`)

De velden (frontmatter) worden gevalideerd in `src/content.config.ts`.

## 2) Nieuw bericht toevoegen (nieuws/blog)
1. Maak een nieuw `.md` bestand in `src/content/blog/`, bijvoorbeeld:
   - `src/content/blog/mijn-nieuwe-bericht.md`
2. Voeg frontmatter toe:

```md
---
title: Mijn nieuwe bericht
excerpt: Korte samenvatting voor overzichten.
publishDate: 2026-05-15
featureImage: /pad/naar/afbeelding.jpg
featureImageAlt: Beschrijving van de afbeelding
showFeatureImage: true
draft: false
---

Hier komt de inhoud van je bericht.
```

Minimaal nodig voor blog: `title` en `publishDate`.

Feature image toevoegen in frontmatter:

```md
featureImage: /assets/images/mijn-afbeelding.jpg
featureImageAlt: Korte omschrijving van de afbeelding
showFeatureImage: true
```

Let op: in deze codebase is de veldnaam `featureImage` (camelCase).

## 3) Bestaand bericht bewerken
1. Open het bestaande bestand in `src/content/blog/`.
2. Pas titel, tekst of metadata aan.
3. Werk bij grote wijzigingen ook `updatedDate` bij:

```md
updatedDate: 2026-05-15
```

## 4) Vaste pagina bewerken
Vaste pagina's staan in `src/content/pages/`.

Veelgebruikte velden:
- `title`
- `description`
- `showFeatureImage`
- `featureImage`
- `featureImageAlt`
- op home: `homeTiles`

## 5) Radio/podcast item toevoegen
1. Maak een nieuw `.md` bestand in `src/content/podcasts/`.
2. Gebruik o.a. deze velden:

- `title`
- `publishDate`
- `excerpt`
- `audioUrl`
- `duration`
- `episodeNumber`
- `featureImage`, `featureImageAlt`

## 6) Concepten (niet publiceren)
Zet een item op concept met:

```md
draft: true
```

Dan wordt het niet gepubliceerd in de live lijsten.

## 7) Controleren voor publicatie
Voer vanuit de projectroot uit:

```bash
npm run dev
```

en voor een finale check:

```bash
npm run build
```

Als de build slaagt, is de content-schema validatie in orde.
