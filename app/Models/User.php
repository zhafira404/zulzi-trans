<?php

namespace App\Models; // Pastikan namespace ini benar

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'user'; // Sesuaikan dengan nama tabel di database
    protected $primaryKey = 'id_pengguna';

    protected $fillable = [
        'role_pengguna',
        'nama',
        'email',
        'password',
        'no_telepon',
        'tgl_daftar',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'tgl_daftar' => 'date',
        'email_verified_at' => 'datetime',
    ];

    public $timestamps = false; // Sesuai ERD (jika tidak pakai created_at/updated_at otomatis)
}