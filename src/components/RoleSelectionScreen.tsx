import React from 'react';
import { User, Anchor, ArrowRight } from 'lucide-react';

interface RoleSelectionScreenProps {
  onSelect: (role: 'RIDER' | 'OPERATOR') => void;
}

const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col items-center justify-center p-6 animate-fade-in">
      
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl tracking-tighter shadow-xl shadow-primary/30 mx-auto mb-6">
          BBS
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Welcome</h1>
        <p className="text-gray-500 font-medium">Choose your account type to continue</p>
      </div>

      <div className="w-full max-w-md space-y-4">
        {/* Rider Card */}
        <button 
          onClick={() => onSelect('RIDER')}
          className="w-full bg-white p-6 rounded-3xl border-2 border-transparent hover:border-primary/20 shadow-lg shadow-gray-200/50 flex items-center justify-between group transition-all active:scale-95"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              <User className="w-7 h-7" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-gray-900">I want to ride</h3>
              <p className="text-xs text-gray-500 font-medium">Book seats on boats & wake trips</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        {/* Operator Card */}
        <button 
          onClick={() => onSelect('OPERATOR')}
          className="w-full bg-white p-6 rounded-3xl border-2 border-transparent hover:border-secondary/20 shadow-lg shadow-gray-200/50 flex items-center justify-between group transition-all active:scale-95"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300">
              <Anchor className="w-7 h-7" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-gray-900">I am a Captain</h3>
              <p className="text-xs text-gray-500 font-medium">List slots & fill empty seats</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-secondary group-hover:text-white transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      <p className="absolute bottom-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
        BookBySeat Dubai
      </p>
    </div>
  );
};

export default RoleSelectionScreen;