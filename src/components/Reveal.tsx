/**
 * Reveal — scroll reveal 包裝器
 * - 標準：opacity 0→1, y 12→0, 0.45s, ease [0.22,1,0.36,1], whileInView once:true
 * - 刻意收斂：長頁面上動畫只做輕提示，不搶戲
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

export function Reveal({ children, className, y = 12, delay = 0, duration = 0.45 }: RevealProps) {
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

/** Stagger 群組容器：staggerChildren 0.06, delayChildren 0.05 */
export function RevealGroup({ children, className, stagger = 0.06, delayChildren = 0.05 }: RevealGroupProps) {
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

/** Stagger 子項：opacity 0→1, y 10→0, 0.4s */
export function RevealItem({ children, className, y = 10 }: RevealItemProps) {
  const reduce = useReducedMotion();
  const hidden: TargetAndTransition = reduce ? {} : { opacity: 0, y };
  const show: TargetAndTransition = { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } };
  return (
    <motion.div className={className} variants={{ hidden, show }}>
      {children}
    </motion.div>
  );
}
