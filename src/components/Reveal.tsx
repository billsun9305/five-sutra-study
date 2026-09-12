/**
 * Reveal — scroll reveal 包裝器（DESIGN.md §6.1 / §6.2）
 * - 標準：opacity 0→1, y 24→0, 0.65s, ease [0.22,1,0.36,1], whileInView once:true
 * - 尊重 useReducedMotion()：為 true 時直接渲染終態，不傳位移
 */
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { TargetAndTransition } from 'framer-motion';

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** 進場位移（px）；引文塊等深底元件傳 12（§6.1） */
  y?: number;
  delay?: number;
  duration?: number;
}

export function Reveal({ children, className, y = 24, delay = 0, duration = 0.65 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}

/** Stagger 群組容器（§6.2）：staggerChildren 0.09, delayChildren 0.08 */
export function RevealGroup({ children, className, stagger = 0.09, delayChildren = 0.08 }: RevealGroupProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  y?: number;
}

/** Stagger 子項（§6.2）：opacity 0→1, y 18→0, 0.55s */
export function RevealItem({ children, className, y = 18 }: RevealItemProps) {
  const reduce = useReducedMotion();
  const hidden: TargetAndTransition = reduce ? {} : { opacity: 0, y };
  const show: TargetAndTransition = { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } };
  return (
    <motion.div className={className} variants={{ hidden, show }}>
      {children}
    </motion.div>
  );
}
