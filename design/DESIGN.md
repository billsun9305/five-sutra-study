# 五部經典研習大綱 — 設計系統規格書

> React + Vite SPA 實作規格。實作者照此文件施工，不需再做視覺決策。
> 審美定位：**文人書卷 / 高級文具**——宣紙、墨、玉、硃砂。寧靜、留白、髮絲線。
> 全站 zh-Hant。Mobile-first（iPhone 優先），桌面以 `--maxw: 1100px` 置中展開。

---

## 1. 色彩 Tokens（精確色碼）

| Token | Hex | 用途 |
|---|---|---|
| `--paper` | `#f4f1e8` | 全站主背景（宣紙） |
| `--paper-deep` | `#ebe5d6` | 內嵌面板：深入理解、引言襯底 |
| `--paper-wash` | `#f8f5ec` | 淺分隔帶 |
| `--card` | `#fffdf7` | 卡片（暖紙白） |
| `--ink` | `#18231f` | 主墨：標題、內文 |
| `--ink-soft` | `#34403a` | 次墨：引言、論述段 |
| `--muted` | `#5b655f` | 說明文字 |
| `--faint` | `#8b948e` | 編號、輔助文字 |
| `--line` | `#ccc5b4` | 髮絲線（主要分隔） |
| `--line-soft` | `#ddd6c6` | 更淡髮絲線 |
| `--jade` | `#1d5f51` | 主色：眉題線、標籤、hover |
| `--jade-dark` | `#123f37` | 深底：引文塊、單元收尾 |
| `--jade-ink` | `#0d2e28` | 最深玉（引文塊 hover 前景層） |
| `--jade-wash` | `#e6ebe7` | 玉洗：影片卡、meta 標籤底 |
| `--jade-line` | `#a9bcb4` | 玉色邊框 |
| `--cinnabar` | `#ae3f28` | 硃砂：點睛專用，**節制使用** |
| `--cinnabar-deep` | `#8a3020` | 硃砂 hover / 深字 |
| `--cinnabar-wash` | `#f5e9e1` | 硃砂洗：研讀提醒底 |
| `--on-dark` | `#f7f3e8` | 深底上的紙白字 |
| `--on-dark-dim` | `#c3d0c9` | 深底上的次字 |

**用色紀律（必守）：**
- 硃砂只出現在：眉題（eyebrow）、編號、印章、progress hairline、active 導覽、選取色、焦點框。**絕不做大面積色塊、絕不做漸層。**
- 禁止任何紫 / 藍漸層、禁止霓虹陰影、禁止圓角過大的「卡片農場」感。
- 深色塊只有兩種：`--jade-dark` 引文塊、`--jade-dark` 互讀收尾卡。其餘一律紙色。

---

## 2. 字體與字級

Google Fonts（`display=swap`，base.css 已引入）：
- 標題 / 原文：`Noto Serif TC` — weights `500, 600, 700, 900`
- 內文 / UI：`Noto Sans TC` — weights `400, 500, 600, 700`

字級（皆為流體 `clamp`，定義於 tokens）：

| Token | 值 | 用途 |
|---|---|---|
| `--fs-hero` | `clamp(2.6rem, 11vw, 5.4rem)` | 首屏大標，serif 900 |
| `--fs-h2` | `clamp(1.65rem, 5.4vw, 2.4rem)` | 單元經名，serif 700 |
| `--fs-section` | `clamp(1.55rem, 5vw, 2.2rem)` | 章節標題，serif 700 |
| `--fs-lede` | `clamp(1.05rem, 3.4vw, 1.3rem)` | 引言，serif 500 |
| `--fs-quote` | `clamp(1.1rem, 4vw, 1.4rem)` | 引文塊，serif 600 |
| `--fs-body` | `1rem` | 內文 |
| `--fs-small` | `0.875rem` | 輔助 |
| `--fs-tiny` | `0.75rem` | 編號、標籤 |

