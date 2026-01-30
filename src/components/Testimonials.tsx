import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface TestimonialsProps {
  isDark: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Food Critic',
    content: 'The BEEF SUPREME is absolutely divine! The crunch sauce is unlike anything I\'ve ever tasted. Five stars without hesitation!',
    rating: 5
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Regular Customer',
    content: 'I come here every week for the ZINGER BLAST. The perfect amount of spice and the chicken is always crispy and fresh!',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Instagram Influencer',
    content: 'Not only does the food look amazing, but it tastes even better! The presentation is Instagram-worthy every single time.',
    rating: 5
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Local Business Owner',
    content: 'CRUNCH BURGERS has become my go-to spot for lunch meetings. The quality is consistently excellent and the atmosphere is perfect.',
    rating: 5
  },
  {
    id: 5,
    name: 'Jasmine Patel',
    role: 'University Student',
    content: 'The EGGY SUNRISE is my favorite breakfast burger ever! Great prices for students too. Highly recommend!',
    rating: 5
  }
];

export function Testimonials({ isDark }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`py-20 px-6 relative overflow-hidden ${isDark ? 'text-white' : 'text-neutral-900'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-8xl font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FFD700]">
              TESTIMONIALS
            </span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-white/70' : 'text-neutral-700'}`}>
            What our customers are saying
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, rotateY: -20 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: 20 }}
              transition={{ duration: 0.6 }}
              className={`w-full max-w-4xl backdrop-blur-xl rounded-3xl border p-12 ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Quote Icon */}
              <Quote className="w-16 h-16 text-[#FFD700] mb-6 opacity-50" />

              {/* Content */}
              <p className="text-2xl md:text-3xl font-light mb-8 leading-relaxed">
                "{testimonials[currentIndex].content}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < testimonials[currentIndex].rating
                        ? 'text-[#FFD700] fill-[#FFD700]'
                        : isDark ? 'text-white/20' : 'text-black/20'
                    }`}
                  />
                ))}
              </div>

              {/* Author */}
              <div>
                <h4 className="text-2xl font-bold">{testimonials[currentIndex].name}</h4>
                <p className={`text-lg ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-[#8B0000] to-[#FFD700] w-8'
                    : isDark ? 'bg-white/30 hover:bg-white/50' : 'bg-black/30 hover:bg-black/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
