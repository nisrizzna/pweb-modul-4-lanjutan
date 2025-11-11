# ⚠️ MASALAH TERIDENTIFIKASI!

## 🔴 Backend Yang Salah Sedang Running!

### Yang Running Sekarang:
- **Port 3000:** Angular App (frontend lain, bukan API)
- ❌ **Backend Express API tidak running**

### Bukti:
Response dari `http://localhost:3000/books` adalah **HTML Angular**, bukan JSON API.

---

## ✅ SOLUSI:

### 1️⃣ Stop Process Yang Salah di Port 3000

#### Cara 1 - Kill by Process ID:
```powershell
# Lihat PID dari netstat tadi: 3128
taskkill /PID 3128 /F
```

#### Cara 2 - Paksa stop semua Node di port 3000:
```powershell
# Cari PID
$pid = (Get-NetTCPConnection -LocalPort 3000).OwningProcess
# Kill
Stop-Process -Id $pid -Force
```

---

### 2️⃣ Jalankan Backend API Yang Benar

```powershell
# Masuk ke folder backend EXPRESS (Modul 3)
cd "C:\054_Modul 3 Pweb\pweb-express-p14-2025"

# Pastikan ini folder Express API (cek package.json)
cat package.json | Select-String "express"

# Jalankan
npm run dev
```

**PENTING:** Pastikan yang jalan adalah Express API, bukan Angular/frontend lain!

---

### 3️⃣ Verifikasi Backend Sudah Benar

Test endpoint harus return **JSON**, bukan HTML:

```powershell
curl.exe http://localhost:3000/books
```

**Expected Output (JSON):**
```json
{
  "success": true,
  "message": "...",
  "data": [ ... array of books ... ]
}
```

**❌ Jika masih HTML:** Backend yang salah masih running!

---

### 4️⃣ Refresh Frontend React

Setelah backend Express API running:
1. Kembali ke browser `http://localhost:5173`
2. Refresh halaman (F5)
3. Atau klik tombol "🔄 Coba Lagi"

---

## 📋 Checklist Final:

- [ ] Stop process yang salah di port 3000
- [ ] Masuk ke folder Express API: `C:\054_Modul 3 Pweb\pweb-express-p14-2025`
- [ ] Jalankan `npm run dev` di folder Express API
- [ ] Test `curl http://localhost:3000/books` → harus return JSON
- [ ] Refresh frontend React di browser

---

## 🔍 Cara Bedakan Express API vs Angular:

### Express API (Yang Benar):
- Ada file `src/index.js` atau `src/server.js`
- `package.json` dependency: `"express"`
- Response API: JSON format
- Port default: 3000

### Angular App (Yang Salah):
- Ada folder `src/app/`
- `package.json` dependency: `"@angular/core"`
- Response: HTML
- Port default: 4200 (tapi bisa di-set ke 3000)

---

**IKUTI LANGKAH 1-4 SECARA BERURUTAN!** ✅
