import { motion } from 'motion/react';
import { useOutletContext } from 'react-router';
import { Award, Users, Clock, Heart } from 'lucide-react';

interface OutletContext {
  isDark: boolean;
}

export default function About() {
  const { isDark } = useOutletContext<OutletContext>();

  const stats = [
    { icon: Award, label: 'Awards Won', value: '25+' },
    { icon: Users, label: 'Happy Customers', value: '50K+' },
    { icon: Clock, label: 'Years Experience', value: '10+' },
    { icon: Heart, label: 'Burgers Sold', value: '1M+' },
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'We source only the finest ingredients from trusted suppliers to ensure every bite is perfection.',
      icon: '🏆'
    },
    {
      title: 'Fresh Daily',
      description: 'Our patties are made fresh every morning, and our vegetables are delivered daily for maximum freshness.',
      icon: '🌿'
    },
    {
      title: 'Customer Love',
      description: 'Your satisfaction is our priority. We listen to feedback and constantly improve our offerings.',
      icon: '❤️'
    },
    {
      title: 'Innovation',
      description: 'We\'re always experimenting with new flavors and combinations to bring you exciting menu items.',
      icon: '💡'
    }
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FFD700]">
                OUR STORY
              </span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-white/80' : 'text-neutral-700'
            }`}>
              Born from a passion for creating the perfect burger, CRUNCH BURGERS has been 
              serving up premium quality fast food since 2014. Every burger tells a story of 
              dedication, craftsmanship, and love for great food.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`backdrop-blur-xl rounded-3xl border p-8 text-center ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                }`}
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-[#FFD700]" />
                <h3 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FFD700]">
                  {stat.value}
                </h3>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-center mb-16"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FFD700]">
              OUR VALUES
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`backdrop-blur-xl rounded-3xl border p-8 ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                }`}
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className={`text-2xl font-black mb-3 ${
                  isDark ? 'text-white' : 'text-neutral-900'
                }`}>
                  {value.title}
                </h3>
                <p className={isDark ? 'text-white/70' : 'text-neutral-600'}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`backdrop-blur-xl rounded-3xl border p-12 text-center ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FFD700]">
                OUR MISSION
              </span>
            </h2>
            <p className={`text-xl leading-relaxed ${
              isDark ? 'text-white/80' : 'text-neutral-700'
            }`}>
              To craft the most delicious, highest quality burgers using premium ingredients 
              while creating memorable experiences for our customers. We believe great food 
              brings people together, and every burger we serve is made with passion and precision.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
