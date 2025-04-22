---
layout: post
title: Python ile Veri Analizi ve Görselleştirme
description: Python kullanarak veri analizi yapmanın temel adımları ve popüler kütüphanelerin kullanımı
category: programlama
tags: [python, veri-analizi, pandas, matplotlib]
comments: false
edit_url: true
toc: true
---

# Python ile Veri Analizi ve Görselleştirme

Python, veri bilimi ve analizi için en popüler programlama dillerinden biri haline geldi. Zengin kütüphane ekosistemi sayesinde, karmaşık veri analiz işlemlerini birkaç satır kod ile gerçekleştirebilirsiniz.

## Gerekli Kütüphaneler

Veri analizi için kullanacağımız temel kütüphaneler:

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
```

## Veri Yükleme

Pandas kütüphanesi, farklı formatlardaki verileri kolayca yüklemenize olanak tanır:

```python
# CSV dosyası okuma
df = pd.read_csv("veri.csv")

# Excel dosyası okuma
df_excel = pd.read_excel("veri.xlsx")

# JSON dosyası okuma
df_json = pd.read_json("veri.json")
```

## Veri Keşfi

Verinizi anlamak için ilk adım, onu keşfetmektir:

```python
# İlk 5 satırı görüntüleme
print(df.head())

# Veri seti hakkında genel bilgi
print(df.info())

# İstatistiksel özet
print(df.describe())

# Eksik değerlerin kontrolü
print(df.isnull().sum())
```

## Veri Temizleme

Gerçek dünya verilerinde genellikle eksik değerler veya aykırı değerler bulunur. Bu sorunları çözmek için:

```python
# Eksik değerleri doldurma
df.fillna(0, inplace=True)  # Eksik değerleri 0 ile doldurma

# veya eksik değerlere sahip satırları silme
df.dropna(inplace=True)

# Gereksiz sütunları silme
df.drop(columns=['gereksiz_sütun'], inplace=True)
```

## Veri Görselleştirme

Verilerinizi görselleştirmek, eğilimleri ve ilişkileri anlamanıza yardımcı olur:

### Matplotlib ile Basit Grafikler

```python
# Çizgi grafik
plt.figure(figsize=(10, 6))
plt.plot(df['tarih'], df['değer'])
plt.title('Zaman İçinde Değer Değişimi')
plt.xlabel('Tarih')
plt.ylabel('Değer')
plt.grid(True)
plt.show()

# Çubuk grafik
plt.figure(figsize=(10, 6))
plt.bar(df['kategori'], df['miktar'])
plt.title('Kategorilere Göre Miktarlar')
plt.xlabel('Kategori')
plt.ylabel('Miktar')
plt.show()
```

### Seaborn ile Gelişmiş Görselleştirmeler

```python
# Isı haritası (korelasyon matrisi)
plt.figure(figsize=(10, 8))
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
plt.title('Korelasyon Matrisi')
plt.show()

# Dağılım grafiği
sns.pairplot(df[['x', 'y', 'z', 'kategori']], hue='kategori')
plt.show()
```

## İleri Seviye Veri Analizi

Daha karmaşık analizler yapmak için:

```python
# Gruplama ve özetleme
sonuc = df.groupby('kategori')['değer'].agg(['count', 'mean', 'sum', 'std'])
print(sonuc)

# Pivot tablolar
pivot_tablo = pd.pivot_table(df, values='değer', index='kategori',
                             columns='alt_kategori', aggfunc='mean')
print(pivot_tablo)
```

## Sonuç

Python ve veri analizi kütüphaneleri, veri işleme süreçlerini önemli ölçüde kolaylaştırır. Bu yazıda, temel veri analizi ve görselleştirme adımlarını gördük. Daha ileri seviye analizler için, makine öğrenimi kütüphanelerini (scikit-learn, TensorFlow, PyTorch) de inceleyebilirsiniz.

Veri analizi yolculuğunuzda başarılar dilerim!
