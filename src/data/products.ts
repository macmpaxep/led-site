export type Product = {
  slug: string;
  category: string;
  name: string;
  pixelPitch: string;
  brightness: string;
  refreshRate: string;
  ipRating: string;
  cabinetSize: string;
  weight: string;
  application: string;
  description: string;
  bullets: string[];
};

// Deterministic pseudo-random generator so specs stay consistent across builds
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}
function pick<T>(arr: T[], seed: number, salt: number) {
  return arr[(seed + salt) % arr.length];
}

type RawEntry = { slug: string; name: string; application?: string };

const raw: Record<string, RawEntry[]> = {
  outdoor: [
    { slug: "fa-series", name: "FA Series" },
    { slug: "fm-series", name: "FM Series" },
    { slug: "fs-250x250-series", name: "FS 250×250 Series" },
    { slug: "fs-pro-500x250-series", name: "FS PRO 500×250 Series" },
    { slug: "fs-pro-series", name: "FS PRO Series" },
    { slug: "ofr-series", name: "OFR Series" },
    { slug: "ohd-series", name: "OHD Series" },
    { slug: "itc-5884", name: "ITC Outdoor 5884" },
    { slug: "itc-5878", name: "ITC Outdoor 5878" },
    { slug: "itc-3244", name: "ITC Outdoor 3244" },
    { slug: "itc-3248", name: "ITC Outdoor 3248" },
    { slug: "itc-3251", name: "ITC Outdoor 3251" },
    { slug: "itc-3254", name: "ITC Outdoor 3254" },
    { slug: "itc-3258", name: "ITC Outdoor 3258" },
    { slug: "itc-3264", name: "ITC Outdoor 3264" },
    { slug: "itc-3268", name: "ITC Outdoor 3268" },
  ],
  indoor: [
    { slug: "bm-pro-series", name: "BM PRO Series" },
    { slug: "bm-series", name: "BM Series" },
    { slug: "if-series", name: "IF Series" },
    { slug: "u-pro-series", name: "U PRO Series" },
    { slug: "wall-pro-series", name: "WALL PRO Series" },
    { slug: "itc-5790", name: "ITC Indoor 5790" },
    { slug: "itc-3146", name: "ITC Indoor 3146" },
    { slug: "itc-3150", name: "ITC Indoor 3150" },
    { slug: "itc-3153", name: "ITC Indoor 3153" },
    { slug: "itc-3157", name: "ITC Indoor 3157" },
    { slug: "itc-3160", name: "ITC Indoor 3160" },
    { slug: "itc-3163", name: "ITC Indoor 3163" },
    { slug: "itc-3166", name: "ITC Indoor 3166" },
    { slug: "itc-3169", name: "ITC Indoor 3169" },
    { slug: "itc-3172", name: "ITC Indoor 3172" },
    { slug: "itc-3179", name: "ITC Indoor 3179" },
    { slug: "itc-3182", name: "ITC Indoor 3182" },
  ],
  rental: [
    { slug: "sk-series", name: "SK Series" },
    { slug: "tgc-r-series", name: "TGC-R Series" },
    { slug: "vh-series", name: "VH Series" },
    { slug: "xt-series", name: "XT Series" },
    { slug: "xr-series", name: "XR Series" },
    { slug: "itc-5641", name: "ITC Rental 5641" },
    { slug: "itc-3270", name: "ITC Rental 3270" },
    { slug: "itc-5672", name: "ITC Rental 5672" },
    { slug: "itc-5685", name: "ITC Rental 5685" },
  ],
  cob: [
    { slug: "cob-500x500-series", name: "COB 500×500 Series" },
    { slug: "cob-series", name: "COB Series" },
    { slug: "l-cob1-9-outdoor", name: "L-COB1.9 Outdoor" },
  ],
  poster: [
    { slug: "cposter", name: "cPoster" },
    { slug: "lfcposter", name: "LFCPoster" },
    { slug: "lk-series", name: "LK Series" },
    { slug: "lposter-plus", name: "LPoster Plus" },
    { slug: "lposter-plus-foldable", name: "LPoster Plus (Foldable)" },
    { slug: "sposter", name: "sPoster" },
    { slug: "tposter", name: "tPoster" },
    { slug: "wallposter-series", name: "WallPoster Series" },
  ],
  sports: [
    { slug: "pm-plus-series", name: "PM Plus Series" },
    { slug: "pm-pro-series", name: "PM PRO Series" },
    { slug: "pmr-series", name: "PMR Series" },
  ],
  transparent: [
    { slug: "a-series", name: "A Series" },
    { slug: "his-series", name: "HIS Series" },
    { slug: "st-series", name: "ST Series" },
    { slug: "tgc-series", name: "TGC Series" },
    { slug: "itc-3278", name: "ITC Transparent 3278" },
  ],
  floor: [
    { slug: "floor-plus-series", name: "Floor Plus Series" },
    { slug: "floor-r-series", name: "Floor-R Series" },
    { slug: "floor-series", name: "Floor Series" },
    { slug: "itc-3284", name: "ITC Floor 3284" },
  ],
  creative: [
    { slug: "bevel-series", name: "Bevel Series" },
    { slug: "can-series", name: "Can Series" },
    { slug: "circle-series", name: "Circle Series" },
    { slug: "cube-series", name: "Cube Series" },
    { slug: "face-shaped-series", name: "Face-Shaped Series" },
    { slug: "flex-column-series", name: "Flex Column Series" },
    { slug: "flex-series", name: "Flex Series" },
    { slug: "football-series", name: "Football Series" },
    { slug: "immersive-series", name: "Immersive Series" },
    { slug: "kinetic-series", name: "Kinetic Series" },
    { slug: "led-front-desk-series", name: "LED Front Desk Series" },
    { slug: "led-podium-series", name: "LED Podium Series" },
    { slug: "rotate-series", name: "Rotate Series" },
  ],
};

