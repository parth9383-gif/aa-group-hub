# AA-WEBSITE-PROCESS.md — The AA Standard (kaise best bana, aur aage ka rule)

> **LOCKED RULE-1: Future work must EXCEED this level.**
> Jo AA Group website bani hai wo **baseline** hai — ceiling nahi. Har naya project (Investment, Commodities, Ontario Cardio Imaging, aur aage ka har kaam) is se **better** hona chahiye: design, precision, testing, honesty, verification — kisi bhi cheez mein downgrade allowed nahi.

---

## 1. Result (what "excellent" means here)

AA Group of Companies — premium dark + gold multi-page website:
- **7 pages** (Home, About, Divisions, Team, Contact, Gallery, Book) + shared design system
- **155 real photos** (2020–2024 archive) + **9 team portraits** (real, mapped)
- **4 division external links** (all verified live)
- **0 JS errors, 0 broken references, 0 mobile overflow**
- **Fable vision 8/10** desktop + mobile · deployed + md5-verified live

---

## 2. The 6-step process (LOCKED — har project yehi follow karega)

1. **DISCOVERY** — purana measure karo (screenshots, DOM scan, numbers), real assets inventory banao. *Kuch bhi assume mat karo.*
2. **CONCEPT OPTIONS** — ChatGPT se design options generate karo → client choose kare. *Ek hi design thopna nahi.*
3. **DESIGN + VOICE** — Fable se design/copy/QA. *Har iteration pe Fable vision se check.*
4. **BUILD** — shared design system, precise build, har reference resolve karo.
5. **TEST** — Chrome headless + CDP proper mobile emulation + Fable vision. *Screenshot se nahi, real 390px se.*
6. **DEPLOY + VERIFY** — md5 match loop se live verify. *"Ho gaya" bolna nahi, proof dikhao.*

---

## 3. Non-negotiables (Honesty Gate — kabhi break mat karo)

- **Real photos only** — koi AI-generated, koi stock nahi. Client ka archive + press.
- **Measured claims** — har number measured + footnote. Guess nahi.
- **Nothing deleted** — append-only + `_backup/`. Purana hamesha accessible.
- **Every reference verified** — koi broken image/link deploy nahi hota.
- **Verification-first** — "main sochta hoon sahi hai" nahi; Chrome + Fable ka proof chahiye.
- **Hinglish comms + standard footer** — har reply ka format.

---

## 4. Model routing (LOCKED — recap)

| Kaam | Model |
|---|---|
| Strategy, pricing, protection, valuation | **Opus** |
| Design + voice + visual QA | **Fable** |
| Guidelines / structure | **Sonnet** |
| Volume copy | **Haiku** |
| Concept images | **ChatGPT** (OPENAI_API_KEY) |
| Organize / wire / verify / build | **DeepSeek (main)** |

---

## 5. Acceptance checklist (har project ke end mein — sab pass hona chahiye)

- [ ] Har page render + 0 JS errors + 0 broken refs (Chrome)
- [ ] Mobile 390px (CDP) — 0 overflow, koi text cut nahi
- [ ] Fable vision ≥ 8/10 desktop + mobile
- [ ] Deploy + md5 live verify (HTTP 200)
- [ ] Honesty gate pass (real photos, measured numbers, nothing deleted)
- [ ] DELIVERABLES-INDEX.md update

**Koi ek bhi unchecked → "done" mat bolo.**
