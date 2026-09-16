import { StickyNav } from './components/StickyNav';
import Hero from './sections/Hero';
import Overview from './sections/Overview';
import MaterialsPack from './sections/MaterialsPack';
import SutraUnits from './sections/SutraUnits';
import { CrossReading, Rhythm, ReadingIndex } from './sections/Closing';
import Footer from './sections/Footer';

/**
 * 頁面順序：首屏 → 總覽 → 研習節奏（先知道怎麼用）→
 * 研習影片 → 五單元 → 五經互讀 → 延伸閱讀索引
 */
export default function App() {
  return (
    <div id="top">
      <a className="skip-link" href="#overview">
        跳至內容
      </a>
      <div className="paper-grain" aria-hidden="true" />
      <StickyNav />
      <main>
        <Hero />
        <Overview />
        <Rhythm />
        <MaterialsPack />
        <SutraUnits />
        <CrossReading />
        <ReadingIndex />
      </main>
      <Footer />
    </div>
  );
}
