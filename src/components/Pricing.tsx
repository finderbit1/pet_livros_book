import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Pricing = () => {
  const plans = [
    {
      name: "Grátis",
      price: "R$ 0",
      period: "para sempre",
      description: "Perfeito para experimentar",
      features: [
        "1 pet cadastrado",
        "Até 10 páginas no livro",
        "Templates básicos",
        "Site interativo simples",
        "Download em PDF"
      ],
      cta: "Começar Grátis",
      popular: false
    },
    {
      name: "Premium",
      price: "R$ 19,90",
      period: "/mês",
      description: "Para famílias pet lovers",
      features: [
        "Pets ilimitados",
        "Livros ilimitados", 
        "Templates premium",
        "IA narrativa avançada",
        "Site interativo completo",
        "Suporte prioritário"
      ],
      cta: "Assinar Premium",
      popular: true
    },
    {
      name: "Família",
      price: "R$ 29,90",
      period: "/mês",
      description: "Para múltiplos usuários",
      features: [
        "Tudo do Premium",
        "Até 5 usuários",
        "Espaço extra para fotos",
        "Vídeos nos livros",
        "Backup automático",
        "Gestão familiar"
      ],
      cta: "Assinar Família",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Planos
            <span className="hero-gradient block">para todos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para preservar as memórias dos seus pets
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative card-gradient border-0 smooth-transition hover:scale-105 ${
                plan.popular ? 'ring-2 ring-primary glow-effect' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Mais Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold hero-gradient">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>

              <CardContent className="p-8 pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.popular ? 'glow-effect' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Physical products section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-6">
            Produtos <span className="hero-gradient">Físicos</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="card-gradient p-6 rounded-2xl">
              <div className="text-3xl mb-4">📖</div>
              <h4 className="font-semibold mb-2">Livro Impresso</h4>
              <p className="text-2xl font-bold hero-gradient mb-2">R$ 79 - 149</p>
              <p className="text-sm text-muted-foreground">Capa dura, papel premium</p>
            </div>
            <div className="card-gradient p-6 rounded-2xl">
              <div className="text-3xl mb-4">🎨</div>
              <h4 className="font-semibold mb-2">Livro de Colorir</h4>
              <p className="text-2xl font-bold hero-gradient mb-2">R$ 39 - 69</p>
              <p className="text-sm text-muted-foreground">Diversão para toda família</p>
            </div>
            <div className="card-gradient p-6 rounded-2xl">
              <div className="text-3xl mb-4">🖼️</div>
              <h4 className="font-semibold mb-2">Quadro QR Code</h4>
              <p className="text-2xl font-bold hero-gradient mb-2">R$ 149 - 399</p>
              <p className="text-sm text-muted-foreground">Decoração interativa</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;