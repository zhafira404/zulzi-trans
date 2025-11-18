import './bootstrap';
import '../css/app.css'; // <--- TAMBAHKAN BARIS INI (Sangat Penting!)
import React from 'react';
import { createRoot } from 'react-dom/client';

// Impor komponen App utama
import AdminPanel from '@/Pages/AdminPanel.jsx';

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <AdminPanel />
        </React.StrictMode>
    );
}