**CJK 排印規則（必守）：**
- 內文 `line-height: 1.8`（`--lh-body`），原文引文 `1.9`（`--lh-loose`），引文塊 `1.85`。
- 標題 `line-height: 1.28`，字距 `letter-spacing: -0.015em`（微收即可，CJK 不宜過緊）。
- 眉題（eyebrow）：sans 700、`0.78rem`、硃砂色、`letter-spacing: 0.28em`、前綴一條 `24px × 2px` 硃砂短線或「——」意象。
- 內文允許 `text-align: justify`（CJK 無 rivers 問題），引言與 thesis 建議 justify。
- 數字編號（01–05、00–07）用 `--font-mono`，`0.75rem`，硃砂或 `--faint`。
- 標點：全形標點正常使用；引文內的「」『』保留。

---

## 3. 間距 / 節奏 / 版面

- 基底 4px：`--s-1`（4）→ `--s-2`（8）→ `--s-3`（12）→ `--s-4`（16）→ `--s-6`（24）→ `--s-8`（32）→ `--s-12`（48）→ `--s-16`（64）→ `--s-20`（80）。
- 容器：`width: min(var(--maxw), 100% - var(--gutter) * 2)`，`--maxw: 1100px`，`--gutter: 20px`（手機）/ `32px`（≥768px）。
- 章節上下 padding：`--section-pad-y` = `3.75rem`（手機）/ `5.5rem`（桌面）。
- 章節分隔：一律 `1px solid var(--line)` 髮絲線置頂（`border-top`），**不用色塊切換章節**。全站只有引文塊與互讀收尾用深底。
- 垂直節奏：SectionHeading 下接引言 `margin-top: var(--s-4)`；內容群組間距 `var(--s-8)`；卡片內 padding `var(--s-5) var(--s-6)`（手機）。

## 4. 圓角與陰影

- `--r-chip: 3px`（標籤、影片卡）、`--r-card: 2px`（卡片），其餘直角。**書卷感來自直角與髮絲線，不是圓角。**
- 陰影極克制：`--sh-card`（卡片常態）、`--sh-lift`（hover 上浮）、`--sh-seal`（印章）。正文區不用大面積投影。

## 5. 紙紋

全站底層固定一層 SVG `feTurbulence` 紙紋（base.css `.paper-grain`，`opacity: 0.16`，`pointer-events: none`，`z-index: 60`）。不疊加、不做動畫。

---

## 6. 動態語言（framer-motion）

**核心原則：慢、輕、只出現一次。** 所有 scroll reveal 用 `whileInView` + `viewport={{ once: true, margin: "-10% 0px" }}`。

### 6.1 標準 Reveal（全站預設）
```jsx
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10% 0px" }}
transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
```
- 套用對象：SectionHeading、段落群、卡片、引文塊、時間軸節點。
- **引文塊（深底）只做 fade（y: 12），不做大位移**，保持莊重。

### 6.2 Stagger 群組（QuotePair 列表、角度 chips、互讀卡）
```jsx
// 容器
initial="hidden" whileInView="show"
viewport={{ once: true, margin: "-10% 0px" }}
variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } }}
// 子項
variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
```

### 6.3 Hero 進場（首屏載入，非 scroll 觸發）
- 眉題：fade，`duration 0.5`
- 大標：`y: 36 → 0`，`duration 0.9`，`ease [0.22,1,0.36,1]`
- 引言：`y: 24 → 0`，`duration 0.8`，`delay 0.15`
- 建議路徑面板：`y: 24 → 0`，`duration 0.8`，`delay 0.28`

### 6.4 StickyNav 滾動進度髮絲線
```jsx
const { scrollYProgress } = useScroll();
<motion.div style={{ scaleX: scrollYProgress }} /> // originX: 0
transition spring: { stiffness: 140, damping: 30, mass: 0.4 }
```
- 2px 高、硃砂色，貼在頂欄底部。

### 6.5 互動微動態
- 連結 hover：`color` 過渡 `180ms var(--ease-out)`，底線 `text-underline-offset: 3px`。
- 卡片 hover：`translateY(-2px)` + `box-shadow: var(--sh-lift)`，`320ms`。引文塊與印章不做 hover 位移。
- Active 導覽：顏色切換 `200ms`，無位移動畫。

