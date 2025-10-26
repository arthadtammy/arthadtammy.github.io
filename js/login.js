// Fungsi untuk hashing password jadi SHA-256
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Tangkap form login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("errorMessage");

  try {
    // Ambil data users.json
    const res = await fetch("data/users.json");
    const users = await res.json();

    // Hash password input
    const hashed = await hashPassword(password);

    // Cek apakah username dan hash password cocok
    const found = users.find(
      (u) => u.username === username && u.password === hashed
    );

    if (found) {
      // Simpan sesi login
      localStorage.setItem("loggedUser", username);
      window.location.href = "index.html"; // pindah ke portal utama
    } else {
      errorMessage.textContent = "❌ Username atau password salah!";
    }
  } catch (error) {
    console.error("Gagal memproses login:", error);
    errorMessage.textContent = "⚠️ Tidak dapat mengakses data pengguna.";
  }
});
