<?php

use Illuminate\Support\Facades\Route;

// 1. Import semua Controller yang kita perlukan
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ArmadaController;
use App\Http\Controllers\PenggunaController; // Controller baru

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// 2. Alihkan homepage (/) ke dashboard admin
Route::get('/', function () {
    // Arahkan langsung ke /admin/dashboard
    return redirect('/admin/dashboard'); 
});

// 3. Grup untuk API (Backend)
// Route ini harus didefinisikan SEBELUM route SPA
Route::prefix('admin')->group(function () {
    
    // API untuk Dashboard
    Route::get('/dashboard-stats', [DashboardController::class, 'getStats']);

    // API untuk Armada (Resource CRUD)
    Route::apiResource('armada', ArmadaController::class)->parameters([
        'armada' => 'id_armada' // Menyesuaikan parameter
    ]);

    // API untuk Pengguna (Resource Index & Delete)
    Route::get('/pengguna', [PenggunaController::class, 'index']);
    Route::delete('/pengguna/{id_pengguna}', [PenggunaController::class, 'destroy']);

    // Tambahkan API lain di sini...
});


// 4. Route untuk Single Page Application (SPA) React
// Route ini HARUS menjadi yang TERAKHIR.
// Ini akan menangkap /admin, /admin/dashboard, /admin/armada, dll.
// dan membiarkan React (AdminPanel.jsx) yang mengatur halaman mana yang tampil.
Route::get('/admin/{any?}', function () {
    return view('admin'); // Arahkan ke file admin.blade.php
})->where('any', '.*')->name('admin.panel');