import React from 'react';

// Extended details for landmarks (localized in English and Chinese)
export interface LandmarkDetail {
  id: string;
  nameEn: string;
  nameZh: string;
  countryEn: string;
  countryZh: string;
  coords: [number, number]; // [lng, lat]
  type: 'city' | 'nature' | 'heritage';
  descEn: string;
  descZh: string;
  chronicleEn: string;
  chronicleZh: string;
  terrainEn: string;
  terrainZh: string;
  cultureEn: string;
  cultureZh: string;
}

export const LANDMARK_DETAILS_DB: Record<string, LandmarkDetail> = {
  "Kyoto Temple Hub": {
    id: "kyoto",
    nameEn: "Kyoto Temple Hub",
    nameZh: "京都古寺禅意核心区",
    countryEn: "Japan",
    countryZh: "日本",
    coords: [135.7681, 35.0116],
    type: "heritage",
    descEn: "A city of ancient wooden temples, Zen stone gardens, and towering imperial bamboo forests.",
    descZh: "由古老木质殿宇、禅宗枯山水石庭与挺拔竹林环绕的历史都城。",
    chronicleEn: "Serving as Japan's imperial capital for over a millennium, Kyoto holds thousands of classical Buddhist temples and Shinto shrines. Built in master woodcraft without nails, they stand as symbols of architectural longevity and spiritual harmony.",
    chronicleZh: "作为日本一千多年的帝都，京都完好保存了数千座古老的寺院与神社。其精湛的隼牟木工工艺无一颗铁钉，展现了极其高超的历史耐久度，是东方建筑和精神和谐的崇高丰碑。",
    terrainEn: "Nestled in a scenic mountain basin in the western portion of Honshu island, sheltered by towering cedar groves and winding crystalline rivers.",
    terrainZh: "坐落于本州岛西部优美的群山盆地之中，周围翠绿葱郁的杉树高林耸立，清澈的鸭川、桂川等河流潺潺绕城而流。",
    cultureEn: "Focal center of tea ceremonies, geisha traditions, kaiseki dinner gastronomy, and pure Zen gardens summarizing the impermanence of nature.",
    cultureZh: "日本茶道、艺伎文化、怀石料理与枯山水禅庭的核心地带。枯山水的细沙碎石叠痕寓意着山河江海，在极简中体现禅定与生命无常的哲理。"
  },
  "Great Giza Plateau": {
    id: "giza",
    nameEn: "Great Giza Plateau",
    nameZh: "吉萨金字塔高原",
    countryEn: "Egypt",
    countryZh: "埃及",
    coords: [31.1342, 29.9792],
    type: "heritage",
    descEn: "Home of the Great Pyramids and the Sphinx standing watch over smooth orange Saharan sands.",
    descZh: "世界八大奇迹之首的胡夫金字塔、卡夫拉金字塔与狮身人面像傲立的地方。",
    chronicleEn: "Dating back over 4,500 years to the Old Kingdom's Fourth Dynasty, these limestone behemoths represent monumental achievements in stellar alignment, ancient maths, and sheer engineering grit under the desert sun.",
    chronicleZh: "建于4500多年前古埃及第四王朝时期。这些重达数百万吨的巨石建筑群，在天文星宿对齐、精密数学比率与不朽的工程搬运力量上，刻画了人类最古老的史恒神迹。",
    terrainEn: "Flat, dry limestone plateau on the fringes of the immense Sahara desert, bordered by the green, fertile valley of the lifegiving Nile River.",
    terrainZh: "位于撒哈拉沙漠东部边缘开阔、干燥的吉萨石灰岩台地上，紧邻奔流不息、孕育了数千年农业奇迹的尼罗河绿色河谷平原。",
    cultureEn: "Interwoven with early sun worshipping, starry pharaonic mummification beliefs, sand caravans, and tales of cosmic eternity.",
    cultureZh: "与古老的太阳神崇拜、奥西里斯冥界复活信仰、法老陵寝密码密切相连。荒漫风沙、落日驼队，无声述说着人类直面永恒时所倾注的恢弘想象。"
  },
  "Reykjavík Rift": {
    id: "reykjavik",
    nameEn: "Reykjavík Rift",
    nameZh: "雷克雅未克地质裂谷",
    countryEn: "Iceland",
    countryZh: "冰岛",
    coords: [-21.9426, 64.1466],
    type: "nature",
    descEn: "Active geothermal vents, cascading waterfalls, and basalt column layers near the sub-arctic boundary.",
    descZh: "处于亚寒带边界，拥有沸腾的地热喷泉、宏伟的玄武岩陡峭裂谷以及极光穹顶。",
    chronicleEn: "Located directly atop the Mid-Atlantic Ridge where the North American and Eurasian tectonic plates drift apart. Massive fissures, thermal mud pools, and lava tunnels expose the fiery core of our planet.",
    chronicleZh: "恰好跨越在大西洋中脊之上，北美各大板块与欧亚板块在此剧烈撕裂漂移，拉扯出深深的裂痕。壮美的熔岩空洞、喷气孔以及地底滚水展现了地球内部跃动的地核火光。",
    terrainEn: "Basalt volcanic fields and glaciers. Hot springs, dramatic black volcanic sand beaches, and sheer canyon dropoffs shaped by fire and ice.",
    terrainZh: "布满黑褐色玄武岩火山碎屑和冷白冰川。地热蒸汽升腾在荒芜寂静的高原上，黑沙滩与地狱熔岩犬牙交错，是真正的水火相融之境。",
    cultureEn: "Influenced by ancient Norse sagas, legends of hidden elves, thermal bathing rituals, and sustainable clean volcanic geothermal power networks.",
    cultureZh: "深受古老的北欧维京萨迦文学叙事感怀。民间至今流传着隐形精灵的魔幻传说。温泉沐浴是极富生活诗意的日常社交仪式，其地热清洁能源网络更居世界前沿。"
  },
  "New York Estuary": {
    id: "newyork",
    nameEn: "New York Estuary",
    nameZh: "纽约哈德逊河口湾",
    countryEn: "United States",
    countryZh: "美国",
    coords: [-74.0060, 40.7128],
    type: "city",
    descEn: "Bustling coastal modern metropolis layered with islands, suspension bridges, and towering steel grids.",
    descZh: "熙攘繁华的现代巨无霸滨海大都市，布满岛屿、宏大悬索桥和耸入云端的摩天钢骨。",
    chronicleEn: "Formed in an ancient glaciated harbor estuary, New York became a global node of finance, immigration, and skyscrapers. Art Deco pillars and postmodern glass canyons frame a historical gateway of world culture.",
    chronicleZh: "发源于冰川侵蚀形成的深水河口湾，逐渐发展为全球金融、移民潮与摩天大楼的巅峰中枢。从克莱斯勒、帝国大厦的装饰艺术精髓到后现代的玻璃冰峰峡谷，构筑了世界之城的立面。",
    terrainEn: "A series of mainland peninsulas and natural sediment islands surrounded by the deep waters of the Hudson River and Atlantic ocean.",
    terrainZh: "一连串被哈德逊河、东河以及浩瀚大西洋深水拥抱的半岛与冲积群岛，地下基岩雄厚结实，承受着巨型建筑的巍峨重量。",
    cultureEn: "A sprawling melting pot of jazz, Broadway theater, street fashion, neon lights, yellow cabs, and the undying quest for liberty.",
    cultureZh: "包罗万象的全球移民大熔炉。百老汇歌剧的绚烂霓虹、街头爵士嘻哈、经典黄出租车流，与高举火炬的自由女神像，共同谱写出都市自由与梦想的金色华章。"
  },
  "Sydney Harbour": {
    id: "sydney",
    nameEn: "Sydney Harbour",
    nameZh: "悉尼杰克逊海港湾",
    countryEn: "Australia",
    countryZh: "澳大利亚",
    coords: [151.2093, -33.8688],
    type: "city",
    descEn: "A grand, dramatic natural harbor, featuring overlapping sail shell structures and sandy bays.",
    descZh: "宏伟优美的天然深阔海湾，最瞩目的是如白色风帆般层叠舒展的歌剧院风骨。",
    chronicleEn: "Named Port Jackson, this flooded river valley boasts some of the world's finest harbor engineering, centered on the architectural triumph of Jørn Utzon's Opera House and the Sydney Harbour arch bridge completed in 1932.",
    chronicleZh: "原名杰克逊港，是一座典型的溺谷型海湾。拥有杰出的现代航海建树，最耀眼的是丹麦建筑师约恩·乌松执笔的歌剧院“贝壳贝雕”风帆，与1932年通车的、浑厚雄健的悉尼海港大桥相映成辉。",
    terrainEn: "Drowned river valley landscape with highly complex sandstone cliffs, branching scenic coves, and pristine golden-sand swimming beaches.",
    terrainZh: "溺谷型复杂岸线，两岸由亿万年砂岩绝壁绝岭和无数个翠绿口袋般的支流海湾组成，金黄色沙滩沿太平洋海风连绵铺开。",
    cultureEn: "Outdoor sailing culture, Aboriginal shell-gathering heritages, beachfront salt-pools, and spectacular world-famous New Year fireworks displays.",
    cultureZh: "深受太平洋暖流沐浴的户外帆船冲浪文化。蕴含当地达鲁格（Darug）原住民数万载海湾生活的贝壳沉积遗产。海港大桥的新年盛大极光烟火每年点亮全球报晓时刻。"
  },
  "Amazon Headwaters": {
    id: "amazon",
    nameEn: "Amazon Headwaters",
    nameZh: "亚马逊热带雨林源头",
    countryEn: "Brazil",
    countryZh: "巴西",
    coords: [-63.9039, -8.7619],
    type: "nature",
    descEn: "The dense pristine rainforest lung of South America, threaded by vast serpentine river sediment basins.",
    descZh: "南美洲原始神秘的绿色之肺，纵横交错着蜿蜒如巨蟒般的亚马逊大河水系。",
    chronicleEn: "Forming the most biologically diverse tropical forest on Earth, this region basin pumps a significant fraction of ocean water cycle and oxygen, harboring flora and fauna still fully untouched by human modern footprints.",
    chronicleZh: "地球上生物多样性最繁盛的热带雨林盆地。通过极其茂密的多层森林冠层，向大气释放巨大比例的水汽循环和氧气，其中隐藏着大量至今仍未被现代文明探索过的新奇动植物物种。",
    terrainEn: "Immense, flat tropical basin covered in multi-layered dense jungle canopy, inundated floodplains, and looping clay-colored rivers.",
    terrainZh: "辽阔平坦、一望无际的低洼盆地。遮天蔽日的数层丛林树冠、季节性洪水淹没地以及泛着泥沙养分的黄竭色循环大河和沼泽丛林。",
    cultureEn: "Deep Indigenous knowledge of medicinal plants, forest spirituality, jaguar myths, and eco-sustainability dialogues.",
    cultureZh: "蕴藏着亚马逊土著部落世代相传的萨满草药与自然之灵哲学。极具野性崇拜的美洲豹图腾文化，也是当今全球气候变迁和生态保卫的核心殿堂。"
  },
  "Cape of Good Hope": {
    id: "cape",
    nameEn: "Cape of Good Hope",
    nameZh: "好望角险绝半岛",
    countryEn: "South Africa",
    countryZh: "南非",
    coords: [18.4241, -33.9249],
    type: "nature",
    descEn: "Scenic coastal clifftops where ocean currents gather, creating strong waves and misty shorelines.",
    descZh: "耸立在大西洋与印度洋交汇边缘的险峻绝壁海角，长年风云激荡、海浪滔天。",
    chronicleEn: "Originally named 'Cape of Storms' by Portuguese discoverer Bartolomeu Dias in 1488, it marked a historic shipping link and geographical milestone connecting European trade directly to the legendary Indian Ocean.",
    chronicleZh: "由葡萄牙航海家迪亚士于1488年首次发现并命名为“风暴角”，后由葡萄牙国王改名为“好望角”。它是大航海时代连接大西洋与神秘印度洋的辉煌海洋地标，开启了世界贸易的新航道。",
    terrainEn: "High geological table-mountain sandstone cliffs plunging vertically into the swirling turquoise surf of the Southern oceans.",
    terrainZh: "属于亿万年砂岩桌山群地貌。高耸陡峭的嶙峋崖壁垂直扎入汹涌幽蓝的海中，两股冷暖洋流在这里剧烈对撞，掀起漫天白浪和迷蒙海雾。",
    cultureEn: "Maritime lore of the phantom ship 'Flying Dutchman', classic hillside lighthouses, and rare local penguin beaches.",
    cultureZh: "航海史上传闻已久的幽灵船“飞翔的荷兰人”的灵异发源地。崖顶洁白红顶的历史灯塔照亮惊涛黑夜，山下海滩更聚居着珍稀的极简非洲斑点企鹅。"
  },
  "Svalbard Outpost": {
    id: "svalbard",
    nameEn: "Svalbard Outpost",
    nameZh: "斯瓦尔巴北极孤哨",
    countryEn: "Norway",
    countryZh: "挪威",
    coords: [15.6469, 78.2232],
    type: "nature",
    descEn: "Glacier-capped jagged mountains, polar night skies, and the secure global seed vault.",
    descZh: "冰川常年覆盖的锯齿雪山，极夜之光和深藏于永久冻土层下的世界末日种子库。",
    chronicleEn: "Under the international Svalbard Treaty, this high-arctic archipelago serves as a peaceful base for global science. Tucked in the permafrost, the Global Seed Vault protects billions of crop variations for humanity's future resource seeds.",
    chronicleZh: "依据1920年签署的斯瓦尔巴国际条约，这片主权属挪威的高纬群岛被定为绝对和平非军事科研区。藏进零下18度冻土岩石深处的“末日种子库”守护着全人类庄稼赖以重生的基因库。",
    terrainEn: "Extreme cold desert tundra, dynamic glaciers sliding into fjords, floating pack-ice, and barren shale mountaintops.",
    terrainZh: "严酷干极的北极高寒荒漠苔原。两壁幽深的峡湾里不时有冰川崩塌滑入海中，布满浮冰的极地洋面和常年不化的冰盖覆岩拔地而起。",
    cultureEn: "Polar bear warning protocols, husky dogsledding traditions, coal mine ruins, and absolute northern-lights research centers.",
    cultureZh: "出门随身携带防熊具的安全协议，充满野性的哈士奇雪橇。随处可见的历史废弃煤矿木架遗迹，以及纯净无光污染的物理高空极光科研。"
  },
  "Tibet High Plateau": {
    id: "tibet",
    nameEn: "Tibet High Plateau",
    nameZh: "青藏高原极高佛地",
    countryEn: "China",
    countryZh: "中国",
    coords: [91.1172, 29.6524],
    type: "nature",
    descEn: "The roof of the world, adorned with serene glaciated mountain peaks and massive high lakes.",
    descZh: "平均海拔超4000米的“世界屋脊”，高挂着圣洁雪峰、翠蓝圣湖与布达拉宫巍峨白红墙。",
    chronicleEn: "Rising as the geological collision zone between the Indian and Eurasian tectonic plates. Home to Lhasa's 1,300-year-old Potala Palace, an architectural marvel built cascading down the red-rock hillside.",
    chronicleZh: "发源于印度板块与亚欧大陆板块数百万年来的巨型推挤抬升。矗立着一千三百多年历史的拉萨布达拉宫——其在红山上依山势垒砌而起，红白双宫层层高耸，气势绝伦。",
    terrainEn: "High-altitude cold mountain terrain, frozen snow peaks (including the Himalayas), thin air, and crystal clear lakes mirroring the cosmic blue skies.",
    terrainZh: "极高海拔的荒野与高原草甸。喜马拉雅山脉雄伟白头，含氧量仅为平原的一半，水晶般的玛旁雍错、纳木错倒映着纯净深邃的宇宙藏青天穹。",
    cultureEn: "Vibrant ancient Tibetan temple chants, hand-spun yak wool, colorful fluttering prayer flags, and deep inner mindfulness practices.",
    cultureZh: "寺院内不绝于耳、让人灵魂宁静的嗡嗡低唱。雪白牦牛与五彩风马旗。藏族同胞一步一叩首的长途朝圣，浸润着极深的藏秘佛理与慈悲心观。"
  },
  "Rio de Janeiro Bay": {
    id: "rio",
    nameEn: "Rio de Janeiro Bay",
    nameZh: "里约热内卢瓜纳巴拉湾",
    countryEn: "Brazil",
    countryZh: "巴西",
    coords: [-43.1729, -22.9068],
    type: "city",
    descEn: "Lush green granite peaks hugging broad, golden sandy beaches and sweeping turquoise bays.",
    descZh: "碧波万顷的天然海湾，雄奇的基督山与面包山紧贴着金色滚滚细沙的海滩。",
    chronicleEn: "Flanked by the colossal Art Deco statue of Christ the Redeemer completed in 1931 on the Corcovado peak. The scenery merges dramatic mountain peaks directly with bustling ocean waves, earning a UNESCO World Heritage listing.",
    chronicleZh: "1931年落成的世界最大摩登饰面艺术（Art Deco）基督雕像耸立在710米高的科科瓦多山（Christ Mountain）巅，双臂迎风舒展守护全城。奇拔的砂岩丛林与大洋波涛直接接壤，载入世界自然遗产名录。",
    terrainEn: "Granite coastal monolith mountains (inselbergs) rising steeply out of scenic ocean bays, bordered by pristine sandy beaches (Copacabana).",
    terrainZh: "陡峭耸立、由绿色雨林藤蔓包裹的独块花岗岩孤峰群直接拔海而起，环抱着弧线丰饶的 Copacabana、Ipanema 等宽阔天然沙滩海湾。",
    cultureEn: "Energetic samba percussion, world-famous colorful Carnival, bossa nova guitar chords, and spectacular beachside football matches.",
    cultureZh: "充满南美蓬勃生命张力的桑巴狂欢舞曲。悠闲微风中舒展开来的波萨诺瓦（Bossa Nova）清脆木吉他琴声，与沙滩上赤足飞扬的足球盛景。"
  },
  "Great Wall of China": {
    id: "greatwall",
    nameEn: "Great Wall of China",
    nameZh: "万里长城边关要塞",
    countryEn: "China",
    countryZh: "中国",
    coords: [116.5704, 40.4319],
    type: "heritage",
    descEn: "Ancient high-ridge stone fortress walls undulating across northern mountains.",
    descZh: "蜿蜒盘旋在崇山峻岭之间的坚固砖石军事御守屏障与历史丰碑。",
    chronicleEn: "Constructed across dynasties to shield against northern dry steppe raids, the Great Wall stretches over thousands of kilometers. Built from stone, brick, and tamped earth, it is a magnificent symbol of imperial defense and endurance.",
    chronicleZh: "始建于周秦时期，历经多代王朝修筑。这一由坚固城砖与绝险关隘连接而成的宏伟工程横跨崇山，不仅是古代地缘御敌体系的巅峰，更代表了中华民族生生不息、坚韧不拔的意志。",
    terrainEn: "Plunging ravines and steep, serrated mountain ridges of northern parts, cloaked in misty winds and seasonal forests.",
    terrainZh: "坐落于华北陡峭蜿蜒的燕山与太行山脉之巅，下临深壑、峰峦叠嶂。云雾缭绕于古松砖石之间，随四季风景变化，苍茫壮丽。",
    cultureEn: "Infused with folklore of border watchtowers, beacon smoke fire communication, Silk Road trades, and timeless cultural unity.",
    cultureZh: "承载了烽火台通信、守关将士诗篇、丝绸之路商贸往来的深厚积淀。是历史时空长河里守卫和平、连通天下的人类工程杰作。"
  },
  "Burj Khalifa Tower": {
    id: "burjkhalifa",
    nameEn: "Burj Khalifa Tower",
    nameZh: "迪拜哈利法塔",
    countryEn: "United Arab Emirates",
    countryZh: "阿联酋",
    coords: [55.2741, 25.1972],
    type: "city",
    descEn: "The world's tallest spiraling silver spire rising out of the Arabian sands.",
    descZh: "直插云霄的世界第一高楼，沙漠之中的后现代银色钢铁花朵。",
    chronicleEn: "Soaring to a height of 828 meters, this structural triumph mimics the Hymenocallis desert flower. Utilizing a high-strength reinforced concrete core, it is a global monument displaying engineering excellence.",
    chronicleZh: "高耸达828米，以沙漠之花蜘蛛兰（Hymenocallis）的花瓣网格为灵感。坚固的Y形三瓣式结构核心筒支撑其刺破天穹，代表了二十一世纪人类工程与超高层科技的巅峰创造。",
    terrainEn: "Coastal desert plains overlooking the deep turquoise Arabian Gulf, flanked by futuristic metropolis blocks.",
    terrainZh: "矗立在波斯湾东岸开阔温暖 of 沙漠咸水滩及繁华绿洲地带，下方是纵横交织的多阶水道与璀璨城景。",
    cultureEn: "Modern visionary design, skydeck astronomical reflections, and dramatic dancing fountain spectacles.",
    cultureZh: "极速、先锋与未来的同义词。塔下的全球最大音乐喷泉及夺目的灯光秀，将一汪清水与耀眼极光化作照亮中东夜空的不夜神话。"
  },
  "Petronas Twin Towers": {
    id: "petronas",
    nameEn: "Petronas Twin Towers",
    nameZh: "吉隆坡双子塔",
    countryEn: "Malaysia",
    countryZh: "马来西亚",
    coords: [101.7119, 3.1578],
    type: "city",
    descEn: "Iconic twin stainless steel skyscrapers linked by a skybridge over a tropical park.",
    descZh: "对称咬合的双子星摩天塔，由高空天桥连接，融合传统伊斯兰几何美学。",
    chronicleEn: "Completed in 1998, these 452-meter high steel-and-glass icons incorporate Islamic geometric star patterns, symbolizing Malaysia's entry into the high-tech millennium.",
    chronicleZh: "落成于1998年，高达452米。设计巧妙结合了经典的八角伊斯兰星徽几何构图，在不锈钢和双层中空玻璃的反射下，宛如两座镶嵌在热带雨林中的璀璨双子水晶纪念碑。",
    terrainEn: "Lush humid tropical river basin valley backdrop encircled by sweeping rain canopy forests.",
    terrainZh: "盆地平原核心。四周椰风林立，气候温暖湿润，塔底环抱十余公顷郁郁葱葱、由巴西设计巨匠谱写的都市中央自然生态绿肺。",
    cultureEn: "Islamic architectural geometry blends with ultra-modern office skylines and vibrant equatorial botanical designs.",
    cultureZh: "交织着现代高新技术与传统伊斯兰星纹美学，塔间高悬的空中双层步行桥代表着未来连接之桥，在赤道骄阳下焕发勃勃生机。"
  }
};

