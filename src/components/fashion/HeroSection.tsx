import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface HeroSectionProps {
  onStart: () => void;
}

export const HeroSection = ({ onStart }: HeroSectionProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold-subtle/20 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center relative z-10 max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">AI-Powered Styling</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
          <span className="text-foreground">Your Style,</span>
          <br />
          <span className="text-gradient-gold">Reimagined</span>
        </h1>

        <p className="text-lg text-muted-foreground font-body font-light max-w-md mx-auto mb-12">
          Discover outfits curated for your unique personality. Take a photo, choose your vibe, and see yourself transformed.
        </p>

        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-primary text-primary-foreground font-body font-semibold rounded-full glow-gold text-lg tracking-wide hover:brightness-110 transition-all"
        >
          Get Styled
        </motion.button>
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
      />
    </div>
  );
};
