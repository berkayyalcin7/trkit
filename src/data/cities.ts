import { asciifyTR } from '../string/asciify'
import { toLowerTR } from '../string/case'

export type TRRegion =
  | 'Marmara'
  | 'Ege'
  | 'Akdeniz'
  | 'İç Anadolu'
  | 'Karadeniz'
  | 'Doğu Anadolu'
  | 'Güneydoğu Anadolu'

export interface TRCity {
  plate: number
  name: string
  region: TRRegion
}

// Plaka sırasına göre 81 il
const CITIES: readonly TRCity[] = [
  { plate: 1, name: 'Adana', region: 'Akdeniz' },
  { plate: 2, name: 'Adıyaman', region: 'Güneydoğu Anadolu' },
  { plate: 3, name: 'Afyonkarahisar', region: 'Ege' },
  { plate: 4, name: 'Ağrı', region: 'Doğu Anadolu' },
  { plate: 5, name: 'Amasya', region: 'Karadeniz' },
  { plate: 6, name: 'Ankara', region: 'İç Anadolu' },
  { plate: 7, name: 'Antalya', region: 'Akdeniz' },
  { plate: 8, name: 'Artvin', region: 'Karadeniz' },
  { plate: 9, name: 'Aydın', region: 'Ege' },
  { plate: 10, name: 'Balıkesir', region: 'Marmara' },
  { plate: 11, name: 'Bilecik', region: 'Marmara' },
  { plate: 12, name: 'Bingöl', region: 'Doğu Anadolu' },
  { plate: 13, name: 'Bitlis', region: 'Doğu Anadolu' },
  { plate: 14, name: 'Bolu', region: 'Karadeniz' },
  { plate: 15, name: 'Burdur', region: 'Akdeniz' },
  { plate: 16, name: 'Bursa', region: 'Marmara' },
  { plate: 17, name: 'Çanakkale', region: 'Marmara' },
  { plate: 18, name: 'Çankırı', region: 'İç Anadolu' },
  { plate: 19, name: 'Çorum', region: 'Karadeniz' },
  { plate: 20, name: 'Denizli', region: 'Ege' },
  { plate: 21, name: 'Diyarbakır', region: 'Güneydoğu Anadolu' },
  { plate: 22, name: 'Edirne', region: 'Marmara' },
  { plate: 23, name: 'Elazığ', region: 'Doğu Anadolu' },
  { plate: 24, name: 'Erzincan', region: 'Doğu Anadolu' },
  { plate: 25, name: 'Erzurum', region: 'Doğu Anadolu' },
  { plate: 26, name: 'Eskişehir', region: 'İç Anadolu' },
  { plate: 27, name: 'Gaziantep', region: 'Güneydoğu Anadolu' },
  { plate: 28, name: 'Giresun', region: 'Karadeniz' },
  { plate: 29, name: 'Gümüşhane', region: 'Karadeniz' },
  { plate: 30, name: 'Hakkari', region: 'Doğu Anadolu' },
  { plate: 31, name: 'Hatay', region: 'Akdeniz' },
  { plate: 32, name: 'Isparta', region: 'Akdeniz' },
  { plate: 33, name: 'Mersin', region: 'Akdeniz' },
  { plate: 34, name: 'İstanbul', region: 'Marmara' },
  { plate: 35, name: 'İzmir', region: 'Ege' },
  { plate: 36, name: 'Kars', region: 'Doğu Anadolu' },
  { plate: 37, name: 'Kastamonu', region: 'Karadeniz' },
  { plate: 38, name: 'Kayseri', region: 'İç Anadolu' },
  { plate: 39, name: 'Kırklareli', region: 'Marmara' },
  { plate: 40, name: 'Kırşehir', region: 'İç Anadolu' },
  { plate: 41, name: 'Kocaeli', region: 'Marmara' },
  { plate: 42, name: 'Konya', region: 'İç Anadolu' },
  { plate: 43, name: 'Kütahya', region: 'Ege' },
  { plate: 44, name: 'Malatya', region: 'Doğu Anadolu' },
  { plate: 45, name: 'Manisa', region: 'Ege' },
  { plate: 46, name: 'Kahramanmaraş', region: 'Akdeniz' },
  { plate: 47, name: 'Mardin', region: 'Güneydoğu Anadolu' },
  { plate: 48, name: 'Muğla', region: 'Ege' },
  { plate: 49, name: 'Muş', region: 'Doğu Anadolu' },
  { plate: 50, name: 'Nevşehir', region: 'İç Anadolu' },
  { plate: 51, name: 'Niğde', region: 'İç Anadolu' },
  { plate: 52, name: 'Ordu', region: 'Karadeniz' },
  { plate: 53, name: 'Rize', region: 'Karadeniz' },
  { plate: 54, name: 'Sakarya', region: 'Marmara' },
  { plate: 55, name: 'Samsun', region: 'Karadeniz' },
  { plate: 56, name: 'Siirt', region: 'Güneydoğu Anadolu' },
  { plate: 57, name: 'Sinop', region: 'Karadeniz' },
  { plate: 58, name: 'Sivas', region: 'İç Anadolu' },
  { plate: 59, name: 'Tekirdağ', region: 'Marmara' },
  { plate: 60, name: 'Tokat', region: 'Karadeniz' },
  { plate: 61, name: 'Trabzon', region: 'Karadeniz' },
  { plate: 62, name: 'Tunceli', region: 'Doğu Anadolu' },
  { plate: 63, name: 'Şanlıurfa', region: 'Güneydoğu Anadolu' },
  { plate: 64, name: 'Uşak', region: 'Ege' },
  { plate: 65, name: 'Van', region: 'Doğu Anadolu' },
  { plate: 66, name: 'Yozgat', region: 'İç Anadolu' },
  { plate: 67, name: 'Zonguldak', region: 'Karadeniz' },
  { plate: 68, name: 'Aksaray', region: 'İç Anadolu' },
  { plate: 69, name: 'Bayburt', region: 'Karadeniz' },
  { plate: 70, name: 'Karaman', region: 'İç Anadolu' },
  { plate: 71, name: 'Kırıkkale', region: 'İç Anadolu' },
  { plate: 72, name: 'Batman', region: 'Güneydoğu Anadolu' },
  { plate: 73, name: 'Şırnak', region: 'Güneydoğu Anadolu' },
  { plate: 74, name: 'Bartın', region: 'Karadeniz' },
  { plate: 75, name: 'Ardahan', region: 'Doğu Anadolu' },
  { plate: 76, name: 'Iğdır', region: 'Doğu Anadolu' },
  { plate: 77, name: 'Yalova', region: 'Marmara' },
  { plate: 78, name: 'Karabük', region: 'Karadeniz' },
  { plate: 79, name: 'Kilis', region: 'Güneydoğu Anadolu' },
  { plate: 80, name: 'Osmaniye', region: 'Akdeniz' },
  { plate: 81, name: 'Düzce', region: 'Karadeniz' },
]

