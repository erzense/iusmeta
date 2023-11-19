var sayac = 0;
var sayac2 = 0;
const sayacText = document.getElementById("sayac1");
const sayacText2 = document.getElementById("sayac2");

function arttirSayac() {
  // Sayacı 50'ye kadar arttır
  if (sayac < 10) {
    sayac++; // Sayıyı konsola yazdırabilirsiniz (isteğe bağlı)
  }

  if (sayac2 < 15) {
    sayac2++;
  }
}

// Sayfa yüklendiğinde veya belirli bir olay gerçekleştiğinde kontrol etmek için bir fonksiyon
function kontrolEt() {
  // Hedef div'in pozisyonunu al
  var hedefDivPozisyon = document
    .getElementById("datas-landing")
    .getBoundingClientRect();

  // Eğer hedef div görülebilir bir konumdaysa, sayacı arttır
  if (
    hedefDivPozisyon.top <= window.innerHeight &&
    hedefDivPozisyon.bottom >= 0
  ) {
    arttirSayac();
  }

  sayacText.textContent = sayac;
  sayacText2.textContent = sayac2;
}

// Sayfa yüklendiğinde kontrol et (isteğe bağlı, sayfa yüklenirken sayfa sonunda bir butona tıklama vs. gibi olaylara bağlayabilirsiniz)
window.onload = function () {
  kontrolEt();
};

// Sayfa scroll olduğunda kontrol et

setInterval(kontrolEt, 50);
