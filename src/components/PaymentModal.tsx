import React, { useState } from 'react';
import { X, Lock, ShieldCheck, CreditCard } from 'lucide-react';
import { Session } from '../types';

interface PaymentModalProps {
  session: Session;
  onClose: () => void;
  onConfirm: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ session, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onConfirm();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all animate-scale-up">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-500" />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Checkout</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex justify-between items-end pb-4 border-b border-gray-100">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Total</p>
              <p className="text-3xl font-extrabold text-gray-900">{session.currency} {session.pricePerSeat}</p>
            </div>
            <div className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded-md text-gray-500 uppercase tracking-wide border border-gray-200">
                Pre-auth
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3 border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Card number" 
                    className="bg-transparent outline-none w-full text-gray-900 font-medium placeholder:text-gray-400 text-sm"
                />
            </div>
            <div className="flex gap-3">
                <div className="bg-gray-50 rounded-xl p-3 flex-1 border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                     <input 
                        type="text" 
                        placeholder="MM/YY" 
                        className="bg-transparent outline-none w-full text-gray-900 font-medium placeholder:text-gray-400 text-sm"
                    />
                </div>
                <div className="bg-gray-50 rounded-xl p-3 flex-1 border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                     <input 
                        type="text" 
                        placeholder="CVC" 
                        className="bg-transparent outline-none w-full text-gray-900 font-medium placeholder:text-gray-400 text-sm"
                    />
                </div>
            </div>
          </div>

          <button 
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary hover:to-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-3 transition-all active:scale-95"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              `Pay Now`
            )}
          </button>
          
          <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Secure 256-bit SSL encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;