import { Button } from "@/components/ui/button";
import { Heart, Users, Camera } from "lucide-react";
import heroPhone from "@/assets/hero-phone.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Heart className="w-8 h-8 text-primary opacity-60" />
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <Users className="w-10 h-10 text-secondary opacity-50" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <Camera className="w-6 h-6 text-accent opacity-60" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Conecte-se com
              <span className="hero-gradient block">pet lovers</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Crie perfis únicos para seus pets, compartilhe momentos especiais e faça parte da maior comunidade de amantes de animais. 
              <span className="text-primary font-semibold"> Transforme cada momento em memória!</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-lg px-8 py-6 glow-effect animate-glow-pulse">
                Cadastre seu Pet
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-primary/30 hover:border-primary">
                Ver Demo
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex items-center gap-8 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-accent"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-primary"></div>
                </div>
                <span>+5.240 pets cadastrados</span>
              </div>
            </div>
          </div>

          {/* Right content - Phone mockup */}
          <div className="relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <img 
                src={heroPhone} 
                alt="PetConnect App" 
                className="w-full max-w-md mx-auto animate-float glow-effect"
              />
              
              {/* Floating elements around phone */}
              <div className="absolute -top-5 -right-5 animate-glow-pulse">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <div className="absolute -bottom-5 -left-5 animate-glow-pulse" style={{ animationDelay: '1s' }}>
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center backdrop-blur-sm">
                  <Camera className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;