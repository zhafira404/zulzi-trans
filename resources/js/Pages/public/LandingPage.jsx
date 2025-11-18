// resources/js/Pages/public/LandingPage.jsx

import React, { useState, useEffect } from 'react';
import GuestLayout from '../../layouts/GuestLayout'; 
import { getPublicServices } from '../../services/serviceService';
import { getPublicReviews } from '../../services/reviewService';

// (Kamu mungkin perlu buat 2 komponen card ini nanti)
// import ServiceCard from '../../components/ServiceCard'; 
// import ReviewCard from '../../components/ReviewCard';

// 1. INI SOLUSI UNTUK ERROR CONSOLE
// Kita pastikan kita pakai 'export default'
export default function LandingPage() { 
  
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const serviceResponse = await getPublicServices();
        const reviewResponse = await getPublicReviews();

        setServices(serviceResponse.data.data); 
        setReviews(reviewResponse.data.data);

      } catch (error) {
        console.error("Gagal mengambil data landing page:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // 2. INI SOLUSI UNTUK NAMA KOLOM
  return (
    <GuestLayout>
      {/* --- Bagian 1: Hero Section (Statis) --- */}
      <section className="bg-blue-800 text-white text-center p-20">
        <h1 className="text-5xl font-bold">PERJALANAN TANPA BATAS</h1>
        <p className="mt-4">Solusi pengiriman barang, rental mobil, dan buang sampah terpercaya.</p>
      </section>

      {/* --- Bagian 2: Layanan Kami (Data Benar) --- */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">LAYANAN KAMI</h2>
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-gray-500">Memuat layanan...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id_layanan} className="border p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-2">{service.nama_layanan}</h3>
                  
                  {service.armada && service.armada.length > 0 ? (
                    service.armada.map((item) => (
                      <div key={item.id_armada} className="border-t mt-2 pt-2">
                         {/* NAMA KOLOM BENAR SESUAI ERD */}
                         {/* <img src={item.gambar_url} alt={item.model} /> */} {/* (gambar_url belum ada di ERD, tambahkan nanti) */}
                         <p className="font-semibold">{item.model}</p>
                         <p>Rp {item.harga_sewa_per_hari} / hari</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Belum ada armada tersedia.</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- Bagian 3: Ulasan (Data Benar) --- */}
      <section className="bg-gray-100 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Apa Kata Pelanggan Kami</h2>
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-gray-500">Memuat ulasan...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {reviews.map((review) => (
                <div key={review.id_ulasan} className="border p-4 bg-white rounded-lg shadow-lg">
                  {review.pengguna ? (
                    <div className="flex items-center mb-2">
                      {/* NAMA KOLOM BENAR SESUAI ERD */}
                      {/* <img src={review.pengguna.foto_profil} alt={review.pengguna.nama} className="w-10 h-10 rounded-full mr-3" /> */}
                      <h4 className="font-bold">{review.pengguna.nama}</h4>
                    </div>
                  ) : (
                    <h4 className="font-bold">Pengguna Anonim</h4>
                  )}
                  
                  {/* NAMA KOLOM BENAR SESUAI ERD */}
                  <p className="text-gray-600 italic">"{review.komentar}"</p>
                  <p className="text-yellow-500 mt-2">
                    ★ {((review.rating_driver + review.rating_kendaraan + review.rating_pelayanan) / 3).toFixed(1)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* (Tambahkan bagian Statis: Stats, Cara Pemesanan, dan CTA di sini) */}

    </GuestLayout>
  );
}