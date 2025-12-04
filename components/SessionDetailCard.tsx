import React from 'react';
import { Session } from '../types';
import { Clock, MapPin, ShieldCheck, Sun, Cloud, Wind, AlertTriangle, X, Star, Lock, Users, BellRing, HelpCircle, Languages } from 'lucide-react';

interface SessionDetailCardProps {
  session: Session;
  onClose: () => void;
  onBook: () => void;
  onWaitlist: () => void;
}

const SessionDetailCard: React.FC<SessionDetailCardProps> = ({ session, onClose, onBook, onWaitlist }) => {
  const seatsLeft = session.totalSeats - session.bookedSeats;
  const progressPercent = (session.bookedSeats / session.totalSeats) * 100;
  const minReached = session.bookedSeats >= session.minRidersToConfirm;
  const isFull = session.bookedSeats >= session.totalSeats;
  const isRequested = session.isRequested;

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'Sunny': return <Sun className="w-4 h-4 text-secondary" />;
      case 'Cloudy': return <Cloud className="w-4 h-4 text-gray-400" />;
      case 'Windy': return <Wind className="w-4 h-4 text-primary" />;
      case 'Risky': return <AlertTriangle className="w-4 h-4 text-secondary" />;
      default: return <Sun className="w-4 h-4 text-secondary" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-end md:items-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md md:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden animate-slide-up border border-gray-100 h-[90vh] md:h-auto flex flex-col">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/60 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-64 w-full flex-shrink-0 bg-gray-200">
            <img src={session.image} alt={session.title} className={`w-full h-full object-cover ${isRequested ? 'grayscale opacity-80' : ''}`} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-white"></div>
            
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm">
              {getWeatherIcon(session.weather)}
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">{session.weather}</span>
            </div>
        </div>

        <div className="px-6 pb-8 -mt-8 relative z-10 flex-1 overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold text-gray-900 leading-tight max-w-[70%]">{session.title}</h2>
                <div className="text-right">
                  {session.originalPrice && (
                    <div className="text-xs text-gray-400 line-through font-medium">AED {session.originalPrice}</div>
                  )}
                  <div className="text-2xl font-extrabold text-primary">{session.currency} {session.pricePerSeat}</div>
                </div>
            </div>

            <div className={`p-4 rounded-xl border mb-6 ${isRequested ? 'bg-gray-50 border-gray-200' : isFull ? 'bg-orange-50 border-orange-100' : minReached ? 'bg-green-50 border-green-100' : 'bg-blue-50 border-blue-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                    {isRequested ? (
                        <HelpCircle className="w-4 h-4 text-gray-500" />
                    ) : isFull ? (
                         <BellRing className="w-4 h-4 text-secondary" />
                    ) : minReached ? (
                        <Lock className="w-4 h-4 text-success" />
                    ) : (
                        <Users className="w-4 h-4 text-primary" />
                    )}
                    <span className={`text-xs font-bold uppercase tracking-wide ${isRequested ? 'text-gray-500' : isFull ? 'text-secondary' : minReached ? 'text-success' : 'text-primary'}`}>
                        {isRequested ? 'Crowdsourcing' : isFull ? 'Sold Out' : minReached ? 'Session Confirmed' : 'Minimum Threshold'}
                    </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {isRequested 
                        ? "This trip is requested by a rider. Join now to help reach the minimum and attract an operator!"
                        : isFull 
                            ? "This session is full. Join the waitlist to be notified if a spot opens up or we add a second boat!"
                            : minReached 
                                ? "This trip is locked and confirmed to run!" 
                                : `This trip needs ${session.minRidersToConfirm} people to run. Your card is only pre-authorized now and charged when we confirm.`
                    }
                </p>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Capacity</span>
                <span className="text-xs font-bold text-gray-900">{session.bookedSeats}/{session.totalSeats} Seats</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="relative w-full h-full">
                    <div 
                      className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${isFull ? 'bg-secondary' : minReached ? 'bg-success' : 'bg-primary'}`} 
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                    {!isFull && (
                      <div 
                          className="absolute top-0 bottom-0 w-0.5 bg-white z-10" 
                          style={{ left: `${(session.minRidersToConfirm / session.totalSeats) * 100}%` }}
                      ></div>
                    )}
                </div>
              </div>
              <div className="flex justify-between mt-1">
                 <span className="text-[10px] text-gray-400">0</span>
                 <span className="text-[10px] text-gray-400 absolute" style={{ left: `${(session.minRidersToConfirm / session.totalSeats) * 100}%`, transform: 'translateX(-50%)' }}>Min {session.minRidersToConfirm}</span>
                 <span className="text-[10px] text-gray-400">{session.totalSeats}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Time</p>
                 <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-bold text-sm text-gray-900">{session.timeStart.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                 </div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Location</p>
                 <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-bold text-sm text-gray-900 truncate">{session.location}</span>
                 </div>
              </div>
            </div>

            <div className="mb-8 p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                        <img src={session.captain.image} className="w-12 h-12 rounded-full object-cover border-2 border-gray-100" alt="Capt" />
                        <div>
                            <p className="text-sm font-bold text-gray-900">{session.captain.name}</p>
                            {session.captain.verified ? (
                                <p className="text-xs text-success font-medium flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" /> Verified Captain
                                </p>
                            ) : (
                                <p className="text-xs text-gray-400 italic">Pending Assignment</p>
                            )}
                        </div>
                    </div>
                    {session.captain.rating > 0 && (
                        <div className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Star className="w-3 h-3 text-secondary fill-current" /> {session.captain.rating}
                        </div>
                    )}
                </div>
                {/* Instructor Languages */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                    <Languages className="w-4 h-4 text-gray-400" />
                    <div className="flex gap-2 flex-wrap">
                        {session.captain.languages && session.captain.languages.length > 0 ? (
                            session.captain.languages.map((lang, idx) => (
                                <span key={idx} className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100">
                                    {lang}
                                </span>
                            ))
                        ) : (
                            <span className="text-[10px] text-gray-400">English</span>
                        )}
                    </div>
                </div>
            </div>

            {isFull ? (
                <button 
                    onClick={onWaitlist}
                    className="w-full bg-secondary hover:bg-orange-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-secondary/20 flex items-center justify-center gap-3 transition-all active:scale-95"
                >
                    <span>Join Waitlist</span>
                    <BellRing className="w-5 h-5" />
                </button>
            ) : isRequested ? (
                <button 
                    onClick={onBook}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-gray-500/20 flex items-center justify-center gap-3 transition-all active:scale-95"
                >
                    <span>Back This Trip</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded text-sm">{session.currency} {session.pricePerSeat}</span>
                </button>
            ) : (
                <button 
                    onClick={onBook}
                    className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary hover:to-primary-dark text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-3 transition-all active:scale-95"
                >
                    <span>Book Seat</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded text-sm">{session.currency} {session.pricePerSeat}</span>
                </button>
            )}
            
            <p className="text-center text-[10px] text-gray-400 mt-3">
                {isFull ? "You will be notified if a slot becomes available." : "No charge until session is confirmed."}
            </p>
        </div>
      </div>
    </div>
  );
};

export default SessionDetailCard;