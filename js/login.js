async function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const response = await fetch("data/users.json");
    const users = await response.json();

    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!found) {
      alert("⚠️ Username atau password salah.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(found));
    alert(`Selamat datang, ${found.nama}`);
    window.location.href = "index.html";
  } catch (error) {
    alert("Gagal membaca data pengguna!");
    console.error(error);
  }
}
