import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, ArrowLeft, RotateCcw } from "lucide-react";

interface PhotoCaptureProps {
  onCapture: (photoUrl: string) => void;
  onBack: () => void;
}

export const PhotoCapture = ({ onCapture, onBack }: PhotoCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 960 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setCameraError(false);
      }
    } catch {
      setCameraError(true);
    }
  }, []);

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedPhoto(dataUrl);
    stopCamera();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCapturedPhoto(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const retake = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <button onClick={() => { stopCamera(); onBack(); }} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-body">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h2 className="text-3xl font-display font-bold text-foreground mb-2">Strike a Pose</h2>
        <p className="text-muted-foreground font-body font-light mb-8">Take a photo or upload one to get started</p>

        {/* Preview area */}
        <motion.div
          layout
          className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-card border border-border mb-6"
        >
          {capturedPhoto ? (
            <img src={capturedPhoto} alt="Captured" className="w-full h-full object-cover" />
          ) : isCameraActive ? (
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                <Camera className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm font-body">No photo yet</p>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </motion.div>

        {/* Actions */}
        <div className="flex gap-3">
          {capturedPhoto ? (
            <>
              <button onClick={retake} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-secondary-foreground font-body font-medium hover:brightness-110 transition-all">
                <RotateCcw className="w-4 h-4" /> Retake
              </button>
              <button onClick={() => onCapture(capturedPhoto)} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-body font-semibold glow-gold hover:brightness-110 transition-all">
                Use Photo
              </button>
            </>
          ) : (
            <>
              {!isCameraActive ? (
                <button onClick={startCamera} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-body font-semibold glow-gold hover:brightness-110 transition-all">
                  <Camera className="w-4 h-4" /> Open Camera
                </button>
              ) : (
                <button onClick={takePhoto} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-body font-semibold glow-gold hover:brightness-110 transition-all animate-pulse">
                  📸 Capture
                </button>
              )}
              <button onClick={() => fileInputRef.current?.click()} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-secondary-foreground font-body font-medium hover:brightness-110 transition-all">
                <Upload className="w-4 h-4" /> Upload
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </>
          )}
        </div>

        {cameraError && (
          <p className="text-destructive text-sm text-center mt-4 font-body">Camera access denied. Please upload a photo instead.</p>
        )}
      </div>
    </div>
  );
};
