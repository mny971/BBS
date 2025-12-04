import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Anchor, CheckCircle2 } from 'lucide-react';

interface RequestTripModalProps {
  onClose: () => void;
  onSubmit: (data: { activity: string; date: string; time: string; location: string }) => void;
}

const RequestTripModal: React.FC<RequestTripModalProps> = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    activity: 'Wakeboarding',
    date: new Date().toISOString().split('T')[0],
    time: '08:00',
    location: 'Dubai Marina'
  });

  const handleSubmit = () => {
    onSubmit(formData);
    setStep(2); // Show success message
    setTimeout(() => {
        onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all animate-scale-up">
        
        {step === 1 ? (
            <>
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-1.5 rounded-lg">
                        <Anchor className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 tracking-tight">Request a Trip</h2>
                        <p className="text-xs text-gray-500">Crowdsource your perfect time slot</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                    <X className="w-5 h-5 text-gray-400" />
                </button>
                </div>

                <div className="p-6 space-y-5">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-wide">Activity</label>
                        <div className="grid grid-cols-2 gap-3">
                            {['Wakeboarding', 'Fishing', 'Wakesurfing', 'Cruising'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFormData({...formData, activity: type})}
                                    className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                                        formData.activity === type 
                                        ? 'bg-primary text-white border-primary shadow-md shadow-primary/20' 
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-wide flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> Date
                            </label>
                            <input 
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                className="w-full p-3 bg-gray-50 border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary text-gray-900 font-medium text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-wide flex items-center gap-1">
                                <Clock className="w-3 h-3" /> Time
                            </label>
                            <input 
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({...formData, time: e.target.value})}
                                className="w-full p-3 bg-gray-50 border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary text-gray-900 font-medium text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-wide flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> Preferred Location
                        </label>
                        <select
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            className="w-full p-3 bg-gray-50 border-transparent rounded-xl outline-none focus:ring-2 focus:ring-primary text-gray-900 font-medium text-sm appearance-none"
                        >
                            <option>Dubai Marina</option>
                            <option>Palm Jumeirah</option>
                            <option>Jumeirah 1 Harbour</option>
                            <option>Dubai Harbour</option>
                        </select>
                    </div>

                    <button 
                        onClick={handleSubmit}
                        className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary hover:to-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all active:scale-95 mt-2"
                    >
                        Create Request
                    </button>
                    <p className="text-[10px] text-gray-400 text-center leading-tight px-4">
                        Operators will be notified. Your card is pre-authorized but only charged if the trip is confirmed.
                    </p>
                </div>
            </>
        ) : (
            <div className="p-10 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-green-50 animate-scale-up">
                    <CheckCircle2 className="w-10 h-10 text-success" strokeWidth={3} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Posted!</h2>
                <p className="text-gray-500 text-sm mb-6">
                    We've listed your trip. Invite friends to fill the seats and confirm it faster.
                </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default RequestTripModal;