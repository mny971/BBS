import React from 'react';
import { X, Bell } from 'lucide-react';
import { Session } from '../types';

interface WaitlistSuccessProps {
  session: Session;
  onClose: () => void;
}

const WaitlistSuccess: React.FC<WaitlistSuccessProps> = ({ session, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-white/90 backdrop-blur-xl animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-gray-100 p-8 text-center transform transition-all animate-scale-up relative">
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-orange-50">
            <Bell className="w-10 h-10 text-secondary" strokeWidth={3} />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">You're on the list!</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
            We've added you to the priority waitlist for <span className="font-bold text-gray-900">{session.title}</span>. If a seat opens up or a second boat is added, we'll notify you immediately.
        </p>

        <button 
            onClick={onClose}
            className="w-full bg-secondary hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-secondary/30"
        >
            Got it
        </button>
      </div>
    </div>
  );
};

export default WaitlistSuccess;