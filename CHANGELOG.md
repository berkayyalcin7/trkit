# trkit

## 0.2.0

### Minor Changes

- e245e9b: New date module: `getHolidaysTR`, `isHolidayTR`, `isWorkingDayTR` and `addWorkingDaysTR`. Official and religious Turkish holidays for 2020–2030, with religious dates verified against the Diyanet calendar (vakithesaplama.diyanet.gov.tr). Functions return `null` outside the supported range instead of guessing.

## 0.1.1

### Patch Changes

- bf03399: Package homepage now points to the live playground: https://berkayyalcin.dev/araclar/trkit

## 0.1.0

### Minor Changes

- 55ce802: Initial public release: TCKN/VKN/IBAN/phone/plate/postal-code validation, phone/IBAN/TRY formatting, KVKK masking helpers, Turkish-locale string utilities (casing, slugify, collation, asciify), number-to-words, KDV math and province data (`trkit/data`).
