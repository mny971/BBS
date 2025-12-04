import React, { useState } from 'react';
import { Calendar, Users, TrendingUp, DollarSign, Plus, ChevronLeft, ChevronRight, Edit2, Copy, CheckCircle2, AlertCircle, X, BellRing, MapPin, Clock } from 'lucide-react';
import { Session } from '../types';

interface OperatorDashboardProps {
    sessions?: Session[];
    onClaimRequest?: (sessionId: string) => void;
}

const OperatorDashboard: React.FC<OperatorDashboardProps> = ({ sessions = [], onClaimRequest }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddSession, setShowAddSession] = useState(false);
  const [activeTab, setActiveTab] = useState<'SCHEDULE' | 'REQUESTS'>('SCHEDULE');
  
  // Filter for pending rider requests
  const requestedSessions = sessions.filter(s => s.isRequested && s.requestStatus === 'OPEN');
  
  // Filter for confirmed/scheduled sessions
  const scheduledSessions = sessions.filter(s => 
    !s.isRequested && 
    (new Date(s.timeStart).toDateString() === selectedDate.toDateString())
  );

  const getWeekDays = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const weekDays = getWeekDays(selectedDate);

  // Stats Logic
  const totalRevenue = scheduledSessions.reduce((acc, s) => acc + (s.bookedSeats * s.pricePerSeat), 0);
  const avgFillRate = scheduledSessions.length > 0 
    ? Math.round((scheduledSessions.reduce((acc, s) => acc + (s.bookedSeats / s.totalSeats), 0) / scheduledSessions.length) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fade-in pb-24">
      <div className="mb-8 px-2 flex justify-between items-end">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">Dashboard</h1>
            <p className="text-gray-500 text-sm font-medium">Overview & Schedule</p>
        </div>
        <div className="bg-gray-100 p-1 rounded-lg flex gap-1">
            <button 
                onClick={() => setActiveTab('SCHEDULE')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'SCHEDULE' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
            >
                Schedule
            </button>
            <button 
                onClick={() => setActiveTab('REQUESTS')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${activeTab === 'REQUESTS' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
            >
                Requests 
                {requestedSessions.length > 0 && <span className="w-2 h-2 rounded-full bg-secondary"></span>}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-gray-400 text-[10px] font-bold uppercase tracking-wide">
             <Calendar className="w-3 h-3" /> Today
          </div>
          <p className="text-3xl font-bold text-gray-900">{scheduledSessions.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-primary text-[10px] font-bold uppercase tracking-wide">
             <DollarSign className="w-3 h-3" /> Revenue
          </div>
          <p className="text-3xl font-bold text-primary">{totalRevenue > 1000 ? `${(totalRevenue/1000).toFixed(1)}k` : totalRevenue}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-secondary text-[10px] font-bold uppercase tracking-wide">
             <Users className="w-3 h-3" /> Fill Rate
          </div>
          <p className="text-3xl font-bold text-gray-900">{avgFillRate}%</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-primary-dark text-[10px] font-bold uppercase tracking-wide">
             <TrendingUp className="w-3 h-3" /> Requests
          </div>
          <p className="text-3xl font-bold text-gray-900">{requestedSessions.length}</p>
        </div>
      </div>

      {activeTab === 'SCHEDULE' && (
        <>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-8 overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-4">
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                            {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h2>
                        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                            <button onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 7)))} className="p-1 hover:bg-gray-100 rounded text-gray-700"><ChevronLeft className="w-4 h-4" /></button>
                            <button onClick={() => setSelectedDate(new Date())} className="px-3 text-[10px] font-bold text-gray-700 uppercase">Today</button>
                            <button onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 7)))} className="p-1 hover:bg-gray-100 rounded text-gray-700"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                    </div>
                    <button onClick={() => setShowAddSession(true)} className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition-all shadow-md shadow-primary/30 flex items-center gap-2 text-sm font-bold">
                        <Plus className="w-4 h-4" /> Add Slot
                    </button>
                </div>
                
                <div className="flex justify-between p-2 overflow-x-auto no-scrollbar">
                    {weekDays.map((date, i) => {
                        const isSelected = date.toDateString() === selectedDate.toDateString();
                        const isToday = date.toDateString() === new Date().toDateString();
                        return (
                            <button 
                                key={i}
                                onClick={() => setSelectedDate(new Date(date))}
                                className={`flex-1 min-w-[60px] flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
                                    isSelected 
                                    ? 'bg-primary text-white shadow-md' 
                                    : 'bg-transparent text-gray-400 hover:bg-gray-50'
                                }`}
                            >
                                <span className="text-[10px] uppercase font-bold mb-1 opacity-80">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                                <span className={`text-lg font-bold ${isToday && !isSelected ? 'text-primary' : ''}`}>{date.getDate()}</span>
                                <div className="flex gap-1 mt-2 h-1">
                                    {[...Array(Math.floor(Math.random() * 3))].map((_, idx) => (
                                        <div key={idx} className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white/50' : 'bg-gray-300'}`}></div>
                                    ))}
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="space-y-4">
                {scheduledSessions.length === 0 ? (
                    <div className="text-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <p className="text-gray-400 text-sm font-medium">No sessions scheduled.</p>
                        <button onClick={() => setShowAddSession(true)} className="mt-4 text-primary font-bold text-sm hover:underline">
                            + List an empty slot
                        </button>
                    </div>
                ) : (
                    scheduledSessions.map(session => {
                        const fillPercent = (session.bookedSeats / session.totalSeats) * 100;
                        const confirmed = session.bookedSeats >= session.minRidersToConfirm;
                        return (
                            <div key={session.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 items-center hover:border-primary/30 transition-colors group">
                                <div className="flex-1 w-full">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">{session.title}</h4>
                                            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                                <span className="font-mono font-bold bg-gray-100 px-2 py-0.5 rounded">{session.timeStart.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                                <span>{session.durationMinutes / 60} Hours</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide ${confirmed ? 'bg-green-100 text-success' : 'bg-orange-50 text-secondary'}`}>
                                                {confirmed ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                                {confirmed ? 'Confirmed' : 'Filling...'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold">
                                            <span className="text-gray-400">{session.bookedSeats} / {session.totalSeats} Seats</span>
                                            <span className="text-gray-900">Revenue: AED {session.bookedSeats * session.pricePerSeat}</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${confirmed ? 'bg-success' : 'bg-secondary'}`} style={{ width: `${fillPercent}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex gap-2 w-full md:w-auto">
                                    <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 p-3 rounded-xl flex items-center justify-center transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 p-3 rounded-xl flex items-center justify-center transition-colors">
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </>
      )}

      {activeTab === 'REQUESTS' && (
          <div className="space-y-4 animate-fade-in">
              {requestedSessions.length === 0 ? (
                  <div className="text-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                      <BellRing className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm font-medium">No active rider requests.</p>
                  </div>
              ) : (
                  requestedSessions.map(session => (
                      <div key={session.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg border-l-4 border-l-primary flex flex-col md:flex-row gap-6 items-center">
                          <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                  <span className="bg-blue-50 text-primary px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">Rider Request</span>
                                  <span className="text-gray-400 text-xs font-bold">•</span>
                                  <span className="text-gray-500 text-xs font-medium">Posted 10m ago</span>
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-2">{session.title}</h3>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                  <div className="flex items-center gap-1.5">
                                      <Calendar className="w-4 h-4 text-primary" />
                                      <span className="font-bold">{session.timeStart.toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                      <Users className="w-4 h-4 text-primary" />
                                      <span className="font-bold">{session.bookedSeats} Rider Ready</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                      <MapPin className="w-4 h-4 text-primary" />
                                      <span>{session.location}</span>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="w-full md:w-auto bg-gray-50 p-4 rounded-xl text-center min-w-[140px]">
                              <p className="text-xs text-gray-500 uppercase font-bold mb-1">Potential Value</p>
                              <p className="text-2xl font-bold text-gray-900 mb-3">AED {session.pricePerSeat * 5}</p>
                              <button 
                                onClick={() => onClaimRequest && onClaimRequest(session.id)}
                                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 rounded-lg text-sm shadow-md shadow-primary/30 transition-all active:scale-95"
                              >
                                  Claim Trip
                              </button>
                          </div>
                      </div>
                  ))
              )}
          </div>
      )}

      {showAddSession && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]" onClick={() => setShowAddSession(false)}>
            <div className="bg-white rounded-2xl w-full max-w-md p-6 animate-scale-up shadow-2xl overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">List Available Slots</h3>
                    <button onClick={() => setShowAddSession(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5 text-gray-400" /></button>
                </div>
                
                <div className="space-y-5">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-wide">Activity</label>
                        <select className="w-full p-3 bg-gray-50 border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary text-gray-900 font-medium text-sm">
                            <option>Wakeboarding (2h)</option>
                            <option>Fishing (4h)</option>
                            <option>Wakesurfing (1.5h)</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-wide">Date</label>
                            <input type="date" className="w-full p-3 bg-gray-50 border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary text-gray-900 font-medium text-sm" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-wide">Start Time</label>
                            <input type="time" className="w-full p-3 bg-gray-50 border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary text-gray-900 font-medium text-sm" />
                        </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                        <label className="block text-[10px] font-bold text-primary uppercase mb-2 tracking-wide flex items-center gap-1">
                            <DollarSign className="w-3 h-3" /> Guaranteed Revenue Floor
                        </label>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <span className="text-[10px] text-gray-500 block mb-1">Total Seats</span>
                                <input type="number" placeholder="5" className="w-full p-2 bg-white border border-blue-200 rounded-lg text-sm font-bold text-center" />
                            </div>
                            <div className="flex-1">
                                <span className="text-[10px] text-gray-500 block mb-1">Min Riders</span>
                                <input type="number" placeholder="3" className="w-full p-2 bg-white border border-blue-200 rounded-lg text-sm font-bold text-center" />
                            </div>
                            <div className="flex-1">
                                <span className="text-[10px] text-gray-500 block mb-1">Price/Seat</span>
                                <input type="number" placeholder="200" className="w-full p-2 bg-white border border-blue-200 rounded-lg text-sm font-bold text-center" />
                            </div>
                        </div>
                        <p className="text-[10px] text-primary mt-2 text-center font-medium">
                            Trip confirms automatically when revenue hits AED 600
                        </p>
                    </div>

                    <button onClick={() => setShowAddSession(false)} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-95">
                        List Session
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default OperatorDashboard;