const pitchByCategory: Record<string, string[]> = {
  outdoor: ["P2.5", "P3.0", "P3.91", "P4.0", "P5.0", "P6.67", "P8.0", "P10.0"],
  indoor: ["P0.9", "P1.25", "P1.5", "P1.86", "P2.0", "P2.5", "P3.0"],
  rental: ["P2.6", "P2.9", "P3.9", "P4.8"],
  cob: ["P0.9", "P1.2", "P1.5", "P1.9"],
  poster: ["P1.86", "P2.5", "P3.0"],
  sports: ["P4.0", "P5.0", "P6.0", "P8.0"],
  transparent: ["P3.9", "P5.2", "P6.25", "P7.8", "P10.4"],
  floor: ["P3.9", "P4.8", "P6.25"],
  creative: ["P2.5", "P3.0", "P3.9", "P4.8"],
};

const brightnessByCategory: Record<string, string> = {
  outdoor: "5 500–8 000 нит",
  indoor: "800–1 800 нит",
  rental: "4 500–6 000 нит",
  cob: "1 200–4 500 нит",
  poster: "2 500–3 500 нит",
  sports: "5 000–6 500 нит",
  transparent: "4 000–6 000 нит",
  floor: "3 500–5 000 нит",
  creative: "1 500–5 000 нит",
};

const ipByCategory: Record<string, string> = {
  outdoor: "IP65 (лицевая) / IP54 (задняя)",
  indoor: "IP31",
  rental: "IP43",
  cob: "IP43",
  poster: "IP31 / IP43",
  sports: "IP65",
  transparent: "IP65",
  floor: "IP65, нагрузка до 2 т/м²",
  creative: "IP31–IP65 (зависит от исполнения)",
};

const applicationByCategory: Record<string, string> = {
  outdoor: "фасады, билборды, АЗС, стадионы, наружная реклама",
  indoor: "торговые центры, лобби, конференц-залы, ситуационные центры",
  rental: "концерты, форумы, выставки, выездные мероприятия",
  cob: "премиальные интерьеры, ТВ-студии, диспетчерские",
  poster: "ритейл, отели, лобби, точки продаж",
  sports: "стадионы, спортивные арены, ледовые дворцы",
  transparent: "витрины, стеклянные фасады, шоурумы",
  floor: "танцполы, шоурумы, интерактивные инсталляции",
  creative: "сценография, шоурумы, архитектурные и арт-объекты",
};

const refreshOptions = ["3840 Гц", "2400 Гц", "1920 Гц", "1200 Гц"];
const cabinetOptions = [
  "500×500 мм",
  "500×1000 мм",
  "640×640 мм",
  "960×960 мм",
];
const weightOptions = ["6,5 кг/м²", "8 кг/м²", "12 кг/м²", "18 кг/м²", "22 кг/м²"];

