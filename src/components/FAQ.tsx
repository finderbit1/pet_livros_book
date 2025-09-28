import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "Como funciona o processo de criação do livro?",
      answer: "Você cadastra seu pet com fotos e informações básicas, nossa equipe cria uma história personalizada e você recebe o PDF em poucos minutos."
    },
    {
      question: "Quanto tempo leva para criar um livro?",
      answer: "Menos de 10 minutos. Nossa equipe gera a história em 3-5 minutos após você enviar as informações."
    },
    {
      question: "Preciso ter muitas fotos do meu pet?",
      answer: "Não! Você pode começar com apenas 1 foto, mas recomendamos 3-5 fotos para uma história mais rica."
    },
    {
      question: "Posso testar antes de comprar?",
      answer: "Sim! Você pode criar um livro de exemplo gratuito para ver como funciona antes de escolher seu pacote."
    },
    {
      question: "É pagamento único mesmo?",
      answer: "Sim! Você paga apenas uma vez e pode criar quantos livros quiser dentro do seu pacote."
    },
    {
      question: "Como funciona a entrega dos livros físicos?",
      answer: "Após criar seu livro digital, você pode solicitar a versão impressa. Entregamos em 5-7 dias úteis para todo o Brasil."
    },
    {
      question: "Meus dados estão seguros?",
      answer: "Sim! Utilizamos criptografia e seguimos todas as normas de proteção de dados (LGPD)."
    },
    {
      question: "Funciona com qualquer tipo de pet?",
      answer: "Sim! Criamos histórias para cães, gatos, pássaros, coelhos e outros pets."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Perguntas
            <span className="hero-gradient"> Frequentes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre nosso serviço
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openItems.includes(index);
            
            return (
              <div
                key={index}
                className="card-gradient rounded-2xl overflow-hidden smooth-transition hover:scale-[1.02]"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between group"
                >
                  <h4 className="font-semibold text-lg group-hover:text-primary transition-colors pr-4">
                    {faq.question}
                  </h4>
                  <ChevronDown 
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <div className="pt-4 border-t border-border/30">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
