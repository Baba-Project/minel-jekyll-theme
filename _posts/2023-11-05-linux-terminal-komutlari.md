---
layout: post
title: Linux Terminal Komutları - Kapsamlı Rehber
description: Linux kullanıcıları için günlük işleri kolaylaştıracak temel ve ileri seviye terminal komutları
category: linux
tags: [linux, terminal, komut-satırı, bash]
comments: false
edit_url: true
toc: true
---

# Linux Terminal Komutları - Kapsamlı Rehber

Linux terminal, güçlü ve esnek bir komut satırı arayüzüdür. Doğru komutları bilmek, Linux sistemlerinde çalışmayı çok daha verimli hale getirir. Bu rehberde, hem yeni başlayanlar hem de deneyimli kullanıcılar için faydalı olacak terminal komutlarını kategoriler halinde inceleyeceğiz.

## Temel Dosya ve Dizin Komutları

### Navigasyon Komutları

```bash
# Mevcut çalışma dizinini gösterme
pwd

# Dizin değiştirme
cd /hedef/dizin
cd ~  # Ev dizinine git
cd .. # Üst dizine git
cd -  # Önceki dizine git

# Dizin içeriğini listeleme
ls         # Temel listeleme
ls -l      # Detaylı listeleme
ls -a      # Gizli dosyaları da göster
ls -lh     # İnsan tarafından okunabilir boyut formatı
ls -R      # Alt dizinleri özyinelemeli listele
```

### Dosya ve Dizin İşlemleri

```bash
# Dizin oluşturma
mkdir yeni_dizin
mkdir -p ana_dizin/alt_dizin/alt_alt_dizin  # Gerekli üst dizinleri de oluştur

# Dosya oluşturma
touch yeni_dosya.txt

# Dosya kopyalama
cp kaynak.txt hedef.txt
cp -r kaynak_dizin hedef_dizin  # Dizinleri özyinelemeli kopyala

# Dosya/dizin taşıma veya yeniden adlandırma
mv eski_ad.txt yeni_ad.txt
mv dosya.txt /hedef/dizin/

# Dosya/dizin silme
rm dosya.txt
rm -r dizin     # Dizini özyinelemeli sil
rm -rf dizin    # Zorla ve özyinelemeli sil (dikkatli kullanın!)

# Dosya içeriğini görüntüleme
cat dosya.txt           # Tüm içeriği göster
head dosya.txt          # İlk 10 satırı göster
head -n 20 dosya.txt    # İlk 20 satırı göster
tail dosya.txt          # Son 10 satırı göster
tail -n 20 dosya.txt    # Son 20 satırı göster
tail -f log_dosyasi.log # Dosyayı canlı takip et

# Dosya içeriğini ekrana sığdırma
less dosya.txt          # Sayfa sayfa görüntülemek için
more dosya.txt          # Temel sayfalayıcı
```

## Metin İşleme Komutları

```bash
# Dosya içinde arama yapma
grep "aranacak_metin" dosya.txt
grep -i "aranacak_metin" dosya.txt  # Büyük/küçük harf duyarsız
grep -r "aranacak_metin" dizin      # Özyinelemeli arama
grep -v "dışlanacak_metin" dosya.txt # Eşleşmeyen satırları göster

# Metin düzenleyicileri
nano dosya.txt    # Başlangıç seviyesi düzenleyici
vim dosya.txt     # Gelişmiş düzenleyici
emacs dosya.txt   # Gelişmiş düzenleyici

# Metin manipülasyonu
sed 's/eski/yeni/g' dosya.txt              # Metni değiştir
sed -i 's/eski/yeni/g' dosya.txt           # Dosyayı yerinde değiştir
awk '{print $1, $3}' dosya.txt             # Belirli sütunları yazdır
sort dosya.txt                             # Satırları sırala
sort -r dosya.txt                          # Ters sırala
uniq dosya.txt                             # Tekrarlayan satırları kaldır
cut -d"," -f1,3 dosya.csv                  # CSV'den belirli sütunları çıkar
tr 'a-z' 'A-Z' < dosya.txt                 # Küçük harfleri büyük harflere çevir
```