### 6.6 Reduced motion（必守）
- 元件內一律用 `useReducedMotion()`：為 `true` 時不傳 `initial`/`whileInView` 位移（直接渲染終態）。
- CSS 保底：base.css 已有 `@media (prefers-reduced-motion: reduce)` 將 `scroll-behavior` 改 auto、動畫/過渡壓到 `0.01ms`。

---

## 7. 章節通用模式

### SectionHeading（全章節統一）
```
[硃砂短線] 眉題 EYEBROW（sans 700 / 0.78rem / ls 0.28em / 硃砂）
大標（serif 700 / --fs-section / --ls-heading）
引言（--muted / 最寬 60em / margin-top 16px）
```
- 章節 `<section>`：`padding: var(--section-pad-y) 0`，`border-top: 1px solid var(--line)`。
- `id` 與錨點：`overview / materials / arrow / heart / diamond / avatamsaka / bardo / compare / plan`。`scroll-margin-top: var(--scroll-mt)`（base.css 已設）。

---

## 8. 元件規格（Component Inventory）

### 8.1 StickyNav（含進度髮絲線）
- `position: sticky; top: 0; z-index: 50`；背景 `color-mix(in srgb, var(--paper) 88%, transparent)` + `backdrop-filter: blur(10px)`；底部 `1px solid var(--line)`。
- 高 `--nav-h`（60/64px）。左：小標「五部經典研習大綱」（serif 700, `1rem`）+ 硃砂小印點（8px 方塊，旋轉 -4deg，可用 span 實現）。
- 右（桌面 ≥1024px）：橫排連結 `總覽 / 素材包 / 箭經 / 心經 / 金剛經 / 華嚴經 / 度亡經 / 互讀 / 節奏`，sans `0.85rem`，`--muted`；active 為硃砂 + 底部 2px 硃砂線。
- 手機（<1024px）：連結列可橫向捲動（`overflow-x: auto`，隱藏捲軸），不換行；標題縮為「研習大綱」。
- 進度線：見 6.4，絕對定位於欄底。
- Active 判定：IntersectionObserver，`rootMargin: "-30% 0px -60% 0px"`，取可見比例最高者。錨點跳轉用原生 `scroll-behavior: smooth`。

### 8.2 Hero
- `padding: clamp(3rem, 8vw, 5.5rem) 0 3rem`；底部 `1px solid var(--line)`。
- 網格：手機單欄；桌面 `1.15fr / 0.85fr`，gap `4rem`，底部對齊。
- 左欄：眉題「由感受，走到生死」→ 大標「五部經典研習大綱」（serif 900, `--fs-hero`, `line-height: 1.12`，最多 9 字寬不斷行尷尬）→ 引言（serif 500, `--fs-lede`, `--ink-soft`, `max-width: 36em`, justify）。
- 右欄「建議路徑」面板：頂部 `4px solid var(--jade)`；標題 serif 700 `1.1rem`；5 列清單，每列 `grid: 32px 1fr auto`（編號 / 經名 serif 700 / 說明 `--muted small`），列間 `1px var(--line)` 分隔；編號 mono 硃砂 `01–05`。
- 動畫：見 6.3。

### 8.3 OverviewJourney（總覽・一條由近及遠的路）
- SectionHeading（眉題「總覽」/ 標題「一條由近及遠的路」）+ 引言。
- 五階段橫條：桌面 5 等分 grid，手機改垂直時間軸。
  - 單元：`background: var(--card)`，`border: 1px solid var(--line)`，`box-shadow: var(--sh-card)`，padding `22px 16px`；頂部編號（mono 硃砂 `01`）；階段名 serif 700 `1.05rem`；副標 `--muted 0.78rem`。
  - 桌面分隔：相鄰單元間 `1px var(--line-soft)`（用 `gap: 1px` + 底色線色實現連續感，或各自 border）。
  - 手機時間軸：左側一條 `2px var(--line)` 豎線 + 硃砂圓點（10px）定位每階段。
