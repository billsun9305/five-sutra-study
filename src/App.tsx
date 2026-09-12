import { StickyNav } from './components/StickyNav';
import Hero from './sections/Hero';
import Overview from './sections/Overview';
import MaterialsPack from './sections/MaterialsPack';
import SutraUnits from './sections/SutraUnits';
import { CrossReading, Rhythm, ReadingIndex } from './sections/Closing';
import Footer from './sections/Footer';

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
        <MaterialsPack />
        <SutraUnits />
        <CrossReading />
        <Rhythm />
        <ReadingIndex />
      </main>
      <Footer />
    </div>
  );
}
