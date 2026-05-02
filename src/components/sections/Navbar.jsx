import { COPY } from '@/constants';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

export function Navbar({ onOpenContact }) {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
        isScrolled ? 'glass py-3' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-background font-bold text-xl transition-transform group-hover:scale-110">
            M
          </div>
          <span className="font-display font-bold text-lg text-text tracking-wider uppercase">
            Magno Oliveira
          </span>
        </a>

        {/* CTA */}
        <div className="hidden md:block">
          <Button 
            variant={isScrolled ? 'primary' : 'secondary'} 
            size="sm"
            onClick={onOpenContact}
          >
            Quero começar
          </Button>
        </div>
      </div>
    </nav>
  );
}
