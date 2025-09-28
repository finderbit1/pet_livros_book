import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ImageUploadTest = () => {
  const [photos, setPhotos] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('=== TESTE DE UPLOAD ===');
    console.log('Event:', event);
    console.log('Files:', event.target.files);
    
    const files = Array.from(event.target.files || []);
    console.log('Files array:', files);
    
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    console.log('Image files:', imageFiles);
    
    setPhotos(prev => {
      const newPhotos = [...prev, ...imageFiles];
      console.log('New photos state:', newPhotos);
      return newPhotos;
    });
    
    // Limpar input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold">Teste de Upload de Imagens</h2>
      
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <Button onClick={() => fileInputRef.current?.click()}>
              Selecionar Imagens
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <p>Fotos selecionadas: {photos.length}</p>
            
            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <Card key={index} className="relative">
                    <CardContent className="p-2">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Test ${index}`}
                        className="w-full h-32 object-cover rounded"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removePhoto(index)}
                        className="mt-2 w-full"
                      >
                        Remover
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageUploadTest;
