import { Button } from "@/components/ui/button";
import pawIcon from "@/assets/paw-icon.png";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={pawIcon} alt="PetConnect" className="w-8 h-8" />
            <span className="text-xl font-bold hero-gradient">PetConnect</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground smooth-transition">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground smooth-transition">
              Como Funciona
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground smooth-transition">
              Preços
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex">
              Entrar
            </Button>
            <Button className="glow-effect">
              Cadastre-se
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;