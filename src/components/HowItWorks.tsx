import { UserPlus, Camera, Sparkles, BookOpen, Heart, Upload, FileText, WalletCards, Clock, Download, Globe } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Heart,
      title: "1. Conte-nos sobre seu pet",
      description: "Adicione nome, espécie, raça, aniversário e fotos especiais do seu companheiro. Quanto mais detalhes, mais personalizada será a história!",
      details: "• Upload de até 10 fotos\n• Informações básicas do pet\n• Personalidade e características\n• Momentos especiais para destacar",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50 dark:bg-pink-950/20"
    },
    {
      icon: WalletCards,
      title: "2. Escolha seu plano",
      description: "Selecione o pacote ideal para você: desde histórias digitais até livros físicos personalizados.",
      details: "• Planos flexíveis\n• Pagamento seguro\n• Sem taxas ocultas\n• Garantia de satisfação",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      icon: Sparkles,
      title: "3. Criamos sua história",
      description: "Nossa equipe analisa todas as informações e cria uma narrativa única, emocionante e personalizada.",
      details: "• Análise das fotos enviadas\n• Narrativa personalizada\n• Múltiplos estilos de escrita\n• Revisão em tempo real",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    },
    {
      icon: BookOpen,
      title: "4. Receba sua história",
      description: "Baixe o PDF, acesse o site interativo ou encomende produtos físicos. Sua história está pronta para ser compartilhada!",
      details: "• PDF para download\n• Site interativo personalizado\n• Produtos físicos opcionais\n• Compartilhamento fácil",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    }
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Como
            <span className="hero-gradient"> funciona</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Em poucos passos simples, transformamos as memórias do seu pet em histórias inesquecíveis
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
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} mb-6 glow-effect`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-semibold mb-4">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Details list */}
                    <div className="text-left">
                      <div className="text-sm text-muted-foreground space-y-2">
                        {step.details.split('\n').map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color} mt-2 flex-shrink-0`} />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Time estimate */}
                    <div className="mt-4 pt-3 border-t border-border/30">
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>
                          {index === 0 && "2-5 min"}
                          {index === 1 && "1-2 min"}
                          {index === 2 && "3-5 min"}
                          {index === 3 && "Instantâneo"}
                        </span>
                      </div>
                    </div>
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