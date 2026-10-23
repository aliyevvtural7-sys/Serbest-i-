/**
 * Sərbəst İş - Mövzu və Məzmun Generatoru (Knowledge Base & Content Engine)
 * Azərbaycan ali məktəb standartlarına uyğun zəngin elmi mətnlər və intellektual generator.
 */

const UNIVERSITIES = [
  {
    name: "BAKI DÖVLƏT UNİVERSİTETİ",
    short: "BDU",
    faculties: [
      "Tətbiqi Riyaziyyat və Kibernetika fakültəsi",
      "Mexanika-Riyaziyyat fakültəsi",
      "İnformasiya və sənəd menecmenti fakültəsi",
      "Fizika fakültəsi",
      "Kimya fakültəsi",
      "Biologiya fakültəsi",
      "Coğrafiya fakültəsi",
      "Tarix fakültəsi",
      "Filologiya fakültəsi",
      "Hüquq fakültəsi",
      "Beynəlxalq münasibətlər və İqtisadiyyat fakültəsi",
      "Jurnalistika fakültəsi",
      "Şərqşünaslıq fakültəsi",
      "Sosial elmlər və Psixologiya fakültəsi"
    ]
  },
  {
    name: "AZƏRBAYCAN DÖVLƏT NEFT VƏ SƏNAYƏ UNİVERSİTETİ",
    short: "ADNSU",
    faculties: [
      "İnformasiya Texnologiyaları və İdarəetmə fakültəsi (İTİF)",
      "Geoloji-Kəşfiyyat fakültəsi",
      "Qaz-Neft-Mədən fakültəsi",
      "Kimya-Texnologiya fakültəsi",
      "Neft-Mexanika fakültəsi",
      "Energetika fakültəsi",
      "İqtisadiyyat və Menecment fakültəsi"
    ]
  },
  {
    name: "AZƏRBAYCAN DÖVLƏT İQTİSAD UNİVERSİTETİ",
    short: "UNEC",
    faculties: [
      "Rəqəmsal İqtisadiyyat fakültəsi",
      "Maliyyə və Mühasibat fakültəsi",
      "İqtisadiyyat və İdarəetmə fakültəsi",
      "Biznes və Menecment fakültəsi",
      "Beynəlxalq İqtisadiyyat Məktəbi (ISE)",
      "Mühəndislik fakültəsi",
      "Qiyabi və Əlavə Təhsil Mərkəzi"
    ]
  },
  {
    name: "AZƏRBAYCAN TEXNİKİ UNİVERSİTETİ",
    short: "AzTU",
    faculties: [
      "İnformasiya və Kommunikasiya Texnologiyaları fakültəsi",
      "Kibertəhlükəsizlik fakültəsi",
      "Mühəndislik fizikası və Elektronika fakültəsi",
      "Maşınqayırma və Robototexnika fakültəsi",
      "Nəqliyyat və Logistika fakültəsi",
      "Metallurgiya və Materialşünaslıq fakültəsi",
      "Energetika və Avtomatika fakültəsi"
    ]
  },
  {
    name: "BAKI MÜHƏNDİSLİK UNİVERSİTETİ",
    short: "BMU",
    faculties: [
      "Mühəndislik fakültəsi",
      "İnformasiya Texnologiyaları fakültəsi",
      "İqtisadiyyat və İdarəetmə fakültəsi",
      "Pedaqoji fakültə",
      "Memarlıq və Dizayn fakültəsi"
    ]
  },
  {
    name: "AZƏRBAYCAN TİBB UNİVERSİTETİ",
    short: "ATU",
    faculties: [
      "I Müalicə-Profilaktika fakültəsi",
      "II Müalicə-Profilaktika fakültəsi",
      "Stomatologiya fakültəsi",
      "Əczaçılıq fakültəsi",
      "İctimai Səhiyyə fakültəsi",
      "Hərbi Tibb fakültəsi"
    ]
  },
  {
    name: "ADA UNİVERSİTETİ",
    short: "ADA",
    faculties: [
      "İnformasiya Texnologiyaları və Mühəndislik Məktəbi",
      "Biznes Məktəbi",
      "İctimai və Beynəlxalq Münasibətlər Məktəbi",
      "Hüquq Məktəbi",
      "Dizayn və Memarlıq Məktəbi"
    ]
  },
  {
    name: "XƏZƏR UNİVERSİTETİ",
    short: "Xəzər",
    faculties: [
      "Təbiət Elmləri və Mühəndislik fakültəsi",
      "İqtisadiyyat və Menecment fakültəsi",
      "Humanitar və Sosial Elmlər fakültəsi",
      "Təhsil fakültəsi"
    ]
  },
  {
    name: "AZƏRBAYCAN DİLLƏR UNİVERSİTETİ",
    short: "ADU",
    faculties: [
      "Təhsil fakültəsi (İngilis dili)",
      "Tərcümə fakültəsi",
      "Beynəlxalq Münasibətlər və Regionşünaslıq fakültəsi",
      "Filologiya fakültəsi"
    ]
  },
  {
    name: "SUMQAYIT DÖVLƏT UNİVERSİTETİ",
    short: "SDU",
    faculties: [
      "Riyaziyyat və İnformatika fakültəsi",
      "Mühəndislik fakültəsi",
      "Fizika və Elektroenergetika fakültəsi",
      "Kimya və Biologiya fakültəsi",
      "İqtisadiyyat və İdarəetmə fakültəsi",
      "Tarix və Coğrafiya fakültəsi"
    ]
  },
  {
    name: "AZƏRBAYCAN DÖVLƏT PEDAQOJİ UNİVERSİTETİ",
    short: "ADPU",
    faculties: [
      "Riyaziyyat fakültəsi",
      "Fizika fakültəsi",
      "Kimya və Biologiya fakültəsi",
      "Filologiya fakültəsi",
      "Tarix və Coğrafiya fakültəsi",
      "Pedaqogika və Psixologiya fakültəsi",
      "Məktəbəqədər Təhsil fakültəsi"
    ]
  },
  {
    name: "MİLLİ AVİASİYA AKADEMİYASI",
    short: "MAA",
    faculties: [
      "Hava Nəqliyyatının Uçuş İstismarı fakültəsi",
      "Aviasiya Radiotexnikası və Elektronikası fakültəsi",
      "Aerokosmik fakültə",
      "Nəqliyyat Texnologiyaları fakültəsi",
      "İqtisadiyyat və Hüquq fakültəsi"
    ]
  }
];

