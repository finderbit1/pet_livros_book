import { Heart, Mail, Phone, MapPin } from "lucide-react";
import PetLoverLogoPerfectPaw from "./PetLoverLogoPerfectPaw";

const Footer = () => {
  return (
    <footer className="py-16 bg-card/30 backdrop-blur-sm border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-8 animate-fade-in-up">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <PetLoverLogoPerfectPaw size="md" />
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Eternize a história do seu melhor amigo! Guarde para sempre os momentos mais fofos do seu pet.
              Crie livros personalizados, sites interativos e eternize patinhas, miados e muitas memórias especiais.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-primary fill-primary animate-heart-beat" />
              <span>para pet lovers</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 font-cute">Produto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground smooth-transition hover:animate-bounce-gentle">Recursos</a></li>
              <li><a href="#how-it-works" className="hover:text-foreground smooth-transition hover:animate-bounce-gentle">Como Funciona</a></li>
              <li><a href="#pricing" className="hover:text-foreground smooth-transition hover:animate-bounce-gentle">Preços</a></li>
              <li><a href="#faq" className="hover:text-foreground smooth-transition hover:animate-bounce-gentle">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 font-cute">Contato</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2 hover:text-foreground smooth-transition">
                <Mail className="w-4 h-4 text-primary hover:animate-bounce-gentle" />
                <span>oi@petlover.com</span>
              </li>
              <li className="flex items-center gap-2 hover:text-foreground smooth-transition">
                <Phone className="w-4 h-4 text-secondary hover:animate-bounce-gentle" />
                <span>(11) 9999-0000</span>
              </li>
              <li className="flex items-center gap-2 hover:text-foreground smooth-transition">
                <MapPin className="w-4 h-4 text-accent hover:animate-bounce-gentle" />
                <span>São Paulo, Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; 2024 PetLover. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground smooth-transition">Privacidade</a>
            <a href="#" className="hover:text-foreground smooth-transition">Termos</a>
            <a href="#" className="hover:text-foreground smooth-transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;