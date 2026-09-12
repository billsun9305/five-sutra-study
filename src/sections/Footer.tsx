/**
 * Footer（DESIGN.md §8.10）
 * 三段式置中：
 * 1. 研習主線（siteMeta.footer）
 * 2. 研讀提醒精簡版（全文保留在 Rhythm 章節）
 * 3. 回到開頭 ↑ ＋ 技術致謝
 */
import { siteMeta } from '../data/content';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__mainline">{siteMeta.footer}</p>
        <p className="footer__honesty">
          本大綱彙整於 2026-09-09，部分資料尚未逐頁核實；引文、年代與宗派差異請以原典與正式出版物為準。
        </p>
        <p className="footer__actions">
          <a href="#top" className="footer__back">
            {siteMeta.backToTop}
          </a>
        </p>
        <p className="footer__credit">技術：React + TypeScript + Vite · 部署於 GitHub Pages</p>
      </div>
    </footer>
  );
}
