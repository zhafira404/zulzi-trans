import React, { useState, useEffect } from 'react';
import GuestLayout from '../../layouts/GuestLayout'; 
import ServiceCard from '../../components/ServiceCard';
import ReviewCard from '../../components/ReviewCard';
import { getPublicServices } from '../../services/serviceService';
import { getPublicReviews } from '../../services/reviewService';
// Menggunakan tombol seragam dari ReusableUI
import { PrimaryButton } from '../../Components/ReusableUI'; 

export default function LandingPage() { 
  
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const serviceResponse = await getPublicServices();
        const reviewResponse = await getPublicReviews();

        // Logic aman biar gak error map undefined
        const serviceData = serviceResponse.data.data || serviceResponse.data;
        const reviewData = reviewResponse.data.data || reviewResponse.data;

        setServices(Array.isArray(serviceData) ? serviceData : []);
        setReviews(Array.isArray(reviewData) ? reviewData : []);

      } catch (error) {
        console.error("Gagal mengambil data landing page:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); 
  return (
    <GuestLayout>
      
      {/* --- HERO SECTION (Biru Besar) --- */}
      <section className="relative bg-blue-900 text-white py-24 lg:py-32 overflow-hidden">
        {/* Pattern Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-800 text-blue-200 text-sm font-semibold mb-6 tracking-wide uppercase">
            Solusi Logistik Terpercaya
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            PERJALANAN <br className="hidden md:block" />
            <span className="text-blue-400">TANPA BATAS</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Layanan transportasi yang mengutamakan kenyamanan dan keamanan. Kirim barang, sewa mobil, atau angkut sampah dengan mudah.
          </p>
          <div className="flex justify-center gap-4">
             {/* Tombol Utama dari ReusableUI */}
            <PrimaryButton 
              onClick={() => document.getElementById('layanan').scrollIntoView({ behavior: 'smooth' })} 
              className="bg-white text-blue-900 hover:bg-gray-100 border-0 px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Cek Harga Layanan
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* --- STATS BAR (Kotak Putih Mengambang) --- */}
      <section className="relative z-20 -mt-16 container mx-auto px-4">
        <div className="bg-white py-10 px-8 shadow-xl rounded-2xl border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
            <div>
              <span className="block text-4xl font-extrabold text-blue-600 mb-1">5+</span>
              <span className="text-gray-500 text-sm font-medium uppercase tracking-wide">Tahun</span>
            </div>
            <div>
              <span className="block text-4xl font-extrabold text-blue-600 mb-1">50+</span>
              <span className="text-gray-500 text-sm font-medium uppercase tracking-wide">Armada</span>
            </div>
            <div>
              <span className="block text-4xl font-extrabold text-blue-600 mb-1">1K+</span>
              <span className="text-gray-500 text-sm font-medium uppercase tracking-wide">Order</span>
            </div>
            <div>
              <span className="block text-4xl font-extrabold text-blue-600 mb-1">24/7</span>
              <span className="text-gray-500 text-sm font-medium uppercase tracking-wide">Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- LAYANAN KAMI --- */}
      <section id="layanan" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">LAYANAN KAMI</h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">Pilih armada yang sesuai dengan kebutuhan logistik Anda dari berbagai kategori layanan kami.</p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
              <p className="mt-4 text-gray-500 font-medium">Sedang memuat data layanan...</p>
            </div>
          ) : (
            <div className="space-y-20">
              {services.map((service) => (
                <div key={service.id_layanan}>
                  {/* Judul Kategori dengan Icon */}
                  <div className="flex items-center mb-8 pl-2 border-l-4 border-blue-500">
                    <h3 className="text-2xl font-bold text-gray-800 ml-3 uppercase tracking-wide">{service.nama_layanan}</h3>
                  </div>
                  
                  {service.armada && service.armada.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {service.armada.map((item) => (
                        <ServiceCard key={item.id_armada} armada={item} />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white p-10 rounded-xl border border-dashed border-gray-300 text-center">
                      <span className="text-4xl mb-4 block">📭</span>
                      <p className="text-gray-500 font-medium">Belum ada armada tersedia untuk layanan ini.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- TESTIMONI --- */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-50 skew-y-3 transform origin-top-right -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Apa Kata Pelanggan?</h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4">Ulasan asli dari pelanggan yang telah mempercayakan pengirimannya kepada kami.</p>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 py-10">Memuat ulasan...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {reviews.length > 0 ? reviews.map((review) => (
                <ReviewCard key={review.id_ulasan} review={review} />
              )) : (
                <div className="col-span-full text-center text-gray-500 italic py-10 bg-gray-50 rounded-lg">Belum ada ulasan yang ditampilkan. Jadilah yang pertama!</div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* --- CARA PEMESANAN --- */}
      <section className="py-20 bg-gray-50">
         <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Cara Pemesanan Mudah</h2>
                <p className="text-gray-600">Hanya 4 langkah mudah untuk mendapatkan layanan terbaik.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                    { step: '01', title: 'Pilih Layanan', desc: 'Tentukan armada yang sesuai kebutuhan Anda.', icon: '🚛' },
                    { step: '02', title: 'Atur Jadwal', desc: 'Pilih tanggal dan lokasi penjemputan.', icon: '📅' },
                    { step: '03', title: 'Hubungi Kami', desc: 'Konfirmasi pesanan via WhatsApp.', icon: '💬' },
                    { step: '04', title: 'Selesai', desc: 'Armada kami siap melayani Anda.', icon: '✅' }
                ].map((item, index) => (
                    <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 text-center group">
                        <div className="w-16 h-16 bg-blue-50 text-2xl rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {item.icon}
                        </div>
                        <h3 className="font-bold text-xl mb-3 text-gray-800">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                        <span className="block mt-6 text-blue-200 font-bold text-4xl opacity-20 group-hover:opacity-40 transition-opacity">{item.step}</span>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* --- CTA FOOTER --- */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-12 rounded-3xl shadow-2xl text-white relative overflow-hidden">
            {/* Dekorasi lingkaran */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Siap Untuk Memulai Perjalanan?</h2>
            <p className="text-blue-100 mb-10 text-lg relative z-10">Hubungi tim kami sekarang untuk mendapatkan penawaran harga terbaik dan konsultasi gratis untuk kebutuhan logistik Anda.</p>
            <div className="flex justify-center relative z-10">
              <PrimaryButton 
                onClick={() => window.open('https://wa.me/628123456789')} 
                className="bg-white text-blue-700 hover:bg-blue-50 px-10 py-4 text-lg font-bold shadow-lg border-0"
              >
                 Hubungi via WhatsApp
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>

    </GuestLayout>
  );
}