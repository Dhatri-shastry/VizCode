import { motion } from "motion/react";

const planets = [
  { name: "Array", color: "#8884d8", distance: 100, size: 40, speed: 20 },
  { name: "Linked List", color: "#82ca9d", distance: 160, size: 45, speed: 25 },
  { name: "Stack", color: "#ffc658", distance: 220, size: 35, speed: 30 },
  { name: "Queue", color: "#ff8042", distance: 280, size: 38, speed: 35 },
  { name: "Trees", color: "#0088fe", distance: 340, size: 50, speed: 40 },
  { name: "Graphs", color: "#00c49f", distance: 400, size: 55, speed: 45 },
];

export default function SolarSystem() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Sun */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="w-24 h-24 bg-lavender-light rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(230,230,250,0.4)] z-10"
      >
        <span className="text-spotify-black font-bold text-xl">DSA</span>
      </motion.div>

      {/* Orbits and Planets */}
      {planets.map((planet, i) => (
        <div
          key={i}
          className="absolute border border-white/5 rounded-full"
          style={{
            width: planet.distance * 2,
            height: planet.distance * 2,
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: planet.speed,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              className="absolute rounded-full flex items-center justify-center text-[10px] font-bold text-spotify-black"
              style={{
                width: planet.size,
                height: planet.size,
                backgroundColor: planet.color,
                left: `calc(50% + ${planet.distance}px)`,
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {planet.name}
            </motion.div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
