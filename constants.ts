import { ActivityType, Session, SkillLevel, WeatherStatus, Operator } from './types';

// Dubai Marina Center Point
export const MAP_CENTER: [number, number] = [25.0805, 55.1400]; 

export const COLORS = {
  primary: '#0891B2', // Cyan-600
  primaryDark: '#0E7490', // Cyan-700
  secondary: '#F97316', // Orange-500
  bg: '#F9FAFB', // Gray-50
  surface: '#FFFFFF',
  text: '#111827', // Gray-900
  textSecondary: '#6B7280', // Gray-500
  success: '#10B981', // Green-500
  error: '#EF4444', // Red-500
  warning: '#F59E0B', // Amber-500
  border: '#D1D5DB' // Gray-300
};

// --- Translations ---
export const TEXT = {
  EN: {
    explore: 'Explore',
    trips: 'Trips',
    profile: 'You',
    dashboard: 'Dashboard',
    admin: 'Admin',
    requestTrip: 'Request a Trip',
    book: 'Book Seat',
    waitlist: 'Join Waitlist',
    confirmed: 'Confirmed',
    pending: 'Pending',
    full: 'Full',
    now: 'Now',
    tomorrow: 'Tomorrow',
    thisWeek: 'This Week',
    language: 'Language',
    myPassport: 'My Passport',
    totalTrips: 'Total Trips',
    activities: 'Activities',
    memberSince: 'Member Since',
    level: 'Skill Level',
    settings: 'Settings',
    emiratesId: 'Emirates ID',
    paymentMethods: 'Payment Cards',
    notifications: 'Notifications',
    upcoming: 'Upcoming',
    past: 'Past',
    rebook: 'Rebook',
    upload: 'Upload',
    front: 'Front',
    back: 'Back',
    logout: 'Log Out',
    save: 'Save Changes'
  },
  RU: {
    explore: 'Поиск',
    trips: 'Поездки',
    profile: 'Вы',
    dashboard: 'Дашборд',
    admin: 'Админ',
    requestTrip: 'Создать запрос',
    book: 'Бронь',
    waitlist: 'В лист ожидания',
    confirmed: 'Подтверждено',
    pending: 'Ожидание',
    full: 'Мест нет',
    now: 'Сейчас',
    tomorrow: 'Завтра',
    thisWeek: 'На неделе',
    language: 'Язык',
    myPassport: 'Мой паспорт',
    totalTrips: 'Всего поездок',
    activities: 'Активности',
    memberSince: 'В клубе с',
    level: 'Уровень',
    settings: 'Настройки',
    emiratesId: 'Emirates ID',
    paymentMethods: 'Карты оплаты',
    notifications: 'Уведомления',
    upcoming: 'Будущие',
    past: 'Прошедшие',
    rebook: 'Повторить',
    upload: 'Загрузить',
    front: 'Лицевая',
    back: 'Обратная',
    logout: 'Выйти',
    save: 'Сохранить'
  },
  CN: {
    explore: '探索',
    trips: '行程',
    profile: '我的',
    dashboard: '仪表盘',
    admin: '管理',
    requestTrip: '发布需求',
    book: '预订座位',
    waitlist: '加入候补',
    confirmed: '已确认',
    pending: '待定',
    full: '已满',
    now: '现在',
    tomorrow: '明天',
    thisWeek: '本周',
    language: '语言',
    myPassport: '我的护照',
    totalTrips: '行程总数',
    activities: '活动',
    memberSince: '注册时间',
    level: '技能等级',
    settings: '设置',
    emiratesId: '阿联酋身份证',
    paymentMethods: '支付方式',
    notifications: '通知',
    upcoming: '即将开始',
    past: '历史行程',
    rebook: '再次预订',
    upload: '上传',
    front: '正面',
    back: '背面',
    logout: '退出登录',
    save: '保存更改'
  }
};

const now = new Date();
const tomorrow = new Date(now);
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfter = new Date(now);
dayAfter.setDate(dayAfter.getDate() + 2);

export const MOCK_OPERATORS: Operator[] = [
  { 
    id: '1', 
    name: 'Sea Riders UAE', 
    category: 'wakeboarding', 
    city: 'dubai', 
    location: 'Dubai Marina', 
    rating: 4.9, 
    reviews: 127, 
    sessions: 24, 
    emoji: '🏄',
    pricing: 'AED 625 / hour',
    description: 'Premium wake & surf coaching. Operating in Jumeirah 1 & Marina. Known for new boats and pro coaching.'
  },
  { 
    id: '2', 
    name: 'CrazyWake', 
    category: 'wakeboarding', 
    city: 'dubai', 
    location: 'Dubai Marina', 
    rating: 4.8, 
    reviews: 94, 
    sessions: 18, 
    emoji: '🏄',
    pricing: 'AED 650 / hour',
    description: 'High-energy sessions for groups up to 6. Located in Dubai Marina with specialized wake boats.'
  },
  { 
    id: '13', 
    name: 'Nanje Yachts', 
    category: 'fishing', 
    city: 'dubai', 
    location: 'Dubai Marina', 
    rating: 4.9, 
    reviews: 234, 
    sessions: 31, 
    emoji: '🎣',
    pricing: 'AED 2,199 / 4h Charter',
    description: 'Professional sport fishing charters. Deep sea fishing specialists with fully equipped yachts.'
  },
  { 
    id: '4', 
    name: 'Blue Wake Dubai', 
    category: 'wakeboarding', 
    city: 'dubai', 
    location: 'Palm Jumeirah', 
    rating: 4.9, 
    reviews: 112, 
    sessions: 21, 
    emoji: '🏄',
    pricing: 'AED 550 / hour',
    description: 'Family friendly wakeboarding and wakesurfing. Great for beginners and intermediate riders.'
  },
  { 
    id: '7', 
    name: 'Wake2Wake', 
    category: 'wakeboarding', 
    city: 'dubai', 
    location: 'Dubai Marina', 
    rating: 4.7, 
    reviews: 81, 
    sessions: 16, 
    emoji: '🏄',
    pricing: 'AED 500 / h (Weekdays)',
    description: 'Affordable fun on the water. Weekend premium pricing applies (AED 600/h).'
  },
];

