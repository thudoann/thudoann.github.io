# thudoann.github.io

Personal website — available in English and French.

**Live:** https://thudoann.github.io · https://thudoann.github.io/fr/

---

## Features

### Travel planner
- **Budget calculator** — enter number of people, flight cost per person, accommodation total (auto-divided), and any number of named shared costs; shows a live per-person breakdown with proportion bars and group total
- **Trip planner** — create and save multiple trips with itinerary (flights, transport, accommodation, food, activities), date constraints, cost tracking, and downloadable summary

### Digital camera guide
- Browse and filter a database of cameras by type (mirrorless, DSLR, film SLR, compact, medium format)
- Sort by year, price, or megapixels; view full specs in a detail panel

### Rabbit Holes
- Browsable knowledge notes on geography, politics, art, stock options, history, science, philosophy, and psychology

### Other
- Quiz civic / civics quiz
- Projects, papers, CV, contact

---

## Stack

Static HTML/CSS/JS — no framework, no build step, no server. Everything runs in the browser; trip data is stored in `localStorage`.

---

## Structure

```
/                   English version
/fr/                French version (UI translated, content in English)
cameras-data.js     Camera database
camera-guide.js     Camera guide logic
knowledge-data.js   Rabbit Holes entries
knowledge-guide.js  Rabbit Holes logic
travel-planner.js   Travel planner + budget calculator logic
script.js           Core app (tabs, theme, routing)
styles.css          All styles
```
