import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConfetti } from "./Confetti";
import { Sparkles } from "./Sparkles";
import { KineticText } from "./KineticText";
import { TypeWriter } from "./TypeWriter";
import { FakeChatScene } from "./FakeChatScene";
import { HeartProgression } from "./HeartProgression";
import { useSoundManager } from "./SoundManager";
import { useBirthdayStore } from "@/features/core/store/useBirthdayStore";

interface CinematicIntroProps {
  onComplete: () => void;
}

type Scene = "storytelling" | "fake-chat" | "post-chat" | "done";

export const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
  const [scene, setScene] = useState<Scene>("storytelling");
  const [storyLine, setStoryLine] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [postChatLine, setPostChatLine] = useState(0);
  const [heartStage, setHeartStage] = useState<1 | 2 | 3>(2);
  
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const { fireConfetti, fireCannon, fireStars, fireCinematicCelebration } = useConfetti();
  const { playType, playWhoosh, playReveal, playPop, playBoom } = useSoundManager();

  // DYNAMIC CONFIGURATION ENGINE
  const { config, getAnimationPacing } = useBirthdayStore();
  const { name, age, favoriteColor } = config;
  const pacing = getAnimationPacing();
  const speedMultiplier = pacing === 'fast' ? 0.7 : pacing === 'slow' ? 1.3 : 1;

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(setTimeout(fn, ms));
  }, []);


  const storyLines = useMemo(() => {
    return [
  "Today is your day...",
"To the most caring, loyal, and protective soul. Thank you for always being there...",
"Happy Birthday! May this year bring you lots of happiness🎂✨"
    ];
  }, []);

  const postChatLines = useMemo(() => {
    return [
      "Because our friendship means more to me than I can put into words...",
"Thank you for every laugh, every conversation, and every memory we've shared...",
"Now, let's celebrate your special day.✨"

    ];
  }, []);


  const primaryColor = favoriteColor || '#FF6B6B';

  const storyLineStyles = [
    { className: "text-lg md:text-2xl lg:text-3xl font-light", style: { color: "hsl(280, 20%, 85%)" } },
    { className: "font-black uppercase tracking-tight text-xl md:text-3xl lg:text-4xl", style: { color: "hsl(330, 80%, 85%)" } },
    { className: "font-semibold text-xl md:text-3xl lg:text-[2.5rem]", style: { color: primaryColor } },
  ];

  const postChatStyles = [
    { className: "text-2xl md:text-4xl lg:text-5xl font-bold", style: { color: "hsl(330, 95%, 75%)" } },
    { className: "font-black uppercase text-2xl md:text-4xl lg:text-5xl", style: { color: primaryColor } },
    { className: "text-3xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-[hsl(330,90%,70%)] via-[var(--color-primary)] to-[hsl(270,70%,70%)] bg-clip-text text-transparent animate-gradient-shift" },
  ];

  useEffect(() => () => clearTimers(), [clearTimers]);

  // Scene Orchestration
  useEffect(() => {
    clearTimers();

    if (scene === "storytelling") {
      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(30);
      const lines = age ? [...storyLines.slice(0, -1), `As you celebrate your ${age}th year...`, storyLines[storyLines.length - 1]] : storyLines;
      lines.forEach((_, i) => {
        addTimer(() => { setStoryLine(i); playType(); }, i * 4000 * speedMultiplier);
      });
      addTimer(() => setHeartStage(2), 5000 * speedMultiplier);
      addTimer(() => { 
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
        playWhoosh(); 
        setScene("fake-chat"); 
      }, lines.length * 4000 * speedMultiplier);
    }

    if (scene === "post-chat") {
      setHeartStage(3);
      postChatLines.forEach((_, i) => {
        addTimer(() => { setPostChatLine(i); playType(); }, i * 3500 * speedMultiplier);
      });
      const endTime = postChatLines.length * 3500 * speedMultiplier;
      addTimer(() => {
        playBoom();
        fireConfetti({ particleCount: 300, spread: 180 });
        fireCinematicCelebration();
      }, endTime);
      addTimer(() => setFadeOut(true), endTime + 2000);
      addTimer(() => { setScene("done"); onComplete(); }, endTime + 3500);
    }

  }, [
    scene,
    speedMultiplier,
    age,
    storyLines,
    postChatLines,
    onComplete,
    addTimer,
    clearTimers,
    playType,
    playWhoosh,
    playBoom,
    fireConfetti,
    fireCinematicCelebration,
  ]);

  const handleChatComplete = useCallback(() => {
    playWhoosh();
    setScene("post-chat");
    setPostChatLine(0);
  }, [playWhoosh]);

  if (scene === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center transition-all duration-1000 ${fadeOut ? "opacity-0" : "opacity-100"}`}
      style={{ background: 'transparent' }}
    >
      <AnimatePresence mode="wait">
        {scene === "storytelling" && (
          <motion.div 
            key="storytelling"
            initial={{ scale: 1.2, filter: "blur(20px)", opacity: 0 }}
            animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
            exit={{ scale: 0.8, filter: "blur(20px)", opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative z-50 text-center max-w-3xl mx-auto px-6"
          >
            <div className="flex justify-center mb-12">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center text-3xl"
              >
                ✨
              </motion.div>
            </div>
            {(age ? [...storyLines.slice(0, -1), `As you celebrate your ${age}th year...`, storyLines[storyLines.length - 1]] : storyLines).map((line, i) => (
              <p
                key={i}
                className={`font-display leading-relaxed mb-6 transition-all duration-1000 ${(storyLine >= i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${storyLineStyles[i]?.className || ''}`}
                style={{ ...(storyLineStyles[i]?.style || {}), color: i === storyLine ? primaryColor : (storyLineStyles[i]?.style?.color || "hsl(0,0%,90%)"), textShadow: i === storyLine ? `0 0 20px ${primaryColor}40` : "none" }}
              >
                {storyLine >= i && (
                <TypeWriter 
                  text={line} 
                  speed={40} 
                  delay={300} 
                  cursor={storyLine === i} 
                />
              )}
              </p>
            ))}
          </motion.div>
        )}

        {scene === "fake-chat" && (
          <motion.div 
            key="fake-chat"
            initial={{ y: 100, opacity: 0, rotateX: 45 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: -100, opacity: 0, rotateX: -45 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <FakeChatScene onComplete={handleChatComplete} />
          </motion.div>
        )}

        {scene === "post-chat" && (
          <motion.div 
            key="post-chat"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, filter: "blur(10px)", opacity: 0 }}
            className="text-center max-w-3xl mx-auto px-6"
          >
            <div className="mb-8 flex justify-center"><HeartProgression stage={3} /></div>
            {postChatLines.slice(0, postChatLine + 1).map((line, i) => (
              <p 
                key={i} 
                className={`font-display leading-relaxed mb-6 ${postChatStyles[i]?.className || ''}`} 
                style={{ ...(postChatStyles[i]?.style || {}), color: i === postChatLine ? primaryColor : (postChatStyles[i]?.style?.color || "white") }}
              >
                <KineticText text={line} animation='pop-out' delay={300} />
              </p>
            ))}
          </motion.div>
        )}

      </AnimatePresence>

      {/* Overlays */}
      <Sparkles count={15} />
    </div>
  );
};