// ==========================================
// LANDMARK MINIMALIST SVG ILLUSTRATIONS
// Style: Crisp lines, stroke='#4A463F', highlights stroke='#C25B4E', fill and texture='#8C7A6B'
// ==========================================

interface ArtProps {
  id: string;
  className?: string;
  width?: number;
  height?: number;
}

export const LandmarkArt: React.FC<ArtProps> = ({ id, className = "", width = 280, height = 180 }) => {
  const commonStroke = "#4A463F";
  const accentStroke = "#C25B4E";
  const detailColor = "#8C7A6B";
  
  switch (id) {
    case "kyoto":
      return (
        <svg viewBox="0 0 280 180" width={width} height={height} className={`${className} transition-all duration-300`}>
          {/* Grid back lines */}
          <line x1="20" y1="90" x2="260" y2="90" stroke={commonStroke} strokeWidth="0.5" strokeDasharray="3 5" opacity="0.3" />
          <circle cx="140" cy="90" r="60" stroke={commonStroke} strokeWidth="0.5" strokeDasharray="2 4" opacity="0.2" fill="none" />
          
          {/* Japanese rising sun disk background accent */}
          <circle cx="180" cy="70" r="28" stroke={accentStroke} strokeWidth="1" strokeDasharray="6 3" fill="none" opacity="0.4" />
          <circle cx="180" cy="70" r="16" fill={accentStroke} opacity="0.08" />
          
          {/* Pagoda Spire */}
          <line x1="140" y1="20" x2="140" y2="150" stroke={commonStroke} strokeWidth="1.5" />
          <circle cx="140" cy="24" r="2" fill={detailColor} />
          <circle cx="140" cy="30" r="3" stroke={commonStroke} strokeWidth="1" fill="none" />
          <circle cx="140" cy="36" r="3.5" stroke={commonStroke} strokeWidth="1" fill="none" />
          <circle cx="140" cy="42" r="4" stroke={commonStroke} strokeWidth="1.5" fill="none" />
          
          {/* Pagoda Layer 3 (Top) */}
          <path d="M 125 55 L 140 45 L 155 55 L 150 70 L 130 70 Z" fill="#F4F0EA" stroke={commonStroke} strokeWidth="1.2" />
          <path d="M 118 70 C 122 68, 125 68, 128 72 C 135 68, 145 68, 152 72 C 155 68, 158 68, 162 70" fill="none" stroke={commonStroke} strokeWidth="1.5" />
          
          {/* Pagoda Layer 2 (Middle) */}
          <rect x="127" y="72" width="26" height="20" fill="#FCFAF6" stroke={commonStroke} strokeWidth="1" />
          <line x1="134" y1="72" x2="134" y2="92" stroke={commonStroke} strokeWidth="0.8" />
          <line x1="146" y1="72" x2="146" y2="92" stroke={commonStroke} strokeWidth="0.8" />
          <path d="M 112 95 C 118 92, 122 92, 126 97 C 135 93, 145 93, 154 97 C 158 92, 162 92, 168 95" fill="none" stroke={commonStroke} strokeWidth="1.5" />
          
          {/* Pagoda Layer 1 (Bottom) */}
          <rect x="124" y="97" width="32" height="25" fill="#FAF8F5" stroke={commonStroke} strokeWidth="1.2" />
          {/* Pagoda golden wooden doors */}
          <rect x="135" y="107" width="10" height="15" fill="#EAE5DC" stroke={accentStroke} strokeWidth="1" />
          <line x1="140" y1="107" x2="140" y2="122" stroke={accentStroke} strokeWidth="0.5" />
          <path d="M 104 122 C 112 118, 118 118, 124 125 C 135 120, 145 120, 156 125 C 162 118, 168 118, 176 122" fill="none" stroke={commonStroke} strokeWidth="1.5" />
          
          {/* Base structure & platform */}
          <rect x="121" y="125" width="38" height="15" fill="#EAE5DC" stroke={commonStroke} strokeWidth="1" />
          <line x1="110" y1="140" x2="170" y2="140" stroke={commonStroke} strokeWidth="2" />
          <line x1="80" y1="148" x2="200" y2="148" stroke={commonStroke} strokeWidth="1.2" />
          
          {/* Torii Gate on the side (small, crisp) */}
          <g transform="translate(65, 110)">
            <line x1="0" y1="38" x2="0" y2="4" stroke={commonStroke} strokeWidth="1.5" />
            <line x1="15" y1="38" x2="15" y2="4" stroke={commonStroke} strokeWidth="1.5" />
            <line x1="-4" y1="10" x2="19" y2="10" stroke={commonStroke} strokeWidth="1" />
            {/* Curved Torii head rail */}
            <path d="M -6 4 C -3 2, 4 1, 7 1 C 11 1, 18 2, 21 4" fill="none" stroke={accentStroke} strokeWidth="2" />
          </g>

          {/* Minimal Hanging Bamboo Leaves */}
          <path d="M 230 40 C 220 45, 205 40, 200 32 M 225 41 C 215 50, 210 55, 198 52 M 235 39 C 240 50, 235 58, 222 55" fill="none" stroke={detailColor} strokeWidth="1" />
          <line x1="250" y1="20" x2="215" y2="44" stroke={detailColor} strokeWidth="1" />

          {/* Coordinate grid text */}
          <text x="25" y="155" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">N 35°01'16"</text>
          <text x="210" y="155" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">E 135°76'8"</text>
        </svg>
      );
    case "giza":
      return (
        <svg viewBox="0 0 280 180" width={width} height={height} className={`${className} transition-all duration-300`}>
          {/* Compass grid lines */}
          <line x1="140" y1="20" x2="140" y2="160" stroke={commonStroke} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.2" />
          <circle cx="140" cy="115" r="55" stroke={detailColor} strokeWidth="0.5" strokeDasharray="3 5" opacity="0.2" fill="none" />
          
          {/* Scorching sun rays */}
          <circle cx="70" cy="50" r="16" fill="none" stroke={accentStroke} strokeWidth="1" strokeDasharray="4 2" />
          <circle cx="70" cy="50" r="10" fill="none" stroke={accentStroke} strokeWidth="1" />
          <line x1="70" y1="30" x2="70" y2="24" stroke={accentStroke} strokeWidth="1" />
          <line x1="70" y1="70" x2="70" y2="76" stroke={accentStroke} strokeWidth="1" />
          <line x1="50" y1="50" x2="44" y2="50" stroke={accentStroke} strokeWidth="1" />
          <line x1="90" y1="50" x2="96" y2="50" stroke={accentStroke} strokeWidth="1" />
          
          {/* Pyramid 1: Great Pyramid of Khufu (Central, Large) */}
          <g transform="translate(45, 0)">
            {/* Lit side */}
            <polygon points="95,135 45,135 95,65" fill="#FAF8F5" stroke={commonStroke} strokeWidth="1.2" />
            {/* Shaded side using fine horizontal lines */}
            <polygon points="95,135 135,135 95,65" fill="#EAE5DC" stroke={commonStroke} strokeWidth="1.2" />
            {/* Shading strokes */}
            <line x1="95" y1="75" x2="101" y2="75" stroke={detailColor} strokeWidth="0.5" />
            <line x1="95" y1="85" x2="107" y2="85" stroke={detailColor} strokeWidth="0.5" />
            <line x1="95" y1="95" x2="113" y2="95" stroke={detailColor} strokeWidth="0.5" />
            <line x1="95" y1="105" x2="119" y2="105" stroke={detailColor} strokeWidth="0.5" />
            <line x1="95" y1="115" x2="125" y2="115" stroke={detailColor} strokeWidth="0.5" />
            <line x1="95" y1="125" x2="131" y2="125" stroke={detailColor} strokeWidth="0.5" />
          </g>
          
          {/* Pyramid 2: Khafre (Left, medium backdrop) */}
          <g transform="translate(15, 10)">
            <polygon points="65,125 25,125 65,75" fill="#FCFAF6" stroke={commonStroke} strokeWidth="1" />
            <polygon points="65,125 95,125 65,75" fill="#EAE5DC" stroke={commonStroke} strokeWidth="1" />
            {/* Back Shading */}
            <line x1="65" y1="85" x2="71" y2="85" stroke={detailColor} strokeWidth="0.5" opacity="0.7" />
            <line x1="65" y1="95" x2="77" y2="95" stroke={detailColor} strokeWidth="0.5" opacity="0.7" />
            <line x1="65" y1="105" x2="83" y2="105" stroke={detailColor} strokeWidth="0.5" opacity="0.7" />
            <line x1="65" y1="115" x2="89" y2="115" stroke={detailColor} strokeWidth="0.5" opacity="0.7" />
          </g>

          {/* Pyramid 3: Menkaure (Right, small backdrop) */}
          <g transform="translate(155, 25)">
            <polygon points="35,110 5,110 35,80" fill="#FCFAF6" stroke={commonStroke} strokeWidth="1" />
            <polygon points="35,110 55,110 35,80" fill="#E2DDD5" stroke={commonStroke} strokeWidth="1" />
            <line x1="35" y1="88" x2="40" y2="88" stroke={detailColor} strokeWidth="0.5" />
            <line x1="35" y1="96" x2="46" y2="96" stroke={detailColor} strokeWidth="0.5" />
            <line x1="35" y1="104" x2="51" y2="104" stroke={detailColor} strokeWidth="0.5" />
          </g>

          {/* Ground Horizon sand dunes */}
          <path d="M 20 135 Q 90 142, 140 135 T 260 135" fill="none" stroke={commonStroke} strokeWidth="1.5" />
          <path d="M 15 145 C 80 148, 170 152, 265 142" fill="none" stroke={detailColor} strokeWidth="0.8" strokeDasharray="3 3" />
          
          {/* Subtle camel silhouettes (dotted cute outlines on left dune) */}
          <g transform="translate(35, 128)" opacity="0.75">
            {/* Camel 1 */}
            <path d="M 0 5 H 2 Q 4 1, 5 3 Q 7 2, 9 5 H 11 L 11 8 M 2 8 L 2 11 M 9 8 L 9 11" stroke={commonStroke} strokeWidth="0.8" fill="none" />
            {/* Camel 2 */}
            <path d="M 15 6 H 17 Q 19 2, 20 4 Q 22 3, 24 6 H 26 L 26 9 M 17 9 L 17 11.5 M 24 9 L 24 11.5" stroke={commonStroke} strokeWidth="0.8" fill="none" />
          </g>

          {/* Coordinate labels */}
          <text x="25" y="160" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">N 29°97'9"</text>
          <text x="210" y="160" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">E 31°13'4"</text>
        </svg>
      );
    case "reykjavik":
      return (
        <svg viewBox="0 0 280 180" width={width} height={height} className={`${className} transition-all duration-300`}>
          {/* Polar circular grids */}
          <circle cx="140" cy="90" r="70" stroke={commonStroke} strokeWidth="0.5" strokeDasharray="4 8" opacity="0.15" fill="none" />
          
          {/* Northern Lights (Aurora Borealis) flowing neon lines */}
          <path d="M 30 50 Q 80 75, 140 40 T 250 60" fill="none" stroke={accentStroke} strokeWidth="1" strokeDasharray="10 4" opacity="0.5" />
          <path d="M 35 40 Q 90 60, 145 28 T 245 42" fill="none" stroke={accentStroke} strokeWidth="0.7" strokeDasharray="3 3" opacity="0.45" />
          
          {/* Geothermal smoke columns */}
          <path d="M 85 105 Q 81 90, 86 75 T 82 55" fill="none" stroke={detailColor} strokeWidth="0.8" strokeDasharray="2 3" />
          <path d="M 145 110 Q 148 95, 142 80 T 146 60" fill="none" stroke={detailColor} strokeWidth="0.8" strokeDasharray="2 3" />
          <path d="M 195 115 Q 191 100, 196 85 T 193 65" fill="none" stroke={detailColor} strokeWidth="0.8" strokeDasharray="2 3" />

          {/* Basalt column formations (layered crystals) */}
          <g transform="translate(60, 95)" stroke={commonStroke} strokeWidth="1" fill="#FAF8F5">
            {/* Column 1 */}
            <polygon points="10,40 20,40 20,15 10,15" />
            <polygon points="20,40 20,15 25,10 25,35" strokeWidth="0.8" fill="#EAE5DC"/>
            
            {/* Column 2 (Taller) */}
            <polygon points="20,40 32,40 32,5 20,5" />
            <polygon points="32,40 32,5 39,0 39,35" strokeWidth="0.8" fill="#EAE5DC"/>

            {/* Column 3 (Thick) */}
            <polygon points="32,40 45,40 45,18 32,18" />
            <polygon points="45,40 45,18 51,12 51,35" strokeWidth="0.8" fill="#EAE5DC" />

            {/* Column 4 (Tectonic fissure split) */}
            <polygon points="58,40 70,40 70,22 58,22" fill="#FCFAF6" />
            <polygon points="70,40 70,22 76,17 76,35" fill="#E2DDD5" />
            
            {/* Column 5 */}
            <polygon points="70,40 82,40 82,8 70,8" fill="#FCFAF6" />
            <polygon points="82,40 82,8 88,3 88,35" fill="#E2DDD5" />
          </g>

          {/* Deep magma/glowing tectonic rift lines */}
          <path d="M 20 135 L 115 135 L 123 145 L 260 145" fill="none" stroke={commonStroke} strokeWidth="1.5" />
          <path d="M 115 135 L 123 145" fill="none" stroke={accentStroke} strokeWidth="2.5" />
          <path d="M 110 138 L 128 138" fill="none" stroke={accentStroke} strokeWidth="1" strokeDasharray="3 2" />

          {/* Coordinate readings */}
          <text x="25" y="160" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">N 64°14'6"</text>
          <text x="210" y="160" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">W 21°94'2"</text>
        </svg>
      );
    case "newyork":
      return (
        <svg viewBox="0 0 280 180" width={width} height={height} className={`${className} transition-all duration-300`}>
          {/* Engineering drafting overlay */}
          <path d="M 15 15 L 265 15 L 265 165 L 15 165 Z" fill="none" stroke={detailColor} strokeWidth="0.5" strokeDasharray="1 9" />
          
          {/* Brooklyn Bridge Cables background */}
          <path d="M 30 110 Q 90 60, 150 110 Q 210 60, 270 110" fill="none" stroke={detailColor} strokeWidth="0.6" opacity="0.32" />
          <line x1="90" y1="82" x2="90" y2="135" stroke={detailColor} strokeWidth="0.4" opacity="0.3" strokeDasharray="1 2" />
          <line x1="210" y1="82" x2="210" y2="135" stroke={detailColor} strokeWidth="0.4" opacity="0.3" strokeDasharray="1 2" />

          {/* Manhattan Skyline (Modern blocks) */}
          <g stroke={commonStroke} strokeWidth="0.9" fill="#F4F0EA">
            <rect x="70" y="70" width="14" height="65" />
            <rect x="84" y="55" width="18" height="80" fill="#FAF8F5" />
            <line x1="93" y1="55" x2="93" y2="35" stroke={commonStroke} strokeWidth="1" /> {/* Spire */}
            
            <rect x="102" y="80" width="12" height="55" />
            <rect x="114" y="65" width="16" height="70" fill="#FCFAF6" />
            <rect x="130" y="90" width="15" height="45" />
            
            {/* Tiny stylized windows on towers */}
            <line x1="88" y1="62" x2="88" y2="110" stroke={commonStroke} strokeWidth="0.5" strokeDasharray="2 4" opacity="0.5" />
            <line x1="98" y1="62" x2="98" y2="120" stroke={commonStroke} strokeWidth="0.5" strokeDasharray="2 4" opacity="0.5" />
            <line x1="120" y1="72" x2="120" y2="115" stroke={commonStroke} strokeWidth="0.5" strokeDasharray="2 4" opacity="0.5" />
          </g>

          {/* Glowing torch beam from harbor entrance */}
          <path d="M 190 60 L 260 20 L 260 55 Z" fill="none" stroke={accentStroke} strokeWidth="0.5" strokeDasharray="3 3" opacity="0.35" />
          <polygon points="190,60 260,20 260,55" fill={accentStroke} opacity="0.04" />

          {/* Statue of Liberty Silhouette in foreground */}
          <g transform="translate(170, 50)" stroke={commonStroke} strokeWidth="1.2" fill="#FCFAF6">
            {/* Radiant Crown spires */}
            <path d="M 15 15 L 12 8 L 16 11 L 20 8 L 20 14 L 24 9 L 22 15" fill="none" stroke={accentStroke} strokeWidth="1" />
            {/* Head and features */}
            <circle cx="18" cy="18" r="4.5" fill="#FCFAF6" />
            {/* Raised right hand with flame */}
            <path d="M 19 15 L 20 7" />
            <circle cx="21" cy="4" r="2.5" fill={accentStroke} stroke={accentStroke} strokeWidth="0.5" />
            <ellipse cx="21" cy="4" rx="1" ry="2" fill="#FCFAF6" />
            {/* Toga/Robes body */}
            <path d="M 12 21 L 23 21 L 25 50 L 8 50 Z" />
            {/* Left tablet arm */}
            <path d="M 10 23 L 6 30" />
            <rect x="4" y="28" width="4.5" height="7" transform="rotate(15 6 30)" fill="#EAE5DC" stroke={commonStroke} strokeWidth="0.8" />
          </g>

          {/* Sea water estuary waterlines */}
          <line x1="20" y1="135" x2="260" y2="135" stroke={commonStroke} strokeWidth="1.5" />
          <path d="M 25 142 L 255 142" fill="none" stroke={detailColor} strokeWidth="0.6" strokeDasharray="9 2 4 2" />
          <path d="M 15 150 L 265 150" fill="none" stroke={detailColor} strokeWidth="0.4" strokeDasharray="5 5" />

          {/* Coordinate prints */}
          <text x="25" y="162" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">N 40°71'2"</text>
          <text x="210" y="162" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">W 74°00'6"</text>
        </svg>
      );
    case "sydney":
      return (
        <svg viewBox="0 0 280 180" width={width} height={height} className={`${className} transition-all duration-300`}>
          {/* Circular dial background overlay (coastal theme) */}
          <circle cx="140" cy="90" r="65" stroke={detailColor} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.25" fill="none" />
          
          {/* Sydney Harbour Bridge outline (Left side background) */}
          <g transform="translate(15, 65)" stroke={commonStroke} strokeWidth="1" fill="none">
            {/* Arch */}
            <path d="M 5 50 Q 55 10, 105 50" strokeWidth="1.5" />
            <path d="M 5 50 Q 55 18, 105 50" strokeWidth="0.8" />
            {/* Hanging bridge deck */}
            <line x1="1" y1="50" x2="115" y2="50" strokeWidth="1.2" />
            {/* Vertical suspender stays */}
            <line x1="25" y1="36" x2="25" y2="50" strokeWidth="0.4" opacity="0.7" />
            <line x1="40" y1="28" x2="40" y2="50" strokeWidth="0.4" opacity="0.7" />
            <line x1="55" y1="24" x2="55" y2="50" strokeWidth="0.4" opacity="0.7" />
            <line x1="70" y1="28" x2="70" y2="50" strokeWidth="0.4" opacity="0.7" />
            <line x1="85" y1="36" x2="85" y2="50" strokeWidth="0.4" opacity="0.7" />
            {/* Bridge Pylons */}
            <rect x="1" y="40" width="5" height="11" fill="#EAE5DC" stroke={commonStroke} strokeWidth="1" />
            <rect x="105" y="40" width="5" height="11" fill="#EAE5DC" stroke={commonStroke} strokeWidth="1" />
          </g>

          {/* Opera House (Right side focal point) */}
          <g transform="translate(110, 70)" stroke={commonStroke} strokeWidth="1.2" fill="#FCFAF6">
            {/* Shell 1 (Small Left) */}
            <path d="M 5 45 C 5 28, 18 24, 25 45 Z" />
            {/* Shell 2 (Medium) */}
            <path d="M 18 45 C 18 18, 38 12, 48 45 Z" fill="#FAF8F5" />
            {/* Shell 3 (Large central) */}
            <path d="M 38 45 C 38 5, 64 -2, 75 45 Z" fill="#FCFAF6" />
            {/* Shell 4 (Medium right stacking) */}
            <path d="M 65 45 C 65 15, 88 12, 98 45 Z" fill="#FAF8F5" />
            {/* Shell 5 (Small end) */}
            <path d="M 88 45 C 88 28, 104 26, 110 45 Z" fill="#EAE5DC" />
            
            {/* Elegant rib shadows inside shells */}
            <path d="M 50 15 Q 60 30, 68 45" fill="none" stroke={detailColor} strokeWidth="0.5" opacity="0.7" />
            <path d="M 28 25 Q 35 35, 42 45" fill="none" stroke={detailColor} strokeWidth="0.5" opacity="0.7" />
            <path d="M 76 22 Q 83 32, 90 45" fill="none" stroke={detailColor} strokeWidth="0.5" opacity="0.7" />
          </g>

          {/* Glowing crimson harbor lighthouse/beacon signal */}
          <circle cx="218" cy="114" r="2.5" fill={accentStroke} />
          <circle cx="218" cy="114" r="8" fill="none" stroke={accentStroke} strokeWidth="0.5" strokeDasharray="2 2" className="animate-pulse" />

          {/* Sea water bay waves */}
          <line x1="20" y1="120" x2="260" y2="120" stroke={commonStroke} strokeWidth="1.5" />
          {/* Flow waves */}
          <path d="M 25 128 C 45 130, 75 125, 100 128 C 140 131, 180 126, 210 128 C 230 129, 245 127, 255 128" fill="none" stroke={detailColor} strokeWidth="0.8" />
          <path d="M 15 136 C 50 134, 110 138, 160 134 C 200 132, 235 136, 265 134" fill="none" stroke={detailColor} strokeWidth="0.4" strokeDasharray="8 3" />

          {/* Coordinate records */}
          <text x="25" y="160" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">S 33°86'8"</text>
          <text x="210" y="160" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">E 151°20'9"</text>
        </svg>
      );
    case "amazon":
      return (
        <svg viewBox="0 0 280 180" width={width} height={height} className={`${className} transition-all duration-300`}>
          {/* Canopy organic circle grids */}
          <circle cx="205" cy="55" r="45" stroke={detailColor} strokeWidth="0.4" strokeDasharray="1 4" opacity="0.3" fill="none" />
          <circle cx="75" cy="115" r="55" stroke={detailColor} strokeWidth="0.4" strokeDasharray="1 4" opacity="0.3" fill="none" />
          
          {/* Winding Amazon river flowing in perspective */}
          <path d="M 140 25 C 135 45, 165 55, 155 75 C 140 95, 85 105, 115 130 C 135 145, 190 148, 255 160" fill="none" stroke={commonStroke} strokeWidth="4" strokeLinecap="round" opacity="0.15" />
          {/* Core river line in crimson mapping watercourse path */}
          <path d="M 140 25 C 135 45, 165 55, 155 75 C 140 95, 85 105, 115 130 C 135 145, 190 148, 255 160" fill="none" stroke={accentStroke} strokeWidth="1.2" strokeLinecap="round" />
          
          {/* Amazon parrot bird outline soaring (Top-Left) */}
          <g transform="translate(60, 45)" stroke={accentStroke} strokeWidth="1" fill="none">
            <path d="M 0 10 Q 15 5, 30 15 Q 18 18, 12 28 Q 10 18, 0 10 Z" />
            <path d="M 12 14 Q 22 25, 10 35" strokeWidth="0.6" strokeDasharray="1 2" />
          </g>

          {/* Tree Canopy details (Geometric leaf shapes) */}
          <g stroke={commonStroke} strokeWidth="1" fill="#FCFAF6">
            {/* Ivy Group 1 */}
            <path d="M 40 120 C 35 105, 55 95, 60 120 Z" />
            <path d="M 60 115 C 65 92, 85 100, 80 125 Z" fill="#FAF8F5" />
            {/* Ivy Group 2 (Top Right) */}
            <path d="M 215 50 C 220 35, 240 42, 235 60 Z" />
            <path d="M 195 65 C 190 48, 210 52, 205 75 Z" fill="#FAF8F5" />
            <path d="M 220 70 C 235 55, 250 65, 240 85 Z" fill="#EAE5DC" />
          </g>

          {/* Jungle background forest lines */}
          <line x1="20" y1="140" x2="260" y2="140" stroke={commonStroke} strokeWidth="1.5" />
          <path d="M 15 148 L 265 148" fill="none" stroke={detailColor} strokeWidth="0.6" strokeDasharray="4 6" />

          {/* Coordinate labels */}
          <text x="25" y="165" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">S 08°76'1"</text>
          <text x="210" y="165" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">W 63°90'3"</text>
        </svg>
      );
    case "cape":
      return (
        <svg viewBox="0 0 280 180" width={width} height={height} className={`${className} transition-all duration-300`}>
          {/* Compass Rose layout */}
          <line x1="140" y1="15" x2="140" y2="155" stroke={detailColor} strokeWidth="0.5" strokeDasharray="2 4" opacity="0.25" />
          <line x1="15" y1="120" x2="265" y2="120" stroke={detailColor} strokeWidth="0.5" strokeDasharray="2 4" opacity="0.25" />
          
          {/* Lighthouse structure */}
          <g transform="translate(190, 45)" stroke={commonStroke} strokeWidth="1" fill="#FCFAF6">
            {/* Tower body */}
            <polygon points="12,75 16,10 24,10 28,75" fill="#FAF8F5" strokeWidth="1.2" />
            {/* Red strip decal */}
            <polygon points="14,45 15,30 25,30 26,45" fill={accentStroke} stroke={accentStroke} />
            {/* Gallery deck */}
            <rect x="12" y="8" width="16" height="2" />
            {/* Glass lantern room */}
            <rect x="15" y="2" width="10" height="6" fill="#FFF" />
            <line x1="20" y1="2" x2="20" y2="8" strokeWidth="0.5" />
            {/* Dome roof */}
            <path d="M 15 2 Q 20 -4, 25 2 Z" fill="#EAE5DC" />
          </g>

          {/* Massive lighthouse rays cutting across sky */}
          <path d="M 210 50 L 30 15 L 30 40 Z" fill="none" stroke={accentStroke} strokeWidth="0.6" strokeDasharray="4 2" opacity="0.32" />
          <polygon points="210,50 30,15 30,40" fill={accentStroke} opacity="0.03" />

          {/* Craggy Cape Cliff Peninsula (Slanting sharply) */}
          <polygon points="110,120 185,120 220,120 190,135 150,150 115,152" fill="#EAE5DC" stroke={commonStroke} strokeWidth="1" />
          <path d="M 20 120 L 260 120" stroke={commonStroke} strokeWidth="1.5" />
          
          {/* Swirling turbulent currents colliding beneath (Fibonacci spiral styling) */}
          <path d="M 15 130 C 55 135, 75 125, 95 137 C 115 142, 130 134, 150 142 C 160 148, 175 140, 185 145" fill="none" stroke={detailColor} strokeWidth="0.8" />
          <path d="M 35 140 C 65 148, 80 144, 98 155 C 112 160, 125 152, 142 158" fill="none" stroke={accentStroke} strokeWidth="0.6" opacity="0.75" />
          <path d="M 12 148 C 50 145, 70 156, 92 148" fill="none" stroke={detailColor} strokeWidth="0.4" strokeDasharray="3 3" />

          {/* Coordinate prints */}
          <text x="25" y="165" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">S 33°92'4"</text>
          <text x="210" y="165" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">E 18°42'4"</text>
        </svg>
      );
    case "svalbard":
      return (
        <svg viewBox="0 0 280 180" width={width} height={height} className={`${className} transition-all duration-300`}>
          {/* Ursa Major / Big Dipper Constellation mapping in sky */}
          <g opacity="0.6" stroke={commonStroke} strokeWidth="0.5">
            <line x1="30" y1="20" x2="45" y2="25" />
            <line x1="45" y1="25" x2="60" y2="22" />
            <line x1="60" y1="22" x2="80" y2="35" />
            <line x1="80" y1="35" x2="105" y2="39" />
            <line x1="105" y1="39" x2="115" y2="55" />
            <line x1="115" y1="55" x2="90" y2="52" />
            <line x1="90" y1="52" x2="80" y2="35" fill="none" />
            
            {/* Constellation stars (delicate dots) */}
            <circle cx="30" cy="20" r="1.5" fill={accentStroke} />
            <circle cx="45" cy="25" r="1.5" fill={accentStroke} />
            <circle cx="60" cy="22" r="1.5" fill={accentStroke} />
            <circle cx="80" cy="35" r="2" fill={accentStroke} />
            <circle cx="105" cy="39" r="2" fill={accentStroke} />
            <circle cx="115" cy="55" r="2" fill={accentStroke} />
            <circle cx="90" cy="52" r="2" fill={accentStroke} />
          </g>

          {/* Giant Snowy Mountain Peaks */}
          <g stroke={commonStroke} strokeWidth="1.2" fill="#FCFAF6">
            {/* Peak 1 (Left) */}
            <polygon points="50,115 15,115 40,65" />
            <line x1="40" y1="65" x2="35" y2="115" stroke={commonStroke} strokeWidth="0.8" />
            {/* Peak 2 (Center back - Tall) */}
            <polygon points="120,115 60,115 95,45" fill="#FAF8F5" />
            <line x1="95" y1="45" x2="100" y2="115" stroke={commonStroke} strokeWidth="0.8" />
            {/* Peak 3 (Right) */}
            <polygon points="170,115 110,115 145,58" />
            <line x1="145" y1="58" x2="135" y2="115" stroke={commonStroke} strokeWidth="0.8" />
          </g>

          {/* Geometric Science Outpost Cabin & Radio Dish */}
          <g transform="translate(180, 80)" stroke={commonStroke} strokeWidth="1" fill="#FAF8F5">
            {/* Research Hut */}
            <rect x="15" y="15" width="22" height="20" />
            <polygon points="12,15 26,5 40,15" fill={accentStroke} stroke={accentStroke} />
            <rect x="22" y="23" width="6" height="12" fill="#EAE5DC" />
            <circle cx="25" cy="27" r="1" />
            
            {/* Satellite Dish Antenna */}
            <line x1="5" y1="35" x2="5" y2="20" />
            <path d="M 0 15 A 8 8 0 0 1 10 15" fill="none" strokeWidth="1.2" />
            <line x1="5" y1="12" x2="8" y2="16" stroke={accentStroke} />
          </g>

          {/* Frozen Ice Tundra base */}
          <line x1="20" y1="115" x2="260" y2="115" stroke={commonStroke} strokeWidth="1.5" />
          <path d="M 25 122 L 255 122" fill="none" stroke={detailColor} strokeWidth="0.8" strokeDasharray="14 3 6 3" />
          <path d="M 15 130 H 265" fill="none" stroke={detailColor} strokeWidth="0.5" strokeDasharray="2 5" />

          {/* Coordinates */}
          <text x="25" y="160" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">N 78°22'3"</text>
          <text x="210" y="160" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">E 15°64'6"</text>
        </svg>
      );
    case "tibet":
      return (
        <svg viewBox="0 0 280 180" width={width} height={height} className={`${className} transition-all duration-300`}>
          {/* Ambient high altitude sun disk */}
          <circle cx="210" cy="55" r="22" stroke={accentStroke} strokeWidth="0.6" strokeDasharray="3 4" fill="none" opacity="0.32" />
          <circle cx="210" cy="55" r="12" fill={accentStroke} opacity="0.05" />

          {/* Himalayan Ridge Outline Behind (Everest) */}
          <path d="M 20 120 L 75 40 L 120 85 L 185 30 L 220 75 L 260 120" fill="none" stroke={detailColor} strokeWidth="0.8" strokeDasharray="4 2" opacity="0.6" />

          {/* Layered Majestic Potala Palace Facade */}
          <g transform="translate(65, 55)" stroke={commonStroke} strokeWidth="1" fill="#FCFAF6">
            {/* White Palace Wing (Left) */}
            <polygon points="10,65 15,25 50,25 55,65" fill="#FAF8F5" strokeWidth="1.2" />
            {/* Red Palace Core (Center - Elevated) */}
            <polygon points="50,65 52,15 98,15 100,65" fill="#EAE5DC" strokeWidth="1.2" />
            {/* Golden Roof elements */}
            <path d="M 50 15 L 100 15" stroke={accentStroke} strokeWidth="3.2" />
            <path d="M 54 13 L 96 13" stroke={accentStroke} strokeWidth="1.2" />
            
            {/* White Palace Wing (Right) */}
            <polygon points="95,65 100,30 135,30 140,65" fill="#FCFAF6" />
            
            {/* Rows of tiny square monastic windows */}
            <g opacity="0.75" strokeWidth="0.6">
              <line x1="20" y1="35" x2="45" y2="35" stroke={commonStroke} strokeDasharray="2 3" />
              <line x1="20" y1="45" x2="45" y2="45" stroke={commonStroke} strokeDasharray="2 3" />
              <line x1="20" y1="55" x2="45" y2="55" stroke={commonStroke} strokeDasharray="2 3" />
              
              <line x1="58" y1="25" x2="92" y2="25" stroke={accentStroke} strokeDasharray="1.5 2.5" />
              <line x1="58" y1="35" x2="92" y2="35" stroke={accentStroke} strokeDasharray="1.5 2.5" />
              <line x1="58" y1="45" x2="92" y2="45" stroke={accentStroke} strokeDasharray="1.5 2.5" />
              <line x1="58" y1="55" x2="92" y2="55" stroke={accentStroke} strokeDasharray="1.5 2.5" />

              <line x1="106" y1="40" x2="130" y2="40" stroke={commonStroke} strokeDasharray="2 3" />
              <line x1="106" y1="50" x2="130" y2="50" stroke={commonStroke} strokeDasharray="2 3" />
            </g>
          </g>

          {/* Plateau platform */}
          <line x1="20" y1="120" x2="260" y2="120" stroke={commonStroke} strokeWidth="2" />
          <path d="M 15 128 L 265 128" fill="none" stroke={detailColor} strokeWidth="0.8" strokeDasharray="20 4 8 4" />
          <path d="M 30 135 H 250" fill="none" stroke={detailColor} strokeWidth="0.5" strokeDasharray="3 6" />

          {/* Coordinate readings */}
          <text x="25" y="160" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">N 29°65'2"</text>
          <text x="210" y="160" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">E 91°11'7"</text>
        </svg>
      );
    case "rio":
      return (
        <svg viewBox="0 0 280 180" width={width} height={height} className={`${className} transition-all duration-300`}>
          {/* Sun outline setting */}
          <circle cx="140" cy="72" r="32" stroke={accentStroke} strokeWidth="0.8" fill="none" opacity="0.25" />
          <line x1="100" y1="72" x2="180" y2="72" stroke={accentStroke} strokeWidth="0.6" strokeDasharray="5 2" opacity="0.3" />

          {/* Christ the Redeemer & Corcovado Peak */}
          <g transform="translate(115, 30)">
            {/* Mountain Ridge */}
            <path d="M -35,90 Q 25,65, 25,25 Q 25,25, 26,90" fill="#FCFAF6" stroke={commonStroke} strokeWidth="1" />
            <line x1="25" y1="25" x2="15" y2="90" stroke={detailColor} strokeWidth="0.6" opacity="0.6" />
            
            {/* The Colossal Statue (T-pose) */}
            <g transform="translate(17, 2)">
              {/* Pedestal */}
              <rect x="5" y="16" width="6" height="7" fill="#EAE5DC" stroke={commonStroke} strokeWidth="1" />
              {/* Robe/Body */}
              <polygon points="5,16 11,16 9,2 7,2" fill="#FAF8F5" stroke={commonStroke} strokeWidth="1.2" />
              {/* Outstretched Arms */}
              <line x1="-8" y1="4" x2="24" y2="4" stroke={commonStroke} strokeWidth="1.8" strokeLinecap="round" />
              <line x1="-8" y1="4" x2="24" y2="4" stroke={accentStroke} strokeWidth="0.6" />
              {/* Head */}
              <circle cx="8" cy="-1" r="2" fill="#FCFAF6" stroke={commonStroke} strokeWidth="1" />
            </g>
          </g>

          {/* Sugarloaf Mountain (Hump outline on the right) */}
          <path d="M 160 120 Q 210 40, 245 120 Z" fill="#EAE5DC" stroke={commonStroke} strokeWidth="1.2" opacity="0.8" />
          <path d="M 180 120 Q 212 55, 235 120" fill="none" stroke={detailColor} strokeWidth="0.6" strokeDasharray="2 2" />

          {/* Sea waves of Guanabara Bay */}
          <line x1="20" y1="120" x2="260" y2="120" stroke={commonStroke} strokeWidth="1.5" />
          <path d="M 25 128 C 45 125, 75 131, 110 126 C 150 121, 195 132, 255 126" stroke={detailColor} strokeWidth="0.8" fill="none" />
          <path d="M 15 136 C 65 138, 125 134, 170 136 C 215 138, 245 134, 265 136" stroke={detailColor} strokeWidth="0.4" strokeDasharray="8 4" fill="none" />

          {/* Coordinates */}
          <text x="25" y="160" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">S 22°90'6"</text>
          <text x="210" y="160" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">W 43°17'2"</text>
        </svg>
      );
    case "greatwall":
      return (
        <svg viewBox="0 0 280 180" width={width} height={height} className={`${className} transition-all duration-300`}>
          {/* Decorative ring */}
          <circle cx="140" cy="90" r="68" stroke={detailColor} strokeWidth="0.5" strokeDasharray="3 6" opacity="0.15" fill="none" />
          
          {/* Distant mountains outlined in soft gray */}
          <path d="M 15 110 Q 70 60, 110 85 T 210 70 T 265 95" fill="none" stroke={detailColor} strokeWidth="0.8" opacity="0.35" />
          
          {/* Main steep mountain slope (foreground/midground) */}
          <path d="M 10 135 H 270" fill="none" stroke={commonStroke} strokeWidth="1" opacity="0.2" />
          <path d="M 15 140 Q 90 75, 170 115 T 265 85" fill="none" stroke={commonStroke} strokeWidth="1.2" />

          {/* Great Wall pathways and crenels (fortress wall bricks) */}
          <path d="M 15 148 Q 90 83, 170 123 T 265 93" fill="none" stroke={commonStroke} strokeWidth="1.2" />
          <path d="M 15 140 L 15 148 M 50 113 L 50 121 M 85 96 L 85 104 M 120 95 L 120 103 M 150 107 L 150 115 M 180 118 L 180 126 M 215 112 L 215 120 M 245 93 L 245 101" stroke={detailColor} strokeWidth="0.8" opacity="0.7" />

          {/* Watchtower 1 */}
          <g transform="translate(73, 76)">
            <rect x="0" y="5" width="22" height="16" fill="#FAF8F5" stroke={commonStroke} strokeWidth="1.2" />
            <rect x="4" y="11" width="5" height="10" rx="2" fill="#EAE5DC" stroke={commonStroke} strokeWidth="0.8" />
            <rect x="13" y="11" width="5" height="10" rx="2" fill="#EAE5DC" stroke={commonStroke} strokeWidth="0.8" />
            <path d="M -2 5 H 24 L 24 0 H 20 L 20 2 H 16 L 16 0 M 12 0 L 12 2 H 8 L 8 0 H 4 L 4 2 H 0 L 0 0 H -2 Z" fill="#EAE5DC" stroke={commonStroke} strokeWidth="1" />
          </g>

          {/* Watchtower 2 */}
          <g transform="translate(206, 96)" scale="0.8">
            <rect x="0" y="5" width="18" height="14" fill="#FCFAF6" stroke={commonStroke} strokeWidth="1" />
            <rect x="4" y="10" width="4" height="9" rx="1.5" fill="#EAE5DC" stroke={commonStroke} strokeWidth="0.6" />
            <rect x="10" y="10" width="4" height="9" rx="1.5" fill="#EAE5DC" stroke={commonStroke} strokeWidth="0.6" />
            <path d="M -2 5 H 20 L 20 1 H 16 L 16 3 H 12 L 12 1 H 8 L 8 3 H 4 L 4 1 H 0 L 0 3 H -2 Z" fill="#EAE5DC" stroke={commonStroke} strokeWidth="0.8" />
          </g>

          {/* Stylized flying birds */}
          <path d="M 45 42 Q 50 38, 55 42 Q 60 38, 65 42" fill="none" stroke={accentStroke} strokeWidth="1" />
          <path d="M 185 52 Q 189 49, 193 52 Q 197 49, 201 52" fill="none" stroke={accentStroke} strokeWidth="0.8" opacity="0.8" />

          {/* Subtle details */}
          <g transform="translate(145, 128)" stroke={commonStroke} strokeWidth="0.8" fill="none">
            <line x1="0" y1="12" x2="0" y2="0" strokeWidth="1.2" />
            <path d="M -8 8 C -4 4, 4 4, 8 8 M -6 4 C -3 1, 3 1, 6 4" />
          </g>
          <g transform="translate(195, 138)" stroke={commonStroke} strokeWidth="0.8" fill="none" scale="0.8">
            <line x1="0" y1="12" x2="0" y2="0" strokeWidth="1.2" />
            <path d="M -8 8 C -4 4, 4 4, 8 8 M -6 4 C -3 1, 3 1, 6 4" />
          </g>

          <line x1="15" y1="148" x2="265" y2="148" stroke={commonStroke} strokeWidth="1.5" />
          <path d="M 20 154 L 260 154" fill="none" stroke={detailColor} strokeWidth="0.5" strokeDasharray="3 3" />

          {/* Coordinates */}
          <text x="25" y="165" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">N 40°43'19"</text>
          <text x="210" y="165" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">E 116°57'04"</text>
        </svg>
      );
    case "burjkhalifa":
      return (
        <svg viewBox="0 0 280 180" width={width} height={height} className={`${className} transition-all duration-300`}>
          <circle cx="140" cy="110" r="50" stroke={accentStroke} strokeWidth="0.5" strokeDasharray="3 6" opacity="0.2" fill="none" />
          <circle cx="140" cy="110" r="75" stroke={commonStroke} strokeWidth="0.5" strokeDasharray="1 3" opacity="0.15" fill="none" />
          <circle cx="210" cy="60" r="22" stroke={accentStroke} strokeWidth="1" strokeDasharray="5 3" fill="none" opacity="0.3" />

          <g transform="translate(100, 10)">
            <line x1="40" y1="5" x2="40" y2="45" stroke={commonStroke} strokeWidth="1.2" />
            <line x1="39" y1="15" x2="41" y2="15" stroke={accentStroke} strokeWidth="1" />
            <rect x="36" y="45" width="8" height="20" fill="#FAF8F5" stroke={commonStroke} strokeWidth="1" />
            <rect x="32" y="65" width="16" height="23" fill="#FCFAF6" stroke={commonStroke} strokeWidth="1" />
            <line x1="36" y1="65" x2="36" y2="88" stroke={detailColor} strokeWidth="0.5" />
            <line x1="44" y1="65" x2="44" y2="88" stroke={detailColor} strokeWidth="0.5" />
            <rect x="27" y="88" width="26" height="24" fill="#FAF8F5" stroke={commonStroke} strokeWidth="1.2" />
            <line x1="31" y1="88" x2="31" y2="112" stroke={commonStroke} strokeWidth="0.6" />
            <line x1="49" y1="88" x2="49" y2="112" stroke={commonStroke} strokeWidth="0.6" />
            <line x1="40" y1="45" x2="40" y2="112" stroke={accentStroke} strokeWidth="0.8" />
            <rect x="21" y="112" width="38" height="23" fill="#EAE5DC" stroke={commonStroke} strokeWidth="1.2" />
            <line x1="26" y1="112" x2="26" y2="135" stroke={commonStroke} strokeWidth="0.8" />
            <line x1="32" y1="112" x2="32" y2="135" stroke={commonStroke} strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="48" y1="112" x2="48" y2="135" stroke={commonStroke} strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="54" y1="112" x2="54" y2="135" stroke={commonStroke} strokeWidth="0.8" />
          </g>

          <g transform="translate(45, 95)" opacity="0.6">
            <rect x="0" y="10" width="12" height="30" fill="#FAF8F5" stroke={commonStroke} strokeWidth="1" />
            <rect x="15" y="0" width="15" height="40" fill="#FAF8F5" stroke={commonStroke} strokeWidth="1" />
            <line x1="22" y1="0" x2="22" y2="40" stroke={commonStroke} strokeWidth="0.5" />
          </g>
          
          <g transform="translate(175, 100)" opacity="0.6">
            <rect x="0" y="5" width="16" height="30" fill="#FAF8F5" stroke={commonStroke} strokeWidth="1" />
            <rect x="20" y="15" width="10" height="20" fill="#FAF8F5" stroke={commonStroke} strokeWidth="1" />
          </g>

          <line x1="20" y1="135" x2="260" y2="135" stroke={commonStroke} strokeWidth="1.8" />
          <path d="M 25 142 C 75 145, 115 138, 140 148 C 175 138, 225 146, 255 142" stroke={detailColor} strokeWidth="0.8" fill="none" />
          <path d="M 85 135 C 90 125, 95 125, 100 135 M 105 135 Q 115 118, 125 135 M 155 135 Q 165 118, 175 135" stroke={accentStroke} strokeWidth="1" fill="none" opacity="0.6" />

          {/* Coordinates */}
          <text x="25" y="160" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">N 25°19'72"</text>
          <text x="210" y="160" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">E 55°27'41"</text>
        </svg>
      );
    case "petronas":
      return (
        <svg viewBox="0 0 280 180" width={width} height={height} className={`${className} transition-all duration-300`}>
          <line x1="140" y1="15" x2="140" y2="155" stroke={detailColor} strokeWidth="0.5" strokeDasharray="5 5" opacity="0.2" />
          
          <g transform="translate(75, 15)">
            <line x1="20" y1="0" x2="20" y2="25" stroke={commonStroke} strokeWidth="1.2" />
            <circle cx="20" cy="5" r="1.5" fill={accentStroke} />
            <rect x="17" y="25" width="6" height="15" fill="#FAF8F5" stroke={commonStroke} strokeWidth="1" />
            <rect x="14" y="40" width="12" height="20" fill="#FCFAF6" stroke={commonStroke} strokeWidth="1" />
            <rect x="11" y="60" width="18" height="25" fill="#FAF8F5" stroke={commonStroke} strokeWidth="1.2" />
            <rect x="7" y="85" width="26" height="35" fill="#FCFAF6" stroke={commonStroke} strokeWidth="1.2" />
            <line x1="5" y1="85" x2="5" y2="120" stroke={detailColor} strokeWidth="0.8" />
            <line x1="35" y1="85" x2="35" y2="120" stroke={detailColor} strokeWidth="0.8" />
          </g>

          <g transform="translate(165, 15)">
            <line x1="20" y1="0" x2="20" y2="25" stroke={commonStroke} strokeWidth="1.2" />
            <circle cx="20" cy="5" r="1.5" fill={accentStroke} />
            <rect x="17" y="25" width="6" height="15" fill="#FAF8F5" stroke={commonStroke} strokeWidth="1" />
            <rect x="14" y="40" width="12" height="20" fill="#FCFAF6" stroke={commonStroke} strokeWidth="1" />
            <rect x="11" y="60" width="18" height="25" fill="#FAF8F5" stroke={commonStroke} strokeWidth="1.2" />
            <rect x="7" y="85" width="26" height="35" fill="#FCFAF6" stroke={commonStroke} strokeWidth="1.2" />
            <line x1="5" y1="85" x2="5" y2="120" stroke={detailColor} strokeWidth="0.8" />
            <line x1="35" y1="85" x2="35" y2="120" stroke={detailColor} strokeWidth="0.8" />
          </g>

          <g transform="translate(95, 72)" stroke={commonStroke}>
            <line x1="0" y1="0" x2="90" y2="0" strokeWidth="1.5" />
            <line x1="0" y1="6" x2="90" y2="6" strokeWidth="1.5" stroke={accentStroke} />
            <line x1="15" y1="6" x2="45" y2="25" strokeWidth="1" stroke={detailColor} />
            <line x1="75" y1="6" x2="45" y2="25" strokeWidth="1" stroke={detailColor} />
            <line x1="45" y1="25" x2="45" y2="35" strokeWidth="1.2" />
          </g>

          <g transform="translate(140, 135)" stroke={commonStroke} strokeWidth="1" fill="none">
            <path d="M 0 0 C -4 -10, -12 -12, -20 -8 M 0 0 C -2 -14, -6 -20, 2 -24 M 0 0 C 4 -12, 12 -14, 20 -8" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="-2" y2="15" strokeWidth="1.5" />
          </g>
          
          <g transform="translate(55, 135)" stroke={commonStroke} strokeWidth="1" fill="none" scale="0.8">
            <path d="M 0 0 C -4 -10, -12 -12, -20 -8 M 0 0 C -2 -14, -6 -20, 2 -24 M 0 0 C 4 -12, 12 -14, 20 -8" />
            <line x1="0" y1="0" x2="1" y2="15" strokeWidth="1.5" />
          </g>
          
          <g transform="translate(225, 135)" stroke={commonStroke} strokeWidth="1" fill="none" scale="0.8">
            <path d="M 0 0 C -4 -10, -12 -12, -20 -8 M 0 0 C -2 -14, -6 -20, 2 -24 M 0 0 C 4 -12, 12 -14, 20 -8" />
            <line x1="0" y1="0" x2="-1" y2="15" strokeWidth="1.5" />
          </g>

          <line x1="20" y1="135" x2="260" y2="135" stroke={commonStroke} strokeWidth="1.8" />
          <path d="M 25 142 L 255 142" stroke={detailColor} strokeWidth="0.6" strokeDasharray="10 4" />
          <path d="M 15 150 L 265 150" stroke={detailColor} strokeWidth="0.4" strokeDasharray="2 2" />

          {/* Coordinates */}
          <text x="25" y="160" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">N 3°15'78"</text>
          <text x="210" y="160" fontSize="7" fontFamily="monospace" fill={commonStroke} opacity="0.6">E 101°71'19"</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 280 180" width={width} height={height} className={`${className} transition-all duration-300`}>
          <rect x="10" y="10" width="260" height="160" fill="none" stroke={commonStroke} strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="140" cy="90" r="40" stroke={accentStroke} strokeWidth="1" strokeDasharray="2 3" fill="none" />
          <text x="140" y="95" textAnchor="middle" fontSize="10" fontFamily="serif" fill={commonStroke} italic="true">[ Architectural Drawing ]</text>
        </svg>
      );
  }
};
