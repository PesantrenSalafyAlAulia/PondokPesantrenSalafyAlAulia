# Setup Supabase untuk Pesantren Gallery

## Kredensial Admin
- **Email**: `admin@pesantren.com`
- **Password**: `AdminPesantren2024!`

## Langkah Setup

### 1. Setup Database (Manual di Supabase Dashboard)

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Buka **SQL Editor**
4. Copy-paste isi file `database/setup.sql` dan jalankan
5. Pastikan tidak ada error

### 2. Setup Storage Bucket

1. Di Supabase Dashboard, buka **Storage**
2. Klik **Create Bucket**
3. Nama bucket: `galeri-pesantren`
4. Centang **Public bucket**
5. Klik **Create bucket**

### 3. Setup Storage Policies

Jalankan SQL berikut di SQL Editor:

```sql
-- Allow public to view files
CREATE POLICY "Public can view gallery files" ON storage.objects
    FOR SELECT USING (bucket_id = 'galeri-pesantren');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload gallery files" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'galeri-pesantren' 
        AND auth.role() = 'authenticated'
        AND (storage.extension(name) = ANY(ARRAY['jpg', 'jpeg', 'png', 'webp', 'gif']))
    );

-- Allow users to delete their own files
CREATE POLICY "Users can delete own gallery files" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'galeri-pesantren' 
        AND auth.uid() IS NOT NULL
    );
```

### 4. Buat User Admin

Jalankan script setup:

```bash
node setup-simple.js
```

Atau buat manual di **Authentication > Users**:
- Email: `admin@pesantren.com`
- Password: `AdminPesantren2024!`
- Confirm password: `AdminPesantren2024!`

### 5. Test Login

1. Buka `http://localhost:5500/admin.html`
2. Login dengan:
   - Email: `admin@pesantren.com`
   - Password: `AdminPesantren2024!`
3. Coba upload gambar
4. Cek galeri di `http://localhost:5500/galeri.html`

## Troubleshooting

### Jika Login Gagal
- Pastikan email confirmation sudah dilakukan (cek inbox)
- Coba reset password di Supabase Dashboard
- Pastikan RLS policies sudah aktif

### Jika Upload Gagal
- Pastikan bucket `galeri-pesantren` sudah dibuat
- Pastikan storage policies sudah dijalankan
- Cek file size (max 2MB) dan format (JPG/PNG/GIF)

### Jika Galeri Kosong
- Pastikan bucket public
- Cek apakah ada file di Storage > galeri-pesantren
- Pastikan tidak ada error di browser console

## Konfigurasi Supabase

File `supabaseClient.js` sudah dikonfigurasi dengan:
- URL: `https://avtatuxrcjostwpwopol.supabase.co`
- Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- Bucket: `galeri-pesantren`

Jika perlu mengganti, edit file tersebut atau set environment variables.