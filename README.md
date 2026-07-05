# trkit

[![CI](https://github.com/berkayyalcin7/trkit/actions/workflows/ci.yml/badge.svg)](https://github.com/berkayyalcin7/trkit/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/trkit.svg)](https://www.npmjs.com/package/trkit)
[![npm downloads](https://img.shields.io/npm/dm/trkit.svg)](https://www.npmjs.com/package/trkit)
[![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/berkayyalcin7/trkit/actions/workflows/ci.yml)
[![dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](https://www.npmjs.com/package/trkit)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

> Zero-dependency Turkish utility kit — validation, formatting, KVKK masking,
> Turkish-locale strings and conversion helpers that work everywhere JavaScript
> runs: React, Vue, Angular, Node, Deno, Bun.

🇹🇷 [Türkçe dokümantasyon](./README.tr.md)

## Why trkit?

- **Turkey-focused**: TCKN, VKN, IBAN, phone, plate, postal code and more
- **Zero runtime dependencies** — minimal supply-chain surface
- **Tree-shakeable** — only the functions you import end up in your bundle
- **Pure functions only** — no side effects, no network calls, no telemetry
- **Deterministic** — no reliance on `Intl`/ICU, identical output in every environment
- **TypeScript-first** with 100% test coverage

## Install

```bash
npm install trkit
```

## Usage

```ts
import { isValidTCKN, formatTRY, slugifyTR, maskTCKN } from 'trkit'

isValidTCKN('10000000146') // true
formatTRY(1250.75) // '1.250,75 ₺'
slugifyTR('Ağrı Dağı') // 'agri-dagi'
maskTCKN('10000000146') // '100******46' (KVKK-friendly)

// Province data ships as a separate entry — keeps the core bundle tiny
import { getCityByPlate } from 'trkit/data'
getCityByPlate(34)?.name // 'İstanbul'
```

## API

### Validation

| Function | Description |
|----------|-------------|
| `isValidTCKN(value)` | Turkish national ID number (format + checksum) |
| `isValidVKN(value)` | Turkish tax number (10-digit checksum) |
| `isValidTRIban(value)` | Turkish IBAN (mod-97) |
| `isValidTRPhone(value, type?)` | Phone number; `type`: `'any' \| 'mobile' \| 'landline'` |
| `normalizeTRPhone(value)` | Normalizes `+90`/`90`/`0` prefixes to bare 10 digits |
| `isValidPlate(value)` | Vehicle license plate (province code + pattern) |
| `isValidPostalCode(value)` | 5-digit postal code with valid province prefix |

### Formatting & KVKK masking

| Function | Description |
|----------|-------------|
| `formatTRPhone(value, style?)` | `'0 (532) 123 45 67'` or `'+90 532 123 45 67'` |
| `formatIBAN(value)` | Groups of 4: `'TR20 0000 ...'` |
| `formatTRY(amount, options?)` | `'1.250,75 ₺'` — deterministic, no `Intl` |
| `parseTRY(text)` | `'1.250,75 ₺'` → `1250.75` |
| `maskTCKN(value)` | `'100******46'` |
| `maskPhone(value)` | `'532*****67'` |
| `maskIBAN(value)` | `'TR20******************0001'` |
| `maskEmail(value)` | `'be***@example.com'` |

### Turkish-locale strings

| Function | Description |
|----------|-------------|
| `toUpperTR(value)` / `toLowerTR(value)` | Correct `i→İ`, `ı→I`, `İ→i`, `I→ı` casing |
| `capitalizeTR(value)` / `titleCaseTR(value)` | Turkish-aware capitalization |
| `slugifyTR(value, separator?)` | `'Ağrı Dağı'` → `'agri-dagi'` |
| `compareTR(a, b)` / `sortTR(array, selector?)` | Turkish alphabet collation |
| `asciifyTR(value)` | `'çğıöşü'` → `'cgiosu'` |

### Conversion & finance

| Function | Description |
|----------|-------------|
| `numberToWordsTR(value, options?)` | `1250.75` → `'bin iki yüz elli lira yetmiş beş kuruş'` |
| `numberToOrdinalTR(value)` | `4` → `'dördüncü'` |
| `addKDV(net, rate)` / `removeKDV(gross, rate)` / `splitKDV(gross, rate)` | VAT math; rate is always a parameter |

### Dates & working days

| Function | Description |
|----------|-------------|
| `getHolidaysTR(year)` | Official + religious holidays, sorted — 2020–2030, verified against the Diyanet calendar |
| `isHolidayTR(date, options?)` | Half days (arife, Oct 28) are opt-in via `includeHalfDays` |
| `isWorkingDayTR(date)` | Weekends and full-day holidays are non-working; half days count as working |
| `addWorkingDaysTR(date, n)` | Deadline math — skips weekends and holidays, negative n goes backwards |

Outside the supported year range these functions return `null` instead of guessing —
religious holiday dates are only shipped after verification against official sources.

### Province data — `trkit/data`

| Function | Description |
|----------|-------------|
| `getCities(region?)` | All 81 provinces, optionally by region |
| `getCityByPlate(plate)` | `34` → `{ name: 'İstanbul', region: 'Marmara', ... }` |
| `getCityByName(name)` | Turkish-character and case tolerant lookup |

## Contributing

PRs are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) first — the key rules:
synthetic test data only (never real personal data), pure functions, zero runtime
dependencies, 100% coverage. All changes land through pull requests reviewed by the maintainer.

If trkit saves you time, a ⭐ helps other Turkish developers find it.

## Disclaimer

trkit performs **format/checksum validation only**. It does not query any government
service, does not process or store personal data, and is not legal advice or a
KVKK/GDPR compliance guarantee. VAT rates are never hardcoded — always passed by you.

## License

[MIT](./LICENSE) — free, open source, non-profit.
