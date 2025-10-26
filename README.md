# Aplikasi Kontrol Manajemen Camat Dumai Kota (Versi Statis)

Dokumentasi singkat untuk versi statis (HTML + JS) dari aplikasi internal *Aplikasi Kontrol Manajemen Camat Dumai Kota*. Versi ini dirancang untuk dijalankan sebagai situs statis (mis. GitHub Pages) tanpa kebutuhan Node.js atau proses build.

---

## Fitur dasar

* Halaman **Login** (verifikasi terhadap daftar pengguna yang di-hash)
* **Portal** setelah login menampilkan: logo, tanggal/hari (bahasa Indonesia), jam real-time, IP publik, info perangkat, dan tombol menuju modul (Disposisi & Agenda)
* Logout (menghapus sesi di `localStorage`)

---

## Struktur file (ringkasan)

```
aplikasi-camat/
├── index.html        # Portal utama (setelah login)
├── login.html        # Halaman login
├── css/
│   └── style.css     # Styling tema hijau-putih
├── js/
│   ├── login.js      # Logika login (hashing + verifikasi)
│   └── portal.js     # Jam, IP, device, logout
├── data/
│   └── users.json    # (daftar pengguna dalam format JSON)
└── assets/
    └── Lambang_Kota_Dumai.png
```

> Catatan: file struktur di atas hanya contoh organisasi proyek. Sesuaikan nama folder jika perlu.

---

## Cara kerja login (ringkasan)

1. Pengguna memasukkan `username` dan `password` di halaman login.
2. Browser meng-hash password dengan algoritma **SHA-256**.
3. Hasil hash dibandingkan dengan daftar hash pengguna.
4. Jika cocok → sesi login disimpan di `localStorage` dan pengguna diarahkan ke portal.

**Penting:** mekanisme ini hanya cocok untuk penggunaan internal atau lingkungan yang terkontrol. Jangan mengandalkan ini sebagai pengganti autentikasi server-side untuk layanan publik.

---

## Menjalankan secara lokal (untuk uji cepat)

Browser memblokir akses file lokal ke resource lain, jadi jalankan lewat server HTTP sederhana bila ingin menguji `fetch()` pada file JSON.

Contoh cara cepat (Python 3):

```bash
# dari dalam folder aplikasi-camat/
python3 -m http.server 8000
# lalu buka http://localhost:8000/login.html
```

Atau cukup upload ke GitHub Pages (lihat bagian Deploy).

---

## Deploy ke GitHub Pages (cara cepat)

1. Siapkan repository publik bernama `arthadtammy.github.io` atau repo lain lalu aktifkan Pages.
2. Upload seluruh isi folder statis (isi `aplikasi-camat/`) ke branch yang digunakan GitHub Pages (biasanya `main` atau `gh-pages`).
3. Akses situs di `https://<username>.github.io/`.

> Pastikan file data pengguna tidak disimpan di repo publik jika berisi informasi sensitif. Untuk keamanan, simpan data pengguna hanya pada repo private atau di lingkungan yang aman.

---

## Format data pengguna (contoh objek)

Berikut contoh format objek pengguna yang digunakan aplikasi (hanya contoh, **jangan** masukkan password asli):

```json
{
  "username": "nama_pengguna",
  "password": "<SHA-256 hash dari password>"
}
```

**Cara menambah pengguna:**

* Buat username baru.
* Buat password yang kuat.
* Hash password dengan SHA-256.
* Tambahkan objek pengguna baru ke daftar JSON.

> README ini **tidak** mengungkapkan lokasi file password/hash. Simpan daftar pengguna di tempat yang aman dan hanya di repo private atau server yang terkontrol.

---

## Rekomendasi keamanan

* Simpan data pengguna hanya di repo private jika memungkinkan.
* Gunakan HTTPS (GitHub Pages sudah HTTPS).
* Ganti password secara berkala dan gunakan password yang kuat.
* Pertimbangkan upgrade ke autentikasi server-side (mis. sederhana dengan Node.js + database kecil) jika aplikasi dipakai oleh banyak orang atau harus mematuhi kebijakan keamanan lebih ketat.

---

## Lisensi & Hak Cipta

© 2025 Pemerintah Kota Dumai — Kecamatan Dumai Kota

Dikembangkan untuk mendukung administrasi internal kecamatan.
