import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Heart, 
  MapPin, 
  AlertTriangle, 
  Compass, 
  Plus, 
  Search, 
  User, 
  Clock, 
  Send, 
  Check, 
  Sparkles,
  Info,
  Calendar,
  ChevronDown,
  Trash2,
  Bookmark,
  Bell,
  Settings,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  X
} from 'lucide-react';
import { TravelPost, PostReply, Country, Landmark } from '../types';

interface TravelForumProps {
  language: 'en' | 'zh' | string;
  selectedCountry: Country | null;
  landmarkFocus: Landmark | null;
  onFocusCountry: (countryName: string) => void;
  onFocusLandmark: (landmark: Landmark) => void;
  availableLandmarks: Landmark[];
  triggerAudioTick: () => void;
}

const CATEGORY_ICONS = {
  all: Compass,
  tip: Sparkles,
  ask: MessageSquare,
  itinerary: Calendar,
  warning: AlertTriangle
};

const boardTranslations: Record<string, any> = {
  zh: {
    tabTitle: "社区",
    postTitle: "旅行情报交流社区",
    postDesc: "类似2ch/X的纯文字旅行分享与避坑指南。向当地人或同行旅友提问、交流注意事项，互动建立完美行程！",
    newPostBtn: "发布新帖",
    titleLabel: "帖子标题",
    titlePlaceholder: "输入标题 (例如: 京都清水寺浴衣租借，有什么防坑指南吗？)...",
    contentLabel: "详细内容",
    contentPlaceholder: "写下你的旅行提问、注意事项或景点情报，字数不限...",
    authorLabel: "发布人昵称",
    authorPlaceholder: "匿名旅行者",
    categoryLabel: "帖子分类",
    locationLabel: "关联地点 (协助他人规划航线)",
    noCountry: "不关联特定国家",
    noLandmark: "不关联特定景点",
    submitBtn: "发布帖子",
    cancelBtn: "取消",
    noPosts: "暂无帖子。开始发布第一个旅行问题，邀请大家讨论吧！",
    replyCount: "条回复",
    likeCount: "赞",
    addReplyPlaceholder: "在这里写下你的解答或当地人建议...",
    replyBtn: "回复建议",
    filterPlace: "关联地点",
    allPlaces: "全部地点",
    travelTips: "当地人建议",
    askLocal: "求攻略/问禁忌",
    itineraryShare: "行程打卡",
    warnNotes: "安全防坑",
    localExpertLabel: "当地人/经验者",
    activeFilterCountry: "当前地球选中",
    clearFilter: "清除筛选",
    successPost: "发布成功！",
    searchPlaceholder: "搜索情报标题、内容或地点...",
    categories: {
      all: "全部情报",
      tip: "避坑/当地 tips",
      ask: "Q&A 游玩提问",
      itinerary: "行程打卡建议",
      warning: "安全警戒线"
    },
    // Passport & Profile management tabs
    subTabFeed: "情报广场",
    subTabProfile: "个人主页",
    myProfileLabel: "虚拟旅行者护照",
    profileBioLabel: "旅行观与个性签名",
    profileBioPlaceholder: "比如：爱摄影、徒步探索小众景点的自由灵魂...",
    avatarLabel: "选择旅行头像",
    saveProfileSuccess: "资料保存成功！",
    saveProfileBtn: "更新护照资料",
    myPostsLabel: "我发布的情报帖",
    receivedRepliesLabel: "收到的群友回复",
    noPostsCreatedYet: "您还没有发布过旅行帖子，点击右上角分享吧！",
    noRepliesReceivedYet: "暂未收到回复。当其他旅人回复您的帖子时，会在这里实时提醒！",
    deleteBtn: "删除",
    deleteConfirm: "确定要永久删除这篇旅行帖子吗？",
    whoReplied: "回复了您的帖子",
    repliedAt: "回复于",
    jumpToPost: "点击前往帖子",
    
    // Admin Module Specific Translations
    adminModeSetting: "管理员权限管理",
    adminModeEnable: "开启超级管理员模式",
    adminModeDesc: "启用后，您将获得内容审核权限。作为管理者，您可以强制删除社区内任何不合规或广告帖子，维护社区秩序。",
    adminActiveBadge: "社区协管员",
    deleteConfirmAdmin: "警告：您正在以【超级管理员】身份删除此帖！此操作将不限发帖人身份，在本地和预览中强制下架该文章。确定要强制删除吗？",
    confirmTitle: "确认操作",
    confirmBtnSubmit: "确认执行",
    confirmBtnCancel: "取消放弃",
    showMore: "展开全文",
    showLess: "收起"
  },
  en: {
    tabTitle: "BOARD",
    postTitle: "Travel Intelligence Board",
    postDesc: "Text-centric community board to exchange travel advice, local tips, and safety warnings. Plan your itinerary using crowdsourced wisdom!",
    newPostBtn: "New Post",
    titleLabel: "Post Title",
    titlePlaceholder: "Title (e.g. Tips on renting kimonos in Kyoto Temple?)...",
    contentLabel: "Detailed Description",
    contentPlaceholder: "Write your question, local precaution, or travel tips in detail...",
    authorLabel: "Your Nickname",
    authorPlaceholder: "Anonymous Traveler",
    categoryLabel: "Post Category",
    locationLabel: "Associated Location (Helps draw flight routes)",
    noCountry: "Not country specific",
    noLandmark: "Not landmark specific",
    submitBtn: "Post",
    cancelBtn: "Cancel",
    noPosts: "No posts found. Ask a question or share a local tip!",
    replyCount: "replies",
    likeCount: "likes",
    addReplyPlaceholder: "Write your reply or local advice...",
    replyBtn: "Reply",
    filterPlace: "Location Filter",
    allPlaces: "All Locations",
    travelTips: "Local Tips",
    askLocal: "Q&A",
    itineraryShare: "Itinerary",
    warnNotes: "Warnings",
    localExpertLabel: "Local Expert",
    activeFilterCountry: "Currently Selected",
    clearFilter: "Clear Filter",
    successPost: "Posted successfully!",
    searchPlaceholder: "Search posts, tips or locations...",
    categories: {
      all: "All intelligence",
      tip: "Local Tips & Guides",
      ask: "Travel Q&A",
      itinerary: "Itineraries",
      warning: "Safety Warnings"
    },
    // Passport & Profile management tabs
    subTabFeed: "Discussions Feed",
    subTabProfile: "My Passport",
    myProfileLabel: "Traveler Passport Card",
    profileBioLabel: "Travel Mission & Bio",
    profileBioPlaceholder: "e.g. Wanderlust seeker. Exploring off-the-grid locations...",
    avatarLabel: "Choose Travel Avatar",
    saveProfileSuccess: "Profile saved successfully!",
    saveProfileBtn: "Update Passport",
    myPostsLabel: "My Authored Intelligence",
    receivedRepliesLabel: "Replies Received",
    noPostsCreatedYet: "You haven't posted any travel entries yet. Start by sharing one!",
    noRepliesReceivedYet: "No updates yet. When other travelers offer suggestions on your posts, you'll see notifications here!",
    deleteBtn: "Delete",
    deleteConfirm: "Are you sure you want to permanently delete this post?",
    whoReplied: "replied to your post",
    repliedAt: "commented at",
    jumpToPost: "View discussion",
    
    // Admin Module Specific Translations
    adminModeSetting: "Moderator Options",
    adminModeEnable: "Enable Administrator Privileges",
    adminModeDesc: "Activate Admin override status. As a moderator, you hold the definitive right to delete any non-compliant, abusive, or duplicate post instantly across the platform.",
    adminActiveBadge: "Board Co-op Admin",
    deleteConfirmAdmin: "WARNING: You are deleting this post as a 【Super Administrator】. This override bypasses author restrictions and permanently flushes this post. Confirm action?",
    confirmTitle: "Confirm Request",
    confirmBtnSubmit: "Execute Delete",
    confirmBtnCancel: "Cancel Action",
    showMore: "Show More",
    showLess: "Show Less"
  }
};

