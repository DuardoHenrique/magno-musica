import { COPY } from '@/constants';

export function InstrumentsSection() {
  // Duplicando os itens para criar o efeito de loop infinito suave
  const marqueeItems = [...COPY.instruments.items, ...COPY.instruments.items];

  return (
    <section className="py-[140px] relative overflow-hidden bg-background text-text">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {COPY.instruments.title}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden py-10 flex border-y border-white/5">
        <div className="flex animate-marquee whitespace-nowrap">
          {marqueeItems.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center px-8 md:px-12 transition-colors duration-300"
            >
              <span className="text-2xl md:text-4xl lg:text-5xl font-display font-black tracking-tighter uppercase">
                {item.name}
              </span>
              <span className="ml-8 md:ml-12 text-primary text-xl md:text-3xl">
                •
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
