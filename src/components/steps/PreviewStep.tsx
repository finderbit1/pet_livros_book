import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Share2, Heart, Calendar, Sparkles, BookOpen } from "lucide-react";
import { BookData } from "../BookCreator";

interface PreviewStepProps {
  bookData: BookData;
  onNext: () => void;
  onPrev: () => void;
}

const PreviewStep = ({ bookData, onNext, onPrev }: PreviewStepProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const calculateTimeTogether = () => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - bookData.petData.birthday.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = diffDays % 30;
    
    return { years, months, days };
  };

  const timeTogether = calculateTimeTogether();

  const getTemplateInfo = (templateId: string) => {
    const templates: Record<string, { name: string; color: string; preview: string }> = {
      classic: { name: "Clássico", color: "from-blue-500 to-indigo-500", preview: "📖" },
      playful: { name: "Brincalhão", color: "from-pink-500 to-purple-500", preview: "🎨" },
      nature: { name: "Natureza", color: "from-green-500 to-emerald-500", preview: "🌿" },
      royal: { name: "Real", color: "from-yellow-500 to-orange-500", preview: "👑" },
      magical: { name: "Mágico", color: "from-purple-500 to-pink-500", preview: "✨" }
    };
    return templates[templateId] || templates.classic;
  };

  const templateInfo = getTemplateInfo(bookData.template);

  const mockPages = [
    {
      type: "cover",
      title: bookData.title || `As Aventuras de ${bookData.petData.name}`,
      subtitle: `A história especial de ${bookData.petData.name}`,
      image: bookData.photos[0] ? URL.createObjectURL(bookData.photos[0]) : null
    },
    {
      type: "intro",
      title: "Apresentação",
      content: `Este é ${bookData.petData.name}, um ${bookData.petData.species} ${bookData.petData.breed ? `da raça ${bookData.petData.breed}` : ''} muito especial.`,
      image: bookData.photos[1] ? URL.createObjectURL(bookData.photos[1]) : null
    },
    {
      type: "personality",
      title: "Personalidade",
      content: `${bookData.petData.name} é ${bookData.petData.personality.join(', ').toLowerCase()}.`,
      image: bookData.photos[2] ? URL.createObjectURL(bookData.photos[2]) : null
    },
    {
      type: "moments",
      title: "Momentos Especiais",
      content: bookData.petData.specialMoments || "Cada dia com ele é uma nova aventura cheia de amor e diversão.",
      image: bookData.photos[3] ? URL.createObjectURL(bookData.photos[3]) : null
    }
  ];

  const currentPageData = mockPages[currentPage] || mockPages[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
          <Eye className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Preview do seu livro</h2>
        <p className="text-muted-foreground">
          Veja como ficará sua história antes de finalizar
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Book Preview */}
        <div className="space-y-6">
          <Card className="card-gradient">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-4">Seu Livro</h3>
                
                {/* Book Cover */}
                <div className="relative mx-auto w-48 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border-2 border-primary/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                  
                  {/* Template Preview */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${templateInfo.color} opacity-20`} />
                  
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center">
                    <div className="text-4xl mb-4">{templateInfo.preview}</div>
                    <h4 className="text-lg font-bold text-primary mb-2">
                      {currentPageData.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {currentPageData.subtitle || currentPageData.content?.substring(0, 50) + "..."}
                    </p>
                    
                    {/* Pet Photo */}
                    {currentPageData.image && (
                      <div className="absolute top-4 right-4">
                        <img
                          src={currentPageData.image}
                          alt="Pet"
                          className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Page Navigation */}
              <div className="flex justify-center gap-2 mb-4">
                {mockPages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentPage === index ? 'bg-primary' : 'bg-muted-foreground'
                    }`}
                  />
                ))}
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Página {currentPage + 1} de {mockPages.length}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Book Details */}
          <Card className="card-gradient">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Detalhes do Livro</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Template:</span>
                  <Badge className="bg-primary/10 text-primary">
                    {templateInfo.name}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Páginas:</span>
                  <span>{bookData.plan === "premium" ? "10 páginas" : "5 páginas"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fotos:</span>
                  <span>{bookData.photos.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plano:</span>
                  <Badge className={bookData.plan === "premium" ? "bg-purple-500/10 text-purple-500" : "bg-blue-500/10 text-blue-500"}>
                    {bookData.plan === "premium" ? "Premium" : "Básico"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Book Info */}
        <div className="space-y-6">
          {/* Pet Info */}
          <Card className="card-gradient">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/20 to-pink-500/40 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Sobre {bookData.petData.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {bookData.petData.species} {bookData.petData.breed && `• ${bookData.petData.breed}`}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {timeTogether.years > 0 && `${timeTogether.years} anos `}
                    {timeTogether.months > 0 && `${timeTogether.months} meses `}
                    {timeTogether.days} dias de vida
                  </span>
                </div>

                {bookData.petData.personality.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Personalidade:</p>
                    <div className="flex flex-wrap gap-1">
                      {bookData.petData.personality.slice(0, 4).map((trait) => (
                        <Badge key={trait} variant="outline" className="text-xs">
                          {trait}
                        </Badge>
                      ))}
                      {bookData.petData.personality.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{bookData.petData.personality.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="card-gradient">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">O que você receberá:</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">PDF Digital</p>
                    <p className="text-sm text-muted-foreground">Download instantâneo</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/40 flex items-center justify-center">
                    <Share2 className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Site Interativo</p>
                    <p className="text-sm text-muted-foreground">
                      {bookData.plan === "premium" ? "Acesso para sempre" : "1 ano de acesso"}
                    </p>
                  </div>
                </div>

                {bookData.plan === "premium" && (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/40 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                      </div>
                      <div>
                        <p className="font-medium">Com Música</p>
                        <p className="text-sm text-muted-foreground">História com trilha sonora</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/20 to-pink-500/40 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-pink-500" />
                      </div>
                      <div>
                        <p className="font-medium">PDF Bobie Godies</p>
                        <p className="text-sm text-muted-foreground">Fotos especiais para colorir</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Price Summary */}
          <Card className="card-gradient border-primary/20">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Resumo do Pedido</h3>
                <div className="text-3xl font-bold hero-gradient mb-2">
                  {bookData.plan === "premium" ? "R$ 49,00" : "R$ 29,00"}
                </div>
                <p className="text-sm text-muted-foreground">Pagamento único</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Voltar
        </Button>
        
        <Button onClick={onNext} className="glow-effect">
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
};

export default PreviewStep;