## Sistem Bilgisi ve İzleme

```bash
# Sistem bilgisi
uname -a           # Kernel ve sistem bilgisi
lsb_release -a     # Dağıtım bilgisi
hostnamectl        # Sistem ve makine bilgisi
cat /etc/os-release # İşletim sistemi bilgisi

# Donanım bilgisi
lscpu              # CPU bilgisi
free -h            # RAM kullanımı
df -h              # Disk kullanımı
lsblk              # Blok cihazlarını listele
lsusb              # USB cihazlarını listele
lspci              # PCI cihazlarını listele

# Sistem izleme
top                # Sistem süreçlerini izle
htop               # Gelişmiş sistem izleyici
ps aux             # Çalışan süreçleri listele
ps aux | grep program_adi # Belirli bir programın süreçlerini ara
kill PID           # Süreç sonlandır
killall program_adi # İsme göre tüm süreçleri sonlandır
```

## Ağ Komutları

```bash
# Ağ bilgisi
ifconfig           # Ağ arayüzleri (eski)
ip addr show       # Ağ arayüzleri (yeni)
iwconfig           # Kablosuz arayüzler
netstat -tuln      # Açık portları göster
ss -tuln           # Açık portları göster (yeni)
hostname -I        # IP adresini göster

# Ağ bağlantı testleri
ping host_veya_ip  # ICMP paketi gönder
traceroute host    # Route/yönlendirme takibi
mtr host           # Gelişmiş traceroute
nslookup domain    # DNS sorgulama
dig domain         # Detaylı DNS sorgulama
host domain        # Basit DNS sorgulama
whois domain       # WHOIS sorgusu

# Dosya indirme
wget url           # Dosya indir
curl url           # İçeriği görüntüle/indir
curl -O url        # Orijinal dosya adıyla indir
```

## Paket Yönetimi

### Debian / Ubuntu (apt)

```bash
apt update               # Paket listelerini güncelle
apt upgrade              # Yüklü paketleri güncelle
apt install paket_adi    # Paket yükle
apt remove paket_adi     # Paket kaldır
apt purge paket_adi      # Paketi konfigürasyonlarıyla kaldır
apt search arama_terimi  # Paket ara
apt show paket_adi       # Paket bilgisini göster
apt autoremove           # Gerekli olmayan paketleri kaldır
```

### Red Hat / Fedora (dnf/yum)

```bash
dnf update               # Paketleri güncelle
dnf install paket_adi    # Paket yükle
dnf remove paket_adi     # Paket kaldır
dnf search arama_terimi  # Paket ara
dnf info paket_adi       # Paket bilgisini göster
```

### Arch Linux (pacman)

```bash
pacman -Syu              # Sistemi güncelle
pacman -S paket_adi      # Paket yükle
pacman -R paket_adi      # Paket kaldır
pacman -Rs paket_adi     # Paketi bağımlılıklarıyla kaldır
pacman -Ss arama_terimi  # Paket ara
pacman -Qi paket_adi     # Yüklü paket hakkında bilgi
```

## Kullanıcı ve İzin Yönetimi

```bash
# Kullanıcı işlemleri
whoami              # Mevcut kullanıcıyı göster
id                  # Kullanıcı kimlik bilgisini göster
su kullanici_adi    # Kullanıcı değiştir
sudo komut          # Komutu yönetici olarak çalıştır
passwd              # Mevcut kullanıcı şifresini değiştir

# Kullanıcı yönetimi
useradd kullanici   # Kullanıcı oluştur
usermod -a -G grup kullanici # Kullanıcıyı gruba ekle
userdel kullanici   # Kullanıcıyı sil

# İzin yönetimi
chmod 755 dosya     # Sayısal izinlerle değiştir (rwxr-xr-x)
chmod u+x dosya     # Kullanıcıya çalıştırma izni ekle
chmod g-w dosya     # Gruptan yazma iznini kaldır
chmod a+r dosya     # Herkese okuma izni ekle
chown kullanici:grup dosya  # Sahiplik değiştir
```

## Sıkıştırma ve Arşivleme

