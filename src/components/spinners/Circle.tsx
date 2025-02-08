import { motion } from "framer-motion";

const Circle = () => (
  <div className="flex items-center justify-center h-[600px]">
    <motion.div
      className="w-24 h-24 border-4 border-blue-500/20 border-t-blue-500 rounded-full"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 1,
        ease: "linear",
        repeat: Infinity,
      }}
    />
  </div>
);

export default Circle;
