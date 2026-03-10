import { motion } from "framer-motion";
import { ArrowLeft, Crown, PartyPopper, Coffee, Flame } from "lucide-react";
import type { StyleCategory } from "@/pages/Index";

interface StyleSelectorProps {
  onSelect: (style: StyleCategory) => void;
  onBack: () => void;
}

const styles: { id: StyleCategory; label: string; desc: string; icon: React.ReactNode; gradient: string }[] = [
  { id: "formal", label: "Formal", desc: "Elegant & sophisticated", icon: <Crown className="w-6 h-6" />, gradient: "from-primary/20 to-primary/5" },
  { id: "partywear", label: "Partywear", desc: "Bold & glamorous", icon: <PartyPopper className="w-6 h-6" />, gradient: "from-pink-500/20 to-purple-500/5" },
  { id: "casual", label: "Casual", desc: "Relaxed & effortless", icon: <Coffee className="w-6 h-6" />, gradient: "from-blue-500/20 to-teal-500/5" },
  { id: "streetwear", label: "Streetwear", desc: "Edgy & expressive", icon: <Flame className="w-6 h-6" />, gradient: "from-orange-500/20 to-red-500/5" },
];

export const StyleSelector = ({ onSelect, onBack }: StyleSelectorProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-body">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h2 className="text-3xl font-display font-bold text-foreground mb-2">Choose Your Vibe</h2>
        <p className="text-muted-foreground font-body font-light mb-8">What's the occasion?</p>

        <div className="grid grid-cols-2 gap-4">
          {styles.map((s, i) => (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(s.id)}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${s.gradient} border border-border hover:border-primary/40 transition-colors text-left group`}
            >
              <div className="mb-4 text-primary group-hover:scale-110 transition-transform">{s.icon}</div>
              <h3 className="text-lg font-display font-semibold text-foreground">{s.label}</h3>
              <p className="text-sm text-muted-foreground font-body mt-1">{s.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
