export interface CountryDetail {
  id: string;
  name: string;
  capital: string;
  continent: string;
  trivia: string;
  coords: [number, number]; // [lng, lat]
  flagCode?: string;        // ISO-2 country code
  geoStructure?: string;    // Geographical terrain
  ethnicCulture?: string;   // Ethnic & Cultural features
}

export interface DetailedRecord {
  id: string;
  coords: [number, number];
  flagCode?: string;
  en: {
    name: string;
    capital: string;
    continent: string;
    trivia: string;
    geoStructure?: string;
    ethnicCulture?: string;
  };
  zh: {
    name: string;
    capital: string;
    continent: string;
    trivia: string;
    geoStructure?: string;
    ethnicCulture?: string;
  };
  ja?: {
    name: string;
    capital: string;
    continent: string;
    trivia: string;
    geoStructure?: string;
    ethnicCulture?: string;
  };
  ko?: {
    name: string;
    capital: string;
    continent: string;
    trivia: string;
    geoStructure?: string;
    ethnicCulture?: string;
  };
}

// Map of standard country name to ISO 3166-1 alpha-2 lowercase code
export const COUNTRY_CODE_MAP: Record<string, string> = {
  // A
  "afghanistan": "af",
  "albania": "al",
  "algeria": "dz",
  "andorra": "ad",
  "angola": "ao",
  "antigua and barbuda": "ag",
  "argentina": "ar",
  "armenia": "am",
  "australia": "au",
  "austria": "at",
  "azerbaijan": "az",
  
  // B
  "bahamas": "bs",
  "bahrain": "bh",
  "bangladesh": "bd",
  "barbados": "bb",
  "belarus": "by",
  "belgium": "be",
  "belize": "bz",
  "benin": "bj",
  "bhutan": "bt",
  "bolivia": "bo",
  "bosnia and herz.": "ba",
  "bosnia and herzegovina": "ba",
  "botswana": "bw",
  "brazil": "br",
  "brunei": "bn",
  "bulgaria": "bg",
  "burkina faso": "bf",
  "burundi": "bi",
  
  // C
  "cabo verde": "cv",
  "cambodia": "kh",
  "cameroon": "cm",
  "canada": "ca",
  "central african rep.": "cf",
  "central african republic": "cf",
  "chad": "td",
  "chile": "cl",
  "china": "cn",
  "colombia": "co",
  "comoros": "km",
  "congo": "cg",
  "congo (brazzaville)": "cg",
  "dem. rep. congo": "cd",
  "democratic republic of the congo": "cd",
  "congo, dem. rep.": "cd",
  "costa rica": "cr",
  "croatia": "hr",
  "cuba": "cu",
  "cyprus": "cy",
  "n. cyprus": "cy",
  "czechia": "cz",
  "czech republic": "cz",
  "cote d'ivoire": "ci",
  "ivory coast": "ci",
  
  // D
  "denmark": "dk",
  "djibouti": "dj",
  "dominica": "dm",
  "dominican rep.": "do",
  "dominican republic": "do",
  
  // E
  "ecuador": "ec",
  "egypt": "eg",
  "el salvador": "sv",
  "equatorial guinea": "gq",
  "eq. guinea": "gq",
  "eritrea": "er",
  "estonia": "ee",
  "eswatini": "sz",
  "swaziland": "sz",
  "ethiopia": "et",
  
  // F
  "fiji": "fj",
  "finland": "fi",
  "france": "fr",
  "falkland is.": "fk",
  "falkland islands": "fk",
  
  // G
  "gabon": "ga",
  "gambia": "gm",
  "georgia": "ge",
  "germany": "de",
  "ghana": "gh",
  "greece": "gr",
  "grenada": "gd",
  "guatemala": "gt",
  "guinea": "gn",
  "guinea-bissau": "gw",
  "guyana": "gy",
  "greenland": "gl",
  
  // H
  "haiti": "ht",
  "honduras": "hn",
  "hungary": "hu",
  
  // I
  "iceland": "is",
  "india": "in",
  "indonesia": "id",
  "iran": "ir",
  "iran, islamic rep.": "ir",
  "iraq": "iq",
  "ireland": "ie",
  "israel": "il",
  "italy": "it",
  
  // J
  "jamaica": "jm",
  "japan": "jp",
  "jordan": "jo",
  
  // K
  "kazakhstan": "kz",
  "kenya": "ke",
  "kiribati": "ki",
  "kuwait": "kw",
  "kyrgyzstan": "kg",
  
  // L
  "laos": "la",
  "lao pdr": "la",
  "latvia": "lv",
  "lebanon": "lb",
  "lesotho": "ls",
  "liberia": "lr",
  "libya": "ly",
  "liechtenstein": "li",
  "lithuania": "lt",
  "luxembourg": "lu",
  
  // M
  "madagascar": "mg",
  "malawi": "mw",
  "malaysia": "my",
  "maldives": "mv",
  "mali": "ml",
  "malta": "mt",
  "marshall islands": "mh",
  "mauritania": "mr",
  "mauritius": "mu",
  "mexico": "mx",
  "micronesia": "fm",
  "moldova": "md",
  "monaco": "mc",
  "mongolia": "mn",
  "montenegro": "me",
  "morocco": "ma",
  "mozambique": "mz",
  "myanmar": "mm",
  "macedonia": "mk",
  "north macedonia": "mk",
  
  // N
  "namibia": "na",
  "nauru": "nr",
  "nepal": "np",
  "netherlands": "nl",
  "new zealand": "nz",
  "nicaragua": "ni",
  "niger": "ne",
  "nigeria": "ng",
  "norway": "no",
  "new caledonia": "nc",
  
  // O
  "oman": "om",
  
  // P
  "pakistan": "pk",
  "palau": "pw",
  "palestine": "ps",
  "panama": "pa",
  "papua new guinea": "pg",
  "paraguay": "py",
  "peru": "pe",
  "philippines": "ph",
  "poland": "pl",
  "portugal": "pt",
  "puerto rico": "pr",
  
  // Q
  "qatar": "qa",
  
  // R
  "romania": "ro",
  "russia": "ru",
  "russian federation": "ru",
  "rwanda": "rw",
  
  // S
  "saint kitts and nevis": "kn",
  "saint lucia": "lc",
  "saint vincent and the grenadines": "vc",
  "samoa": "ws",
  "san marino": "sm",
  "sao tome and principe": "st",
  "saudi arabia": "sa",
  "senegal": "sn",
  "serbia": "rs",
  "seychelles": "sc",
  "sierra leone": "sl",
  "singapore": "sg",
  "slovakia": "sk",
  "slovenia": "si",
  "solomon islands": "sb",
  "solomon is.": "sb",
  "somalia": "so",
  "somaliland": "so",
  "south africa": "za",
  "south korea": "kr",
  "korea": "kr",
  "korea, rep.": "kr",
  "south sudan": "ss",
  "s. sudan": "ss",
  "spain": "es",
  "sri lanka": "lk",
  "sudan": "sd",
  "suriname": "sr",
  "sweden": "se",
  "switzerland": "ch",
  "syria": "sy",
  "syrian arab republic": "sy",
  
  // T
  "taiwan": "tw",
  "tajikistan": "tj",
  "tanzania": "tz",
  "thailand": "th",
  "timor-leste": "tl",
  "togo": "tg",
  "tonga": "to",
  "trinidad and tobago": "tt",
  "tunisia": "tn",
  "turkey": "tr",
  "turkmenistan": "tm",
  "tuvalu": "tv",
  
  // U
  "uganda": "ug",
  "ukraine": "ua",
  "united arab emirates": "ae",
  "united kingdom": "gb",
  "united states of america": "us",
  "united states": "us",
  "uruguay": "uy",
  "uzbekistan": "uz",
  
  // V
  "vanuatu": "vu",
  "venezuela": "ve",
  "venezuela, rb": "ve",
  "vietnam": "vn",
  "viet nam": "vn",
  "w. sahara": "eh",
  "western sahara": "eh",
  
  // Y
  "yemen": "ye",
  
  // Z
  "zambia": "zm",
  "zimbabwe": "zw"
};

