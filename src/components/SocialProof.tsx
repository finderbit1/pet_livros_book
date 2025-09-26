import { Star, Heart, Users, Trophy } from "lucide-react";

const SocialProof = () => {
  const stats = [
    {
      icon: Users,
      number: "5.240+",
      label: "pets cadastrados",
      color: "text-primary"
    },
    {
      icon: Heart,
      number: "12.8K+",
      label: "momentos compartilhados",
      color: "text-secondary"
    },
    {
      icon: Star,
      number: "4.9",
      label: "avaliação média",
      color: "text-accent"
    },
    {
      icon: Trophy,
      number: "50+",
      label: "cidades atendidas",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-20 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-muted-foreground mb-4">Destaque em:</p>
          <div className="flex items-center justify-center gap-8 opacity-60">
            <span className="text-sm font-medium">Pet Magazine</span>
            <span className="text-sm font-medium">Animal Today</span>
            <span className="text-sm font-medium">Pets & Tech</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
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
      </div>
    </section>
  );
};

export default SocialProof;