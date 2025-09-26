import { UserPlus, Camera, Users, Heart } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Cadastre seu pet",
      description: "Crie um perfil único com fotos, informações e personalidade do seu companheiro.",
      image: "📝"
    },
    {
      icon: Camera,
      title: "Compartilhe momentos",
      description: "Poste fotos, vídeos e histórias dos momentos especiais com seu pet.",
      image: "📸"
    },
    {
      icon: Users,
      title: "Conecte-se",
      description: "Encontre outros pet lovers, organize encontros e faça novas amizades.",
      image: "🤝"
    },
    {
      icon: Heart,
      title: "Crie memórias",
      description: "Acompanhe o crescimento, marcos importantes e celebre cada conquista.",
      image: "💝"
    }
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Como
            <span className="hero-gradient block">funciona</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Em poucos passos simples, você e seu pet estarão conectados com uma comunidade incrível
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Step connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
                )}
                
                <div className="card-gradient p-8 rounded-2xl smooth-transition hover:scale-105 relative z-10">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 glow-effect">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    
                    <div className="text-4xl mb-4">{step.image}</div>
                    
                    <h3 className="text-xl font-semibold mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;