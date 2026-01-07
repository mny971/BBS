import React, { useState, useRef, useEffect } from 'react';
import { X, FileText, ShieldCheck, PenTool, Check, ChevronDown } from 'lucide-react';

interface WaiverModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const WaiverModal: React.FC<WaiverModalProps> = ({ onClose, onConfirm }) => {
  const [signature, setSignature] = useState('');
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [checks, setChecks] = useState({
    risks: false,
    medical: false,
    liability: false,
    photos: false
  });

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setHasScrolled(true);
      }
    }
  };

  const allChecked = Object.values(checks).every(Boolean);
  const isReady = allChecked && signature.length > 2 && hasScrolled;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-gray-200">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-3">
             <div className="bg-primary/10 p-2 rounded-lg">
               <ShieldCheck className="w-5 h-5 text-primary" />
             </div>
             <div>
                 <h2 className="text-lg font-bold text-gray-900 leading-none">Liability Waiver</h2>
                 <p className="text-xs text-gray-500 mt-1">BookBySeat Dubai • Digital Agreement</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Legal Document */}
        <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-6 bg-gray-50/50 scroll-smooth"
        >
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 text-sm text-gray-600 leading-relaxed font-serif">
             <h3 className="font-sans font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs border-b pb-2">1. Activity & Risks</h3>
             <p className="mb-4">
               I ("PARTICIPANT") acknowledge that wakeboarding, wakesurfing, and sport fishing involve inherent risks, including but not limited to drowning, collisions, equipment failure, and weather conditions. I voluntarily choose to participate despite these risks.
             </p>
             
             <h3 className="font-sans font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs border-b pb-2">2. Medical Fitness</h3>
             <p className="mb-4">
               I certify that I am physically fit and have no medical condition that would prevent full participation. I agree to wear a USCG-approved life vest at all times while in the water.
             </p>

             <h3 className="font-sans font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs border-b pb-2">3. Release of Liability</h3>
             <p className="mb-4">
               I hereby release and hold harmless BookBySeat, the Operator, the Captain, and their affiliates from any liability, claims, or demands for personal injury, death, or property damage arising from my participation.
             </p>

             <h3 className="font-sans font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs border-b pb-2">4. Media Release</h3>
             <p className="mb-4">
               I grant BookBySeat permission to use photographs or video recordings of me for marketing purposes without compensation.
             </p>
             
             <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-400 font-sans">
                <span>Document ID: BBS-{Date.now().toString().slice(-6)}</span>
                <span>Page 1 of 1</span>
             </div>
           </div>

           {!hasScrolled && (
               <div className="flex items-center justify-center gap-2 text-primary text-xs font-bold animate-bounce my-4">
                   <ChevronDown className="w-4 h-4" /> Scroll to bottom to sign
               </div>
           )}

           {/* Clauses Checkboxes */}
           <div className={`space-y-3 transition-opacity duration-500 ${hasScrolled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
             <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Acknowledge Terms</p>
             
             {[
                 { key: 'risks', label: 'I understand and accept the risks involved.' },
                 { key: 'medical', label: 'I am medically fit to participate.' },
                 { key: 'liability', label: 'I release BookBySeat from liability.' },
                 { key: 'photos', label: 'I consent to photo/video usage.' }
             ].map((item: any) => (
                 <label key={item.key} className="flex gap-3 items-center cursor-pointer group bg-white p-3 rounded-lg border border-gray-200 hover:border-primary/50 transition-all shadow-sm">
                    <div className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-all ${checks[item.key as keyof typeof checks] ? 'bg-primary border-primary' : 'border-gray-300 bg-gray-50'}`}>
                        {checks[item.key as keyof typeof checks] && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <input type="checkbox" className="hidden" checked={checks[item.key as keyof typeof checks]} onChange={() => setChecks(c => ({...c, [item.key]: !c[item.key as keyof typeof checks]}))} />
                    <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900">{item.label}</span>
                 </label>
             ))}
           </div>
        </div>

        {/* Signature Area */}
        <div className="p-6 bg-white border-t border-gray-200 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
           <div className="mb-6 relative">
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-wide flex justify-between">
                  <span>Digital Signature</span>
                  <span className="text-gray-300">{new Date().toLocaleDateString()}</span>
              </label>
              <div className="relative group">
                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <PenTool className="w-5 h-5" />
                 </div>
                 <input 
                   type="text" 
                   placeholder="Type full legal name"
                   value={signature}
                   onChange={(e) => setSignature(e.target.value)}
                   className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-serif italic text-xl text-gray-900 placeholder:text-gray-300 placeholder:font-sans placeholder:not-italic transition-all"
                 />
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                    <span className="text-[10px] text-primary font-bold bg-primary/10 px-2 py-1 rounded">E-SIGN</span>
                 </div>
              </div>
           </div>

           <button 
            onClick={onConfirm}
            disabled={!isReady}
            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isReady ? <Check className="w-5 h-5" /> : null}
            {hasScrolled ? 'Confirm Signature' : 'Read to Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaiverModal;