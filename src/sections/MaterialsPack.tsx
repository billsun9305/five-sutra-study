/**
 * MaterialsPack — 研習素材包（DESIGN.md §8.4）
 * - SectionHeading（眉題「研習素材包」）+ 引言 + 硃砂提醒條
 * - 6 支影片卡（按單元分組，bardo 單元 2 支），外部連結 target=_blank
 * - 補充讀物｜《當下的力量》深色收尾卡
 */
import { materialsPack } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal';
import './MaterialsPack.css';

export default function MaterialsPack() {
  // 依單元分組（bardo 單元有 2 支），保留 materialsPack.reels 的原始順序
  const groups: typeof materialsPack.reels[] = [];
  for (const reel of materialsPack.reels) {
    const last = groups[groups.length - 1];
    if (last && last[0].unitId === reel.unitId) {
      last.push(reel);
    } else {
      groups.push([reel]);
    }
  }

  return (
    <section className="section materials" id="materials" aria-labelledby="materials-heading">
      <div className="container">
        <SectionHeading
          headingId="materials-heading"
          eyebrow={materialsPack.title}
          title={materialsPack.title}
          intro={materialsPack.intro}
        />

        <Reveal className="materials__note" y={12}>
          <p>{materialsPack.note}</p>
        </Reveal>

        <RevealGroup className="materials__units">
          {groups.map((group) => (
            <RevealItem key={group[0].unitId} className="materials__unit">
              <p className="materials__unit-no">{group[0].unitNo}</p>
              <h3 className="materials__unit-title">{group[0].unitTitle}</h3>
              <div className="materials__videos">
                {group.map((reel) => (
                  <a
                    key={reel.url}
                    className="video-card"
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={reel.videoAriaLabel}
                  >
                    <span className="video-card__label">{reel.videoLabel}</span>
                    <span className="video-card__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="materials__extra" y={12}>
          <h3 className="materials__extra-title">{materialsPack.extraReading.title}</h3>
          <p className="materials__extra-text">{materialsPack.extraReading.text}</p>
        </Reveal>
      </div>
    </section>
  );
}
