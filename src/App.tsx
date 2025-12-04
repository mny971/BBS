import React, { useState, useEffect } from 'react';
import CustomerView from './components/CustomerView';
import OperatorDashboard from './components/OperatorDashboard';
import RiderDashboard from './components/RiderDashboard';
import AdminDashboard from './components/AdminDashboard';
import ExplanationView from './components/ExplanationView';
import ProfileView from './components/ProfileView';
import SplashScreen from './components/SplashScreen';
import RoleSelectionScreen from './components/RoleSelectionScreen';
import { Search, Ticket, LayoutDashboard, User, ShieldAlert } from 'lucide-react';
import { UserRole, Session, ActivityType, SkillLevel, WeatherStatus, AppLanguage, Operator } from './types';
import { MOCK_SESSIONS, MOCK_OPERATORS, TEXT } from './constants';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [hasSelectedRole, setHasSelectedRole] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('RIDER');
  const [view, setView] = useState<'customer' | 'trips' | 'dashboard' | 'profile' | 'about' | 'admin'>('customer');
  const [language, setLanguage] = useState<AppLanguage>('EN');
  
  // Global State
  const [allSessions, setAllSessions] = useState<Session[]>(MOCK_SESSIONS);
  const [myBookings, setMyBookings] = useState<Session[]>([]);
  const [operators, setOperators] = useState<Operator[]>(MOCK_OPERATORS);

  const t = TEXT[language];

  useEffect(() => {
    const savedBookings = localStorage.getItem('bbs_bookings');
    if (savedBookings) {
      const parsed = JSON.parse(savedBookings, (key, value) => {
        if (key === 'timeStart') return new Date(value);
        return value;
      });
      setMyBookings(parsed);
    }

    const savedSessions = localStorage.getItem('bbs_sessions');
    if (savedSessions) {
       const parsed = JSON.parse(savedSessions, (key, value) => {
        if (key === 'timeStart') return new Date(value);
        return value;
      });
      setAllSessions(parsed);
    }
    
    const savedOperators = localStorage.getItem('bbs_operators');
    if (savedOperators) {
      setOperators(JSON.parse(savedOperators));
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('bbs_bookings', JSON.stringify(myBookings));
      localStorage.setItem('bbs_sessions', JSON.stringify(allSessions));
      localStorage.setItem('bbs_operators', JSON.stringify(operators));
    }
  }, [myBookings, allSessions, operators, loading]);

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setHasSelectedRole(true);
    if (role === 'OPERATOR') setView('dashboard');
    else if (role === 'ADMIN') setView('admin');
    else setView('customer');
  };

  const handleLogout = () => {
    setHasSelectedRole(false);
    setView('customer');
  };

  const handleBooking = (session: Session) => {
    if (!myBookings.find(b => b.id === session.id)) {
        setMyBookings(prev => [session, ...prev]);
    }
    setAllSessions(prev => prev.map(s => {
        if (s.id === session.id) {
            return { ...s, bookedSeats: Math.min(s.bookedSeats + 1, s.totalSeats) };
        }
        return s;
    }));
  };

  const handleRequestTrip = (data: { activity: string; date: string; time: string; location: string }) => {
    const newSession: Session = {
        id: `req-${Date.now()}`,
        title: `${data.activity} Request`,
        type: data.activity.toUpperCase().includes('WAKE') ? ActivityType.WAKEBOARDING : ActivityType.FISHING,
        location: data.location,
        meetingPoint: 'TBD - Waiting for Captain',
        coordinates: [25.0803, 55.1403], 
        timeStart: new Date(`${data.date}T${data.time}`),
        durationMinutes: 60,
        pricePerSeat: 200, 
        currency: 'AED',
        totalSeats: 5,
        bookedSeats: 1, 
        minRidersToConfirm: 3,
        skillLevel: SkillLevel.MIXED,
        weather: WeatherStatus.SUNNY,
        captain: {
            name: 'Waiting for Partner',
            rating: 0,
            verified: false,
            image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
            languages: ['English']
        },
        operatorName: 'Crowdsourced Request',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
        isRequested: true,
        requestStatus: 'OPEN'
    };
    setAllSessions(prev => [newSession, ...prev]);
    setMyBookings(prev => [newSession, ...prev]);
  };

  const handleClaimRequest = (sessionId: string) => {
      setAllSessions(prev => prev.map(s => {
          if (s.id === sessionId) {
              return {
                  ...s,
                  isRequested: false,
                  requestStatus: 'CLAIMED',
                  operatorName: 'Sea Riders UAE',
                  meetingPoint: 'Pier 7, Berth 42',
                  captain: {
                      name: 'Capt. Mike',
                      rating: 4.8,
                      verified: true,
                      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop',
                      languages: ['English']
                  }
              }
          }
          return s;
      }));
      setMyBookings(prev => prev.map(s => {
        if (s.id === sessionId) {
            return {
                ...s,
                isRequested: false,
                requestStatus: 'CLAIMED',
                operatorName: 'Sea Riders UAE',
                meetingPoint: 'Pier 7, Berth 42',
                captain: {
                    name: 'Capt. Mike',
                    rating: 4.8,
                    verified: true,
                    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop',
                    languages: ['English']
                }
            }
        }
        return s;
      }));
  };

  const resetData = () => {
    localStorage.removeItem('bbs_bookings');
    localStorage.removeItem('bbs_sessions');
    localStorage.removeItem('bbs_operators');
    setMyBookings([]);
    setAllSessions(MOCK_SESSIONS);
    setOperators(MOCK_OPERATORS);
    window.location.reload();
  };

  const handleAddOperator = (newOp: Operator) => {
    setOperators(prev => [newOp, ...prev]);
  };

  const NavButton = ({ target, icon: Icon, label }: { target: typeof view, icon: any, label: string }) => (
    <button
      onClick={() => setView(target)}
      className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 ${
        view === target ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      <Icon className={`w-6 h-6 stroke-[1.5px] transition-all ${view === target ? 'stroke-[2.5px] scale-110 drop-shadow-md text-primary' : ''}`} />
      <span className={`text-[10px] font-medium ${view === target ? 'font-bold text-primary' : ''}`}>{label}</span>
    </button>
  );

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} setLanguage={setLanguage} currentLanguage={language} />;
  }

  if (!hasSelectedRole) {
    return <RoleSelectionScreen onSelect={handleRoleSelect} />;
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gray-50 text-gray-900">
      <main className="flex-1 relative overflow-y-auto pb-24 no-scrollbar">
        {view === 'customer' && userRole === 'RIDER' && (
          <CustomerView 
            sessions={allSessions}
            onBookingConfirmed={handleBooking}
            onRequestTrip={handleRequestTrip}
            onOpenHelp={() => setView('about')}
            language={language}
          />
        )}
        {view === 'trips' && userRole === 'RIDER' && (
          <RiderDashboard bookings={myBookings} onBrowse={() => setView('customer')} />
        )}
        {view === 'dashboard' && userRole === 'OPERATOR' && (
            <OperatorDashboard sessions={allSessions} onClaimRequest={handleClaimRequest} />
        )}
        {view === 'admin' && userRole === 'ADMIN' && (
            <AdminDashboard operators={operators} riders={[]} onAddOperator={handleAddOperator} />
        )}
        {view === 'profile' && (
          <ProfileView 
            userRole={userRole}
            onLogout={handleLogout}
            onResetData={resetData}
            language={language}
            setLanguage={setLanguage}
            bookings={myBookings}
            onBrowse={() => setView('customer')}
          />
        )}
        {view === 'about' && <ExplanationView onBack={() => setView(userRole === 'OPERATOR' ? 'dashboard' : 'customer')} />}
      </main>

      {view !== 'about' && (
        <div className="fixed bottom-0 inset-x-0 z-50 pb-safe">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-xl border-t border-white/40 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]"></div>
            <nav className="relative h-16 flex items-center justify-around px-4 z-10">
              {userRole === 'RIDER' && (
                <>
                  <NavButton target="customer" icon={Search} label={t.explore} />
                  <NavButton target="trips" icon={Ticket} label={t.trips} />
                  <NavButton target="profile" icon={User} label={t.profile} />
                </>
              )}
              {userRole === 'OPERATOR' && (
                <>
                  <NavButton target="dashboard" icon={LayoutDashboard} label={t.dashboard} />
                  <NavButton target="profile" icon={User} label={t.profile} />
                </>
              )}
              {userRole === 'ADMIN' && (
                <>
                  <NavButton target="admin" icon={ShieldAlert} label={t.admin} />
                  <NavButton target="profile" icon={User} label={t.profile} />
                </>
              )}
            </nav>
        </div>
      )}
    </div>
  );
};

export default App;