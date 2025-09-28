import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, BookOpen, Sparkles, Upload, Download, Share2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const CreateCounter = () => {
  const [formData, setFormData] = useState({
    petName: "",
    startDate: new Date(),
    message: "",
    photo: null as File | null,
    plan: "basic" as "basic" | "premium"
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const calculateTimeTogether = () => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - formData.startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = diffDays % 30;
    
    return { years, months, days };
  };

  const timeTogether = calculateTimeTogether();

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
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
                <span className="text-sm text-muted-foreground -mt-1">por IA</span>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Quase lá!
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Preencha os dados para criar seu livro personalizado do seu pet
            </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form Section */}
          <div className="space-y-8">
            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <Card 
                className={`cursor-pointer smooth-transition hover:scale-105 ${
                  formData.plan === "basic" ? "ring-2 ring-primary glow-effect" : ""
                }`}
                onClick={() => handleInputChange("plan", "basic")}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-2">Digital</h3>
                  <div className="text-2xl font-bold hero-gradient mb-2">R$ 29</div>
                  <p className="text-sm text-muted-foreground">PDF + 10 páginas + templates básicos</p>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer smooth-transition hover:scale-105 ${
                  formData.plan === "premium" ? "ring-2 ring-primary glow-effect" : ""
                }`}
                onClick={() => handleInputChange("plan", "premium")}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-2">Premium</h3>
                  <div className="text-2xl font-bold hero-gradient mb-2">R$ 49</div>
                  <p className="text-sm text-muted-foreground">PDF + impressão + templates premium</p>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <Card className="card-gradient">
              <CardHeader>
                <h2 className="text-2xl font-bold">Dados do Livro</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="petName">Nome do pet:</Label>
                  <Input
                    id="petName"
                    value={formData.petName}
                    onChange={(e) => handleInputChange("petName", e.target.value)}
                    placeholder="Ex: Bella, Rex, Mimi..."
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Título do livro:</Label>
                  <Input
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Ex: As Aventuras da Bella"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Data de adoção/chegada:</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full mt-2 justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? (
                          format(formData.startDate, "dd/MM/yyyy", { locale: ptBR })
                        ) : (
                          <span>Selecione a data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => date && handleInputChange("startDate", date)}
                        initialFocus
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="photo">Escolher foto do pet</Label>
                  <div className="mt-2">
                    <input
                      type="file"
                      id="photo"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="photo"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary smooth-transition"
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="text-sm text-muted-foreground">
                          Clique para fazer upload
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <Button 
                  className="w-full glow-effect text-lg py-6"
                  disabled={!formData.petName || !formData.startDate}
                >
                  Criar Meu Livro
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center">Como vai ficar 👇</h3>
            
            <Card className="card-gradient glow-effect">
              <CardContent className="p-8">
                {/* Book Cover Preview */}
                <div className="text-center mb-8">
                  <div className="w-48 h-64 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border-2 border-primary/30 flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Book Cover Content */}
                    <div className="text-center p-4">
                      <div className="text-4xl mb-4">📖</div>
                      <h2 className="text-xl font-bold text-primary mb-2">
                        {formData.message || "As Aventuras do Pet"}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {formData.petName ? `A história de ${formData.petName}` : "Uma história especial"}
                      </p>
                    </div>
                    
                    {/* Photo Preview */}
                    {previewUrl && (
                      <div className="absolute top-4 right-4">
                        <img
                          src={previewUrl}
                          alt="Preview do pet"
                          className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Book Details */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Detalhes do Livro</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="font-semibold text-primary">Páginas</div>
                        <div>{formData.plan === "premium" ? "20 páginas" : "10 páginas"}</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="font-semibold text-primary">Formato</div>
                        <div>PDF + {formData.plan === "premium" ? "Impressão" : "Digital"}</div>
                      </div>
                    </div>
                  </div>

                  {/* Time Together */}
                  <div className="text-center">
                    <div className="text-2xl font-bold hero-gradient mb-2">
                      {timeTogether.years > 0 && `${timeTogether.years} anos `}
                      {timeTogether.months > 0 && `${timeTogether.months} meses `}
                      {timeTogether.days} dias
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formData.petName ? `juntos com ${formData.petName}` : "de histórias"}
                    </p>
                  </div>

                  {/* Download Options */}
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Baixar PDF
                    </Button>
                    {formData.plan === "premium" && (
                      <Button className="w-full" variant="outline">
                        <Share2 className="w-4 h-4 mr-2" />
                        Encomendar Impressão
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid gap-4">
              <div className="flex items-center gap-3 p-4 card-gradient rounded-lg">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">História personalizada</p>
                  <p className="text-sm text-muted-foreground">IA cria narrativa única</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 card-gradient rounded-lg">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/40 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold">Templates premium</p>
                  <p className="text-sm text-muted-foreground">Designs profissionais</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 card-gradient rounded-lg">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center">
                  <Download className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold">Download instantâneo</p>
                  <p className="text-sm text-muted-foreground">PDF pronto em minutos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCounter;
