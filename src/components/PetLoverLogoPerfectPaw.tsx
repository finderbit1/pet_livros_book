import { Heart } from "lucide-react";

interface PetLoverLogoPerfectPawProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const PetLoverLogoPerfectPaw = ({ size = "md", showText = true, className = "" }: PetLoverLogoPerfectPawProps) => {
  const sizes = {
    sm: { 
      logo: "w-8 h-8", 
      text: "text-lg", 
      mainHeart: "w-4 h-4",
      toeHeart: "w-2.5 h-2.5",
      smallHeart: "w-2 h-2"
    },
    md: { 
      logo: "w-12 h-12", 
      text: "text-xl", 
      mainHeart: "w-6 h-6",
      toeHeart: "w-4 h-4",
      smallHeart: "w-3 h-3"
    },
    lg: { 
      logo: "w-16 h-16", 
      text: "text-2xl", 
      mainHeart: "w-8 h-8",
      toeHeart: "w-5 h-5",
      smallHeart: "w-4 h-4"
    },
    xl: { 
      logo: "w-20 h-20", 
      text: "text-3xl", 
      mainHeart: "w-10 h-10",
      toeHeart: "w-6 h-6",
      smallHeart: "w-5 h-5"
    }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Perfect paw print made of hearts */}
      <div className={`relative ${currentSize.logo}`}>
        {/* Main paw pad - largest heart at bottom center */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <Heart className={`${currentSize.mainHeart} text-primary fill-current drop-shadow-lg animate-heart-beat`} />
        </div>
        
        {/* Top center toe - medium heart */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
          <Heart className={`${currentSize.toeHeart} text-secondary fill-current drop-shadow-md`} />
        </div>
        
        {/* Top left toe - small heart */}
        <div className="absolute top-1/8 left-1/4">
          <Heart className={`${currentSize.smallHeart} text-accent fill-current drop-shadow-sm`} />
        </div>
        
        {/* Top right toe - small heart */}
        <div className="absolute top-1/8 right-1/4">
          <Heart className={`${currentSize.smallHeart} text-primary fill-current drop-shadow-sm`} />
        </div>
        
        {/* Bottom left toe - small heart */}
        <div className="absolute bottom-1/4 left-1/5">
          <Heart className={`${currentSize.smallHeart} text-secondary fill-current drop-shadow-sm`} />
        </div>
        
        {/* Bottom right toe - small heart */}
        <div className="absolute bottom-1/4 right-1/5">
          <Heart className={`${currentSize.smallHeart} text-accent fill-current drop-shadow-sm`} />
        </div>
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-cute ${currentSize.text} hero-gradient`}>
            PetLover
          </span>
          <span className="text-xs text-muted-foreground -mt-1">
            Eternize a história do seu melhor amigo
          </span>
        </div>
      )}
    </div>
  );
};

export default PetLoverLogoPerfectPaw;
