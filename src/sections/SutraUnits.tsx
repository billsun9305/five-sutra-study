/**
 * SutraUnits — 五個經單元
 * 錨點 id 固定：arrow / heart / diamond / avatamsaka / bardo（scroll-spy 依賴）
 * 內容全部取自 content.ts，逐字渲染，絕不改寫白話與原文。
 *
 * 版式：單元頂部先放本單元短片（先看片再讀文）→ 導讀 →
 * 引文 → 經文對照（深入理解預設收合）→ 實修 → 角度 → 書目 →
 * 「下一單元」銜接。
 */
import { useState } from 'react';
import {
  units,
  BAIHUA_LABEL,
  INSIGHTS_LABEL,
  ANGLES_HEADING,
  materialsPack,
} from '../data/content';
import type { SutraUnit, Quote, Insight } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal';
import './SutraUnits.css';

/** 由網址推斷外部連結的 aria-label 目的地註記 */
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

/** 本單元短片：先看片，再讀經文 */
function UnitVideos({ unitId }: { unitId: string }) {
  const reels = materialsPack.reels.filter((r) => r.unitId === unitId);
  if (reels.length === 0) return null;
  return (
    <Reveal className="unit-videos" y={12}>
      <p className="unit-videos__hint">先看短片，再讀經文</p>
      <ul className="unit-videos__list">
        {reels.map((reel) => (
          <li key={reel.url}>
            <a
              className="unit-video-card"
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${reel.videoAriaLabel}（外部連結）`}
            >
              <span className="unit-video-card__play" aria-hidden="true">
                ▶
              </span>
              <span className="unit-video-card__body">
                <span className="unit-video-card__no" aria-hidden="true">
                  {reel.unitNo}
                </span>
                <span className="unit-video-card__name">{reel.videoLabel}</span>
              </span>
              <span className="unit-video-card__go" aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/** 深入理解：預設收合，點開看 */
function Insights({ items }: { items: Insight[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="quote-pair__insights-wrap">
      <button
        type="button"
        className="insights-toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {INSIGHTS_LABEL}
        <span className="insights-toggle__mark" aria-hidden="true">
          {open ? '－' : '＋'}
        </span>
      </button>
      {open && (
        <aside className="quote-pair__insights" aria-label={INSIGHTS_LABEL}>
          {items.map((insight, i) => (
            <p key={i} className="quote-pair__insight">
              <strong>{insight.title}</strong>
              {insight.body}
            </p>
          ))}
        </aside>
      )}
    </div>
  );
}

const QUOTE_NOS = ['其一', '其二', '其三', '其四', '其五', '其六', '其七', '其八'];

/** 原文 / 白話 配對卡 */
function QuotePair({ quote, index }: { quote: Quote; index: number }) {
  return (
    <article className="quote-pair">
      <p className="quote-pair__no" aria-hidden="true">
        {QUOTE_NOS[index] ?? `其${index + 1}`}
      </p>
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

/** 練習雙卡：本週練習＋生活檢驗／影片譬喻／閱讀邊界 */
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

interface NextStop {
  id: string;
  label: string;
}

/** 單一經單元 */
function UnitSection({ unit, next }: { unit: SutraUnit; next: NextStop }) {
  return (
    <section
      id={unit.id}
      className="section unit-section"
      aria-labelledby={`${unit.id}-heading`}
    >
      {/* 單元分隔：鏤空大編號 */}
      <div className="unit-divider" aria-hidden="true">
        <span className="unit-divider__no">{unit.number}</span>
      </div>

      <div className="container">
        <SectionHeading
          eyebrow={`${unit.number} · ${unit.title}`}
          title={unit.theme}
          headingId={`${unit.id}-heading`}
        />

        <UnitVideos unitId={unit.id} />

        {/* 單元頭：印章＋ meta 標籤＋經名＋導言 */}
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

        {/* 引文塊（深底只做淡入） */}
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
              <QuotePair quote={quote} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* 本週實修 callout */}
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
                    source.url,
                  )}，外部連結）`}
                >
                  {source.title}
                </a>
              </span>
            ))}
          </p>
        </Reveal>

        {/* 下一單元銜接 */}
        <nav className="unit-next" aria-label="繼續研讀">
          <a className="unit-next__link" href={`#${next.id}`}>
            <span className="unit-next__kicker">繼續研讀</span>
            <span className="unit-next__title">
              {next.label}
              <span aria-hidden="true"> →</span>
            </span>
          </a>
        </nav>
      </div>
    </section>
  );
}

export default function SutraUnits() {
  const stops: NextStop[] = [
    ...units.map((u) => ({
      id: u.id,
      label: `《${u.title}》・${u.theme}`,
    })),
    { id: 'compare', label: '五經互讀' },
  ];
  return (
    <>
      {units.map((unit, i) => (
        <UnitSection key={unit.id} unit={unit} next={stops[i + 1]} />
      ))}
    </>
  );
}
