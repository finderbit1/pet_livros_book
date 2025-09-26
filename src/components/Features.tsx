import { Sparkles, FileText, Smartphone, Palette, Package, QrCode } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import aiStoryImage from "@/assets/ai-story-magic.jpg";

const Features = () => {
  const features = [
    {
      icon: Sparkles,
      title: "IA Criativa",
      description: "Algoritmos avançados transformam fotos e momentos em histórias únicas."
    },
    {
      icon: FileText,
      title: "Templates Prontos",
      description: "Estilos temáticos fofos para cachorros, gatos e pets exóticos."
    },
    {
      icon: Smartphone,
      title: "Site Interativo",
      description: "Cada pet ganha um site único com link personalizado para compartilhar."
    },
    {
      icon: Palette,
      title: "Livros de Colorir",
      description: "Versões para colorir dos seus pets, perfeitas para crianças."
    },
    {
      icon: Package,
      title: "Produtos Físicos",
      description: "Livros impressos de alta qualidade direto na sua casa."
    },
    {
      icon: QrCode,
      title: "Quadros com QR Code",
      description: "Quadros decorativos que levam ao site interativo do seu pet."
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
                alt="IA gerando histórias de pets" 
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
                    className="card-gradient border-0 smooth-transition hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2 text-lg">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground">
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