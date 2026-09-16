/**
 * MaterialsPack — 研習影片（手風琴）
 * - 預設收合：只顯示單元主題＋大影片播放卡
 * - 展開：顯示該單元導讀、關鍵經文、本週實修與完整單元連結
 */
import { useState } from 'react';
import { materialsPack, units } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal';
import './MaterialsPack.css';

const unitById: Record<string, (typeof units)[number]> = Object.fromEntries(
  units.map((u) => [u.id, u]),
);

export default function MaterialsPack() {
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // 依單元分組（bardo 單元 2 支），保留 materialsPack.reels 的原始順序
  const groups: typeof materialsPack.reels[] = [];
  for (const reel of materialsPack.reels) {
    const last = groups[groups.length - 1];
    if (last && last[0].unitId === reel.unitId) {
      last.push(reel);
    } else {
      groups.push([reel]);
    }
  }

  let videoIndex = 0;

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
          {groups.map((group) => {
            const unitId = group[0].unitId;
            const unit = unitById[unitId];
            const isOpen = openIds.has(unitId);
            const detailId = `materials-detail-${unitId}`;
            return (
              <RevealItem key={unitId} className="materials__unit">
                <button
                  type="button"
                  className="materials__head"
                  aria-expanded={isOpen}
                  aria-controls={detailId}
                  onClick={() => toggle(unitId)}
                >
                  <span className="materials__head-text">
                    <span className="materials__unit-no">{group[0].unitNo}</span>
                    <span className="materials__unit-title">{group[0].unitTitle}</span>
                  </span>
                  <span className="materials__chevron" aria-hidden="true">
                    ＋
                  </span>
                </button>

                <div className="materials__videos">
                  {group.map((reel) => {
                    videoIndex += 1;
                    const n = String(videoIndex).padStart(2, '0');
                    return (
                      <a
                        key={reel.url}
                        className="video-card video-card--big"
                        href={reel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={reel.videoAriaLabel}
                      >
                        <span className="video-card__play" aria-hidden="true">
                          ▶
                        </span>
                        <span className="video-card__body">
                          <span className="video-card__index">{n}</span>
                          <span className="video-card__label">{reel.videoLabel}</span>
                          <span className="video-card__meta">Facebook 短片 · 另開視窗</span>
                        </span>
                        <span className="video-card__arrow" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    );
                  })}
                </div>

                <div id={detailId} className={`materials__detail${isOpen ? ' is-open' : ''}`}>
                  <div className="materials__detail-inner">
                    <p className="materials__thesis">{unit.thesis}</p>
                    <blockquote className="materials__epigraph">
                      <p>{unit.epigraph.text}</p>
                      <cite>{unit.epigraph.cite}</cite>
                    </blockquote>
                    <p className="materials__practice">
                      <strong>本週實修｜</strong>
                      {unit.practiceWeekly}
                    </p>
                    <a className="materials__more" href={`#${unitId}`}>
                      讀完整單元 →
                    </a>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="materials__extra" y={12}>
          <h3 className="materials__extra-title">{materialsPack.extraReading.title}</h3>
          <p className="materials__extra-text">{materialsPack.extraReading.text}</p>
        </Reveal>
      </div>
    </section>
  );
}
