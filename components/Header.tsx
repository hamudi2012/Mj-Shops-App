"use client";

export default function Header({ theme, setTheme }: { theme: string; setTheme: (t: string) => void }) {
  const themes = [
    { name: 'Original', color: 'bg-[#8fd694]', value: '' },
    { name: 'Dark', color: 'bg-[#222] text-white', value: 'mode-dark' },
    { name: 'Blue', color: 'bg-[#2196f3] text-white', value: 'mode-blue' },
    { name: 'Gold', color: 'bg-[#d4a373]', value: 'mode-gold' },
    { name: 'Pink', color: 'bg-[#ec4899] text-white', value: 'mode-pink' },
  ];

  return (
    <header className="py-8 px-4 text-center border-b-4 transition-all duration-300 bg-custom-header border-custom-primary">

<img 
  src="https://Mj-Shops.biz.id/public/photo/logo-Mj-Shops.png" 
  alt="Logo" 
  className="w-[300px] max-w-[90%] mx-auto mb-4 drop-shadow-[0_5px_15px_rgba(0,0,0,0.2)]" 
/>
<h1 className="text-2xl md:text-3xl font-black mb-2 uppercase tracking-tighter italic">
  Style Mewah, Harga Ramah
</h1>

      <p className="max-w-2xl mx-auto text-sm opacity-90 mb-6 font-medium">Koleksi fashion terbaik untuk semua kalangan. Kualitas Butik, Harga Tetangga.</p>
      
      <div className="flex justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
        {themes.map((t) => (
          <button key={t.name} onClick={() => setTheme(t.value)} className={`px-4 py-2 rounded-full text-[10px] font-bold shadow-md transition-transform active:scale-90 whitespace-nowrap ${t.color}`}>
            {t.name}
          </button>
        ))}
      </div>
    </header>
  );
    }
            
