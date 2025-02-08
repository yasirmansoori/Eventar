import { motion } from "framer-motion";

const Dots = () => (
  <div className="flex items-center justify-center h-[600px] gap-2">
    {[0, 1, 2].map((dot) => (
      <motion.div
        key={dot}
        className="w-4 h-4 bg-blue-500 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: dot * 0.2,
        }}
      />
    ))}
  </div>
);

export default Dots;