// Converts lowercase ISO alpha-2 code to a flag emoji Unicode character
export function getFlagEmoji(countryCode: string): string {
  if (!countryCode) return "🌐";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt(0));
  try {
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return "🌐";
  }
}

export const COUNTRY_DETAILS_DB: Record<string, DetailedRecord> = {
  "Japan": {
    id: "Japan",
    coords: [138.2529, 36.2048],
    flagCode: "jp",
    en: {
      name: "Japan",
      capital: "Tokyo",
      continent: "Asia",
      trivia: "A volcanic arc archipelago of over 6,800 islands, crowned by the majestic Mount Fuji. It represents a striking blend of ancient shrines and neon-lit futuristic technology.",
      geoStructure: "Extends in a long, narrow arc from north to south. Over 75% of the land is mountainous and hilly, with small, scattered plains concentrated along the coast (such as the Kanto Plain). Located at the boundary of plateaus, it features high volcanic and geothermal activity with hot springs nationwide.",
      ethnicCulture: "Dominated by the Yamato people. Its culture maintains a profound duality: classical arts like tea ceremony, flower arrangement, Noh theater, Kimono, and Ukiyo-e prints are meticulously preserved, alongside global leadership in modern anime, industrial design, architecture, and minimalist lifestyles."
    },
    zh: {
      name: "日本 (Japan)",
      capital: "东京 (Tokyo)",
      continent: "亚洲 (Asia)",
      trivia: "一个由6800多个岛屿组成的火山弧群岛，著名的富士山傲立其间。其古老的神社古道与霓虹闪烁的未来科技都市在这里奇妙融合。",
      geoStructure: "呈弧形狭长带状分布。山地和丘陵占全国总面积的75%以上，平原面积狭小且零碎，主要分布在沿海地区（如关东平原）。处于欧亚板块、太平洋板块等的交界地带，地壳运动异常活跃，火山温泉遍布全国。",
      ethnicCulture: "以大和族（Yamato）为主体。其文化具有强烈的双重性：一方面将传统的茶道、花道、能乐、和服、浮世绘等古典艺术保存得极其完好；另一方面在现代动漫产业、工业设计、建筑美学以及极简主义生活方式上引领全球热潮。"
    }
  },
  "Egypt": {
    id: "Egypt",
    coords: [30.8025, 26.8206],
    flagCode: "eg",
    en: {
      name: "Egypt",
      capital: "Cairo",
      continent: "Africa",
      trivia: "One of the world's oldest civilizations, traversed by the Nile—the longest river on Earth. Iconic pyramids and the Sphinx stand guard over millennia of monumental history.",
      geoStructure: "Dominated by a low, flat desert plateau, with the massive Sahara expanding across the center and west. The Nile River runs south to north, creating a narrow, fertile green strip of vital arable land, culminating in the rich Nile Delta in the north where most of the population clusters.",
      ethnicCulture: "Predominantly Egyptian Arabs. The country inherits a legacy of ancient Egyptian, Coptic Christian, and Islamic cultures. It is famous for Sufi whirling dances, vibrant spice bazaars, and holds a historic position as the cultural heart of Middle Eastern cinema, literature, and music."
    },
    zh: {
      name: "埃及 (Egypt)",
      capital: "开罗 (Cairo)",
      continent: "非洲 (Africa)",
      trivia: "人类最古老的文明发祥地之一，世界第一长河尼罗河纵贯全境。金字塔与狮身人面像默默矗立在烈日黄沙中，承载着数千年的文明史诗。",
      geoStructure: "境内绝大部分为海拔较低、平坦广阔的荒漠高原，撒哈拉沙漠横跨中西部。母亲河——尼罗河贯穿南北，在两侧沉淀出一条狭窄富饶的绿色走廊，并在北部入海口形成极其肥沃的扇形三角洲平原，养育了全国的大多数人口。",
      ethnicCulture: "主体为埃及阿拉伯人。传承着辉煌的古埃及、科普特基督文明与伊斯兰文化多重烙印，拥有独特的传统苏菲转圈舞、香料集市商道。现代埃及亦是中东地区的电影、文学和音乐文化中心。"
    }
  },
  "Iceland": {
    id: "Iceland",
    coords: [-19.0208, 64.9631],
    flagCode: "is",
    en: {
      name: "Iceland",
      capital: "Reykjavík",
      continent: "Europe",
      trivia: "A land of ice and fire. It is home to massive active glaciers, breathtaking aurora displays, geothermal lagoons, and sputtering hot geysers.",
      geoStructure: "Situated on the tectonic plate boundary of the Mid-Atlantic Ridge. The terrain consists of lava plateaus, black sand beaches, basalt columns, glacial lakes, and deep coastal fjords. It features hundreds of volcanoes, active hot springs, and geyser pools, with ice caps covering 11% of the land.",
      ethnicCulture: "Mainly Icelanders of Norse Viking descent. The culture has a strong literary heritage centered on medieval Sagas. A widespread belief in land spirits (Huldufólk) coexists with modern global leadership in indie music, progressive design, and eco-friendly geothermal energy."
    },
    zh: {
      name: "冰岛 (Iceland)",
      capital: "雷克雅未克 (Reykjavík)",
      continent: "欧洲 (Europe)",
      trivia: "名副其实的“冰与火之国”。这里既有覆盖全境的冰雪巨川、绚丽多姿的北极极光，又有翻腾喷薄的活火山、热气腾腾的地热温泉。",
      geoStructure: "位于大西洋中脊板块生长边界之上。地貌由火山熔岩高原、黑色沙滩、玄武岩柱、冰川湖泊和深邃的峡湾海岸构成。境内有上百座活火山和不计其数的地热喷气孔、间歇泉（Geysir），冰盖占国土面积的11%。",
      ethnicCulture: "主要是冰岛人，源自古代维京拓荒者。当地极为看重著名的《萨迦传说》（Sagas）等中世纪文学遗存。冰岛人深信风灵与大自然精灵的传说，现代社会在音乐、先锋设计和清洁地热生活上充满无尽创意。"
    }
  },
  "Australia": {
    id: "Australia",
    coords: [133.7751, -25.2744],
    flagCode: "au",
    en: {
      name: "Australia",
      capital: "Canberra",
      continent: "Oceania",
      trivia: "The only country spanning an entire continent, hosting the Great Barrier Reef. Its vast Outback plains, red soils, and rare marsupials like koalas and kangaroos make its ecosystem unique.",
      geoStructure: "Remarkably flat and arid overall. The Great Dividing Range runs down the east coast, while the flat central lowlands host the Lake Eyre basin. The west is a vast, ancient shield of red sand deserts, salt lakes, and dry shrubs.",
      ethnicCulture: "Home to the world's oldest continuous living culture—Indigenous Australians—whose 'Dreamtime' spiritual concepts and rock art endure today. Modern Australian life is multicultural, shaped by global immigration, beach surfing customs, premium coffee culture, and backyard barbecues."
    },
    zh: {
      name: "澳大利亚 (Australia)",
      capital: "堪培拉 (Canberra)",
      continent: "大洋洲 (Oceania)",
      trivia: "独占一整块大陆的独特国度，拥有全球最大的珊瑚礁群——大堡礁。这里的旷野原野红土和考拉、袋鼠等独特有袋类物种让其自成一体。",
      geoStructure: "地势整体平坦、干旱。东部高耸着纵贯南北的大分水岭，中部的低地平原是著名的北艾尔湖盆地，西部则是辽阔单调的红土高原和广袤的荒漠平原。气候干燥，内陆拥有标志性的深红色“Outback”盆地景观。",
      ethnicCulture: "拥有世界上连续存在时间最长的文化——澳大利亚原住民（Indigenous Australians），其“梦幻时代”（Dreamtime）万物灵感信仰和红土岩画保存至今。现代社会由来自世界各地的多元移民共同构建，户外咖啡文化、海滩冲浪以及后院烧烤（Barbeque）文化深入人心。"
    }
  },
  "Brazil": {
    id: "Brazil",
    coords: [-51.9253, -14.2350],
    flagCode: "br",
    en: {
      name: "Brazil",
      capital: "Brasília",
      continent: "South America",
      trivia: "The largest country in South America, home to the immense Amazon Rainforest—known as the lungs of the planet. Captivating samba rhythms and legendary football define its lively culture.",
      geoStructure: "Defined by two prominent geological zones: the low, flat Amazon Basin in the north with the world's largest river network and rain forests, and the extensive, rolling Brazilian Highlands in the south. The climate is primarily tropical, supporting massive biological diversity.",
      ethnicCulture: "A vibrant melting pot of Portuguese colonial foundations, African traditions, and indigenous heritage, leading to a highly inclusive, mixed cultural identity. The annual Rio Carnival showcases spectacular samba parades, while football represents a deep national passion."
    },
    zh: {
      name: "巴西 (Brazil)",
      capital: "巴西利亚 (Brasília)",
      continent: "南美洲 (South America)",
      trivia: "覆盖近半壁南美版图的巨无霸，蕴藏着“地球之肺”亚马逊热带雨林。热情洋溢的桑巴舞曲和星光耀眼的足球，在此谱写出充满色彩的生活交响。",
      geoStructure: "自然地理格局非常清晰：北部是辽阔、低平、河流纵横的亚马逊平原，属于全球最大的亚马逊河集水流域；南部则是平缓开阔的多雨巴西高原。热带季风与雨林气候主导，水热资源极其充沛，丛林生态极其繁复多样。",
      ethnicCulture: "由葡萄牙移民文化、非洲黑奴后裔以及土著印第安传统相互碰撞融合而成，是一个种族混血极其生动包容的国度。每年举世瞩目的狂欢节大游行（Carnival）以羽毛服饰和热烈的桑巴节拍征服世界，足球运动在这更是一种国家信仰。"
    }
  },
  "Canada": {
    id: "Canada",
    coords: [-106.3468, 56.1304],
    flagCode: "ca",
    en: {
      name: "Canada",
      capital: "Ottawa",
      continent: "North America",
      trivia: "The second-largest country by land area, boasting the rugged Rocky Mountains, pristine subarctic wilderness, and thousands of turquoise glacial lakes.",
      geoStructure: "Framed by the majestic Cordilleran mountain chains in the west, flat agricultural prairies in the center, and the ancient, rocky Canadian Shield and Appalachian mountains in the east. The north reaches into the Arctic Ocean with vast boreal forests and tundra.",
      ethnicCulture: "Maintains a dual English and French linguistic heritage and promotes a strong multicultural ethos. Ice hockey is a beloved national sport. Indigenous totem art, maple syrup harvesting, and an active appreciation for wilderness preservation are key pillars of Canadian identity."
    },
    zh: {
      name: "加拿大 (Canada)",
      capital: "渥太华 (Ottawa)",
      continent: "北美洲 (North America)",
      trivia: "世界国土面积第二大国。这里布满了落基山脉的挺拔峰林、哈得孙湾的北极冰原以及数以万记的蓝松石色冰川湖泊，枫叶在此流光溢溢。",
      geoStructure: "西临陡峭俊秀的太平洋科迪勒拉山系（落基山脉），中部横亘着辽阔坦荡的平原，东侧则是古老的阿巴拉契亚山脉与无数侵蚀冰川期过后的淡水湖群。北部直插北冰洋，有无边无际的寒带针叶林和冻土苔原带。",
      ethnicCulture: "奉行宽容的双语（英语与法语）文化和多元文化主义政策。冰球（Ice Hockey）在此被奉为国球；西海岸印第安原住民的图腾柱（Totem Poles）文化、春季采集枫糖浆工艺、以及对户外露营和环保荒野保护的由衷热爱是其文化核心。"
    }
  },
  "South Africa": {
    id: "South Africa",
    coords: [22.9375, -30.5595],
    flagCode: "za",
    en: {
      name: "South Africa",
      capital: "Pretoria",
      continent: "Africa",
      trivia: "Occupying the southernmost tip of Africa where the Atlantic and Indian Oceans meet, crowned by Table Mountain and celebrated for its wild savannas teeming with lions and elephants.",
      geoStructure: "Features a vast elevated interior plateau surrounded by a steep escarpment (the Drakensberg mountains) that slopes down to narrow coastal plains. The southwest has a Mediterranean climate, transitioning to arid bushes in the northwest and subtropical conditions in the east.",
      ethnicCulture: "Acclaimed as the 'Rainbow Nation' celebrating 11 official languages. It blends deep indigenous Zulu and Xhosa tribal legacies with Afrikaner, British, and South Asian immigrant influences. Renowned for South African jazz, Braai barbecues, and cultural integration."
    },
    zh: {
      name: "南非 (South Africa)",
      capital: "比勒陀利亚 (Pretoria)",
      continent: "非洲 (Africa)",
      trivia: "坐落于非洲大陆的最南端。这里拥抱大西洋与印度洋的狂暴海流，不仅有雄伟高耸的桌山，也是野生狮、象自由奔驰的原野天堂。",
      geoStructure: "境内以辽阔的高原地形为主，四周被陡峭的大陡崖（德拉肯斯堡山脉）所环绕，向外陡降为狭窄的沿海平原。西南部属于多山多风的地中海气候区，东北部则过渡为热帶草原与干燥低地，好望角扼守两大洋交汇海域。",
      ethnicCulture: "被誉为多元交融的“彩虹之国”（Rainbow Nation），拥有11种法定的官方语言。完美将原住民祖鲁人、科萨人的古老部落传统，与早期荷兰（阿非利卡人）、英国移民文化，及印度劳工印记相融合，南非爵士乐和传统Braai烤肉聚会享誉世界。"
    }
  },
  "China": {
    id: "China",
    coords: [104.1954, 35.8617],
    flagCode: "cn",
    en: {
      name: "China",
      capital: "Beijing",
      continent: "Asia",
      trivia: "An ancient civilizational state stretching from the Roof of the World (Himalayas) to the Pacific Ocean. Its Great Wall, ancient Silk Road, and rich cultural achievements have influenced history for millennia.",
      geoStructure: "Structured in three broad geographical steps: the high Qinghai-Tibet Plateau in the west (averaging above 4000m from which major rivers flow); a central step of basins and plateaus (Sichuan Basin, Loess Plateau); and fertile alluvial plains and hills in the east leading to the coast.",
      ethnicCulture: "Centered on Han culture alongside 55 ethnically distinct minority groups. It features historical tea arts, Peking opera, calligraphy, traditional lunar calendars, and deep regional cuisines (such as the Eight Culinary Traditions) loved worldwide."
    },
    zh: {
      name: "中国 (China)",
      capital: "北京 (Beijing)",
      continent: "亚洲 (Asia)",
      trivia: "拥有数千年不曾中断的华夏古国。西起世界屋脊喜马拉雅，东到浩瀚太平洋。长城古迹蜿蜒山脉，运河丝路连结中西，文化灿若星河。",
      geoStructure: "地势西高东低，呈明显的三级阶梯状分布：第一级为平均海拔4000米以上的青藏高原，是冰川和长江、黄河大河源头；第二级为辽阔的主体高原与大型盆地（内蒙古高原、四川盆地）；第三级为万水奔流的富饶冲积平原和沿海丘陵带。",
      ethnicCulture: "以汉族为主体，与五十五个少数民族共同组成多元一体的中华民族大家庭。拥有历史悠久的茶道文化、京剧艺术、水墨书法、传统农历节庆与二十四节气。中国各地区极其差异化的博大烹饪菜系（八大菜系）早已在全球落地开花。"
    }
  },
  "France": {
    id: "France",
    coords: [2.2137, 46.2276],
    flagCode: "fr",
    en: {
      name: "France",
      capital: "Paris",
      continent: "Europe",
      trivia: "A global beacon of philosophy, Enlightenment, haute couture, and art. Highlighted by rolling lavender fields, gothic cathedrals, and classic Seine-side cafés representing timeless European romance.",
      geoStructure: "Slopes down from the high Alps and Jura mountains in the east and the Pyrenees in the south towards extensive northwestern plains and agricultural basins. Flanked by beautiful oceanic coastlines featuring both cliffs and beaches.",
      ethnicCulture: "A global epicenter of luxury fashion, classical literature, and fine arts. Celebrated for the 'Art de vivre' (art of living), world-leading culinary techniques, Michelin dining, and wine-making traditions."
    },
    zh: {
      name: "法国 (France)",
      capital: "巴黎 (Paris)",
      continent: "欧洲 (Europe)",
      trivia: "欧洲美学、启蒙、哲学与艺术的浪漫地标。薰衣草漫山遍野，哥特式教堂建筑蔚为壮观，巴黎塞纳河畔的咖啡香和香颂乐曲让人流连忘返。",
      geoStructure: "地势整体西北低、东南高。西北部是平坦的平原与丘陵，东部与南部为起伏的山地地带。",
      ethnicCulture: "以高雅时尚、精致美食品味、葡萄酒酿造与自由平等的启蒙人文精神闻名于世。"
    },
    ja: {
      name: "フランス (France)",
      capital: "パリ (Paris)",
      continent: "ヨーロッパ (Europe)",
      trivia: "哲学、啓蒙思想、オートクチュール、そして美術の黄金時代を築き上げた美の首都。ラベンダー畑、ゴシック聖堂、セーヌ川のほとりのカフェがロマンを語ります。",
      geoStructure: "東のアルプス山脈・ジュラ山脈や南のピレネー山脈の険しい山地から、北西部に向かって広大なパリ盆地となだらかなアキテーヌ盆地へと傾斜しています。険しい崖と美しい砂浜からなる長い沿岸線も特徴です。",
      ethnicCulture: "ラグジュアリーファッション、古典文学、そして美術の中心地。フランスに伝わる「アール・ド・ヴィーヴル（人生の美学）」のもと、ミシュランガイドの洗練された宮廷料理技術、高貴なワイン醸造が息づいています。"
    },
    ko: {
      name: "프랑스 (France)",
      capital: "파리 (Paris)",
      continent: "유럽 (Europe)",
      trivia: "철학, 계몽사상, 오트쿠튀르 패션, 인류 회화 미술의 찬란한 전설을 품은 미학의 성지입니다. 프로방스의 보랏빛 라벤더 들녘과 센 가의 카페 선율이 로맨스를 자아냅니다.",
      geoStructure: "동쪽의 우뚝 솟은 알프스 산맥과 남쪽 피레네 국경 장벽에서 북서쪽 방향의 완만하고 광활한 파리 분지와 아키텐 곡창지대로 점차 낮아집니다. 절벽과 고운 해변이 번갈아 나타나는 대서양 연안 해안선이 유명합니다.",
      ethnicCulture: "인류 패션, 서양 문학, 조형 예술의 최고 황금 기지입니다. 프렌치 '살아가는 기술(Art de vivre)' 존중 철학 아래, 전 세계를 지배하는 독창적인 소스 요리 공정, 미슐랭 아카데미, 클래식 와인 발효 과학이 빛납니다."
    }
  },
  "India": {
    id: "India",
    coords: [78.9629, 20.5937],
    flagCode: "in",
    en: {
      name: "India",
      capital: "New Delhi",
      continent: "Asia",
      trivia: "A land of incredible diversity, stretching from the Himalayas to the Indian Ocean. Its ancient temples, vibrant festivals like Diwali, and world-famous cuisine reflect a rich cultural heritage.",
      geoStructure: "Features the towering Himalayan range in the north, the fertile Indo-Gangetic Plains in the middle, and the ancient peninsular Deccan Plateau in the south. Flanked by deserts in the west and lengthy coastlines in the east.",
      ethnicCulture: "A kaleidoscope of religions, languages, and dance forms. Famous for classical music and classical dances, historical monuments like the Taj Mahal, intricate textiles, and spices."
    },
    zh: {
      name: "印度 (India)",
      capital: "新德里 (New Delhi)",
      continent: "亚洲 (Asia)",
      trivia: "一个多元文化极具冲击力的国度，从高耸的喜马拉雅山脉一直延伸到热带印度洋。熙熙攘攘的市集与雄伟的泰姬陵见证了这片土地的历史沧桑。",
      geoStructure: "北部是高高耸立的喜马拉雅山防线；中部是肥沃平坦、人口稠密的恒河平原（Indo-Gangetic Plain）；南部则是古老、呈倒三角形的德干高原。西侧有塔尔沙漠，长达数千公里的海岸线合围于印度洋。",
      ethnicCulture: "宗教信仰、地方方言和舞蹈流派交相辉映。拥有名扬天下的洒红节与排灯节盛典，以手织莎丽服饰、繁复的印度红茶与香料咖喱料理、以及宝莱坞电影早已席卷整个蓝星。"
    },
    ja: {
      name: "インド (India)",
      capital: "ニューデリー (New Delhi)",
      continent: "アジア (Asia)",
      trivia: "ヒマラヤ山脈からインド洋にまで広がる、人々に衝撃を与えるほどの多様性の国。古の寺院、光の祭りディワリ、そして芳醇なスパイスカルチャーが織りなす万華鏡のような魅力が溢れます。",
      geoStructure: "北部の天険ヒマラヤ山脈、中部の人口密集が著しい肥沃なインダス・ガンジス平原、そして南部に広がる太古의 역삼각형 모양의 데칸 고원이 전개됩니다. 서쪽에는 타르 사막과 동쪽 해안선 수계가 있습니다.",
      ethnicCulture: "多宗教、多数の言語、古典舞踊。タージマハルの極致のイスラーム建築、サラリ絹織物工芸、芳醇なマサラ紅茶や香り豊かなカレー料理、そしてボリウッド映画産業が世界に名を馳せています。"
    },
    ko: {
      name: "인도 (India)",
      capital: "뉴델리 (New Delhi)",
      continent: "아시아 (Asia)",
      trivia: "히말라야 만년설에서 무더운 인도양으로 향하는, 세상에서 가장 다채롭고 감각적인 색채를 지닌 문명의 다각 구역입니다. 대서사 타지마할이 이를 감쌉니다.",
      geoStructure: "북쪽을 가로막은 철벽 히말라야 장막 아래로 영양 가득한 인더스-갠지스 대평원이 흐르며, 남쪽으로는 오래된 역삼각형 모양의 드넓은 데칸 고원이 전개됩니다. 서쪽에는 타르 사막과 동쪽 해안선 수계가 있습니다.",
      ethnicCulture: "종교 신앙의 원천이며 수십 종의 지역 문자와 무도파가 존재합니다. 가공할 공예 전통, 타지마할 성지, 화려한 사리 로브 의상, 스파이스 카레, 세상을 정복한 발리우드 영화가 매혹적입니다."
    }
  }
};

