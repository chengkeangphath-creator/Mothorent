export type Language = 'en' | 'km' | 'zh';

export interface Translations {
  nav: {
    home: string;
    browse: string;
    map: string;
    about: string;
    contact: string;
    dashboard: string;
    ownerPortal: string;
    adminPanel: string;
    login: string;
    register: string;
    logout: string;
    role: string;
    roleCustomer: string;
    roleOwner: string;
    roleAdmin: string;
    tagline: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    provincesMetric: string;
    verifiedMetric: string;
    rateMetric: string;
    supportMetric: string;
  };
  search: {
    destination: string;
    allProvinces: string;
    bikeCategory: string;
    allCategories: string;
    scooter: string;
    dirtBike: string;
    manual: string;
    sport: string;
    touring: string;
    pickupDate: string;
    returnDate: string;
    searchFleet: string;
    locateMe: string;
  };
  fleet: {
    featuredTitle: string;
    featuredSubtitle: string;
    allFleet: string;
    scooters: string;
    dirtBikes: string;
    manualSemi: string;
    touring: string;
    viewDetails: string;
    bookNow: string;
    day: string;
    deposit: string;
    verifiedOwner: string;
    reviews: string;
    exploreAll: string;
    instantConfirmation: string;
  };
  provinces: {
    exploreBadge: string;
    title: string;
    subtitle: string;
    viewAllMap: string;
    bikesCount: string;
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  ownerCta: {
    badge: string;
    title: string;
    highlight: string;
    desc: string;
    button: string;
    learnMore: string;
  };
  footer: {
    desc: string;
    verifiedOwners: string;
    zeroFees: string;
    explore: string;
    allBikes: string;
    findMap: string;
    howItWorks: string;
    listBike: string;
    topDestinations: string;
    needHelp: string;
    provincesTitle: string;
    copyright: string;
  };
  chatbot: {
    launcher: string;
    title: string;
    online: string;
    welcome: string;
    askAngkor: string;
    askLicense: string;
    askKampot: string;
    placeholder: string;
    typing: string;
    recommended: string;
  };
  auth: {
    signInTitle: string;
    signInSubtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    rememberMe: string;
    forgotPassword: string;
    signInButton: string;
    signingIn: string;
    orQuickDemo: string;
    demoCustomer: string;
    demoOwner: string;
    demoAdmin: string;
    noAccount: string;
    createAccount: string;
    selectRoleTab: string;
    customerRoleDesc: string;
    ownerRoleDesc: string;
    adminRoleDesc: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      browse: "Browse Fleet",
      map: "Map & Location",
      about: "About",
      contact: "Contact",
      dashboard: "My Dashboard",
      ownerPortal: "Owner Portal",
      adminPanel: "Admin Panel",
      login: "Log In",
      register: "Get Started",
      logout: "Log Out",
      role: "Role",
      roleCustomer: "Customer View",
      roleOwner: "Motorcycle Owner",
      roleAdmin: "Administrator",
      tagline: "Cambodia Moto Travel",
    },
    hero: {
      badge: "Discover Cambodia on Two Wheels • 25 Provinces Covered",
      titleLine1: "Rent Reliable Motorcycles",
      titleLine2: "Anywhere in Cambodia",
      subtitle: "From automatic city scooters for Angkor Wat to dual-sport bikes for Bokor Mountain trails. Connect with verified owners with transparent pricing in USD.",
      provincesMetric: "Provinces Covered",
      verifiedMetric: "Verified Owners",
      rateMetric: "Daily Rental Rate",
      supportMetric: "AI & Road Support",
    },
    search: {
      destination: "Destination Province",
      allProvinces: "All Cambodia Provinces",
      bikeCategory: "Bike Category",
      allCategories: "All Categories",
      scooter: "Automatic Scooter (110-160cc)",
      dirtBike: "Dual Sport / Dirt Bike",
      manual: "Manual / Semi-Auto",
      sport: "Sport Street Bike",
      touring: "Adventure Touring",
      pickupDate: "Pickup Date",
      returnDate: "Return Date",
      searchFleet: "Search Fleet",
      locateMe: "Find near my location",
    },
    fleet: {
      featuredTitle: "Featured Motorcycle Fleet",
      featuredSubtitle: "Maintained, insured, and verified by trusted local Cambodian owners.",
      allFleet: "All Fleet",
      scooters: "Scooters",
      dirtBikes: "Dirt Bikes",
      manualSemi: "Manual/Semi",
      touring: "Touring",
      viewDetails: "View Details",
      bookNow: "Book Now",
      day: "/ day",
      deposit: "Deposit",
      verifiedOwner: "Verified Owner",
      reviews: "reviews",
      exploreAll: "Explore All Motorcycles",
      instantConfirmation: "Instant Confirmation",
    },
    provinces: {
      exploreBadge: "Explore Top Destinations",
      title: "Popular Provinces in Cambodia",
      subtitle: "Find bikes available at major travel hubs, bus stations, and town centers.",
      viewAllMap: "View All 25 Provinces on Map",
      bikesCount: "Bikes",
    },
    howItWorks: {
      badge: "Simple 3-Step Process",
      title: "How Motho Rent Works",
      subtitle: "Renting a motorcycle in Cambodia has never been this transparent, safe, and straightforward.",
      step1Title: "Choose Motorcycle & Dates",
      step1Desc: "Filter by Cambodian province, price, transmission, or engine cc. Check real photos, specifications, and verified ratings.",
      step2Title: "Book Online With Owner",
      step2Desc: "Submit your dates and special requests. The verified owner confirms the booking and provides the exact Google Maps pickup pin.",
      step3Title: "Pickup, Ride & Explore",
      step3Desc: "Inspect your motorcycle, grab 2 clean helmets, check in with the owner, and embark on your Cambodian road trip adventure!",
    },
    ownerCta: {
      badge: "For Motorcycle Owners in Cambodia",
      title: "Own a Motorcycle in Cambodia?",
      highlight: "Turn It Into Daily Rental Income.",
      desc: "List your motorcycle in minutes, set your daily price and availability, accept verified tourist bookings, and receive direct payments safely.",
      button: "List Your Motorcycle Now",
      learnMore: "Learn How Owner Earnings Work",
    },
    footer: {
      desc: "Cambodia's premier motorcycle rental marketplace. We connect verified local motorcycle owners with travelers seeking authentic road trip adventures across all 25 provinces.",
      verifiedOwners: "Verified Owners",
      zeroFees: "Hidden Fees",
      explore: "Explore",
      allBikes: "All Motorcycles",
      findMap: "Find on Google Map",
      howItWorks: "How Rentals Work",
      listBike: "List Your Motorcycle",
      topDestinations: "Top Destinations",
      needHelp: "Need Help?",
      provincesTitle: "Motorcycles Available Across 25 Cambodian Provinces:",
      copyright: "All rights reserved. Built for travelers in Cambodia.",
    },
    chatbot: {
      launcher: "Motho AI Travel Guide",
      title: "Motho AI Assistant",
      online: "Online",
      welcome: "Hello! ជំរាបសួរ! 您好! I am Motho AI, your Cambodia motorcycle travel advisor. Ask me anything about bike recommendations, rental rules, or road trips across Cambodia's 25 provinces!",
      askAngkor: "🏛️ Angkor Wat bike?",
      askLicense: "📜 License rules?",
      askKampot: "⛰️ Kampot trails",
      placeholder: "Ask in English, ភាសាខ្មែរ, or 中文...",
      typing: "Motho AI is typing recommendations...",
      recommended: "Recommended for You:",
    },
    auth: {
      signInTitle: "Sign in to Motho Rent",
      signInSubtitle: "Manage your motorcycle reservations, fleet listings, or administration console.",
      emailLabel: "Email Address",
      emailPlaceholder: "name@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      rememberMe: "Remember me for 30 days",
      forgotPassword: "Forgot password?",
      signInButton: "Sign In to Account",
      signingIn: "Verifying credentials...",
      orQuickDemo: "Instant 1-Click Demo Accounts:",
      demoCustomer: "Customer (Traveler)",
      demoOwner: "Motorcycle Owner",
      demoAdmin: "Administrator",
      noAccount: "Don't have an account?",
      createAccount: "Create an Account",
      selectRoleTab: "Select Account Type",
      customerRoleDesc: "Renting motorcycles for trips across Cambodia",
      ownerRoleDesc: "Renting out your motorcycles to earn income",
      adminRoleDesc: "Platform management, verifications & analytics",
    },
  },

