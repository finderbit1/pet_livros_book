import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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

// Importar componentes das etapas
import PetInfoStep from "./steps/PetInfoStep";
import PhotosStep from "./steps/PhotosStep";
import TemplateStep from "./steps/TemplateStep";
import PreviewStep from "./steps/PreviewStep";
import PaymentStep from "./steps/PaymentStep";

export interface PetData {
  name: string;
  species: string;
  breed: string;
  birthday: Date;
  personality: string[];
  specialMoments: string;
}

export interface BookData {
  title: string;
  photos: File[];
  template: string;
  plan: "basic" | "premium";
  petData: PetData;
}

const BookCreator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookData, setBookData] = useState<BookData>({
    title: "",
    photos: [],
    template: "",
    plan: "basic",
    petData: {
      name: "",
      species: "",
      breed: "",
      birthday: new Date(),
      personality: [],
      specialMoments: ""
    }
  });

  const steps = [
    { id: 1, title: "Informações do Pet", icon: Heart, description: "Conte-nos sobre seu pet" },
    { id: 2, title: "Fotos", icon: Upload, description: "Adicione fotos especiais" },
    { id: 3, title: "Template", icon: Palette, description: "Escolha o estilo" },
    { id: 4, title: "Preview", icon: Eye, description: "Veja como ficará" },
    { id: 5, title: "Pagamento", icon: Download, description: "Finalize sua compra" }
  ];

  const updateBookData = (updates: Partial<BookData>) => {
    setBookData(prev => ({ ...prev, ...updates }));
  };

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

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return bookData.petData.name !== "" && bookData.petData.species !== "";
      case 2:
        return bookData.photos.length > 0;
      case 3:
        return bookData.template !== "";
      case 4:
        return true; // Preview sempre válido
      case 5:
        return true; // Pagamento sempre válido
      default:
        return false;
    }
  };

  const progress = (currentStep / steps.length) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PetInfoStep 
            petData={bookData.petData}
            onUpdate={(petData) => updateBookData({ petData })}
            onNext={nextStep}
            isValid={isStepValid(1)}
          />
        );
      case 2:
        return (
          <PhotosStep 
            photos={bookData.photos}
            onUpdate={(photos) => updateBookData({ photos })}
            onNext={nextStep}
            onPrev={prevStep}
            isValid={isStepValid(2)}
            plan={bookData.plan}
          />
        );
      case 3:
        return (
          <TemplateStep 
            template={bookData.template}
            plan={bookData.plan}
            onUpdate={(template, plan) => updateBookData({ template, plan })}
            onNext={nextStep}
            onPrev={prevStep}
            isValid={isStepValid(3)}
          />
        );
      case 4:
        return (
          <PreviewStep 
            bookData={bookData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <PaymentStep 
            bookData={bookData}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

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
          
          <Progress value={progress} className="h-2" />
          
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Etapa {currentStep} de {steps.length}</span>
            <span>{Math.round(progress)}% concluído</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="card-gradient">
            <CardContent className="p-8">
              {renderStep()}
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
              disabled={!isStepValid(currentStep)}
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

export default BookCreator;
