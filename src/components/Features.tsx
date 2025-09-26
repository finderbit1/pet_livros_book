import { Shield, Zap, Smartphone, Globe, Calendar, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import petsImage from "@/assets/pets-community.jpg";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Seguro e Privado",
      description: "Seus dados e de seus pets protegidos com criptografia de ponta."
    },
    {
      icon: Zap,
      title: "Super Rápido",
      description: "Interface otimizada para carregamento instantâneo."
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Experiência perfeita em qualquer dispositivo."
    },
    {
      icon: Globe,
      title: "Comunidade Global",
      description: "Conecte-se com pet lovers do mundo todo."
    },
    {
      icon: Calendar,
      title: "Agenda Integrada",
      description: "Organize consultas, vacinas e eventos importantes."
    },
    {
      icon: Award,
      title: "Sistema de Conquistas",
      description: "Ganhe medalhas e reconhecimento por cuidar bem do seu pet."
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
                src={petsImage} 
                alt="Comunidade de pets" 
                className="rounded-3xl shadow-2xl glow-effect w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl" />
            </div>
          </div>

          {/* Right side - Features */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Recursos
              <span className="hero-gradient block">incríveis</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12">
              Tudo que você precisa para criar uma experiência única para você e seu pet.
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