```bash
# tar kullanımı
tar -cvf arsiv.tar dizin      # TAR arşivi oluştur
tar -xvf arsiv.tar            # TAR arşivini çıkar
tar -czvf arsiv.tar.gz dizin  # Sıkıştırılmış TAR oluştur (gzip)
tar -xzvf arsiv.tar.gz        # Sıkıştırılmış TAR çıkar (gzip)
tar -cjvf arsiv.tar.bz2 dizin # Sıkıştırılmış TAR (bzip2)
tar -xjvf arsiv.tar.bz2       # Sıkıştırılmış TAR çıkar (bzip2)

# Diğer sıkıştırma formatları
zip -r arsiv.zip dizin        # ZIP arşivi oluştur
unzip arsiv.zip               # ZIP arşivini çıkar
gzip dosya                    # Dosyayı sıkıştır (.gz)
gunzip dosya.gz               # Sıkıştırmayı aç
bzip2 dosya                   # Dosyayı sıkıştır (.bz2)
bunzip2 dosya.bz2             # Sıkıştırmayı aç
```

## Süreç Planlama ve Zamanlanmış Görevler

```bash
# cron işleri (zamanlanmış görevler)
crontab -l              # Mevcut cron işlerini göster
crontab -e              # Cron işlerini düzenle

# Örnek crontab girişi (her gün 02:30'da çalıştır)
# 30 2 * * * /yol/betik.sh

# at komutu (tek seferlik zamanlanmış görev)
at 10:00 AM             # Belirtilen zamanda komut çalıştır
atq                     # Zamanlanmış at işlerini listele
atrm iş_numarası        # Zamanlanmış işi kaldır
```

## SSH ve Uzak Erişim

```bash
# SSH bağlantısı
ssh kullanici@sunucu      # Uzak sunucuya bağlan
ssh -p 2222 kullanici@sunucu  # Farklı port kullan
ssh-keygen                # SSH anahtarı oluştur
ssh-copy-id kullanici@sunucu # SSH anahtarını uzak sunucuya kopyala

# SCP ile dosya transferi
scp dosya.txt kullanici@sunucu:/hedef/dizin/  # Dosya gönder
scp kullanici@sunucu:/uzak/dosya.txt yerel_dizin/  # Dosya al
scp -r dizin kullanici@sunucu:/hedef/  # Dizin kopyala
```

## Gelişmiş Komutlar ve İpuçları

```bash
# Komut çıktısını işleme
command | grep filtre     # Çıktıyı filtrele
command > dosya.txt       # Çıktıyı dosyaya yönlendir (üzerine yaz)
command >> dosya.txt      # Çıktıyı dosyaya ekle
command 2> hata.log       # Hata çıktısını yönlendir
command > dosya.txt 2>&1  # Tüm çıktıyı dosyaya yönlendir

# Takma adlar (aliases)
alias ll='ls -la'         # Takma ad tanımla
unalias ll                # Takma adı kaldır

# Kullanışlı tek seferlik komutlar
find /dizin -name "*.txt" # Dosya ara
find /dizin -type f -size +100M # 100MB'dan büyük dosyaları bul
find /dizin -mtime -7 -type f # Son 7 günde değişen dosyaları bul
du -sh *                  # Dizin boyutlarını göster
history                   # Komut geçmişini göster
history | grep komut      # Komut geçmişinde ara
```

## Sonuç

Linux terminal komutları, sisteminizi yönetmek ve günlük görevleri otomatikleştirmek için güçlü araçlardır. Bu rehberde yer alan komutları düzenli olarak kullanarak, terminal becerilerinizi geliştirebilir ve Linux kullanımında daha verimli olabilirsiniz.

Bu rehber temel ve orta seviye komutları kapsamaktadır. Linux'ta daha derinlemesine incelemek isterseniz, her komutun man sayfalarını (`man komut`) okuyabilir ve çevrimiçi kaynakları inceleyebilirsiniz.

Linux terminalinde ustalaşmak, zaman içinde pratik yaparak ve yeni komutlar öğrenerek gerçekleşir. Keşfetmeye devam edin ve Linux'un gücünden en iyi şekilde yararlanın!
