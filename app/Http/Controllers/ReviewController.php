<?php

namespace App\Http\Controllers;

use App\Models\Ulasan; 
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function getPublicReviews()
    {
       
        $ulasan = Ulasan::with('pengguna') 
                        ->latest('tgl_ulasan') 
                        ->limit(5)            
                        ->get();

    
        return response()->json([
            'status' => 'success',
            'data' => $ulasan
        ]);
    }

   
}