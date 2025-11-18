import React from 'react';
import ReactDOM from 'react-dom/client';

// Impor CSS utama (Tailwind, dll)
import '../css/app.css'; 

// Impor halaman yang mau kita tes
import LandingPage from './Pages/public/LandingPage'; 
// (Pastikan path ke LandingPage.jsx kamu sudah benar)

// Ini adalah kode yang "menyalakan" React
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Untuk sekarang, kita tes tampilkan 1 halaman dulu */}
    <LandingPage /> 
  </React.StrictMode>
);