export const MOCK_SESSIONS: Session[] = [
  {
    id: '1',
    title: 'Sunset Wakeboarding',
    type: ActivityType.WAKEBOARDING,
    location: 'Dubai Marina',
    meetingPoint: 'Pier 7, Dock B',
    coordinates: [25.0803, 55.1403],
    timeStart: new Date(now.setHours(16, 30)),
    durationMinutes: 60,
    pricePerSeat: 180,
    originalPrice: 2000, 
    currency: 'AED',
    totalSeats: 5,
    bookedSeats: 3,
    minRidersToConfirm: 3,
    skillLevel: SkillLevel.MIXED,
    weather: WeatherStatus.SUNNY,
    captain: {
      name: 'Ahmed Al-Mansour',
      rating: 4.9,
      verified: true,
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop',
      languages: ['English', 'Arabic']
    },
    operatorName: 'Sea Riders UAE',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80'
  },
  {
    id: '2',
    title: 'Deep Sea Sport Fishing',
    type: ActivityType.FISHING,
    location: 'Palm Jumeirah',
    meetingPoint: 'Palm West Beach',
    coordinates: [25.1124, 55.1390],
    timeStart: new Date(tomorrow.setHours(6, 0)),
    durationMinutes: 240,
    pricePerSeat: 349,
    originalPrice: 2400,
    currency: 'AED',
    totalSeats: 6,
    bookedSeats: 2,
    minRidersToConfirm: 4,
    skillLevel: SkillLevel.BEGINNER,
    weather: WeatherStatus.CLOUDY,
    captain: {
      name: 'Capt. Steve',
      rating: 4.7,
      verified: true,
      image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=100&h=100&fit=crop',
      languages: ['English', 'Russian']
    },
    operatorName: 'Blue Wake Dubai',
    image: 'https://images.unsplash.com/photo-1534234828563-02551c1f3325?w=600&q=80'
  },
  {
    id: '3',
    title: 'Advanced Wakeboarding',
    type: ActivityType.WAKESURFING,
    location: 'JBR Beach',
    meetingPoint: 'Rixos Premium Jetty',
    coordinates: [25.0780, 55.1390],
    timeStart: new Date(tomorrow.setHours(8, 0)),
    durationMinutes: 90,
    pricePerSeat: 220,
    originalPrice: 2400,
    currency: 'AED',
    totalSeats: 6,
    bookedSeats: 6, // FULLY BOOKED FOR DEMO
    minRidersToConfirm: 3,
    skillLevel: SkillLevel.ADVANCED,
    weather: WeatherStatus.WINDY,
    captain: {
      name: 'Sarah Jones',
      rating: 5.0,
      verified: true,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      languages: ['English', 'French']
    },
    operatorName: 'CrazyWake',
    image: 'https://images.unsplash.com/photo-1520360768338-1d50e41718d7?w=600&q=80'
  },
  {
    id: '4',
    title: 'Early Morning Fishing',
    type: ActivityType.FISHING,
    location: 'Dubai Marina',
    meetingPoint: 'Marina Walk',
    coordinates: [25.0785, 55.1395],
    timeStart: new Date(now.setHours(6, 0)),
    durationMinutes: 240,
    pricePerSeat: 270,
    originalPrice: 2999,
    currency: 'AED',
    totalSeats: 6,
    bookedSeats: 3,
    minRidersToConfirm: 4,
    skillLevel: SkillLevel.BEGINNER,
    weather: WeatherStatus.SUNNY,
    captain: {
      name: 'Capt. Rashid',
      rating: 4.9,
      verified: true,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      languages: ['English', 'Arabic', 'Russian']
    },
    operatorName: 'Nanje Yachts',
    image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=600&q=80'
  },
  {
    id: '5',
    title: 'Pro Wake Training',
    type: ActivityType.WAKEBOARDING,
    location: 'Dubai Harbour',
    meetingPoint: 'Harbour Master Office',
    coordinates: [25.0900, 55.1450],
    timeStart: new Date(dayAfter.setHours(14, 0)),
    durationMinutes: 120,
    pricePerSeat: 400,
    currency: 'AED',
    totalSeats: 3,
    bookedSeats: 0,
    minRidersToConfirm: 2,
    skillLevel: SkillLevel.PRO,
    weather: WeatherStatus.SUNNY,
    captain: {
      name: 'Mikey D.',
      rating: 4.9,
      verified: true,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      languages: ['English']
    },
    operatorName: 'Wake Nation',
    image: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=600&q=80'
  }
];