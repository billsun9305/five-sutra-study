/**
 * Overview — 00 總覽：五階段學習地圖（DESIGN.md §8.3）
 * - 桌面：5 等分 grid；手機：左側豎線 + 硃砂圓點的時間軸
 * - stagger 進場（§6.2）
 */
import { overview } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { RevealGroup, RevealItem } from '../components/Reveal';
import './Overview.css';

export default function Overview() {
  return (
    <section className="section overview" id="overview" aria-labelledby="overview-heading">
      <div className="container">
        <SectionHeading
          headingId="overview-heading"
          eyebrow="總覽"
          title={overview.title}
          intro={overview.intro}
        />
        <RevealGroup className="overview__stages">
          {overview.stages.map((stage) => (
            <RevealItem key={stage.number} className="overview__stage-wrap">
              <article className="overview__stage">
                <span className="overview__dot" aria-hidden="true" />
                <p className="overview__number">{stage.number}</p>
                <h3 className="overview__name">{stage.name}</h3>
                <p className="overview__note">{stage.note}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
