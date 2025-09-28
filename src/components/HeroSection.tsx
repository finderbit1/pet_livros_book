import { Button } from "@/components/ui/button";
import { Book, Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import heroBookMockup from "@/assets/hero-book-mockup.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 animate-bounce-gentle">
        <Book className="w-8 h-8 text-primary opacity-60 animate-wiggle" />
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-10 h-10 text-secondary opacity-50 animate-scale-gentle" />
      </div>
      <div className="absolute bottom-20 left-20 animate-heart-beat" style={{ animationDelay: '2s' }}>
        <Heart className="w-6 h-6 text-accent opacity-60 fill-current" />
      </div>
      <div className="absolute top-60 left-1/4 animate-gentle-bounce" style={{ animationDelay: '0.5s' }}>
        <Heart className="w-4 h-4 text-primary opacity-40 fill-current" />
      </div>
      <div className="absolute bottom-40 right-1/3 animate-soft-glow" style={{ animationDelay: '1.5s' }}>
        <Heart className="w-5 h-5 text-secondary opacity-50 fill-current" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="hero-gradient animate-scale-gentle">PetLover</span>
              <span className="block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Eternize a história</span>
              <span className="hero-gradient block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>do seu melhor amigo</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              Guarde para sempre os momentos mais fofos do seu pet! 
              Crie livros personalizados, sites interativos e eternize patinhas, miados e muitas memórias especiais.
              <span className="text-primary font-semibold animate-heart-beat"> Cada momento vira uma história mágica!</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 glow-effect animate-bounce-gentle hover:animate-wiggle transition-all duration-300"
                onClick={() => window.location.href = '/criar-livro'}
              >
                Criar Livro 
              </Button>
            </div>

            {/* Social proof */}
            {/* <div className="mt-12 flex items-center gap-8 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-accent"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-primary"></div>
                </div>
                <span>+2.847 livros criados</span>
              </div>
            </div> */}
          </div>

          {/* Right content - Book mockup */}
          <div className="relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <img 
                src={heroBookMockup} 
                alt="Mini Livros do Pet" 
                className="w-full max-w-md mx-auto animate-float glow-effect"
              />
              
              {/* Floating elements around mockup */}
              <div className="absolute -top-5 -right-5 animate-glow-pulse">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <div className="absolute -bottom-5 -left-5 animate-glow-pulse" style={{ animationDelay: '1s' }}>
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center backdrop-blur-sm">
                  <Book className="w-6 h-6 text-secondary" />
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