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
