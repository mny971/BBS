import React, { useState } from 'react';
import { MOCK_OPERATORS } from '../constants';
import { Operator } from '../types';
import { MapPin, Star, X, MessageCircle } from 'lucide-react';

const OperatorList: React.FC = () => {
  const [cityFilter, setCityFilter] = useState<'all' | 'dubai' | 'abudhabi'>('all');
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  
  const filteredOperators = MOCK_OPERATORS.filter(op => cityFilter === 'all' || op.city === cityFilter);

  const getWhatsAppLink = (operator: Operator) => {
      return `https://wa.me/?text=${encodeURIComponent(`Hi ${operator.name}, I found you on BookBySeat.`)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fade-in pb-24">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Our Fleet</h1>
        <p className="text-gray-500 text-sm font-medium">{MOCK_OPERATORS.length} verified partners</p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2 px-2">
         <button onClick={() => setCityFilter('all')} className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${cityFilter === 'all' ? 'bg-primary text-white shadow-md shadow-primary/30' : 'bg-white text-gray-500 border border-gray-200'}`}>All</button>
         <button onClick={() => setCityFilter('dubai')} className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${cityFilter === 'dubai' ? 'bg-primary text-white shadow-md shadow-primary/30' : 'bg-white text-gray-500 border border-gray-200'}`}>Dubai</button>
         <button onClick={() => setCityFilter('abudhabi')} className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${cityFilter === 'abudhabi' ? 'bg-primary text-white shadow-md shadow-primary/30' : 'bg-white text-gray-500 border border-gray-200'}`}>Abu Dhabi</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOperators.map(op => (
          <div key={op.id} onClick={() => setSelectedOperator(op)} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-lg bg-gray-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {op.emoji}
                </div>
                <div className="flex items-center gap-1 bg-orange-50 text-secondary px-2 py-1 rounded-md border border-orange-100">
                   <Star className="w-3 h-3 fill-current" />
                   <span className="text-xs font-bold">{op.rating}</span>
                </div>
            </div>
            
            <h3 className="font-bold text-lg text-gray-900 mb-1">{op.name}</h3>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-4">
               <MapPin className="w-3 h-3" /> {op.location}
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
               <span className="text-xs font-bold text-primary">{op.sessions} active sessions</span>
               <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors">
                 <span className="text-lg leading-none mb-1">→</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOperator && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedOperator(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl p-8 relative" onClick={e => e.stopPropagation()}>
             <button onClick={() => setSelectedOperator(null)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
               <X className="w-5 h-5 text-gray-500" />
             </button>

             <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center text-4xl mb-6">
                {selectedOperator.emoji}
             </div>

             <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedOperator.name}</h2>
             <p className="text-gray-500 text-sm font-medium mb-6">{selectedOperator.location} • {selectedOperator.city.toUpperCase()}</p>

             <div className="space-y-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl">
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">About</p>
                   <p className="text-sm text-gray-700 leading-relaxed">{selectedOperator.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-gray-50 p-4 rounded-xl">
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Pricing</p>
                       <p className="text-sm font-bold text-gray-900">{selectedOperator.pricing}</p>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-xl">
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Rating</p>
                       <p className="text-sm font-bold text-gray-900">{selectedOperator.rating} ★ <span className="text-gray-400 font-normal">({selectedOperator.reviews})</span></p>
                   </div>
                </div>
             </div>

             <div className="flex gap-3">
                <a 
                   href={getWhatsAppLink(selectedOperator)}
                   target="_blank"
                   rel="noopener noreferrer" 
                   className="flex-1 bg-success hover:bg-green-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-success/30"
                >
                   <MessageCircle className="w-5 h-5" /> WhatsApp
                </a>
                <button onClick={() => setSelectedOperator(null)} className="flex-1 bg-gray-100 text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors">
                   Close
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperatorList;