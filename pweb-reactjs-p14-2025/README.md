# 📚 PWEB Modul 4 - Lanjutan

Ini adalah repositori lanjutan untuk proyek "IT Literature Shop".

Repositori ini hanya berisi **Frontend** (React.js). Untuk bisa bekerja, kamu **wajib** menjalankan server **Backend** (API Modul 3) secara bersamaan.

---

## 🚦 Prasyarat

Sebelum memulai, pastikan kamu sudah meng-install:

1.  [Node.js](https://nodejs.org/) (versi LTS, misal: 18.x atau 20.x)
2.  Server **PostgreSQL** yang berjalan di komputermu.
3.  Proyek **API Modul 3** (sudah ada di folder terpisah).

---

## 🚀 Cara Setup dan Menjalankan Proyek

Kamu harus menjalankan **2 server sekaligus** di 2 terminal yang berbeda: **Backend** dan **Frontend**.

### 1. 🖥️ Jalankan Server Backend (API Modul 3)

Buka **Terminal 1** dan arahkan ke folder proyek API Modul 3 kamu.

```bash
# 1. Masuk ke folder API Modul 3
# (Contoh: cd ../pweb-express-p14-2025)
cd [path-ke-folder-api-modul-3-kamu]

# 2. Install dependencies (hanya jika belum)
npm install

# 3. Jalankan server backend
npm run dev
```

Server API sekarang seharusnya berjalan di `http://localhost:3000`. Biarkan terminal ini tetap terbuka.

### 2. ⚛️ Jalankan Server Frontend (Proyek Ini)

Buka **Terminal 2** (terminal baru) dan arahkan ke folder ini (`pweb-modul-4-lanjutan`).

```bash
# 1. Masuk ke folder frontend (proyek ini)
# (Kamu sudah di sini jika baru clone)
cd pweb-modul-4-lanjutan

# 2. Install dependencies (WAJIB)
# Ini adalah "cara setup" yang kamu tanyakan
npm install

# 3. Jalankan server frontend
npm run dev
```

Aplikasi React sekarang seharusnya berjalan di `http://localhost:5173`.

### Ringkasan
* **Terminal 1 (Backend):** `npm run dev`
* **Terminal 2 (Frontend):** `npm install`, lalu `npm run dev`
* **Browser:** Buka `http://localhost:5173`

---

## 🌿 Alur Kerja Git (Cara Lanjut Kerja)

Repositori ini sudah memiliki *branch* (cabang) pekerjaan dari Orang 2 dan Orang 3. Kamu tidak perlu membuatnya lagi.

### 1. Pindah ke Branch-mu

Saat baru *clone*, kamu otomatis ada di *branch* `main`. Pindah ke *branch* tugasmu.

**Untuk Orang 2 (Fitur Buku & Cart):**
```bash
git checkout fitur/orang-2-books
```

**Untuk Orang 3 (Fitur Transaksi & UX):**
```bash
git checkout fitur/orang-3-transactions-ux
```

### 2. Mulai Mengerjakan

Setelah pindah *branch*, kamu bisa langsung lanjut *ngoding* dan menjalankan `npm run dev`.

### 3. Menyimpan Pekerjaan

Saat kamu ingin menyimpan perubahanmu:

```bash
# 1. Tambahkan semua file
git add .

# 2. Buat catatan perubahan
git commit -m "feat: [jelaskan perubahanmu, misal: 'memperbaiki halaman detail']"

# 3. Push ke branch-mu (bukan main!)
git push
```

### 4. Menggabungkan Branch (Merge)

Setelah pekerjaanmu atau pekerjaan temanmu selesai, kamu bisa menggabungkannya ke `main` dengan aman di repositori baru ini.

**Cara Terbaik: Pakai Pull Request (PR) di GitHub.**

1.  Pastikan kamu sudah `git push` (langkah 3.3).
2.  Buka GitHub `pweb-modul-4-lanjutan`.
3.  Akan ada tombol kuning untuk membuat "Pull Request" dari *branch*-mu.
4.  Klik, buat PR, lalu klik **"Merge pull request"**.

**Cara Cepat (Lokal):**
```bash
# 1. Pindah ke main dan ambil update terbaru
git checkout main
git pull origin main

# 2. Tarik (merge) branch-mu ke main
# (Contoh untuk Orang 3)
git merge fitur/orang-3-transactions-ux

# 3. Push main yang sudah digabung
git push origin main
```