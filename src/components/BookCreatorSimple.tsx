import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "./Header";
import { 
  BookOpen, 
  Heart, 
  Sparkles, 
  Upload, 
  Palette, 
  Eye, 
  Download,
  ArrowLeft,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const BookCreatorSimple = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: "Informações do Pet", icon: Heart, description: "Conte-nos sobre seu pet" },
    { id: 2, title: "Fotos", icon: Upload, description: "Adicione fotos especiais" },
    { id: 3, title: "Template", icon: Palette, description: "Escolha o estilo" },
    { id: 4, title: "Preview", icon: Eye, description: "Veja como ficará" },
    { id: 5, title: "Pagamento", icon: Download, description: "Finalize sua compra" }
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8 pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-effect">
                <BookOpen className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-accent-foreground" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold hero-gradient">Criador de Livros</span>
              <span className="text-sm text-muted-foreground -mt-1">Personalizado</span>
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Crie seu livro único
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Em poucos passos, transforme as memórias do seu pet em uma história especial
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep >= step.id 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-muted-foreground text-muted-foreground'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted-foreground'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Etapa {currentStep} de {steps.length}</span>
            <span>{Math.round(progress)}% concluído</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="card-gradient">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Etapa {currentStep}: {steps[currentStep - 1]?.title}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {steps[currentStep - 1]?.description}
                </p>
                
                <div className="bg-muted/30 rounded-lg p-6">
                  <p className="text-lg">
                    Esta é a etapa {currentStep} do processo de criação do livro.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Em breve, aqui você poderá {steps[currentStep - 1]?.description.toLowerCase()}.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {steps[currentStep - 1]?.description}
            </p>
          </div>
          
          {currentStep < steps.length && (
            <Button
              onClick={nextStep}
              className="flex items-center gap-2 glow-effect"
            >
              Próximo
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCreatorSimple;