- 階段：`01 感受・痛與苦 / 02 身心・五蘊皆空 / 03 行動・無住生心 / 04 法界・一即一切 / 05 生死・認出明光`。
- 動畫：stagger（6.2）。

### 8.4 MaterialsPack（研習素材包）
- SectionHeading（眉題「研習素材包」）+ 引言 + 硃砂提醒條（見下）。
- 提醒條：`background: var(--cinnabar-wash)`，`border-left: 4px solid var(--cinnabar)`，padding `14px 16px`，`0.9rem`，`#5d4d46` 字：「影片以匿名、中性標題呈現，點擊前往 Facebook；部分情況需登入。」
- 每單元 `.unit-pack`：`grid: 76px 1fr`（桌面；手機單欄），`padding: 28px 0`，`border-top: 1px solid var(--line)`。
  - 左： mono 硃砂 `單元 01`（`0.76rem`，`padding-top: 6px`）。
  - 右：單元標題 serif 700 `1.35rem`（如「箭經｜兩支箭」）→ 影片卡 → QuotePair 列表 → 本週實修 callout。
- **影片卡**：`display: inline-flex`，`background: var(--jade-wash)`，`border-left: 3px solid var(--jade)`，`border-radius: var(--r-chip)`，padding `8px 12px`，`0.85rem`，`--jade-dark` 字，尾綴 `↗`；hover 底線。`target="_blank" rel="noopener noreferrer"`，`aria-label` 註明「（Facebook）」。
- **本週實修 callout**：`margin-top: 20px`，`padding: 16px 18px`，`background: var(--paper-deep)`，`border-top: 3px solid var(--jade)`；首詞「本週實修｜」serif 700 `--jade-dark`；內文 `0.92rem` `--ink-soft`。
- 度亡經單元頂部加 `source-note`：「本書無單一漢譯通行的『經文句』，以下為核心教導的白話闡述。」（`background: var(--jade-wash)`，`0.82rem`，`--muted`，padding `12px 18px`。）
- 單元尾「補充讀物｜《當下的力量》」：`background: var(--jade-dark)`，`color: var(--on-dark)`，padding `20px 22px`，標題 serif 700，內文 `--on-dark-dim 0.9rem`。

### 8.5 QuotePair（原文 / 白話 配對 —— 核心元件）
這是全站最重要的閱讀元件，規格必須精確：

```
┌ article.quote-pair ─────────────────────┐
│ 原文 eyebrow（硃砂 / sans 700 / 0.72rem / ls 0.12em）│
│ 原文（serif 600 / 1rem / lh 1.9 / --ink）      │
│ ── 1px var(--line-soft) 分隔 ──              │
│ 白話 eyebrow（玉色 / 同上）                    │
│ 白話（sans 400 / 0.95rem / lh 1.85 / --ink-soft）│
│ ┌ 深入理解（可選） ──────────────────┐      │
│ │ bg --paper-deep, padding 14px 16px │      │
│ │ eyebrow「深入理解」硃砂小字         │      │
│ │ 段落：lead <strong> serif 玉深色    │      │
│ └──────────────────────────────┘      │
└─────────────────────────────────────────┘
```
- 容器：`background: var(--card)`，`border: 1px solid var(--line)`，`border-top: 3px solid var(--jade)`，`border-radius: var(--r-card)`，`box-shadow: var(--sh-card)`，padding `20px 22px`（手機 `18px 16px`）。
- 相鄰 QuotePair 間距 `var(--s-4)`；stagger 進場（6.2）。
- label 欄：桌面可選 `64px` 左軌（原文/白話/教導 直排），手機改頂部 eyebrow 橫排。**建議實作：CSS grid `grid-template-columns: 64px 1fr` ≥768px，手機單欄**，label 文字豎排太花，維持橫字。
- 度亡經的 label 用「教導」代替「原文」（硃砂同色）。
- 深入理解內 `<strong>`：serif 700，`--jade-dark`；段落間距 `8px`；字級 `0.88rem`，`lh 1.75`。

