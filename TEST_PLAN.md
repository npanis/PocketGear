# PocketGear — Test Plan & Test Cases (Detox E2E)
*Mercari QA Engineer Take-Home · Author: Neri*

## 1. Overview & Scope
End-to-end UI test plan for **PocketGear** (a Pokédex React Native app), automated with **Detox** on the iOS Simulator. Scope covers the core user journeys — **search**, **sort**, **Pokémon profile**, and **list scrolling** — plus **negative/edge** scenarios.

**Out of scope:** unit-level logic (covered by the repository's existing Jest suite), visual regression, and performance/load testing.

## 2. Test Approach — Gray-Box
Detox is a **gray-box** framework: tests run with knowledge of the application's internals, synchronizing with the React Native bridge, network, timers, and animations, and locating elements via `testID`s added in source. This plan applies that capability in three ways:
- **Stable selectors** — `testID`s added to components under test, for reliable, maintainable element matching.
- **Automatic synchronization** — no fixed delays; Detox waits on the app's actual idle state, reducing flakiness.
- **Business-logic validation** — verifying the app's *computed* results (sort order, type match-ups) are correct, not merely present.

---

## 3. Test Cases

### 3.1 Search (P0)
| ID | Title | Steps | Expected | Automate |
|---|---|---|---|---|
| TC-SRCH-01 | Search by name | Type `Jigglypuff` in search | Jigglypuff card is visible; non-matches hidden | ✅ |
| TC-SRCH-02 | Search by number | Type `39` | Jigglypuff (#39) is visible | ✅ |
| TC-SRCH-03 | Search by type (Normal) | Filter/type `Normal` | List shows only Normal-type Pokémon (incl. Jigglypuff) | ✅ |
| TC-SRCH-04 | Search by type (Fairy) | Filter/type `Fairy` | List shows only Fairy-type Pokémon (incl. Jigglypuff) | ✅ |
| TC-SRCH-05 | Partial-match search | Type `Jig` | Jigglypuff appears (substring matching) | ✅ |
| TC-SRCH-06 | Case-insensitive search | Type `jigglypuff` (lowercase) | Jigglypuff appears | ✅ |
| TC-SRCH-07 | No results | Type `Mewthree` | "No Pokémon found" empty-state shown | ✅ |
| TC-SRCH-08 | Clear search | Type a query, tap clear (✕) | Field empties; full list restored | ✅ |

### 3.2 Sort (P0)
| ID | Title | Steps | Expected | Automate |
|---|---|---|---|---|
| TC-SORT-01 | Sort by # | Tap `#` | List ordered ascending by number; first item #1 | ✅ |
| TC-SORT-02 | Sort by Name | Tap `Name` | List ordered alphabetically (A→Z) | ✅ |
| TC-SORT-03 | Sort by Attack | Tap `Attack` | Highest-attack first → **Mewtwo** at top | ✅ |
| TC-SORT-04 | Sort by Defense | Tap `Defense` | Highest-defense first → **Shuckle** at top | ✅ |
| TC-SORT-05 | Sort by Max CP | Tap `Max CP` | Highest CP first → **Mewtwo** at top | ✅ |

### 3.3 Pokémon Profile (P1)
| ID | Title | Steps | Expected | Automate |
|---|---|---|---|---|
| TC-PROF-01 | Open profile | Tap a Pokémon card | Profile screen opens | ✅ |
| TC-PROF-02 | Two sections present | On profile | Both **Details** and **Matches** sections render | ✅ |
| TC-PROF-03 | Details complete | Inspect Details | Evolution icons, description, and stats (Attack, etc.) present | ✅ |
| TC-PROF-04 | Match-ups present | Inspect Matches | "Strong against" and "Weak against" both shown | ✅ |
| TC-PROF-05 | Match-up correctness | Open a known Pokémon | Strong/weak lists match real type effectiveness | ⚠️ partial |
| TC-PROF-06 | "More" expands | Tap **More** | Additional related Pokémon are listed | ✅ |
| TC-PROF-07 | Back navigation | Tap back | Returns to list; prior scroll/search state preserved | ✅ |

### 3.4 Scrolling (P1)
| ID | Title | Steps | Expected | Automate |
|---|---|---|---|---|
| TC-SCRL-01 | Scroll to end | Scroll list top → bottom | Last entry is **#251** | ✅ |
| TC-SCRL-02 | Scroll + open distant item | Scroll, then open a low-list Pokémon | Correct profile opens | ✅ |

### 3.5 Negative / Edge (P2)
| ID | Title | Steps | Expected | Automate |
|---|---|---|---|---|
| TC-NEG-01 | Empty / whitespace search | Type spaces only | Sensible state; no crash | ✅ |
| TC-NEG-02 | Special characters | Type `@#$%` | "No Pokémon found"; no crash | ✅ |
| TC-NEG-03 | Very long input | Enter 200+ characters | Handled gracefully; no crash | ✅ |
| TC-NEG-04 | Rapid input | Type/clear quickly several times | List reflects the final query consistently | ✅ |
| TC-NEG-05 | Network failure | Block network via Detox, trigger data load | Defined error/empty state; no crash | ⚠️ if applicable |

---

## 4. Automation Scope

**Priority 1 — flagship & core flows**
- **Happy path (end-to-end):** search a specific Pokémon → open profile → verify Details → verify Matches → tap **More**.
- All **P0** Search and Sort cases.
- Core **P1** Profile navigation and Scroll-to-#251.

**Priority 2 — edge coverage**
- Negative/edge input cases (TC-NEG-01 → TC-NEG-04).

**Manual / exploratory (not automated)**
- Pixel-level layout of evolution icons, animation smoothness, and subjective visual checks — low ROI for E2E automation.

---

## 5. Notes
- Sort labels: confirm exact on-screen wording (e.g. "Defense" vs "Damage") and align test titles accordingly.
- TC-NEG-05 (network failure) applies only if the app performs network requests; The APP has the data bundled within the code. This is not applicable in this repository
