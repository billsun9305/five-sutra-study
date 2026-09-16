/**
 * Closing — 收尾三節（DESIGN.md §8.7 / §8.8 / §8.9）
 * - CrossReading（id="compare"）：五經互讀，末卡為全寬深底卡（全站第二處深色塊）
 * - Rhythm（id="plan"）：研習節奏時間軸 + 研讀提醒全文（逐字，未改寫）
 * - ReadingIndex（id="reading-index"）：五單元延伸閱讀索引
 * 錨點 id 不可更動（StickyNav scroll-spy 依賴）。
 */
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { crossReading, honestyNote, rhythm, units } from '../data/content';
import './Closing.css';

export function CrossReading() {
  const mainPairs = crossReading.pairs.slice(0, 4);
  const closingPair = crossReading.pairs[4];

  return (
    <section id="compare" className="section cross-reading" aria-labelledby="cross-reading-heading">
      <div className="container">
        <SectionHeading
          eyebrow="互讀"
          title={crossReading.title}
          intro={crossReading.intro}
          headingId="cross-reading-heading"
        />
        <RevealGroup className="cross-reading__grid">
          {mainPairs.map((pair) => (
            <RevealItem key={pair.title}>
              <article className="cross-card">
                <h3 className="cross-card__title">{pair.title}</h3>
                <p className="cross-card__text">{pair.text}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
        {/* 深底收尾卡：深色塊只做 fade（y: 12），保持莊重（§6.1） */}
        <Reveal className="cross-reading__closing" y={12}>
          <article className="cross-card cross-card--dark">
            <h3 className="cross-card__title">{closingPair.title}</h3>
            <p className="cross-card__text">{closingPair.text}</p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export function Rhythm() {
  return (
    <section id="plan" className="section rhythm" aria-labelledby="rhythm-heading">
      <div className="container">
        <SectionHeading
          eyebrow="研習節奏"
          title={rhythm.title}
          intro={rhythm.intro}
          headingId="rhythm-heading"
        />
        <RevealGroup className="rhythm__steps">
          {rhythm.steps.map((step, index) => (
            <RevealItem key={step.title}>
              <div className="rhythm__row">
                <span className="rhythm__no" aria-hidden="true">
                  階段 {index + 1}
                </span>
                <div className="rhythm__body">
                  <h3 className="rhythm__title">{step.title}</h3>
                  <p className="rhythm__text">{step.text}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        {/* 研讀提醒：全文逐字，不淡化（§8.8） */}
        <Reveal className="honesty-note-wrap" y={12}>
          <aside className="honesty-note" aria-labelledby="honesty-note-heading">
            <h3 className="honesty-note__title" id="honesty-note-heading">
              {honestyNote.title}
            </h3>
            <p className="honesty-note__text">{honestyNote.text}</p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

export function ReadingIndex() {
  return (
    <section id="reading-index" className="section reading-index" aria-labelledby="reading-index-heading">
      <div className="container">
        <SectionHeading
          eyebrow="研習索引"
          title="延伸閱讀索引"
          intro="五個單元的入門、深入書目與資料線索總覽；逐單元研讀時可回此處查閱。"
          headingId="reading-index-heading"
        />
        <RevealGroup className="reading-index__units">
          {units.map((unit) => (
            <RevealItem key={unit.id}>
              <div className="reading-index__unit">
                <div className="reading-index__head">
                  <span className="reading-index__no" aria-hidden="true">
                    {unit.number}
                  </span>
                  <h3 className="reading-index__title">{unit.sutraName}</h3>
                </div>
                <div className="reading-index__cols">
                  <div className="reading-index__col">
                    <h4 className="reading-index__col-title">入門</h4>
                    <ul className="reading-index__list">
                      {unit.readings.入門.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="reading-index__col">
                    <h4 className="reading-index__col-title">深入</h4>
                    <ul className="reading-index__list">
                      {unit.readings.深入.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="reading-index__col">
                    <h4 className="reading-index__col-title">資料線索</h4>
                    <ul className="reading-index__list">
                      {unit.readings.資料線索.map((source) => (
                        <li key={source.url}>
                          <a
                            className="reading-index__link"
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${source.title}（外部連結）`}
                          >
                            {source.title}
                            <span aria-hidden="true"> ↗</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
