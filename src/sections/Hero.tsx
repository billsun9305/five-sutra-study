/**
 * Hero — 首屏（DESIGN.md §8.2 / §6.3）
 * - 進場動畫：眉題 fade 0.5 / 大標 y36→0 0.9s / 引言 y24→0 0.8s delay 0.15 /
 *   建議路徑面板 y24→0 0.8s delay 0.28
 * - 印章：靜態（無 hover 動畫），84px（桌面）/ 64px（手機），2px 硃砂邊框，rotate(-2deg)
 * - scroll cue：CSS 動畫（base.css reduced-motion 會壓掉）
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
      <div className="container hero__grid">
        <div className="hero__main">
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
        </div>

        <motion.aside
          className="hero__route"
          aria-label={siteMeta.routeTitle}
          {...fade(0.28, 24, 0.8)}
        >
          <h2 className="hero__route-title">{siteMeta.routeTitle}</h2>
          <ol className="hero__route-list">
            {siteMeta.route.map((stop, i) => (
              <li key={stop.sutra} className="hero__route-item">
                <span className="hero__route-no" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <strong className="hero__route-sutra">{stop.sutra}</strong>
                <span className="hero__route-note">{stop.note}</span>
              </li>
            ))}
          </ol>
        </motion.aside>
      </div>

      <div className="hero__cue" aria-hidden="true">
        <span className="hero__cue-arrow">↓</span>
        <span className="hero__cue-text">向下研讀</span>
      </div>
    </section>
  );
}