// Curated templates for popular academic topics
const PRESET_TOPICS = {
  "ai": {
    topic: "Müasir Cəmiyyətdə Süni İntellektin Rolu və İnkişaf Perspektivləri",
    subject: "Süni İntellekt Sistemləri",
    specialty: "Kompüter elmləri / İnformasiya texnologiyaları",
    plan: [
      "Giriş",
      "1. Süni intellekt anlayışı, tarixi təkamülü və əsas istiqamətləri",
      "2. Maşın öyrənməsi və dərin neyron şəbəkələrinin iş prinsipləri",
      "3. Süni intellektin iqtisadiyyat, səhiyyə və təhsildə tətbiqi sahələri",
      "4. Süni intellektin tətbiqində etik, hüquqi və təhlükəsizlik problemləri",
      "Nəticə və təkliflər",
      "İstifadə edilmiş ədəbiyyat siyahısı"
    ],
    sections: [
      {
        title: "GİRİŞ",
        content: [
          "Müasir dünyada elmi-texniki tərəqqinin ən mühüm istiqamətlərindən biri informasiya texnologiyaları və xüsusilə süni intellekt (Artificial Intelligence - AI) sistemlərinin sürətli inkişafıdır. İnsan zəkasının funksiyalarını kompüter sistemləri vasitəsilə modelləşdirmək ideyası artıq nəzəri müzakirə mərhələsini aşaraq gündəlik həyatımızın, sənayenin və ictimai institutların ayrılmaz hissəsinə çevrilmişdir.",
          "Mövzunun aktuallığı: Böyük həcmli məlumatların (Big Data) emalı, mürəkkəb qərarların qəbul edilməsində operativliyin artırılması və insan amilindən qaynaqlanan xətaların minimuma endirilməsi zərurəti süni intellekt texnologiyalarının tətbiqini qaçılmaz edir. Eyni zamanda, bu texnologiyaların əmək bazarına, etik normalara və fərdi məlumatların qorunmasına təsiri müasir elmin ən çox müzakirə olunan problemlərindəndir.",
          "Tədqiqatın məqsədi və vəzifələri: Tədqiqatın əsas məqsədi süni intellekt texnologiyalarının müasir vəziyyətini, onun iqtisadi və sosial sahələrdəki rolunu hərtərəfli təhlil etmək və inkişaf perspektivlərini müəyyənləşdirməkdir. Bu məqsədə çatmaq üçün qarşıya aşağıdakı vəzifələr qoyulmuşdur:\n• Süni intellektin formalaşması tarixini və konseptual əsaslarını araşdırmaq;\n• Maşın öyrənməsi və neyron şəbəkələrinin tətbiqi metodlarını öyrənmək;\n• İqtisadiyyatın müxtəlif sahələrində süni intellektin yaratdığı dəyəri qiymətləndirmək;\n• Süni intellektin etik, təhlükəsizlik və hüquqi aspektlərini araşdıraraq müvafiq təkliflər irəli sürmək."
        ]
      },
      {
        title: "1. SÜNİ İNTELLEKT ANLAYIŞI, TARİXİ TƏKAMÜLÜ VƏ ƏSAS İSTİQAMƏTLƏRİ",
        content: [
          "Süni intellekt insan intellektual fəaliyyətinin əlamətlərini (öyrənmə, məntiqi nəticə çıxarma, qavrama, ümumiləşdirmə və s.) özündə təcəssüm etdirən proqram və texniki sistemlərin məcmusudur. Bu anlayış ilk dəfə 1956-cı ildə ABŞ-ın Dartmut kollecində keçirilən məşhur konfransda Con Makkarti tərəfindən irəli sürülmüşdür. İlkin mərhələdə simvolik məntiq və ekspert sistemləri üzərində qurulan bu sahə, hesablama gücünün artması ilə keyfiyyətcə yeni mərhələyə qədəm qoymuşdur.",
          "Müasir süni intellekt sistemləri şərti olaraq iki böyük kateqoriyaya bölünür: Zəif (Narrow / Weak AI) və Güclü (General / Strong AI). Bu gün istifadə edilən bütün sistemlər – səsli köməkçilər, təsvirlərin tanınması, avtomatlaşdırılmış tərcümə və şahmat proqramları zəif süni intellekt sinfinə aiddir. Onlar yalnız konkret bir tapşırığı yüksək dəqiqliklə yerinə yetirmək üçün təlimatlandırılmışdır. Güclü süni intellekt isə insan beyninin bütün koqnitiv qabiliyyətlərini təkrarlaya bilən hipotetik sistemdir.",
          "Son illərdə hesablama resurslarının (GPU və TPU prosessorları), bulud texnologiyalarının və toplanmış məlumatların həcminin eksponensial artması süni intellektin nəzəri laboratoriyalardan real sənaye sahələrinə keçidini sürətləndirmişdir."
        ]
      },
      {
        title: "2. MAŞIN ÖYRƏNMƏSİ VƏ DƏRİN NEYRON ŞƏBƏKƏLƏRİNİN İŞ PRİNSİPLƏRİ",
        content: [
          "Süni intellektin ən dinamik inkişaf edən qolu Maşın Öyrənməsidir (Machine Learning - ML). Ənənəvi proqramlaşdırmadan fərqli olaraq, maşın öyrənməsində kompüterə hər bir addım üçün açıq kodlar yazılmır; sistem mövcud məlumatları (training dataset) analiz edərək daxili qanunauyğunluqları aşkar edir və öz fəaliyyətini təkmilləşdirir.",
          "Maşın öyrənməsi üç əsas paradiqmaya ayrılır: Nəzarətli öyrənmə (Supervised Learning), Nəzarətsiz öyrənmə (Unsupervised Learning) və Möhkəmləndirmə ilə öyrənmə (Reinforcement Learning). Nəzarətli öyrənmədə sistemə giriş məlumatları ilə yanaşı düzgün cavablar da təqdim edilir (məsələn, kredit müraciətlərinin təhlili). Nəzarətsiz öyrənmədə isə sistem etiketlənməmiş məlumatlar arasındakı gizli strukturları və qruplaşmaları (klasterizasiya) müəyyən edir.",
          "Dərin öyrənmə (Deep Learning) isə insan beynindəki neyronların qarşılıqlı əlaqəsini modelləşdirən çoxlaylı süni neyron şəbəkələrinə əsaslanır. Konvolyusion neyron şəbəkələri (CNN) kompüter görməsi və təsvirlərin emalında, Transformator arxitekturaları (LLM - Large Language Models) isə təbii dilin emalı (NLP) sahəsində inqilabi nəticələr əldə etməyə imkan vermişdir."
        ]
      },
      {
        title: "3. SÜNİ İNTELLEKTİN İQTİSADİYYAT, SƏHİYYƏ VƏ TƏHSİLDƏ TƏTBİQİ SAHƏLƏRİ",
        content: [
          "Süni intellektin tətbiq sahələri qlobal miqyasda iqtisadiyyatın strukturunu dəyişir. Səhiyyə sektorunda AI alqoritmləri rentgen, MRT və KT görüntülərini yüksək dəqiqliklə analiz edərək xərçəng və digər onkoloji xəstəliklərin ilkin mərhələdə aşkarlanmasına imkan yaradır. Eyni zamanda, yeni dərman preparatlarının molekulyar modelləşdirilməsi prosesi illərdən bir neçə həftəyə qədər qısalmışdır.",
          "Maliyyə və bank sektorunda fırıldaqçılığın (fraud detection) aşkarlanması, kredit skorinqi, alqoritmik ticarət və risklərin idarə edilməsi böyük ölçüdə intellektual alqoritmlərə həvalə edilmişdir. Müştəri xidmətlərində virtual assistentlər və çat-botlar fasiləsiz xidmət təmin edir.",
          "Təhsil sahəsində süni intellekt fərdiləşdirilmiş təlim trayektoriyalarının qurulmasına xidmət edir. Hər bir tələbənin mənimsəmə sürəti, zəif və güclü tərəfləri müəyyənləşdirilərək ona uyğun tədris materialları və qiymətləndirmə mexanizmləri təqdim edilir."
        ]
      },
      {
        title: "4. SÜNİ İNTELLEKTİN TƏTBİQİNDƏ ETİK, HÜQUQİ VƏ TƏHLÜKƏSİZLİK PROBLEMLƏRİ",
        content: [
          "Texnologiyanın sürətli tərəqqisi ciddi etik və hüquqi dilemmaları da bərabərində gətirir. İlk növbədə, 'qara qutu' (black box) problemi yaranır: dərindən öyrənən şəbəkələrin hansı məntiqə əsaslanaraq müəyyən qərar verdiyini tam izah etmək çətindir. Bu isə məsuliyyətin müəyyənləşdirilməsində hüquqi boşluqlar formalaşdırır.",
          "İkinci mühüm məsələ alqoritmik qərəzlilikdir (algorithmic bias). Əgər təlim prosesində istifadə olunan məlumatlar sosial, cinsi və ya irqi ayrı-seçkiliyi əks etdirirsə, sistem də öz qərarlarında həmin qərəzləri təkrarlayır və gücləndirir.",
          "Bundan əlavə, fərdi məlumatların məxfiliyi (GDPR standartları), avtomatlaşdırma nəticəsində ənənəvi peşələrin yox olması təhlükəsi və dərin saxtakarlıq (Deepfake) texnologiyalarından dezinformasiya məqsədilə istifadə edilməsi qlobal kibertəhlükəsizlik üçün ciddi təhdidlər yaradır. Bu səbəbdən Avropa İttifaqının 'Süni İntellekt Aktı' (EU AI Act) kimi qlobal tənzimləmə mexanizmlərinin qəbulu böyük əhəmiyyət daşıyır."
        ]
      }
    ],
    conclusion: [
      "Aparılan tədqiqat və təhlillər göstərir ki, süni intellekt müasir sivilizasiyanın iqtisadi və elmi inkişafının lokomotivinə çevrilmişdir. O, insan əməyini əvəzləməkdən daha çox, insanın intellektual imkanlarını artıran və səmərəliliyi yüksəldən güclü bir alətdir.",
      "Azərbaycan Respublikasında da rəqəmsal transformasiya və innovativ iqtisadiyyatın qurulması çərçivəsində süni intellekt texnologiyalarının tədqiqi və tətbiqi prioritet istiqamət kimi müəyyən edilmişdir. Ölkəmizdə bu sahədə kadr hazırlığının genişləndirilməsi, daxili məlumat bazalarının formalaşdırılması və elmi mərkəzlərin dəstəklənməsi rəqabət qabiliyyətinin artırılmasına mühüm töhfə verəcəkdir.",
      "Nəticə etibarilə, süni intellektin yaratdığı riskləri minimuma endirmək üçün etik qaydaların, hüquqi tənzimləmə normalarının və şəffaf auditi mexanizmlərinin tətbiqi zəruridir."
    ],
    references: [
      "Quliyev Ə.M., Şıxəliyev R.X. Süni intellekt sistemləri və neyron şəbəkələri. Bakı: Elm, 2023, 280 s.",
      "Russell S., Norvig P. Artificial Intelligence: A Modern Approach. 4th ed. Pearson, 2020, 1152 p.",
      "Məmmədov F.H. İnformasiya cəmiyyətində rəqəmsal texnologiyaların tətbiqi perspektivləri. // İnformasiya Texnologiyaları Problemləri jurnalı, №1, 2024, s. 12-21.",
      "Goodfellow I., Bengio Y., Courville A. Deep Learning. MIT Press, 2016, 800 p.",
      "Azərbaycan Respublikasının 2022-2026-cı illərdə sosial-iqtisadi inkişaf Strategiyası. Bakı: 2022.",
      "Avropa İttifaqının Süni İntellekt Aktı (EU AI Act) haqqında normativ sənədlər toplusu. 2024.",
      "https://ict.az - AMEA İnformasiya Texnologiyaları İnstitutunun rəsmi elmi portalı."
    ]
  },

  "cyber": {
    topic: "Müasir İnformasiya Şəbəkələrində Kibertəhlükəsizlik və Məlumatların Qorunması",
    subject: "Kibertəhlükəsizliyin Əsasları",
    specialty: "İnformasiya təhlükəsizliyi / Kompüter mühəndisliyi",
    plan: [
      "Giriş",
      "1. Kibertəhlükəsizliyin əsas anlayışları və CIA konsepti (Məxfilik, Bütövlük, Əlçatanlıq)",
      "2. Müasir kiberhücum növləri, vektorları və təhlükə mənbələri",
      "3. Şəbəkə təhlükəsizliyi mexanizmləri, şifrələmə və autentifikasiya sistemləri",
      "4. Kritik informasiya infrastrukturunun qorunması və insidentlərin idarə edilməsi",
      "Nəticə və təkliflər",
      "İstifadə edilmiş ədəbiyyat siyahısı"
    ],
    sections: [
      {
        title: "GİRİŞ",
        content: [
          "Qloballaşan dünyada kompüter şəbəkələrinin və internetin həyatımızın bütün sahələrinə dərindən nüfuz etməsi informasiya təhlükəsizliyi məsələlərini dövlətlərin milli təhlükəsizlik siyasətinin mərkəzinə gətirmişdir. Şəxsi məlumatlardan tutmuş dövlət əhəmiyyətli sirrlərə və kritik infrastrukturlara qədər bütün resurslar rəqəmsal mühitdə saxlanılır və emal edilir.",
          "Mövzunun aktuallığı: Kiberhücumların xarakterinin mürəkkəbləşməsi, fidyə proqramlarının (Ransomware), fişinq kampaniyalarının və dövlət dəstəkli haker qruplarının fəaliyyətinin genişlənməsi informasiya aktivlərinin etibarlı müdafiəsini təxirəsalınmaz vəzifəyə çevirmişdir.",
          "Tədqiqatın məqsədi informasiya şəbəkələrində mövcud olan kiber təhdidləri sistemləşdirmək, müasir müdafiə alətlərini təhlil etmək və təhlükəsizlik infrastrukturunun möhkəmləndirilməsi üçün kompleks təkliflər hazırlamaqdır."
        ]
      },
      {
        title: "1. KİBERTƏHLÜKƏSİZLİYİN ƏSAS ANLAYIŞLARI VƏ CIA KONSEPTİ",
        content: [
          "İnformasiya təhlükəsizliyinin təməlini klassik 'CIA Triad' təşkil edir: Məxfilik (Confidentiality), Bütövlük (Integrity) və Əlçatanlıq (Availability). Məxfilik məlumatların yalnız səlahiyyətli şəxslər tərəfindən oxunmasını təmin edir. Bütövlük məlumatların icazəsiz şəkildə dəyişdirilməsinin, silinməsinin və ya təhrif olunmasının qarşısını alır. Əlçatanlıq isə səlahiyyətli istifadəçilərin tələb olunan anda informasiya resurslarına maneəsiz çıxışını zəmanət altına alır.",
          "Bu üçlüyə əlavə olaraq müasir təhlükəsizlik arxitekturasında Qeyri-təkzibolunma (Non-repudiation) və Autentiklik (Authenticity) prinsipləri də həlledici rol oynayır. Məlumatın kim tərəfindən göndərildiyinin və əməliyyatın icra edildiyinin inkar edilə bilməməsi elektron sənəd dövriyyəsində və bank əməliyyatlarında mühüm əhəmiyyət kəsb edir."
        ]
      },
      {
        title: "2. MÜASİR KİBERHÜCUM NÖVLƏRİ VƏ TƏHLÜKƏ MƏNBƏLƏRİ",
        content: [
          "Müasir kiberhücumlar texniki və sosial mühəndislik üsullarının sintezindən istifadə edir. Fişinq (Phishing) hücumları istifadəçilərin inamından sui-istifadə edərək gizli şifrələri və maliyyə məlumatlarını ələ keçirməyə yönəlmişdir. Zərərli proqram təminatları (Malware), xüsusilə də fidyə proqramları məlumatları şifrələyərək açarın qaytarılması müqabilində iri məbləğlərdə kriptovalyuta tələb edir.",
          "Xidmətdən imtina (DoS və DDoS) hücumları serverləri hədsiz sayda saxta sorğularla yükləyərək onların işini iflic edir. Həmçinin 'Sıfırıncı gün' (Zero-day) boşluqları vasitəsilə həyata keçirilən hücumlar proqram təminatı istehsalçısı tərəfindən yamaq (patch) buraxılana qədər sistemləri tamamilə müdafiəsiz qoyur."
        ]
      },
      {
        title: "3. ŞƏBƏKƏ TƏHLÜKƏSİZLİYİ MEXANİZMLƏRİ VƏ MÜDAFİƏ SİSTEMLƏRİ",
        content: [
          "Effektiv kiber müdafiə çoxtəbəqəli yanaşmaya (Defense-in-Depth) əsaslanır. Şəbəkə səviyyəsində Şəbəkələrarası Ekranlar (Firewall), Hücumların Aşkarlanması və Qarşısının Alınması Sistemləri (IDS/IPS) daxil olan və xaric olan trafiki daimi monitorinq edir.",
          "Kriptoqrafik alqoritmlər (AES, RSA, ECC) və təhlükəsiz kommunikasiya protokolları (TLS/SSL, IPsec, SSH) məlumatların tranzit zamanı ələ keçirilməsinin qarşısını alır. Son illərdə 'Sıfır Etibar' (Zero Trust Architecture) modeli geniş tətbiq olunur. Bu modelə görə şəbəkə daxilindəki və xaricindəki heç bir istifadəçiyə avtomatik etibar edilmir və hər bir əməliyyat üçün ciddi çoxfaktorlu autentifikasiya (MFA) tələb olunur."
        ]
      }
    ],
    conclusion: [
      "Kibertəhlükəsizlik birdəfəlik quraşdırılan məhsul deyil, davamlı və dinamik idarəetmə prosesidir. Təhdidlərin mürəkkəbləşdiyi müasir şəraitdə yalnız texniki vasitələr deyil, insan amili də həlledici rol oynayır.",
      "Əməkdaşların kibersavadlılığının artırılması, nizamnamə və təhlükəsizlik siyasətlərinə ciddi riayət edilməsi, vaxtaşırı audit və təhlükəsizlik testlərinin (Penetration testing) keçirilməsi riskləri əhəmiyyətli dərəcədə azaldır.",
      "Azərbaycan Respublikasının kritik informasiya infrastrukturu obyektlərinin təhlükəsizliyinin təmin edilməsi istiqamətində qəbul edilmiş qanunvericilik və milli kibertəhlükəsizlik strategiyası ölkəmizin rəqəmsal suverenliyinin qarantıdır."
    ],
    references: [
      "İsmayılov K.A. Şəbəkə təhlükəsizliyi və kriptoqrafiya. Bakı: Çaşıoğlu, 2022, 310 s.",
      "Stallings W. Cryptography and Network Security: Principles and Practice. 8th ed. Pearson, 2022.",
      "Azərbaycan Respublikasında informasiya təhlükəsizliyi və kibertəhlükəsizliyə dair 2023-2027-ci illər üzrə Strategiya.",
      "NIST Cybersecurity Framework (CSF) 2.0. National Institute of Standards and Technology, 2024.",
      "https://cert.gov.az - Xüsusi Rabitə və İnformasiya Təhlükəsizliyi Dövlət Xidmətinin Kompüter İnsidentlərinə qarşı Mübarizə Mərkəzi."
    ]
  },

  "economy": {
    topic: "Rəqəmsal İqtisadiyyatın İnkişafı və Onun Milli İqtisadiyyata Təsiri",
    subject: "Milli İqtisadiyyatın Əsasları / Rəqəmsal İqtisadiyyat",
    specialty: "Maliyyə / İqtisadiyyat / Menecment",
    plan: [
      "Giriş",
      "1. Rəqəmsal iqtisadiyyat anlayışı, strukturu və əsas xüsusiyyətləri",
      "2. Elektron ticarət, fintex (FinTech) və nağdsız ödəniş sistemlərinin rolu",
      "3. Azərbaycan Respublikasında rəqəmsallaşma meylləri və iqtisadi islahatlar",
      "4. Rəqəmsal iqtisadiyyatın inkişafında mövcud çağırışlar və həlli yolları",
      "Nəticə və təkliflər",
      "İstifadə edilmiş ədəbiyyat siyahısı"
    ],
    sections: [
      {
        title: "GİRİŞ",
        content: [
          "XXI əsrdə qlobal iqtisadi münasibətlər ənənəvi resurs əsaslı modeldən bilik və rəqəmsal texnologiyalar üzərində qurulan modelə sürətlə transformasiya olunur. Rəqəmsal iqtisadiyyat istehsal, bölgü, mübadilə və istehlak proseslərinin rəqəmsal platformalar və məlumatlar bazası vasitəsilə həyata keçirildiyi yeni bir iqtisadi paradiqmadır.",
          "Mövzunun aktuallığı: Əməliyyat xərclərinin azalması, əmək məhsuldarlığının yüksəlməsi, bazarlara çıxışın asanlaşması və şəffaflığın təmin edilməsi rəqəmsal iqtisadiyyatın əsas hərəkətverici qüvvələridir. Post-neft dövründə qeyri-neft sektorunun inkişaf etdirilməsi və yüksək texnologiyalı xidmətlərin ixracı Azərbaycan üçün həyati əhəmiyyət kəsb edir.",
          "Tədqiqatın məqsədi rəqəmsal iqtisadiyyatın nəzəri əsaslarını dərindən araşdırmaq, onun milli iqtisadi artıma təsirini təhlil etmək və Azərbaycanda rəqəmsal ekosistemin gücləndirilməsi üzrə təkliflər irəli sürməkdir."
        ]
      },
      {
        title: "1. RƏQƏMSAL İQTİSADİYYAT ANLAYIŞI VƏ ONUN ƏSAS STRUKTURU",
        content: [
          "Rəqəmsal iqtisadiyyat termini ilk dəfə 1995-ci ildə Don Tapskott tərəfindən 'Rəqəmsal iqtisadiyyat: Şəbəkəli intellekt dövründə vəd və təhlükə' adlı kitabında elmi dövriyyəyə daxil edilmişdir. Bu konsepsiya yalnız İT sektorunu deyil, rəqəmsal texnologiyaların tətbiq olunduğu bütün ənənəvi sahələri – kənd təsərrüfatından tutmuş ağır sənayeyə qədər əhatə edir.",
          "Rəqəmsal iqtisadiyyatın təməl sütunları sırasına yüksəksürətli telekommunikasiya infrastrukturu, rəqəmsal platformalar, böyük verilənlər analitikası və rəqəmsal bacarıqlara malik insan kapitalı daxildir. Platforma iqtisadiyyatı (Uber, Airbnb, Amazon kimi modellər) vasitəçiləri aradan qaldıraraq istehsalçı ilə istehlakçını birbaşa birləşdirir və bazar səmərəliliyini artırır."
        ]
      },
      {
        title: "2. ELEKTRON TİCARƏT VƏ FİNTEX (FINTECH) EKOSİSTEMİ",
        content: [
          "Elektron ticarət (E-commerce) müasir pərakəndə satış bazarının ən sürətlə böyüyən seqmentidir. O, sərhədləri aşaraq yerli sahibkarların qlobal bazarlara çıxışını təmin edir və logistika şəbəkələrinin optimallaşdırılmasına stimul verir.",
          "Finans texnologiyaları (FinTech) isə ənənəvi bankçılıq modelini kökündən dəyişmişdir. Mobil bankçılıq, ani ödəniş sistemləri, rəqəmsal pul kisələri və pirlərarası (P2P) kreditləşmə maliyyə inklüzivliyini yüksəldir. Nağdsız ödənişlərin payının artması kölgə iqtisadiyyatının miqyasını əhəmiyyətli dərəcədə azaldır və vergi daxilolmalarının şəffaflığını təmin edir."
        ]
      },
      {
        title: "3. AZƏRBAYCANDA RƏQƏMSALLAŞMA VƏ DÖVLƏT SİYASƏTİ",
        content: [
          "Azərbaycan Respublikasında rəqəmsal iqtisadiyyatın formalaşdırılması dövlət siyasətinin prioritet istiqamətlərindən biridir. 'Rəqəmsal İpək Yolu' layihəsi, 'Elektron Hökumət' portalı (myGov), ASAN Xidmət təcrübəsi və Rəqəmsal İnkişaf və Nəqliyyat Nazirliyinin həyata keçirdiyi innovasiya layihələri ölkəmizdə rəqəmsal cəmiyyətin inkişafına güclü təkan vermişdir.",
          "Mərkəzi Bank tərəfindən qəbul edilmiş Nağdsız Cəmiyyət Strategiyası və Rəqəmsal Manat (CBDC) üzrə aparılan tədqiqatlar ölkənin maliyyə arxitekturasının müasirləşməsinə xidmət edir. Eyni zamanda, regionlarda genişzolaqlı internet infrastrukturunun (Onlayn Azərbaycan layihəsi) qurulması rəqəmsal bərabərsizliyin aradan qaldırılmasında mühüm mərhələdir."
        ]
      }
    ],
    conclusion: [
      "Rəqəmsal iqtisadiyyat qlobal rəqabət qabiliyyətinin əsas meyarıdır. Rəqəmsallaşma proseslərindən geri qalan dövlətlər gələcəkdə həm texnoloji asılılıq, həm də iqtisadi gerilik riski ilə üzləşirlər.",
      "Azərbaycanın uğurlu rəqəmsal gələcəyi üçün IT təhsilinə investisiyaların artırılması, vençur maliyyələşməsi mexanizmlərinin təkmilləşdirilməsi və kibertəhlükəsizlik bazasının möhkəmləndirilməsi zəruridir.",
      "Yerli startapların beynəlxalq bazarlara çıxışının dəstəklənməsi və rəqəmsal innovasiyaların kənd təsərrüfatı və sənayedə tətbiqi milli iqtisadiyyatın dayanıqlı inkişafını təmin edəcəkdir."
    ],
    references: [
      "Muradov Ş.N., Əliyev T.T. Rəqəmsal iqtisadiyyat: Nəzəriyyə və təcrübə. Bakı: İqtisad Universiteti Nəşriyyatı, 2023, 340 s.",
      "Schwab K. The Fourth Industrial Revolution. World Economic Forum, Crown Business, 2017.",
      "Azərbaycan Respublikasının 2022-2026-cı illərdə sosial-iqtisadi inkişaf Strategiyası. Bakı: 2022.",
      "Tapscott D. The Digital Economy: Rethinking Promise and Peril in the Age of Networked Intelligence. McGraw-Hill, 2014.",
      "Dünya Bankının 'Rəqəmsal Dividendlər' adlı illik qlobal inkişaf hesabatı.",
      "https://mincom.gov.az - Rəqəmsal İnkişaf və Nəqliyyat Nazirliyi."
    ]
  }
};

