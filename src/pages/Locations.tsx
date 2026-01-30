import { motion } from "motion/react";
import { useOutletContext } from "react-router";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

interface OutletContext {
  isDark: boolean;
}

export default function Locations() {
  const { isDark } = useOutletContext<OutletContext>();

  const locations = [
    {
      id: 1,
      name: "DHA",
      address: "CCA 93, Sector C Phase 5 D.H.A",
      city: "Lahore, 54000",
      phone: "+92 (555) 123-4567",
      email: "DHA@crunchburgers.com",
      hours: "Mon-Sun: 10:00 AM - 11:00 PM",
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
    },
    {
      id: 2,
      name: "GULBERG",
      address:
        "14-C 1 MM Alam Rd, Block C1 Block C 1 Gulberg III",
      city: ", Lahore",
      phone: "+92 (555) 234-5678",
      email: "gulberg@crunchburgers.com",
      hours: "Mon-Sun: 11:00 AM - 10:00 PM",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    },
    {
      id: 3,
      name: "Johar town",
      address:
        "F19, 100metees from Ilyas Dumba Karahi, Khayaban-e-Firdousi, Block F Phase 1 Johar Town",
      city: ", Lahore, 54770",
      phone: "+92 (555) 345-6789",
      email: "johartown@crunchburgers.com",
      hours: "Mon-Sun: 10:00 AM - 12:00 AM",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    },
    {
      id: 4,
      name: "Androon lahore",
      address:
        "H8P6+RJ8, Fort Rd, next to the Taj Mahal sweet shop, Shahi Mohallah Walled City of Lahore",
      city: ", Lahore",
      phone: "+92 (555) 456-7890",
      email: "androon@crunchburgers.com",
      hours: "Mon-Sun: 6:00 AM - 10:00 PM",
      image:
        "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800",
    },
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FFD700]">
                FIND US
              </span>
            </h1>
            <p
              className={`text-xl md:text-2xl max-w-3xl mx-auto ${
                isDark ? "text-white/80" : "text-neutral-700"
              }`}
            >
              Visit any of our premium locations and experience
              the ultimate crunch
            </p>
          </motion.div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`backdrop-blur-xl rounded-3xl border overflow-hidden ${
                  isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-black/5 border-black/10"
                }`}
              >
                {/* Location Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 text-3xl font-black text-white">
                    {location.name}
                  </h3>
                </div>

                {/* Location Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
                    <div>
                      <p
                        className={
                          isDark
                            ? "text-white"
                            : "text-neutral-900"
                        }
                      >
                        {location.address}
                      </p>
                      <p
                        className={
                          isDark
                            ? "text-white/60"
                            : "text-neutral-600"
                        }
                      >
                        {location.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#FFD700]" />
                    <a
                      href={`tel:${location.phone}`}
                      className={`hover:text-[#FFD700] transition-colors ${
                        isDark
                          ? "text-white"
                          : "text-neutral-900"
                      }`}
                    >
                      {location.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#FFD700]" />
                    <a
                      href={`mailto:${location.email}`}
                      className={`hover:text-[#FFD700] transition-colors ${
                        isDark
                          ? "text-white"
                          : "text-neutral-900"
                      }`}
                    >
                      {location.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#FFD700]" />
                    <p
                      className={
                        isDark
                          ? "text-white"
                          : "text-neutral-900"
                      }
                    >
                      {location.hours}
                    </p>
                  </div>

                  <button className="w-full mt-4 py-3 bg-gradient-to-r from-[#8B0000] to-[#FFD700] text-white rounded-full font-bold hover:shadow-xl transition-all">
                    Get Directions
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6 mt-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`backdrop-blur-xl rounded-3xl border p-12 text-center ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-black/5 border-black/10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FFD700]">
                Opening Soon Near You!
              </span>
            </h2>
            <p
              className={`text-lg mb-8 ${isDark ? "text-white/70" : "text-neutral-600"}`}
            >
              We're expanding! Want CRUNCH BURGERS in your
              neighborhood? Let us know!
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-[#8B0000] to-[#FFD700] text-white rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all">
              Request a Location
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}