const PRESET_POSTS: TravelPost[] = [
  {
    id: 'post-1',
    title: '京都清水寺、金阁寺一日游防坑经验与最新浴衣租借注意事项',
    content: '1. 很多网红浴衣店为了走量，配套的发型非常粗糙，建议提前在小红书或INS看好款式拿给发型师。2. 清水寺的山路碎石很多，穿着木屐会非常夹脚，随身带一双轻便拖鞋或无痕贴非常重要！3. 清水寺现在主殿和舞台非常多台阶，可以早上8点前去，人最少，拍照绝佳。当地清水坂的茶点可以尝尝宇治抹茶，但路边卖的手串大多是海外进货，别花冤枉钱。',
    author: '京都本地小百合',
    createdAt: Date.now() - 3600000 * 4, // 4 hours ago
    likes: 18,
    category: 'tip',
    assignedCountry: 'Japan',
    assignedLandmark: 'Kyoto Temple Hub',
    replies: [
      {
        id: 'reply-1-1',
        author: '行走天涯的阿强',
        content: '太实用了！我上周刚去，穿着木屐爬清水寺脚底起泡了，幸好同伴带了创可贴。强烈建议穿舒服的便鞋走，拍照时再换上木屐！',
        createdAt: Date.now() - 3600000 * 3,
        isLocalExpert: false
      },
      {
        id: 'reply-1-2',
        author: 'KyotoLocal_Ken',
        content: 'As a local, I also highly recommend booking restaurant reservations in Gion area at least 2 weeks in advance. Many historical Ryokan restaurants do not take walk-ins now!',
        createdAt: Date.now() - 3600000 * 2,
        isLocalExpert: true
      }
    ]
  },
  {
    id: 'post-2',
    title: 'Essential Safety warning for visitors to Giza Pyramid Complex in Egypt',
    content: 'Hello everyone! I just returned from Giza and want to share some critical warnings to keep your experience magical and avoid scams: \n1. NEVER hand your ticket to anyone standing outside who claims to be an "official inspector". They are persistent scam-guides who will take your ticket and demand money to return it. Walk straight past them to the genuine security scanners.\n2. Camel/Horse rides: Agree on the total price BEFORE getting on are ensure it is in Egyptian Pounds (EGP). Also explicitly clarify that the helper\'s tip/baksheesh is included. Do not let the helper take your phone/camera to take photos unless you are ready to pay him a tip.',
    author: 'DesertNomad99',
    createdAt: Date.now() - 3600000 * 12,
    likes: 34,
    category: 'warning',
    assignedCountry: 'Egypt',
    assignedLandmark: 'Great Giza Plateau',
    replies: [
      {
        id: 'reply-2-1',
        author: 'Cairo_Expat',
        content: 'Absolutely 100% true. Another tip: Buy Giza tickets online in advance through the official Egyptian Ministry of Tourism website to skip the chaotic offline ticket booth completely!',
        createdAt: Date.now() - 3600000 * 10,
        isLocalExpert: true
      }
    ]
  },
  {
    id: 'post-3',
    title: '巴黎塞纳河畔/埃菲尔铁塔附近防扒手与安全注意事项',
    content: '各位准备去巴黎的小伙伴注意！在埃菲尔铁塔（Tour Eiffel）和圣心大教堂下方，如果遇到有人拿着请愿书（Petition）让你签名，或者在你手上绕彩绳（String trick），千万千万不要理会！他们是团伙作案，一旦你签名或分心，同伙就会迅速摸走你的手机和钱包。包包一定要背在前面保护好！',
    author: '法兰西蒲公英',
    createdAt: Date.now() - 3600000 * 24,
    likes: 27,
    category: 'warning',
    assignedCountry: 'France',
    assignedLandmark: 'Paris Estuary',
    replies: [
      {
        id: 'reply-3-1',
        author: 'ParisianLocal',
        content: 'Chers voyageurs, c\'est tout à fait vrai. Also, avoid putting your phone on the restaurant table when sitting at outdoor terrace cafes, especially in tourist spots. Thieves on bicycles can snatch it in a second! Keep it safe in your inner pocket.',
        createdAt: Date.now() - 3600000 * 20,
        isLocalExpert: true
      }
    ]
  },
  {
    id: 'post-4',
    title: '冰岛自驾黄金圈与 1 号公路防滑防风避坑指南 (Reykjavík Rift)',
    content: '刚刚完成冰岛一号公路环岛自驾。极力推荐给大家几个注意事项：\n1. 冰岛的风力经常达到摧毁车门的级别！开车门拉手一定要用双手抓紧，否则车门铰链极易被吹折变形，而租车公司风损保险大多是不赔的。\n2. 砂石路（F-Road）必须要租 4x4 四驱车，而且要买 Gravel Protection 沙石险，前风挡被前车弹起的砂石击中是家常便饭。\n3. 冬季和春季路面会结暗冰（Black Ice），外观看是干净的柏油路，其实极滑，千万不可大意超速！还要注意路两旁的野生羊群，撞上不仅非常危险，还要面临巨额赔偿。',
    author: '北极圈捕风人',
    createdAt: Date.now() - 3600000 * 36,
    likes: 42,
    category: 'itinerary',
    assignedCountry: 'Iceland',
    assignedLandmark: 'Reykjavík Rift',
    replies: [
      {
        id: 'reply-4-1',
        author: 'Vik_Adventure_Guide',
        content: 'Yes! Also check the official road.is and safetravel.is websites multiple times a day. Weather changes within 5 minutes in Iceland!',
        createdAt: Date.now() - 3600000 * 30,
        isLocalExpert: true
      }
    ]
  },
  {
    id: 'post-5',
    title: 'Sydney Coastlines & Opera House - Best Photography Spots & Local Tram Warning',
    content: 'If you are visiting Sydney Harbour, here is my 2-day perfect itinerary view spots: \n1. Take the public ferry from Circular Quay to Manly at sunset - it is 1/10th the price of a luxury cruise but offers the exact same stunning, direct, golden-hour views of the Opera House and Harbour Bridge.\n2. For photography, skip the crowded immediate Opera House steps. Walk to Mrs Macquarie\'s Chair instead, where you can frame both landmarks in one single gorgeous frame.\n3. Watch out for Sydney Light Rail (L2/L3) ticket checking; make sure to tap-on AND tap-off your debit card at the platform scanners. Inspectors are very strict and fines are hefty (over $200 CAD/AUD)!',
    author: 'Oceanbreeze_Eue',
    createdAt: Date.now() - 3600000 * 48,
    likes: 19,
    category: 'tip',
    assignedCountry: 'Australia',
    assignedLandmark: 'Sydney Harbour',
    replies: [
      {
        id: 'reply-5-1',
        author: 'Aussie_Surfer_99',
        content: 'Brilliant tips mate! For food, take the ferry to Watson\'s Bay and get some fish and chips at Doyles. Eat it on the grass but watch out for greedy seagulls!',
        createdAt: Date.now() - 3600000 * 40,
        isLocalExpert: true
      }
    ]
  },
  {
    id: 'post-6',
    title: '八达岭vs慕田峪长城深度体验防坑与交通攻略 (Great Wall of China)',
    content: '跟大家分享一些长城游玩的心得：\n1. 如果追求体验和拍照质量，极力建议去【慕田峪长城】，人比八达岭少一半，而且有双人吊椅缆车上、滑道（Toboggan）滑下，体验非常刺激！\n2. 交通防坑：不要相信前门或者王府井大街路边拉客的“长城一日游”大巴，那些大部分是购物团陷阱。去慕田峪直接坐官方前门旅游专线大巴或乘专线巴士（ZanBus）直达，清爽省心，中途不停靠购物点。\n3. 坡度有些地方非常陡峭，建议穿摩擦力强的专业运动鞋，备足温水，长城上面的小卖部水非常贵。',
    author: '踏破贺兰山缺',
    createdAt: Date.now() - 3600000 * 72,
    likes: 56,
    category: 'tip',
    assignedCountry: 'China',
    assignedLandmark: 'Great Wall of China',
    replies: [
      {
        id: 'reply-6-1',
        author: '北京胡同串子',
        content: '大实话！补充一点：慕田峪的14号到20号敌楼是精华段，如果带老人小孩，直接坐缆车到14号敌楼走过去，少爬很多阶梯！',
        createdAt: Date.now() - 3600000 * 60,
        isLocalExpert: true
      }
    ]
  },
  {
    id: 'post-7',
    title: 'ニューヨーク市・マンハッタンを徹底攻略！地下鉄の乗り方と治安の良いエリアの見分方 (New York Estuary)',
    content: 'ニューヨーク（New York Estuary周辺）での個人旅行を計画している皆さんに、現地からの役立つアドバイスです！\n1. 地下鉄（Subway）に乗る際は、切符を買う必要はありません。スマートフォンやクレジットカードの非接触決済（OMNY）を自動改札機にかざすだけで通れます！連続して数回乗ると自動的に割引（乗り放題移行）されるので非常にお得です。\n2. 治安の識別：マンハッタンでも特定の路地や深夜は一人歩きを避けるべきですが、特に注意すべきは「地下鉄での物乞いやパフォーマンス」。遭遇した場合は目を合わせず、静かに他の車両へ移動しましょう。\n3. ブロードウェイの当日券は、タイムズスクエアにある「TKTS」ブースで最大50%オフで手に入るチケットもあります。並びますが非常にリーズナブルです。',
    author: '自由の風_1995',
    createdAt: Date.now() - 3600000 * 96,
    likes: 67,
    category: 'tip',
    assignedCountry: 'United States',
    assignedLandmark: 'New York Estuary',
    replies: [
      {
        id: 'reply-7-1',
        author: 'NYC_Explorer_San',
        content: '素晴らしいまとめですね！マンハッタンはストリート与アベニューが碁盤の目状になっているので、東西南北を意識すると迷いません。楽しい滞在を！',
        createdAt: Date.now() - 3600000 * 80,
        isLocalExpert: true
      }
    ]
  },
  {
    id: 'post-8',
    title: '말레이시아 쿠알라룸푸르 페트로나스 트윈 타워 완벽 촬영 각도 및 예약 팁 (Petronas Twin Towers)',
    content: '쿠알라룸푸르의 상징인 페트로나스 트윈 타워(Petronas Twin Towers)를 방문하실 여행자분들께 꿀팁을 전수합니다!\n1. **전망대 예약**: 예약 없이 현장에 가면 매진되는 경우가 대부분입니다. 반드시 공식 웹사이트에서 최소 일주일 전에 시간대를 미리 지정하여 온라인 예약을 완료하시기 바랍니다.\n2. **최고의 포토스팟**: 타워 바로 앞에 있는 광장 분수대 주변도 좋지만, 광장 뒤쪽의 KLCC 공원(KLCC Park) 숲속 계단이나 호수 건너편 다리에서 촬영하면 전체 타워 두 곳을 함께 세로 앵글에 완벽하게 담을 수 있습니다.\n3. **쇼핑 및 푸드**: 수리아 KLCC 쇼핑몰 내부 4층에 가성비가 훌륭한 푸드코드가 있으며, 지하 마트에서는 말레이시아 특산품인 카야잼과 화이트 커피를 저렴하게 득템할 수 있습니다.',
    author: '동남아_프로여행러',
    createdAt: Date.now() - 3600000 * 120,
    likes: 88,
    category: 'itinerary',
    assignedCountry: 'Malaysia',
    assignedLandmark: 'Petronas Twin Towers',
    replies: [
      {
        id: 'reply-8-1',
        author: 'KL_Blogger_Jay',
        content: '유용한 팁 감사합니다! 밤 8시, 9시, 10시에 타워 앞 음악 분수 쇼가 열리니 시간 맞춰 분수대 뒤편 계단에 미리 자리 잡고 관람하시는 걸 추천드려요!',
        createdAt: Date.now() - 3600000 * 110,
        isLocalExpert: true
      }
    ]
  },
  {
    id: 'post-9',
    title: 'Svalbard Arctic Exploration - How to Stay Safe from Polar Bears and Frostbite',
    content: 'Visiting the Svalbard Outpost (Norway) is a once-in-a-lifetime expedition. Having lived here in Longyearbyen for three seasons, here are crucial safety rules:\n1. POLAR BEAR WARNING: You are strictly forbidden from leaving the safe town borders without a certified rifle or a licensed local guide. Polar bears outnumber humans here and can move silently and fast over deep snow.\n2. LAYERING IS KEY: Cotton kills. Always wear primary wool thermal base layers, a secondary thick wool fleece or windproof down layer, and a robust waterproof hard shell outer. The windchill factor in the high Arctic can freeze exposed skin in under 120 seconds.',
    author: 'Arctic_Glaciologist',
    createdAt: Date.now() - 3600000 * 144,
    likes: 112,
    category: 'warning',
    assignedCountry: 'Norway',
    assignedLandmark: 'Svalbard Outpost',
    replies: [
      {
        id: 'reply-9-1',
        author: 'Nordic_Sval_Host',
        content: 'Exactly correct! Also, if you rent a snowmobile, make sure you know how to operate the heated handle grips and double check the satellite personal beacon transponder (PLB) is charged before leaving.',
        createdAt: Date.now() - 3600000 * 130,
        isLocalExpert: true
      }
    ]
  }
];