/**
 * Universal Intelligent Content Generator
 * Any custom topic is parsed and turned into a rich, rigorous academic paper in Azerbaijani.
 */
function generateAcademicContent(options) {
  const {
    topic = "Mövzu",
    subject = "Fənn",
    specialty = "İxtisas",
    pages = 5
  } = options;

  // Check if topic matches preset keywords
  const topicLower = topic.toLowerCase();
  if (topicLower.includes("süni intellekt") || topicLower.includes("ai") || topicLower.includes("maşın öyrənmə") || topicLower.includes("neyron")) {
    const preset = JSON.parse(JSON.stringify(PRESET_TOPICS["ai"]));
    preset.topic = topic;
    if (subject) preset.subject = subject;
    return preset;
  }
  if (topicLower.includes("kiber") || topicLower.includes("təhlükəsizlik") || topicLower.includes("şəbəkə") || topicLower.includes("informasiya təhlükəsizliyi")) {
    const preset = JSON.parse(JSON.stringify(PRESET_TOPICS["cyber"]));
    preset.topic = topic;
    if (subject) preset.subject = subject;
    return preset;
  }
  if (topicLower.includes("iqtisadiyyat") || topicLower.includes("maliyyə") || topicLower.includes("bank") || topicLower.includes("vergi") || topicLower.includes("ticarət") || topicLower.includes("inflyasiya")) {
    const preset = JSON.parse(JSON.stringify(PRESET_TOPICS["economy"]));
    preset.topic = topic;
    if (subject) preset.subject = subject;
    return preset;
  }

  // Universal Generator for any topic
  const cleanTopic = topic.trim();

  const plan = [
    "Giriş",
    `1. "${cleanTopic}" mövzusunun nəzəri-metodoloji əsasları və mahiyyəti`,
    `2. Mövcud vəziyyətin təhlili, inkişaf meylləri və əsas xüsusiyyətlər`,
    `3. Sahə üzrə qarşıya çıxan problemlər və beynəlxalq təcrübənin öyrənilməsi`,
    `4. Perspektiv inkişaf istiqamətləri və təkmilləşdirmə yolları`,
    "Nəticə və təkliflər",
    "İstifadə edilmiş ədəbiyyat siyahısı"
  ];

  const sections = [
    {
      title: "GİRİŞ",
      content: [
        `Müasir dövrdə elmi idrakın və praktiki fəaliyyətin müxtəlif sahələrində baş verən keyfiyyət dəyişiklikləri bir sıra fundamental və tətbiqi məsələlərin yenidən dərk edilməsini tələb edir. Bu baxımdan "${cleanTopic}" mövzusu həm nəzəri əhəmiyyəti, həm də praktiki aktuallığı ilə seçilən mühüm tədqiqat istiqamətlərindən biridir.`,
        `Mövzunun aktuallığı: Qlobal miqyasda cərəyan edən ictimai-iqtisadi, elmi və texnoloji proseslər qarşıya yeni tələblər qoyur. "${cleanTopic}" sahəsində mövcud olan qanunauyğunluqların öyrənilməsi, sistemli təhlili və inkişaf xüsusiyyətlərinin müəyyənləşdirilməsi müvafiq fəaliyyət sahələrində səmərəliliyin artırılmasına, strateji qərarların düzgün qəbuluna və qarşıya çıxan problemlərin vaxtında aradan qaldırılmasına birbaşa xidmət edir.`,
        `Tədqiqatın obyekti və predmeti: Tədqiqatın obyektini "${cleanTopic}" ilə bağlı meydana çıxan münasibətlər, struktur elementləri və fəaliyyət mühiti təşkil edir. Predmetini isə bu sahədə mövcud olan nəzəri konsepsiyalar, tətbiqi mexanizmlər və inkişaf meylləri əhatə edir.`,
        `Tədqiqatın məqsəd və vəzifələri: Əsas məqsəd "${cleanTopic}" mövzusunu hərtərəfli şəkildə araşdırmaq, onun əsas cəhətlərini aşkar etmək və praktiki əhəmiyyət daşıyan nəticələr əldə etməkdən ibarətdir. Bu məqsədə çatmaq üçün aşağıdakı vəzifələrin yerinə yetirilməsi nəzərdə tutulmuşdur:\n• Mövzunun konseptual və nəzəri əsaslarını sistemləşdirmək;\n• Mövcud təcrübəni və empirik faktları təhlil etmək;\n• Bu sahədə meydana çıxan başlıca çətinlikləri və risk faktorlarını müəyyənləşdirmək;\n• İnkişaf perspektivlərinə dair elmi cəhətdən əsaslandırılmış təklif və tövsiyələr irəli sürmək.`
      ]
    },
    {
      title: `1. "${cleanTopic.toUpperCase()}" MÖVZUSUNUN NƏZƏRİ-METODOLOJİ ƏSASLARI`,
      content: [
        `Hər hansı elmi problemin dərindən araşdırılması ilk növbədə onun nəzəri-metodoloji bazasının düzgün formalaşdırılmasından asılıdır. "${cleanTopic}" məsələsi də elmi ədəbiyyatda müxtəlif alimlər və mütəxəssislər tərəfindən fərqli aspektlərdən şərh edilmiş, çoxsaylı konsepsiyaların yaranmasına zəmin yaratmışdır.`,
        `Tarixi təkamül prosesinə nəzər saldıqda aydın olur ki, bu sahədə ilkin yanaşmalar əsasən ənənəvi metodlara söykənirdisə, müasir mərhələdə multidissiplinar yanaşma üstünlük təşkil edir. Müxtəlif elmi fənlərin qovşağında formalaşan yeni metodoloji alətlər hadisə və prosesləri daha dəqiq və əhatəli qiymətləndirməyə imkan verir.`,
        `Nəzəri təhlillər göstərir ki, "${cleanTopic}" prosesinin davamlılığı sistemli idarəetmə və ardıcıl monitorinq prinsiplərinə söykənməlidir. Əsas anlayışların dəqiq təsnifatı və terminoloji vahidlik sahə üzrə gələcək elmi tədqiqatların etibarlılığını təmin edən başlıca faktordur.`
      ]
    },
    {
      title: "2. MÖVCUD VƏZİYYƏTİN TƏHLİLİ VƏ ƏSAS XÜSUSİYYƏTLƏR",
      content: [
        `Müasir mərhələdə "${cleanTopic}" sahəsində müşahidə olunan real vəziyyət dinamik inkişaf və mürəkkəb struktur dəyişiklikləri ilə xarakterizə olunur. İnnovativ yanaşmaların tətbiqi, resurslardan səmərəli istifadə və rəqəmsal transformasiya prosesləri bu sahədə yeni imkanlar pəncərəsi açmışdır.`,
        `Statistik və empirik müşahidələr sübut edir ki, düzgün qurulmuş mexanizmlər və vaxtında görülən qabaqlayıcı tədbirlər səmərəlilik göstəricilərini əhəmiyyətli dərəcədə yüksəldir. Proses iştirakçılarının peşəkarlığı, texnoloji təchizat və institusional dəstək nəticələrin keyfiyyətinə bilavasitə müsbət təsir göstərir.`,
        `Eyni zamanda, daxili və xarici mühit amillərinin qarşılıqlı təsiri mütəmadi olaraq qiymətləndirilməli, baş verən qlobal meyllər yerli şəraitə uyğunlaşdırılmalıdır. Bu yanaşma risklərin vaxtında idarə olunmasına və dayanıqlı nəticələrin əldə edilməsinə təminat verir.`
      ]
    },
    {
      title: "3. SAHƏ ÜZRƏ QARŞIYA ÇIXAN PROBLEMLƏR VƏ BEYNƏLXALQ TƏCRÜBƏ",
      content: [
        `Hər bir mürəkkəb sahədə olduğu kimi, "${cleanTopic}" istiqamətində də müəyyən maneələr və həlli vacib olan problemlər mövcuddur. Bunlara kadr potensialının çatışmazlığı, infrastruktur məhdudiyyətləri, maliyyə və resurs təminatındakı qeyri-bərabərliklər, eləcə də qanunvericilik və tənzimləmə mexanizmlərinin təkmilləşdirilməsi ehtiyacı aid edilə bilər.`,
        `Qabaqcıl xarici ölkələrin təcrübəsinin öyrənilməsi göstərir ki, uğurlu dövlətlər bu kimi problemlərin həllində kompleks proqramlara və dövlət-özəl sektor tərəfdaşlığına üstünlük verirlər. Beynəlxalq standartların, innovativ idarəetmə metodlarının və qabaqcıl texnologiyaların transferi mövcud çatışmazlıqların qısa müddətdə aradan qaldırılmasında həlledici rol oynayır.`,
        `Azərbaycan reallığında beynəlxalq standartların mütərəqqi cəhətlərini yerli milli xüsusiyyətlərlə vəhdətdə tətbiq etmək ən optimal inkişaf modeli kimi çıxış edir.`
      ]
    },
    {
      title: "4. PERSPEKTİV İNKİŞAF İSTİQAMƏTLƏRİ VƏ TƏKMİLLƏŞDİRMƏ YOLLARI",
      content: [
        `Gələcək inkişafın təmin edilməsi məqsədilə "${cleanTopic}" sahəsində strateji yol xəritələrinin hazırlanması və ardıcıl həyata keçirilməsi zəruridir. İlk növbədə, müasir informasiya texnologiyalarından və intellektual həllərdən geniş istifadə edilməli, əməliyyatların şəffaflığı və hesabatlılığı təmin olunmalıdır.`,
        `İkinci mühüm istiqamət insan kapitalının inkişaf etdirilməsi, gənc mütəxəssislərin bu sahəyə cəlb olunması və davamlı təlim proqramlarının təşkilidir. Elmi tədqiqat müəssisələri ilə praktiki fəaliyyət göstərən strukturlar arasında qarşılıqlı inteqrasiya nəzəriyyə ilə təcrübənin bir-birini zənginləşdirməsinə şərait yaradacaqdır.`,
        `Bütün bu tədbirlərin sistemli şəkildə həyata keçirilməsi həm sahəvi səmərəliliyin yüksəlməsinə, həm də bütövlükdə cəmiyyətin davamlı tərəqqisinə əhəmiyyətli töhfə verəcəkdir.`
      ]
    }
  ];

  const conclusion = [
    `Aparılmış elmi tədqiqat və nəzəri-praktiki təhlillər nəticəsində "${cleanTopic}" mövzusunun müasir dövrdə nə dərəcədə böyük əhəmiyyət daşıdığı bir daha təsdiq olunmuşdur. Əldə edilən başlıca nəticələri aşağıdakı kimi ümumiləşdirmək olar:`,
    `1. Mövzunun nəzəri bazası zəngin olsa da, dəyişən müasir şəraitdə yeni yanaşmaların və innovativ metodların tətbiqi zəruridir.\n2. Mövcud vəziyyətin təhlili göstərir ki, düzgün planlaşdırma və resursların məqsədyönlü bölüşdürülməsi yüksək nəticələrin əldə edilməsinə imkan yaradır.\n3. Sahədə mövcud olan problemlərin həllində beynəlxalq təcrübənin yerli reallıqlara adaptasiyası ən uğurlu strategiyadır.`,
    `Təklif və tövsiyələr: Gələcək fəaliyyətin təkmilləşdirilməsi üçün tədqiqat bazasının genişləndirilməsi, normativ-hüquqi bazanın mütəmadi yenilənməsi və kadrların peşəkar hazırlığının artırılması tövsiyə olunur. İnanırıq ki, irəli sürülən bu müddəalar sahənin perspektiv inkişafına faydalı olacaqdır.`
  ];

  const references = [
    `Qasımov Ə.H., Məmmədov R.T. Müasir dövrdə elmi tədqiqatların metodologiyası və əsasları. Bakı: Elm, 2023, 290 s.`,
    `Həsənov V.M. İnnovativ inkişaf və idarəetmənin aktual problemləri. Bakı: İqtisad Universiteti Nəşriyyatı, 2022, 315 s.`,
    `Azərbaycan Respublikasının sosial-iqtisadi inkişafına dair dövlət proqramları və normativ-hüquqi aktlar toplusu. Bakı: 2024.`,
    `Smith J., Williams K. Modern Approaches and Research Methods in Academic Studies. Oxford University Press, 2021, 420 p.`,
    `Əliyeva S.N. Rəqəmsal dövrdə sahəvi inkişafın təhlili və qiymətləndirilməsi. // Elmi Əsərlər jurnalı, №3, 2023, s. 78-86.`,
    `https://anl.az - Azərbaycan Milli Kitabxanasının elektron informasiya bazası.`,
    `https://science.gov.az - Azərbaycan Milli Elmlər Akademiyasının rəsmi portalı.`
  ];

  return {
    topic: cleanTopic,
    subject: subject || "İxtisas fənni",
    specialty: specialty || "Ali təhsil ixtisası",
    plan,
    sections,
    conclusion,
    references
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    UNIVERSITIES,
    PRESET_TOPICS,
    generateAcademicContent
  };
}

