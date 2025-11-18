import React from 'react';

// --- 1. KOMPONEN TOMBOL (BUTTON) ---

// Tombol Utama (Biru) - Untuk aksi utama seperti Login, Simpan, Cek Harga
export function PrimaryButton({ onClick, children, className = '', type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </button>
  );
}

// Tombol Aksi Kecil (Edit/Hapus) - Biasanya dipakai di tabel admin
export function ActionButton({ type, onClick }) {
  const isEdit = type === 'edit';
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-md hover:bg-gray-100 transition ${isEdit ? 'text-blue-600 hover:text-blue-800' : 'text-red-600 hover:text-red-800'}`}
      title={isEdit ? 'Edit Data' : 'Hapus Data'}
    >
      {isEdit ? '✏️' : '🗑️'}
    </button>
  );
}

// --- 2. KOMPONEN FORM (INPUT) ---

// Input Teks Biasa
export function FormInput({ label, name, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
}

// Input Pilihan (Select/Dropdown)
export function FormSelect({ label, name, value, onChange, error, children }) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        }`}
      >
        {children}
      </select>
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
}

// Input Pencarian
export function SearchInput({ value, onChange, placeholder = "Cari..." }) {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <span className="absolute left-3 top-2.5 text-gray-400 text-lg">🔍</span>
    </div>
  );
}

// --- 3. KOMPONEN LAINNYA ---

// Badge Status (Label warna-warni)
export function StatusBadge({ status }) {
  const isSuccess = ['Tersedia', 'Aktif', 'Selesai', 'Lunas'].includes(status);
  const colorClass = isSuccess 
    ? 'bg-green-100 text-green-800 border border-green-200' 
    : 'bg-blue-100 text-blue-800 border border-blue-200';
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${colorClass}`}>
      {status}
    </span>
  );
}

// Kartu Statistik Dashboard
export function StatCard({ label, value, subtext, iconBgColor = 'bg-blue-500' }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center hover:shadow-md transition-shadow">
            <div className={`p-3 rounded-full ${iconBgColor} text-white mr-4 shadow-sm`}>
                <div className="w-6 h-6 bg-white/20 rounded-full"></div>
            </div>
            <div>
                <h3 className="text-gray-500 text-xs uppercase font-semibold tracking-wider">{label}</h3>
                <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
                {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
            </div>
        </div>
    );
}

// Modal (Pop-up)
export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden transform transition-all scale-100">
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-1 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}