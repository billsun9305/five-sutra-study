/**
 * Hero — 首屏：標題＋一句話＋開始研習按鈕
 * 建議路徑面板已移除（00 總覽即是地圖，不再重複）。
 */
import { motion, useReducedMotion } from 'framer-motion';
import { siteMeta } from '../data/content';
import { EASE } from '../components/Reveal';
import './Hero.css';

export default function Hero() {
  const reduce = useReducedMotion();

  const fade = (delay: number, y: number, duration: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration, delay, ease: EASE },
        };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <motion.p className="hero__eyebrow" {...fade(0, 0, 0.5)}>
          <span className="hero__rule" aria-hidden="true" />
          {siteMeta.kicker}
        </motion.p>
        <motion.h1 className="hero__title" id="hero-title" {...fade(0, 36, 0.9)}>
          {siteMeta.title}
        </motion.h1>
        <motion.p className="hero__lede" {...fade(0.15, 24, 0.8)}>
          {siteMeta.lede}
        </motion.p>
        <motion.div className="hero__seal-row" {...fade(0.22, 24, 0.8)}>
          <div className="seal" aria-hidden="true">
            五部經典
          </div>
        </motion.div>
        <motion.div className="hero__cta-row" {...fade(0.3, 24, 0.8)}>
          <a className="hero__cta" href="#overview">
            開始研習
            <span aria-hidden="true"> →</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
