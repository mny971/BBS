import React, { useEffect, useState } from 'react';
import { AppLanguage } from '../types';

interface SplashScreenProps {
  onFinish: () => void;
  setLanguage: (lang: AppLanguage) => void;
  currentLanguage: AppLanguage;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, setLanguage, currentLanguage }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 2000);
    const t3 = setTimeout(() => setStep(3), 3500);
    // Removed auto finish to let user pick language if they want, or just wait
    const t4 = setTimeout(onFinish, 6000); 

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center transition-opacity duration-1000 ${step === 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="absolute top-8 right-8 z-20 flex gap-2">
         <button onClick={() => setLanguage('EN')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${currentLanguage === 'EN' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>EN</button>
         <button onClick={() => setLanguage('RU')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${currentLanguage === 'RU' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>RU</button>
         <button onClick={() => setLanguage('CN')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${currentLanguage === 'CN' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>CN</button>
      </div>

      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        <div className={`relative w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-3xl flex items-center justify-center text-white font-extrabold text-3xl tracking-tighter mb-8 transition-all duration-1000 transform shadow-2xl shadow-primary/30 ${step >= 1 ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4'}`}>
          BBS
        </div>

        <div className="h-16 overflow-hidden mb-2">
          <h1 className={`text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark tracking-tight transition-all duration-1000 transform ${step >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            BookBySeat
          </h1>
        </div>

        <div className={`max-w-xs transition-all duration-1000 delay-300 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
            Dubai
          </p>
        </div>

        <div className={`max-w-xs transition-all duration-1000 delay-700 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
           <p className="text-sm text-gray-500 font-medium italic leading-relaxed">
            "Save up, split the cost,<br/>experience more"
           </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;