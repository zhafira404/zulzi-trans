// resources/js/layouts/GuestLayout.jsx

import React from 'react';

// Ini adalah 'cangkang' sederhana.
// 'children' adalah halaman (LandingPage) yang akan 'dibungkus'
export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Nanti kita bisa tambahkan <Navbar> di sini */}

      <main>
        {/* Ini adalah tempat LandingPage.jsx kamu akan muncul */}
        {children} 
      </main>

      {/* Nanti kita bisa tambahkan <Footer> di sini */}

    </div>
  );
}