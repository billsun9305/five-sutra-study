/**
 * SectionHeading — 全章節統一標題（DESIGN.md §7）
 * [硃砂短線] 眉題 → 大標 → 引言
 */
import { Reveal } from './Reveal';
import './SectionHeading.css';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  intro?: string;
  /** 供 aria-labelledby 綁定的 h2 id（由父層 section 傳入） */
  headingId: string;
}

export function SectionHeading({ eyebrow, title, intro, headingId }: SectionHeadingProps) {
  return (
    <Reveal className="section-heading">
      <p className="section-heading__eyebrow">
        <span className="section-heading__rule" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="section-heading__title" id={headingId}>
        {title}
      </h2>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </Reveal>
  );
}
