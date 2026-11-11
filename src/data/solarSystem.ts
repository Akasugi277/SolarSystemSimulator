/**
 * 太陽系軌道早見シミュレーター 天体データ定義
 * 基準エポック: J2000.0 (2000年1月1日 12:00 UTC)
 *
 * 3段階の自動調整表示縮尺（ScaleZone）:
 * 1. 'inner' : 内惑星縮尺（水星〜火星・ケレス ＋ 外惑星基準の木星 ＋ 周期彗星の近日点/木星族軌道）
 * 2. 'outer' : 外惑星縮尺（ケレス・木星〜海王星 ＋ 木星族彗星・ハレー彗星全体）
 * 3. 'tno'   : 外縁天体縮尺（海王星 ＋ 冥王星型4 ＋ 準惑星候補4 ＋ ハレー型彗星の遠日点領域）
 */

/** 3つの表示縮尺モード */
export type ScaleZone = 'inner' | 'outer' | 'tno';

/**
 * 天体の大分類
 * - 'planet': 惑星（8天体）
 * - 'dwarf_planet': IAU公認の準惑星（5天体：ケレス、冥王星、ハウメア、マケマケ、エリス）
 * - 'dwarf_candidate': 準惑星候補の大型太陽系外縁天体（4天体：オルクス、クワオアー、ゴンゴン、セドナ）
 * - 'comet': 太陽系の主要周期彗星（5天体：ハレー、エンケ、チュリュモフ・ゲラシメンコ、スイフト・タットル、ジャコビニ・ツィナー）
 */
export type BodyClass = 'planet' | 'dwarf_planet' | 'dwarf_candidate' | 'comet';

/** 天体の詳細サブ区分 */
export type BodySubGroup =
  | 'inner_planet' // 内惑星（水星・金星・地球・火星）
  | 'asteroid_dwarf' // 準惑星：小惑星ケレス（メインベルト）
  | 'outer_planet' // 外惑星（木星・土星・天王星・海王星）
  | 'plutoid' // 準惑星：冥王星型天体（IAU公認：冥王星・ハウメア・マケマケ・エリス）
  | 'tno_candidate' // 準惑星候補：大型太陽系外縁天体（オルクス・クワオアー・ゴンゴン・セドナ）
  | 'comet_periodic'; // 周期彗星（ハレー、エンケ、チュリュモフ・ゲラシメンコ、スイフト・タットル、ジャコビニ・ツィナー）

/** 衛星（月）のデータ型定義 */
export interface MoonData {
  /** 衛星の識別ID */
  id: string;
  /** 日本語名称 */
  nameJa: string;
  /** 英語名称 */
  nameEn: string;
  /** 公転周期（地球日・負の値は逆行軌道を表す） */
  orbitalPeriodDays: number;
  /** 実際の平均軌道半径（km） */
  distanceKm: number;
  /** 主役縮尺での親天体中心からの表示軌道半径（px） */
  orbitRadiusPx: number;
  /** シミュレーター上の表示半径（px） */
  sizePx: number;
  /** 描画カラー */
  color: string;
  /** J2000.0時点の初期位相角（度） */
  initialAngleDeg: number;
  /** 直径（km） */
  diameterKm: number;
  /** 特徴・解説 */
  description: string;
}

/** 惑星の環（リング）を構成する個別バンドの定義 */
export interface RingBandConfig {
  /** バンド識別名（例: 'C環', 'B環', 'A環', '主環', 'ε環', 'アダムズ環アーク'） */
  name: string;
  /** 天体半径（bodySizePx）に対する長半径の倍率 */
  radiusMultiplier: number;
  /** 基準となる線の太さ（px） */
  strokeWidthPx: number;
  /** 描画カラー */
  color: string;
  /** 不透明度（0.0 〜 1.0） */
  opacity: number;
  /** 破線パターン（海王星のリング・アークや希薄なダスト環の表現用） */
  dashArray?: string;
}

/** 惑星・準惑星の環（リング）システム定義 */
export interface RingSystemConfig {
  /** 環の名称・特徴ラベル（詳細パネルに表示） */
  labelJa: string;
  /** 環の傾斜角（度：天王星のように横倒しの環は 76° など高角度で表現） */
  tiltDeg: number;
  /** 楕円の縦横比（短半径 / 長半径） */
  aspectRatio: number;
  /** 環を構成する多重バンド配列（内側から外側） */
  bands: RingBandConfig[];
}

/** 天体の内部・マントル構造を構成する各層の定義（表層から中心核の順） */
export interface InteriorLayerConfig {
  /** 層の名称（例: 'ケイ酸塩マントル', '液体金属水素マントル', '超イオン氷マントル'） */
  name: string;
  /** 天体半径に対する外縁半径の比率（1.00 〜 0.15：断面図の描画比率） */
  outerRadiusRatio: number;
  /** 断面図およびインジケーターの描画カラー */
  color: string;
  /** 層の組成・深さ・物理状態の解説 */
  detail: string;
}

/** 天体の内部・マントル構造定義 */
export interface InteriorStructureConfig {
  /** 内部・マントル構造の要約タイトル */
  summary: string;
  /** 外層（地殻・表層）から中心核（コア）へ向かう層リスト */
  layers: InteriorLayerConfig[];
}

/** 3つの縮尺モードごとの軌道長半径・天体サイズ設定 */
export interface ZoneScaleConfig {
  /** 各縮尺（見やすさ優先・自動間隔調整モード）での軌道長半径（px） */
  orbitRadiusPx: Record<ScaleZone, number>;
  /** 各縮尺での天体球体サイズ（px） */
  bodySizePx: Record<ScaleZone, number>;
  /** 各縮尺において主役表示（ラベル・衛星を常時表示）するかどうか */
  isPrimaryInZone: Record<ScaleZone, boolean>;
  /** 各縮尺において画面内表示対象かどうか（falseの場合は外周へ退避・フェードアウト） */
  isVisibleInZone: Record<ScaleZone, boolean>;
  /** 表示上の離心率オーバーライド（単一値、または縮尺ごとの指定） */
  customDisplayEcc?: number | Record<ScaleZone, number>;
}

/** 参照文献・学術論文・データソース情報 */
export interface AcademicReference {
  /** 論文またはリソースタイトル */
  title: string;
  /** 著者名または機関名（任意） */
  authors?: string;
  /** 公開年（任意） */
  year?: number;
  /** 掲載誌・学術機関名・データベース名 */
  journalOrSource: string;
  /** DOIまたは公式URL（任意） */
  doiOrUrl?: string;
  /** 補足説明（任意） */
  description?: string;
}

/** 惑星・準惑星・準惑星候補・彗星のデータ型定義 */
export interface PlanetData {
  /** 天体の識別ID */
  id: string;
  /** 日本語名称 */
  nameJa: string;
  /** 英語名称 */
  nameEn: string;
  /** 天文記号 */
  symbol: string;
  /** 天体大分類（'planet' | 'dwarf_planet' | 'dwarf_candidate' | 'comet'） */
  bodyClass: BodyClass;
  /** 詳細サブ区分 */
  subGroup: BodySubGroup;
  /** この天体が主役となる標準縮尺ゾーン（'inner' | 'outer' | 'tno'） */
  homeZone: ScaleZone;
  /** 表示用の分類ラベル */
  category: string;
  /** 平均軌道長半径（天文単位 AU） */
  semiMajorAxisAu: number;
  /** 軌道離心率 */
  eccentricity: number;
  /** 黄道面に対する軌道傾斜角（度） */
  inclinationDeg: number;
  /** J2000.0時点の昇交点黄経（度） */
  ascendingNodeLongitudeDeg: number;
  /** 公転周期（地球日・負の値は逆行公転を表す） */
  orbitalPeriodDays: number;
  /** 自転周期（時間・負の値は逆行自転） */
  rotationPeriodHours: number;
  /** J2000.0時点の平均黄経（度） */
  meanLongitudeDeg: number;
  /** 近日点黄経（度） */
  perihelionLongitudeDeg: number;
  /** 3つの縮尺モードごとの自動調整パラメータ */
  scaleConfig: ZoneScaleConfig;
  /** メインカラー */
  color: string;
  /** グラデーション用のサブカラー */
  accentColor: string;
  /** 軌道線のカラー */
  orbitColor: string;
  /** 軌道線のスタイル（'solid': 惑星 | 'dashed': 公認準惑星 | 'dotted': 準惑星候補 | 'comet': 彗星） */
  orbitStyle: 'solid' | 'dashed' | 'dotted' | 'comet';
  /** 環（リング）を持つかどうか */
  hasRings?: boolean;
  /** 環の代表カラー */
  ringColor?: string;
  /** 多重構造・傾斜角・アーク等を含む詳細な環（リング）システム定義 */
  ringSystem?: RingSystemConfig;
  /** 天体の内部・マントル断面構造定義 */
  interiorStructure?: InteriorStructureConfig;
  /** 実際の赤道直径（km） */
  diameterKm: number;
  /** 平均公転速度または近日点最大速度（km/s） */
  orbitalSpeedKms: number;
  /** 表面温度または活動情報 */
  temperatureInfo: string;
  /** 解説テキスト */
  description: string;
  /** 主要な衛星リスト */
  moons: MoonData[];
  /** 参照文献・学術論文・公式データソースのリスト（準備枠） */
  references?: AcademicReference[];
}

/** 中心星（太陽）のデータ型定義 */
export interface SunData {
  id: string;
  nameJa: string;
  nameEn: string;
  symbol: string;
  category: string;
  diameterKm: number;
  rotationPeriodDays: number;
  temperatureInfo: string;
  description: string;
  /** 太陽の内部層構造（中心核・放射層・対流層・光球） */
  interiorStructure: InteriorStructureConfig;
  /** 3つの縮尺ごとの太陽の表示半径（px） */
  sizeByZonePx: Record<ScaleZone, number>;
  /** 参照文献・学術論文・公式データソースのリスト（準備枠） */
  references?: AcademicReference[];
}

/** 基準エポック J2000.0 のミリ秒タイムスタンプ (2000-01-01T12:00:00Z) */
export const J2000_TIMESTAMP = Date.UTC(2000, 0, 1, 12, 0, 0);

/**
 * 天体・衛星軌道の拡大ビューに対応する全天体IDリスト（太陽・8惑星・5公認準惑星・準惑星候補/外縁天体9・5周期彗星の全28天体）
 */
export const MOON_SYSTEM_TARGET_IDS: readonly string[] = [
  'sun',
  'mercury',
  'venus',
  'earth',
  'mars',
  'ceres',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'orcus',
  'pluto',
  'haumea',
  'quaoar',
  'makemake',
  'gonggong',
  'eris',
  'sedna',
  'ixion',
  'uni',
  'varuna',
  'tx300',
  'tc302',
  'encke',
  'churyumov_gerasimenko',
  'giacobini_zinner',
  'halley',
  'swift_tuttle',
];

/**
 * 3つの縮尺モードごとのメタデータ定義
 */
export const SCALE_ZONES_META: Record<
  ScaleZone,
  {
    id: ScaleZone;
    labelJa: string;
    shortLabel: string;
    rangeAuText: string;
    description: string;
    /** 実距離比(AU)モードでの最大基準距離(AU) */
    maxAuRef: number;
    /** メインベルト（小惑星帯）の表示半径と幅 */
    mainBelt: { radiusPx: number; widthPx: number; opacity: number };
    /** カイパーベルト（外縁天体帯）の表示半径と幅 */
    kuiperBelt: { radiusPx: number; widthPx: number; opacity: number };
    /** 推奨される標準再生スピード（日/秒） */
    recommendedSpeedDays: number;
  }
> = {
  inner: {
    id: 'inner',
    labelJa: '1. 内惑星縮尺（水星〜火星・ケレス・木星・彗星近日点）',
    shortLabel: '内惑星',
    rangeAuText: '0.34 AU 〜 5.2 AU 領域 (軌道間隔自動調整)',
    description:
      '水星・金星・地球・火星の4内惑星と小惑星帯の準惑星ケレス、外惑星の内縁基準となる木星（およびガリレオ衛星）、さらに周期彗星の近日点・木星族軌道を広々と表示します。',
    maxAuRef: 5.35,
    mainBelt: { radiusPx: 435, widthPx: 38, opacity: 0.96 },
    kuiperBelt: { radiusPx: 980, widthPx: 80, opacity: 0.0 },
    recommendedSpeedDays: 10,
  },
  outer: {
    id: 'outer',
    labelJa: '2. 外惑星縮尺（木星〜海王星・冥王星・木星族/ハレー彗星）',
    shortLabel: '外惑星',
    rangeAuText: '2.8 AU 〜 39.5 AU 領域 (軌道間隔自動調整)',
    description:
      '木星・土星・天王星・海王星の4外惑星と主要衛星群、外縁天体の内縁基準となる準惑星・冥王星（およびカロン等）、さらに木星族彗星やハレー彗星の全体軌道を表示します。',
    maxAuRef: 40.5,
    mainBelt: { radiusPx: 122, widthPx: 20, opacity: 0.85 },
    kuiperBelt: { radiusPx: 542, widthPx: 62, opacity: 0.58 },
    recommendedSpeedDays: 120,
  },
  tno: {
    id: 'tno',
    labelJa: '3. 外縁天体縮尺（冥王星型4 ＋ 準惑星候補8 ＋ 長周期彗星）',
    shortLabel: '外縁天体',
    rangeAuText: '30 AU 〜 76 AU+ (セドナ遠日点 937 AU)',
    description: '海王星以遠の冥王星型天体4つ、準惑星候補8つ（クワオアー・ゴンゴン・セドナ・イクシオン・ウニ・ヴァルナ・2002 TX300・2002 TC302）、およびカイパーベルトまで達するスイフト・タットル彗星などを表示します。',
    maxAuRef: 72.0,
    mainBelt: { radiusPx: 46, widthPx: 8, opacity: 0.32 },
    kuiperBelt: { radiusPx: 345, widthPx: 152, opacity: 0.96 },
    recommendedSpeedDays: 1826.25,
  },
};

