"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import ProductCard from '@/components/ProductCard'; // <-- IMPORT DISINI

const SB_URL = "https://xaupckapbzjrdoccrhzo.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhdXBja2FwYnpqcmRvY2NyaHpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTc0MjMsImV4cCI6MjA4NTYzMzQyM30.RapBv6CdlxGuCg-S8lioMX3192tZOuRDprOhP3UefuU";
const supabase = createClient(SB_URL, SB_KEY);

export default function MjShops() {
  const [theme, setTheme] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState('All');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', stock: '', category: 'Anak', oldName: '' });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setTheme(localStorage.getItem("mj_theme") || '');
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { data } = await supabase.from('products').select('*');
    if (data) setProducts(data);
    setLoading(false);
  }

  const handleSave = async () => {
    let imgUrl = isEditing ? products.find(p => p.name === formData.oldName)?.image_url : "";
    if (file) {
      const fileName = `${Date.now()}_${file.name}`;
      await supabase.storage.from('photo-produk').upload(fileName, file);
      imgUrl = supabase.storage.from('photo-produk').getPublicUrl(fileName).data.publicUrl;
    }
    const payload = { name: formData.name, price: parseInt(formData.price), stock: parseInt(formData.stock), category: formData.category, image_url: imgUrl };
    if (isEditing) await supabase.from('products').update(payload).eq('name', formData.oldName);
    else await supabase.from('products').insert([payload]);
    alert("✅ Berhasil!");
    resetForm();
    fetchData();
  };

  const startEdit = (p: any) => {
    setFormData({ name: p.name, price: p.price, stock: p.stock, category: p.category, oldName: p.name });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (name: string) => {
    if (confirm(`Hapus ${name}?`)) {
      await supabase.from('products').delete().eq('name', name);
      fetchData();
    }
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', stock: '', category: 'Anak', oldName: '' });
    setIsEditing(false);
    setFile(null);
  };

  const filteredProducts = products.filter(p => category === 'All' || p.category === category);

  return (
    <div className={`min-h-screen transition-all duration-300 ${theme}`}>
      <style jsx global>{`
        :root { --primary: #4caf50; --bg: #f4fff4; --text: #1f3d1f; --card: #ffffff; --header-bg: #8fd694; }
        .mode-dark { --bg: #121212; --text: #e0e0e0; --card: #1f1f1f; --primary: #45a049; --header-bg: #1e1e1e; }
        .mode-blue { --bg: #e3f2fd; --text: #0d47a1; --card: #ffffff; --primary: #2196f3; --header-bg: #bbdefb; }
        .mode-gold { --bg: #fdfaf1; --text: #403d39; --card: #ffffff; --primary: #d4a373; --header-bg: #faedcd; }
        .mode-pink { --bg: #fdf2f8; --text: #831843; --card: #ffffff; --primary: #ec4899; --header-bg: #fbcfe8; }
        body { background-color: var(--bg); color: var(--text); }
        .bg-custom-header { background-color: var(--header-bg); }
        .bg-custom-card { background-color: var(--card); }
        .text-custom-primary { color: var(--primary); }
        .bg-custom-primary { background-color: var(--primary); }
        .border-custom-primary { border-color: var(--primary); }
      `}</style>

      <header className="py-8 px-4 text-center border-b-4 bg-custom-header border-custom-primary">
        <img src="https://Mj-Shops.biz.id/public/photo/logo-Mj-Shops.png" alt="Logo" className="w-[300px] max-w-[90%] mx-auto mb-4 drop-shadow-lg" />
        <p className="text-xl font-extrabold mb-2 uppercase italic">Style Mewah, Harga Ramah</p>
        <div className="flex justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {['Original', 'Dark', 'Blue', 'Gold', 'Pink'].map((n, i) => (
            <button 
              key={n} 
              onClick={() => { const v = i===0?'':`mode-${n.toLowerCase()}`; setTheme(v); localStorage.setItem("mj_theme", v); }}
              className="px-4 py-2 rounded-full text-[10px] font-bold shadow-md bg-white text-black"
            >
              {n}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-5">
        <div className="flex gap-3 mb-6">
          <select className="flex-grow p-3 rounded-xl border-2 border-custom-primary bg-custom-card font-bold outline-none text-black" onChange={(e) => setCategory(e.target.value)}>
            <option value="All">🔍 Pilih Kategori Produk...</option>
            <option>Anak</option><option>Remaja</option><option>Dewasa</option>
          </select>
          <button onClick={() => prompt("Pass Admin:") === "admin123" && setIsAdmin(true)} className="bg-slate-600 text-white px-5 rounded-xl font-bold text-xs">🔑 Admin</button>
        </div>

        {isAdmin && (
          <div className="bg-custom-card p-6 rounded-2xl border-2 border-dashed border-custom-primary mb-8">
             <input className="w-full p-3 border rounded-xl mb-2 text-black" placeholder="Nama Barang" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
             <input className="w-full p-3 border rounded-xl mb-2 text-black" type="number" placeholder="Harga" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
             <input type="file" className="block w-full text-xs mb-4" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
             <button className="w-full bg-custom-primary text-white p-3 rounded-xl font-bold uppercase" onClick={handleSave}>Simpan</button>
             {isEditing && <button onClick={resetForm} className="w-full mt-2 bg-gray-400 text-white p-2 rounded-xl">Batal</button>}
          </div>
        )}

        {/* --- INI BAGIAN YANG TADI KETINGGALAN GABUNG --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {loading ? (
            <div className="col-span-full text-center py-20 font-bold opacity-50 text-black">Memuat Produk...</div>
          ) : filteredProducts.map((p, i) => (
            <ProductCard 
              key={i} 
              product={p} 
              isAdmin={isAdmin} 
              onEdit={startEdit} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      </main>
      <footer className="bg-[#111] text-white py-12 text-center mt-12 border-t-4 border-custom-primary">
         <p className="font-bold">© 2026 MJ-Shops Official</p>
      </footer>
    </div>
  );
    }
    
