import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Heart, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PetData } from "../BookCreator";

interface PetInfoStepProps {
  petData: PetData;
  onUpdate: (petData: PetData) => void;
  onNext: () => void;
  isValid: boolean;
}

const PetInfoStep = ({ petData, onUpdate, onNext, isValid }: PetInfoStepProps) => {
  const [localData, setLocalData] = useState(petData);

  const personalityOptions = [
    "Brincalhão", "Calmo", "Protetor", "Independente", 
    "Carinhoso", "Ativo", "Curioso", "Tímido", 
    "Sociável", "Territorial", "Inteligente", "Preguiçoso"
  ];

  const speciesOptions = [
    "Cachorro", "Gato", "Pássaro", "Coelho", 
    "Hamster", "Peixe", "Tartaruga", "Outro"
  ];

  const updateData = (updates: Partial<PetData>) => {
    const newData = { ...localData, ...updates };
    setLocalData(newData);
    onUpdate(newData);
  };

  const handlePersonalityChange = (trait: string, checked: boolean) => {
    const newPersonality = checked 
      ? [...localData.personality, trait]
      : localData.personality.filter(p => p !== trait);
    updateData({ personality: newPersonality });
  };

  const handleNext = () => {
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Conte-nos sobre seu pet</h2>
        <p className="text-muted-foreground">
          Quanto mais detalhes, mais personalizada será a história!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <Label htmlFor="petName" className="text-lg font-semibold">
              Nome do pet *
            </Label>
            <Input
              id="petName"
              value={localData.name}
              onChange={(e) => updateData({ name: e.target.value })}
              placeholder="Ex: Bella, Rex, Mimi..."
              className="mt-2 text-lg"
            />
          </div>

          <div>
            <Label className="text-lg font-semibold">Espécie *</Label>
            <Select 
              value={localData.species} 
              onValueChange={(value) => updateData({ species: value })}
            >
              <SelectTrigger className="mt-2 text-lg">
                <SelectValue placeholder="Selecione a espécie" />
              </SelectTrigger>
              <SelectContent>
                {speciesOptions.map((species) => (
                  <SelectItem key={species} value={species}>
                    {species}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="breed" className="text-lg font-semibold">
              Raça/Variedade
            </Label>
            <Input
              id="breed"
              value={localData.breed}
              onChange={(e) => updateData({ breed: e.target.value })}
              placeholder="Ex: Golden Retriever, Persa, Canário..."
              className="mt-2 text-lg"
            />
          </div>

          <div>
            <Label className="text-lg font-semibold">Sexo</Label>
            <Select 
              value={localData.gender || ""} 
              onValueChange={(value) => updateData({ gender: value as 'male' | 'female' || undefined })}
            >
              <SelectTrigger className="mt-2 text-lg">
                <SelectValue placeholder="Selecione o sexo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Macho</SelectItem>
                <SelectItem value="female">Fêmea</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-lg font-semibold">Data de nascimento</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full mt-2 justify-start text-left font-normal text-lg h-12"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {localData.birthday ? (
                    format(localData.birthday, "dd/MM/yyyy", { locale: ptBR })
                  ) : (
                    <span>Selecione a data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={localData.birthday}
                  onSelect={(date) => date && updateData({ birthday: date })}
                  initialFocus
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <Label className="text-lg font-semibold mb-4 block">
              Personalidade do pet
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {personalityOptions.map((trait) => (
                <div key={trait} className="flex items-center space-x-2">
                  <Checkbox
                    id={trait}
                    checked={localData.personality.includes(trait)}
                    onCheckedChange={(checked) => 
                      handlePersonalityChange(trait, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={trait} 
                    className="text-sm font-normal cursor-pointer"
                  >
                    {trait}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="specialMoments" className="text-lg font-semibold">
              Momentos especiais
            </Label>
            <Textarea
              id="specialMoments"
              value={localData.specialMoments}
              onChange={(e) => updateData({ specialMoments: e.target.value })}
              placeholder="Conte-nos sobre momentos especiais, brincadeiras favoritas, lugares que gosta de visitar..."
              className="mt-2 min-h-[120px] text-lg"
            />
          </div>
        </div>
      </div>

      {/* Preview Card */}
      <div className="mt-8">
        <Card className="card-gradient border-primary/20">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Preview da História</h3>
                <p className="text-sm text-muted-foreground">
                  Como será apresentado no livro
                </p>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-primary mb-2">
                {localData.name || "Nome do Pet"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {localData.species && localData.breed 
                  ? `${localData.species} da raça ${localData.breed}`
                  : localData.species || "Espécie do pet"
                }
              </p>
              {localData.personality.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">Personalidade:</p>
                  <div className="flex flex-wrap gap-1">
                    {localData.personality.slice(0, 3).map((trait) => (
                      <span 
                        key={trait}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {trait}
                      </span>
                    ))}
                    {localData.personality.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        +{localData.personality.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <Button 
          onClick={handleNext}
          disabled={!isValid}
          className="px-8 py-6 text-lg glow-effect"
        >
          Continuar para Fotos
        </Button>
        {!isValid && (
          <p className="text-sm text-muted-foreground mt-2">
            Preencha pelo menos o nome e espécie do pet
          </p>
        )}
      </div>
    </div>
  );
};

export default PetInfoStep;
