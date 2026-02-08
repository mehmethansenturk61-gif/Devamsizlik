const MAX_DEVAMSIZLIK = 4;

// Ders Listesi (Kodlar kaldırıldı, Sınıf isimleri güncellendi)
const dersListesi = [
  // PAZARTESİ
  { ad: "İleri Veritabanı Uygulamaları", hoca: "Dr. Öğr. Üyesi Ahmet TAŞ", cinsiyet: "erkek", gun: "Pazartesi", saat: "08:00 - 11:00", sinif: "Bilgisayar Laboratuvarı" },
  { ad: "Yapay Zekanın Temelleri", hoca: "Doç. Dr. Ersin BURNAZ", cinsiyet: "erkek", gun: "Pazartesi", saat: "13:00 - 15:00", sinif: "Bilgisayar Laboratuvarı" },

  // SALI
  { ad: "Envanter Değerleme", hoca: "Doç. Dr. Oğuz Yusuf ATASEL", cinsiyet: "erkek", gun: "Salı", saat: "08:00 - 10:00", sinif: "Derslik" },
  { ad: "Finansal Yönetim", hoca: "Doç. Dr. Yusuf GÜNEYSU", cinsiyet: "erkek", gun: "Salı", saat: "10:00 - 12:00", sinif: "Derslik" },
  { ad: "Sistem Analizi ve Tasarımı", hoca: "Doç. Dr. Ayşe ASİLTÜRK", cinsiyet: "kadin", gun: "Salı", saat: "13:00 - 15:00", sinif: "Derslik" },

  // ÇARŞAMBA
  { ad: "Örgütsel Davranış", hoca: "Doç. Dr. Ayşe ASİLTÜRK", cinsiyet: "kadin", gun: "Çarşamba", saat: "08:00 - 10:00", sinif: "Derslik" },
  { ad: "Uygulamalı Veri Madenciliği", hoca: "Doç. Dr. Mehmet KOKOÇ", cinsiyet: "erkek", gun: "Çarşamba", saat: "11:00 - 13:00", sinif: "Derslik" },

  // CUMA
  { ad: "Üretken Yapay Zeka", hoca: "Arş. Gör. Dr. Eda KARACA", cinsiyet: "kadin", gun: "Cuma", saat: "08:00 - 10:00", sinif: "Bilgisayar Laboratuvarı" },
  { ad: "Görsel Programlama", hoca: "Dr. Öğr. Üyesi Ahmet TAŞ", cinsiyet: "erkek", gun: "Cuma", saat: "13:00 - 16:00", sinif: "Bilgisayar Laboratuvarı" }
];

const container = document.getElementById("dersler");

function yukle() {
  container.innerHTML = "";

  dersListesi.forEach(ders => {
    const key = ders.ad; // localStorage anahtarı
    const yapilan = Number(localStorage.getItem(key) || 0);
    const kalan = MAX_DEVAMSIZLIK - yapilan;

    const durum =
      kalan <= 0 ? "tehlike" :
      kalan === 1 ? "uyari" :
      "ok";

    const hocaEmoji = ders.cinsiyet === "erkek" ? "👨‍🏫" : "👩‍🏫";

    const div = document.createElement("div");
    div.className = "ders";
    div.innerHTML = `
      <div class="ders-ust">
        <span class="ders-hoca">${hocaEmoji} ${ders.hoca}</span>
      </div>

      <h3>${ders.ad}</h3>

      <div class="ders-program-bilgi">
        <span><i class="fa-regular fa-calendar"></i> ${ders.gun}</span>
        <span><i class="fa-regular fa-clock"></i> ${ders.saat}</span>
        <span><i class="fa-solid fa-location-dot"></i> ${ders.sinif}</span>
      </div>

      <div class="bilgiler">
        <span class="yapilan-badge">Devamsızlık: <strong>${yapilan}</strong></span>
        <span class="kalan-badge ${durum}">
          Kalan Hak: <strong>${kalan}</strong>
        </span>
      </div>

      <div class="butonlar">
        <button class="azalt" onclick="degistir('${ders.ad}', -1)"><i class="fa-solid fa-rotate-left"></i> Geri Al</button>
        <button class="arttir" onclick="degistir('${ders.ad}', 1)"><i class="fa-solid fa-plus"></i> Ekle</button>
      </div>
    `;

    container.appendChild(div);
  });
}

function degistir(key, miktar) {
  let yapilan = Number(localStorage.getItem(key) || 0);
  
  if (miktar > 0 && yapilan < MAX_DEVAMSIZLIK) {
      yapilan++;
  } else if (miktar < 0 && yapilan > 0) {
      yapilan--;
  }

  localStorage.setItem(key, yapilan);
  yukle();
}

yukle();