import { Sparkles } from "lucide-react";

interface SkillCardProps {
  logo?: string;
  name: string;
  isTextOnly?: boolean;
}

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";

const SkillCard = ({ logo, name, isTextOnly }: SkillCardProps) => {
  if (isTextOnly) {
    return (
      <div className="glass px-3 py-1.5 text-[11px] md:text-xs font-mono text-pastel-dark rounded-xl flex items-center gap-2 hover:-translate-y-1 hover:shadow-md hover:border-white/50 hover:bg-white/20 cursor-default transition-all duration-300">
        <Sparkles size={12} className="text-pastel-accent shrink-0 opacity-80" />
        <span className="font-medium tracking-tight text-pastel-dark/90">{name}</span>
      </div>
    );
  }

  const imgSrc = logo?.startsWith("http") ? logo : logo ? `${DEVICON_BASE}${logo}` : undefined;

  return (
    <div className="flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/40 border border-white/50 shadow-sm hover:-translate-y-1 hover:scale-105 hover:bg-white/60 hover:shadow-xl hover:shadow-pastel-lilac/30 transition-all duration-300 cursor-default group backdrop-blur-md">
      {imgSrc && (
        <img src={imgSrc} alt={name} className="w-6 h-6 md:w-8 md:h-8 object-contain drop-shadow-sm mb-1 transition-transform duration-300 group-hover:scale-110" loading="lazy" />
      )}
      <span className="font-mono text-[9px] md:text-[10px] text-pastel-dark text-center leading-tight px-1 font-medium">{name}</span>
    </div>
  );
};

export default SkillCard;