const PRESET_AVATARS = ['🏕️', '✈️', '🎒', '🗺️', '🗼', '🍜', '🏄', '🧭', '🛖', '⛰️'];

export const TravelForum: React.FC<TravelForumProps> = ({
  language,
  selectedCountry,
  landmarkFocus,
  onFocusCountry,
  onFocusLandmark,
  availableLandmarks,
  triggerAudioTick
}) => {
  const currentLang = boardTranslations[language] ? language : 'en';
  const t = boardTranslations[currentLang];

  // Forum View sub-tab state (廣場 Feed OR 個人主页 Profile)
  const [forumSubTab, setForumSubTab] = useState<'feed' | 'profile'>('feed');

  // Posts master database feed list
  const [posts, setPosts] = useState<TravelPost[]>(() => {
    const saved = localStorage.getItem('travel_community_posts_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('travel_admin_mode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('travel_admin_mode', String(isAdmin));
  }, [isAdmin]);

  // Track post IDs created *by the current user session*
  const [userCreatedIds, setUserCreatedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('my_created_post_ids_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Custom inline deletion modal trigger (Bypasses iframe alert blockage)
  const [confirmDeleteTarget, setConfirmDeleteTarget] = useState<string | null>(null);

  // User Profile details
  const [nickname, setNickname] = useState<string>(() => {
    return localStorage.getItem('travel_profile_nickname_v2') || (currentLang === 'zh' ? '环球旅行家' : 'Wanderer');
  });
  const [avatar, setAvatar] = useState<string>(() => {
    return localStorage.getItem('travel_profile_avatar_v2') || '🎒';
  });
  const [userBio, setUserBio] = useState<string>(() => {
    return localStorage.getItem('travel_profile_bio_v2') || (currentLang === 'zh' ? '用脚步仗量世界，用心体验生活细节。' : 'Seeking footprints, landmarks, and nice conversations.');
  });

  // Text Expansion state tracking for exceptionally long content
  const [expandedTextIds, setExpandedTextIds] = useState<Record<string, boolean>>({});

  const [activeCategory, setActiveCategory] = useState<'all' | 'tip' | 'ask' | 'itinerary' | 'warning'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterByGlobeFocus, setFilterByGlobeFocus] = useState(false);
  
  // Submit thread form parameters
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'tip' | 'ask' | 'itinerary' | 'warning'>('ask');
  const [assocCountry, setAssocCountry] = useState<string>('');
  const [assocLandmark, setAssocLandmark] = useState<string>('');

  // Comment replies inputs
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  
  // Visual save flash notification
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  // Synchronize with server on mount and poll for updates so different accounts see each other's posts!
  useEffect(() => {
    let active = true;
    const loadPostsFromServer = () => {
      fetch("/api/posts")
        .then(r => r.json())
        .then(data => {
          if (active && Array.isArray(data)) {
            // Merge servers-side feed with client-side isLikedByUser state securely
            setPosts(currentPosts => {
              return data.map(serverPost => {
                const existing = currentPosts.find(p => p.id === serverPost.id);
                return {
                  ...serverPost,
                  isLikedByUser: existing ? existing.isLikedByUser : false
                };
              });
            });
          }
        })
        .catch(err => console.error("Error syncing with backend posts api:", err));
    };

    loadPostsFromServer();
    const intervalId = setInterval(loadPostsFromServer, 5000);

    return () => {
      active = false;
      clearInterval(intervalId);
    };
  }, []);

  // Persistence triggers
  useEffect(() => {
    localStorage.setItem('travel_community_posts_v3', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('my_created_post_ids_v3', JSON.stringify(userCreatedIds));
  }, [userCreatedIds]);

  // Handle active globe selection autofill when triggering the create dialog
  useEffect(() => {
    if (selectedCountry) {
      setAssocCountry(selectedCountry.properties.name);
    }
    if (landmarkFocus) {
      setAssocLandmark(landmarkFocus.name);
    }
  }, [selectedCountry, landmarkFocus, isCreating]);

  const handleLike = (postId: string) => {
    triggerAudioTick();
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    const isLiked = post.isLikedByUser;

    // Optimistically update locally
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          likes: isLiked ? p.likes - 1 : p.likes + 1,
          isLikedByUser: !isLiked
        };
      }
      return p;
    }));

    // Send to server
    fetch(`/api/posts/${postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isLiked: !isLiked })
    }).catch(err => console.error("Error syncing like on server:", err));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    triggerAudioTick();

    const brandNewId = `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const cleanNick = nickname.trim() || t.authorPlaceholder;

    const newPost: TravelPost = {
      id: brandNewId,
      title: newTitle.trim(),
      content: newContent.trim(),
      author: `${avatar} ${cleanNick}`,
      createdAt: Date.now(),
      likes: 0,
      replies: [],
      category: newCategory,
      assignedCountry: assocCountry || undefined,
      assignedLandmark: assocLandmark || undefined
    };

    // Optimistically update locally
    setPosts(prev => [newPost, ...prev]);
    setUserCreatedIds(prev => [brandNewId, ...prev]);

    // Send to server
    fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost)
    }).catch(err => console.error("Error posting new post on server:", err));
    
    // Reset form states
    setNewTitle('');
    setNewContent('');
    setIsCreating(false);
  };

  const handleAddReply = (postId: string) => {
    const replyText = replyInputs[postId];
    if (!replyText || !replyText.trim()) return;

    triggerAudioTick();

    const cleanNick = nickname.trim() || t.authorPlaceholder;

    const newReply: PostReply = {
      id: `reply-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      author: `${avatar} ${cleanNick}`,
      content: replyText.trim(),
      createdAt: Date.now(),
      isLocalExpert: false
    };

    // Keep side-effects outside of state transitions
    const post = posts.find(p => p.id === postId);
    const hasExpertMatch = post && post.category === 'ask' && post.replies.filter(r => r.isLocalExpert).length === 0;

    // Optimistically update locally
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [...p.replies, newReply]
        };
      }
      return p;
    }));

    // Send reply to server
    fetch(`/api/posts/${postId}/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: newReply.author,
        content: newReply.content,
        isLocalExpert: false
      })
    }).catch(err => console.error("Error writing reply on server:", err));

    if (hasExpertMatch) {
      setTimeout(() => {
        const expertRepliesEn = [
          "As a local living here, I suggest taking Metro Line 2 to detour traffic! Also historical museums are closed on Tuesdays. Make sure to check beforehand.",
          "Nice choice! Try visiting early in the morning around 7:30 AM before tourist buses arrive. The lighting is pristine for photos too!",
          "Friendly warning: Do not buy local souvenirs from the immediate street vendors; walk two blocks south to get authentic hand-crafted products at half price!"
        ];
        const expertRepliesZh = [
          "作为当地居民回答你：建议避开周末下午，因为人流会达到峰值！附近商户 and 博物馆周二休息，注意提前核实时间安排。",
          "非常棒的行程安排！建议在早上7:30前到达景点，彼时晨光柔和最适宜拍摄，还可以避开大批团客包车。",
          "友情防坑提示：千万不要在主要出入口附近购买推销的挂件；建议折向南边的一条小巷，在传统老手艺人那里只要半价！"
        ];

        const presetResp = currentLang === 'zh' ? expertRepliesZh : expertRepliesEn;
        const chosenMsg = presetResp[Math.floor(Math.random() * presetResp.length)];

        const simLocalReply: PostReply = {
          id: `reply-expert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          author: currentLang === 'zh' ? "☘️ 当地向导/经验者" : "☘️ Resident Expert",
          content: chosenMsg,
          createdAt: Date.now() + 1000,
          isLocalExpert: true
        };

        // Update locally
        setPosts(currentFeed => currentFeed.map(p => {
          if (p.id === postId) {
            // Defensive: ensure multiple timeouts or StrictMode ticks do not add double experts
            if (p.replies.some(r => r.isLocalExpert)) {
              return p;
            }
            return {
              ...p,
              replies: [...p.replies, simLocalReply]
            };
          }
          return p;
        }));

        // Send simulated expert reply to server as well
        fetch(`/api/posts/${postId}/replies`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            author: simLocalReply.author,
            content: simLocalReply.content,
            isLocalExpert: true
          })
        }).catch(err => console.error("Error writing simulated expert reply on server:", err));

      }, 1500);
    }

    setReplyInputs(prev => ({ ...prev, [postId]: '' }));
  };

  // Safe delete handler - sets target state to invoke elegant local custom confirm modal
  const requestDeletePost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    triggerAudioTick();
    setConfirmDeleteTarget(postId);
  };

  const executeDeleteTarget = () => {
    if (!confirmDeleteTarget) return;
    
    triggerAudioTick();
    const targetId = confirmDeleteTarget;

    // Optimistically update locally
    setPosts(prev => prev.filter(p => p.id !== targetId));
    setUserCreatedIds(prev => prev.filter(id => id !== targetId));

    // Send DELETE to server
    fetch(`/api/posts/${targetId}`, {
      method: "DELETE"
    }).catch(err => console.error("Error deleting post on server:", err));
    
    if (expandedPostId === targetId) {
      setExpandedPostId(null);
    }
    
    setConfirmDeleteTarget(null);
  };

  // Save Traveler profile details
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    triggerAudioTick();
    localStorage.setItem('travel_profile_nickname_v2', nickname);
    localStorage.setItem('travel_profile_avatar_v2', avatar);
    localStorage.setItem('travel_profile_bio_v2', userBio);
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  // Extract all Replies received on My custom created Posts ("看见谁回复了帖子")
  const getRepliesOnMyPosts = () => {
    const list: Array<{
      reply: PostReply;
      post: TravelPost;
    }> = [];

    posts.forEach(post => {
      if (userCreatedIds.includes(post.id)) {
        post.replies.forEach(reply => {
          const cleanNick = nickname.trim();
          const authorTrimmed = reply.author.replace(/[\uD800-\uDFFF].\s*/g, '').trim(); 
          
          if (authorTrimmed !== cleanNick) {
            list.push({ reply, post });
          }
        });
      }
    });

    return list.sort((a,b) => b.reply.createdAt - a.reply.createdAt);
  };

  const myPostsList = posts.filter(p => userCreatedIds.includes(p.id));
  const receivedReplies = getRepliesOnMyPosts();

  // Filter calculations
  const activeGlobeCountryName = selectedCountry?.properties.name;
  const activeGlobeLandmarkName = landmarkFocus?.name;

  const filteredPosts = posts.filter(post => {
    if (activeCategory !== 'all' && post.category !== activeCategory) {
      return false;
    }

    if (filterByGlobeFocus) {
      if (activeGlobeLandmarkName) {
        if (post.assignedLandmark !== activeGlobeLandmarkName) {
          return false;
        }
      } else if (activeGlobeCountryName) {
        if (post.assignedCountry !== activeGlobeCountryName) {
          return false;
        }
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = post.title.toLowerCase().includes(q);
      const inContent = post.content.toLowerCase().includes(q);
      const inAuthor = post.author.toLowerCase().includes(q);
      const inCountry = post.assignedCountry?.toLowerCase().includes(q) || false;
      const inLandmark = post.assignedLandmark?.toLowerCase().includes(q) || false;
      return inTitle || inContent || inAuthor || inCountry || inLandmark;
    }

    return true;
  });

  const formatDate = (ms: number) => {
    const diff = Date.now() - ms;
    if (diff < 60000) return currentLang === 'zh' ? '刚刚' : 'just now';
    if (diff < 3600000) {
      const mins = Math.floor(diff / 60000);
      return currentLang === 'zh' ? `${mins}分钟前` : `${mins}m ago`;
    }
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return currentLang === 'zh' ? `${hours}小时前` : `${hours}h ago`;
    }
    const days = Math.floor(diff / 86400000);
    return currentLang === 'zh' ? `${days}天前` : `${days}d ago`;
  };

  // Focus action handlers
  const handleBadgeClick = (post: TravelPost) => {
    triggerAudioTick();
    if (post.assignedLandmark) {
      const foundLm = availableLandmarks.find(l => l.name === post.assignedLandmark);
      if (foundLm) {
        onFocusLandmark(foundLm);
      }
    } else if (post.assignedCountry) {
      onFocusCountry(post.assignedCountry);
    }
  };

  const handleNotificationClick = (postId: string) => {
    setForumSubTab('feed');
    setExpandedPostId(postId);
    triggerAudioTick();
    
    setTimeout(() => {
      const el = document.getElementById(`feed-post-card-${postId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-[#C25B4E]', 'bg-[#FCFAF6]');
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-[#C25B4E]');
        }, 3000);
      }
    }, 150);
  };

  const toggleTextExpansion = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    triggerAudioTick();
    setExpandedTextIds(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <div className="space-y-4 animate-fade-in text-[#4A463F] w-full min-w-0 max-w-full overflow-x-hidden relative">
      
      {/* EXPLICIT SAFETY CUSTOM CONFIRM MODAL (Works around iframe modal blocking constraints) */}
      {confirmDeleteTarget && (
        <div className="absolute inset-0 bg-[#FCFAF6]/90 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="border border-[#C25B4E]/30 bg-white p-5 max-w-sm w-full space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-[#C25B4E] font-serif font-black text-sm">
              <ShieldAlert size={18} className="flex-shrink-0 animate-bounce" />
              <span>{t.confirmTitle}</span>
            </div>
            
            <p className="text-xs text-[#4A463F]/90 leading-relaxed font-sans">
              {userCreatedIds.includes(confirmDeleteTarget) ? t.deleteConfirm : t.deleteConfirmAdmin}
            </p>

            <div className="grid grid-cols-2 gap-2 font-mono text-[10px] uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setConfirmDeleteTarget(null)}
                className="py-2 border border-[#4A463F]/20 text-[#8C7A6B] hover:bg-[#FAF8F5] text-center cursor-pointer"
              >
                {t.confirmBtnCancel}
              </button>
              <button
                type="button"
                onClick={executeDeleteTarget}
                className="py-2 bg-[#C25B4E] hover:bg-[#A34538] text-white text-center font-bold cursor-pointer transition-colors"
              >
                {t.confirmBtnSubmit}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upper Module Control Bar */}
      <div className="space-y-1.5 w-full">
        <div className="flex items-center justify-between gap-2 max-w-full">
          <div className="flex items-center gap-1.5 truncate">
            <MessageSquare size={17} className="text-[#C25B4E] flex-shrink-0" />
            <h3 className="font-serif font-black text-lg tracking-tight text-[#4A463F] truncate">
              {t.postTitle}
            </h3>
          </div>
          
          {/* Sub Tab Switcher: Feed / Passport Profile */}
          <div className="flex items-center border border-[#4A463F]/15 rounded-none bg-[#FCFAF6] p-0.5 text-[10px] font-mono flex-shrink-0">
            <button
              onClick={() => {
                setForumSubTab('feed');
                triggerAudioTick();
              }}
              className={`px-2 py-1 transition-all cursor-pointer ${
                forumSubTab === 'feed'
                  ? 'bg-[#4A463F] text-white'
                  : 'text-[#8C7A6B] hover:text-[#4A463F]'
              }`}
            >
              {t.subTabFeed}
            </button>
            <button
              onClick={() => {
                setForumSubTab('profile');
                triggerAudioTick();
              }}
              className={`px-2 py-1 transition-all cursor-pointer flex items-center gap-1 ${
                forumSubTab === 'profile'
                  ? 'bg-[#4A463F] text-white'
                  : 'text-[#8C7A6B] hover:text-[#4A463F]'
              }`}
            >
              <User size={10} />
              {t.subTabProfile}
              {receivedReplies.length > 0 && (
                <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-[#C25B4E] text-white text-[8px] font-black leading-none">
                  {receivedReplies.length}
                </span>
              )}
            </button>
          </div>
        </div>
        <p className="text-[11px] text-[#4A463F]/70 leading-relaxed italic pr-2">
          {t.postDesc}
        </p>
      </div>

      {showSaveNotification && (
        <div 
          className="fixed md:bottom-6 md:right-6 bottom-4 left-4 right-4 md:left-auto bg-[#4A463F] text-[#FCFAF6] border border-[#FCFAF6]/30 py-3 px-4 font-mono text-xs shadow-2xl flex items-center gap-2.5 animate-fade-in rounded-none"
          style={{ zIndex: 99999 }}
        >
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <Check size={14} className="text-emerald-400 flex-shrink-0" />
          <span className="font-sans font-bold">{t.saveProfileSuccess}</span>
        </div>
      )}

      {/* RENDER PROFILE AND PASSPORT PANE */}
      {forumSubTab === 'profile' ? (
        <div className="space-y-4 animate-fade-in font-sans w-full min-w-0 max-w-full overflow-x-hidden">
          
          {showSaveNotification && (
            <div id="passport-update-success-alert" className="border border-emerald-500/20 bg-emerald-500/5 text-emerald-800 p-3 text-xs flex items-center gap-2 animate-fade-in">
              <Check size={14} className="text-emerald-600 flex-shrink-0" />
              <div className="text-left font-sans">
                <span className="font-bold block text-emerald-900">
                  {currentLang === 'zh' ? '资料保存成功！' : 'Passport details updated!'}
                </span>
                <span className="text-[10px] text-emerald-700/90 font-mono">
                  {currentLang === 'zh' ? '您的虚拟旅行者护照已更新并保存在本地浏览器。' : 'Your virtual traveler card has been successfully written to local memory.'}
                </span>
              </div>
            </div>
          )}

          {/* PASSPORT EMBOSSED CARD */}
          <div className="border border-[#4A463F]/15 bg-[#FCFAF6] relative overflow-hidden p-4 rounded-none shadow-sm flex flex-col gap-4 pb-5">
            {/* Top Passport Ribbon Decorative element */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#C25B4E]" />
            <div className="absolute top-1.5 right-3 text-[8px] font-mono tracking-widest text-[#8C7A6B]/50 uppercase">
              REPUBLIQUE NOMADE
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 w-full min-w-0">
              {/* Avatar Selector and Preset Choices arranged side-by-side cleanly without breaking layout */}
              <div className="flex items-center gap-4 border-b border-[#4A463F]/10 pb-3.5 mt-1.5">
                {/* Big Active Avatar Indicator */}
                <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                  <div className="w-14 h-14 bg-[#FAF8F5] border-2 border-dashed border-[#4A463F]/20 flex items-center justify-center text-3xl shadow-inner select-none">
                    {avatar}
                  </div>
                  <span className="text-[8px] font-mono text-[#8C7A6B] uppercase tracking-wide">{t.avatarLabel}</span>
                </div>

                {/* Preset List choices */}
                <div className="flex-1 space-y-1 text-left">
                  <span className="block text-[8px] font-mono uppercase tracking-wider text-[#8C7A6B]/80 font-bold">
                    {currentLang === 'zh' ? '点击图标选择您的旅行头像印章' : 'Click stencil to choose travel decal'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {PRESET_AVATARS.map((av) => (
                      <button
                        key={av}
                        type="button"
                        onClick={() => {
                          setAvatar(av);
                          triggerAudioTick();
                        }}
                        className={`w-7 h-7 flex items-center justify-center border transition-all text-sm rounded-none ${
                          avatar === av 
                            ? 'bg-[#C25B4E] border-[#C25B4E] text-white font-bold' 
                            : 'bg-[#FAF8F5] border-[#4A463F]/10 hover:border-[#4A463F] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form entries */}
              <div className="grid grid-cols-1 gap-3.5 text-left">
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono uppercase tracking-wider text-[#8C7A6B] font-bold">
                    {t.authorLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#4A463F]/15 px-3 py-1.5 text-xs focus:outline-none focus:border-[#C25B4E] rounded-none text-[#4A463F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-mono uppercase tracking-wider text-[#8C7A6B] font-bold">
                    {t.profileBioLabel}
                  </label>
                  <input
                    type="text"
                    value={userBio}
                    placeholder={t.profileBioPlaceholder}
                    onChange={(e) => setUserBio(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#4A463F]/15 px-3 py-1.5 text-xs focus:outline-none focus:border-[#C25B4E] rounded-none text-[#4A463F]"
                  />
                </div>
              </div>

              {/* Submit passport form - Large action button stretching across full card width for maximal click area & zero overlapping */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#4A463F] hover:bg-[#C25B4E] text-[#FCFAF6] font-mono text-[9.5px] tracking-widest uppercase transition-all cursor-pointer font-bold text-center block rounded-none border border-transparent shadow-xs"
                >
                  ✨ {t.saveProfileBtn}
                </button>
              </div>
            </form>
          </div>

          {/* DYNAMIC NOTIFICATIONS SYSTEM ("看见谁回复了帖子") */}
          <div className="space-y-2">
            <h4 className="font-serif font-black text-sm text-[#4A463F] flex items-center gap-1.5 border-b border-[#4A463F]/10 pb-1">
              <Bell size={13} className="text-[#C25B4E]" />
              <span>{t.receivedRepliesLabel} ({receivedReplies.length})</span>
            </h4>
            
            {receivedReplies.length === 0 ? (
              <div className="border border-[#4A463F]/10 p-5 text-center bg-[#FCFAF6]/60 text-xs italic text-[#8C7A6B]/80 font-sans">
                {t.noRepliesReceivedYet}
              </div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                {receivedReplies.map(({ reply, post }, idx) => (
                  <div 
                    key={`${reply.id}-${idx}`} 
                    onClick={() => handleNotificationClick(post.id)}
                    className="border border-[#4A463F]/10 p-2.5 bg-[#FCFAF6] hover:bg-[#FAF8F5] transition-all cursor-pointer flex flex-col gap-1 pr-8 relative group"
                  >
                    <ArrowRight size={12} className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-[#8C7A6B] opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex flex-wrap items-center justify-between text-[9px] font-mono text-[#8C7A6B] gap-1">
                      <span className="flex items-center gap-1">
                        <span className="font-black text-[#4A463F]/80">{reply.author}</span>
                        <span>{t.whoReplied}</span>
                      </span>
                      <span>{formatDate(reply.createdAt)}</span>
                    </div>

                    <div className="text-[11px] text-[#4A463F] font-bold line-clamp-1 italic text-xs leading-snug break-all text-left">
                      "{reply.content}"
                    </div>

                    <div className="text-[9px] font-mono text-[#8C7A6B] flex items-center gap-1 border-t border-[#4A463F]/5 pt-1 uppercase">
                      <Bookmark size={8} /> {t.jumpToPost}: <span className="underline max-w-[200px] truncate">{post.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* HISTORY LIST: USER'S CREATED/AUTHORED POSTS ("管理自己发过的帖并清理下架") */}
          <div className="space-y-2">
            <h4 className="font-serif font-black text-sm text-[#4A463F] flex items-center gap-1.5 border-b border-[#4A463F]/10 pb-1">
              <Bookmark size={13} className="text-[#C25B4E]" />
              <span>{t.myPostsLabel} ({myPostsList.length})</span>
            </h4>

            {myPostsList.length === 0 ? (
              <div className="border border-[#4A463F]/10 p-5 text-center bg-[#FCFAF6]/60 text-xs italic text-[#8C7A6B]/80 font-sans">
                {t.noPostsCreatedYet}
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                {myPostsList.map((myPost) => (
                  <div key={myPost.id} className="border border-[#4A463F]/10 p-2.5 bg-[#FCFAF6] flex items-center justify-between gap-3 text-xs w-full min-w-0">
                    <div className="flex-1 min-w-0 pr-1 text-left">
                      <h5 
                        onClick={() => handleNotificationClick(myPost.id)}
                        className="font-bold text-[#4A463F] hover:text-[#C25B4E] cursor-pointer truncate text-[11px] break-all"
                      >
                        {myPost.title}
                      </h5>
                      <p className="text-[9px] font-mono text-[#8C7A6B] mt-0.5">
                        {formatDate(myPost.createdAt)} • {myPost.replies.length} {t.replyCount}
                      </p>
                    </div>

                    <button
                      onClick={(e) => requestDeletePost(myPost.id, e)}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-[#C25B4E]/10 hover:bg-[#C25B4E] text-[#C25B4E] hover:text-white border border-[#C25B4E]/25 transition-colors font-mono text-[9px] uppercase cursor-pointer flex-shrink-0"
                    >
                      <Trash2 size={10} />
                      <span>{t.deleteBtn}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MODERATOR OVERRIDE DASHBOARD */}
          <div className="space-y-3 pt-3 border-t border-[#4A463F]/10">
            <h4 className="font-serif font-black text-sm text-[#4A463F] flex items-center gap-1.5 border-b border-[#4A463F]/10 pb-1">
              <ShieldCheck size={13} className="text-[#C25B4E]" />
              <span>{t.adminModeSetting || "版主管理员功能"}</span>
            </h4>

            <div className="border border-[#C25B4E]/10 p-3 bg-[#FCFAF6] space-y-2.5 text-left">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-0.5 text-left">
                  <span className="block text-[11px] font-bold text-[#4A463F]">{t.adminModeEnable || "开启超级管理员权限"}</span>
                  <span className="block text-[9px] leading-relaxed text-[#8C7A6B] max-w-xs">{t.adminModeDesc}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdmin(!isAdmin);
                    triggerAudioTick();
                  }}
                  className={`px-3 py-1 text-[9px] font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                    isAdmin
                      ? "bg-[#C25B4E] border-[#C25B4E] text-white font-bold"
                      : "bg-transparent border-[#4A463F]/20 text-[#8C7A6B] hover:border-[#4A463F]"
                  }`}
                >
                  {isAdmin ? (currentLang === 'zh' ? '已启用' : 'ACTIVE') : (currentLang === 'zh' ? '已关闭' : 'INACTIVE')}
                </button>
              </div>

              {/* Admin-only destructive action: Delete All Posts */}
              {isAdmin && (
                <div className="pt-2 border-t border-[#4A463F]/10 space-y-2 text-left">
                  <div className="text-[10px] font-mono text-amber-700/90 font-semibold leading-relaxed">
                    ⚙️ {currentLang === 'zh' ? '超级管理员一键清理工具：' : 'Administrator Flush Controls:'}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      triggerAudioTick();
                      const msg = currentLang === 'zh' ? '确定要永久【删除并清空】社区内的所有旅行帖子吗？该操作不可逆，将同时清空服务器与本地数据库！' : 'Are you sure you want to permanently FLUSH and DELETE all forum posts across the entire server and client cache? This action is IRREVERSIBLE!';
                      if (window.confirm(msg)) {
                        fetch('/api/posts', { method: 'DELETE' })
                          .then(res => res.json())
                          .then(() => {
                            setPosts([]);
                            localStorage.setItem('travel_community_posts_v3', '[]');
                          })
                          .catch(err => console.error("Error clearing all posts:", err));
                      }
                    }}
                    className="w-full py-2 bg-[#C25B4E] hover:bg-[#A34538] text-[#FCFAF6] font-mono text-[9px] uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Trash2 size={11} />
                    <span>{currentLang === 'zh' ? '一键删除/清空所有帖子' : 'Flush & Delete All Posts'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      ) : (
        /* DISCUSSIONS FORUM FEED VIEW & MAIN BODY LIST */
        <div className="space-y-4 animate-fade-in w-full min-w-0 max-w-full overflow-x-hidden text-left">
          
          {/* Active Globe Selected Country Focus Sticky Info Banner */}
          {(activeGlobeCountryName || activeGlobeLandmarkName) && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 bg-[#C25B4E]/5 border border-[#C25B4E]/15 rounded-none text-xs font-mono">
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-[#C25B4E] animate-pulse" />
                <span className="text-[10px] text-[#8C7A6B] uppercase tracking-wider">{t.activeFilterCountry}:</span>
                <span className="font-bold underline text-[#C25B4E] cursor-pointer" onClick={() => {
                  if (landmarkFocus) {
                    onFocusLandmark(landmarkFocus);
                  } else if (selectedCountry) {
                    onFocusCountry(selectedCountry.properties.name);
                  }
                }}>
                  {activeGlobeLandmarkName || activeGlobeCountryName}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setFilterByGlobeFocus(!filterByGlobeFocus);
                    triggerAudioTick();
                  }}
                  className={`px-2 py-0.5 border text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                    filterByGlobeFocus 
                      ? 'bg-[#C25B4E] text-white border-[#C25B4E]' 
                      : 'bg-transparent text-[#4A463F]/60 border-[#4A463F]/25 hover:border-[#4A463F]'
                  }`}
                >
                  {filterByGlobeFocus ? (currentLang === 'zh' ? "已筛选" : "FILTERED") : (currentLang === 'zh' ? "显示全部" : "SHOW ALL")}
                </button>
              </div>
            </div>
          )}

          {/* New Post Dialog Entry trigger button is positioned at the very top of feeds */}
          {!isCreating && (
            <button
              onClick={() => {
                setIsCreating(true);
                triggerAudioTick();
              }}
              className="w-full py-2 bg-[#FCFAF6] border border-[#4A463F]/15 hover:border-[#C25B4E] hover:bg-[#C25B4E]/5 text-[#4A463F] font-mono text-[10px] tracking-widest uppercase transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus size={11} className="text-[#C25B4E]" />
              <span>{t.newPostBtn}</span>
            </button>
          )}

          {/* New Post Dialog / Form Card Area */}
          {isCreating && (
            <form onSubmit={handleCreatePost} className="border border-[#4A463F]/15 p-4 bg-[#FCFAF6] space-y-4 font-sans animate-slide-up shadow-md w-full min-w-0">
              <div className="flex items-center justify-between border-b border-[#4A463F]/10 pb-2">
                <span className="font-serif font-black text-sm tracking-wide text-[#C25B4E] flex items-center gap-1.5">
                  <Plus size={13} />
                  {t.newPostBtn}
                </span>
                <button 
                  type="button" 
                  onClick={() => {
                    setIsCreating(false);
                    triggerAudioTick();
                  }}
                  className="text-xs text-[#8C7A6B] hover:text-[#4A463F] underline font-mono cursor-pointer"
                >
                  {t.cancelBtn}
                </button>
              </div>

              {/* Form input - Title */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8C7A6B]">
                  {t.titleLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={t.titlePlaceholder}
                  className="w-full bg-[#FAF8F5] border border-[#4A463F]/15 px-3 py-2 text-xs focus:outline-none focus:border-[#C25B4E] transition-all"
                />
              </div>

              {/* Form select - Category & Author metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8C7A6B]">
                    {t.categoryLabel}
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#4A463F]/15 px-2 py-2 text-xs focus:outline-none focus:border-[#C25B4E]"
                  >
                    <option value="ask">💬 {t.categories.ask}</option>
                    <option value="tip">💡 {t.categories.tip}</option>
                    <option value="itinerary">📅 {t.categories.itinerary}</option>
                    <option value="warning">⚠️ {t.categories.warning}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8C7A6B]">
                    {t.authorLabel}
                  </label>
                  <div className="w-full bg-[#FCFAF6] border border-[#4A463F]/10 px-3 py-2 text-xs text-[#4A463F] flex items-center gap-1 font-bold">
                    <span>{avatar}</span>
                    <span>{nickname}</span>
                  </div>
                </div>
              </div>

              {/* Location details (Autofilled if globe selection has focus) */}
              <div className="border border-[#4A463F]/10 p-2.5 bg-[#FAF8F5] grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] font-mono text-[#4A463F]">
                <div>
                  <span className="block text-[#8C7A6B] uppercase mb-1">{currentLang === 'zh' ? '关联国家' : 'Assoc. Country'}</span>
                  <input
                    type="text"
                    placeholder={t.noCountry}
                    value={assocCountry}
                    onChange={(e) => setAssocCountry(e.target.value)}
                    className="w-full bg-[#FCFAF6] border border-[#4A463F]/10 px-2 py-1 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <span className="block text-[#8C7A6B] uppercase mb-1">{currentLang === 'zh' ? '关联景点' : 'Assoc. Landmark'}</span>
                  <select
                    value={assocLandmark}
                    onChange={(e) => setAssocLandmark(e.target.value)}
                    className="w-full bg-[#FCFAF6] border border-[#4A463F]/10 px-2.5 py-1 text-xs focus:outline-none"
                  >
                    <option value="">-- {t.noLandmark} --</option>
                    {availableLandmarks.map((lm) => (
                      <option key={lm.name} value={lm.name}>{lm.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Form input - Content */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8C7A6B]">
                  {t.contentLabel} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder={t.contentPlaceholder}
                  className="w-full bg-[#FAF8F5] border border-[#4A463F]/15 px-3 py-2 text-xs focus:outline-none focus:border-[#C25B4E] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#4A463F] hover:bg-[#C25B4E] text-white font-mono text-[11px] tracking-widest uppercase transition-all duration-300 cursor-pointer"
              >
                {t.submitBtn}
              </button>
            </form>
          )}

          {/* Search bar & Category chips controller */}
          <div className="space-y-2 w-full">
            {/* Search Input Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-[#FAF8F5] border border-[#4A463F]/15 pl-8 pr-3 py-2 text-xs focus:outline-none focus:border-[#C25B4E]"
              />
              <Search size={12} className="absolute left-2.5 top-3 text-[#8C7A6B]" />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-1 font-mono text-[9px] uppercase tracking-wider">
              {(['all', 'tip', 'ask', 'itinerary', 'warning'] as const).map((catName) => {
                const Icon = CATEGORY_ICONS[catName];
                const isSel = activeCategory === catName;
                return (
                  <button
                    key={catName}
                    onClick={() => {
                      setActiveCategory(catName);
                      triggerAudioTick();
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 border transition-all cursor-pointer ${
                      isSel 
                        ? 'bg-[#4A463F] text-white border-[#4A463F] font-bold' 
                        : 'bg-[#FCFAF6] text-[#4A463F]/65 border-[#4A463F]/15 hover:border-[#4A463F]'
                    }`}
                  >
                    <Icon size={10} className={isSel ? 'text-white' : 'text-[#8C7A6B]'} />
                    {t.categories[catName]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Feed Post Loop */}
          <div className="space-y-3 w-full max-h-[52vh] sm:max-h-[58vh] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
            {filteredPosts.length === 0 ? (
              <div className="border border-[#4A463F]/15 p-8 text-center bg-[#FCFAF6] font-sans space-y-2 rounded-none">
                <Info size={24} className="mx-auto text-[#8C7A6B]/50 animate-pulse" />
                <p className="text-xs text-[#8C7A6B] italic">{t.noPosts}</p>
              </div>
            ) : (
              filteredPosts.map((post) => {
                const isDanger = post.category === 'warning';
                const CatIcon = CATEGORY_ICONS[post.category] || Compass;
                const isExpanded = expandedPostId === post.id;
                
                // Identify ownership safely to render a delete trigger in feed
                const isMyAuthoredPost = userCreatedIds.includes(post.id);
                const showDeleteButton = isMyAuthoredPost || isAdmin;

                // Long text limit & wordwrap handling ("文字太长会超出帖子")
                const shouldTruncate = post.content.length > 220;
                const isTextExpanded = expandedTextIds[post.id] || false;
                const displayContent = (shouldTruncate && !isTextExpanded) 
                  ? post.content.slice(0, 220) + '...'
                  : post.content;

                return (
                  <div 
                    id={`feed-post-card-${post.id}`}
                    key={post.id} 
                    className={`border text-[11px] bg-[#FCFAF6]/95 hover:bg-[#FCFAF6] transition-all flex flex-col w-full max-w-full overflow-x-hidden ${
                      isDanger 
                        ? 'border-[#C25B4E]/30 border-l-[3px] border-l-[#C25B4E]' 
                        : 'border-[#4A463F]/15'
                    }`}
                  >
                    
                    {/* Post Header Meta Row */}
                    <div className="p-3 border-b border-[#4A463F]/10 space-y-1.5 w-full min-w-0">
                      <div className="flex items-center justify-between gap-1 text-[9px] font-mono text-[#8C7A6B]">
                        <span className="flex items-center gap-1 min-w-0 max-w-[70%] truncate">
                          <User size={10} className="flex-shrink-0" />
                          <span className="font-bold text-[#4A463F]/85 truncate">{post.author}</span>
                          {isMyAuthoredPost && (
                            <span className="px-1 bg-[#4A463F]/10 border border-[#4A463F]/15 text-[#4A463F] select-none text-[7.5px] uppercase font-bold transform scale-90 flex-shrink-0">
                              {currentLang === 'zh' ? '我发出的' : 'MINE'}
                            </span>
                          )}
                        </span>
                        
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="flex items-center gap-1 text-[8.5px]">
                            <Clock size={10} />
                            {formatDate(post.createdAt)}
                          </span>

                          {/* Deletion trigger button based on ownership */}
                          {showDeleteButton && (
                            <button
                              onClick={(e) => requestDeletePost(post.id, e)}
                              className="text-[#C25B4E]/70 hover:text-[#C25B4E] cursor-pointer p-0.5 transition-colors"
                              title={t.deleteBtn}
                            >
                              <Trash2 size={11} className="text-[#8C7A6B] hover:text-[#C25B4E]" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Post Title - Strict wordwrap and break elements preventing overflow */}
                      <h4 
                        className="font-serif font-black text-[13px] text-[#4A463F] hover:text-[#C25B4E] leading-snug cursor-pointer flex items-start gap-1.5 break-words overflow-x-hidden min-w-0 max-w-full" 
                        onClick={() => {
                          setExpandedPostId(isExpanded ? null : post.id);
                          triggerAudioTick();
                        }}
                      >
                        <CatIcon size={12} className={`mt-0.5 flex-shrink-0 ${isDanger ? 'text-[#C25B4E]' : 'text-[#8C7A6B]'}`} />
                        <span className="break-all min-w-0 w-full overflow-hidden block text-left">{post.title}</span>
                      </h4>

                      {/* Linked location tags */}
                      {(post.assignedCountry || post.assignedLandmark) && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1.5 max-w-full">
                          <button
                            onClick={() => handleBadgeClick(post)}
                            className="flex items-center gap-1 px-1.5 py-0.5 bg-[#4A463F]/5 border border-[#4A463F]/10 hover:border-[#C25B4E] text-[8.5px] font-mono text-[#8C7A6B] hover:text-[#C25B4E] uppercase tracking-wider transition-all cursor-pointer truncate"
                            title={currentLang === 'zh' ? "在地球上聚焦" : "Focus on Globe"}
                          >
                            <MapPin size={8} className="text-[#C25B4E] flex-shrink-0" />
                            <span className="truncate max-w-[200px]">{post.assignedLandmark || post.assignedCountry}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Post Main Body content - Wrap words nicely, enforce break-all to prevent unspaced character overflow */}
                    <div className="p-3 text-xs text-[#4A463F]/90 leading-relaxed whitespace-pre-wrap font-sans break-all overflow-x-hidden w-full min-w-0 text-left">
                      <span>{displayContent}</span>
                      
                      {/* Truncated "Show More" / "Show Less" toggle controls */}
                      {shouldTruncate && (
                        <button
                          onClick={(e) => toggleTextExpansion(post.id, e)}
                          className="text-[#C25B4E] hover:text-[#A34538] font-bold font-mono ml-2 inline-flex items-center gap-0.5 cursor-pointer underline text-[10px]"
                        >
                          {isTextExpanded ? `[ ${t.showLess} ]` : `[ ${t.showMore} ]`}
                        </button>
                      )}
                    </div>

                    {/* Engagement stats dashboard panel */}
                    <div className="px-3 py-2 bg-[#FAF8F5]/80 border-t border-[#4A463F]/10 flex items-center justify-between w-full">
                      <div className="flex items-center gap-4 text-[10px] font-mono">
                        <button 
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1 transition-all cursor-pointer ${
                            post.isLikedByUser 
                              ? 'text-[#C25B4E] font-bold scale-105' 
                              : 'text-[#8C7A6B] hover:text-[#C25B4E]'
                          }`}
                        >
                          <Heart size={11} fill={post.isLikedByUser ? 'currentColor' : 'none'} />
                          <span>{post.likes} {t.likeCount}</span>
                        </button>

                        <button 
                          onClick={() => {
                            setExpandedPostId(isExpanded ? null : post.id);
                            triggerAudioTick();
                          }}
                          className="flex items-center gap-1 text-[#8C7A6B] hover:text-[#4A463F] cursor-pointer"
                        >
                          <MessageSquare size={11} />
                          <span>{post.replies.length} {t.replyCount}</span>
                        </button>
                      </div>

                      <button 
                        onClick={() => {
                          setExpandedPostId(isExpanded ? null : post.id);
                          triggerAudioTick();
                        }}
                        className="text-[9.5px] font-mono text-[#8C7A6B] hover:text-[#4A463F] flex items-center gap-0.5 cursor-pointer"
                      >
                        {isExpanded ? (currentLang === 'zh' ? "收起互动" : "COLLAPSE") : (currentLang === 'zh' ? "展开回复讨论" : "EXPAND DISCUSSION")}
                        <ChevronDown size={10} className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* Interactive Comments list drawer */}
                    {isExpanded && (
                      <div className="bg-[#FAF8F5] border-t border-[#4A463F]/10 p-3 space-y-3 font-sans w-full min-w-0 overflow-hidden text-left">
                        
                        {/* Replies list */}
                        {post.replies.length > 0 && (
                          <div className="space-y-2 border-b border-[#4A463F]/10 pb-3 max-h-56 overflow-y-auto w-full min-w-0" style={{ scrollbarWidth: 'thin' }}>
                            {post.replies.map((reply) => (
                              <div key={reply.id} className="p-2 border border-[#4A463F]/5 bg-[#FCFAF6] space-y-1 rounded-sm w-full min-w-0 break-all overflow-x-hidden text-left">
                                <div className="flex items-center justify-between text-[9px] font-mono text-[#8C7A6B] gap-1">
                                  <span className="flex items-center gap-1 min-w-0 max-w-[70%] truncate">
                                    <span className="font-bold text-[#4A463F]/75 truncate">{reply.author}</span>
                                    {reply.isLocalExpert && (
                                      <span className="px-1 bg-[#C25B4E]/10 border border-[#C25B4E]/20 text-[#C25B4E] uppercase tracking-widest text-[7.5px] font-black rounded-xs select-none flex-shrink-0">
                                        {t.localExpertLabel}
                                      </span>
                                    )}
                                  </span>
                                  <span className="flex-shrink-0">{formatDate(reply.createdAt)}</span>
                                </div>
                                <p className="text-[11px] text-[#4A463F] leading-normal break-all overflow-hidden w-full text-left">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Leave a reply input action bar */}
                        <div className="flex gap-2 w-full">
                          <input
                            type="text"
                            value={replyInputs[post.id] || ''}
                            onChange={(e) => setReplyInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleAddReply(post.id);
                              }
                            }}
                            placeholder={t.addReplyPlaceholder}
                            className="flex-1 bg-white border border-[#4A463F]/15 px-2.5 py-1.5 text-xs focus:outline-none min-w-0"
                          />
                          <button
                            onClick={() => handleAddReply(post.id)}
                            className="px-3 bg-[#4A463F] hover:bg-[#C25B4E] text-white font-mono text-[10px] tracking-widest transition-all uppercase flex items-center justify-center cursor-pointer flex-shrink-0"
                          >
                            <Send size={10} />
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

    </div>
  );
};