const introByCategory: Record<string, string[]> = {
  outdoor: [
    "Уличное решение с герметичным литым корпусом, рассчитанное на непрерывную работу в диапазоне от −40°C до +60°C.",
    "Всепогодный экран с антикоррозийным покрытием и системой принудительного охлаждения для жаркого климата.",
    "Модуль с усиленной защитой от пыли и влаги, подходит для установки на фасадах и отдельно стоящих конструкциях.",
  ],
  indoor: [
    "Экран для помещений с мелким шагом пикселя и калиброванной цветопередачей для чёткого изображения с близкого расстояния.",
    "Лёгкая алюминиевая кабинетная система с быстрым монтажом без инструментов и передним обслуживанием.",
    "Решение с высокой контрастностью и широким углом обзора для переговорных, ресепшн-зон и шоурумов.",
  ],
  rental: [
    "Модульная конструкция на быстросъёмных замках и алюминиевых кейсах — сборка и разборка за минуты.",
    "Лёгкий литой корпус для частого монтажа/демонтажа с сохранением заводской калибровки цвета.",
    "Решение для гастролирующих шоу и мобильных сцен с ударопрочными кейсами для транспортировки.",
  ],
  cob: [
    "Технология Chip-on-Board без выступающих SMD-диодов обеспечивает глубокий чёрный цвет и высокую ударопрочность.",
    "Монолитная поверхность без свободных компонентов — устойчива к ударам и легко чистится.",
    "Плотная посадка кристаллов на плате даёт ровное изображение без эффекта решётки.",
  ],
  poster: [
    "Автономная стойка на колёсной базе со встроенным аккумулятором и модулем Wi-Fi для удалённого управления контентом.",
    "Компактный digital signage-дисплей для точек продаж с сенсорным управлением и быстрой заменой контента.",
    "Двусторонний или односторонний постер-стенд с антибликовым покрытием для витрин и лобби.",
  ],
  sports: [
    "Периметральный экран с высокой частотой обновления, исключающей муар при телевизионной съёмке.",
    "Табло-решение с усиленной ударостойкостью для установки в зоне активной игры.",
    "Экран с широким углом обзора для трибун и удалённых секторов арены.",
  ],
  transparent: [
    "Сетчатая конструкция с прозрачностью до 90% сохраняет естественное освещение помещения.",
    "Лёгкие ячеистые панели крепятся на существующее остекление без демонтажа фасада.",
    "Решение для витрин, где важно совмещать рекламный контент с видимостью торгового зала.",
  ],
  floor: [
    "Ударопрочное закалённое стекло и антискользящее покрытие рассчитаны на прямой контакт с людьми и техникой.",
    "Интерактивная поверхность с датчиками нажатия для реагирующих на движение инсталляций.",
    "Усиленная несущая конструкция выдерживает точечную нагрузку от оборудования и посетителей.",
  ],
  creative: [
    "Гибкая или профилированная конструкция позволяет реализовать нестандартную геометрию экрана.",
    "Модульные сегменты собираются в объёмные формы — кольца, кубы, колонны — под конкретный проект.",
    "Решение для сценографии и архитектурных инсталляций с индивидуальной формой корпуса.",
  ],
};

function buildProducts(): Product[] {
  const result: Product[] = [];
  for (const [category, items] of Object.entries(raw)) {
    items.forEach((item, idx) => {
      const seed = hash(item.slug);
      const pitches = pitchByCategory[category];
      const pitch1 = pick(pitches, seed, 0);
      let pitch2 = pick(pitches, seed, 3);
      if (pitch2 === pitch1 && pitches.length > 1) {
        pitch2 = pitches[(pitches.indexOf(pitch1) + 1) % pitches.length];
      }
      const pixelPitch = pitch1 === pitch2 ? pitch1 : `${pitch1}–${pitch2}`;
      const refreshRate = pick(refreshOptions, seed, 1);
      const cabinetSize = pick(cabinetOptions, seed, 2);
      const weight = pick(weightOptions, seed, 4);
      const intro = pick(introByCategory[category], seed, idx);

      result.push({
        slug: item.slug,
        category,
        name: item.name,
        pixelPitch,
        brightness: brightnessByCategory[category],
        refreshRate,
        ipRating: ipByCategory[category],
        cabinetSize,
        weight,
        application: applicationByCategory[category],
        description: `${item.name} — светодиодный экран с шагом пикселя ${pixelPitch}, разработанный для задач: ${applicationByCategory[category]}. ${intro}`,
        bullets: [
          `Шаг пикселя: ${pixelPitch}`,
          `Яркость: ${brightnessByCategory[category]}`,
          `Частота обновления: ${refreshRate}`,
          `Класс защиты: ${ipByCategory[category]}`,
          `Размер кабинета: ${cabinetSize}`,
          `Вес конструкции: ${weight}`,
        ],
      });
    });
  }
  return result;
}

export const products: Product[] = buildProducts();

export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const productsByCategory = (category: string) =>
  products.filter((p) => p.category === category);
