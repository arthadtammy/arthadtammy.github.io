// Tampilkan data user login
const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "login.html";

document.getElementById("userNama").textContent = user.nama;
document.getElementById("userRole").textContent = user.role.toUpperCase();

// Jam real-time
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleString("id-ID");
}
setInterval(updateClock, 1000);
updateClock();

// Info IP publik
fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => {
    document.getElementById("ip").textContent = data.ip;
  })
  .catch(() => {
    document.getElementById("ip").textContent = "Tidak diketahui";
  });

// Info device/browser
document.getElementById("device").textContent = navigator.userAgent;

// Logout
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
