import { motion } from "framer-motion";
import styles from "./AnimatedBackground.module.css";

const AnimatedBackground = () => {
  return (
    <motion.div className={styles.background}>
      {Array.from({ length: 7 }).map((_, index) => (
        <motion.div
          key={index}
          className={styles.ring}
          animate={{
            scale: [0.5, 1.2, 0.5],
            opacity: [1, 1, 0.7],
          }}
          transition={{
            repeat: Infinity,
            duration: 8 + index * 3,
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${100 + index * 50}px`,
            height: `${100 + index * 50}px`,
          }}
        />
      ))}
    </motion.div>
  );
};

export default AnimatedBackground;
