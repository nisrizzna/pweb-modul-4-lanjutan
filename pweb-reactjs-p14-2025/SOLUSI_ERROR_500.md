# 🚨 SOLUSI ERROR 500: Failed to get books

## Masalah Anda:
✅ Frontend berjalan dengan baik di `http://localhost:5173`
✅ Login berhasil (token tersimpan)
❌ **Error 500 saat load books** - "Failed to get books"

---

## 🔍 Diagnosa
Error 500 = **Backend API bermasalah**, bukan frontend!

Kemungkinan penyebab:
1. ❌ Database belum running
2. ❌ Prisma migration belum dijalankan
3. ❌ Seed data belum ada
4. ❌ Backend server error/crash

---

## ✅ LANGKAH PERBAIKAN

### 1️⃣ Pastikan Database Running

#### Jika pakai PostgreSQL:
```powershell
# Cek service PostgreSQL
Get-Service postgresql*

# Jika tidak running, start:
Start-Service postgresql-x64-14  # Sesuaikan versi Anda
```

#### Jika pakai MySQL:
```powershell
# Cek service MySQL
Get-Service mysql*

# Jika tidak running, start:
Start-Service MySQL80  # Sesuaikan versi Anda
```

---

### 2️⃣ Jalankan Backend API

Buka **Terminal BARU** (jangan di terminal frontend):

```powershell
# Masuk ke folder backend
cd "C:\054_Modul 3 Pweb\pweb-express-p14-2025"

# Jalankan backend
npm run dev
```

**PENTING:** 
- Jangan tutup terminal ini!
- Pastikan muncul pesan seperti: `Server running on port 3000`
- Cek apakah ada error di terminal backend

---

### 3️⃣ Jalankan Prisma Migration

Jika backend berhasil jalan tapi masih error 500, jalankan migration:

```powershell
# Di folder backend yang sama
npx prisma migrate dev

# Atau reset database (HATI-HATI: data hilang!)
npx prisma migrate reset
```

---

### 4️⃣ Seed Database (Isi Data Dummy)

Setelah migration, isi database dengan data dummy:

```powershell
# Di folder backend
npx prisma db seed

# Atau jika ada script seed custom:
npm run seed
```

---

### 5️⃣ Test Backend Manual

Test apakah backend sudah bisa diakses:

```powershell
# Test endpoint books
curl.exe http://localhost:3000/books

# Harusnya return JSON, bukan error
```

---

### 6️⃣ Refresh Frontend

Setelah backend OK:
1. Kembali ke browser frontend
2. Klik tombol **"🔄 Coba Lagi"** yang muncul di error message
3. Atau refresh halaman (F5)

---

## 📋 Checklist Troubleshooting

- [ ] Database service running (PostgreSQL/MySQL)
- [ ] Backend server running di port 3000
- [ ] Tidak ada error di terminal backend
- [ ] Prisma migration sudah dijalankan
- [ ] Seed data sudah ada
- [ ] Test `curl http://localhost:3000/books` berhasil
- [ ] Frontend bisa load books

---

## 🆘 Masih Error?

### Cek Log Backend
Lihat terminal backend, cari error message seperti:
- `Cannot connect to database`
- `Table 'books' doesn't exist`
- `ECONNREFUSED`

### Cek .env Backend
File `.env` di folder backend harus ada:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
# atau
DATABASE_URL="mysql://user:password@localhost:3306/dbname"

JWT_SECRET="your-secret-key-here"
```

### Cek Prisma Schema
File `prisma/schema.prisma` harus ada model `Book`:
```prisma
model Book {
  id        Int      @id @default(autoincrement())
  title     String
  author    String
  price     Float
  stock     Int
  // ... fields lainnya
}
```

---

## 📞 Quick Commands

```powershell
# Terminal 1 - Backend
cd "C:\054_Modul 3 Pweb\pweb-express-p14-2025"
npm run dev

# Terminal 2 - Frontend (sudah running)
# Jangan diapa-apain, biarkan jalan

# Terminal 3 - Test (optional)
curl.exe http://localhost:3000/books
```

---

**Ikuti langkah-langkah di atas secara berurutan!** ✅
