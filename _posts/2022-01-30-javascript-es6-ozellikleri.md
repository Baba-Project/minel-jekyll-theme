---
layout: post
title: JavaScript ES6 (ECMAScript 2015) Özellikleri
description: Modern JavaScript geliştirme için ES6'nın getirdiği yenilikler ve kullanım örnekleri
category: programlama
tags: [javascript, es6, web-geliştirme, frontend]
comments: false
edit_url: true
toc: true
---

# JavaScript ES6 (ECMAScript 2015) Özellikleri

ES6 veya ECMAScript 2015, JavaScript diline birçok yeni özellik ve sözdizimi getiren önemli bir güncellemedir. 2015 yılında çıkmasına rağmen, günümüzde modern JavaScript geliştirme için hala temel bir öneme sahiptir. Bu yazıda, ES6'nın getirdiği en önemli özellikleri ve bunların kullanım örneklerini inceleyeceğiz.

## 1. let ve const Anahtar Kelimeleri

ES6 öncesinde, değişken tanımlamak için sadece `var` anahtar kelimesi kullanılıyordu. ES6 ile birlikte `let` ve `const` anahtar kelimeleri eklendi.

```javascript
// var - fonksiyon kapsamlı (function scope)
var x = 10

// let - blok kapsamlı (block scope)
let y = 20

// const - blok kapsamlı ve yeniden atanamaz
const z = 30

// let örneği
if (true) {
  let blockScopedVar = 'sadece bu blok içinde erişilebilir'
  var functionScopedVar = 'her yerde erişilebilir'
}

console.log(functionScopedVar) // "her yerde erişilebilir"
console.log(blockScopedVar) // ReferenceError: blockScopedVar is not defined
```

## 2. Ok Fonksiyonları (Arrow Functions)

Ok fonksiyonları, daha kısa sözdizimi ve otomatik `this` bağlaması sunarak kod yazımını kolaylaştırır.

```javascript
// Geleneksel fonksiyon
function topla(a, b) {
  return a + b
}

// Ok fonksiyonu
const topla = (a, b) => a + b

// Tek parametre varsa, parantezler opsiyoneldir
const karesi = x => x * x

// Fonksiyon gövdesi birden fazla ifade içeriyorsa
const ciftMi = x => {
  let sonuc = x % 2 === 0
  return sonuc
}

// this bağlama örneği
const nesne = {
  deger: 42,
  gelenekselFonk: function () {
    setTimeout(function () {
      console.log(this.deger) // undefined (this, global objeye bağlı)
    }, 1000)
  },
  okFonk: function () {
    setTimeout(() => {
      console.log(this.deger) // 42 (this, nesne'ye bağlı)
    }, 1000)
  },
}
```

## 3. Template Literals

Template literals, çoklu satır dizelerini ve değişken eklemelerini çok daha kolay hale getirir.

```javascript
const isim = 'Ahmet'
const yas = 30

// Geleneksel string birleştirme
const mesaj1 = 'Merhaba, benim adım ' + isim + ' ve ' + yas + ' yaşındayım.'

// Template literal kullanımı
const mesaj2 = `Merhaba, benim adım ${isim} ve ${yas} yaşındayım.`

// Çok satırlı dizelerde template literals
const html = `
<div>
  <h1>Profil</h1>
  <p>İsim: ${isim}</p>
  <p>Yaş: ${yas}</p>
</div>
`
```

## 4. Varsayılan Parametre Değerleri (Default Parameters)

ES6 ile fonksiyonlara varsayılan parametre değerleri atamak çok daha kolay hale geldi.

```javascript
// ES5'te varsayılan değerler
function selamla(isim) {
  isim = isim || 'Misafir'
  return 'Merhaba, ' + isim
}

// ES6'da varsayılan parametreler
function selamla(isim = 'Misafir') {
  return `Merhaba, ${isim}`
}

selamla() // "Merhaba, Misafir"
selamla('Ayşe') // "Merhaba, Ayşe"
```

