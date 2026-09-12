/**
 * SutraUnits — 五個經單元（DESIGN.md §8.6）
 * 錨點 id 固定：arrow / heart / diamond / avatamsaka / bardo（StickyNav 捲動偵測依賴）
 * 內容全部取自 content.ts，逐字渲染，絕不改寫白話與原文。
 */
import {
  units,
  BAIHUA_LABEL,
  INSIGHTS_LABEL,
  ANGLES_HEADING,
} from '../data/content';
import type { SutraUnit, Quote, Insight } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal';
import './SutraUnits.css';

/** 由網址推斷外部連結的 aria-label 目的地註記（DESIGN §10） */
function linkDestination(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    if (host.includes('youtube.com') || host.includes('youtu.be')) return 'YouTube';
    if (host.includes('wikipedia.org')) return '維基百科';
    if (host.includes('ptt.cc')) return 'PTT 佛教版';
    if (host.includes('ddm.org.tw')) return '法鼓山影音';
    if (host.includes('budaedu.org')) return '佛學資料 PDF';
    if (host.includes('kkbox.com')) return 'KKBOX';
    if (host.includes('shamashalidina.com')) return 'Shama Shalidina 部落格';
    if (host.includes('buddhistdoor.org')) return '佛門網';
    if (host.includes('ericdata.com')) return '研究期刊 PDF';
    if (u.pathname.toLowerCase().endsWith('.pdf')) return 'PDF 文件';
    return '外部網站';
  } catch {
    return '外部網站';
  }
}

/** 深入理解註解 */
function Insights({ items }: { items: Insight[] }) {
  return (
    <aside className="quote-pair__insights" aria-label={INSIGHTS_LABEL}>
      <p className="quote-pair__insights-eyebrow">{INSIGHTS_LABEL}</p>
      {items.map((insight, i) => (
        <p key={i} className="quote-pair__insight">
          <strong>{insight.title}</strong>
          {insight.body}
        </p>
      ))}
    </aside>
  );
}

/** 原文 / 白話 配對卡（DESIGN §8.5） */
function QuotePair({ quote }: { quote: Quote }) {
  return (
    <article className="quote-pair">
      <div className="quote-pair__block">
        <span className="quote-pair__label quote-pair__label--original">
          {quote.label}
        </span>
        <p className="quote-pair__original">{quote.original}</p>
      </div>
      <div className="quote-pair__hairline" aria-hidden="true" />
      <div className="quote-pair__block">
        <span className="quote-pair__label quote-pair__label--vernacular">
          {BAIHUA_LABEL}
        </span>
        <p className="quote-pair__baihua">{quote.baihua}</p>
      </div>
      {quote.insights && quote.insights.length > 0 && (
        <Insights items={quote.insights} />
      )}
    </article>
  );
}

/** 練習雙卡（DESIGN §8.6 #4）：本週練習＋生活檢驗／影片譬喻／閱讀邊界 */
function PracticeDuo({ unit }: { unit: SutraUnit }) {
  return (
    <Reveal className="unit-practice-duo">
      {unit.practicePairs.map((pair) => (
        <div
          key={pair.title}
          className={`practice-duo-card ${
            pair.title === '本週練習'
              ? 'practice-duo-card--primary'
              : 'practice-duo-card--secondary'
          }`}
        >
          <h4 className="practice-duo-card__title">{pair.title}</h4>
          <p className="practice-duo-card__text">{pair.text}</p>
        </div>
      ))}
    </Reveal>
  );
}

/** 單一經單元 */
function UnitSection({ unit }: { unit: SutraUnit }) {
  return (
    <section
      id={unit.id}
      className="section unit-section"
      aria-labelledby={`${unit.id}-heading`}
    >
      <div className="container">
        <SectionHeading
          eyebrow={`${unit.number} · ${unit.title}`}
          title={unit.theme}
          headingId={`${unit.id}-heading`}
        />

        {/* 單元頭：印章（.seal 取自 Hero.css，靜態無 hover）＋ meta 標籤＋經名＋導言 */}
        <Reveal className="unit-head">
          <span className="seal unit-head__seal" aria-hidden="true">
            {unit.seal}
          </span>
          <div className="unit-head__body">
            <ul className="unit-meta" aria-label="單元標籤">
              {unit.meta.map((tag) => (
                <li key={tag} className="unit-meta__tag">
                  {tag}
                </li>
              ))}
            </ul>
            <p className="unit-head__sutra">{unit.sutraName}</p>
            <p className="unit-head__thesis">{unit.thesis}</p>
          </div>
        </Reveal>

        {/* 度亡經：無通行漢譯句式的說明（cite 逐字保留） */}
        {unit.sourceNote && (
          <Reveal className="unit-source-note">
            <p>{unit.sourceNote}</p>
          </Reveal>
        )}

        {/* 引文塊（深底只做淡入，§6.1） */}
        <Reveal y={12} className="unit-epigraph">
          <blockquote className="unit-epigraph__quote">
            <span className="unit-epigraph__mark" aria-hidden="true">
              “
            </span>
            {unit.epigraph.text}
            <footer>
              <cite>{unit.epigraph.cite}</cite>
            </footer>
          </blockquote>
        </Reveal>

        {/* 關鍵經文對照：stagger 進場 */}
        <RevealGroup className="quote-list">
          {unit.quotes.map((quote, i) => (
            <RevealItem key={i}>
              <QuotePair quote={quote} />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* 本週實修 callout（§8.4 樣式：紙深底＋玉色頂線） */}
        <Reveal className="unit-practice-weekly">
          <p>
            <strong className="unit-practice-weekly__lead">本週實修｜</strong>
            {unit.practiceWeekly}
          </p>
        </Reveal>

        <PracticeDuo unit={unit} />

        {/* 從哪些角度切入 */}
        <Reveal className="unit-angles">
          <h3 className="unit-angles__title">{ANGLES_HEADING}</h3>
          <ul className="unit-angles__list">
            {unit.angles.map((angle) => (
              <li key={angle} className="unit-angles__chip">
                {angle}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* 延伸閱讀＋資料線索 */}
        <Reveal className="unit-readings">
          <div className="unit-readings__grid">
            <div className="unit-readings__col">
              <h3 className="unit-readings__title">入門</h3>
              <ul className="unit-readings__list">
                {unit.readings.入門.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="unit-readings__col">
              <h3 className="unit-readings__title">深入</h3>
              <ul className="unit-readings__list">
                {unit.readings.深入.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="unit-sources">
            資料線索：
            {unit.readings.資料線索.map((source, i) => (
              <span key={source.url}>
                {i > 0 && '、'}
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${source.title}（${linkDestination(
                    source.url
                  )}，外部連結）`}
                >
                  {source.title}
                </a>
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default function SutraUnits() {
  return (
    <>
      {units.map((unit) => (
        <UnitSection key={unit.id} unit={unit} />
      ))}
    </>
  );
}
