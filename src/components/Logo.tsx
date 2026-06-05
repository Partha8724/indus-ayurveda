import { Leaf } from 'lucide-react';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { icon: 20, title: 'text-lg', subtitle: 'text-[8px]' },
    md: { icon: 26, title: 'text-2xl', subtitle: 'text-[10px]' },
    lg: { icon: 36, title: 'text-4xl', subtitle: 'text-[12px]' },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-3 select-none">
      <Leaf className="text-luxury-gold" size={s.icon} strokeWidth={1.5} />
      <div className="flex flex-col items-start translate-y-[2px]">
        <span className={`font-serif tracking-[0.15em] uppercase font-bold text-white leading-none ${s.title}`}>
          Indus
        </span>
        <span className={`uppercase tracking-[0.4em] text-luxury-gold mt-1 leading-none font-medium ${s.subtitle}`}>
          Ayurveda
        </span>
      </div>
    </div>
  );
}
