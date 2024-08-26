import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useOutlet } from "react-router-dom";

const AnimatedOutlet = () => {
  const location = useLocation();
  const element = useOutlet();

  return (
    <AnimatePresence mode="wait">
      {element && (
        <motion.div
          key={location.pathname}
          initial={{ scale: [0, 1.05] }}
          animate={{ scale: 1 }}
          exit={{ scale: [1.05, 0] }}
          transition={{
            duration: 0.6,
            type: "spring",
          }}
        >
          {element}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedOutlet;
