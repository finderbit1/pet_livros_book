import { Button } from "@/components/ui/button";
import PetLoverLogoPerfectPaw from "./PetLoverLogoPerfectPaw";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <PetLoverLogoPerfectPaw size="md" />
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground smooth-transition">
              Recursos
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground smooth-transition">
              Como Funciona
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground smooth-transition">
              Preços
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground smooth-transition">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex">
              Login
            </Button>
            <Button 
              className="glow-effect"
              onClick={() => window.location.href = '/criar-livro'}
            >
              Criar Meu Livro
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;