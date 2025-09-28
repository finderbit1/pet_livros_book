import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Eye, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PhotosStepProps {
  photos: File[];
  onUpdate: (photos: File[]) => void;
  onNext: () => void;
  onPrev: () => void;
  isValid: boolean;
  plan?: "basic" | "premium";
}

const PhotosStep = ({ photos, onUpdate, onNext, onPrev, isValid, plan = "basic" }: PhotosStepProps) => {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxPhotos = plan === "premium" ? 10 : 5;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Upload iniciado:', event.target.files);
    const files = Array.from(event.target.files || []);
    console.log('Arquivos selecionados:', files);
    
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    console.log('Arquivos de imagem:', imageFiles);
    
    if (photos.length + imageFiles.length > maxPhotos) {
      alert(`Você pode adicionar no máximo ${maxPhotos} fotos no plano ${plan === "premium" ? "Premium" : "Básico"}`);
      return;
    }

    console.log('Atualizando fotos:', [...photos, ...imageFiles]);
    onUpdate([...photos, ...imageFiles]);
    
    // Limpar o input para permitir selecionar os mesmos arquivos novamente
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onUpdate(newPhotos);
  };

  const getImagePreview = (file: File): string => {
    return URL.createObjectURL(file);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    console.log('Arquivos arrastados:', files);
    
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    console.log('Imagens arrastadas:', imageFiles);
    
    if (photos.length + imageFiles.length > maxPhotos) {
      alert(`Você pode adicionar no máximo ${maxPhotos} fotos no plano ${plan === "premium" ? "Premium" : "Básico"}`);
      return;
    }

    onUpdate([...photos, ...imageFiles]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Adicione fotos especiais</h2>
        <p className="text-muted-foreground">
          Escolha as melhores fotos do seu pet para criar uma história única
        </p>
      </div>

      {/* Upload Area */}
      <div className="space-y-4">
        <Card 
          className={`border-2 border-dashed transition-colors ${
            isDragOver 
              ? 'border-primary bg-primary/5' 
              : 'border-primary/30 hover:border-primary'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CardContent className="p-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">Upload de Fotos</h3>
              <p className="text-muted-foreground mb-4">
                Arraste e solte suas fotos aqui ou clique para selecionar
              </p>
              
              <div className="space-y-2">
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="glow-effect"
                  disabled={photos.length >= maxPhotos}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Fotos
                </Button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                <p className="text-sm text-muted-foreground">
                  {photos.length}/{maxPhotos} fotos • Máximo 5MB por foto
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photo Grid */}
        {photos.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Suas fotos ({photos.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo, index) => (
                <Card key={index} className="relative group overflow-hidden">
                  <CardContent className="p-2">
                    <div className="aspect-square relative">
                      <img
                        src={getImagePreview(photo)}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="secondary">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Preview da Foto</DialogTitle>
                            </DialogHeader>
                            <div className="flex justify-center">
                              <img
                                src={getImagePreview(photo)}
                                alt={`Preview ${index + 1}`}
                                className="max-h-[500px] rounded-lg"
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => removePhoto(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-center">
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(photo.size)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">
              💡 Dicas para melhores fotos:
            </h3>
            <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-400">
              <li>• Use fotos com boa iluminação</li>
              <li>• Inclua fotos de diferentes momentos (brincando, dormindo, etc.)</li>
              <li>• Fotos com o pet sozinho funcionam melhor</li>
              <li>• Evite fotos muito escuras ou desfocadas</li>
            </ul>
          </CardContent>
        </Card>
      </div>

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
          Continuar para Templates
        </Button>
      </div>

      {!isValid && (
        <p className="text-center text-sm text-muted-foreground">
          Adicione pelo menos uma foto para continuar
        </p>
      )}
    </div>
  );
};

export default PhotosStep;
