# Content API — `src/data/content.ts`

本檔案是「五部經典研習大綱」React 站的**唯一內容來源**。UI 實作者請只從這裡取值，
**不要改寫任何文字**，尤其是 `baihua` 欄位（使用者已明示「採用、不要改寫」）。

- 白話文字：逐字取自 `buddhist-study/baihua-duizhao.md`
  （已程式比對 `deploy-site/index.html`，24 組原文/白話完全一致、無差異）。
- 其餘內容：取自 `deploy-site/index.html`。
- 語言：繁體中文 (zh-Hant)。全文型別化，無 `any`。

---

## 型別一覽

### 基礎型別

| 名稱 | 定義 | 說明 |
|---|---|---|
| `UnitId` | `'arrow' \| 'heart' \| 'diamond' \| 'avatamsaka' \| 'bardo'` | 五單元固定 id，研習順序即 `units` 陣列順序 |
| `QuoteKind` | `'原文' \| '教導'` | 西藏度亡經無通行漢譯句式，用「教導」 |

### 常數

| 名稱 | 值 | 用途 |
|---|---|---|
| `BAIHUA_LABEL` | `'白話'` | 白話欄位的固定顯示標籤 |
| `INSIGHTS_LABEL` | `'深入理解'` | 深入理解註解區塊的固定標籤 |
| `ANGLES_HEADING` | `'從哪些角度切入？'` | 角度列表的固定標題 |

---

## `siteMeta: SiteMeta` — 全站標頭

```ts
interface RouteStop  { sutra: string; note: string }            // e.g. { sutra:'《箭經》', note:'兩支箭・先看見反應' }
interface Principle  { label: string; text: string }            // label: 聞 / 思 / 修
interface NavItem    { id: string; no: string; label: string }  // e.g. { id:'arrow', no:'01', label:'箭經（兩支箭）' }

interface SiteMeta {
  title: string;        // '五部經典研習大綱'
  kicker: string;       // hero 上方小字：'由感受，走到生死'
  lede: string;         // hero 導言段落
  routeTitle: string;   // '建議路徑'
  route: RouteStop[];   // 5 項，hero 右側建議路徑
  principles: Principle[]; // 3 項，聞思修
  nav: NavItem[];       // 9 項側邊導覽：00 總覽 / ＋ 素材包 / 01–05 五經 / 06 互讀 / 07 節奏
  studyNote: string;    // 側邊研習建議小字
  footer: string;       // 頁尾：「研習主線：聞其譬喻…」
  backToTop: string;    // '回到開頭 ↑'
}
```

---

## `overview: Overview` — 五階段學習地圖

```ts
interface OverviewStage { number: string; name: string; note: string }
// 01 感受・痛與苦 / 02 身心・五蘊皆空 / 03 行動・無住生心 / 04 法界・一即一切 / 05 生死・認出明光

interface Overview {
  title: string;   // '一條由近及遠的路'
  intro: string;   // 導言段落
  stages: OverviewStage[]; // 5 項
}
```

---

## `materialsPack: MaterialsPack` — 研習素材包

```ts
interface ReelEntry {
  unitId: UnitId;
  unitNo: string;        // '單元 01' … '單元 05'
  unitTitle: string;     // e.g. '箭經｜兩支箭'
  videoLabel: string;    // 連結文字，e.g. '「兩支箭」主題短片'
  videoAriaLabel: string;// e.g. '開啟「兩支箭」主題短片（Facebook）'
  url: string;           // Facebook reel 網址（逐字取自原頁，含 www.prod.facebook.com）
}

interface MaterialsPack {
  title: string;   // '研習素材包'
  intro: string;   // 導言段落
  note: string;    // 提示框：「六支影片以匿名、中性標題呈現…」
  reels: ReelEntry[]; // 6 項（bardo 單元佔 2 支）
  extraReading: { title: string; text: string }; // 補充讀物｜《當下的力量》
}
```

| unitNo | unitTitle | videoLabel | url |
|---|---|---|---|
| 單元 01 | 箭經｜兩支箭 | 「兩支箭」主題短片 | https://www.prod.facebook.com/reel/1051676314152306/ |
| 單元 02 | 心經｜色即是空 | 「心經・彼岸智慧」主題短片 | https://www.prod.facebook.com/reel/1650435989430476/ |
| 單元 03 | 金剛經｜應無所住而生其心 | 「金剛經・彼岸智慧」主題短片 | https://www.prod.facebook.com/reel/1360935729292644/ |
| 單元 04 | 華嚴經｜一即一切 | 「華嚴經・微塵與萬物」主題短片 | https://www.prod.facebook.com/reel/3993323730798543/ |
| 單元 05 | 西藏度亡經｜中陰與放下 | 「西藏度亡經・明光」主題短片 | https://www.prod.facebook.com/reel/1793376918512519/ |
| 單元 05 | 西藏度亡經｜中陰與放下 | 「西藏度亡經・菩薩」主題短片 | https://www.prod.facebook.com/reel/1688857075574525/ |

---

## `units: SutraUnit[]` — 五個經單元