### 8.6 SutraUnit（五單元：arrow / heart / diamond / avatamsaka / bardo）
每單元結構固定，順序不可調：

1. **單元頭**：grid `96px 1fr`（手機單欄，印章縮小）。
   - **印章**：`84px` 正方，`2px solid var(--cinnabar)`，硃砂字 serif 900 `1.2rem`，`transform: rotate(-2deg)`，`box-shadow: var(--sh-seal)`，padding `10px`，置中，`line-height: 1.15`。文字：兩支箭 / 五蘊皆空 / 無住生心 / 一即一切 / 認出明光。
   - meta 標籤列：`0.75rem`，`--jade-dark` 字，`1px solid var(--jade-line)` 邊框，`background: var(--jade-wash)`，padding `3px 10px`，`border-radius: var(--r-chip)`。如「阿含／早期佛教」「SN 36.6・受念處」。
   - 經名 `h2`：serif 700，`--fs-h2`。
   - thesis：`1.02rem`，`--ink-soft`，`max-width: 52em`，justify。
2. **引文塊**（pull quote）：`background: var(--jade-dark)`，`color: var(--on-dark)`，serif 600，`--fs-quote`，`lh 1.85`，padding `26px 28px`，`margin: 28px 0`；右上大引號裝飾（serif, `5rem`, `rgba(255,255,255,.12)`，絕對定位）；出處 `<cite>`：sans `0.75rem`，`--on-dark-dim`，`margin-top: 12px`，非斜體。
3. **切入角度**：小標 serif 700 `1.15rem` `--jade-dark`（如「從哪些角度切入？」）+ chips：`1px solid var(--line)`，padding `8px 12px`，`0.85rem`，`--ink-soft`，`border-radius: var(--r-chip)`，flex wrap，gap `8px`；hover 變 `--jade` 邊框。
4. **練習雙卡**：grid 2 欄（手機 1 欄），gap `16px`。
   - 卡 A「本週練習」：`background: var(--jade-wash)`，padding `22px 24px`。
   - 卡 B（生活檢驗 / 影片譬喻 / 閱讀邊界）：`background: #ece3d8`（暖陶），同 padding。
   - 卡標 serif 700 `1.05rem`；內文 `0.9rem` `--ink-soft`。
5. **延伸閱讀**：`border-top: 1px dashed var(--line-dark)`，`padding-top: 18px`，grid 2 欄（手機 1 欄）；欄標 serif 700（入門 / 深入）；清單 `0.87rem`，`--muted`，行距 `1.7`，`padding-left: 1.2em`（disc）。
6. **資料線索**：`0.78rem`，`--faint`，`margin-top: 18px`；連結 `--jade-dark`，hover 硃砂，`text-underline-offset: 3px`。

### 8.7 CrossReading（五經互讀）
- SectionHeading（標題「五經互讀：不要只做名詞配對」）+ 引言「真正有力的對讀，是讓一部經成為另一部經的檢查工具。」
- 卡片 grid：桌面 2 欄，手機 1 欄，gap `14px`。
- 卡：`background: var(--card)`，padding `22px 24px`，`border: 1px solid var(--line)`，`box-shadow: var(--sh-card)`；標題 serif 700（如「《心經》 × 《金剛經》」），內文 `0.9rem` `--ink-soft`。
- 末卡「共同的問題」：**全寬**，`background: var(--jade-dark)`，`color: var(--on-dark)`，內文 `--on-dark-dim`。
- stagger 進場。

### 8.8 Rhythm（研習節奏・時間軸）
- SectionHeading（標題「一個可執行的研習節奏」）+ 引言。
- 五階段：每列 grid `88px 1fr`（手機單欄），`padding: 22px 0`，`border-top: 1px solid var(--line)`。
  - 左：mono 硃砂 `階段 1`（`0.76rem`）。
  - 右：階段名 serif 700 + 說明 `--muted 0.9rem`（`margin-top: 6px`）。
