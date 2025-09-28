import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-effect">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-accent-foreground" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold hero-gradient">Mini Livros do Pet</span>
              <span className="text-xs text-muted-foreground -mt-1">por IA</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground smooth-transition">
              Criar Livro
            </a>
            <Link to="/create-counter" className="text-muted-foreground hover:text-foreground smooth-transition">
              Criar Livro
            </Link>
            <Link to="/todo" className="text-muted-foreground hover:text-foreground smooth-transition">
              Lista de Tarefas
            </Link>
            <a href="#templates" className="text-muted-foreground hover:text-foreground smooth-transition">
              Templates
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground smooth-transition">
              Preços
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex">
              Login
            </Button>
            <Button className="glow-effect">
              Criar Meu Livro
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;