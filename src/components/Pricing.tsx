import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Pricing = () => {
  const plans = [
    {
      name: "Básico",
      price: "R$ 29,00",
      period: "único",
      description: "Perfeito para começar",
      features: [
        "5 fotos",
        "1 ano de acesso ao site",
        "PDF da história (5 páginas)",
        "Sem música"
      ],
      cta: "Escolher Básico",
      popular: false
    },
    {
      name: "Premium",
      price: "R$ 49,00",
      period: "único",
      description: "Para quem quer o melhor",
      features: [
        "10 fotos",
        "Acesso para sempre ao site",
        "Com música",
        "PDF da história (10 páginas)",
        "PDF bobie godies das fotos"
      ],
      cta: "Escolher Premium",
      popular: true
    }
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Escolha seu
            <span className="hero-gradient block">pacote</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pagamento único, sem mensalidades. Crie quantos livros quiser!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                  onClick={() => window.location.href = '/criar-livro'}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;