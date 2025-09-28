import { useState } from "react";

const BookCreatorTest = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Teste - Criador de Livros
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Etapa atual: {currentStep}
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Funcionando!</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                O componente está carregando corretamente.
              </p>
              
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Próxima Etapa ({currentStep + 1})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCreatorTest;
