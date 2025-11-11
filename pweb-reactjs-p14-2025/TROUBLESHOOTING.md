# 🔧 Troubleshooting Guide

## Error 500: Failed to get books

### Penyebab Umum:
1. **Database belum running**
2. **Migration belum dijalankan**
3. **Seed data belum ada**
4. **Connection string database salah**

### Solusi:

#### 1. Pastikan Backend API Running
```bash
# Masuk ke folder backend (Modul 3)
cd path/to/backend

# Jalankan server
npm run dev
```

#### 2. Cek Database
```bash
# PostgreSQL
psql -U postgres -l

# MySQL
mysql -u root -p -e "SHOW DATABASES;"
```

#### 3. Jalankan Migration
```bash
# Di folder backend
npm run migrate

# Atau dengan Prisma
npx prisma migrate dev
```

#### 4. Jalankan Seeder
```bash
# Di folder backend
npm run seed

# Atau manual seed
npx prisma db seed
```

#### 5. Cek File .env Backend
Pastikan ada konfigurasi database:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
# atau
DATABASE_URL="mysql://user:password@localhost:3306/dbname"
```

#### 6. Test Backend API Manual
```bash
# Windows PowerShell
curl.exe http://localhost:3000/books

# Atau di browser
http://localhost:3000/books
```

---

## Error: Backend tidak merespons

### Solusi:
1. Pastikan backend running di port 3000
2. Cek apakah port 3000 sudah digunakan aplikasi lain
3. Restart backend server

---

## Error CORS

Jika muncul error CORS di console:

### Solusi di Backend:
```javascript
// Di file server backend (app.js / index.js)
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true
}));
```

---

## Tips:
- Selalu cek **Console Browser** (F12) untuk error detail
- Cek **Terminal Backend** untuk log server
- Gunakan **Postman** atau **Thunder Client** untuk test API
