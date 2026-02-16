"use client";

export default function AdminPanel({ formData, setFormData, setFile, onSave, onCancel, isEditing }: any) {
  return (
    <div className="bg-white dark:bg-[#1f1f1f] p-6 rounded-2xl border-2 border-dashed border-[#4caf50] mb-8 text-black dark:text-white">
      <h3 className="text-lg font-bold mb-4">{isEditing ? `Edit Produk: ${formData.oldName}` : 'Tambah Produk Baru'}</h3>
      <div className="space-y-3">
        <input className="w-full p-3 border rounded-xl" placeholder="Nama Barang" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        <input className="w-full p-3 border rounded-xl" type="number" placeholder="Harga (Rp)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
        <input className="w-full p-3 border rounded-xl" type="number" placeholder="Stok" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
        <select className="w-full p-3 border rounded-xl text-black" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
          <option>Anak</option><option>Remaja</option><option>Dewasa</option>
        </select>
        <input type="file" className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" onChange={e => setFile(e.target.files?.[0] || null)} />
        <div className="flex flex-col gap-2 pt-2">
          <button className="bg-[#4caf50] text-white p-3 rounded-xl font-bold hover:bg-[#43a047]" onClick={onSave}>
            {isEditing ? 'Update Data' : 'Simpan Produk'}
          </button>
          {isEditing && <button className="bg-gray-500 text-white p-3 rounded-xl font-bold" onClick={onCancel}>Batal</button>}
        </div>
      </div>
    </div>
  );
          }
      
