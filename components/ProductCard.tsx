"use client";

import React from 'react';

interface ProductCardProps {
  product: any;
  isAdmin: boolean;
  onEdit: (p: any) => void;
  onDelete: (name: string) => void;
}

export default function ProductCard({ product, isAdmin, onEdit, onDelete }: ProductCardProps) {
  const waUrl = `https://wa.me/6285691451094?text=Halo MJ-Shops, saya mau order produk: ${product.name}`;

  return (
    <div className="bg-custom-card p-4 rounded-[32px] shadow-md border border-black/5 text-center flex flex-col h-full hover:scale-[1.02] transition-transform duration-300">
      <div className="relative w-full h-[250px] mb-3">
        <img 
          src={product.image_url || 'https://via.placeholder.com/300x450?text=Fashion'} 
          alt={product.name} 
          className="w-full h-full object-cover rounded-2xl bg-gray-100" 
        />
      </div>
      <div className="font-bold text-sm mb-2 line-clamp-2 min-h-[40px] flex items-center justify-center italic text-inherit">
        {product.name}
      </div>
      <div className="text-custom-primary font-black text-xl mb-3">
        Rp{(product.price || 0).toLocaleString('id-ID')}
      </div>
      <button 
        onClick={() => window.open(waUrl, '_blank')}
        className="mt-auto bg-custom-primary text-white py-3 rounded-xl font-bold text-[10px] uppercase shadow-sm hover:brightness-110 active:scale-95 transition-all"
      >
        Beli via WA
      </button>
      {isAdmin && (
        <div className="flex gap-1 mt-3 pt-3 border-t border-dashed border-gray-200">
          <button onClick={() => onEdit(product)} className="flex-1 bg-blue-600 text-white text-[10px] py-2 rounded-lg font-bold uppercase hover:bg-blue-700">✏️ Edit</button>
          <button onClick={() => onDelete(product.name)} className="flex-1 bg-red-600 text-white text-[10px] py-2 rounded-lg font-bold uppercase hover:bg-red-700">🗑️ Hapus</button>
        </div>
      )}
    </div>
  );
          }
      
