import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, Heart, Star, Palette, Ruler, Sparkles } from "lucide-react";
import type { StyleCategory } from "@/pages/Index";

interface OutfitResultsProps {
  photo: string;
  style: StyleCategory;
  onBack: () => void;
  onRestart: () => void;
}

interface Outfit {
  id: number;
  name: string;
  pieces: string[];
  colors: string[];
  score: number;
  fit: string;
  vibe: string;
}

const outfitData: Record<StyleCategory, Outfit[]> = {
  formal: [
    { id: 1, name: "The Power Silhouette", pieces: ["Tailored Navy Blazer", "Crisp White Shirt", "Charcoal Trousers", "Oxford Shoes"], colors: ["#1e3a5f", "#ffffff", "#3d3d3d", "#4a3728"], score: 92, fit: "Structured, sharp shoulders", vibe: "Commanding & polished" },
    { id: 2, name: "Modern Minimalist", pieces: ["Black Turtleneck", "Slim Fit Suit", "Leather Belt", "Chelsea Boots"], colors: ["#0a0a0a", "#1a1a2e", "#5c3a1e", "#2d2d2d"], score: 88, fit: "Clean lines, relaxed fit", vibe: "Understated elegance" },
  ],
  partywear: [
    { id: 1, name: "Midnight Glamour", pieces: ["Sequin Bomber Jacket", "Silk Black Top", "Leather Pants", "Statement Heels"], colors: ["#c9a96e", "#0a0a0a", "#1a1a1a", "#c9a96e"], score: 95, fit: "Body-hugging, dramatic", vibe: "Show-stopping & daring" },
    { id: 2, name: "Velvet Dreams", pieces: ["Velvet Blazer", "Mesh Top", "High-Waist Skirt", "Strappy Sandals"], colors: ["#4a1942", "#0a0a0a", "#2d1b3d", "#c9a96e"], score: 87, fit: "Flowing & luxurious", vibe: "Mysterious & alluring" },
  ],
  casual: [
    { id: 1, name: "Weekend Ease", pieces: ["Oversized Linen Shirt", "Wide-Leg Jeans", "Canvas Sneakers", "Leather Tote"], colors: ["#e8dcc8", "#5c7a99", "#f5f0e8", "#8b6d4a"], score: 90, fit: "Relaxed, breathable", vibe: "Effortlessly cool" },
    { id: 2, name: "Urban Comfort", pieces: ["Cotton Hoodie", "Chinos", "White Trainers", "Baseball Cap"], colors: ["#6b7b5e", "#d4c5a9", "#f0f0f0", "#3d3d3d"], score: 85, fit: "Loose & comfortable", vibe: "Chill & approachable" },
  ],
  streetwear: [
    { id: 1, name: "Neo Tokyo", pieces: ["Oversized Graphic Tee", "Cargo Pants", "Chunky Sneakers", "Chain Accessories"], colors: ["#0a0a0a", "#3d5c3a", "#f0f0f0", "#c0c0c0"], score: 93, fit: "Oversized, layered", vibe: "Bold & rebellious" },
    { id: 2, name: "Retro Futurism", pieces: ["Track Jacket", "Baggy Joggers", "Platform Boots", "Bucket Hat"], colors: ["#ff6b35", "#1a1a2e", "#0a0a0a", "#ff6b35"], score: 89, fit: "Boxy, statement pieces", vibe: "Avant-garde street" },
  ],
};

const ScoreRing = ({ score }: { score: number }) => (
  <div className="relative w-28 h-28">
    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
      <circle
        cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--primary))" strokeWidth="6"
        strokeDasharray={`${score * 2.64} 264`}
        strokeLinecap="round"
        className="transition-all duration-1000"
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-2xl font-display font-bold text-foreground">{score}</span>
      <span className="text-xs text-muted-foreground font-body">/ 100</span>
    </div>
  </div>
);

export const OutfitResults = ({ photo, style, onBack, onRestart }: OutfitResultsProps) => {
  const outfits = outfitData[style];
  const [activeOutfit, setActiveOutfit] = useState(0);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const current = outfits[activeOutfit];

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button onClick={onRestart} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body">
            <RefreshCw className="w-4 h-4" /> Start Over
          </button>
        </div>

        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
          Your <span className="text-gradient-gold capitalize">{style}</span> Look
        </h2>
        <p className="text-muted-foreground font-body font-light mb-10">Curated outfits matched to your style profile</p>

        {/* Outfit tabs */}
        <div className="flex gap-3 mb-8">
          {outfits.map((o, i) => (
            <button
              key={o.id}
              onClick={() => setActiveOutfit(i)}
              className={`px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all ${
                i === activeOutfit ? "bg-primary text-primary-foreground glow-gold" : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              Look {i + 1}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Virtual try-on preview */}
          <motion.div key={current.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-border relative">
              <img src={photo} alt="You" className="w-full h-full object-cover" />
              {/* Outfit overlay simulation */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-body font-medium text-foreground">Virtual Try-On</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-body">{current.name} applied to your photo</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleLike(current.id)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                liked.has(current.id) ? "bg-destructive/90 text-destructive-foreground" : "bg-glass text-muted-foreground hover:text-foreground"
              }`}
            >
              <Heart className={`w-5 h-5 ${liked.has(current.id) ? "fill-current" : ""}`} />
            </button>
          </motion.div>

          {/* Outfit details & score */}
          <motion.div key={`detail-${current.id}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-2xl font-display font-bold text-foreground mb-1">{current.name}</h3>
            <p className="text-muted-foreground font-body text-sm mb-6">{current.vibe}</p>

            {/* Score */}
            <div className="flex items-center gap-6 mb-8">
              <ScoreRing score={current.score} />
              <div>
                <p className="text-sm font-body font-medium text-foreground mb-1">Compatibility Score</p>
                <p className="text-xs text-muted-foreground font-body">Based on your features, body type, and color analysis</p>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.round(current.score / 20) ? "text-primary fill-primary" : "text-muted"}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Outfit pieces */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Ruler className="w-4 h-4 text-primary" />
                <h4 className="font-body font-semibold text-foreground text-sm">Outfit Pieces</h4>
              </div>
              <div className="space-y-2">
                {current.pieces.map((piece, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-secondary/50">
                    <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-body text-muted-foreground">{i + 1}</span>
                    <span className="font-body text-sm text-foreground">{piece}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Color palette */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-primary" />
                <h4 className="font-body font-semibold text-foreground text-sm">Color Palette</h4>
              </div>
              <div className="flex gap-3">
                {current.colors.map((c, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full border border-border" style={{ backgroundColor: c }} />
                    <span className="text-[10px] text-muted-foreground font-body">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fit info */}
            <div className="p-4 rounded-xl bg-glass">
              <p className="text-xs text-muted-foreground font-body mb-1">Fit & Silhouette</p>
              <p className="text-sm font-body text-foreground">{current.fit}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
