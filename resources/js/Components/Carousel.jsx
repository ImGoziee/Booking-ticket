import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaPause, FaPlay } from "react-icons/fa6";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const progressAnimation = useAnimation();
  const progressRef = useRef(0);
  const lastUpdateTime = useRef(Date.now());
  const slideRefs = useRef([]);

  const images = [
    '/storage/images/blacksabbath-banner.png',
    '/storage/images/metallica-banner.jpg',
  ];

  useEffect(() => {
    let interval;

    const updateProgress = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;
      progressRef.current += (deltaTime / 4000) * 100;

      if (progressRef.current >= 100) {
        progressRef.current = 20;
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }

      progressAnimation.set({ width: `${progressRef.current}%` });
      lastUpdateTime.current = currentTime;
    };

    if (isPlaying) {
      interval = setInterval(updateProgress, 16);
    }

    return () => clearInterval(interval);
  }, [isPlaying, images.length, progressAnimation]);

  const handleNext = () => {
    progressRef.current = 0;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    progressRef.current = 0;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const togglePlayPause = () => {
    lastUpdateTime.current = Date.now();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="mt-6 overflow-hidden">
      <div className="w-full rounded-2xl overflow-hidden">
        <motion.div
          className="flex gap-14"
          animate={{
            x: `calc(-${currentIndex * 100}% - ${currentIndex * 56}px)`,
          }}
          transition={{
            duration: 1,
            ease: [0.32, 0.72, 0.35, 1.0],
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="bg-[#f2f2f2] dark:bg-[#171717] h-60 sm:h-96 w-full relative flex flex-shrink-0 justify-center rounded-2xl overflow-hidden"
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="hover:opacity-80 dark:opacity-60 dark:hover:opacity-100 h-full object-cover duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative flex justify-center gap-4 my-4">
        <button
          onClick={togglePlayPause}
          className="text-[#0A34C2] dark:text-white h-10 w-10 rounded-full flex justify-center items-center transition-colors"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <div className="inline-flex items-center gap-2 py-3 rounded-full">
          {images.map((_, i) => (
            <motion.div
              key={i}
              className="bg-[#E8E6EF] dark:bg-stone-700 shadow-sm relative w-2.5 h-2.5 rounded-full overflow-hidden"
              animate={{
                width: i === currentIndex ? 64 : 10,
              }}
              transition={{ duration: 0.5 }}
            >
              {i === currentIndex && (
                <motion.div
                  className="bg-[#D1CDDF] dark:bg-white absolute h-full rounded-full"
                  animate={progressAnimation}
                />
              )}
            </motion.div>
          ))}
        </div>

        <div className="absolute right-4 flex gap-3 text-white">
          <button
            onClick={handlePrev}
            className="bg-[#5447FF] hover:bg-[#5447FFc3] h-8 w-8 flex justify-center items-center rounded-full transition-colors"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={handleNext}
            className="bg-[#5447FF] hover:bg-[#5447FFc3] h-8 w-8 flex justify-center items-center rounded-full transition-colors"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;