- **研讀提醒**（honesty note，必留）：`margin-top: 28px`，`background: var(--cinnabar-wash)`，`border: 1px solid var(--cinnabar-line)`，padding `22px 24px`；標題 serif 700「研讀提醒」；內文 `0.86rem` `#65514a`：「這份大綱彙整於 2026-09-09；研究來源中有一部分只由搜尋索引摘要確認，尚未逐頁核實。遇到引文、年代與宗派差異時，請優先回到原經、正式出版物與具名講解。尤其『中有是否存在、是否固定四十九天』並非佛教各宗一致定論。」
- 「回到開頭 ↑」：`--jade-dark`，`margin-top: 20px`，inline-block。

### 8.9 ReadingIndex（研習索引）
- **實作即 StickyNav**（8.1）：索引 = 頂欄導覽列，不再另做側邊欄。連結順序：總覽(00) / 素材包 / 箭經(01) / 心經(02) / 金剛經(03) / 華嚴經(04) / 度亡經(05) / 互讀(06) / 節奏(07)。
- Hero 下方可選一條「章節速覽」橫捲 chips（手機友善），連結同上錨點；桌面隱藏（已有頂欄）。

### 8.10 Footer（含研讀提醒）
- `border-top: 1px solid var(--line)`，`padding: 36px 0 56px`，`--muted`，`0.8rem`。
- 三段式（置中，`max-width: 60em`）：
  1. 「研習主線：聞其譬喻，思其義理，修於當下。影片可作入口，不能取代原典。」（serif 500）
  2. 研讀提醒精簡版：「本大綱彙整於 2026-09-09，部分資料尚未逐頁核實；引文、年代與宗派差異請以原典與正式出版物為準。」（`0.78rem`，`--faint`）
  3. 「回到開頭 ↑」連結。
- 不加版權宣告堆砌，保持一頁清靜。

---

## 9. 斷點

| 斷點 | 行為 |
|---|---|
| `< 768px` | 單欄；gutter 20px；section-pad 3.75rem；導覽橫捲；印章 64px；練習/閱讀/互讀卡單欄 |
| `≥ 768px` | gutter 32px；section-pad 5.5rem；雙欄網格啟用；QuotePair 啟用 64px label 軌 |
| `≥ 1024px` | StickyNav 連結全顯示不捲動；Hero 雙欄；Journey 五等分橫條 |

容器上限 1100px 置中；`overflow-x: hidden` 防橫捲（base.css 已設）。

---

## 10. 無障礙與細節（必守）

- 語義：`<header> <nav> <main> <section aria-labelledby> <article> <blockquote><cite> <footer>` 齊全；裝飾引號 `aria-hidden`。
- 外部連結一律 `target="_blank" rel="noopener noreferrer"` + `aria-label` 註明目的地（如「（Facebook）」「（YouTube）」）。
- `:focus-visible` 硃砂 2px 外框（base.css 已設），勿移除。
- 顏色對比：`--muted` 在紙底上 ≥ 4.5:1（`#5b655f` on `#f4f1e8` ≈ 5.9:1）；`--on-dark-dim` 只用於非關鍵輔助字。
- `lang="zh-Hant"`；`<meta name="theme-color" content="#f4f1e8">`。

---

## 11. 實作對照（檔案）

- `src/styles/tokens.css` — 本文件 §1–§4 的 CSS 變數（已建）。
- `src/styles/base.css` — reset、紙紋、選取、焦點、smooth scroll、reduced-motion（已建）。
- 元件樣式：各元件獨立 CSS 檔（如 `src/components/StickyNav.css`），**只引用 tokens，不寫死色碼字級**。
- framer-motion：Reveal 抽成 `src/components/Reveal.jsx`（封裝 6.1 參數 + `useReducedMotion`）；Stagger 抽成 `RevealGroup`/`RevealItem`。

---

*規格定稿 2026-09-12。動任何 token 前，先確認整站對比與紙墨氣質不受損。*
