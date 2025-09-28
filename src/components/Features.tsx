import { Sparkles, FileText, Smartphone, Palette, Package, QrCode, Brain, Wand2, Share2, Download, Heart, BookOpen, Image, Printer, Monitor } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import aiStoryImage from "@/assets/ai-story-magic.jpg";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Histórias Personalizadas",
      description: "Criamos histórias únicas baseadas nas fotos e momentos especiais do seu pet.",
      color: "from-purple-500 to-pink-500",
      emoji: "📖",
      animation: "animate-fade-in-up"
    },
    {
      icon: BookOpen,
      title: "Templates Prontos",
      description: "Estilos temáticos fofos para cachorros, gatos e pets exóticos.",
      color: "from-blue-500 to-cyan-500",
      emoji: "📚",
      animation: "animate-fade-in-left"
    },
    {
      icon: Monitor,
      title: "Site Interativo",
      description: "Cada pet ganha um site único com link personalizado para compartilhar.",
      color: "from-green-500 to-emerald-500",
      emoji: "💻",
      animation: "animate-fade-in-right"
    },
    {
      icon: Palette,
      title: "Livros de Colorir",
      description: "Versões para colorir dos seus pets, perfeitas para crianças.",
      color: "from-orange-500 to-red-500",
      emoji: "🎨",
      animation: "animate-fade-in-up"
    },
    {
      icon: Printer,
      title: "Produtos Físicos",
      description: "Livros impressos de alta qualidade direto na sua casa.",
      color: "from-yellow-500 to-orange-500",
      emoji: "🖨️",
      animation: "animate-fade-in-left"
    },
    {
      icon: QrCode,
      title: "Quadros com QR Code",
      description: "Quadros decorativos que levam ao site interativo do seu pet.",
      color: "from-indigo-500 to-purple-500",
      emoji: "📱",
      animation: "animate-fade-in-right"
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Image */}
          <div className="animate-fade-in">
            <div className="relative">
              <img 
                src={aiStoryImage} 
                alt="Criando histórias personalizadas de pets" 
                className="rounded-3xl shadow-2xl glow-effect w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl" />
            </div>
          </div>

          {/* Right side - Features */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Recursos
              <span className="hero-gradient block">mágicos</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12">
              Tudo que você precisa para criar livros únicos e sites interativos dos seus pets.
            </p>

            <div className="grid gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card 
                    key={index} 
                    className={`card-gradient border-0 smooth-transition hover:scale-105 group ${feature.animation}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} relative overflow-hidden group-hover:animate-bounce-gentle`}>
                            <Icon className="w-7 h-7 text-white z-10 group-hover:animate-wiggle" />
                            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">
                              {feature.title}
                            </h3>
                            <span className="text-xl">{feature.emoji}</span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;