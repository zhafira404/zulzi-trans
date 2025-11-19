<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Zulzi Trans</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Montserrat:wght@700&display=swap" rel="stylesheet">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset('css/landing.css') }}">
        @yield('head')
    </head>
    <body>
        <div class="site">
            @if (Route::has('login'))
                <div class="top-auth">
                    @auth
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a href="{{ route('login') }}">Log in</a>
                        @if (Route::has('register'))
                            <a href="{{ route('register') }}">Register</a>
                        @endif
                    @endauth
                </div>
            @endif

            <section class="hero">
              <div class="container hero-inner">
                <nav class="top-nav">
                  <div class="logo">
                    <img src="{{ asset('images/logo.png') }}" alt="Zulzi Trans">
                  </div>
                  <div class="nav-links">
                    <a href="#">Beranda</a>
                    <a href="#layanan">Pemesanan</a>
                    <a href="#">Tentang Kami</a>
                    <a class="btn btn-outline" href="{{ route('login') }}>Login</a>
                  </div>
                </nav>

                <div class="hero-content">
                  <div class="hero-text">
                    <p class="eyebrow">TRANSPORTASI PREMIUM</p>
                    <h1>PERJALANAN <span class="accent">TANPA BATAS</span></h1>
                    <p class="lead">Layanan transportasi yang mengutamakan kenyamanan dan keamanan</p>
                    <div class="hero-ctas">
                      <a href="#layanan" class="btn btn-primary">Pesan Sekarang</a>
                      <a href="#layanan" class="btn btn-ghost">Lihat Layanan</a>
                    </div>
                  </div>
                  <div class="hero-illustration">
                    <img src="{{ asset('images/hero-truck.png') }}" alt="truck illustration">
                  </div>
                </div>
              </div>
            </section>

            <section id="layanan" class="services-section container">
              <h2 class="section-title">LAYANAN KAMI</h2>
              <p class="section-sub">Berbagai pilihan kendaraan dan layanan transportasi untuk memenuhi kebutuhan bisnis dan pribadi Anda</p>

              <div class="services-grid">
                {{-- contoh penggunaan komponen, loop di controller lebih baik --}}
                @include('components.service-card', ['title'=>'Pick Up','img'=>'services/pickup.jpg','badge'=>'Pick Up','color'=>'#0b5c8a'])
                @include('components.service-card', ['title'=>'CDE','img'=>'services/cde.jpg','badge'=>'CDE','color'=>'#0b6b3a'])
                @include('components.service-card', ['title'=>'CDD','img'=>'services/cdd.jpg','badge'=>'CDD','color'=>'#0b6b3a'])
                @include('components.service-card', ['title'=>'Fuso','img'=>'services/fuso.jpg','badge'=>'Fuso','color'=>'#0b6b3a'])
                @include('components.service-card', ['title'=>'Tronton','img'=>'services/tronton.jpg','badge'=>'Tronton','color'=>'#0b6b3a'])
                @include('components.service-card', ['title'=>'Truck','img'=>'services/truck.jpg','badge'=>'Truck','color'=>'#0b6b3a'])
              </div>
            </section>

            <section class="testimonials container">
              <h2 class="section-title">Apa Kata Pelanggan Kami</h2>
              <div class="testimonial-carousel" id="testimonialCarousel">
                <div class="slides">
                  <div class="slide">
                    <div class="testimonial-card">
                      <p class="quote">"Layanan cepat dan profesional."</p>
                      <div class="author">— Ahmad Rizki</div>
                    </div>
                  </div>
                  <div class="slide">
                    <div class="testimonial-card">
                      <p class="quote">"Armada lengkap dan sopir ramah."</p>
                      <div class="author">— Sari Dewi</div>
                    </div>
                  </div>
                  <div class="slide">
                    <div class="testimonial-card">
                      <p class="quote">"Rekomendasi untuk kebutuhan logistik."</p>
                      <div class="author">— Budi Santoso</div>
                    </div>
                  </div>
                </div>
                <div class="carousel-controls">
                  <button class="prev">‹</button>
                  <button class="next">›</button>
                </div>
              </div>
            </section>

            <section class="stats container">
              <div class="stats-grid">
                <div class="stat"><h3>5+</h3><p>tahun pengalaman</p></div>
                <div class="stat"><h3>50+</h3><p>armada tersedia</p></div>
                <div class="stat"><h3>1K+</h3><p>pelanggan setia</p></div>
                <div class="stat"><h3>24/7</h3><p>layanan</p></div>
              </div>
            </section>

            <section class="how container">
              <h2 class="section-title">Cara Pemesanan</h2>
              <div class="steps-grid">
                <div class="step">
                  <div class="number">01</div>
                  <h4>Tentukan Layanan</h4>
                  <p>Pilih jenis layanan & kendaraan yang sesuai kebutuhan Anda.</p>
                </div>
                <div class="step">
                  <div class="number">02</div>
                  <h4>Jadwalkan</h4>
                  <p>Tentukan waktu penjemputan atau pengiriman.</p>
                </div>
                <div class="step">
                  <div class="number">03</div>
                  <h4>Hubungi Kami</h4>
                  <p>Hubungi via WhatsApp atau telepon untuk konfirmasi.</p>
                </div>
                <div class="step">
                  <div class="number">04</div>
                  <h4>Selesai</h4>
                  <p>Layanan kami siap melayani sampai tujuan.</p>
                </div>
              </div>

              <div class="cta-box">
                <p>Siap Untuk Mulai Perjalanan Anda?</p>
                <a href="#layanan" class="btn btn-primary">Pesan Sekarang</a>
              </div>
            </section>

            <footer class="footer">
              <div class="container">
                <div class="footer-inner">
                  <div class="brand">
                    <img src="{{ asset('images/logo.png') }}" alt="Zulzi Trans">
                    <p>Solusi transportasi terpercaya untuk segala kebutuhan bisnis Anda.</p>
                  </div>
                  <div class="footer-links">
                    <div>
                      <h4>Layanan Kami</h4>
                      <ul>
                        <li><a href="#">Angkut Barang</a></li>
                        <li><a href="#">Angkut Sampah</a></li>
                        <li><a href="#">Rental Mobil</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4>Link Cepat</h4>
                      <ul>
                        <li><a href="#">Beranda</a></li>
                        <li><a href="#">Pemesanan</a></li>
                        <li><a href="#">Tentang Kami</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4>Kontak Kami</h4>
                      <ul>
                        <li><a href="#">zulzi.trans</a></li>
                        <li><a href="#">zulzi.trans</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="copyright">© {{ date('Y') }} Zulzi Trans. All rights reserved.</div>
              </div>
            </footer>

        </div>

        <script src="{{ asset('js/landing.js') }}"></script>
        @yield('scripts')
    </body>
</html>
