/**
 * StickyNav — 頂部導覽列（DESIGN.md §8.1）
 * - sticky top, z-50, 背景色 88% 紙 + blur(10px)（Safari 安全：rgba 先行，@supports 再用 color-mix）
 * - 底部 2px 硃砂 scroll-progress hairline（useScroll + spring，stiffness 140 / damping 30 / mass 0.4）
 * - 桌面 ≥1024px：全列顯示；手機：橫向捲動列，標題縮為「研習大綱」
 * - Active 判定：IntersectionObserver，rootMargin "-30% 0px -60% 0px"，取可見比例最高者
 * - 錨點跳轉：原生 scroll-behavior: smooth（base.css）
 */
import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { siteMeta } from '../data/content';
import './StickyNav.css';

export function StickyNav() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
    ...(reduce ? { duration: 0.01 } : {}),
  });
  const [active, setActive] = useState<string>(siteMeta.nav[0].id);

  useEffect(() => {
    const sections = siteMeta.nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky-nav">
      <nav className="sticky-nav__inner container" aria-label="章節導覽">
        <a
          href="#top"
          className="sticky-nav__brand"
          onClick={() => setActive(siteMeta.nav[0].id)}
          aria-label="回到頁面開頭"
        >
          <span className="sticky-nav__seal-dot" aria-hidden="true" />
          <span className="sticky-nav__brand-full">{siteMeta.title}</span>
          <span className="sticky-nav__brand-short">研習大綱</span>
        </a>
        <ul className="sticky-nav__links">
          {siteMeta.nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`sticky-nav__link${active === item.id ? ' is-active' : ''}`}
                aria-current={active === item.id ? true : undefined}
                onClick={() => setActive(item.id)}
              >
                <span className="sticky-nav__no" aria-hidden="true">
                  {item.no}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <motion.div
        className="sticky-nav__progress"
        style={{ scaleX }}
        aria-hidden="true"
      />
    </header>
  );
}