  km: {
    nav: {
      home: "ទំព័រដើម",
      browse: "មើលម៉ូតូទាំងអស់",
      map: "ផែនទី & ទីតាំង",
      about: "អំពីយើង",
      contact: "ទំនាក់ទំនង",
      dashboard: "ផ្ទាំងគ្រប់គ្រងខ្ញុំ",
      ownerPortal: "ច្រកម្ចាស់ម៉ូតូ",
      adminPanel: "ផ្ទាំងអ្នកគ្រប់គ្រង",
      login: "ចូលគណនី",
      register: "ចុះឈ្មោះ",
      logout: "ចាកចេញ",
      role: "តួនាទី",
      roleCustomer: "អ្នកជួលម៉ូតូ",
      roleOwner: "ម្ចាស់ម៉ូតូ",
      roleAdmin: "អ្នកគ្រប់គ្រងប្រព័ន្ធ",
      tagline: "ដំណើរកម្សាន្តម៉ូតូនៅកម្ពុជា",
    },
    hero: {
      badge: "រុករកកម្ពុជាលើកង់ពីរ • គ្របដណ្តប់ទាំង ២៥ ខេត្ត-ក្រុង",
      titleLine1: "ជួលម៉ូតូប្រកបដោយទំនុកចិត្ត",
      titleLine2: "គ្រប់ទីកន្លែងក្នុងប្រទេសកម្ពុជា",
      subtitle: "ចាប់ពីម៉ូតូអូតូសម្រាប់ជិះទស្សនាប្រាសាទអង្គរវត្ត រហូតដល់ម៉ូតូដង្ហែផ្លូវឡើងភ្នំបូកគោ។ ភ្ជាប់ទំនាក់ទំនងផ្ទាល់ជាមួយម្ចាស់ម៉ូតូដែលបានផ្ទៀងផ្ទាត់ តម្លៃច្បាស់លាស់ជាប្រាក់ដុល្លារ។",
      provincesMetric: "ខេត្ត-ក្រុងគ្របដណ្តប់",
      verifiedMetric: "ម្ចាស់ម៉ូតូមានការបញ្ជាក់",
      rateMetric: "តម្លៃជួលចាប់ពី",
      supportMetric: "សេវាគាំទ្រ AI ២៤/៧",
    },
    search: {
      destination: "ជ្រើសរើសខេត្ត-ក្រុង",
      allProvinces: "ខេត្ត-ក្រុងទាំងអស់នៅកម្ពុជា",
      bikeCategory: "ប្រភេទម៉ូតូ",
      allCategories: "ប្រភេទទាំងអស់",
      scooter: "ម៉ូតូអូតូ (110-160cc)",
      dirtBike: "ម៉ូតូដង្ហែផ្លូវ / ម៉ូតូភ្នំ",
      manual: "ម៉ូតូលេខ / កន្លះអូតូ",
      sport: "ម៉ូតូស្ព័រ",
      touring: "ម៉ូតូទេសចរណ៍ផ្លូវឆ្ងាយ",
      pickupDate: "កាលបរិច្ឆេទទទួល",
      returnDate: "កាលបរិច្ឆេទប្រគល់",
      searchFleet: "ស្វែងរកម៉ូតូ",
      locateMe: "ស្វែងរកក្បែរទីតាំងខ្ញុំ",
    },
    fleet: {
      featuredTitle: "ម៉ូតូពេញនិយមសម្រាប់ជួល",
      featuredSubtitle: "ថែទាំយ៉ាងល្អ មានធានារ៉ាប់រង និងផ្ទៀងផ្ទាត់ដោយម្ចាស់ម៉ូតូផ្ទាល់នៅកម្ពុជា។",
      allFleet: "ទាំងអស់",
      scooters: "ម៉ូតូអូតូ",
      dirtBikes: "ម៉ូតូភ្នំ",
      manualSemi: "ម៉ូតូលេខ",
      touring: "ផ្លូវឆ្ងាយ",
      viewDetails: "មើលព័ត៌មាន",
      bookNow: "កក់ឥឡូវនេះ",
      day: "/ ថ្ងៃ",
      deposit: "ប្រាក់កក់ធានា",
      verifiedOwner: "ម្ចាស់បានផ្ទៀងផ្ទាត់",
      reviews: "ការវាយតម្លៃ",
      exploreAll: "មើលម៉ូតូទាំងអស់",
      instantConfirmation: "បញ្ជាក់ការកក់ភ្លាមៗ",
    },
    provinces: {
      exploreBadge: "គោលដៅទេសចរណ៍កំពូល",
      title: "ខេត្ត-ក្រុងពេញនិយមនៅកម្ពុជា",
      subtitle: "ស្វែងរកម៉ូតូនៅចំណតរថយន្តក្រុង កណ្តាលក្រុង និងតំបន់ទេសចរណ៍សំខាន់ៗ។",
      viewAllMap: "មើលខេត្តទាំង ២៥ លើផែនទី",
      bikesCount: "គ្រឿង",
    },
    howItWorks: {
      badge: "ដំណើរការងាយៗ ៣ ជំហាន",
      title: "របៀបប្រើប្រាស់ Motho Rent",
      subtitle: "ការជួលម៉ូតូនៅកម្ពុជាកាន់តែមានតម្លាភាព សុវត្ថិភាព និងភាពងាយស្រួលជាងពេលណាៗទាំងអស់។",
      step1Title: "ជ្រើសរើសម៉ូតូ & កាលបរិច្ឆេទ",
      step1Desc: "ជ្រើសរើសតាមខេត្ត តម្លៃ ឬកម្លាំងម៉ាស៊ីន (cc)។ មើលរូបភាពពិតៗ លក្ខណៈបច្ចេកទេស និងការវាយតម្លៃ។",
      step2Title: "កក់អនឡាញជាមួយម្ចាស់ម៉ូតូ",
      step2Desc: "បញ្ជាក់កាលបរិច្ឆេទ។ ម្ចាស់ម៉ូតូនឹងយល់ព្រមទទួលការកក់ និងផ្តល់ទីតាំងជាក់លាក់លើ Google Maps។",
      step3Title: "ទទួលម៉ូតូ & ចាប់ផ្តើមធ្វើដំណើរ",
      step3Desc: "ពិនិត្យម៉ូតូ ទទួលមួកសុវត្ថិភាពស្អាត ២ និងចាប់ផ្តើមដំណើរកម្សាន្តរបស់អ្នកនៅកម្ពុជាដោយរីករាយ!",
    },
    ownerCta: {
      badge: "សម្រាប់ម្ចាស់ម៉ូតូនៅកម្ពុជា",
      title: "មានម៉ូតូនៅកម្ពុជាមែនទេ?",
      highlight: "ប្រែក្លាយវាជាប្រាក់ចំណូលប្រចាំថ្ងៃ។",
      desc: "ចុះបញ្ជីម៉ូតូរបស់អ្នកក្នុងរយៈពេលប៉ុន្មាននាទី កំណត់តម្លៃជួល ទទួលការកក់ពីភ្ញៀវទេសចរ និងទទួលការទូទាត់ប្រាក់ដោយសុវត្ថិភាព។",
      button: "ចុះបញ្ជីម៉ូតូឥឡូវនេះ",
      learnMore: "ស្វែងយល់បន្ថែមពីប្រាក់ចំណូល",
    },
    footer: {
      desc: "វេទិកាជួលម៉ូតូឈានមុខគេនៅកម្ពុជា។ យើងភ្ជាប់ទំនាក់ទំនងរវាងម្ចាស់ម៉ូតូក្នុងស្រុក និងភ្ញៀវទេសចរសម្រាប់ការធ្វើដំណើរទូទាំង ២៥ ខេត្ត-ក្រុង។",
      verifiedOwners: "ម្ចាស់ផ្ទៀងផ្ទាត់",
      zeroFees: "គ្មានកម្រៃលាក់បាំង",
      explore: "រុករក",
      allBikes: "ម៉ូតូទាំងអស់",
      findMap: "ស្វែងរកលើ Google Maps",
      howItWorks: "របៀបជួល",
      listBike: "ចុះបញ្ជីម៉ូតូជួល",
      topDestinations: "គោលដៅកំពូល",
      needHelp: "ត្រូវការជំនួយ?",
      provincesTitle: "ម៉ូតូមានសម្រាប់ជួលក្នុង ២៥ ខេត្ត-ក្រុងនៃប្រទេសកម្ពុជា៖",
      copyright: "រក្សាសិទ្ធិគ្រប់យ៉ាង។ បង្កើតឡើងសម្រាប់អ្នកធ្វើដំណើរនៅកម្ពុជា។",
    },
    chatbot: {
      launcher: "មគ្គុទ្ទេសក៍ AI Motho",
      title: "ជំនួយការឆ្លាតវៃ Motho AI",
      online: "អនឡាញ",
      welcome: "ជំរាបសួរ! ខ្ញុំជា Motho AI ជាជំនួយការទេសចរណ៍ និងជួលម៉ូតូនៅកម្ពុជា។ លោកអ្នកអាចសួរអំពីការណែនាំម៉ូតូ ច្បាប់ចរាចរណ៍ ឬដំណើរកម្សាន្តក្នុង ២៥ ខេត្ត-ក្រុង!",
      askAngkor: "🏛️ ម៉ូតូជិះអង្គរវត្ត?",
      askLicense: "📜 ច្បាប់ប័ណ្ណបើកបរ?",
      askKampot: "⛰️ ម៉ូតូជិះកំពត-បូកគោ",
      placeholder: "សួរជាភាសាខ្មែរ English ឬ 中文...",
      typing: "Motho AI កំពុងរៀបចំចម្លើយ...",
      recommended: "ម៉ូតូដែលណែនាំសម្រាប់អ្នក៖",
    },
    auth: {
      signInTitle: "ចូលប្រើប្រាស់ Motho Rent",
      signInSubtitle: "គ្រប់គ្រងការកក់ម៉ូតូ បញ្ជីម៉ូតូជួល ឬផ្ទាំងគ្រប់គ្រងប្រព័ន្ធរបស់អ្នក។",
      emailLabel: "អ៊ីមែល",
      emailPlaceholder: "name@example.com",
      passwordLabel: "ពាក្យសម្ងាត់",
      passwordPlaceholder: "••••••••",
      rememberMe: "ចងចាំខ្ញុំរយៈពេល ៣០ ថ្ងៃ",
      forgotPassword: "ភ្លេចពាក្យសម្ងាត់?",
      signInButton: "ចូលគណនី",
      signingIn: "កំពុងផ្ទៀងផ្ទាត់...",
      orQuickDemo: "គណនីសាកល្បងចុចចូលភ្លាមៗ៖",
      demoCustomer: "អ្នកជួលម៉ូតូ (ទេសចរ)",
      demoOwner: "ម្ចាស់ម៉ូតូជួល",
      demoAdmin: "អ្នកគ្រប់គ្រងប្រព័ន្ធ",
      noAccount: "មិនទាន់មានគណនី?",
      createAccount: "បង្កើតគណនីថ្មី",
      selectRoleTab: "ជ្រើសរើសប្រភេទគណនី",
      customerRoleDesc: "ជួលម៉ូតូសម្រាប់ដំណើរកម្សាន្តនៅកម្ពុជា",
      ownerRoleDesc: "ដាក់ជួលម៉ូតូដើម្បីរកចំណូលបន្ថែម",
      adminRoleDesc: "គ្រប់គ្រងប្រព័ន្ធ ការផ្ទៀងផ្ទាត់ និងរបាយការណ៍",
    },
  },