// Returns nice fallback info if country is not in the curated DB, resolved into requested language
export function getCountryMeta(name, lang = 'en') {
  const normName = (name || "").trim();
  const lowerName = normName.toLowerCase();
  
  if (normName && Object.prototype.hasOwnProperty.call(COUNTRY_DETAILS_DB, normName)) {
    const record = COUNTRY_DETAILS_DB[normName];
    const data = (lang && record[lang]) || record['en'];
    return {
      id: record.id || normName,
      name: normName,
      capital: "Unknown",
      continent: "Unknown",
      trivia: "",
      coords: record.coords || [0, 0],
      flagCode: record.flagCode,
      ...data
    };
  }

  // Look up flag code from standard mapping
  let flagCode = COUNTRY_CODE_MAP[lowerName] || "";
  
  if (!flagCode) {
    const cleanLowerName = lowerName.replace(/\s*\(.*\)\s*/g, "").trim();
    flagCode = COUNTRY_CODE_MAP[cleanLowerName] || "";
    
    if (!flagCode) {
      const matchedKey = Object.keys(COUNTRY_CODE_MAP).find(key => {
        if (key.length <= 3) return false;
        return cleanLowerName.includes(key) || key.includes(cleanLowerName);
      });
      if (matchedKey) {
        flagCode = COUNTRY_CODE_MAP[matchedKey];
      }
    }
  }

  const lengthSeed = name.length;
  
  let cap = "";
  let cont = "";
  let trivia = "";
  let geoStructure = "";
  let ethnicCulture = "";

  if (lang === 'en') {
    const capitals = ["Metropolis Hub", "Coastal Anchorage", "Central District", "Ancient Citadel", "Alpine Stronghold", "Oasis Outpost"];
    cap = capitals[lengthSeed % capitals.length];
    
    const continents = ["Asia", "Europe", "Africa", "Americas", "Oceania"];
    cont = continents[(lengthSeed * 3) % continents.length];
    
    trivia = `This region is part of the global geo-coordinate matrix. Floating inside the orbital sphere, it features resonant ambient chimes upon activation and forms an essential part of human geography.`;
    
    geoStructure = "A diverse topographic zone featuring moderate flatlands, rolling hills, and rich water basins adapting dynamically to seasonal shifts.";
    ethnicCulture = "Inhabited by welcoming local communities keeping alive centuries-old folk celebrations, traditional craftsmanship, and unique music styles.";

    if (cont.includes("Asia")) {
      geoStructure = "A vast geologic terrain containing ancient high mountain ranges, arid semi-desert plateaus, and highly fertile alluvial river valleys.";
      ethnicCulture = "Rich multi-ethnic tapestry. Celebrated for time-honored family guilds, agricultural grain rites, and distinctive string and percussion instruments.";
    } else if (cont.includes("Europe")) {
      geoStructure = "Dominated by mild continental forests, fertile agricultural basins, rolling glacial hills, and deep inlet coastlines with numerous lakes.";
      ethnicCulture = "Influenced deeply by classical literature and mythology. Famed for ancient stone castles, master watchmaking, and lively seasonal street fairs.";
    } else if (cont.includes("Africa")) {
      geoStructure = "An expansive landscape of savannah plains, historic red soil ridges, active rift faults, and ancient oasis networks supporting rich wildlife.";
      ethnicCulture = "Composed of many traditional tribes. Maintains a close harmony with nature, famous for lively drumming rhythms, symbolic mask arts, and oral storytelling.";
    } else if (cont.includes("Americas")) {
      geoStructure = "Features long sandy shorelines in the east, massive volcanic mountain ranges in the west, and sprawling interior grasslands and river valleys.";
      ethnicCulture = "A vibrant integration of indigenous ancestry and historical immigration. Known for cowboy pioneer spirit, jazz, and diverse street festivals.";
    } else if (cont.includes("Oceania")) {
      geoStructure = "Formed by coral reef atolls, high volcanic peaks, and stunning underwater shelf ecosystems with uniquely evolved isolated species.";
      ethnicCulture = "Descends from legendary seafarers. Renowned for celestial star navigation, ocean reverence, delicate woodcarvings, and tribal songs of natural wonders.";
    }
  } else if (lang === 'ja') {
    const capitals = ["首都圏要塞", "海岸の都", "中央地区", "古の衛城", "高山要塞", "オアシス拠地"];
    cap = capitals[lengthSeed % capitals.length];
    
    const continents = ["アジア (Asia)", "ヨーロッパ (Europe)", "アフリカ (Africa)", "アメリカ (Americas)", "オセアニア (Oceania)"];
    cont = continents[(lengthSeed * 3) % continents.length];
    
    trivia = `この国・地域は地球の座標空間に位置しています。クリックして座標をロックすると、心地よい響きの和音チャイムが鳴り響き、独自の歴史・地理データを楽しむことができます。`;
    
    geoStructure = "平野、緩やかな丘陵地帯、豊かな河川流域からなり、緯度や季節の移り変わりに応じて様々な美しい自然景観が生み出されます。";
    ethnicCulture = "何世代にもわたり独自の言語や民俗、美しい手芸工芸、活気あるお祭りを大切に保存・継承してきた温かい地域コミュニティです。";

    if (cont.includes("アジア")) {
      geoStructure = "雄大な山脈、乾燥した高原、そして河川沿いの肥沃な平野が広がり、極めて豊かな生態系と古い地質が特徴です。";
      ethnicCulture = "多彩な言語と民族が交唱する地。家族や農耕を重んじる美しい礼俗に加え、魅惑的な伝統楽器や伝統的な家庭料理など、豊かな伝統文化が息づいています。";
    } else if (cont.includes("ヨーロッパ")) {
      geoStructure = "なだらかな森林平原や氷河期由来の丘陵、そして海岸沿いに複雑に入り組んだ入江や湖沼が点在しています。";
      ethnicCulture = "古典的な遺産と神話が美しく織りなす地。何世紀もの歴史を見守る石造りの城、精密な時計や伝統的な醸造技術、賑やかな季節の街頭市などが市民に愛されています。";
    } else if (cont.includes("アフリカ")) {
      geoStructure = "果てしなく広がる熱帯サバンナ平原、特徴的な赤土、壮大なリフトバレー、オアシスがあり、野生動物の宝庫です。";
      ethnicCulture = "何百もの伝統的な部族が自然と共生する地。力強い手鼓のビート、情熱的なマスク（仮面）舞踊、文字を持たず口頭で紡がれてきた口承文学が今も脈々と受け継がれています。";
    } else if (cont.includes("アメリカ")) {
      geoStructure = "東海岸 of 伸びやかな砂浜、西部の雄大な火山山脈、そして内陸部に広がる草原や広大な河川が多様な気候区を形成しています。";
      ethnicCulture = "先住民の遺産と移民の文化が美しく融合した色彩豊かな地。開拓者精神溢れる音楽、陽気なジャズやサンバ、情熱的な伝統祭典が有名です。";
    } else if (cont.includes("オセアニア")) {
      geoStructure = "紺碧のサンゴ礁、高聳する火山島、そしてユニークな生態系を持つ島々からなり、独自の固有種が多く生息しています。";
      ethnicCulture = "伝説の航海士たちの末裔。天体観測による航海術、海洋への崇拝、精巧な木彫り細工や豊かな波の歌が今も語り継がれています。";
    }
  } else if (lang === 'ko') {
    const capitals = ["수도권 요새", "해안의 도시", "중앙 지구", "고대 요새", "고산 요새", "오아시스 거점"];
    cap = capitals[lengthSeed % capitals.length];
    
    const continents = ["아시아 (Asia)", "유럽 (Europe)", "아프리카 (Africa)", "아메리카 (Americas)", "오세아니아 (Oceania)"];
    cont = continents[(lengthSeed * 3) % continents.length];
    
    trivia = `이 국가 및 지역은 글로벌 좌표계에 위치해 있습니다. 클릭하여 좌표를 고정하면 아름다운 화음 차임벨이 울려 퍼지며, 그 지역 특유의 흥미진진한 지리 백과 정보를 불러옵니다.`;
    
    geoStructure = "평온한 평원과 완만한 카르스트 丘陵, 그리고 젖줄과 같은 강의 유역들로 이루어져 풍요로운 자연 경관과 계절에 따른 매력적인 대자연의 변천사 뒤에 숨겨진 입체적인 지형을 연출합니다.";
    ethnicCulture = "오랜 정적과 환희의 나날 속에서 독창적인 민속 축제, 고유한 전통 공예 기술, 그리고 마음을 치유하는 따뜻한 민요와 춤을 정성스럽게 보존하고 계승해 나가는 따뜻한 공동체입니다.";

    if (cont.includes("아시아")) {
      geoStructure = "웅장한 고대 습곡 산맥과 건조하고 광활한 고원 지대, 그리고 농경에 최적화된 비옥한 강가의 충적 대평원이 공존하는 풍요롭고 역사 깊은 대지입니다.";
      ethnicCulture = "수많은 민족과 고유 언어가 함께 노래하는 찬란한 문화의 교차로. 가족과 공동체의 조화를 소중히 하며, 전통 악기 선율과 맛깔스럽고 다양한 음식 문화가 일상 곳곳에 녹아 있습니다.";
    } else if (cont.includes("유럽")) {
      geoStructure = "온화한 활엽수림 평원과 부드러운 빙하 언덕, 그리고 해안을 따라 깊숙이 자리 잡은 빙하 협만과 수많은 호수들이 동화 같은 풍경을 만들어냅니다.";
      ethnicCulture = "고전 예술과 인류 역사 신화의 영감이 구석구석 깃든 문화의 고향. 수백 년 된 정교한 유럽 석조 성들과 정교한 가공 기술, 그리고 아름다운 클래식 음악과 활기찬 골목 축제가 모두에게 사랑받습니다.";
    } else if (cont.includes("아프리카")) {
      geoStructure = "드넓은 열대 사바나와 인상적인 붉은 대지, 웅장한 지구대 및 평화로운 오아시스가 조화를 이루고 있어, 다채로운 생명체들이 대자연의 생태계를 이룹니다.";
      ethnicCulture = "수많은 고유 부족들이 자연의 모든 생물과 완벽한 조화를 이루며 공생하고 있습니다. 열정적인 가죽 부족 드럼 비트, 화려하고 상징적인 가면 댄스, 깊은 울림의 서사 요가 내려오는 축복받은 지혜의 땅입니다.";
    } else if (cont.includes("아메리카")) {
      geoStructure = "동쪽의 가없는 온화한 해안 평야와 중서부에 우뚝 솟은 장엄한 화산 습곡 산맥, 그리고 내륙에 펼쳐진 거대한 대평원과 열대 빗방울 물줄기가 극적인 대자연을 연출합니다.";
      ethnicCulture = "고대 아메리카 인디언 뿌리와 세계 전역에서 유입된 다원화된 이민 문화가 깊고 역동적으로 통합된 하모니의 땅. 재즈, 록, 카우보이 개척 정신이 활기를 뱁니다.";
    } else if (cont.includes("오세아니아")) {
      geoStructure = "푸른 바다와 산호초, 우뚝 솟은 화산섬 등 경이로운 해양 보물들로 구획되어 있으며, 고유하게 고립 진화된 귀중하고 신비한 동식물 군락을 품고 있습니다.";
      ethnicCulture = "전설적인 바다인들의 후예. 천체 별자리 관측 항해술에 지극히 능숙하며, 바다에 경의를 표하며 정성스럽게 새긴 독특한 문신과 섬세한 양식의 목공예, 아름다운 자연 전승 가요를 보존하고 있습니다.";
    }
  } else if (lang === 'zh') {
    const capitals = ["首府要塞", "海滨之城", "中心城区", "古老卫城", "高山要地", "枢纽绿洲"];
    cap = capitals[lengthSeed % capitals.length];
    
    const continents = ["亚洲 (Asia)", "欧洲 (Europe)", "非洲 (Africa)", "美洲 (Americas)", "大洋洲 (Oceania)"];
    cont = continents[(lengthSeed * 3) % continents.length];
    
    trivia = `该国家/地区处于全球宏大的地理坐标格网上。点击可在其坐标中心引发和谐共鸣声，它是地球生态拼图与多元人类社会不可分割的一部分。`;
    
    geoStructure = "该地区地形多姿。地表以温和的平原、绵延的喀斯特丘陵与丰富的河流灌溉流域共同组成，气候特征与生态景观根据季节纬度自然交替转换。";
    ethnicCulture = "这里生活着世代传承的多元民族群体。当地居民以热情好客闻名，延续着古老的节庆习俗、独特的地方手工艺技术以及别开生面的民间音乐艺术。";

    if (cont.includes("亚洲")) {
      geoStructure = "这里地貌辽阔，汇聚了壮丽的群山褶皱、干旱开阔的高原半草原荒漠以及肥沃的冲积农业大平原，水系密集，地质构造极其古老而稳定。";
      ethnicCulture = "多民族多语言交织。当地人保留着悠久的家族氏族契约、特色的茶米农耕礼俗，拥有华丽丰富的传统织物工艺和独树一帜的丝竹敲击民间音乐。";
    } else if (cont.includes("欧洲")) {
      geoStructure = "多为辽阔平坦的温带阔叶森林平原、平缓起伏的冰川碎石丘陵，沿海分布着交错纵深的峡湾海湾，淡水湖泊成群分布。";
      ethnicCulture = "融合了经典的古典文艺神话色彩。极极具历史感的石雕城堡、精巧繁复的手工制表或酿造工艺、以及充满仪式感的节庆、古典戏剧与街头市集深受人们喜爱。";
    } else if (cont.includes("非洲")) {
      geoStructure = "地跨广阔的热带稀树大草原、标志性的红土台地、壮观的裂谷断层以及古老的河流干涸绿洲，野生动植物物种极为丰沛。";
      ethnicCulture = "拥有数以百计的历史部落氏族。崇尚与大自然万物共生，以极富节奏感的兽皮手鼓弹奏、奔放的图腾面具舞蹈和古老繁茂的口头史诗传承著称。";
    } else if (cont.includes("美洲")) {
      geoStructure = "东临漫长的温和海滩平原，中西部高耸着连绵的高山褶皱与雄浑 of 红岩峡谷，亦有无边无际的温带草原和热带雨林水网。";
      ethnicCulture = "是由古老土著印第安根基与大量海外移民深度融合的多元化移民融合地。牛仔开拓风、摇滚桑巴节奏、各类街头艺术交融出极强的活力。";
    } else if (cont.includes("大洋洲")) {
      geoStructure = "由蔚蓝 of 环礁海岛群 or 高耸的火山岛地貌构成，环绕着极其瑰丽斑斓的珊瑚礁群落，拥有奇特封闭演化的独特海岛动物物种。";
      ethnicCulture = "原住民航海世家。精通星象潮汐与独木舟竞渡，崇拜海洋与风暴神明，以独具魅力的文身刺青艺术、木雕雕刻和战舞歌谣传唱名扬海外。";
    }
  } else {
    // Fallback for any language without dedicated localized content yet
    // (fr, ms, ar, it, id, th, es, pt, es-MX): show English consistently,
    // matching the behavior used elsewhere in the app for untranslated content.
    const capitals = ["Metropolis Hub", "Coastal Anchorage", "Central District", "Ancient Citadel", "Alpine Stronghold", "Oasis Outpost"];
    cap = capitals[lengthSeed % capitals.length];

    const continents = ["Asia", "Europe", "Africa", "Americas", "Oceania"];
    cont = continents[(lengthSeed * 3) % continents.length];

    trivia = `This region is part of the global geo-coordinate matrix. Floating inside the orbital sphere, it features resonant ambient chimes upon activation and forms an essential part of human geography.`;

    geoStructure = "A diverse topographic zone featuring moderate flatlands, rolling hills, and rich water basins adapting dynamically to seasonal shifts.";
    ethnicCulture = "Inhabited by welcoming local communities keeping alive centuries-old folk celebrations, traditional craftsmanship, and unique music styles.";

    if (cont.includes("Asia")) {
      geoStructure = "A vast geologic terrain containing ancient high mountain ranges, arid semi-desert plateaus, and highly fertile alluvial river valleys.";
      ethnicCulture = "Rich multi-ethnic tapestry. Celebrated for time-honored family guilds, agricultural grain rites, and distinctive string and percussion instruments.";
    } else if (cont.includes("Europe")) {
      geoStructure = "Dominated by mild continental forests, fertile agricultural basins, rolling glacial hills, and deep inlet coastlines with numerous lakes.";
      ethnicCulture = "Influenced deeply by classical literature and mythology. Famed for ancient stone castles, master watchmaking, and lively seasonal street fairs.";
    } else if (cont.includes("Africa")) {
      geoStructure = "An expansive landscape of savannah plains, historic red soil ridges, active rift faults, and ancient oasis networks supporting rich wildlife.";
      ethnicCulture = "Composed of many traditional tribes. Maintains a close harmony with nature, famous for lively drumming rhythms, symbolic mask arts, and oral storytelling.";
    } else if (cont.includes("Americas")) {
      geoStructure = "Features long sandy shorelines in the east, massive volcanic mountain ranges in the west, and sprawling interior grasslands and river valleys.";
      ethnicCulture = "A vibrant integration of indigenous ancestry and historical immigration. Known for cowboy pioneer spirit, jazz, and diverse street festivals.";
    } else if (cont.includes("Oceania")) {
      geoStructure = "Formed by coral reef atolls, high volcanic peaks, and stunning underwater shelf ecosystems with uniquely evolved isolated species.";
      ethnicCulture = "Descends from legendary seafarers. Renowned for celestial star navigation, ocean reverence, delicate woodcarvings, and tribal songs of natural wonders.";
    }
  }

  return {
    id: normName,
    name: normName,
    capital: cap,
    continent: cont,
    trivia,
    coords: [0, 0],
    flagCode: flagCode || undefined,
    geoStructure,
    ethnicCulture
  };
}
