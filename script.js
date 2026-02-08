const MAX_DEVAMSIZLIK = 4;

const dersListesi = [
  { ad: "Görsel Programlama", hoca: "Dr. Öğr. Üyesi Ahmet TAŞ", cinsiyet: "erkek" },
  { ad: "İleri Veritabanı Uygulamaları", hoca: "Dr. Öğr. Üyesi Ahmet TAŞ", cinsiyet: "erkek" },
  { ad: "Yapay Zekanın Temelleri", hoca: "Doç. Dr. Ersin BURNAZ", cinsiyet: "erkek" },
  { ad: "Uygulamalı Veri Madenciliği", hoca: "Doç. Dr. Mehmet KOKOÇ", cinsiyet: "erkek" },
  { ad: "Sistem Analizi ve Tasarımı", hoca: "Doç. Dr. Ayşe ASİLTÜRK", cinsiyet: "kadin" },
  { ad: "Örgütsel Davranış", hoca: "Doç. Dr. Ayşe ASİLTÜRK", cinsiyet: "kadin" },
  { ad: "Finansal Yönetim", hoca: "Doç. Dr. Yusuf GÜNEYSU", cinsiyet: "erkek" },
  { ad: "Envanter Değerleme", hoca: "Doç. Dr. Oğuz Yusuf ATASEL", cinsiyet: "erkek" },
  { ad: "Üretken Yapay Zeka", hoca: "Arş. Gör. Dr. Eda KARACA", cinsiyet: "kadin" }
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

    const emoji = ders.cinsiyet === "erkek" ? "👨‍🏫" : "👩‍🏫";

    const div = document.createElement("div");
    div.className = "ders";
    div.innerHTML = `
      <div class="ders-ust">
        <span class="ders-hoca">${emoji} ${ders.hoca}</span>
      </div>

      <h3>${ders.ad}</h3>

      <div class="bilgiler">
        <span>Yapılan: <strong>${yapilan}</strong></span>
        <span class="kalan ${durum}">
          Kalan: <strong>${kalan}</strong>
        </span>
      </div>

      <div class="butonlar">
        <button class="arttir">+ Devamsızlık</button>
        <button class="azalt">- Geri Al</button>
      </div>
    `;

    div.querySelector(".arttir").onclick = () => degistir(key, 1);
    div.querySelector(".azalt").onclick = () => degistir(key, -1);

    container.appendChild(div);
  });
}

function degistir(key, miktar) {
  let yapilan = Number(localStorage.getItem(key) || 0);
  yapilan = Math.min(MAX_DEVAMSIZLIK, Math.max(0, yapilan + miktar));
  localStorage.setItem(key, yapilan);
  yukle();
}

yukle();
