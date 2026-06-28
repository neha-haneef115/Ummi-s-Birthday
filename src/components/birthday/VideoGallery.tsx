import { motion } from "framer-motion";
import { useBirthdayStore } from "@/features/core/store/useBirthdayStore";
import { useIsMobile } from "@/hooks/use-mobile";

export const VideoGallery = () => {
  const { config } = useBirthdayStore();
  const isMobile = useIsMobile();
  const photos = config.photos || [];

  if (!photos || photos.length === 0) return null;

  return (
    <section className="relative z-20 px-4 py-20 max-w-7xl mx-auto w-full">
      <motion.h3 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-5xl md:text-8xl font-black text-center mb-16 drop-shadow-xl"
        style={{ color: config.favoriteColor || '#FF6B6B' }}
      >
        SPECIAL MEMORIES 🎬
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
        {photos.map((url, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            className="relative aspect-square rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-black/50 backdrop-blur-xl group"
          >
            <img
              src={url}
              alt={`Memory ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