```ts
interface Insight { title: string; body: string }  // 「深入理解」一則：小標＋正文

interface Quote {
  kind: QuoteKind;          // '原文' | '教導'
  label: '原文' | '教導';   // 顯示標籤（與 kind 相同）
  original: string;         // 關鍵經文原文（逐字，勿改）
  baihua: string;           // 白話逐句講解（逐字，勿改）
  insights?: Insight[];     // 原頁「深入理解」註解，可選
}

interface PracticePair { title: string; text: string }
// title 取值：'本週練習' ＋ '生活檢驗'（箭經）/ '影片譬喻'（心/金剛/華嚴）/ '閱讀邊界'（度亡經）

interface ReadingSource { title: string; url: string }  // 「資料線索」連結（網址逐字）

interface UnitReadings {
  入門: string[];              // 入門書單（無連結）
  深入: string[];              // 深入書單（無連結）
  資料線索: ReadingSource[];   // 含連結
}

interface SutraUnit {
  id: UnitId;
  number: string;   // '01' … '05'
  title: string;    // 短標題：'箭經' / '心經' / '金剛經' / '華嚴經' / '西藏度亡經'
  sutraName: string;// 完整標題：'《箭經》（兩支箭）' / '《心經》' / …
  theme: string;    // 單元主題：'兩支箭' / '色即是空' / '應無所住而生其心' / '一即一切' / '中陰與放下'
  seal: string;     // 印章字：'兩支箭' / '五蘊皆空' / '無住生心' / '一即一切' / '認出明光'
  meta: string[];   // 標籤，e.g. ['阿含／早期佛教', 'SN 36.6・受念處']
  thesis: string;   // 單元導言段落（原頁 thesis）
  epigraph: { text: string; cite: string }; // 單元引言大字＋出處
  sourceNote?: string; // 僅 bardo 有：「本書無單一漢譯通行的「經文句」…」
  quotes: Quote[];  // 關鍵經文對照：3 / 6 / 6 / 5 / 4，共 24
  practiceWeekly: string;      // 「本週實修｜」行（取自素材包）
  practicePairs: PracticePair[]; // 2 項
  angles: string[]; // 5–6 項切入角度
  readings: UnitReadings;
}
```

### 各單元內容摘要

| # | id | quotes | insights 總數 | 資料線索連結數 |
|---|---|---|---|---|
| 01 | arrow | 3 | 4 | 2 |
| 02 | heart | 6 | 5 | 3 |
| 03 | diamond | 6 | 5 | 2 |
| 04 | avatamsaka | 5 | 6 | 2 |
| 05 | bardo | 4 | 6 | 3 |

- `insights` 分佈：非每則 quote 都有（原頁本就如此，例如心經原文 3、 金剛經原文 5–6 無深入理解）。
- `bardo` 的 `quotes[].kind` 皆為 `'教導'`，其餘單元皆為 `'原文'`。
- 渲染 quote 時，標籤列用 `quote.label`，白話列用 `BAIHUA_LABEL`，深入理解列用 `INSIGHTS_LABEL`。

---

## `crossReading: CrossReading` — 五經互讀

```ts
interface CrossReadingPair { title: string; text: string }

interface CrossReading {
  title: string;  // '五經互讀：不要只做名詞配對'
  intro: string;  // '真正有力的對讀，是讓一部經成為另一部經的檢查工具。'
  pairs: CrossReadingPair[]; // 5 項
}
```

pairs 標題：`《心經》 × 《金剛經》`、`般若 × 華嚴`、`《箭經》 × 《心經》`、
`《箭經》 × 《度亡經》`、`共同的問題`（最後一則為全寬深色卡，UI 可特殊處理）。

---

## `rhythm: Rhythm` — 研習節奏

```ts
interface RhythmStep { title: string; text: string }

interface Rhythm {
  title: string;  // '一個可執行的研習節奏'
  intro: string;
  steps: RhythmStep[]; // 5 項：影片與直覺 / 原文與語境 / 義理與反例 / 一週實修 / 回看影片
}
```

---

## `honestyNote: HonestyNote` — 研讀提醒

```ts
interface HonestyNote { title: string; text: string }
// title: '研讀提醒'
// text: 全文保留（含「研究來源中有一部分只由搜尋索引摘要確認，尚未逐頁核實」），未淡化。
```

---

## 便利函式

| 函式 | 簽名 | 說明 |
|---|---|---|
| `getUnit` | `(id: UnitId) => SutraUnit \| undefined` | 依 id 取單元 |
| `getReelsForUnit` | `(id: UnitId) => ReelEntry[]` | 依 id 取該單元短片（bardo 回傳 2 支） |

---

## 實作注意事項

1. **白話不可改寫**：所有 `quote.baihua` 逐字取自 `baihua-duizhao.md`，含標點與括號。
2. **網址逐字**：Facebook reel 用的是 `www.prod.facebook.com`（非 `www.facebook.com`），請勿「修正」。
3. **省略的原頁元素**（刻意未收錄，皆為響應式重複或純裝飾）：
   - 手機版導覽（`.mobile-nav`）：內容為側邊導覽的子集，用 `siteMeta.nav` 渲染即可。
   - IntersectionObserver 捲動監聽、紙紋背景、返回頂部以外的純 CSS/JS。
   - 單元小標「單元 01」等編號文字已收錄於 `materialsPack.reels[].unitNo`。
4. `quote.insights` 為可選：渲染時若無則不顯示「深入理解」區塊。
5. `bardo.epigraph.cite` 為「核心教義轉述；本書並無單一通行漢譯句式」——顯示時保留原樣。
