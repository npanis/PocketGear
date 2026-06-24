# PocketGear — Test Plan & Test Cases (Detox E2E)

_Mercari QA Engineer Take-Home · Author: Neri_

## 1. Overview & Scope

End-to-end UI test plan for **PocketGear** (a Pokédex React Native app), automated with **Detox** on the iOS Simulator. Scope covers the core user journeys — **search**, **sort**, **Pokémon profile**, and **list scrolling** — plus **negative/edge** scenarios.

**Out of scope:** unit-level logic (covered by the repository's existing Jest suite), visual regression, and performance/load testing.

## 2. Test Approach — Gray-Box

Detox is a **gray-box** framework: tests run with knowledge of the application's internals, synchronizing with the React Native bridge, network, timers, and animations, and locating elements via `testID`s added in source. This plan applies that capability in three ways:

- **Stable selectors** — `testID`s added to components under test, for reliable, maintainable element matching.
- **Automatic synchronization** — no fixed delays; Detox waits on the app's actual idle state, reducing flakiness.
- **Business-logic validation** — assertions are driven by the app's _computed_ data using known Pokémon as oracles (e.g. Mewtwo #150 tops Attack and Max CP, Shuckle #213 tops Defense, Abra #63 is alphabetical first), rather than arbitrary fixtures. Sort cases assert the **top-of-list** item via a regex matcher (`by.id(/^pokemon-card-\d+$/).atIndex(0)`), proving order rather than mere presence.

---

## 3. Test Cases

### 3.0 Smoke (P0) — `smoke.test.js`

| Title                  | Steps         | Expected                            | Automate |
| ---------------------- | ------------- | ----------------------------------- | -------- |
| Search bar on launch   | Launch app    | `search-input` is visible           | ✅       |
| Pokémon list on launch | Launch app    | `pokemon-list` is visible           | ✅       |

### 3.1 Search (P0) — `search.test.js`

| Title                  | Steps                          | Expected                                       | Automate |
| ---------------------- | ------------------------------ | ---------------------------------------------- | -------- |
| Search by name         | Type `jigglypuff` in search    | Jigglypuff card (#39) is visible               | ✅       |
| Partial-match search   | Type `jig`                     | Jigglypuff (#39) appears (prefix matching)     | ✅       |
| Search by number       | Type `140`                     | Kabuto (#140) is visible                       | ✅       |
| Search by type (Fairy) | Type `fairy`                   | Jigglypuff (#39, a Fairy type) is visible      | ✅       |
| No results             | Type `mewthree`, tap return    | "No Pokémon found" empty-state shown           | ✅       |
| Clear search           | Type `squirtle`, tap clear (✕) | Field empties; full list restored (#1 visible) | ✅       |

### 3.2 Sort (P0) — `sort.test.js`

| Title           | Steps         | Expected                                                | Automate |
| --------------- | ------------- | ------------------------------------------------------- | -------- |
| Sort by #       | Tap `#`       | Top of list is #1 (Bulbasaur)                           | ✅       |
| Sort by Name    | Tap `Name`    | Top of list is #63 (Abra), alphabetical A→Z             | ✅       |
| Sort by Attack  | Tap `Attack`  | Top of list is **Mewtwo (#150)**, highest attack        | ✅       |
| Sort by Defense | Tap `Defense` | Top of list is **Shuckle (#213)**, highest defense      | ✅       |
| Sort by Max CP  | Tap `Max CP`  | Top of list is **Mewtwo (#150)**, highest CP            | ✅       |

> Each case asserts the **first** card (`by.id(/^pokemon-card-\d+$/).atIndex(0)`) is the expected Pokémon, validating actual sort order rather than mere visibility.

### 3.3 Pokémon Profile (P1) — `profileCard.test.js`

Setup: tap `pokemon-card-1` (Bulbasaur) to open the profile.

| Title                 | Steps                          | Expected                                                       | Automate |
| --------------------- | ------------------------------ | -------------------------------------------------------------- | -------- |
| Details section       | On profile (Details tab)       | `pokemon-details` visible; **Height** and **Weight** shown     | ✅       |
| Matches section       | Tap **Matches** tab            | `pokemon-matches` visible; strong (#116) and weak (#58) cards  | ✅       |
| Strong "More" expands | On Matches, tap strong **More**| Strong-against list opens; #129 visible                        | ✅       |
| Weak "More" expands   | On Matches, tap weak **More**  | Weak-against list opens; #249 visible                          | ✅       |

### 3.4 Scrolling (P1) — `scroll.test.js`

| Title                      | Steps                                       | Expected                          | Automate |
| -------------------------- | ------------------------------------------- | --------------------------------- | -------- |
| Scroll to end              | Scroll list down until #251                 | Last entry **#251** (Celebi) visible | ✅    |
| Scroll + open distant item | Scroll down to #200, tap it                 | Profile (`pokemon-details`) opens | ✅       |

### 3.5 Negative / Edge (P2) — `search-negative.test.js`

| Title                       | Steps                       | Expected                       | Automate         |
| --------------------------- | --------------------------- | ------------------------------ | ---------------- |
| Special characters          | Type `@#$%`, tap return     | "No Pokémon found"; no crash   | ✅               |
| Non-existent number         | Type `9999`, tap return     | "No Pokémon found"; no crash   | ✅               |
| Non-existent string         | Type `zzzzzzz`, tap return  | "No Pokémon found"; no crash   | ✅               |
| Network failure             | Block network, load data    | N/A — data is bundled (see 5 - Notes) | ⚠️ N/A           |

---

## 4. Automation Scope

**Priority 0 — smoke & core flows**

- Smoke checks that the search bar and list render on launch (`smoke.test.js`).
- All **P0** Search cases (`search.test.js`) and Sort cases (`sort.test.js`).

**Priority 1 — profile & navigation**

- Profile flow: open card → Details (Height/Weight) → Matches tab → strong/weak **More** expansion (`profileCard.test.js`).
- Scroll to the end of the list (#251) and open a distant item after scrolling (`scroll.test.js`).

**Priority 2 — edge coverage**

- Negative search inputs: special characters, non-existent number, non-existent string (`search-negative.test.js`).

**Manual / exploratory (not automated)**

- Pixel-level layout of evolution icons, animation smoothness, and subjective visual checks — low ROI for E2E automation.

---

## 5. Notes

- Sort labels are confirmed against source (`PokemonChooser.tsx`): `#`, `Name`, `Attack`, `Defense`, `Max CP`; test `testID`s (`sort-#`, `sort-Name`, …) match these exactly.
- Network failure applies only if the app performs network requests; PocketGear bundles its data in code, so this is not applicable in this repository.
