import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Sparkles, Crown, Download, Heart } from "lucide-react";

interface TemplateStepProps {
  template: string;
  plan: "basic" | "premium";
  onUpdate: (template: string, plan: "basic" | "premium") => void;
  onNext: () => void;
  onPrev: () => void;
  isValid: boolean;
}

const TemplateStep = ({ template, plan, onUpdate, onNext, onPrev, isValid }: TemplateStepProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState(template);
  const [selectedPlan, setSelectedPlan] = useState(plan);

  const templates = [
    {
      id: "classic",
      name: "Clássico",
      description: "Design elegante e atemporal",
      preview: "📖",
      color: "from-blue-500 to-indigo-500",
      available: ["basic", "premium"]
    },
    {
      id: "playful",
      name: "Brincalhão",
      description: "Cores vibrantes e divertidas",
      preview: "🎨",
      color: "from-pink-500 to-purple-500",
      available: ["basic", "premium"]
    },
    {
      id: "nature",
      name: "Natureza",
      description: "Inspirado na natureza",
      preview: "🌿",
      color: "from-green-500 to-emerald-500",
      available: ["basic", "premium"]
    },
    {
      id: "royal",
      name: "Real",
      description: "Design luxuoso e sofisticado",
      preview: "👑",
      color: "from-yellow-500 to-orange-500",
      available: ["premium"]
    },
    {
      id: "magical",
      name: "Mágico",
      description: "Elementos fantásticos e especiais",
      preview: "✨",
      color: "from-purple-500 to-pink-500",
      available: ["premium"]
    }
  ];

  const plans = [
    {
      id: "basic",
      name: "Básico",
      price: "R$ 29,00",
      description: "Perfeito para começar",
      features: [
        "5 fotos",
        "1 ano de acesso ao site",
        "PDF da história (5 páginas)",
        "Sem música"
      ],
      icon: Download,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "premium",
      name: "Premium",
      price: "R$ 49,00",
      description: "Para quem quer o melhor",
      features: [
        "10 fotos",
        "Acesso para sempre ao site",
        "Com música",
        "PDF da história (10 páginas)",
        "PDF bobie godies das fotos"
      ],
      icon: Crown,
      color: "from-purple-500 to-pink-500"
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    onUpdate(templateId, selectedPlan);
  };

  const handlePlanSelect = (planId: "basic" | "premium") => {
    setSelectedPlan(planId);
    
    // Se o template selecionado não está disponível no novo plano, resetar
    const selectedTemplateData = templates.find(t => t.id === selectedTemplate);
    if (selectedTemplateData && !selectedTemplateData.available.includes(planId)) {
      const firstAvailableTemplate = templates.find(t => t.available.includes(planId));
      if (firstAvailableTemplate) {
        setSelectedTemplate(firstAvailableTemplate.id);
        onUpdate(firstAvailableTemplate.id, planId);
      }
    } else {
      onUpdate(selectedTemplate, planId);
    }
  };

  const availableTemplates = templates.filter(t => t.available.includes(selectedPlan));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Palette className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Escolha o estilo do seu livro</h2>
        <p className="text-muted-foreground">
          Selecione um template e plano que combine com a personalidade do seu pet
        </p>
      </div>

      {/* Plan Selection */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Escolha seu plano:</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {plans.map((planData) => (
            <Card 
              key={planData.id}
              className={`cursor-pointer smooth-transition hover:scale-105 ${
                selectedPlan === planData.id ? "ring-2 ring-primary glow-effect" : ""
              }`}
              onClick={() => handlePlanSelect(planData.id as "basic" | "premium")}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${planData.color} flex items-center justify-center`}>
                    <planData.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{planData.name}</h4>
                    <p className="text-sm text-muted-foreground">{planData.description}</p>
                  </div>
                </div>
                
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold hero-gradient">{planData.price}</div>
                  <p className="text-sm text-muted-foreground">pagamento único</p>
                </div>
                
                <ul className="space-y-2">
                  {planData.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Template Selection */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Escolha o template:</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableTemplates.map((templateData) => (
            <Card 
              key={templateData.id}
              className={`cursor-pointer smooth-transition hover:scale-105 ${
                selectedTemplate === templateData.id ? "ring-2 ring-primary glow-effect" : ""
              }`}
              onClick={() => handleTemplateSelect(templateData.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${templateData.color} flex items-center justify-center text-2xl`}>
                  {templateData.preview}
                </div>
                
                <h4 className="font-bold mb-2">{templateData.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{templateData.description}</p>
                
                {selectedTemplate === templateData.id && (
                  <Badge className="bg-primary text-primary-foreground">
                    Selecionado
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Preview */}
      {selectedTemplate && (
        <Card className="card-gradient border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Preview do seu livro</h3>
                <p className="text-sm text-muted-foreground">
                  Como ficará com o template selecionado
                </p>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center text-2xl">
                  📖
                </div>
                <div>
                  <h4 className="font-semibold text-primary">
                    {templates.find(t => t.id === selectedTemplate)?.name} Template
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Plano {plans.find(p => p.id === selectedPlan)?.name} • 
                    {plans.find(p => p.id === selectedPlan)?.price}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Voltar
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={!isValid}
          className="glow-effect"
        >
          Ver Preview
        </Button>
      </div>

      {!isValid && (
        <p className="text-center text-sm text-muted-foreground">
          Selecione um template para continuar
        </p>
      )}
    </div>
  );
};

export default TemplateStep;
