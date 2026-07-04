import { motion } from "framer-motion";

export default function HeroMetadata() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
      }}
      className="
        flex
        flex-wrap
        gap-6
        font-mono
        text-[11px]
        uppercase
        tracking-[0.35em]
        text-white/45
      "
    >
      <span>EST.2026</span>

      <span>H11-FDN-001</span>

      <span>FW26</span>
    </motion.div>
  );
}