/** 太陽のデータ */
export const SUN_DATA: SunData = {
  id: 'sun',
  nameJa: '太陽',
  nameEn: 'Sun',
  symbol: '☉',
  category: '恒星（G型主系列星）',
  diameterKm: 1392700,
  rotationPeriodDays: 25.38,
  temperatureInfo: '表面: 約5,500℃ / 中心核: 約1,500万℃',
  description:
    '太陽系の中心に位置する恒星で、太陽系全質量の約99.86%を占めています。固体の地殻やマントルを持たない超高温のプラズマ球体であり、内部は「中心核（核融合炉）→ 放射層（光子のエネルギー伝達層）→ 対流層（プラズマの対流セル層）→ 光球・大気層」の4層構造になっています。',
  interiorStructure: {
    summary: 'プラズマ4層構造（光球 ➔ 対流層 ➔ 放射層 ➔ 中心核）',
    layers: [
      {
        name: '光球・大気層 (Photosphere & Corona)',
        outerRadiusRatio: 1.0,
        color: '#fef08a',
        detail: '厚さ約500kmの表面（約5,500℃）と、外側に広がる彩層・数百万℃のコロナ。',
      },
      {
        name: '対流層 (Convective Zone / 外側対流マントル相当)',
        outerRadiusRatio: 0.94,
        color: '#f97316',
        detail: '半径の約70%〜100%領域（深さ約20万km）。プラズマが沸騰するように対流し表面へ熱を輸送。',
      },
      {
        name: '放射層 (Radiative Zone / 内部伝達層)',
        outerRadiusRatio: 0.70,
        color: '#f59e0b',
        detail: '半径の約25%〜70%領域。高密度プラズマ中で光子が散乱を繰り返しながら約10万年かけて熱を伝達。',
      },
      {
        name: '中心核 (Solar Core)',
        outerRadiusRatio: 0.28,
        color: '#fffef0',
        detail: '半径の約25%以内（約1,500万℃・約2,500億気圧）。毎秒約6億トンの水素がヘリウムへ核融合反応を起こす。',
      },
    ],
  },
  sizeByZonePx: {
    inner: 23,
    outer: 12,
    tno: 7,
  },
};

/**
 * 太陽系の全22天体データ
 * - 惑星 (8): 水星、金星、地球、火星、木星、土星、天王星、海王星
 * - IAU公認準惑星 (5): ケレス、冥王星、ハウメア、マケマケ、エリス
 * - 準惑星候補・大型外縁天体 (4): オルクス、クワオアー、ゴンゴン（共工）、セドナ
 * - 主要周期彗星 (5): エンケ、チュリュモフ・ゲラシメンコ、ジャコビニ・ツィナー、ハレー、スイフト・タットル
 */
