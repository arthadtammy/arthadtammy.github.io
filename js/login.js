async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const response = await fetch("data/users.json");
  const users = await response.json();

  const hashPassword = await sha256(password);
  const found = users.find(
    (u) => u.username === username && u.password === hashPassword
  );

  if (!found) {
    alert("⚠️ Username atau password salah.");
    return;
  }

  localStorage.setItem("user", JSON.stringify(found));
  alert(`Selamat datang, ${found.nama}`);
  window.location.href = "index.html";
}
