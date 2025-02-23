import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { SpecialDay } from "@/types/calendar";

interface SpecialDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  content: SpecialDay;
}

export const SpecialDayModal = ({
  isOpen,
  onClose,
  date,
  content,
}: SpecialDayModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: "-50%" }}
            animate={{ scale: 1, opacity: 1, y: "-50%" }}
            exit={{ scale: 0.9, opacity: 0, y: "-50%" }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 px-4 md:px-0"
          >
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl overflow-hidden">
              <div className="relative p-6">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {format(date, "MMMM d, yyyy")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {content.title}
                    </h2>

                    <div className="inline-block px-3 py-1 rounded text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                      {content.type}
                    </div>
                  </div>

                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-lg">
                    {content.description}
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={onClose}
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
