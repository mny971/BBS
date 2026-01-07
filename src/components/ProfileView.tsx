import React, { useState } from 'react';
import { 
  Calendar, MapPin, Settings, Share2, User, Anchor, 
  FileText, X, ChevronRight, LogOut, CreditCard, 
  ShieldCheck, Zap, Ship, Users, BadgeCheck, Building2, Wallet,
  HelpCircle, RefreshCw, Languages, Stamp, ArrowLeft, Camera, Bell
} from 'lucide-react';
import { UserRole, SkillLevel, RiderProfileData, OperatorProfileData, AppLanguage, Session, ActivityType } from '../types';
import { TEXT } from '../constants';

interface ProfileViewProps {
    userRole: UserRole;
    onLogout?: () => void;
    onResetData?: () => void;
    language: AppLanguage;
    setLanguage: (lang: AppLanguage) => void;
    bookings?: Session[];
    onBrowse?: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ userRole, onLogout, onResetData, language, setLanguage, bookings = [], onBrowse }) => {
  const t = TEXT[language];
  const [viewState, setViewState] = useState<'PROFILE' | 'SETTINGS'>('PROFILE');

  // --- Mock Data ---
  const [riderData, setRiderData] = useState<RiderProfileData>({
    name: "Alex Rider",
    email: "alex.rider@example.com",
    phone: "+971 50 123 4567",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
    skillLevel: SkillLevel.INTERMEDIATE,
    stance: "Goofy",
    paymentLast4: "4242",
    totalTrips: 12 + bookings.length, // Mock base + actual
    memberSince: new Date('2024-01-15'),
    activitiesTried: [ActivityType.WAKEBOARDING, ActivityType.FISHING]
  });

  const [operatorData] = useState<OperatorProfileData>({
    companyName: "Sea Riders UAE",
    tradeLicense: "TR-29384-DXB",
    taxId: "AE-192-392",
    address: "Dubai Marina, Pier 7",
    payoutBalance: 12450.00,
    fleetSize: 3,
    activeCaptains: 4,
    complianceStatus: 'VERIFIED'
  });

  // Settings Toggles
  const [notifications, setNotifications] = useState({ push: true, email: false, sms: true });

  // Separate Bookings
  const upcomingBookings = bookings.filter(b => new Date(b.timeStart) > new Date());
  const pastBookings = bookings.filter(b => new Date(b.timeStart) <= new Date());

  const RiderView = () => (
    <div className="animate-slide-up">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 mb-6 relative overflow-hidden">
        <div className="flex items-center gap-5 relative z-10">
          <img src={riderData.image} alt={riderData.name} className="w-20 h-20 rounded-full object-cover border-4 border-gray-50 shadow-md" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">{riderData.name}</h2>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-3">
                {t.memberSince}: {riderData.memberSince.toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
                <div className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100 flex items-center gap-1.5">
                    <Ship className="w-3 h-3 text-primary" />
                    <span className="text-xs font-bold text-primary">{riderData.totalTrips} {t.trips}</span>
                </div>
            </div>
          </div>
          <button onClick={() => setViewState('SETTINGS')} className="self-start p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
             <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Skill Level Selector */}
      <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-900 mb-3 px-1">{t.level}</h3>
          <div className="bg-white p-1.5 rounded-2xl border border-gray-200 flex shadow-sm">
              {[SkillLevel.BEGINNER, SkillLevel.INTERMEDIATE, SkillLevel.ADVANCED].map((level) => {
                  const isSelected = riderData.skillLevel === level;
                  return (
                      <button 
                        key={level}
                        onClick={() => setRiderData({...riderData, skillLevel: level})}
                        className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                            isSelected 
                            ? 'bg-primary text-white shadow-md shadow-primary/20' 
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                          {level}
                      </button>
                  );
              })}
          </div>
          <p className="text-[10px] text-gray-400 mt-2 px-2 text-center">
              This helps captains prepare the gear for you.
          </p>
      </div>

      {/* Upcoming Bookings */}
      <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-900 mb-3 px-1 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" /> {t.upcoming}
          </h3>
          <div className="space-y-3">
              {upcomingBookings.length === 0 ? (
                  <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-6 text-center">
                      <p className="text-xs text-gray-400 font-medium mb-3">No upcoming trips planned.</p>
                      <button onClick={onBrowse} className="text-primary text-xs font-bold hover:underline">Browse Sessions</button>
                  </div>
              ) : (
                  upcomingBookings.map(session => (
                      <div key={session.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                              <img src={session.image} className="w-full h-full object-cover" alt="" />
                          </div>
                          <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-gray-900 truncate">{session.title}</h4>
                              <p className="text-xs text-gray-500">{session.timeStart.toLocaleDateString()}</p>
                          </div>
                          <div className="bg-green-50 text-success text-[10px] font-bold px-2 py-1 rounded border border-green-100">
                              Active
                          </div>
                      </div>
                  ))
              )}
          </div>
      </div>

      {/* Past Bookings */}
      <div className="mb-20">
          <h3 className="text-sm font-bold text-gray-900 mb-3 px-1 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-gray-400" /> {t.past}
          </h3>
          <div className="space-y-3">
              {bookings.length > 0 ? (
                  /* Mocking past bookings if none exist for demo */
                  [...pastBookings, ...[{
                      id: 'mock-past',
                      title: 'Morning Wake Session',
                      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
                      timeStart: new Date('2024-02-10')
                  }]].map((session: any) => (
                      <div key={session.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between group">
                          <div className="flex items-center gap-4 overflow-hidden">
                              <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 grayscale opacity-70">
                                  <img src={session.image} className="w-full h-full object-cover" alt="" />
                              </div>
                              <div>
                                  <h4 className="text-sm font-bold text-gray-700 truncate">{session.title}</h4>
                                  <p className="text-xs text-gray-400">{session.timeStart.toLocaleDateString()}</p>
                              </div>
                          </div>
                          <button onClick={onBrowse} className="bg-gray-50 hover:bg-primary hover:text-white text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-gray-200 hover:border-primary">
                              {t.rebook}
                          </button>
                      </div>
                  ))
              ) : (
                  <div className="text-center py-4 text-xs text-gray-400">No past trips yet.</div>
              )}
          </div>
      </div>
    </div>
  );

  const SettingsView = () => (
      <div className="animate-slide-up pb-24">
          <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setViewState('PROFILE')} className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2">
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <h2 className="text-xl font-bold text-gray-900">{t.settings}</h2>
          </div>

          <div className="space-y-6">
              
              {/* Emirates ID */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold text-sm">
                      <BadgeCheck className="w-4 h-4 text-primary" /> {t.emiratesId}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div className="aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer group">
                          <div className="bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                              <Camera className="w-4 h-4 text-gray-500" />
                          </div>
                          <span className="text-[10px] font-bold uppercase">{t.front}</span>
                      </div>
                      <div className="aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer group">
                          <div className="bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                              <Camera className="w-4 h-4 text-gray-500" />
                          </div>
                          <span className="text-[10px] font-bold uppercase">{t.back}</span>
                      </div>
                  </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                          <CreditCard className="w-4 h-4 text-primary" /> {t.paymentMethods}
                      </div>
                      <button className="text-primary text-xs font-bold hover:underline">+ Add</button>
                  </div>
                  <div className="p-4 bg-gray-50/50">
                      <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-[8px] text-white font-bold tracking-widest">VISA</div>
                              <span className="text-sm font-medium text-gray-700">•••• 4242</span>
                          </div>
                          <button className="text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                      </div>
                  </div>
              </div>

              {/* Language & Notifications */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                          <Languages className="w-4 h-4 text-primary" /> {t.language}
                      </div>
                      <div className="flex bg-gray-100 rounded-lg p-1">
                          <button onClick={() => setLanguage('EN')} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${language === 'EN' ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}>EN</button>
                          <button onClick={() => setLanguage('RU')} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${language === 'RU' ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}>RU</button>
                          <button onClick={() => setLanguage('CN')} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${language === 'CN' ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}>CN</button>
                      </div>
                  </div>
                  
                  <div className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                          <Bell className="w-4 h-4 text-primary" /> {t.notifications}
                      </div>
                      <div className="flex items-center gap-2">
                          <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${notifications.push ? 'bg-success' : 'bg-gray-300'}`} onClick={() => setNotifications({...notifications, push: !notifications.push})}>
                              <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${notifications.push ? 'translate-x-5' : ''}`}></div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4">
                  {onResetData && (
                      <button 
                          onClick={onResetData}
                          className="w-full text-gray-500 text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-100 px-4 py-3 rounded-xl transition-colors border border-gray-200"
                      >
                          <RefreshCw className="w-4 h-4" /> Reset App Data
                      </button>
                  )}
                  {onLogout && (
                      <button 
                          onClick={onLogout}
                          className="w-full text-red-500 text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-50 px-4 py-3 rounded-xl transition-colors border border-red-100"
                      >
                          <LogOut className="w-4 h-4" /> {t.logout}
                      </button>
                  )}
              </div>
          </div>
      </div>
  );

  const OperatorView = () => (
    <div className="animate-slide-up">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="flex justify-between items-start mb-4">
           <div>
               <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-1">{operatorData.companyName}</h2>
               <p className="text-xs text-gray-400 font-mono">Lic: {operatorData.tradeLicense}</p>
           </div>
           <div className="flex items-center gap-1 bg-green-100 text-success px-2 py-1 rounded text-[10px] font-bold uppercase border border-green-200">
               <BadgeCheck className="w-3 h-3" /> Verified
           </div>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-5 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <p className="text-xs text-gray-400 font-medium uppercase mb-1">Available Payout</p>
            <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-bold">AED {operatorData.payoutBalance.toLocaleString()}</span>
            </div>
            <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-bold py-2 rounded-lg transition-colors border border-white/10">
                Manage Payouts
            </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
         <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:border-primary/30 transition-colors group cursor-pointer">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-secondary mb-3 group-hover:scale-110 transition-transform">
                <Ship className="w-5 h-5" />
            </div>
            <div className="font-bold text-2xl text-gray-900 mb-1">{operatorData.fleetSize}</div>
            <div className="text-xs text-gray-500 font-medium">Active Boats</div>
         </div>
         <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:border-primary/30 transition-colors group cursor-pointer">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
            </div>
            <div className="font-bold text-2xl text-gray-900 mb-1">{operatorData.activeCaptains}</div>
            <div className="text-xs text-gray-500 font-medium">Captains</div>
         </div>
      </div>
      
      {onLogout && (
          <button 
              onClick={onLogout}
              className="w-full text-red-500 text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-50 px-4 py-3 rounded-lg transition-colors border border-transparent mt-8"
          >
              <LogOut className="w-4 h-4" /> {t.logout}
          </button>
      )}
    </div>
  );

  return (
    <div className="max-w-lg mx-auto px-4 pt-8 pb-12 animate-fade-in">
      {viewState === 'PROFILE' && (
          <div className="flex justify-between items-center mb-8 px-2">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                {userRole === 'RIDER' ? t.profile : 'Business Hub'}
            </h1>
          </div>
      )}

      {userRole === 'RIDER' ? (
          viewState === 'PROFILE' ? <RiderView /> : <SettingsView />
      ) : userRole === 'OPERATOR' ? (
          <OperatorView />
      ) : (
          <div className="text-center p-8 bg-white rounded-xl shadow-sm">Admin Profile</div>
      )}
    </div>
  );
};

export default ProfileView;