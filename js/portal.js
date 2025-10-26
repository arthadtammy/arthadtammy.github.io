const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "login.html";

// Ucapan selamat datang
const welcomeEl = document.getElementById("welcomeText");
const roleEl = document.getElementById("userRoleInfo");

if (user.role === "lurah") {
  welcomeEl.textContent = `Selamat Datang, ${user.nama}`;
  roleEl.textContent = `Anda login sebagai Lurah Kelurahan ${user.wilayah}.`;
} else {
  welcomeEl.textContent = `Selamat Datang, ${user.nama}`;
  roleEl.textContent = `Anda login sebagai ${user.nama}.`;
}

// Jam real-time
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleString("id-ID");
}
setInterval(updateClock, 1000);
updateClock();

// IP publik
fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => {
    document.getElementById("ip").textContent = data.ip;
  })
  .catch(() => {
    document.getElementById("ip").textContent = "Tidak diketahui";
  });

// Info device
document.getElementById("device").textContent = navigator.userAgent;

// Logout
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
