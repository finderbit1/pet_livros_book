import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Smartphone, 
  Shield, 
  CheckCircle, 
  Download, 
  Share2,
  Heart,
  Sparkles,
  BookOpen
} from "lucide-react";
import { BookData } from "../BookCreator";

interface PaymentStepProps {
  bookData: BookData;
  onPrev: () => void;
}

const PaymentStep = ({ bookData, onPrev }: PaymentStepProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix">("pix");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    acceptTerms: false
  });

  const handlePayment = async () => {
    if (!customerData.name || !customerData.email || !customerData.acceptTerms) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    setIsProcessing(true);
    
    // Simular processamento
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
    }, 3000);
  };

  const price = bookData.plan === "premium" ? "R$ 49,00" : "R$ 29,00";

  if (isCompleted) {
    return (
      <div className="space-y-8">
        {/* Success Header */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 text-green-600">
            Parabéns! 🎉
          </h2>
          <p className="text-xl text-muted-foreground">
            Seu livro foi criado com sucesso!
          </p>
        </div>

        {/* Success Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Book Summary */}
          <Card className="card-gradient border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                Seu Livro: "{bookData.title || `As Aventuras de ${bookData.petData.name}`}"
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pet:</span>
                  <span className="font-medium">{bookData.petData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Template:</span>
                  <Badge className="bg-primary/10 text-primary">
                    {bookData.template}
                  </Badge>
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

          {/* Download Options */}
          <Card className="card-gradient">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Seus Downloads</h3>
              
              <div className="space-y-3">
                <Button className="w-full glow-effect">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar PDF do Livro
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Acessar Site Interativo
                </Button>
                
                {bookData.plan === "premium" && (
                  <Button variant="outline" className="w-full">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Recursos Premium
                  </Button>
                )}
              </div>
              
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  📧 Um email com todos os links foi enviado para <strong>{customerData.email}</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="card-gradient">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Próximos Passos</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/40 flex items-center justify-center">
                  <Download className="w-6 h-6 text-blue-500" />
                </div>
                <h4 className="font-medium mb-1">1. Baixe o PDF</h4>
                <p className="text-sm text-muted-foreground">Seu livro está pronto para download</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/40 flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-green-500" />
                </div>
                <h4 className="font-medium mb-1">2. Compartilhe</h4>
                <p className="text-sm text-muted-foreground">Use o site interativo para compartilhar</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/40 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-purple-500" />
                </div>
                <h4 className="font-medium mb-1">3. Aproveite</h4>
                <p className="text-sm text-muted-foreground">Desfrute da história do seu pet</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button 
            onClick={() => window.location.href = '/'}
            className="glow-effect"
          >
            Voltar ao Início
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
          <CreditCard className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Finalize sua compra</h2>
        <p className="text-muted-foreground">
          Último passo para criar sua história especial
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Payment Form */}
        <div className="space-y-6">
          <Card className="card-gradient">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Dados para Faturamento</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome completo *</Label>
                  <Input
                    id="name"
                    value={customerData.name}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Seu nome completo"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerData.email}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="seu@email.com"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(11) 99999-9999"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Forma de Pagamento</h3>
              
              <div className="space-y-3">
                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    paymentMethod === "pix" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => setPaymentMethod("pix")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">PIX</h4>
                      <p className="text-sm text-muted-foreground">Pagamento instantâneo</p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">Cartão de Crédito</h4>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, Elo</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={customerData.acceptTerms}
                  onCheckedChange={(checked) => 
                    setCustomerData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                  }
                />
                <div className="text-sm">
                  <Label htmlFor="terms" className="cursor-pointer">
                    Aceito os{" "}
                    <a href="#" className="text-primary hover:underline">
                      Termos de Uso
                    </a>{" "}
                    e{" "}
                    <a href="#" className="text-primary hover:underline">
                      Política de Privacidade
                    </a>
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="card-gradient">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Resumo do Pedido</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Livro:</span>
                  <span>{bookData.title || `As Aventuras de ${bookData.petData.name}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Template:</span>
                  <Badge className="bg-primary/10 text-primary">
                    {bookData.template}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plano:</span>
                  <span>{bookData.plan === "premium" ? "Premium" : "Básico"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fotos:</span>
                  <span>{bookData.photos.length}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="hero-gradient">{price}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/40 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold">Pagamento Seguro</h4>
                  <p className="text-sm text-muted-foreground">Seus dados estão protegidos</p>
                </div>
              </div>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Criptografia SSL</li>
                <li>• Sem armazenamento de dados sensíveis</li>
                <li>• Processamento seguro</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Voltar
        </Button>
        
        <Button 
          onClick={handlePayment}
          disabled={isProcessing || !customerData.name || !customerData.email || !customerData.acceptTerms}
          className="glow-effect"
        >
          {isProcessing ? "Processando..." : `Pagar ${price}`}
        </Button>
      </div>
    </div>
  );
};

export default PaymentStep;