  zh: {
    nav: {
      home: "首页",
      browse: "浏览车队",
      map: "地图与位置",
      about: "关于我们",
      contact: "联系我们",
      dashboard: "我的仪表板",
      ownerPortal: "车主中心",
      adminPanel: "管理员面板",
      login: "登录",
      register: "立即注册",
      logout: "退出登录",
      role: "身份",
      roleCustomer: "租客视角",
      roleOwner: "摩托车主",
      roleAdmin: "系统管理员",
      tagline: "柬埔寨骑行旅行平台",
    },
    hero: {
      badge: "骑两轮探索柬埔寨 • 覆盖全国 25 个省市",
      titleLine1: "租用可靠摩托车",
      titleLine2: "畅游柬埔寨全境",
      subtitle: "从游览吴哥窟的轻便踏板车，到探索波哥山越野的越野摩托。与认证车主直联，美元透明公开标价。",
      provincesMetric: "覆盖省市",
      verifiedMetric: "实名认证车主",
      rateMetric: "日租金起价",
      supportMetric: "24/7 AI 与救援",
    },
    search: {
      destination: "目的地省份",
      allProvinces: "柬埔寨全部省份",
      bikeCategory: "摩托车型",
      allCategories: "全部车型",
      scooter: "自动挡踏板车 (110-160cc)",
      dirtBike: "双用途越野车 / 越野泥地车",
      manual: "手排挡 / 半自动挡",
      sport: "街跑运动车",
      touring: "休旅探险长途车",
      pickupDate: "取车日期",
      returnDate: "还车日期",
      searchFleet: "搜索车队",
      locateMe: "搜索我附近的车辆",
    },
    fleet: {
      featuredTitle: "精选推荐摩托车队",
      featuredSubtitle: "由柬埔寨当地实名认证车主精心维护、投保和检验。",
      allFleet: "全部车辆",
      scooters: "踏板车",
      dirtBikes: "越野车",
      manualSemi: "手排/半自动",
      touring: "长途旅行车",
      viewDetails: "查看详情",
      bookNow: "立即预订",
      day: "/ 天",
      deposit: "押金",
      verifiedOwner: "认证车主",
      reviews: "条评价",
      exploreAll: "探索所有摩托车",
      instantConfirmation: "即时确认",
    },
    provinces: {
      exploreBadge: "探索热门目的地",
      title: "柬埔寨热门旅游省份",
      subtitle: "在主要交通枢纽、长途汽车站和市中心轻松取车。",
      viewAllMap: "在地图上查看 25 个省份",
      bikesCount: "辆车",
    },
    howItWorks: {
      badge: "简单 3 步",
      title: "Motho Rent 租车流程",
      subtitle: "在柬埔寨租摩托车从未如此透明、安全与便捷。",
      step1Title: "选择车辆与日期",
      step1Desc: "按柬埔寨省份、价格、变速方式或排量筛选。查看真实照片、技术参数及用户评价。",
      step2Title: "在线向车主预订",
      step2Desc: "提交您的行程日期。认证车主快速确认预订，并提供精确的谷歌地图取车定位。",
      step3Title: "取车、验车与启程",
      step3Desc: "现场验车，领取 2 顶干净头盔，与车主确认无误后，开启精彩的柬埔寨骑行公路之旅！",
    },
    ownerCta: {
      badge: "面向柬埔寨本地摩托车主",
      title: "在柬埔寨拥有闲置摩托车？",
      highlight: "将其转化为稳定的每日租金收入。",
      desc: "几分钟内快速上架您的摩托车，自主设定每日价格与可用档期，安全接收国际游客预订，直接收款到账。",
      button: "立即上架您的摩托车",
      learnMore: "了解车主收益机制",
    },
    footer: {
      desc: "柬埔寨领先的摩托车共享租赁平台。我们连接当地经过认证的车主与旅行者，为全国 25 个省市的自驾公路旅行提供支持。",
      verifiedOwners: "认证车主",
      zeroFees: "无隐形消费",
      explore: "探索",
      allBikes: "所有摩托车",
      findMap: "在谷歌地图上查找",
      howItWorks: "租车指南",
      listBike: "车主出租上架",
      topDestinations: "热门目的地",
      needHelp: "联系与支持",
      provincesTitle: "摩托车服务已覆盖柬埔寨全部 25 个省市：",
      copyright: "版权所有。专为前往柬埔寨的旅行者打造。",
    },
    chatbot: {
      launcher: "Motho AI 骑行旅行指南",
      title: "Motho 智能助手",
      online: "在线",
      welcome: "您好！Hello! ជំរាបសួរ! 我是 Motho AI，您的柬埔寨摩托车旅行专属顾问。您可以向我咨询车型推荐、驾照法律或全国 25 省的骑行路线！",
      askAngkor: "🏛️ 游览吴哥窟选什么车？",
      askLicense: "📜 在柬埔寨需要驾照吗？",
      askKampot: "⛰️ 贡布与波哥山越野路线",
      placeholder: "支持中文、English 或 ភាសាខ្មែរ 提问...",
      typing: "Motho AI 正在生成骑行建议...",
      recommended: "为您精选推荐：",
    },
    auth: {
      signInTitle: "登录 Motho Rent",
      signInSubtitle: "管理您的摩托车租赁订单、车队出租列表或系统后台控制台。",
      emailLabel: "电子邮箱",
      emailPlaceholder: "name@example.com",
      passwordLabel: "登录密码",
      passwordPlaceholder: "••••••••",
      rememberMe: "保持登录状态 30 天",
      forgotPassword: "忘记密码？",
      signInButton: "登录账户",
      signingIn: "正在验证身份...",
      orQuickDemo: "一键快速登录测试账号：",
      demoCustomer: "租客账户 (旅行者)",
      demoOwner: "车主账户 (出租方)",
      demoAdmin: "超级管理员账户",
      noAccount: "还没有账号？",
      createAccount: "免费注册新账号",
      selectRoleTab: "选择账号类型",
      customerRoleDesc: "租车畅游柬埔寨 25 省市",
      ownerRoleDesc: "出租摩托车赚取每日稳定收益",
      adminRoleDesc: "全站管理、审核车主与财务监管",
    },
  },
};
