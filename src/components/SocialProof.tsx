import { BookOpen, Sparkles, Download, Globe, Star, Users, FileText, Heart } from "lucide-react";

const SocialProof = () => {
  const stats = [
    {
      icon: BookOpen,
      number: "2.847+",
      label: "livros criados",
      color: "text-primary"
    },
    {
      icon: Sparkles,
      number: "8.341+",
      label: "histórias geradas por IA",
      color: "text-secondary"
    },
    {
      icon: Download,
      number: "5.123+",
      label: "PDFs baixados",
      color: "text-accent"
    },
    {
      icon: Globe,
      number: "1.456+",
      label: "sites interativos criados",
      color: "text-primary"
    }
  ];

  const companies = [
    { name: "Pet Magazine", logo: "📰" },
    { name: "Veterinária & Cia", logo: "🏥" },
    { name: "Blog do Pet", logo: "🐾" },
    { name: "Pet Lovers BR", logo: "❤️" },
    { name: "Animais & Cia", logo: "🐕" },
    { name: "Pet News", logo: "📱" }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      pet: "Bella (Golden Retriever)",
      rating: 5,
      text: "Incrível! Criei um livro lindo da minha Bella em minutos.",
      avatar: "👩‍🦰"
    },
    {
      name: "João Santos", 
      pet: "Mimi (Gato Persa)",
      rating: 5,
      text: "A IA capturou perfeitamente a personalidade da Mimi.",
      avatar: "👨‍💼"
    },
    {
      name: "Ana Costa",
      pet: "Rex (Pastor Alemão)",
      rating: 5,
      text: "Meus filhos adoraram o livro de colorir do Rex!",
      avatar: "👩‍👧‍👦"
    }
  ];

  return (
    <section className="py-20 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        {/* Featured in section */}
        <div className="text-center mb-16">
          <p className="text-muted-foreground mb-6">Destaque em:</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {companies.map((company, index) => (
              <div key={index} className="flex items-center gap-2 opacity-60 hover:opacity-100 smooth-transition">
                <span className="text-2xl">{company.logo}</span>
                <span className="text-sm font-medium">{company.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="text-center animate-fade-in card-gradient p-6 rounded-2xl smooth-transition hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.color} bg-current/10 mb-4`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold mb-2 hero-gradient">
                  {stat.number}
                </div>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">
            O que nossos <span className="hero-gradient">usuários dizem</span>
          </h3>
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-primary fill-current" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">4.9/5 baseado em 1.200+ avaliações</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="card-gradient p-6 rounded-2xl animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.pet}</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-current" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;