export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-12 bg-background">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-background font-bold text-xl">
            M
          </div>
          <span className="font-display font-bold text-lg text-text tracking-wider uppercase">
            Magno Oliveira
          </span>
        </div>

        <p className="text-text-muted text-sm text-center md:text-left">
          &copy; {year} Magno Oliveira. Todos os direitos reservados.
        </p>

        <div className="flex items-center gap-6 text-sm text-text-muted">
          <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
        </div>

      </div>
    </footer>
  );
}
