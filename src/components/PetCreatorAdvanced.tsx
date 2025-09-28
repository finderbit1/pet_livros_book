import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Header from "./Header";
import PetLoverLogoPerfectPaw from "./PetLoverLogoPerfectPaw";
import { Heart, Upload, Calendar, Sparkles, ArrowRight, CheckCircle, Eye, AlertCircle } from "lucide-react";

export interface PetData {
  name: string;
  species: string;
  breed: string;
  birthday: string;
  personality: string;
  specialMoments: string;
  photos: File[];
  plan: "basico" | "premium";
  template: string;
}

const PetCreatorAdvanced = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [petData, setPetData] = useState<PetData>({
    name: "",
    species: "",
    breed: "",
    birthday: "",
    personality: "",
    specialMoments: "",
    photos: [],
    plan: "basico",
    template: "classic"
  });

  const [isCreating, setIsCreating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, title: "Informações do Pet", icon: Heart },
    { id: 2, title: "Fotos", icon: Upload },
    { id: 3, title: "Plano", icon: Sparkles },
    { id: 4, title: "Criar Livro", icon: CheckCircle }
  ];

  const plans = [
    {
      id: "basico",
      name: "Básico",
      price: "R$ 29",
      features: ["5 fotos", "1 ano de acesso", "PDF (5 páginas)", "Sem música"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "premium", 
      name: "Premium",
      price: "R$ 49",
      features: ["10 fotos", "Acesso para sempre", "PDF (10 páginas)", "Com música"],
      color: "from-purple-500 to-pink-500"
    }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!petData.name.trim()) newErrors.name = "Nome do pet é obrigatório";
      if (!petData.species.trim()) newErrors.species = "Espécie é obrigatória";
      if (!petData.breed.trim()) newErrors.breed = "Raça é obrigatória";
      if (!petData.birthday) newErrors.birthday = "Data de nascimento é obrigatória";
      if (!petData.personality.trim()) newErrors.personality = "Personalidade é obrigatória";
      if (!petData.specialMoments.trim()) newErrors.specialMoments = "Momentos especiais são obrigatórios";
    }
    
    if (step === 2) {
      if (petData.photos.length === 0) newErrors.photos = "Pelo menos uma foto é obrigatória";
      if (petData.plan === "basico" && petData.photos.length > 5) {
        newErrors.photos = "Plano básico permite apenas 5 fotos";
      }
      if (petData.plan === "premium" && petData.photos.length > 10) {
        newErrors.photos = "Plano premium permite apenas 10 fotos";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreate = async () => {
    setIsCreating(true);
    // Simular criação
    setTimeout(() => {
      setIsCreating(false);
      alert("Livro criado com sucesso! 🎉");
    }, 3000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2">
                Nome do pet: <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={petData.name}
                onChange={(e) => {
                  setPetData({...petData, name: e.target.value});
                  if (errors.name) setErrors({...errors, name: ""});
                }}
                placeholder="Ex: Rex, Luna, Mimi..."
                className={`mt-2 ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.name && (
                <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="species" className="flex items-center gap-2">
                Espécie: <span className="text-red-500">*</span>
              </Label>
              <Input
                id="species"
                value={petData.species}
                onChange={(e) => {
                  setPetData({...petData, species: e.target.value});
                  if (errors.species) setErrors({...errors, species: ""});
                }}
                placeholder="Ex: Cachorro, Gato, Coelho..."
                className={`mt-2 ${errors.species ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.species && (
                <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.species}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="breed" className="flex items-center gap-2">
                Raça: <span className="text-red-500">*</span>
              </Label>
              <Input
                id="breed"
                value={petData.breed}
                onChange={(e) => {
                  setPetData({...petData, breed: e.target.value});
                  if (errors.breed) setErrors({...errors, breed: ""});
                }}
                placeholder="Ex: Golden Retriever, Persa, Lop..."
                className={`mt-2 ${errors.breed ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.breed && (
                <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.breed}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="birthday" className="flex items-center gap-2">
                Data de nascimento: <span className="text-red-500">*</span>
              </Label>
              <Input
                id="birthday"
                type="date"
                value={petData.birthday}
                onChange={(e) => {
                  setPetData({...petData, birthday: e.target.value});
                  if (errors.birthday) setErrors({...errors, birthday: ""});
                }}
                className={`mt-2 ${errors.birthday ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.birthday && (
                <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.birthday}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="personality" className="flex items-center gap-2">
                Personalidade: <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="personality"
                value={petData.personality}
                onChange={(e) => {
                  setPetData({...petData, personality: e.target.value});
                  if (errors.personality) setErrors({...errors, personality: ""});
                }}
                placeholder="Conte sobre a personalidade do seu pet..."
                className={`mt-2 ${errors.personality ? 'border-red-500 focus:border-red-500' : ''}`}
                rows={3}
              />
              {errors.personality && (
                <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.personality}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="moments" className="flex items-center gap-2">
                Momentos especiais: <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="moments"
                value={petData.specialMoments}
                onChange={(e) => {
                  setPetData({...petData, specialMoments: e.target.value});
                  if (errors.specialMoments) setErrors({...errors, specialMoments: ""});
                }}
                placeholder="Conte sobre os momentos mais especiais com seu pet..."
                className={`mt-2 ${errors.specialMoments ? 'border-red-500 focus:border-red-500' : ''}`}
                rows={3}
              />
              {errors.specialMoments && (
                <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.specialMoments}
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Escolher fotos do pet</h3>
              <p className="text-muted-foreground mb-6">
                {petData.plan === "basico" ? "Até 5 fotos" : "Até 10 fotos"}
              </p>
            </div>

            <div className={`border-2 border-dashed rounded-xl p-8 text-center smooth-transition ${
              errors.photos ? 'border-red-500' : 'border-primary/30 hover:border-primary/50'
            }`}>
              <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-muted-foreground">Clique para fazer upload das fotos</p>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="photo-upload"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setPetData({...petData, photos: files});
                  if (errors.photos) setErrors({...errors, photos: ""});
                }}
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <Button variant="outline" className="mt-4">
                  Escolher Fotos
                </Button>
              </label>
            </div>

            {errors.photos && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.photos}
              </div>
            )}

            {petData.photos.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {petData.photos.length} foto(s) selecionada(s)
                  </p>
                  <Badge variant="outline">
                    {petData.photos.length}/{petData.plan === "basico" ? "5" : "10"}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {petData.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Badge className="absolute top-2 right-2">
                        {index + 1}
                      </Badge>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 smooth-transition"
                        onClick={() => {
                          const newPhotos = petData.photos.filter((_, i) => i !== index);
                          setPetData({...petData, photos: newPhotos});
                        }}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Escolha seu plano</h3>
              <p className="text-muted-foreground">Pagamento único, sem mensalidades</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`cursor-pointer smooth-transition hover:scale-105 ${
                    petData.plan === plan.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setPetData({...petData, plan: plan.id as "basico" | "premium"})}
                >
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} mb-4 flex items-center justify-center`}>
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">{plan.name}</h4>
                    <div className="text-3xl font-bold text-primary mb-4">{plan.price}</div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="mb-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quase lá!</h3>
              <p className="text-muted-foreground">Preencha os dados para criar seu livro</p>
            </div>

            <div className="bg-card/50 rounded-xl p-6 mb-6">
              <h4 className="font-semibold mb-4">Resumo do seu livro:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Pet:</strong> {petData.name}</p>
                <p><strong>Espécie:</strong> {petData.species}</p>
                <p><strong>Raça:</strong> {petData.breed}</p>
                <p><strong>Plano:</strong> {plans.find(p => p.id === petData.plan)?.name}</p>
                <p><strong>Preço:</strong> {plans.find(p => p.id === petData.plan)?.price}</p>
                <p><strong>Fotos:</strong> {petData.photos.length}</p>
              </div>
            </div>

            <Button
              onClick={handleCreate}
              disabled={isCreating}
              className="w-full text-lg py-6 glow-effect"
            >
              {isCreating ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Criando seu livro...
                </>
              ) : (
                <>
                  Criar Meu Livro
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPreview = () => {
    return (
      <Card className="sticky top-8">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <Eye className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold">Como vai ficar 👇</h3>
          </div>
          
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-4 mb-4">
            <div className="text-center">
              <PetLoverLogoPerfectPaw size="sm" className="justify-center mb-2" />
              <p className="text-sm text-muted-foreground">petlover.com/{petData.name?.toLowerCase() || 'seu-pet'}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pet:</span>
              <span className="font-medium">{petData.name || 'Nome do pet'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Espécie:</span>
              <span className="font-medium">{petData.species || 'Espécie'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plano:</span>
              <span className="font-medium">{plans.find(p => p.id === petData.plan)?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fotos:</span>
              <span className="font-medium">{petData.photos.length}</span>
            </div>
          </div>

          <Button className="w-full mt-4" variant="outline">
            Criar nosso site
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8 pt-24">
        {/* Header */}
        <div className="text-center mb-8">
          <PetLoverLogoPerfectPaw size="lg" className="justify-center mb-4" />
          <h1 className="text-3xl font-bold mb-2">Quase lá!</h1>
          <p className="text-muted-foreground">Preencha os dados para criar seu livro</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="ml-2 text-sm font-medium">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full smooth-transition"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content with Preview */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                {renderStep()}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Voltar
              </Button>
              
              {currentStep < steps.length && (
                <Button 
                  onClick={handleNext}
                  disabled={Object.keys(errors).length > 0}
                  className={Object.keys(errors).length > 0 ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  Próximo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>

            {/* Error Summary */}
            {Object.keys(errors).length > 0 && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-medium">Preencha todos os campos obrigatórios</span>
                </div>
                <ul className="text-sm text-red-600 space-y-1">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Preview Sidebar */}
          <div className="lg:col-span-1">
            {renderPreview()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCreatorAdvanced;
