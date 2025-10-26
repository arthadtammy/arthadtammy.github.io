// Pastikan user sudah login
const user = localStorage.getItem("loggedUser");
if (!user) {
  window.location.href = "login.html";
}

// Elemen tampilan
const tanggalEl = document.getElementById("tanggal");
const waktuEl = document.getElementById("waktu");
const ipEl = document.getElementById("ip");
const deviceEl = document.getElementById("device");
const welcomeEl = document.getElementById("welcome");

// ✅ Peta username ke nama/jabatan resmi
const userMap = {
  "cdk": "Tammy Arthadinata, S.STP,M.Si",
  "camat": "Camat Dumai Kota",
  "sekcam": "Sekretaris Kecamatan Dumai Kota",
  "subagtu": "Sub Bagian Tata Usaha Dumai Kota"
};

// Tampilkan sambutan sesuai user
if (user && welcomeEl) {
  const displayName = userMap[user] || user;
  welcomeEl.textContent = `👋 Selamat datang, ${displayName}`;
}

// Format tanggal dan waktu Indonesia
function updateDateTime() {
  const now = new Date();
  const tanggal = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  const waktu = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  tanggalEl.textContent = `📅 ${tanggal}`;
  waktuEl.textContent = `🕒 ${waktu}`;
}

// Ambil IP publik
async function getIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    ipEl.textContent = `🌐 IP Publik: ${data.ip}`;
  } catch {
    ipEl.textContent = "⚠️ Tidak dapat mengambil IP publik";
  }
}

// Tampilkan info perangkat
deviceEl.textContent = `💻 Perangkat: ${navigator.userAgent}`;

// Jalankan realtime update
updateDateTime();
setInterval(updateDateTime, 1000);
getIP();

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
});