## 5. Yayma Operatörü (Spread Operator)

Yayma operatörü (`...`), dizileri ve nesneleri yeni dizi ve nesnelere kopyalamak veya birleştirmek için kullanılır.

```javascript
// Dizi yayma
const dizi1 = [1, 2, 3]
const dizi2 = [4, 5, 6]

const birlesik = [...dizi1, ...dizi2] // [1, 2, 3, 4, 5, 6]

// Fonksiyon argümanlarına yayma
function topla(a, b, c) {
  return a + b + c
}

const sayilar = [1, 2, 3]
topla(...sayilar) // 6

// Nesne yayma (ES2018'de eklendi, ancak ES6 konusu kapsamında sıkça kullanılır)
const nesne1 = { a: 1, b: 2 }
const nesne2 = { c: 3, d: 4 }

const birlesikNesne = { ...nesne1, ...nesne2 } // { a: 1, b: 2, c: 3, d: 4 }
```

## 6. Nesne Kısayolları (Object Shorthand)

Nesne özelliklerini ve metotlarını daha kısa yoldan tanımlamak için kullanılır.

```javascript
const isim = 'Mehmet'
const yas = 25

// ES5'te nesne oluşturma
const kisiES5 = {
  isim: isim,
  yas: yas,
  selamla: function () {
    return 'Merhaba!'
  },
}

// ES6'da nesne kısayolları
const kisiES6 = {
  isim, // isim: isim ile aynı
  yas, // yas: yas ile aynı
  selamla() {
    // Metot kısayolu
    return 'Merhaba!'
  },
}
```

## 7. Yıkıcı Atama (Destructuring)

Yıkıcı atama, dizi ve nesnelerden değerleri ayıklayıp değişkenlere atamayı kolaylaştırır.

```javascript
// Nesne yıkıcı atama
const kisi = {
  isim: 'Ali',
  yas: 35,
  meslek: 'Mühendis',
}

const { isim, yas, meslek } = kisi
console.log(isim) // "Ali"
console.log(yas) // 35

// Varsayılan değerlerle yıkıcı atama
const { isim, yas, meslek, sehir = 'İstanbul' } = kisi

// Farklı değişken isimlerine atama
const { isim: kullaniciAdi, yas: kullaniciYasi } = kisi
console.log(kullaniciAdi) // "Ali"

// Dizi yıkıcı atama
const renkler = ['kırmızı', 'yeşil', 'mavi']
const [ilk, ikinci, ucuncu] = renkler
console.log(ilk) // "kırmızı"

// Değerleri atlama
const [ilk, , ucuncu] = renkler
console.log(ucuncu) // "mavi"

// Değişkenleri takas etme
let a = 1
let b = 2
;[a, b] = [b, a]
console.log(a) // 2
console.log(b) // 1
```

## 8. Sınıflar (Classes)

ES6, nesne yönelimli programlama için sınıf sözdizimi sunmuştur. Aslında bunlar prototip tabanlı kalıtımın sözdizimsel şekeridir (syntactic sugar).

```javascript
class Kisi {
  constructor(isim, yas) {
    this.isim = isim
    this.yas = yas
  }

  selamla() {
    return `Merhaba, ben ${this.isim} ve ${this.yas} yaşındayım.`
  }

  // Statik metot
  static olustur(isim, yas) {
    return new Kisi(isim, yas)
  }
}

// Kalıtım
class Ogrenci extends Kisi {
  constructor(isim, yas, okul) {
    super(isim, yas) // Üst sınıfın constructor'ını çağırır
    this.okul = okul
  }

  bilgiVer() {
    return `${this.selamla()} ${this.okul} okulunda okuyorum.`
  }
}

const ali = new Ogrenci('Ali', 20, 'Üniversite')
console.log(ali.bilgiVer())
```

## 9. Modüller (Modules)

ES6, JavaScript kodunu modüller halinde organize etmek için standart bir yol sunar.

