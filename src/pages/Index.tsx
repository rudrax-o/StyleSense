import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/fashion/HeroSection";
import { PhotoCapture } from "@/components/fashion/PhotoCapture";
import { StyleSelector } from "@/components/fashion/StyleSelector";
import { OutfitResults } from "@/components/fashion/OutfitResults";

export type StyleCategory = "formal" | "partywear" | "casual" | "streetwear";
export type AppStep = "hero" | "photo" | "style" | "results";

const Index = () => {
  const [step, setStep] = useState<AppStep>("hero");
  const [photo, setPhoto] = useState<string | null>(null);
  const [style, setStyle] = useState<StyleCategory | null>(null);

  const handlePhotoCapture = (photoUrl: string) => {
    setPhoto(photoUrl);
    setStep("style");
  };

  const handleStyleSelect = (selected: StyleCategory) => {
    setStyle(selected);
    setStep("results");
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        {step === "hero" && (
          <motion.div key="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
            <HeroSection onStart={() => setStep("photo")} />
          </motion.div>
        )}
        {step === "photo" && (
          <motion.div key="photo" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
            <PhotoCapture onCapture={handlePhotoCapture} onBack={() => setStep("hero")} />
          </motion.div>
        )}
        {step === "style" && (
          <motion.div key="style" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
            <StyleSelector onSelect={handleStyleSelect} onBack={() => setStep("photo")} />
          </motion.div>
        )}
        {step === "results" && photo && style && (
          <motion.div key="results" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
            <OutfitResults photo={photo} style={style} onBack={() => setStep("style")} onRestart={() => { setStep("hero"); setPhoto(null); setStyle(null); }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
