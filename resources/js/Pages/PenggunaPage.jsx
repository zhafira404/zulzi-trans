import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    ActionButton,
    SearchInput,
    Modal
} from '@/Components/ReusableUI.jsx'; // Perbaikan: Menambahkan .jsx

const PenggunaPage = ({ setHeaderAction }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null); // State untuk konfirmasi hapus

    const api = axios.create({
        headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') }
    });

    // Mock Data (Ganti dengan API call)
    const mockUsers = [
        { id_pengguna: 1, nama: 'Ahmad Supardi', email: 'ahmad@example.com', no_telepon: '081234567890' },
        { id_pengguna: 2, nama: 'Budi Santoso', email: 'budi@example.com', no_telepon: '081234567891' },
        { id_pengguna: 3, nama: 'Citra Dewi', email: 'citra@example.com', no_telepon: '081234567892' },
    ];

    // Fetch Data
    const fetchUsers = () => {
        // GANTI DENGAN ENDPOINT API PENGGUNA ANDA (lihat README_IMPLEMENTASI.md)
        console.log("Fetching pengguna...");
        // api.get(`/admin/pengguna?search=${search}`)
        //     .then(res => setUsers(res.data))
        //     .catch(err => {
        //         console.error("Gagal mengambil data pengguna, menggunakan mock:", err);
                setUsers(mockUsers.filter(u => 
                    u.nama.toLowerCase().includes(search.toLowerCase()) ||
                    u.email.toLowerCase().includes(search.toLowerCase())
                ));
            // });
    };

    useEffect(() => {
        fetchUsers();
    }, [search]);

    // Kosongkan header action saat masuk halaman ini
    useEffect(() => {
        setHeaderAction(null);
        return () => setHeaderAction(null);
    }, [setHeaderAction]); // Tambahkan setHeaderAction sebagai dependensi

    const handleDelete = (id) => {
        // GANTI DENGAN ENDPOINT API PENGGUNA ANDA
        // api.delete(`/admin/pengguna/${id}`)
        //     .then(() => {
        //         fetchUsers();
        //         setDeleteConfirm(null);
        //     })
        //     .catch(err => console.error("Gagal menghapus:", err));
        
        // Simulasi hapus
        console.log("Menghapus user", id);
        setUsers(users.filter(u => u.id_pengguna !== id));
        setDeleteConfirm(null);
    };

    return (
        <>
            <div className="mb-6">
                <SearchInput
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari pengguna (nama, email)..."
                />
            </div>

            {/* Tabel Pengguna */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="border-b border-slate-100">
                        <tr className="text-xs font-semibold text-slate-500 uppercase">
                            <th className="py-3 px-2">Nama</th>
                            <th className="py-3 px-2">Email</th>
                            <th className="py-3 px-2">Telepon</th>
                            <th className="py-3 px-2 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-slate-700">
                        {users.length > 0 ? users.map((user) => (
                            <tr key={user.id_pengguna} className="border-b border-slate-50 hover:bg-slate-50">
                                <td className="py-3.5 px-2 font-medium">{user.nama}</td>
                                <td className="py-3.5 px-2">{user.email}</td>
                                <td className="py-3.5 px-2">{user.no_telepon}</td>
                                <td className="py-3.5 px-2 text-right">
                                    <ActionButton type="delete" onClick={() => setDeleteConfirm(user)} />
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="4" className="text-center py-10 text-slate-400">Tidak ada data pengguna.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Konfirmasi Hapus Pengguna */}
            <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Konfirmasi Hapus">
                <div className="p-6">
                    <p className="text-sm text-slate-600">
                        Anda yakin ingin menghapus pengguna **{deleteConfirm?.nama}** ({deleteConfirm?.email})? Tindakan ini tidak dapat dibatalkan.
                    </p>
                </div>
                <div className="flex justify-end gap-3 p-5 bg-slate-50 border-t border-slate-100">
                    <button type="button" onClick={() => setDeleteConfirm(null)} className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">
                        Batal
                    </button>
                    <button type="button" onClick={() => handleDelete(deleteConfirm.id_pengguna)} className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
                        Ya, Hapus
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default PenggunaPage;