/**
 * Returns all 81 provinces (optionally filtered by region) as a new array.
 * 81 ili yeni bir dizi olarak döner; bölgeye göre filtrelenebilir.
 *
 * @example
 * getCities('Ege').length // 8
 */
export function getCities(region?: TRRegion): TRCity[] {
  return region === undefined ? [...CITIES] : CITIES.filter((city) => city.region === region)
}

/**
 * Looks up a province by its plate code (1-81); null if out of range.
 * Plaka koduna göre il döner; aralık dışında null.
 *
 * @example
 * getCityByPlate(34)?.name // 'İstanbul'
 */
export function getCityByPlate(plate: number): TRCity | null {
  if (!Number.isInteger(plate) || plate < 1 || plate > 81) return null
  return CITIES[plate - 1] as TRCity // dizi plaka sıralıdır (testle garanti edilir)
}

/**
 * Looks up a province by name, tolerant of Turkish characters and casing.
 * İl adına göre arar; büyük/küçük harf ve Türkçe karakter toleranslıdır
 * ('ISTANBUL', 'istanbul', 'İstanbul' aynı sonucu verir).
 *
 * @example
 * getCityByName('sanliurfa')?.plate // 63
 */
export function getCityByName(name: string): TRCity | null {
  if (typeof name !== 'string' || name === '') return null
  const key = asciifyTR(toLowerTR(name))
  return CITIES.find((city) => asciifyTR(toLowerTR(city.name)) === key) ?? null
}
