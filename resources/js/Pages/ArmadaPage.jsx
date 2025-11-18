import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    PrimaryButton,
    ActionButton,
    SearchInput,
    StatusBadge,
    Modal,
    FormInput,
    FormSelect
} from '@/Components/ReusableUI';
import { Plus } from 'lucide-react';

const ArmadaPage = ({ setHeaderAction }) => {
    const [armadaList, setArmadaList] = useState([]);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [deleteConfirm, setDeleteConfirm] = useState(null); // State untuk konfirmasi hapus

    const api = axios.create({
        headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') }
    });

    // Fetch Data
    const fetchArmada = () => {
        api.get(`/admin/armada?search=${search}`)
            .then(res => setArmadaList(res.data))
            .catch(err => console.error("Gagal mengambil data armada:", err));
    };

    useEffect(() => {
        fetchArmada();
    }, [search]);

    // Menaruh tombol "Tambah Armada" di header layout
    useEffect(() => {
        setHeaderAction(
            <PrimaryButton onClick={() => openModal('add')} icon={Plus}>
                Tambah Armada
            </PrimaryButton>
        );
        // Cleanup saat komponen di-unmount
        return () => setHeaderAction(null);
    }, [setHeaderAction]); // Tambahkan setHeaderAction sebagai dependensi

    const openModal = (mode, data = {}) => {
        setModalMode(mode);
        setFormData(mode === 'add' ? { status_ketersediaan: 'Tersedia' } : { ...data });
        setErrors({});
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({});
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setErrors({});

        const url = modalMode === 'add' ? '/admin/armada' : `/admin/armada/${formData.id_armada}`;
        const method = modalMode === 'add' ? 'post' : 'put';

        api[method](url, formData)
            .then(() => {
                fetchArmada();
                closeModal();
            })
            .catch(err => {
                if (err.response && err.response.status === 422) {
                    setErrors(err.response.data.errors);
                } else {
                    console.error("Gagal menyimpan:", err);
                }
            });
    };

    const handleDelete = (id) => {
        api.delete(`/admin/armada/${id}`)
            .then(() => {
                fetchArmada();
                setDeleteConfirm(null);
            })
            .catch(err => console.error("Gagal menghapus:", err));
    };

    return (
        <>
            <div className="mb-6">
                <SearchInput
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari armada..."
                />
            </div>

            {/* Tabel Armada */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="border-b border-slate-100">
                        <tr className="text-xs font-semibold text-slate-500 uppercase">
                            <th className="py-3 px-2">Nama Armada</th>
                            <th className="py-3 px-2">Nomor Polisi</th>
                            <th className="py-3 px-2">Layanan</th>
                            <th className="py-3 px-2">Jenis</th>
                            <th className="py-3 px-2">Kapasitas</th>
                            <th className="py-3 px-2">Status</th>
                            <th className="py-3 px-2 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-slate-700">
                        {armadaList.length > 0 ? armadaList.map((item) => (
                            <tr key={item.id_armada} className="border-b border-slate-50 hover:bg-slate-50">
                                <td className="py-3.5 px-2 font-medium">{item.nama_armada}</td>
                                <td className="py-3.5 px-2">{item.no_plat}</td>
                                <td className="py-3.5 px-2">{item.layanan}</td>
                                <td className="py-3.5 px-2">{item.jenis_kendaraan}</td>
                                <td className="py-3.5 px-2">{item.kapasitas}</td>
                                <td className="py-3.5 px-2"><StatusBadge status={item.status_ketersediaan} /></td>
                                <td className="py-3.5 px-2 text-right space-x-1">
                                    <ActionButton type="edit" onClick={() => openModal('edit', item)} />
                                    <ActionButton type="delete" onClick={() => setDeleteConfirm(item)} />
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="7" className="text-center py-10 text-slate-400">Tidak ada data armada.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Form Tambah/Edit */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={modalMode === 'add' ? 'Tambah Armada' : 'Edit Armada'}>
                <form onSubmit={handleSave}>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormInput label="Nama Armada" name="nama_armada" value={formData.nama_armada} onChange={handleFormChange} error={errors.nama_armada?.[0]} />
                        <FormInput label="Nomor Polisi" name="no_plat" value={formData.no_plat} onChange={handleFormChange} error={errors.no_plat?.[0]} />
                        <FormInput label="Layanan" name="layanan" value={formData.layanan} onChange={handleFormChange} error={errors.layanan?.[0]} />
                        <FormInput label="Jenis Kendaraan" name="jenis_kendaraan" value={formData.jenis_kendaraan} onChange={handleFormChange} error={errors.jenis_kendaraan?.[0]} />
                        <FormInput label="Kapasitas" name="kapasitas" value={formData.kapasitas} onChange={handleFormChange} error={errors.kapasitas?.[0]} />
                        <FormInput label="Harga Sewa / Hari" name="harga_sewa_per_hari" type="number" value={formData.harga_sewa_per_hari} onChange={handleFormChange} error={errors.harga_sewa_per_hari?.[0]} />
                        <div className="md:col-span-2">
                            <FormSelect label="Status Ketersediaan" name="status_ketersediaan" value={formData.status_ketersediaan} onChange={handleFormChange} error={errors.status_ketersediaan?.[0]}>
                                <option value="Tersedia">Tersedia</option>
                                <option value="Digunakan">Digunakan</option>
                            </FormSelect>
                        </div>
                    </div>
                    {/* Footer Form */}
                    <div className="flex justify-end gap-3 p-5 bg-slate-50 border-t border-slate-100">
                        <button type="button" onClick={closeModal} className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">
                            Batal
                        </button>
                        <button type="submit" className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            Simpan
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal Konfirmasi Hapus */}
            <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Konfirmasi Hapus">
                <div className="p-6">
                    <p className="text-sm text-slate-600">
                        Anda yakin ingin menghapus armada **{deleteConfirm?.nama_armada}** ({deleteConfirm?.no_plat})? Tindakan ini tidak dapat dibatalkan.
                    </p>
                </div>
                <div className="flex justify-end gap-3 p-5 bg-slate-50 border-t border-slate-100">
                    <button type="button" onClick={() => setDeleteConfirm(null)} className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">
                        Batal
                    </button>
                    <button type="button" onClick={() => handleDelete(deleteConfirm.id_armada)} className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
                        Ya, Hapus
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default ArmadaPage;