```javascript
// lib.js - dışa aktarma (export)
export const PI = 3.14159

export function karesiniAl(x) {
  return x * x
}

export class Matematik {
  static topla(a, b) {
    return a + b
  }
}

// Varsayılan dışa aktarma
export default function cikar(a, b) {
  return a - b
}

// main.js - içe aktarma (import)
import cikar, { PI, karesiniAl, Matematik } from './lib.js'

console.log(PI) // 3.14159
console.log(karesiniAl(5)) // 25
console.log(Matematik.topla(2, 3)) // 5
console.log(cikar(10, 5)) // 5

// Tüm içe aktarımları tek bir nesne olarak alma
import * as Lib from './lib.js'
console.log(Lib.PI) // 3.14159
console.log(Lib.karesiniAl(5)) // 25
```

## 10. Promises

Promises, asenkron işlemleri daha kolay ve okunabilir hale getiren bir yapıdır.

```javascript
// Promise oluşturma
const veriGetir = new Promise((resolve, reject) => {
  // Asenkron işlem
  setTimeout(() => {
    const veri = { id: 1, isim: 'Ürün' }
    // Başarılı durumda
    resolve(veri)

    // Hata durumunda
    // reject('Veri alınamadı');
  }, 2000)
})

// Promise kullanımı
veriGetir
  .then(data => {
    console.log('Veri alındı:', data)
    return data.id
  })
  .then(id => {
    console.log('ID:', id)
  })
  .catch(error => {
    console.error('Hata:', error)
  })
  .finally(() => {
    console.log('İşlem tamamlandı')
  })

// Promise.all - Birden fazla promise'i paralel çalıştırma
const promise1 = Promise.resolve('İlk')
const promise2 = Promise.resolve('İkinci')

Promise.all([promise1, promise2]).then(([sonuc1, sonuc2]) => {
  console.log(sonuc1, sonuc2) // "İlk İkinci"
})
```

## 11. Map ve Set Veri Tipleri

ES6, iki yeni veri yapısı sunar: Map ve Set.

```javascript
// Map - Anahtar-değer çiftlerini saklar
const kullanicilar = new Map()
kullanicilar.set('ahmet', { isim: 'Ahmet', yas: 30 })
kullanicilar.set('mehmet', { isim: 'Mehmet', yas: 25 })

console.log(kullanicilar.get('ahmet')) // { isim: 'Ahmet', yas: 30 }
console.log(kullanicilar.has('mehmet')) // true
console.log(kullanicilar.size) // 2

kullanicilar.delete('mehmet')
console.log(kullanicilar.size) // 1

// Map üzerinde döngü
kullanicilar.forEach((deger, anahtar) => {
  console.log(`${anahtar}: ${deger.isim}`)
})

// Set - Benzersiz değerler koleksiyonu
const sayilar = new Set([1, 2, 3, 3, 4, 4, 5])
console.log(sayilar) // Set(5) {1, 2, 3, 4, 5}

sayilar.add(6)
console.log(sayilar.has(3)) // true
console.log(sayilar.size) // 6

sayilar.delete(4)
console.log(sayilar.size) // 5

// Set üzerinde döngü
sayilar.forEach(deger => {
  console.log(deger)
})
```

## Sonuç

ES6 (ECMAScript 2015), JavaScript'e getirdiği bu özelliklerle dilin gücünü ve ifade yeteneğini büyük ölçüde artırmıştır. Modern JavaScript uygulamaları geliştirmek için bu özellikleri anlamak ve kullanmak büyük önem taşır.

ES6 sonrasında da (ES2016, ES2017, ...) dile birçok yeni özellik eklenmeye devam etmiştir. Ancak ES6, modern JavaScript'in temelini oluşturan bir dönüm noktasıdır.

JavaScript ekosisteminde güncel kalmak için, bu ve diğer yeni özellikleri öğrenmeye ve projelerinizde kullanmaya devam etmenizi öneririm.
