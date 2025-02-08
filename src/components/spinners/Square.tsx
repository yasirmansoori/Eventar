import { motion } from "framer-motion";

const Square = () => (
  <div className="flex items-center justify-center h-[600px]">
    <div className="relative">
      <motion.div
        className="w-24 h-24 border-4 border-gray-200 dark:border-gray-700 rounded-lg"
        animate={{
          borderRadius: ["16%", "16%", "50%", "50%", "16%"],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="w-12 h-12 bg-blue-500/20 dark:bg-blue-400/20 rounded-md" />
      </motion.div>
    </div>
  </div>
);

export default Square;
