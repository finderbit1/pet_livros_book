import { Heart, Mail, Phone, MapPin } from "lucide-react";
import pawIcon from "@/assets/paw-icon.png";

const Footer = () => {
  return (
    <footer className="py-16 bg-card/30 backdrop-blur-sm border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={pawIcon} alt="PetConnect" className="w-8 h-8" />
              <span className="text-xl font-bold hero-gradient">Mini Livros do Pet</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              A plataforma que transforma memórias dos seus pets em histórias inesquecíveis.
              Crie livros únicos, sites interativos e produtos físicos personalizados.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span>para pet lovers</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#templates" className="hover:text-foreground smooth-transition">Templates</a></li>
              <li><a href="#pricing" className="hover:text-foreground smooth-transition">Preços</a></li>
              <li><a href="#" className="hover:text-foreground smooth-transition">Exemplos</a></li>
              <li><a href="#" className="hover:text-foreground smooth-transition">Suporte</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>oi@minilivrosdopet.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(11) 9999-0000</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; 2024 Mini Livros do Pet. Todos os direitos reservados.</p>
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