export const PLANETS_DATA: PlanetData[] = [
  // ==================== 1. 内惑星領域 (Inner Planets) ====================
  {
    id: 'mercury',
    nameJa: '水星',
    nameEn: 'Mercury',
    symbol: '☿',
    bodyClass: 'planet',
    subGroup: 'inner_planet',
    homeZone: 'inner',
    category: '内惑星 / 地球型惑星（岩石惑星）',
    semiMajorAxisAu: 0.3871,
    eccentricity: 0.2056,
    inclinationDeg: 7.0,
    orbitalPeriodDays: 87.969,
    rotationPeriodHours: 1407.6,
    meanLongitudeDeg: 252.25,
    perihelionLongitudeDeg: 77.46,
    ascendingNodeLongitudeDeg: 48.33,
    scaleConfig: {
      orbitRadiusPx: { inner: 82, outer: 26, tno: 12 },
      bodySizePx: { inner: 5.8, outer: 2.2, tno: 1.2 },
      isPrimaryInZone: { inner: true, outer: false, tno: false },
      isVisibleInZone: { inner: true, outer: true, tno: true },
    },
    color: '#b5b8b1',
    accentColor: '#78756e',
    orbitColor: 'rgba(181, 184, 177, 0.5)',
    orbitStyle: 'solid',
    diameterKm: 4879,
    orbitalSpeedKms: 47.36,
    temperatureInfo: '-180℃ 〜 +430℃',
    description:
      '太陽に最も近い地球型惑星です。内部構造の最大の特徴は、惑星半径の約83%（体積の約60%）を占める異常に巨大な鉄・ニッケル中心核であり、その外側を厚さわずか約400kmの非常に薄い「ケイ酸塩マントル」と地殻が覆っています。',
    interiorStructure: {
      summary: '巨大金属核 ＋ 極薄のケイ酸塩マントル構造',
      layers: [
        {
          name: 'ケイ酸塩地殻 (Silicate Crust)',
          outerRadiusRatio: 1.0,
          color: '#a8a29e',
          detail: '厚さ約35〜40km。黒鉛や硫化物を多く含む暗い岩石地殻。',
        },
        {
          name: 'ケイ酸塩マントル (Silicate Mantle)',
          outerRadiusRatio: 0.94,
          color: '#78716c',
          detail: '厚さ約400kmの非常に薄い岩石マントル。初期の巨大天体衝突でマントル外層が剥ぎ取られたと考えられています。',
        },
        {
          name: '液体金属外核 (Liquid Fe-Ni-S Outer Core)',
          outerRadiusRatio: 0.82,
          color: '#f59e0b',
          detail: '半径約2,020km（惑星半径の約83%）に及ぶ巨大な溶融鉄・ニッケル・硫黄層。対流により固有磁場を発生。',
        },
        {
          name: '固体金属内核 (Solid Inner Core)',
          outerRadiusRatio: 0.44,
          color: '#fef08a',
          detail: '半径約1,000kmの中心部にある高密度固体鉄・ニッケルコア。',
        },
      ],
    },
    moons: [],
  },
  {
    id: 'venus',
    nameJa: '金星',
    nameEn: 'Venus',
    symbol: '♀',
    bodyClass: 'planet',
    subGroup: 'inner_planet',
    homeZone: 'inner',
    category: '内惑星 / 地球型惑星（岩石惑星）',
    semiMajorAxisAu: 0.7233,
    eccentricity: 0.0068,
    inclinationDeg: 3.39,
    orbitalPeriodDays: 224.701,
    rotationPeriodHours: -5832.5,
    meanLongitudeDeg: 181.98,
    perihelionLongitudeDeg: 131.53,
    ascendingNodeLongitudeDeg: 76.68,
    scaleConfig: {
      orbitRadiusPx: { inner: 150, outer: 44, tno: 19 },
      bodySizePx: { inner: 7.8, outer: 2.8, tno: 1.4 },
      isPrimaryInZone: { inner: true, outer: false, tno: false },
      isVisibleInZone: { inner: true, outer: true, tno: true },
    },
    color: '#f5d08a',
    accentColor: '#c98a3b',
    orbitColor: 'rgba(245, 208, 138, 0.5)',
    orbitStyle: 'solid',
    diameterKm: 12104,
    orbitalSpeedKms: 35.02,
    temperatureInfo: '平均 約470℃',
    description:
      '地球とほぼ同じ大きさ・密度を持つ岩石惑星です。地球と同様に厚さ約2,800kmの「ケイ酸塩マントル」と鉄・ニッケル中心核を持ちますが、プレートテクトニクス（プレートの沈み込み）が存在せず、単一の硬い地殻の下でマントルプルームが熱を蓄えて大規模な火山活動を引き起こしています。',
    interiorStructure: {
      summary: '単一地殻（スタグナント・リッド）＋ ケイ酸塩マントル ＋ 鉄ニッケル核',
      layers: [
        {
          name: '玄武岩質地殻 (Basaltic Crust)',
          outerRadiusRatio: 1.0,
          color: '#fcd34d',
          detail: '厚さ約20〜50km。プレート運動のない単一のリソスフェア（固定蓋構造）が全球を覆う。',
        },
        {
          name: 'ケイ酸塩マントル (Silicate Mantle)',
          outerRadiusRatio: 0.94,
          color: '#d97706',
          detail: '厚さ約2,800kmの高温岩石マントル。マントルプルームの上昇によりコロナ地形や火山噴火を駆動。',
        },
        {
          name: '金属中心核 (Fe-Ni Core)',
          outerRadiusRatio: 0.52,
          color: '#fef08a',
          detail: '半径約3,100kmの鉄・ニッケル中心核（一部溶融）。プレート沈み込みによる冷却がないため核対流が弱く、固有磁場を持たない。',
        },
      ],
    },
    moons: [],
  },
  {
    id: 'earth',
    nameJa: '地球',
    nameEn: 'Earth',
    symbol: '⊕',
    bodyClass: 'planet',
    subGroup: 'inner_planet',
    homeZone: 'inner',
    category: '内惑星 / 地球型惑星（岩石惑星）',
    semiMajorAxisAu: 1.000,
    eccentricity: 0.0167,
    inclinationDeg: 0.0,
    orbitalPeriodDays: 365.256,
    rotationPeriodHours: 23.93,
    meanLongitudeDeg: 100.46,
    perihelionLongitudeDeg: 102.95,
    ascendingNodeLongitudeDeg: 0.0,
    scaleConfig: {
      orbitRadiusPx: { inner: 235, outer: 66, tno: 27 },
      bodySizePx: { inner: 8.6, outer: 3.2, tno: 1.6 },
      isPrimaryInZone: { inner: true, outer: false, tno: false },
      isVisibleInZone: { inner: true, outer: true, tno: true },
    },
    color: '#4facfe',
    accentColor: '#1b6ca8',
    orbitColor: 'rgba(79, 172, 254, 0.55)',
    orbitStyle: 'solid',
    diameterKm: 12756,
    orbitalSpeedKms: 29.78,
    temperatureInfo: '平均 約15℃',
    description:
      '太陽系で唯一活発なプレートテクトニクスと液体の海を持つ岩石惑星です。内部はかんらん岩主体の「上部マントル（深さ約660kmまで）」と高圧鉱物ブリッジマナイト主体の「下部マントル（深さ2,890kmまで）」に分かれ、その対流が大陸移動と火山活動を駆動しています。',
    interiorStructure: {
      summary: '地殻 ＋ 上部・下部ケイ酸塩マントル ＋ 液体外核 ＋ 固体内核',
      layers: [
        {
          name: '地殻・リソスフェア (Crust)',
          outerRadiusRatio: 1.0,
          color: '#38bdf8',
          detail: '厚さ約5〜70km（海洋地殻・大陸地殻）。複数のプレートに分かれて移動・沈み込みを行う。',
        },
        {
          name: '上部マントル (Upper Mantle)',
          outerRadiusRatio: 0.95,
          color: '#f97316',
          detail: '深さ約40〜660km。かんらん岩（オリビン・輝石）主体で、流動性を持つアセノスフェアがプレートを動かす。',
        },
        {
          name: '下部マントル (Lower Mantle)',
          outerRadiusRatio: 0.84,
          color: '#dc2626',
          detail: '深さ660〜2,890km（地球体積の約55%）。高圧ケイ酸塩ペロブスカイト（ブリッジマナイト）主体の高温固体マントル。',
        },
        {
          name: '液体金属外核 (Liquid Outer Core)',
          outerRadiusRatio: 0.54,
          color: '#fbbf24',
          detail: '深さ2,890〜5,150km。溶融した鉄・ニッケルが対流し、ダイナモ作用によって強力な地磁気（磁気圏）を生成。',
        },
        {
          name: '固体金属内核 (Solid Inner Core)',
          outerRadiusRatio: 0.22,
          color: '#fef9c3',
          detail: '半径約1,220km（約360万気圧・約5,500℃）の超高圧固体鉄・ニッケルコア。',
        },
      ],
    },
    moons: [
      {
        id: 'moon',
        nameJa: '月',
        nameEn: 'Moon',
        orbitalPeriodDays: 27.322,
        distanceKm: 384400,
        orbitRadiusPx: 25,
        sizePx: 2.7,
        color: '#e2e8f0',
        initialAngleDeg: 218.3,
        diameterKm: 3474,
        description:
          '地球唯一の自然衛星。潮汐ロックにより常に同じ面を地球に向けて公転しています。',
      },
    ],
  },
  {
    id: 'mars',
    nameJa: '火星',
    nameEn: 'Mars',
    symbol: '♂',
    bodyClass: 'planet',
    subGroup: 'inner_planet',
    homeZone: 'inner',
    category: '内惑星 / 地球型惑星（岩石惑星）',
    semiMajorAxisAu: 1.5237,
    eccentricity: 0.0934,
    inclinationDeg: 1.85,
    orbitalPeriodDays: 686.980,
    rotationPeriodHours: 24.62,
    meanLongitudeDeg: 355.45,
    perihelionLongitudeDeg: 336.04,
    ascendingNodeLongitudeDeg: 49.56,
    scaleConfig: {
      orbitRadiusPx: { inner: 335, outer: 92, tno: 36 },
      bodySizePx: { inner: 7.0, outer: 2.6, tno: 1.4 },
      isPrimaryInZone: { inner: true, outer: false, tno: false },
      isVisibleInZone: { inner: true, outer: true, tno: true },
    },
    color: '#ff6b4a',
    accentColor: '#a8321e',
    orbitColor: 'rgba(255, 107, 74, 0.52)',
    orbitStyle: 'solid',
    diameterKm: 6792,
    orbitalSpeedKms: 24.07,
    temperatureInfo: '-140℃ 〜 +20℃',
    description:
      '地球型惑星の最外周を公転する赤い惑星です。NASA探査機インサイトの火震（地震波）観測により、厚さ約40〜80kmの玄武岩質地殻の下に、酸化鉄（FeO）に富む厚さ約1,500kmの「ケイ酸塩マントル」と、硫黄などの軽元素を含む半径約1,830kmの液体金属核が存在することが判明しました。',
    interiorStructure: {
      summary: '厚い玄武岩質地殻 ＋ 酸化鉄に富むケイ酸塩マントル ＋ 液体金属核',
      layers: [
        {
          name: '玄武岩質地殻 (Basaltic Crust)',
          outerRadiusRatio: 1.0,
          color: '#fb7185',
          detail: '厚さ約40〜80km。プレート移動がないため、同じマントルホットスポット上にオリンポス山などの超巨大火山が形成された。',
        },
        {
          name: 'ケイ酸塩マントル (Iron-rich Silicate Mantle)',
          outerRadiusRatio: 0.92,
          color: '#ea580c',
          detail: '厚さ約1,500km。地球のマントルに比べて酸化鉄（FeO）を約2倍多く含む岩石マントル。最下部には溶融ケイ酸塩層が存在。',
        },
        {
          name: '液体金属核 (Liquid Fe-Ni-S Core)',
          outerRadiusRatio: 0.54,
          color: '#fde047',
          detail: '半径約1,830km。鉄・ニッケルに硫黄・酸素・炭素などの軽元素が多く溶け込んだ全液体コア。',
        },
      ],
    },
    moons: [
      {
        id: 'phobos',
        nameJa: 'フォボス',
        nameEn: 'Phobos',
        orbitalPeriodDays: 0.319,
        distanceKm: 9376,
        orbitRadiusPx: 18,
        sizePx: 2.0,
        color: '#d6c3b3',
        initialAngleDeg: 45.0,
        diameterKm: 22.2,
        description: '火星の内側を約7時間39分という超短周期で公転する衛星です。',
      },
      {
        id: 'deimos',
        nameJa: 'ダイモス',
        nameEn: 'Deimos',
        orbitalPeriodDays: 1.263,
        distanceKm: 23463,
        orbitRadiusPx: 28,
        sizePx: 1.8,
        color: '#b8a99a',
        initialAngleDeg: 190.0,
        diameterKm: 12.6,
        description: '火星の外側を約30.3時間で公転する小さな衛星です。',
      },
    ],
  },

  // ==================== 2. 準惑星：小惑星ケレス (Ceres) ====================
  {
    id: 'ceres',
    nameJa: 'ケレス',
    nameEn: 'Ceres',
    symbol: '⚳',
    bodyClass: 'dwarf_planet',
    subGroup: 'asteroid_dwarf',
    homeZone: 'inner',
    category: 'IAU公認 準惑星（小惑星帯 / メインベルト最大天体）',
    semiMajorAxisAu: 2.7675,
    eccentricity: 0.0758,
    inclinationDeg: 10.59,
    orbitalPeriodDays: 1681.63,
    rotationPeriodHours: 9.07,
    meanLongitudeDeg: 153.89,
    perihelionLongitudeDeg: 154.79,
    ascendingNodeLongitudeDeg: 80.33,
    scaleConfig: {
      orbitRadiusPx: { inner: 435, outer: 122, tno: 46 },
      bodySizePx: { inner: 5.8, outer: 4.2, tno: 1.5 },
      isPrimaryInZone: { inner: true, outer: true, tno: false },
      isVisibleInZone: { inner: true, outer: true, tno: true },
    },
    color: '#b8ad90',
    accentColor: '#474236',
    orbitColor: 'rgba(184, 173, 144, 0.68)',
    orbitStyle: 'dashed',
    diameterKm: 939.4,
    orbitalSpeedKms: 17.90,
    temperatureInfo: '平均 約-105℃ (最大 -38℃)',
    description:
      '小惑星帯最大の天体であり、内太陽系で唯一のIAU公認「準惑星」です。探査機ドーンの擬似カラー観測により、黄갈色〜灰褐色のクレーターだらけの地表の中央付近に、青みを帯びた放出物（イジェクタ）に囲まれた「オッカトル・クレーター」と、地下の塩水だまり（ブライン）が湧出して形成された青白く輝く炭酸ナトリウム塩ドーム（ケレアリア白斑・ヴィナリア白斑群）や氷火山「アフナ山」などの活発な氷火山・水蒸気昇華活動が確認されました。',
    interiorStructure: {
      summary: '炭酸塩・粘土鉱物地殻 ＋ 氷・塩水（ブライン）マントル ＋ 含水岩石コア',
      layers: [
        {
          name: '炭酸塩・粘土鉱物地殻 (Volatile-rich Clay & Carbonate Crust)',
          outerRadiusRatio: 1.0,
          color: '#b8ad90',
          detail: '厚さ約40km。アンモニウム粘土・炭酸ナトリウム塩・氷からなる外殻。オッカトル・クレーター等に青白い塩類輝点が露出。',
        },
        {
          name: '氷・塩水マントル (Muddy Ice & Brine Mantle)',
          outerRadiusRatio: 0.90,
          color: '#38bdf8',
          detail: '厚さ約60〜100km。水氷・水和鉱物・凍らない高濃度塩水（ブライン）ポケットを含む層。氷火山活動の供給源。',
        },
        {
          name: '含水ケイ酸塩岩石コア (Hydrated Rocky Core)',
          outerRadiusRatio: 0.70,
          color: '#64748b',
          detail: '半径約330km。蛇紋石などの含水ケイ酸塩鉱物を主体とする多孔質・圧密岩石コア。',
        },
      ],
    },
    moons: [],
  },

  // ==================== 3. 外惑星領域 (Outer Planets) ====================
  {
    id: 'jupiter',
    nameJa: '木星',
    nameEn: 'Jupiter',
    symbol: '♃',
    bodyClass: 'planet',
    subGroup: 'outer_planet',
    homeZone: 'outer',
    category: '外惑星 / 木星型惑星（巨大ガス惑星）',
    semiMajorAxisAu: 5.2034,
    eccentricity: 0.0489,
    inclinationDeg: 1.31,
    orbitalPeriodDays: 4332.589,
    rotationPeriodHours: 9.93,
    meanLongitudeDeg: 34.40,
    perihelionLongitudeDeg: 14.75,
    ascendingNodeLongitudeDeg: 100.46,
    scaleConfig: {
      orbitRadiusPx: { inner: 540, outer: 202, tno: 76 },
      bodySizePx: { inner: 14.5, outer: 12.2, tno: 3.8 },
      isPrimaryInZone: { inner: true, outer: true, tno: false },
      isVisibleInZone: { inner: true, outer: true, tno: true },
    },
    color: '#e8b382',
    accentColor: '#b56e3d',
    orbitColor: 'rgba(232, 179, 130, 0.55)',
    orbitStyle: 'solid',
    hasRings: true,
    ringColor: 'rgba(251, 191, 36, 0.85)',
    ringSystem: {
      labelJa: '木星の環（ハロ環・主環・ゴッサマー環 / ケイ酸塩微粒子ダスト環）',
      tiltDeg: -12,
      aspectRatio: 0.36,
      bands: [
        { name: 'ハロ環 (内側の厚いドーナツ状環)', radiusMultiplier: 1.38, strokeWidthPx: 2.2, color: '#fbbf24', opacity: 0.48 },
        { name: '主環 (メティス・アドラステア起源の明瞭環)', radiusMultiplier: 1.66, strokeWidthPx: 2.2, color: '#fde68a', opacity: 0.92 },
        { name: 'ゴッサマー環 (アマルテア・テーベ希薄環)', radiusMultiplier: 1.94, strokeWidthPx: 2.5, color: '#f59e0b', opacity: 0.58, dashArray: '6 3' },
      ],
    },
    diameterKm: 142984,
    orbitalSpeedKms: 13.07,
    temperatureInfo: '雲頂 約-110℃',
    description:
      '太陽系最大の巨大ガス惑星です。明確な固体の地表を持たず、分子状水素の外層の下には超高圧で水素が導電性の金属状態となった広大な「液体金属水素マントル」が広がり、太陽系最強の磁場を生み出しています。中心部は探査機ジュノーによって岩石・氷が金属水素と混ざり合う「希釈コア（Fuzzy Core）」であることが判明しました。',
    interiorStructure: {
      summary: '分子状水素外層 ＋ 液体金属水素マントル ＋ 希釈岩石・氷コア',
      layers: [
        {
          name: '雲層・分子状水素ヘリウム層 (Molecular H₂/He Layer)',
          outerRadiusRatio: 1.0,
          color: '#e8b382',
          detail: '深さ約15,000kmまで続く気体〜超臨界流体水素・ヘリウム層。深部ほど圧力で液体状へ連続的に遷移。',
        },
        {
          name: '液体金属水素マントル (Liquid Metallic Hydrogen Mantle)',
          outerRadiusRatio: 0.78,
          color: '#f59e0b',
          detail: '半径の約78%を占める巨大マントル層。約200万気圧以上の超高圧で電子が自由移動する金属水素が対流し、強大な磁気圏を形成。',
        },
        {
          name: '希釈中心核 / ファジーコア (Dilute Rock-Ice Core)',
          outerRadiusRatio: 0.36,
          color: '#fef08a',
          detail: '惑星半径の約30〜50%に広がり、重元素（岩石・金属・氷）と液体金属水素が明確な境界なしに溶け合う中心核。',
        },
      ],
    },
    moons: [
      {
        id: 'io',
        nameJa: 'イオ',
        nameEn: 'Io',
        orbitalPeriodDays: 1.769,
        distanceKm: 421700,
        orbitRadiusPx: 30,
        sizePx: 2.0,
        color: '#fde047',
        initialAngleDeg: 10.0,
        diameterKm: 3643,
        description: 'ガリレオ衛星の最内周。潮汐加熱により太陽系で最も活発な火山活動を持ちます。',
      },
      {
        id: 'europa',
        nameJa: 'エウロパ',
        nameEn: 'Europa',
        orbitalPeriodDays: 3.551,
        distanceKm: 671034,
        orbitRadiusPx: 38,
        sizePx: 1.9,
        color: '#f8fafc',
        initialAngleDeg: 115.0,
        diameterKm: 3122,
        description: '氷の地殻の下に広大な内部海が存在すると考えられている氷衛星です。',
      },
      {
        id: 'ganymede',
        nameJa: 'ガニメデ',
        nameEn: 'Ganymede',
        orbitalPeriodDays: 7.155,
        distanceKm: 1070412,
        orbitRadiusPx: 46,
        sizePx: 2.5,
        color: '#cbd5e1',
        initialAngleDeg: 220.0,
        diameterKm: 5268,
        description: '太陽系最大の衛星で、惑星である水星よりも大きな直径と固有磁場を持ちます。',
      },
      {
        id: 'callisto',
        nameJa: 'カリスト',
        nameEn: 'Callisto',
        orbitalPeriodDays: 16.689,
        distanceKm: 1882709,
        orbitRadiusPx: 55,
        sizePx: 2.3,
        color: '#94a3b8',
        initialAngleDeg: 310.0,
        diameterKm: 4821,
        description: 'ガリレオ衛星の最外周を回る、古いクレーター地形が残る大型衛星です。',
      },
    ],
  },
  {
    id: 'saturn',
    nameJa: '土星',
    nameEn: 'Saturn',
    symbol: '♄',
    bodyClass: 'planet',
    subGroup: 'outer_planet',
    homeZone: 'outer',
    category: '外惑星 / 木星型惑星（巨大ガス惑星）',
    semiMajorAxisAu: 9.5371,
    eccentricity: 0.0565,
    inclinationDeg: 2.49,
    orbitalPeriodDays: 10759.22,
    rotationPeriodHours: 10.7,
    meanLongitudeDeg: 49.94,
    perihelionLongitudeDeg: 92.43,
    ascendingNodeLongitudeDeg: 113.67,
    scaleConfig: {
      orbitRadiusPx: { inner: 920, outer: 308, tno: 112 },
      bodySizePx: { inner: 11.2, outer: 11.0, tno: 3.5 },
      isPrimaryInZone: { inner: false, outer: true, tno: false },
      isVisibleInZone: { inner: false, outer: true, tno: true },
    },
    color: '#f3d692',
    accentColor: '#c49d48',
    orbitColor: 'rgba(243, 214, 146, 0.5)',
    orbitStyle: 'solid',
    hasRings: true,
    ringColor: 'rgba(254, 240, 138, 0.95)',
    ringSystem: {
      labelJa: '土星の環（C環・B環・カッシーニの間隙・A環・F環 / 太陽系最大の多重氷環）',
      tiltDeg: -22,
      aspectRatio: 0.38,
      bands: [
        { name: 'C環 (内側の半透明クレープ環)', radiusMultiplier: 1.42, strokeWidthPx: 2.0, color: '#d97706', opacity: 0.62 },
        { name: 'B環 (最も明るく高密度な主環)', radiusMultiplier: 1.78, strokeWidthPx: 4.0, color: '#fef08a', opacity: 0.98 },
        { name: 'A環 (カッシーニの間隙の外側にある明瞭環)', radiusMultiplier: 2.22, strokeWidthPx: 2.8, color: '#fde047', opacity: 0.90 },
        { name: 'F環 (羊飼い衛星に守られた最外周の細環)', radiusMultiplier: 2.48, strokeWidthPx: 1.2, color: '#fef9c3', opacity: 0.82 },
      ],
    },
    diameterKm: 120536,
    orbitalSpeedKms: 9.68,
    temperatureInfo: '雲頂 約-140℃',
    description:
      '太陽系で最も壮麗な多重氷環を持つ巨大ガス惑星で、平均密度は水より低い 0.69 g/cm³ です。厚い分子状水素層の下に「液体金属水素マントル」が存在し、その境界領域では冷えたヘリウムが液滴となって沈降する「ヘリウムの雨」が降り注いで内部熱と磁場を生み出しています。',
    interiorStructure: {
      summary: '厚い分子状水素層 ＋ ヘリウムの雨が降る液体金属水素マントル ＋ 岩石・氷コア',
      layers: [
        {
          name: '分子状水素・ヘリウム外層 (Molecular H₂/He Envelope)',
          outerRadiusRatio: 1.0,
          color: '#f3d692',
          detail: '深さ約25,000〜30,000kmまで続く厚い液体・気体水素外層（木星より重力が弱いため分子状層が厚い）。',
        },
        {
          name: '液体金属水素マントル (Metallic Hydrogen & Helium Rain Mantle)',
          outerRadiusRatio: 0.62,
          color: '#d97706',
          detail: '超高圧の液体金属水素マントル。水素から分離したヘリウムが液滴となって沈降する「ヘリウムの雨」が摩擦熱を発生。',
        },
        {
          name: '岩石・氷中心核 (Rocky / Icy Core)',
          outerRadiusRatio: 0.28,
          color: '#fde047',
          detail: '地球質量の約9〜22倍のケイ酸塩岩石・鉄・氷からなる高密度コア（カッシーニ探査機の重力・リング地震学により周辺との混合構造も確認）。',
        },
      ],
    },
    moons: [
      {
        id: 'enceladus',
        nameJa: 'エンケラドゥス',
        nameEn: 'Enceladus',
        orbitalPeriodDays: 1.370,
        distanceKm: 238020,
        orbitRadiusPx: 33,
        sizePx: 1.7,
        color: '#ffffff',
        initialAngleDeg: 40.0,
        diameterKm: 504,
        description: '南極付近から水蒸気や氷粒子を噴出してE環を形成しており、内部海が確認されている氷衛星です。',
      },
      {
        id: 'rhea',
        nameJa: 'レア',
        nameEn: 'Rhea',
        orbitalPeriodDays: 4.518,
        distanceKm: 527108,
        orbitRadiusPx: 41,
        sizePx: 1.9,
        color: '#d1d5db',
        initialAngleDeg: 140.0,
        diameterKm: 1527,
        description: '土星で2番目に大きな氷衛星です。',
      },
      {
        id: 'titan',
        nameJa: 'タイタン',
        nameEn: 'Titan',
        orbitalPeriodDays: 15.945,
        distanceKm: 1221870,
        orbitRadiusPx: 50,
        sizePx: 2.6,
        color: '#f59e0b',
        initialAngleDeg: 260.0,
        diameterKm: 5149,
        description: '土星最大の衛星で、濃厚な窒素大気と液体メタンの湖・降雨サイクルを持ちます。',
      },
    ],
  },
  {
    id: 'uranus',
    nameJa: '天王星',
    nameEn: 'Uranus',
    symbol: '♅',
    bodyClass: 'planet',
    subGroup: 'outer_planet',
    homeZone: 'outer',
    category: '外惑星 / 天王星型惑星（巨大氷惑星）',
    semiMajorAxisAu: 19.1913,
    eccentricity: 0.0457,
    inclinationDeg: 0.77,
    orbitalPeriodDays: 30685.4,
    rotationPeriodHours: -17.24,
    meanLongitudeDeg: 313.23,
    perihelionLongitudeDeg: 170.96,
    ascendingNodeLongitudeDeg: 74.01,
    scaleConfig: {
      orbitRadiusPx: { inner: 1080, outer: 402, tno: 152 },
      bodySizePx: { inner: 9.5, outer: 9.2, tno: 3.4 },
      isPrimaryInZone: { inner: false, outer: true, tno: false },
      isVisibleInZone: { inner: false, outer: true, tno: true },
    },
    color: '#7de2fc',
    accentColor: '#2ba6cb',
    orbitColor: 'rgba(125, 226, 252, 0.48)',
    orbitStyle: 'solid',
    hasRings: true,
    ringColor: 'rgba(103, 232, 249, 0.92)',
    ringSystem: {
      labelJa: '天王星の環（13本の細い環・明るいε環 / 自転軸98°傾斜による縦向きの環）',
      tiltDeg: 76,
      aspectRatio: 0.36,
      bands: [
        { name: '内側の狭環群 (6・5・4・α・β・η・γ・δ環)', radiusMultiplier: 1.52, strokeWidthPx: 1.8, color: '#38bdf8', opacity: 0.72 },
        { name: 'ε(イプシロン)環 (最も明るく高密度な主環)', radiusMultiplier: 1.86, strokeWidthPx: 2.5, color: '#cffafe', opacity: 0.96 },
        { name: '外側のダスト環 (μ・ν環)', radiusMultiplier: 2.16, strokeWidthPx: 1.6, color: '#06b6d4', opacity: 0.62, dashArray: '5 3' },
      ],
    },
    diameterKm: 51118,
    orbitalSpeedKms: 6.80,
    temperatureInfo: '雲頂 約-195℃',
    description:
      '自転軸が約98度傾き、環と主要衛星も横倒しの赤道面を公転する巨大氷惑星です。内部は木星・土星のような金属水素ではなく、惑星質量の約80%を占める高温高圧の「水・アンモニア・メタンの氷マントル（超イオン氷・導電性流体層）」が中心の岩石コアを取り囲んでいます。',
    interiorStructure: {
      summary: '水素・メタン大気層 ＋ 高温高圧の「水・アンモニア・メタン氷（超イオン水）」マントル ＋ 岩石コア',
      layers: [
        {
          name: '水素・ヘリウム・メタン大気外層 (H₂/He/CH₄ Atmosphere)',
          outerRadiusRatio: 1.0,
          color: '#7de2fc',
          detail: '半径の約20%（厚さ約5,000km）を占める大気外層。メタンが赤色光を吸収し青緑色を呈する。',
        },
        {
          name: '高温高圧の氷・超イオン水マントル (Icy Fluid / Superionic Mantle)',
          outerRadiusRatio: 0.80,
          color: '#0284c7',
          detail: '半径の約80%を占める主マントル。水・アンモニア・メタンが数千℃・数十万気圧下で導電性の超臨界流体および「超イオン氷」として存在し、大きく傾いた多極子磁場を生む。',
        },
        {
          name: 'ケイ酸塩・鉄ニッケル中心核 (Rocky Core)',
          outerRadiusRatio: 0.22,
          color: '#94a3b8',
          detail: '半径約5,000km（地球質量の約0.5〜1.5倍）の高密度ケイ酸塩岩石・金属コア。',
        },
      ],
    },
    moons: [
      {
        id: 'miranda',
        nameJa: 'ミランダ',
        nameEn: 'Miranda',
        orbitalPeriodDays: 1.413,
        distanceKm: 129390,
        orbitRadiusPx: 25,
        sizePx: 1.6,
        color: '#e2e8f0',
        initialAngleDeg: 75.0,
        diameterKm: 471,
        description: '高さ20kmのヴェローナ断崖など、激しい地殻変動の痕跡を持つ衛星です。',
      },
      {
        id: 'titania',
        nameJa: 'チタニア',
        nameEn: 'Titania',
        orbitalPeriodDays: 8.706,
        distanceKm: 435910,
        orbitRadiusPx: 33,
        sizePx: 2.1,
        color: '#cbd5e1',
        initialAngleDeg: 185.0,
        diameterKm: 1578,
        description: '天王星最大の氷衛星で、長大な断層谷が走っています。',
      },
      {
        id: 'oberon',
        nameJa: 'オベロン',
        nameEn: 'Oberon',
        orbitalPeriodDays: 13.463,
        distanceKm: 583520,
        orbitRadiusPx: 41,
        sizePx: 2.0,
        color: '#94a3b8',
        initialAngleDeg: 295.0,
        diameterKm: 1522,
        description: '天王星の主衛星群の最も外側を公転する大型氷衛星です。',
      },
    ],
  },
  {
    id: 'neptune',
    nameJa: '海王星',
    nameEn: 'Neptune',
    symbol: '♆',
    bodyClass: 'planet',
    subGroup: 'outer_planet',
    homeZone: 'outer',
    category: '外惑星 / 天王星型惑星（巨大氷惑星）',
    semiMajorAxisAu: 30.0690,
    eccentricity: 0.0113,
    inclinationDeg: 1.77,
    orbitalPeriodDays: 60189.0,
    rotationPeriodHours: 16.11,
    meanLongitudeDeg: 304.88,
    perihelionLongitudeDeg: 44.97,
    ascendingNodeLongitudeDeg: 131.78,
    scaleConfig: {
      orbitRadiusPx: { inner: 1240, outer: 482, tno: 205 },
      bodySizePx: { inner: 9.5, outer: 9.0, tno: 9.4 },
      isPrimaryInZone: { inner: false, outer: true, tno: true },
      isVisibleInZone: { inner: false, outer: true, tno: true },
    },
    color: '#4b7bec',
    accentColor: '#1e3799',
    orbitColor: 'rgba(75, 123, 236, 0.58)',
    orbitStyle: 'solid',
    hasRings: true,
    ringColor: 'rgba(147, 197, 253, 0.92)',
    ringSystem: {
      labelJa: '海王星の環（ガレ環・ルヴェリエ環・アダムズ環と4つの「リング・アーク」凝集構造）',
      tiltDeg: -26,
      aspectRatio: 0.37,
      bands: [
        { name: 'ガレ環・ルヴェリエ環 (内側のダスト環)', radiusMultiplier: 1.48, strokeWidthPx: 1.8, color: '#60a5fa', opacity: 0.62 },
        { name: 'アダムズ環 (外周の連続環)', radiusMultiplier: 1.86, strokeWidthPx: 1.5, color: '#93c5fd', opacity: 0.68 },
        { name: 'アダムズ環 リング・アーク (リベルテ・エガリテ・フラテルニテ・クラージュ)', radiusMultiplier: 1.86, strokeWidthPx: 3.2, color: '#e0f2fe', opacity: 0.98, dashArray: '9 14' },
      ],
    },
    diameterKm: 49528,
    orbitalSpeedKms: 5.43,
    temperatureInfo: '雲頂 約-200℃',
    description:
      '8惑星の最外周を公転する巨大氷惑星で、アダムズ環の「リング・アーク」を持ちます。内部は活発な対流と強い内部熱源を持つ「水・アンモニア・メタンの高温高圧氷マントル（超イオン氷層）」が大部分を占め、深部ではメタンが分解して結晶化した「ダイヤモンドの雨」が岩石コアへ向かって降り注いでいると考えられています。',
    interiorStructure: {
      summary: '水素・メタン大気層 ＋ 対流する超イオン氷マントル（ダイヤモンドの雨）＋ 岩石コア',
      layers: [
        {
          name: '水素・ヘリウム・メタン大気外層 (Atmosphere)',
          outerRadiusRatio: 1.0,
          color: '#60a5fa',
          detail: '半径の約15〜20%を占める外層大気。マントルからの強い内部熱放出により太陽系最速（秒速600m級）の嵐が吹く。',
        },
        {
          name: '超イオン氷・流体マントル (Water-Ammonia-Methane Icy Mantle)',
          outerRadiusRatio: 0.82,
          color: '#1d4ed8',
          detail: '高温高圧（2,000〜5,000℃）の水・アンモニア・メタンからなる導電性氷マントル。深部ではメタンから分離した炭素が「ダイヤモンドの雨」となって沈降。',
        },
        {
          name: 'ケイ酸塩・金属中心核 (Rocky / Metallic Core)',
          outerRadiusRatio: 0.25,
          color: '#cbd5e1',
          detail: '地球質量の約1.2倍に相当するケイ酸塩岩石・鉄ニッケル中心核。',
        },
      ],
    },
    moons: [
      {
        id: 'proteus',
        nameJa: 'プロテウス',
        nameEn: 'Proteus',
        orbitalPeriodDays: 1.122,
        distanceKm: 117647,
        orbitRadiusPx: 23,
        sizePx: 1.5,
        color: '#94a3b8',
        initialAngleDeg: 120.0,
        diameterKm: 420,
        description: '海王星で2番目に大きな不規則形状の衛星です。',
      },
      {
        id: 'triton',
        nameJa: 'トリトン',
        nameEn: 'Triton',
        orbitalPeriodDays: -5.877,
        distanceKm: 354759,
        orbitRadiusPx: 32,
        sizePx: 2.2,
        color: '#bae6fd',
        initialAngleDeg: 240.0,
        diameterKm: 2706,
        description:
          '海王星最大の衛星。逆行軌道を持ち、カイパーベルトから捕獲された準惑星級の天体と考えられています。',
      },
    ],
  },

  // ==================== 4. 外縁天体 (TNO)：IAU公認 冥王星型天体 & 準惑星候補 ====================
  {
    id: 'orcus',
    nameJa: 'オルクス',
    nameEn: 'Orcus',
    symbol: '🝿',
    bodyClass: 'dwarf_candidate',
    subGroup: 'tno_candidate',
    homeZone: 'tno',
    category: '準惑星候補 / 外縁天体（冥王星族・Plutino）',
    semiMajorAxisAu: 39.174,
    eccentricity: 0.2270,
    inclinationDeg: 20.59,
    orbitalPeriodDays: 89552.0,
    rotationPeriodHours: 13.19,
    meanLongitudeDeg: 106.50,
    perihelionLongitudeDeg: 268.80,
    ascendingNodeLongitudeDeg: 268.72,
    scaleConfig: {
      orbitRadiusPx: { inner: 1340, outer: 660, tno: 255 },
      bodySizePx: { inner: 4.5, outer: 4.2, tno: 5.0 },
      isPrimaryInZone: { inner: false, outer: false, tno: true },
      isVisibleInZone: { inner: false, outer: false, tno: true },
    },
    color: '#99f6e4',
    accentColor: '#0d9488',
    orbitColor: 'rgba(153, 246, 228, 0.55)',
    orbitStyle: 'dotted',
    diameterKm: 910,
    orbitalSpeedKms: 4.68,
    temperatureInfo: '平均 約-229℃',
    description:
      '海王星と2:3の軌道共鳴関係にある「冥王星族（Plutino）」の準惑星候補天体です。近日点の向きと公転位相が冥王星と正反対なため「アンチ・プルート（反冥王星）」と呼ばれます。大型の衛星ヴァンスを従えています。',
    interiorStructure: {
      summary: '水氷・アンモニア水和物地殻 ＋ 対流氷マントル ＋ ケイ酸塩岩石コア',
      layers: [
        {
          name: '結晶質水氷・アンモニア水和物地殻',
          outerRadiusRatio: 1.0,
          color: '#cbd5e1',
          detail:
            'アンモニア水和物（NH₃·H₂O）と結晶質水氷が検出されており、不凍液効果による過去または現在の氷火山（クリオボルカニズム）の存在が示唆されています。',
        },
        {
          name: '水氷・内部海マントル候補',
          outerRadiusRatio: 0.82,
          color: '#67e8f9',
          detail:
            'アンモニアが混入した融点の低い水氷マントル。衛星ヴァンスとの相互潮汐作用により、過去に内部液体層が存在した可能性があります。',
        },
        {
          name: '高密度ケイ酸塩岩石コア',
          outerRadiusRatio: 0.6,
          color: '#475569',
          detail:
            '半径約300kmの岩石質中心核。天体全体の約半分以上の体積と質量の約70%を占める高密度コアです。',
        },
      ],
    },
    moons: [
      {
        id: 'vanth',
        nameJa: 'ヴァンス',
        nameEn: 'Vanth',
        orbitalPeriodDays: 9.539,
        distanceKm: 8980,
        orbitRadiusPx: 14,
        sizePx: 2.0,
        color: '#cbd5e1',
        initialAngleDeg: 85.0,
        diameterKm: 443,
        description:
          'オルクスの半分近い直径（約443 km）を持つ大型衛星。主星と衛星の質量比が非常に大きい二重天体系です。',
      },
    ],
  },
  {
    id: 'pluto',
    nameJa: '冥王星',
    nameEn: 'Pluto',
    symbol: '♇',
    bodyClass: 'dwarf_planet',
    subGroup: 'plutoid',
    homeZone: 'tno',
    category: 'IAU公認 準惑星（冥王星型天体 / 冥王星族）',
    semiMajorAxisAu: 39.4821,
    eccentricity: 0.2488,
    inclinationDeg: 17.16,
    orbitalPeriodDays: 90560.0,
    rotationPeriodHours: -153.29,
    meanLongitudeDeg: 238.93,
    perihelionLongitudeDeg: 224.07,
    ascendingNodeLongitudeDeg: 110.30,
    scaleConfig: {
      orbitRadiusPx: { inner: 1400, outer: 542, tno: 295 },
      bodySizePx: { inner: 5.5, outer: 6.0, tno: 6.4 },
      isPrimaryInZone: { inner: false, outer: true, tno: true },
      isVisibleInZone: { inner: false, outer: true, tno: true },
    },
    color: '#e5bfa0',
    accentColor: '#5c2818',
    orbitColor: 'rgba(229, 191, 160, 0.72)',
    orbitStyle: 'dashed',
    diameterKm: 2376.6,
    orbitalSpeedKms: 4.67,
    temperatureInfo: '平均 約-229℃',
    description:
      '冥王星型天体（プルートイド）の代表天体です。探査機ニュー・ホライズンズの観測により、温かみのある黄갈色〜淡い桃白色の地表に広がる巨大なハート形の明るい地形「トンボー領域（西側の滑らかな窒素氷河盆地スプートニク平原）」と、左下側の暗赤褐色ソリン地帯「クトゥルフ領域」が確認されました。硬い水氷地殻の下には液体の内部地下海を伴う「水氷マントル」と、半径の約72%を占める巨大な「含水ケイ酸塩岩石コア」が存在します。',
    interiorStructure: {
      summary: 'ハート形窒素氷河・水氷地殻 ＋ 内部地下海を伴う水氷マントル ＋ 巨大含水岩石コア',
      layers: [
        {
          name: 'トンボー領域（ハート形窒素氷河）＆ 水氷地殻 (N₂/CH₄ Glacier & H₂O Ice Crust)',
          outerRadiusRatio: 1.0,
          color: '#e5bfa0',
          detail: '厚さ約100〜150kmの硬い水（H₂O）の氷地殻と、ハート形の「スプートニク平原」で多角形対流セルを形成する窒素・メタン・一酸化炭素の氷河層。',
        },
        {
          name: '水氷マントル・内部地下海 (Water-Ice Mantle & Subsurface Ocean)',
          outerRadiusRatio: 0.86,
          color: '#38bdf8',
          detail: '厚さ約150〜200kmの水氷マントル層。下部にはアンモニア等の不凍成分を含む厚さ100km規模の「液体の内部海」が維持されている。',
        },
        {
          name: '含水ケイ酸塩岩石コア (Hydrated Silicate Rocky Core)',
          outerRadiusRatio: 0.72,
          color: '#78716c',
          detail: '直径約1,700km（冥王星半径の約72%・質量の約70%）を占める巨大な岩石コア。放射性元素の崩壊熱が内部海を温め続けている。',
        },
      ],
    },
    moons: [
      {
        id: 'charon',
        nameJa: 'カロン',
        nameEn: 'Charon',
        orbitalPeriodDays: 6.387,
        distanceKm: 19591,
        orbitRadiusPx: 14,
        sizePx: 2.3,
        color: '#cbd5e1',
        initialAngleDeg: 110.0,
        diameterKm: 1212,
        description:
          '冥王星最大の衛星。直径が冥王星の半分以上あり、共通重心を回る二重準惑星とも呼ばれます。',
      },
      {
        id: 'nix',
        nameJa: 'ニクス',
        nameEn: 'Nix',
        orbitalPeriodDays: 24.855,
        distanceKm: 48694,
        orbitRadiusPx: 20,
        sizePx: 1.4,
        color: '#f1f5f9',
        initialAngleDeg: 225.0,
        diameterKm: 49.8,
        description: '冥王星・カロン系の外側を公転する小型の氷衛星です。',
      },
      {
        id: 'hydra',
        nameJa: 'ヒドラ',
        nameEn: 'Hydra',
        orbitalPeriodDays: 38.202,
        distanceKm: 64738,
        orbitRadiusPx: 26,
        sizePx: 1.4,
        color: '#e2e8f0',
        initialAngleDeg: 330.0,
        diameterKm: 50.9,
        description: '冥王星の5つの衛星のうち最も外側を公転する衛星です。',
      },
    ],
  },
  {
    id: 'haumea',
    nameJa: 'ハウメア',
    nameEn: 'Haumea',
    symbol: '🝻',
    bodyClass: 'dwarf_planet',
    subGroup: 'plutoid',
    homeZone: 'tno',
    category: 'IAU公認 準惑星（冥王星型天体 / 外縁天体）',
    semiMajorAxisAu: 43.133,
    eccentricity: 0.1912,
    inclinationDeg: 28.19,
    orbitalPeriodDays: 103468.0,
    rotationPeriodHours: 3.915,
    meanLongitudeDeg: 205.20,
    perihelionLongitudeDeg: 121.79,
    ascendingNodeLongitudeDeg: 122.02,
    scaleConfig: {
      orbitRadiusPx: { inner: 1480, outer: 750, tno: 340 },
      bodySizePx: { inner: 5.0, outer: 4.5, tno: 5.6 },
      isPrimaryInZone: { inner: false, outer: false, tno: true },
      isVisibleInZone: { inner: false, outer: false, tno: true },
    },
    color: '#bae6fd',
    accentColor: '#0284c7',
    orbitColor: 'rgba(186, 230, 253, 0.58)',
    orbitStyle: 'dashed',
    hasRings: true,
    ringColor: 'rgba(186, 230, 253, 0.72)',
    ringSystem: {
      labelJa: 'ハウメアの環（幅約70km・半径約2,287kmの氷粒子環 / 自転と1:3共鳴）',
      tiltDeg: -25,
      aspectRatio: 0.36,
      bands: [
        { name: 'ハウメア環 (1:3スピン軌道共鳴環)', radiusMultiplier: 1.95, strokeWidthPx: 1.8, color: '#bae6fd', opacity: 0.82 },
      ],
    },
    diameterKm: 1560,
    orbitalSpeedKms: 4.53,
    temperatureInfo: '平均 約-241℃',
    description:
      'カイパーベルトを公転するIAU公認の冥王星型天体です。約3.9時間という高速自転により楕円体形状をしており、細い環と2つの衛星（ヒイアカ・ナマカ）を持っています。',
    interiorStructure: {
      summary: '超高速自転による扁平楕円体 ＋ 水氷・結晶質氷地殻 ＋ 巨大含水岩石コア',
      layers: [
        {
          name: '表層・結晶質水氷地殻',
          outerRadiusRatio: 1.0,
          color: '#e2e8f0',
          detail:
            '自転周期わずか3.9時間の高速自転によりラグビーボール状に扁平化。放射線照射にもかかわらず結晶質水氷が保たれており、潮汐力による微小加熱が示唆されています。',
        },
        {
          name: '薄い水氷マントル',
          outerRadiusRatio: 0.88,
          color: '#93c5fd',
          detail:
            '厚さ数十kmの純粋な水氷層。かつての巨大衝突によって氷マントルの大部分が吹き飛ばされ、ハウメア族衝突ファミリーを形成したと考えられています。',
        },
        {
          name: '高密度含水ケイ酸塩岩石コア',
          outerRadiusRatio: 0.76,
          color: '#475569',
          detail:
            '天体質量の約86〜92%を占める高密度（2.01 g/cm³）の巨大な岩石中心核。含水鉱物（蛇紋岩など）を含み、内部進化の痕跡を留めています。',
        },
      ],
    },
    moons: [
      {
        id: 'namaka',
        nameJa: 'ナマカ',
        nameEn: 'Namaka',
        orbitalPeriodDays: 18.278,
        distanceKm: 25657,
        orbitRadiusPx: 14,
        sizePx: 1.4,
        color: '#e0f2fe',
        initialAngleDeg: 60.0,
        diameterKm: 170,
        description: 'ハウメアの内側を公転する小さな氷衛星です。',
      },
      {
        id: 'hiiaka',
        nameJa: 'ヒイアカ',
        nameEn: 'Hiʻiaka',
        orbitalPeriodDays: 49.12,
        distanceKm: 49880,
        orbitRadiusPx: 21,
        sizePx: 1.8,
        color: '#bae6fd',
        initialAngleDeg: 200.0,
        diameterKm: 310,
        description: 'ハウメアの外側を公転する大きな方の衛星です。',
      },
    ],
  },
  {
    id: 'quaoar',
    nameJa: 'クワオアー',
    nameEn: 'Quaoar',
    symbol: '🝾',
    bodyClass: 'dwarf_candidate',
    subGroup: 'tno_candidate',
    homeZone: 'tno',
    category: '準惑星候補 / 古典的カイパーベルト天体（キュビワノ族）',
    semiMajorAxisAu: 43.694,
    eccentricity: 0.0411,
    inclinationDeg: 7.99,
    orbitalPeriodDays: 105490.0,
    rotationPeriodHours: 17.68,
    meanLongitudeDeg: 251.40,
    perihelionLongitudeDeg: 15.15,
    ascendingNodeLongitudeDeg: 188.80,
    scaleConfig: {
      orbitRadiusPx: { inner: 1540, outer: 790, tno: 385 },
      bodySizePx: { inner: 4.5, outer: 4.2, tno: 5.2 },
      isPrimaryInZone: { inner: false, outer: false, tno: true },
      isVisibleInZone: { inner: false, outer: false, tno: true },
    },
    color: '#fdba74',
    accentColor: '#c2410c',
    orbitColor: 'rgba(253, 186, 116, 0.58)',
    orbitStyle: 'dotted',
    hasRings: true,
    ringColor: 'rgba(253, 186, 116, 0.72)',
    ringSystem: {
      labelJa: 'クワオアーの2重環（ロシュ限界外側のQ1R・Q2R環）',
      tiltDeg: -18,
      aspectRatio: 0.36,
      bands: [
        { name: 'Q2R 内環', radiusMultiplier: 1.65, strokeWidthPx: 1.3, color: '#fdba74', opacity: 0.65 },
        { name: 'Q1R 外環 (ロシュ限界外の濃い環)', radiusMultiplier: 2.02, strokeWidthPx: 1.8, color: '#fed7aa', opacity: 0.85 },
      ],
    },
    diameterKm: 1090,
    orbitalSpeedKms: 4.52,
    temperatureInfo: '平均 約-230℃',
    description:
      '古典的カイパーベルト天体（キュビワノ族）の代表的な準惑星候補です。離心率が0.04と非常に小さく真円に近い軌道を公転しており、衛星ウェイウォットと2重の環を持っています。',
    interiorStructure: {
      summary: 'メタン・水氷地殻 ＋ 圧縮水氷マントル ＋ 超高密度ケイ酸塩岩石コア',
      layers: [
        {
          name: 'メタン・結晶質水氷表層',
          outerRadiusRatio: 1.0,
          color: '#f59e0b',
          detail:
            'ロッシュ限界の約2倍の外側に淡い環を持つ特異な天体。表面温度約-229℃にもかかわらず結晶質水氷と微小なメタン氷火山地形が観測されています。',
        },
        {
          name: '薄い圧縮水氷マントル',
          outerRadiusRatio: 0.8,
          color: '#7dd3fc',
          detail:
            '平均密度が約2.2 g/cm³と外縁天体の中でも非常に高いため、かつての巨大天体衝突によって厚い氷マントルの大半が剥ぎ取られたと考えられています。',
        },
        {
          name: '超高密度ケイ酸塩・金属コア',
          outerRadiusRatio: 0.68,
          color: '#78350f',
          detail:
            '天体半径の約70%（質量の85%以上）を占める巨大な岩石・金属中心核。地球の月やケレスに匹敵する高い岩石含有比率を持ちます。',
        },
      ],
    },
    moons: [
      {
        id: 'weywot',
        nameJa: 'ウェイウォット',
        nameEn: 'Weywot',
        orbitalPeriodDays: 12.438,
        distanceKm: 14500,
        orbitRadiusPx: 15,
        sizePx: 1.5,
        color: '#fed7aa',
        initialAngleDeg: 165.0,
        diameterKm: 170,
        description:
          'クワオアーを約12.4日周期で公転する衛星。2007年にハッブル宇宙望遠鏡の画像から発見されました。',
      },
    ],
  },
  {
    id: 'makemake',
    nameJa: 'マケマケ',
    nameEn: 'Makemake',
    symbol: '🝼',
    bodyClass: 'dwarf_planet',
    subGroup: 'plutoid',
    homeZone: 'tno',
    category: 'IAU公認 準惑星（冥王星型天体 / キュビワノ族）',
    semiMajorAxisAu: 45.791,
    eccentricity: 0.1559,
    inclinationDeg: 28.98,
    orbitalPeriodDays: 111845.0,
    rotationPeriodHours: 22.83,
    meanLongitudeDeg: 165.40,
    perihelionLongitudeDeg: 79.36,
    ascendingNodeLongitudeDeg: 79.62,
    scaleConfig: {
      orbitRadiusPx: { inner: 1620, outer: 830, tno: 430 },
      bodySizePx: { inner: 5.0, outer: 4.5, tno: 5.5 },
      isPrimaryInZone: { inner: false, outer: false, tno: true },
      isVisibleInZone: { inner: false, outer: false, tno: true },
    },
    color: '#fda4af',
    accentColor: '#e11d48',
    orbitColor: 'rgba(253, 164, 175, 0.58)',
    orbitStyle: 'dashed',
    diameterKm: 1430,
    orbitalSpeedKms: 4.42,
    temperatureInfo: '平均 約-239℃',
    description:
      '古典的カイパーベルト天体の中で最大級のIAU公認冥王星型天体（準惑星）です。表面は凍結したメタンに覆われ赤みがかった色をしています。',
    interiorStructure: {
      summary: '赤褐色メタン・エタン氷表層 ＋ 水氷マントル ＋ 高密度岩石コア',
      layers: [
        {
          name: 'メタン・エタン・ソリン氷表層',
          outerRadiusRatio: 1.0,
          color: '#fb7185',
          detail:
            '太陽光の紫外線照射により光分解したメタンが重合し、赤褐色のソリン粒子と数cmサイズの粗いメタン・エタン・窒素の混合氷結晶層を形成しています。',
        },
        {
          name: '圧縮水氷マントル',
          outerRadiusRatio: 0.84,
          color: '#a5f3fc',
          detail:
            '厚さ約200kmの冷たい高密度水氷層。深部では高圧氷（氷VI・氷VII）相が存在し、中心核の熱を表面へ逃がす緩衝層として機能しています。',
        },
        {
          name: '高密度ケイ酸塩岩石コア',
          outerRadiusRatio: 0.64,
          color: '#713f12',
          detail:
            '天体質量の約70〜75%を占める密度の高いケイ酸塩・金属質の中心核。放射性元素の崩壊熱が内部温度を維持しています。',
        },
      ],
    },
    moons: [
      {
        id: 'mk2',
        nameJa: 'MK 2',
        nameEn: 'S/2015 (136472) 1',
        orbitalPeriodDays: 12.4,
        distanceKm: 21000,
        orbitRadiusPx: 15,
        sizePx: 1.4,
        color: '#94a3b8',
        initialAngleDeg: 140.0,
        diameterKm: 175,
        description: 'ハッブル宇宙望遠鏡によって発見されたマケマケの暗い衛星です。',
      },
    ],
  },
  {
    id: 'gonggong',
    nameJa: 'ゴンゴン(共工)',
    nameEn: 'Gonggong',
    symbol: '🝽',
    bodyClass: 'dwarf_candidate',
    subGroup: 'tno_candidate',
    homeZone: 'tno',
    category: '準惑星候補 / 散乱円盤天体（海王星と3:10共鳴）',
    semiMajorAxisAu: 67.485,
    eccentricity: 0.5000,
    inclinationDeg: 30.63,
    orbitalPeriodDays: 202500.0,
    rotationPeriodHours: 22.40,
    meanLongitudeDeg: 291.50,
    perihelionLongitudeDeg: 213.90,
    ascendingNodeLongitudeDeg: 336.85,
    scaleConfig: {
      orbitRadiusPx: { inner: 1700, outer: 880, tno: 480 },
      bodySizePx: { inner: 5.0, outer: 4.5, tno: 5.5 },
      isPrimaryInZone: { inner: false, outer: false, tno: true },
      isVisibleInZone: { inner: false, outer: false, tno: true },
    },
    color: '#f87171',
    accentColor: '#991b1b',
    orbitColor: 'rgba(248, 113, 113, 0.58)',
    orbitStyle: 'dotted',
    diameterKm: 1230,
    orbitalSpeedKms: 3.63,
    temperatureInfo: '平均 約-243℃',
    description:
      '海王星以遠の天体として第5位の大きさ（直径約1,230 km）を持つ準惑星候補です。離心率0.50の大きな楕円軌道を約554年周期で公転し、衛星シアンリウ（相柳）を従えています。',
    interiorStructure: {
      summary: '赤色ソリン・メタン氷表層 ＋ 内部海候補の水氷マントル ＋ 含水岩石コア',
      layers: [
        {
          name: '濃赤色ソリン・メタン氷地殻',
          outerRadiusRatio: 1.0,
          color: '#f87171',
          detail:
            '外縁天体で最も赤い天体の一つ。厚いメタンの揮発性地殻が宇宙線照射を受けて多量の高分子有機物（ソリン）に変化し、深紅の地表を呈しています。',
        },
        {
          name: '水氷・内部液体の海マントル候補',
          outerRadiusRatio: 0.82,
          color: '#38bdf8',
          detail:
            '厚さ約200kmの水氷層。直径約1,230kmと大型であるため、放射性崩壊熱と衛星相柳の潮汐摩擦により深部に液体のアンモニア水地下海が存在する可能性があります。',
        },
        {
          name: '含水ケイ酸塩岩石コア',
          outerRadiusRatio: 0.62,
          color: '#991b1b',
          detail:
            '密度約1.75 g/cm³に対応する蛇紋石等の含水鉱物を豊富に含むケイ酸塩中心核。内部の水熱活動の痕跡を保持しています。',
        },
      ],
    },
    moons: [
      {
        id: 'xiangliu',
        nameJa: 'シアンリウ(相柳)',
        nameEn: 'Xiangliu',
        orbitalPeriodDays: 25.221,
        distanceKm: 24020,
        orbitRadiusPx: 16,
        sizePx: 1.5,
        color: '#fca5a5',
        initialAngleDeg: 310.0,
        diameterKm: 100,
        description:
          '共工の従者である九頭の大蛇「相柳（シアンリウ）」から名付けられた衛星。約25.2日周期でゴンゴンを公転しています。',
      },
    ],
  },
  {
    id: 'eris',
    nameJa: 'エリス',
    nameEn: 'Eris',
    symbol: '⯰',
    bodyClass: 'dwarf_planet',
    subGroup: 'plutoid',
    homeZone: 'tno',
    category: 'IAU公認 準惑星（冥王星型天体 / 散乱円盤天体）',
    semiMajorAxisAu: 67.781,
    eccentricity: 0.4407,
    inclinationDeg: 44.04,
    orbitalPeriodDays: 203830.0,
    rotationPeriodHours: 25.9,
    meanLongitudeDeg: 36.02,
    perihelionLongitudeDeg: 151.64,
    ascendingNodeLongitudeDeg: 35.88,
    scaleConfig: {
      orbitRadiusPx: { inner: 1780, outer: 920, tno: 525 },
      bodySizePx: { inner: 5.5, outer: 5.0, tno: 6.3 },
      isPrimaryInZone: { inner: false, outer: false, tno: true },
      isVisibleInZone: { inner: false, outer: false, tno: true },
    },
    color: '#f8fafc',
    accentColor: '#64748b',
    orbitColor: 'rgba(248, 250, 252, 0.65)',
    orbitStyle: 'dashed',
    diameterKm: 2326,
    orbitalSpeedKms: 3.43,
    temperatureInfo: '平均 約-243℃',
    description:
      '散乱円盤領域を約558年周期で公転する最も重いIAU公認準惑星（冥王星より約27%高質量）です。平均密度が 2.43 g/cm³ と非常に高く、天体半径の約75〜80%（質量の約85%以上）を「高密度ケイ酸塩岩石コア」が占め、その外側を対流する「水氷マントル」と超高反射率の窒素・メタン氷地殻が覆っています。',
    interiorStructure: {
      summary: '高反射率の窒素・メタン氷表層 ＋ 対流する水氷マントル ＋ 超高密度の巨大岩石コア',
      layers: [
        {
          name: '窒素・メタン凍結表層 (Frozen N₂/CH₄ Surface Crust)',
          outerRadiusRatio: 1.0,
          color: '#f8fafc',
          detail: '反射率（アルベド）0.96に達する純白の窒素・メタン氷の表層。内部からのガス放出と大気凍結により常に更新されている。',
        },
        {
          name: '対流する水氷マントル (Convecting Water-Ice Mantle)',
          outerRadiusRatio: 0.93,
          color: '#93c5fd',
          detail: '厚さ約180〜240kmの水氷マントル層。JWST観測により、岩石コアの崩壊熱によって氷マントルが緩やかに固相対流していることが示唆されている。',
        },
        {
          name: '高密度ケイ酸塩岩石コア (Dense Silicate Rocky Core)',
          outerRadiusRatio: 0.78,
          color: '#64748b',
          detail: '半径約900km（エリス質量の約85〜90%）を占める巨大な高密度岩石コア。冥王星以上に岩石比率が高い。',
        },
      ],
    },
    moons: [
      {
        id: 'dysnomia',
        nameJa: 'ディスノミア',
        nameEn: 'Dysnomia',
        orbitalPeriodDays: 15.786,
        distanceKm: 37273,
        orbitRadiusPx: 17,
        sizePx: 1.8,
        color: '#cbd5e1',
        initialAngleDeg: 280.0,
        diameterKm: 700,
        description: 'エリスを約15.8日周期で公転する大型衛星です。',
      },
    ],
  },
  {
    id: 'sedna',
    nameJa: 'セドナ',
    nameEn: 'Sedna',
    symbol: '⯲',
    bodyClass: 'dwarf_candidate',
    subGroup: 'tno_candidate',
    homeZone: 'tno',
    category: '準惑星候補 / 分離天体（セドノイド・内オールトの雲候補）',
    semiMajorAxisAu: 506.0,
    eccentricity: 0.8496,
    inclinationDeg: 11.93,
    orbitalPeriodDays: 4163850.0,
    rotationPeriodHours: 10.27,
    meanLongitudeDeg: 93.33,
    perihelionLongitudeDeg: 96.12,
    ascendingNodeLongitudeDeg: 144.55,
    scaleConfig: {
      orbitRadiusPx: { inner: 2600, outer: 1800, tno: 1420 },
      bodySizePx: { inner: 4.5, outer: 4.5, tno: 5.6 },
      isPrimaryInZone: { inner: false, outer: false, tno: true },
      isVisibleInZone: { inner: false, outer: false, tno: true },
      customDisplayEcc: 0.62,
    },
    color: '#fb7185',
    accentColor: '#881337',
    orbitColor: 'rgba(251, 113, 133, 0.68)',
    orbitStyle: 'dotted',
    diameterKm: 995,
    orbitalSpeedKms: 1.04,
    temperatureInfo: '平均 約-261℃',
    description:
      '近日点でも太陽から76.2 AU、遠日点は約937 AUに達し、約1万1,400年かけて1周する極端な長楕円軌道を持つ準惑星候補です。海王星の重力干渉を受けない「分離天体（セドノイド）」の代表であり、現在は2076年の近日点通過に向けて太陽系の内側（約84 AU付近）へ接近中です。',
    interiorStructure: {
      summary: '深紅の有機物ソリン・メタン氷地殻 ＋ 圧縮水氷マントル ＋ 原始ケイ酸塩岩石コア',
      layers: [
        {
          name: '極冷深紅ソリン・窒素・メタン氷地殻',
          outerRadiusRatio: 1.0,
          color: '#e11d48',
          detail:
            '近日点76 AU・遠日点約937 AUの超極端楕円軌道を11,400年かけて周回。数十億年の宇宙線被曝により極めて純度の高い暗赤色ソリン層で覆われています。',
        },
        {
          name: '圧縮高密度水氷マントル',
          outerRadiusRatio: 0.8,
          color: '#0284c7',
          detail:
            '厚さ約150kmの高圧水氷マントル。遠日点付近では温度が-250℃以下まで低下しますが、内部熱伝導率の低さにより中心核の熱を蓄積しています。',
        },
        {
          name: '原始ケイ酸塩岩石コア',
          outerRadiusRatio: 0.58,
          color: '#881337',
          detail:
            '天体半径の約60%を占める原始ケイ酸塩・金属コア。原始惑星系円盤外縁部での集積時の始原的組成をそのまま保存していると考えられています。',
        },
      ],
    },
    moons: [],
  },
  {
    id: 'ixion',
    nameJa: 'イクシオン',
    nameEn: 'Ixion',
    symbol: '⯪',
    bodyClass: 'dwarf_candidate',
    subGroup: 'tno_candidate',
    homeZone: 'tno',
    category: '準惑星候補 / 冥王星族（プルティノ）',
    semiMajorAxisAu: 39.68,
    eccentricity: 0.242,
    inclinationDeg: 19.6,
    orbitalPeriodDays: 91280.0,
    rotationPeriodHours: 15.9,
    meanLongitudeDeg: 240.0,
    perihelionLongitudeDeg: 70.0,
    ascendingNodeLongitudeDeg: 71.05,
    scaleConfig: {
      orbitRadiusPx: { inner: 1400, outer: 720, tno: 365 },
      bodySizePx: { inner: 2.2, outer: 2.4, tno: 3.2 },
      isPrimaryInZone: { inner: false, outer: false, tno: true },
      isVisibleInZone: { inner: false, outer: false, tno: true },
    },
    color: '#c084fc',
    accentColor: '#7e22ce',
    orbitColor: 'rgba(192, 132, 252, 0.58)',
    orbitStyle: 'dotted',
    diameterKm: 650,
    orbitalSpeedKms: 4.69,
    temperatureInfo: '平均 約-235℃',
    description:
      '冥王星と同じく海王星と2:3の軌道共鳴関係にある大型冥王星族（プルティノ）天体。2001年に発見され、オルクスに次ぐ規模を誇ります。表面は暗赤色の有機物（ソリン）と水氷の混合物で覆われています。',
    interiorStructure: {
      summary: '暗赤色ソリン・炭素質氷地殻 ＋ 混合氷マントル ＋ ケイ酸塩岩石コア',
      layers: [
        {
          name: '炭素質・ソリン混合氷表層',
          outerRadiusRatio: 1.0,
          color: '#b45309',
          detail:
            '水氷と暗い高分子有機物（ソリン）が混在する中程度の赤色スペクトル地表。揮発性物質の昇華痕が見られます。',
        },
        {
          name: '氷・ケイ酸塩混合マントル',
          outerRadiusRatio: 0.78,
          color: '#38bdf8',
          detail:
            '圧縮された水氷と微小鉱物ダストが混ざり合った分化途上のマントル層。',
        },
        {
          name: 'ケイ酸塩岩石コア',
          outerRadiusRatio: 0.52,
          color: '#475569',
          detail:
            '天体質量の約60%以上を占める岩石質の中心核。',
        },
      ],
    },
    moons: [],
  },
  {
    id: 'uni',
    nameJa: 'ウニ',
    nameEn: 'Uni',
    symbol: '🝽',
    bodyClass: 'dwarf_candidate',
    subGroup: 'tno_candidate',
    homeZone: 'tno',
    category: '準惑星候補 / 古典的カイパーベルト天体（キュビワノ族）',
    semiMajorAxisAu: 43.00,
    eccentricity: 0.146,
    inclinationDeg: 19.4,
    orbitalPeriodDays: 103000.0,
    rotationPeriodHours: 14.38,
    meanLongitudeDeg: 60.0,
    perihelionLongitudeDeg: 280.0,
    ascendingNodeLongitudeDeg: 216.09,
    scaleConfig: {
      orbitRadiusPx: { inner: 1510, outer: 780, tno: 382 },
      bodySizePx: { inner: 2.2, outer: 2.4, tno: 3.2 },
      isPrimaryInZone: { inner: false, outer: false, tno: true },
      isVisibleInZone: { inner: false, outer: false, tno: true },
    },
    color: '#fb923c',
    accentColor: '#c2410c',
    orbitColor: 'rgba(251, 146, 60, 0.58)',
    orbitStyle: 'dotted',
    diameterKm: 665,
    orbitalSpeedKms: 4.54,
    temperatureInfo: '平均 約-232℃',
    description:
      '2025年にエトルリア神話の最高女神「ウニ」と正式命名された大型カイパーベルト天体（旧仮符号 2002 UX25）。直径約665kmでありながら密度が約0.82 g/cm³と水より低く、多孔質な氷でできた「水に浮く巨大氷天体」として天文学上極めて重要な天体です。衛星ティニアを従えています。',
    interiorStructure: {
      summary: '水に浮く低密度天体 ＋ 多孔質水氷マントル（空隙率30%） ＋ 微小岩石コア',
      layers: [
        {
          name: '結晶質・非晶質水氷地殻',
          outerRadiusRatio: 1.0,
          color: '#fb923c',
          detail: '水氷と有機物ダストの混合地殻。反射率約0.115。',
        },
        {
          name: '多孔質水氷マントル',
          outerRadiusRatio: 0.86,
          color: '#fdba74',
          detail:
            '天体全体が水に浮く超低密度（0.82 g/cm³）。内部に多量の空隙を含み、圧縮されていない始原的な氷マントルです。',
        },
        {
          name: '微小ケイ酸塩岩石コア',
          outerRadiusRatio: 0.4,
          color: '#78350f',
          detail: '天体半径の約40%程度の微小な岩石核。',
        },
      ],
    },
    moons: [
      {
        id: 'tinia',
        nameJa: 'ティニア',
        nameEn: 'Tinia',
        orbitalPeriodDays: 8.04,
        distanceKm: 4770,
        orbitRadiusPx: 12,
        sizePx: 1.2,
        color: '#fdba74',
        initialAngleDeg: 110.0,
        diameterKm: 210,
        description:
          'ウニの主星の周りを約8.04日周期で公転する衛星。2005年にハッブル宇宙望遠鏡で発見され、エトルリア神話の天空神ティニアにちなんで命名されました。',
      },
    ],
  },
  {
    id: 'varuna',
    nameJa: 'ヴァルナ',
    nameEn: 'Varuna',
    symbol: '🝲',
    bodyClass: 'dwarf_candidate',
    subGroup: 'tno_candidate',
    homeZone: 'tno',
    category: '準惑星候補 / 古典的カイパーベルト天体（キュビワノ族）',
    semiMajorAxisAu: 43.04,
    eccentricity: 0.0567,
    inclinationDeg: 17.16,
    orbitalPeriodDays: 103150.0,
    rotationPeriodHours: 6.34,
    meanLongitudeDeg: 122.0,
    perihelionLongitudeDeg: 6.0,
    ascendingNodeLongitudeDeg: 97.40,
    scaleConfig: {
      orbitRadiusPx: { inner: 1520, outer: 785, tno: 383 },
      bodySizePx: { inner: 2.2, outer: 2.4, tno: 3.2 },
      isPrimaryInZone: { inner: false, outer: false, tno: true },
      isVisibleInZone: { inner: false, outer: false, tno: true },
    },
    color: '#e879f9',
    accentColor: '#a21caf',
    orbitColor: 'rgba(232, 121, 249, 0.58)',
    orbitStyle: 'dotted',
    diameterKm: 668,
    orbitalSpeedKms: 4.53,
    temperatureInfo: '平均 約-230℃',
    description:
      '2000年に発見された最初期の大型古典的カイパーベルト天体。ヒンドゥー教の宇宙水神ヴァルナにちなみます。約6.34時間という猛烈な高速自転により、ハウメアと同様に細長く引き伸ばされたヤコビ回転楕円体（長軸約1,000km×短軸約450km）の形状を持つと考えられています。',
    interiorStructure: {
      summary: 'ヤコビ回転楕円体 ＋ 水氷・暗黒有機物地殻 ＋ 圧縮岩石マントル・コア',
      layers: [
        {
          name: '暗黒ソリン・結晶質水氷表層',
          outerRadiusRatio: 1.0,
          color: '#e879f9',
          detail:
            '長軸約1,000km×短軸約450kmの極端な回転楕円体。暗い有機物と水氷の混ざった低アルベド表層。',
        },
        {
          name: '圧縮水氷マントル',
          outerRadiusRatio: 0.8,
          color: '#c084fc',
          detail:
            '高速自転による遠心力と自己重力の釣合いを保つ氷マントル層。',
        },
        {
          name: 'ケイ酸塩岩石コア',
          outerRadiusRatio: 0.58,
          color: '#581c87',
          detail: '平均密度約1.0 g/cm³に対応する岩石中心核。',
        },
      ],
    },
    moons: [],
  },
  {
    id: 'tx300',
    nameJa: '2002 TX300',
    nameEn: '2002 TX300',
    symbol: '🝱',
    bodyClass: 'dwarf_candidate',
    subGroup: 'tno_candidate',
    homeZone: 'tno',
    category: '準惑星候補 / ハウメア衝突族天体',
    semiMajorAxisAu: 43.43,
    eccentricity: 0.124,
    inclinationDeg: 25.85,
    orbitalPeriodDays: 104100.0,
    rotationPeriodHours: 8.12,
    meanLongitudeDeg: 29.0,
    perihelionLongitudeDeg: 305.0,
    ascendingNodeLongitudeDeg: 54.34,
    scaleConfig: {
      orbitRadiusPx: { inner: 1530, outer: 788, tno: 384 },
      bodySizePx: { inner: 2.0, outer: 2.2, tno: 2.6 },
      isPrimaryInZone: { inner: false, outer: false, tno: true },
      isVisibleInZone: { inner: false, outer: false, tno: true },
    },
    color: '#67e8f9',
    accentColor: '#0891b2',
    orbitColor: 'rgba(103, 232, 249, 0.58)',
    orbitStyle: 'dotted',
    diameterKm: 300,
    orbitalSpeedKms: 4.51,
    temperatureInfo: '平均 約-233℃',
    description:
      '準惑星ハウメアが太古に巨大衝突を起こした際に飛び散った破片からなる「ハウメア衝突族」の代表的メンバー。表面がほぼ純粋な結晶質水氷で覆われており、幾何アルベドが0.88以上と太陽系外縁天体の中で最も白く輝く天体の一つです。',
    interiorStructure: {
      summary: '超高アルベド結晶質水氷地殻 ＋ 高純度氷マントル ＋ 微小岩石核',
      layers: [
        {
          name: '超高反射率純水氷表層',
          outerRadiusRatio: 1.0,
          color: '#a5f3fc',
          detail:
            '幾何アルベド0.88以上の極めて白く輝く純粋な結晶質水氷地殻。ハウメアの氷マントル破片。',
        },
        {
          name: '高純度水氷マントル',
          outerRadiusRatio: 0.85,
          color: '#38bdf8',
          detail:
            '衝突によって母天体の外殻氷が凝集した、ケイ酸塩不純物の極めて少ない水氷層。',
        },
        {
          name: '微小ケイ酸塩コア',
          outerRadiusRatio: 0.35,
          color: '#0369a1',
          detail: '天体内部に残るごく微小な岩石成分。',
        },
      ],
    },
    moons: [],
  },
  {
    id: 'tc302',
    nameJa: '2002 TC302',
    nameEn: '2002 TC302',
    symbol: '🝳',
    bodyClass: 'dwarf_candidate',
    subGroup: 'tno_candidate',
    homeZone: 'tno',
    category: '準惑星候補 / 散乱円盤天体（2:5 軌道共鳴天体）',
    semiMajorAxisAu: 55.45,
    eccentricity: 0.295,
    inclinationDeg: 35.04,
    orbitalPeriodDays: 150900.0,
    rotationPeriodHours: 56.1,
    meanLongitudeDeg: 81.0,
    perihelionLongitudeDeg: 110.0,
    ascendingNodeLongitudeDeg: 23.91,
    scaleConfig: {
      orbitRadiusPx: { inner: 1750, outer: 920, tno: 435 },
      bodySizePx: { inner: 2.2, outer: 2.4, tno: 3.1 },
      isPrimaryInZone: { inner: false, outer: false, tno: true },
      isVisibleInZone: { inner: false, outer: false, tno: true },
    },
    color: '#f43f5e',
    accentColor: '#9f1239',
    orbitColor: 'rgba(244, 63, 94, 0.58)',
    orbitStyle: 'dotted',
    diameterKm: 584,
    orbitalSpeedKms: 3.98,
    temperatureInfo: '平均 約-238℃',
    description:
      '海王星と2:5の軌道共鳴関係にある、太陽系最大級の共鳴散乱円盤天体（SDO）。軌道傾斜角が約35度と大きく傾いており、遠日点は71.5 AUに達します。表面は有機物（ソリン）が太陽光や宇宙線で赤化した極めて濃い赤褐色を呈しています。',
    interiorStructure: {
      summary: '極濃赤褐色ソリン地殻 ＋ 水氷マントル ＋ ケイ酸塩岩石コア',
      layers: [
        {
          name: '濃赤褐色ソリン・氷表層',
          outerRadiusRatio: 1.0,
          color: '#f43f5e',
          detail:
            '長期間の宇宙線被曝で極めて濃い赤褐色を呈するソリン・炭素質地殻。',
        },
        {
          name: '圧縮水氷マントル',
          outerRadiusRatio: 0.82,
          color: '#fda4af',
          detail: '厚さ約100kmの冷たい水氷層。',
        },
        {
          name: 'ケイ酸塩岩石コア',
          outerRadiusRatio: 0.6,
          color: '#881337',
          detail: '天体質量の約65%を占める高密度ケイ酸塩コア。',
        },
      ],
    },
    moons: [],
  },

  // ==================== 5. 太陽系の主要周期彗星 (Periodic Comets) ====================
  {
    id: 'encke',
    nameJa: 'エンケ彗星',
    nameEn: '2P/Encke',
    symbol: '☄',
    bodyClass: 'comet',
    subGroup: 'comet_periodic',
    homeZone: 'inner',
    category: '周期彗星（エンケ型・最短周期 3.30年）',
    semiMajorAxisAu: 2.215,
    eccentricity: 0.8483,
    inclinationDeg: 11.78,
    orbitalPeriodDays: 1204.2,
    rotationPeriodHours: 11.08,
    meanLongitudeDeg: 334.6,
    perihelionLongitudeDeg: 161.1,
    ascendingNodeLongitudeDeg: 334.57,
    scaleConfig: {
      // 近日点 0.336 AU (水星の内側) 〜 遠日点 4.09 AU (小惑星帯外縁・木星の内側)
      orbitRadiusPx: { inner: 278, outer: 88, tno: 36 },
      bodySizePx: { inner: 4.8, outer: 3.4, tno: 1.6 },
      isPrimaryInZone: { inner: true, outer: true, tno: false },
      isVisibleInZone: { inner: true, outer: true, tno: false },
      customDisplayEcc: { inner: 0.76, outer: 0.72, tno: 0.7 },
    },
    color: '#2dd4bf',
    accentColor: '#0f766e',
    orbitColor: 'rgba(45, 212, 191, 0.62)',
    orbitStyle: 'comet',
    diameterKm: 4.8,
    orbitalSpeedKms: 69.9,
    temperatureInfo: 'おうし座流星群の母天体',
    description:
      '既知の周期彗星の中で最も短い約3.30年（1,204日）で太陽を公転する短周期彗星です。近日点では水星軌道の内側（0.336 AU）まで太陽に迫り、遠日点は小惑星帯外縁・木星軌道の内側（4.09 AU）に達します。おうし座流星群の母天体として知られています。',
    interiorStructure: {
      summary: '枯渇した多孔質炭素質ダスト外殻 ＋ 昇華性微小氷マントル ＋ 始原凝集核',
      layers: [
        {
          name: '黒色炭素質ダスト外殻（昇華残渣）',
          outerRadiusRatio: 1.0,
          color: '#334155',
          detail:
            '公転周期わずか3.3年の高頻度な太陽接近により表面揮発成分が枯渇。暗黒の有機物・ケイ酸塩ダストが厚いマントル状外殻（クラスト）を形成し、アルベドは約0.046と極めて低くなっています。',
        },
        {
          name: '超多孔質水・一酸化炭素氷マントル',
          outerRadiusRatio: 0.76,
          color: '#5eead4',
          detail:
            '空隙率が約70〜80%にも達するスカスカのスポンジ状微小水氷マントル。太陽熱が外殻の割れ目から侵入すると局所的なガスジェットが噴出します。',
        },
        {
          name: '原始太陽系星間ダスト凝集体コア',
          outerRadiusRatio: 0.45,
          color: '#0f766e',
          detail:
            '微小な鉱物粒子と有機高分子がファンデルワールス力で緩く結びついた未分化な中心核。強度が非常に低く、潮汐力で容易に分裂する性質を持ちます。',
        },
      ],
    },
    moons: [],
  },
  {
    id: 'churyumov_gerasimenko',
    nameJa: 'チュリュモフ・ゲラシメンコ彗星',
    nameEn: '67P/Churyumov–Gerasimenko',
    symbol: '☄',
    bodyClass: 'comet',
    subGroup: 'comet_periodic',
    homeZone: 'outer',
    category: '周期彗星（木星族短周期彗星・探査機ロゼッタ目標天体）',
    semiMajorAxisAu: 3.463,
    eccentricity: 0.6410,
    inclinationDeg: 7.04,
    orbitalPeriodDays: 2353.5,
    rotationPeriodHours: 12.40,
    meanLongitudeDeg: 118.5,
    perihelionLongitudeDeg: 12.8,
    ascendingNodeLongitudeDeg: 50.15,
    scaleConfig: {
      // 近日点 1.243 AU (地球と火星の間) 〜 遠日点 5.68 AU (木星軌道のすぐ外側)
      orbitRadiusPx: { inner: 418, outer: 158, tno: 62 },
      bodySizePx: { inner: 4.8, outer: 4.6, tno: 1.8 },
      isPrimaryInZone: { inner: true, outer: true, tno: false },
      isVisibleInZone: { inner: true, outer: true, tno: false },
      customDisplayEcc: { inner: 0.34, outer: 0.50, tno: 0.50 },
    },
    color: '#38bdf8',
    accentColor: '#0369a1',
    orbitColor: 'rgba(56, 189, 248, 0.6)',
    orbitStyle: 'comet',
    diameterKm: 4.1,
    orbitalSpeedKms: 38.0,
    temperatureInfo: 'ESA探査機ロゼッタ・フィラエ着陸天体',
    description:
      '約6.44年周期で地球・火星の間（近日点 1.24 AU）から木星軌道のすぐ外側（遠日点 5.68 AU）までを往復する木星族の短周期彗星です。2014年に欧州宇宙機関（ESA）の探査機「ロゼッタ」が史上初の周回探査と着陸機「フィラエ」の着陸を成功させ、2つの塊が接合した特徴的なアヒル型の核が明らかになりました。',
    interiorStructure: {
      summary: 'ロゼッタ探査機観測：2小胞接触二重核 ＋ 多孔質有機氷マントル ＋ 始原コア',
      layers: [
        {
          name: '有機化合物・非晶質炭素クラスト',
          outerRadiusRatio: 1.0,
          color: '#475569',
          detail:
            'ロゼッタとフィラエが直接探査。高分子有機物（ポリマー）とケイ酸塩砂礫が硬い外皮を形成し、クビレ部（ハピ領域）などの亀裂から活発なガス・ダストジェットを放出します。',
        },
        {
          name: '多孔質非晶質氷マントル（空隙率75%）',
          outerRadiusRatio: 0.78,
          color: '#2dd4bf',
          detail:
            '平均密度わずか0.53 g/cm³（水に浮く軽さ）の超低密度氷層。超低温で凍結したアモルファス（非晶質）水氷とドライアイス（CO₂）が微小空洞を埋めています。',
        },
        {
          name: '原始星間ダスト接触合体核',
          outerRadiusRatio: 0.44,
          color: '#134e4a',
          detail:
            '2つの独立した微小彗星が秒速数十cmの超低速で穏やかに合体した二重核構造。太陽系誕生直後の45億年前の星間分子雲の粒子がそのまま保存されています。',
        },
      ],
    },
    moons: [],
  },
  {
    id: 'giacobini_zinner',
    nameJa: 'ジャコビニ・ツィナー彗星',
    nameEn: '21P/Giacobini–Zinner',
    symbol: '☄',
    bodyClass: 'comet',
    subGroup: 'comet_periodic',
    homeZone: 'outer',
    category: '周期彗星（木星族短周期彗星・りゅう座流星群母天体）',
    semiMajorAxisAu: 3.500,
    eccentricity: 0.7105,
    inclinationDeg: 32.00,
    orbitalPeriodDays: 2383.0,
    rotationPeriodHours: 9.5,
    meanLongitudeDeg: 242.0,
    perihelionLongitudeDeg: 172.5,
    ascendingNodeLongitudeDeg: 195.40,
    scaleConfig: {
      // 近日点 1.013 AU (地球軌道付近) 〜 遠日点 5.99 AU (木星軌道の外側)
      orbitRadiusPx: { inner: 402, outer: 162, tno: 65 },
      bodySizePx: { inner: 4.8, outer: 4.6, tno: 1.8 },
      isPrimaryInZone: { inner: true, outer: true, tno: false },
      isVisibleInZone: { inner: true, outer: true, tno: false },
      customDisplayEcc: { inner: 0.41, outer: 0.58, tno: 0.58 },
    },
    color: '#a7f3d0',
    accentColor: '#059669',
    orbitColor: 'rgba(167, 243, 208, 0.6)',
    orbitStyle: 'comet',
    diameterKm: 2.0,
    orbitalSpeedKms: 42.1,
    temperatureInfo: '10月りゅう座（ジャコビニ）流星群の母天体',
    description:
      '約6.52年周期で公転する木星族短周期彗星です。近日点（1.013 AU）が地球の公転軌道とほぼ接するため、10月の「りゅう座流星群（ジャコビニ流星群）」を引き起こす母天体として有名です。1985年には国際彗星探査機（ICE）が史上初めて彗星の尾を直接通過観測しました。',
    interiorStructure: {
      summary: '10月りゅう座流星群母天体 ＋ 炭素質多孔質クラスト ＋ 揮発氷核',
      layers: [
        {
          name: 'ダスト放出クラスト（流星群母天体）',
          outerRadiusRatio: 1.0,
          color: '#3b4252',
          detail:
            '毎年10月に突発的な流星雨を降らせる母天体。表面から大量のミリサイズ〜センチサイズのダスト粒子が断続的に放出され、流星物質トレイルを形成しています。',
        },
        {
          name: '低密度炭素・青色シアンガス氷マントル',
          outerRadiusRatio: 0.75,
          color: '#38bdf8',
          detail:
            '青緑色に輝くC₂（炭素分子）やCN（シアン）ラジカルに富む揮発性氷層。太陽光の紫外線励起によって特有のエメラルドグリーンのコマを形成します。',
        },
        {
          name: '微小未溶融ケイ酸塩コア',
          outerRadiusRatio: 0.42,
          color: '#0369a1',
          detail:
            '熱変成を一切受けていない始原的なコンドリュール様微粒子と星間有機物の多孔質集合体。',
        },
      ],
    },
    moons: [],
  },
  {
    id: 'halley',
    nameJa: 'ハレー彗星',
    nameEn: '1P/Halley',
    symbol: '☄',
    bodyClass: 'comet',
    subGroup: 'comet_periodic',
    homeZone: 'outer',
    category: '周期彗星（ハレー型・逆行公転 / 周期 約75.3年）',
    semiMajorAxisAu: 17.834,
    eccentricity: 0.9671,
    inclinationDeg: 162.26,
    orbitalPeriodDays: -27508.0, // 軌道傾斜角162°のため公転方向は逆行（負の値）
    rotationPeriodHours: 52.8,
    meanLongitudeDeg: 28.0,
    perihelionLongitudeDeg: 170.0,
    ascendingNodeLongitudeDeg: 58.42,
    scaleConfig: {
      // 近日点 0.586 AU (金星の内側) 〜 遠日点 35.08 AU (海王星の外側)
      orbitRadiusPx: { inner: 485, outer: 315, tno: 148 },
      bodySizePx: { inner: 5.5, outer: 5.4, tno: 4.8 },
      isPrimaryInZone: { inner: true, outer: true, tno: true },
      isVisibleInZone: { inner: true, outer: true, tno: true },
      customDisplayEcc: { inner: 0.76, outer: 0.86, tno: 0.85 },
    },
    color: '#67e8f9',
    accentColor: '#0891b2',
    orbitColor: 'rgba(103, 232, 249, 0.72)',
    orbitStyle: 'comet',
    diameterKm: 11.0,
    orbitalSpeedKms: 54.55,
    temperatureInfo: '次回近日点: 2061年7月 / オリオン座流星群母天体',
    description:
      '最も有名な周期彗星であり、エドモンド・ハレーによって周期性が予言・証明された最初の彗星です。黄道面に対して約162度傾いた「逆行軌道」を持ち、金星軌道の内側（近日点 0.59 AU）から海王星軌道の外側（遠日点 35.1 AU）までを約75.3年周期で時計回りに公転しています。前回は1986年2月に回帰し、現在は2023年12月の遠日点通過を経て2061年7月の次回接近へ向けて折り返しています。',
    interiorStructure: {
      summary: '長楕円ピーナッツ核 ＋ 漆黒の有機物クラスト ＋ 始原氷マントル',
      layers: [
        {
          name: '漆黒の炭素・タール質有機外殻（反射率4%）',
          outerRadiusRatio: 1.0,
          color: '#1e293b',
          detail:
            'ジオット探査機が直接撮影した15×8kmのピーナッツ型不規則核。コールタールよりも暗い有機物外殻に覆われ、太陽光を受ける昼半球の数箇所の噴気孔から超音速ジェットが噴出します。',
        },
        {
          name: '多孔質水氷・ドライアイス・メタン氷マントル',
          outerRadiusRatio: 0.78,
          color: '#67e8f9',
          detail:
            '水氷80%・一酸化炭素10%・二酸化炭素3.5%・メタンなどで構成される極低温氷層。空隙率約60〜70%の断熱性に優れた雪状組織です。',
        },
        {
          name: 'オールトの雲起源・始原星間物質コア',
          outerRadiusRatio: 0.45,
          color: '#0891b2',
          detail:
            'カイパーベルトまたは内オールト雲から飛来した未分化コア。太陽系形成初期の超新星残骸ダストやアミノ酸前駆体有機物が凝縮しています。',
        },
      ],
    },
    moons: [],
  },
  {
    id: 'swift_tuttle',
    nameJa: 'スイフト・タットル彗星',
    nameEn: '109P/Swift–Tuttle',
    symbol: '☄',
    bodyClass: 'comet',
    subGroup: 'comet_periodic',
    homeZone: 'tno',
    category: '周期彗星（ハレー型・逆行公転 / ペルセウス座流星群母天体）',
    semiMajorAxisAu: 26.092,
    eccentricity: 0.9632,
    inclinationDeg: 113.45,
    orbitalPeriodDays: -48685.0, // 軌道傾斜角113.5°のため逆行公転
    rotationPeriodHours: 41.0,
    meanLongitudeDeg: 134.0,
    perihelionLongitudeDeg: 153.0,
    ascendingNodeLongitudeDeg: 139.38,
    scaleConfig: {
      // 近日点 0.960 AU (地球軌道付近) 〜 遠日点 51.22 AU (カイパーベルト・冥王星の外側)
      orbitRadiusPx: { inner: 560, outer: 410, tno: 240 },
      bodySizePx: { inner: 5.2, outer: 5.0, tno: 5.2 },
      isPrimaryInZone: { inner: true, outer: true, tno: true },
      isVisibleInZone: { inner: true, outer: true, tno: true },
      customDisplayEcc: { inner: 0.60, outer: 0.84, tno: 0.88 },
    },
    color: '#c4b5fd',
    accentColor: '#6d28d9',
    orbitColor: 'rgba(196, 181, 253, 0.68)',
    orbitStyle: 'comet',
    diameterKm: 26.0,
    orbitalSpeedKms: 42.5,
    temperatureInfo: '次回近日点: 2126年7月 / ペルセウス座流星群母天体',
    description:
      '毎年8月に見られる三大流星群の一つ「ペルセウス座流星群」の母天体である大型のハレー型周期彗星です。核の直径が約26 kmとハレー彗星の2倍以上あり、地球軌道付近（近日点 0.96 AU）からカイパーベルト外縁（遠日点 51.2 AU）までを約133.3年周期で逆行公転しています。',
    interiorStructure: {
      summary: '巨大炭素質クラスト（ペルセウス座流星群母天体） ＋ 始原多孔質マントル',
      layers: [
        {
          name: '巨大炭素質クラスト（ペルセウス座流星群母天体）',
          outerRadiusRatio: 1.0,
          color: '#334155',
          detail:
            '地球接近天体の中で最大の核（直径約26km・恐竜絶滅小惑星の2倍以上）を持つ超巨大彗星。夏の風物詩「ペルセウス座流星群」の濃密なダスト帯を供給しています。',
        },
        {
          name: '厚い多孔質揮発性氷マントル',
          outerRadiusRatio: 0.8,
          color: '#2dd4bf',
          detail:
            '巨大な体積に膨大な水氷・有機ガスを蓄積。約133年の公転周期で近日点（0.96 AU）に突入すると、巨大なコマと長さ数千万kmに及ぶ長大なダスト・イオン尾を発達させます。',
        },
        {
          name: '高質量原始星間ダスト・微小岩石凝集コア',
          outerRadiusRatio: 0.48,
          color: '#0e7490',
          detail:
            '彗星核としては例外的に大きな質量（約3×10¹⁵ kg）を持つ始原コア。内部中心圧力がわずかに高いため、微細な圧縮氷相がコア周辺に存在します。',
        },
      ],
    },
    moons: [],
  },
];
