import React from 'react';
import { Calendar, Wallet, TrendingUp, Clock, ArrowRight, MapPin, CalendarPlus, ExternalLink, Navigation } from 'lucide-react';
import { Session } from '../types';

interface RiderDashboardProps {
  bookings: Session[];
  onBrowse: () => void;
}

const RiderDashboard: React.FC<RiderDashboardProps> = ({ bookings, onBrowse }) => {
  
  const handleAddToCalendar = (session: Session) => {
    // Create .ics file content
    const startTime = session.timeStart.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const endTime = new Date(session.timeStart.getTime() + session.durationMinutes * 60000).toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startTime}
DTEND:${endTime}
SUMMARY:${session.title}
DESCRIPTION:Booked via BookBySeat with ${session.operatorName}.
LOCATION:${session.meetingPoint}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${session.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fade-in pb-32 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      
      {/* Header */}
      <div className="mb-8 px-2 pt-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">Your Trips</h1>
        <p className="text-gray-500 text-sm font-medium">Upcoming adventures & stats</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
           <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/20 rounded-full transition-transform group-hover:scale-110 blur-xl"></div>
          
          <div className="flex items-center gap-2 mb-3 text-cyan-50 text-[10px] font-bold uppercase tracking-wide relative z-10">
             <Wallet className="w-4 h-4" /> Total Savings
          </div>
          <p className="text-4xl font-extrabold mb-2 relative z-10 tracking-tight">4.5k</p>
          <div className="flex items-center gap-2 relative z-10">
             <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-md border border-white/10">AED</span>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm p-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent rounded-2xl opacity-50 pointer-events-none"></div>
          <div className="relative z-10">
             <div className="flex items-center gap-2 mb-3 text-secondary text-[10px] font-bold uppercase tracking-wide">
                <TrendingUp className="w-4 h-4" /> Rides
             </div>
             <p className="text-3xl font-bold text-gray-900">{12 + bookings.length}</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm p-6 relative">
           <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent rounded-2xl opacity-50 pointer-events-none"></div>
           <div className="relative z-10">
             <div className="flex items-center gap-2 mb-3 text-purple-500 text-[10px] font-bold uppercase tracking-wide">
                <Clock className="w-4 h-4" /> Hours
             </div>
             <p className="text-3xl font-bold text-gray-900">24</p>
           </div>
        </div>
      </div>

      {/* Upcoming Sessions List */}
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 ml-2 flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5" /> Upcoming Schedule
      </h3>
      
      <div className="space-y-4">
        {bookings.length === 0 ? (
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-12 text-center border border-gray-200 flex flex-col items-center justify-center shadow-sm">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-gray-300 shadow-sm">
                    <Calendar className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">No upcoming trips</h4>
                <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">You haven't booked any sessions yet. Check out what's happening!</p>
                <button onClick={onBrowse} className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/20 inline-flex items-center gap-2 transition-colors">
                   Explore Sessions <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        ) : (
            bookings.map((session, index) => (
                <div key={`${session.id}-${index}`} className="bg-white/80 backdrop-blur-lg rounded-2xl p-5 border border-white/50 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-4">
                             <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                                 <img src={session.image} alt={session.title} className="w-full h-full object-cover" />
                             </div>
                             <div>
                                 <h4 className="font-bold text-gray-900 text-lg leading-tight">{session.title}</h4>
                                 <p className="text-xs text-gray-500 font-medium mt-1">{session.operatorName}</p>
                                 <div className="flex items-center gap-3 mt-2">
                                     <span className="bg-blue-50 text-primary px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide">
                                         {session.timeStart.toLocaleDateString([], { weekday: 'short', day: 'numeric' })}
                                     </span>
                                     <span className="text-gray-900 font-bold text-sm">
                                         {session.timeStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                     </span>
                                 </div>
                             </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-xs font-bold text-success bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                Confirmed
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4 bg-gray-50/50 p-2 rounded-lg border border-gray-100">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <p className="text-xs text-gray-600 font-medium truncate">{session.meetingPoint}</p>
                    </div>

                    <div className="flex gap-3">
                        <button 
                            onClick={() => handleAddToCalendar(session)}
                            className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 hover:border-primary/30 text-gray-700 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                        >
                            <CalendarPlus className="w-4 h-4 text-primary" /> Add to Calendar
                        </button>
                        <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(session.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-primary hover:bg-primary-dark text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-primary/20"
                        >
                            <Navigation className="w-4 h-4" /> Directions
                        </a>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
};

export default RiderDashboard;