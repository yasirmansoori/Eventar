import { motion } from "framer-motion";

const Bars = () => (
  <div className="flex items-center justify-center h-[600px] gap-1">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="w-2 h-16 bg-blue-500"
        animate={{
          height: ["4rem", "2rem", "4rem"],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: i * 0.1,
        }}
      />
    ))}
  </div>
);

export default Bars;
