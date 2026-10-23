# 🎓 Sərbəst İş Hazırlayan Proqram

Azərbaycan ali və orta ixtisas təhsili müəssisələrinin tələbələri üçün hazırlanmış avtomatlaşdırılmış sərbəst iş (referat / kurs işi) generatoru.

Bu proqram tələbənin daxil etdiyi məlumatlar və mövzu əsasında **100% rəsmi ali məktəb standartlarına uyğun** tam formalaşdırılmış **Microsoft Word (.docx)** sənədi və çap üçün hazır vərəqlər hazırlayır.

---

## 🌟 Əsas Üstünlüklər və İmkanlar

1. **🏛️ Hazır Universitet Şablonları:**
   - Bakı Dövlət Universiteti (BDU)
   - Azərbaycan Dövlət İqtisad Universiteti (UNEC)
   - Azərbaycan Dövlət Neft və Sənaye Universiteti (ADNSU)
   - Azərbaycan Texniki Universiteti (AzTU)
   - Bakı Mühəndislik Universiteti (BMU)
   - Azərbaycan Tibb Universiteti (ATU)
   - ADA Universiteti
   - Xəzər Universiteti
   - Azərbaycan Dillər Universiteti (ADU)
   - Sumqayıt Dövlət Universiteti (SDU)
   - Azərbaycan Dövlət Pedaqoji Universiteti (ADPU)
   - Milli Aviasiya Akademiyası (MAA)
   - və istənilən digər təhsil müəssisəsi

2. **📏 Dəqiq Azərbaycan Dövlət və Universitet Standartları:**
   - **Şrift:** Times New Roman
   - **Mətn ölçüsü:** 14 pt (Titulda başlıqlar 14-16 pt, mərkəzdə böyük hərflərlə "SƏRBƏST İŞ")
   - **Sətirlərarası interval:** 1.5 sətir
   - **Səhifə kənarları (Margins):** Sol 3 sm, Sağ 1.5 sm, Yuxarı 2 sm, Aşağı 2 sm
   - **Abzas daxilə çəkilməsi (First line indent):** 1.25 sm
   - **Düzləndirmə:** Hər iki tərəfə (Justify)
   - **Səhifələmə:** Titul vərəqində nömrə görünmür, 2-ci səhifədən (Plan) başlayaraq səhifənin aşağı mərkəzində nömrələnir.

3. **🤖 İkiqat Generasiya Sistemi:**
   - **⚡ Daxili Akademik Generator (Offline & Limitsiz):** İnternet və ya API açarı tələb etmədən istənilən mövzunu dərindən analiz edərək elmi üslubda giriş, fəsillər, təhlillər, nəticə və real ədəbiyyat siyahısı formalaşdırır.
   - **🤖 Google Gemini AI Rejimi:** Öz pulsuz Gemini API açarınızı daxil etməklə real-vaxt rejimində istənilən mövzunu süni intellektə yazdıra bilərsiniz.

4. **🖥️ Canlı A4 Vərəq Önizləməsi və Redaktor:**
   - Proqram ekranda real A4 ağ vərəqləri göstərir.
   - İstənilən mətni (başlıq, tələbə adı, mövzu, abzaslar) birbaşa vərəqin üzərində klikləyərək canlı dəyişə bilərsiniz.

5. **📥 Çıxış Formatları:**
   - **Word (.docx):** Microsoft Word-də redaktə edilə bilən, bütün stilləri və səhifələməsi qorunan orijinal fayl.
   - **PDF / Çap:** Brauzerin çap pəncərəsi vasitəsilə 1:1 formatda PDF olaraq saxlamaq və ya birbaşa printerə göndərmək.
   - **Mətni Kopyala:** Bütün mətni bir kliklə panoya kopyalamaq.

---

## 🚀 Proqramı Necə İşə Salmaq Olar?

### Ən Asan Yol (Tək kliklə):
Qovluqda olan **`baslat.bat`** faylını iki dəfə klikləyin.
Proqram avtomatik işə düşəcək və brauzerinizdə açılacaq: **`http://localhost:3000`**

### Komanda sətrindən (Terminal):
```bash
node server.js
```
və brauzerdə `http://localhost:3000` ünvanını açın.

---

## 📁 Layihənin Fayl Strukturu

```
c:\SİN\
├── baslat.bat          # Windows üçün tək kliklə işə salma faylı
├── server.js           # Node.js yerli veb serveri (Sıfır xarici asılılıq)
├── docx-builder.js     # Microsoft Word (.docx) OpenXML generatoru
├── knowledge-base.js   # Akademik mövzular bazası və intellektual generator
├── package.json        # Layihə məlumatları
├── public/
│   ├── index.html      # Əsas müasir veb interfeys
│   ├── style.css       # A4 vərəqləri, çap və müasir dizayn stilləri
│   └── app.js          # Canlı redaktor, eksport və idarəetmə skripti
└── README.md           # Təlimat faylı
```

---

## 🔒 Təhlükəsizlik və Məxfilik
- Bütün əməliyyatlar 100% sizin öz kompüterinizdə yerli (local) olaraq icra edilir.
- Məlumatlarınız heç bir kənar serverə ötürülmür.
- Heç bir əlavə ödənişli proqram və ya mürəkkəb quraşdırma tələb olunmur.

