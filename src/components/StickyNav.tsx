/**
 * StickyNav — 頂部導覽列＋目錄抽屜
 * - sticky top；品牌（研習大綱）＋「目錄」漢堡按鈕
 * - 底部 3px 硃砂 scroll-progress hairline
 * - 抽屜：右側滑入，分組目錄（開始／五單元／收尾），scroll-spy 高亮
 * - Esc 關閉、點遮罩關閉、開啟時鎖 body 捲動
 */
import { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { siteMeta } from '../data/content';
import { EASE } from './Reveal';
import './StickyNav.css';

const ALL_IDS = siteMeta.toc.flatMap((g) => g.items.map((i) => i.id));

export function StickyNav() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
    ...(reduce ? { duration: 0.01 } : {}),
  });
  const [active, setActive] = useState<string>('overview');
  const [open, setOpen] = useState(false);

  // scroll-spy：追蹤所有目錄錨點
  useEffect(() => {
    const sections = ALL_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
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

  // Esc 關閉＋鎖 body 捲動
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open ]);

  const go = (id: string) => {
    setActive(id);
    setOpen(false);
  };

  return (
    <>
      <header className="sticky-nav">
        <nav className="sticky-nav__inner container" aria-label="主導覽">
          <a href="#top" className="sticky-nav__brand" aria-label="回到頁面開頭">
            <span className="sticky-nav__seal-dot" aria-hidden="true" />
            <span className="sticky-nav__brand-full">{siteMeta.title}</span>
            <span className="sticky-nav__brand-short">研習大綱</span>
          </a>
          <button
            type="button"
            className="sticky-nav__menu-btn"
            aria-expanded={open}
            aria-controls="toc-drawer"
            aria-label={open ? '關閉目錄' : '開啟目錄'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sticky-nav__menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            目錄
          </button>
        </nav>
        <motion.div
          className="sticky-nav__progress"
          style={{ scaleX }}
          aria-hidden="true"
        />
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="toc-overlay"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              id="toc-drawer"
              className="toc-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="全站目錄"
              initial={reduce ? { opacity: 0 } : { x: '100%' }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: '100%' }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              <div className="toc-drawer__head">
                <p className="toc-drawer__title">目錄</p>
                <button
                  type="button"
                  className="toc-drawer__close"
                  aria-label="關閉目錄"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>
              <nav className="toc-drawer__nav" aria-label="章節目錄">
                {siteMeta.toc.map((group) => (
                  <div key={group.heading} className="toc-group">
                    <p className="toc-group__heading">{group.heading}</p>
                    <ul className="toc-group__list">
                      {group.items.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className={`toc-link${active === item.id ? ' is-active' : ''}`}
                            aria-current={active === item.id ? true : undefined}
                            onClick={() => go(item.id)}
                          >
                            <span className="toc-link__no" aria-hidden="true">
                              {item.no}
                            </span>
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
              <p className="toc-drawer__foot">{siteMeta.footer}</p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
