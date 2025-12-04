import React, { useState, useMemo } from 'react';
import MapView from './Map';
import SessionDetailCard from './SessionDetailCard';
import BookingSuccess from './BookingSuccess';
import WaitlistSuccess from './WaitlistSuccess';
import WaiverModal from './WaiverModal';
import PaymentModal from './PaymentModal';
import RequestTripModal from './RequestTripModal';
import { Session, TimeFilter, AppLanguage } from '../types';
import { TEXT } from '../constants';
import { Map, List, Search, MapPin, Calendar, Star, Zap, Bell, PlusCircle, HelpCircle, Languages } from 'lucide-react';

interface CustomerViewProps {
  sessions: Session[];
  onBookingConfirmed: (session: Session) => void;
  onRequestTrip: (data: { activity: string; date: string; time: string; location: string }) => void;
  onOpenHelp: () => void;
  language: AppLanguage;
}

const CustomerView: React.FC<CustomerViewProps> = ({ sessions, onBookingConfirmed, onRequestTrip, onOpenHelp, language }) => {
  const [viewMode, setViewMode] = useState<'MAP' | 'LIST'>('LIST');
  const [selectedTab, setSelectedTab] = useState<TimeFilter>('NOW');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);

  const [showWaiver, setShowWaiver] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  
  const [bookingSuccess, setBookingSuccess] = useState<Session | null>(null);
  const [waitlistSuccess, setWaitlistSuccess] = useState<Session | null>(null);

  const t = TEXT[language];

  const filteredSessions = useMemo(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);

    return sessions.filter(session => {
      const sessionDate = new Date(session.timeStart);
      let timeMatch = true;
      if (selectedTab === 'NOW') {
        timeMatch = sessionDate.getDate() === now.getDate();
      } else if (selectedTab === 'TOMORROW') {
        timeMatch = sessionDate >= tomorrow && sessionDate < dayAfter;
      }

      const searchMatch = !searchQuery || 
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        session.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.operatorName?.toLowerCase().includes(searchQuery.toLowerCase());

      const langMatch = !languageFilter || 
        (session.captain.languages && session.captain.languages.includes(languageFilter));

      return timeMatch && searchMatch && langMatch;
    });
  }, [sessions, selectedTab, searchQuery, languageFilter]);

  const startBookingFlow = () => {
     setShowWaiver(true);
  };

  const handleWaiverSigned = () => {
    setShowWaiver(false);
    setShowPayment(true);
  };

  const handlePaymentConfirmed = () => {
    setShowPayment(false);
    if (selectedSession) {
        onBookingConfirmed(selectedSession);
        setBookingSuccess(selectedSession);
        setSelectedSession(null);
    }
  };

  const handleJoinWaitlist = () => {
      if (selectedSession) {
          setWaitlistSuccess(selectedSession);
          setSelectedSession(null);
      }
  };

  const toggleLanguageFilter = () => {
      if (languageFilter === null) setLanguageFilter('Russian');
      else if (languageFilter === 'Russian') setLanguageFilter('Chinese');
      else setLanguageFilter(null);
  };

  return (
    <div className="relative h-[100vh] w-full bg-gray-50 flex flex-col overflow-hidden pb-20">
      
      <div className="w-full pt-14 px-6 pb-4 z-[20] bg-white/70 backdrop-blur-xl border-b border-white/50 sticky top-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-white font-extrabold text-sm tracking-tighter shadow-lg shadow-primary/30">
                BBS
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark tracking-tight leading-none">BookBySeat</h1>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dubai</span>
              </div>
          </div>
          
          <button onClick={onOpenHelp} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="w-full px-4 py-4 z-[19] bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-4">
           {viewMode === 'LIST' && (
             <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 animate-slide-up border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-primary transition-all">
                <Search className="w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by marina, activity..." 
                  className="w-full bg-transparent outline-none text-gray-900 font-medium placeholder:font-normal placeholder:text-gray-400 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
           )}

           <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2 w-full overflow-x-auto no-scrollbar p-1">
              {(['NOW', 'TOMORROW', 'THIS_WEEK'] as TimeFilter[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    selectedTab === tab 
                      ? 'bg-primary text-white shadow-md shadow-primary/30 transform scale-105' 
                      : 'bg-white text-gray-400 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {tab === 'NOW' ? t.now : tab === 'TOMORROW' ? t.tomorrow : t.thisWeek}
                </button>
              ))}
            </div>
            {/* Language Filter */}
            <div className="relative flex-shrink-0">
               <button onClick={toggleLanguageFilter} className={`p-2 rounded-lg transition-all ${languageFilter ? 'bg-blue-100 text-primary' : 'bg-white text-gray-400 border border-gray-200'}`}>
                  <Languages className="w-5 h-5" />
               </button>
               {languageFilter && (
                   <span className="absolute -top-2 -right-2 text-[10px] bg-primary text-white px-1.5 rounded-full border border-white">
                       {languageFilter === 'Russian' ? 'RU' : 'CN'}
                   </span>
               )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 relative h-full overflow-hidden bg-gray-50">
        {viewMode === 'MAP' ? (
          <div className="h-full w-full">
            <MapView 
              sessions={filteredSessions} 
              selectedSessionId={selectedSession?.id || null}
              onSelectSession={setSelectedSession}
            />
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-4 pb-48 max-w-4xl mx-auto space-y-6 no-scrollbar">
             
             <div onClick={() => setShowRequestModal(true)} className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-5 shadow-lg flex items-center justify-between cursor-pointer group hover:scale-[1.01] transition-transform">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                        <PlusCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm">Don't see your slot?</h3>
                        <p className="text-gray-400 text-xs">Request a trip and we'll notify operators.</p>
                    </div>
                </div>
                <div className="bg-white text-gray-900 px-4 py-2 rounded-lg text-xs font-bold shadow-sm">{t.requestTrip}</div>
             </div>

             {filteredSessions.length === 0 ? (
               <div className="text-center py-12 flex flex-col items-center opacity-50">
                 <Search className="w-12 h-12 text-gray-300 mb-4" />
                 <h3 className="text-lg font-bold text-gray-900">No sessions found</h3>
                 <p className="text-sm text-gray-500">Try adjusting filters or request a new trip!</p>
               </div>
             ) : (
               filteredSessions.map(session => {
                 const isFull = session.bookedSeats >= session.totalSeats;
                 const isConfirmed = session.bookedSeats >= session.minRidersToConfirm;
                 const isRequested = session.isRequested;

                 return (
                   <div key={session.id} onClick={() => setSelectedSession(session)} className={`bg-white rounded-xl overflow-hidden border ${isRequested ? 'border-dashed border-gray-300' : isConfirmed ? 'border-success ring-1 ring-success/20' : isFull ? 'border-orange-200' : 'border-gray-200'} shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group flex flex-col`}>
                     <div className="relative w-full h-40 bg-gray-200 overflow-hidden">
                       <img src={session.image} alt={session.title} className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${isRequested ? 'grayscale-[0.5]' : ''}`} />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                       
                       <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                          <Star className="w-3 h-3 text-secondary fill-current" />
                          <span className="text-xs font-bold text-gray-900">{session.captain.rating || 'New'}</span>
                       </div>

                       <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-[10px] font-bold uppercase shadow-sm flex items-center gap-1 ${isRequested ? 'bg-gray-800 text-white' : isFull ? 'bg-secondary text-white' : isConfirmed ? 'bg-success text-white' : 'bg-white/90 text-gray-700'}`}>
                          {isRequested ? 'Requested' : isFull ? <><Bell className="w-3 h-3" /> Waitlist Only</> : isConfirmed ? <><Zap className="w-3 h-3 fill-current" /> Confirmed</> : <span>Needs {session.minRidersToConfirm - session.bookedSeats} more</span>}
                       </div>

                       <div className="absolute bottom-3 left-4 right-4">
                          <h3 className="text-lg font-bold text-white leading-tight drop-shadow-md mb-0.5">{session.title}</h3>
                          <p className="text-xs text-gray-200 font-medium">{session.operatorName}</p>
                       </div>
                     </div>

                     <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                           <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span className="font-medium">{session.timeStart.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit'})}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span className="font-medium truncate max-w-[100px]">{session.location}</span>
                              </div>
                           </div>
                           
                           {/* Language Flag on Card */}
                           {session.captain.languages && session.captain.languages.length > 0 && (
                               <div className="flex gap-1">
                                   {session.captain.languages.includes('Russian') && <span className="text-xs" title="Russian Speaking">🇷🇺</span>}
                                   {session.captain.languages.includes('Chinese') && <span className="text-xs" title="Chinese Speaking">🇨🇳</span>}
                                   {session.captain.languages.includes('English') && <span className="text-xs" title="English Speaking">🇬🇧</span>}
                               </div>
                           )}
                        </div>

                        <div className="flex items-end justify-between pt-2 border-t border-gray-100">
                           <div className="flex flex-col">
                                {session.originalPrice && <span className="text-xs text-gray-400 line-through font-medium">AED {session.originalPrice}</span>}
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-bold text-gray-900">{session.currency} {session.pricePerSeat}</span>
                                    <span className="text-xs text-gray-500">/ seat</span>
                                </div>
                           </div>
                           
                           {isFull ? (
                             <button className="bg-orange-50 text-secondary px-5 py-2 rounded-lg font-bold text-xs border border-orange-100 uppercase tracking-wide">{t.waitlist}</button>
                           ) : isRequested ? (
                             <button className="bg-gray-100 text-gray-600 px-5 py-2 rounded-lg font-bold text-sm shadow-sm transition-colors">Join Request</button>
                           ) : (
                             <button className="bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg text-white px-5 py-2 rounded-lg font-bold text-sm shadow-md shadow-primary/20 transition-colors">{t.book}</button>
                           )}
                        </div>
                     </div>
                   </div>
                 );
               })
             )}
          </div>
        )}
      </div>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[30]">
        <button onClick={() => setViewMode(viewMode === 'MAP' ? 'LIST' : 'MAP')} className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 font-bold text-sm hover:scale-105 transition-transform">
          {viewMode === 'MAP' ? <><List className="w-4 h-4" /> List</> : <><Map className="w-4 h-4" /> Map</>}
        </button>
      </div>

      {selectedSession && (
        <SessionDetailCard session={selectedSession} onClose={() => setSelectedSession(null)} onBook={startBookingFlow} onWaitlist={handleJoinWaitlist} />
      )}
      {showWaiver && <WaiverModal onClose={() => setShowWaiver(false)} onConfirm={handleWaiverSigned} />}
      {showPayment && selectedSession && <PaymentModal session={selectedSession} onClose={() => setShowPayment(false)} onConfirm={handlePaymentConfirmed} />}
      {showRequestModal && <RequestTripModal onClose={() => setShowRequestModal(false)} onSubmit={onRequestTrip} />}
      {bookingSuccess && <BookingSuccess session={bookingSuccess} onClose={() => setBookingSuccess(null)} />}
      {waitlistSuccess && <WaitlistSuccess session={waitlistSuccess} onClose={() => setWaitlistSuccess(null)} />}
    </div>
  );
};

export default CustomerView;