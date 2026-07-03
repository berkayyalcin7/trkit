# trkit

[![CI](https://github.com/berkayyalcin7/trkit/actions/workflows/ci.yml/badge.svg)](https://github.com/berkayyalcin7/trkit/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/trkit.svg)](https://www.npmjs.com/package/trkit)
[![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/berkayyalcin7/trkit/actions/workflows/ci.yml)
[![dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](https://www.npmjs.com/package/trkit)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

> Sıfır bağımlılıklı Türkiye odaklı utility kütüphanesi — doğrulama, formatlama,
> KVKK maskeleme, Türkçe string işlemleri ve dönüşüm fonksiyonları. JavaScript'in
> çalıştığı her yerde: React, Vue, Angular, Node, Deno, Bun.

## Neden trkit?

- **Türkiye odaklı**: TCKN, VKN, IBAN, telefon, plaka, posta kodu ve fazlası
- **Sıfır runtime bağımlılık** — minimum tedarik zinciri riski
- **Tree-shakeable** — bundle'a yalnızca import ettiğin fonksiyonlar girer
- **Yalnızca saf fonksiyonlar** — yan etki yok, ağ çağrısı yok, telemetri yok
- **Deterministik** — `Intl`/ICU'ya bağımlı değil; her ortamda aynı çıktı
- **TypeScript-first**, %100 test kapsamı

## Kurulum

```bash
npm install trkit
```

## Kullanım

```ts
import { isValidTCKN, formatTRY, slugifyTR, maskTCKN } from 'trkit'

isValidTCKN('10000000146') // true
formatTRY(1250.75) // '1.250,75 ₺'
slugifyTR('Ağrı Dağı') // 'agri-dagi'
maskTCKN('10000000146') // '100******46' (KVKK dostu)

// İl verisi ayrı entry'den gelir — çekirdek bundle küçük kalır
import { getCityByPlate } from 'trkit/data'
getCityByPlate(34)?.name // 'İstanbul'
```

## API

### Doğrulama

| Fonksiyon | Açıklama |
|-----------|----------|
| `isValidTCKN(value)` | TC Kimlik No (format + checksum) |
| `isValidVKN(value)` | Vergi Kimlik No (10 hane, checksum) |
| `isValidTRIban(value)` | TR IBAN (mod-97) |
| `isValidTRPhone(value, type?)` | Telefon; `type`: `'any' \| 'mobile' \| 'landline'` |
| `normalizeTRPhone(value)` | `+90`/`90`/`0` öneklerini 10 haneye indirger |
| `isValidPlate(value)` | Araç plakası (il kodu + desen) |
| `isValidPostalCode(value)` | 5 haneli, il kodu tutarlı posta kodu |

### Formatlama ve KVKK maskeleme

| Fonksiyon | Açıklama |
|-----------|----------|
| `formatTRPhone(value, style?)` | `'0 (532) 123 45 67'` veya `'+90 532 123 45 67'` |
| `formatIBAN(value)` | 4'lü gruplar: `'TR20 0000 ...'` |
| `formatTRY(amount, options?)` | `'1.250,75 ₺'` — deterministik, `Intl` kullanmaz |
| `parseTRY(text)` | `'1.250,75 ₺'` → `1250.75` |
| `maskTCKN(value)` | `'100******46'` |
| `maskPhone(value)` | `'532*****67'` |
| `maskIBAN(value)` | `'TR20******************0001'` |
| `maskEmail(value)` | `'be***@example.com'` |

### Türkçe string işlemleri

| Fonksiyon | Açıklama |
|-----------|----------|
| `toUpperTR(value)` / `toLowerTR(value)` | Doğru `i→İ`, `ı→I`, `İ→i`, `I→ı` dönüşümü |
| `capitalizeTR(value)` / `titleCaseTR(value)` | Türkçe kurallı baş harf büyütme |
| `slugifyTR(value, separator?)` | `'Ağrı Dağı'` → `'agri-dagi'` |
| `compareTR(a, b)` / `sortTR(array, selector?)` | Türk alfabesi sıralaması |
| `asciifyTR(value)` | `'çğıöşü'` → `'cgiosu'` |

### Dönüşüm ve finans

| Fonksiyon | Açıklama |
|-----------|----------|
| `numberToWordsTR(value, options?)` | `1250.75` → `'bin iki yüz elli lira yetmiş beş kuruş'` |
| `numberToOrdinalTR(value)` | `4` → `'dördüncü'` |
| `addKDV(net, rate)` / `removeKDV(gross, rate)` / `splitKDV(gross, rate)` | KDV hesapları; oran her zaman parametredir |

### Tarih ve iş günü

| Fonksiyon | Açıklama |
|-----------|----------|
| `getHolidaysTR(year)` | Resmî + dini tatiller, tarih sıralı — 2020–2030, Diyanet takvimiyle doğrulanmış |
| `isHolidayTR(date, options?)` | Yarım günler (arife, 28 Ekim) `includeHalfDays` ile dahil edilir |
| `isWorkingDayTR(date)` | Hafta sonu ve tam gün tatiller iş günü değildir; yarım günler iş günüdür |
| `addWorkingDaysTR(date, n)` | Termin hesabı — hafta sonu ve tatilleri atlar, negatif n geriye gider |

Desteklenen yıl aralığının dışında bu fonksiyonlar tahmin etmek yerine `null` döner —
dini bayram tarihleri yalnızca resmi kaynaklardan doğrulandıktan sonra pakete eklenir.

### İl verisi — `trkit/data`

| Fonksiyon | Açıklama |
|-----------|----------|
| `getCities(region?)` | 81 il, istenirse bölgeye göre |
| `getCityByPlate(plate)` | `34` → `{ name: 'İstanbul', region: 'Marmara', ... }` |
| `getCityByName(name)` | Türkçe karakter ve harf toleranslı arama |

## Katkıda Bulunma

PR'lara açığız! Önce [CONTRIBUTING.md](./CONTRIBUTING.md) dosyasını okuyun — temel kurallar:
yalnızca sentetik test verisi (asla gerçek kişisel veri değil), saf fonksiyonlar, sıfır
runtime bağımlılık, %100 coverage. Tüm değişiklikler maintainer onayından geçen PR'larla girer.

trkit size zaman kazandırdıysa bir ⭐ diğer Türk geliştiricilerin de onu bulmasına yardım eder.

## Sorumluluk Reddi

trkit **yalnızca format/checksum doğrulaması** yapar. Hiçbir devlet servisine sorgu
göndermez, kişisel veri işlemez veya saklamaz; hukuki danışmanlık ya da KVKK/GDPR
uyum garantisi değildir. KDV oranları pakete gömülü değildir — her zaman siz verirsiniz.

## Lisans

[MIT](./LICENSE) — ücretsiz, açık kaynak, kar amacı gütmez.
