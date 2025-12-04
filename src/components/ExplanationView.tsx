import React from 'react';
import { Check, Zap, Users, Anchor, ArrowLeft, PlusCircle, Share2, Lock } from 'lucide-react';

interface ExplanationViewProps {
    onBack?: () => void;
}

const ExplanationView: React.FC<ExplanationViewProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24 animate-fade-in relative">
      
      {/* Header with Back Button */}
      {onBack && (
          <div className="sticky top-0 z-30 px-6 py-4 bg-white/70 backdrop-blur-xl border-b border-white/50 flex items-center gap-4">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2">
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <h1 className="text-lg font-bold text-gray-900">How BookBySeat Works</h1>
          </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 mb-10 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
           <div className="relative z-10">
              <h2 className="text-3xl font-extrabold mb-4 tracking-tight">Premium Watersports.<br/>Shared Prices.</h2>
              <p className="text-lg text-cyan-50 font-medium max-w-lg leading-relaxed">
                We fill empty seats on boat charters so you pay a fraction of the cost.
              </p>
           </div>
        </div>

        {/* The 3 Steps */}
        <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6 px-2">How to Join</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Step 1 */}
                <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/60 shadow-sm relative group hover:-translate-y-1 transition-transform duration-300">
                    <div className="absolute -top-4 left-6 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold shadow-lg shadow-primary/30">1</div>
                    <div className="mt-4">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">Find or Request</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Browse existing trips or <span className="font-bold text-primary">Request a Trip</span> for your preferred time. We'll notify operators to pick it up.
                        </p>
                    </div>
                    <div className="mt-4 flex gap-2 justify-end opacity-50 group-hover:opacity-100 transition-opacity">
                        <PlusCircle className="w-12 h-12 text-gray-200" />
                    </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/60 shadow-sm relative group hover:-translate-y-1 transition-transform duration-300">
                    <div className="absolute -top-4 left-6 w-10 h-10 bg-secondary text-white rounded-xl flex items-center justify-center font-bold shadow-lg shadow-secondary/30">2</div>
                    <div className="mt-4">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">Lock Your Seat</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Book your spot. Your card is <span className="font-bold text-secondary">Pre-authorized</span> (held), not charged, until the trip is confirmed.
                        </p>
                    </div>
                    <div className="mt-4 flex gap-2 justify-end opacity-50 group-hover:opacity-100 transition-opacity">
                        <Lock className="w-12 h-12 text-gray-200" />
                    </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/60 shadow-sm relative group hover:-translate-y-1 transition-transform duration-300">
                    <div className="absolute -top-4 left-6 w-10 h-10 bg-success text-white rounded-xl flex items-center justify-center font-bold shadow-lg shadow-success/30">3</div>
                    <div className="mt-4">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">Confirmed & Go</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Once the minimum riders (e.g. 3 people) join, the trip confirms. You get a calendar invite and WhatsApp group link.
                        </p>
                    </div>
                    <div className="mt-4 flex gap-2 justify-end opacity-50 group-hover:opacity-100 transition-opacity">
                        <Check className="w-12 h-12 text-gray-200" />
                    </div>
                </div>
            </div>
        </div>

        {/* Benefits Grid */}
        <h3 className="text-xl font-bold text-gray-900 mb-6 px-2">Why BookBySeat?</h3>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                <div className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-green-100 p-2 rounded-lg text-success">
                            <Zap className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-gray-900">Instant Access</h4>
                    </div>
                    <p className="text-sm text-gray-500">No calling operators or waiting for email replies. Real-time availability.</p>
                </div>
                
                <div className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-blue-100 p-2 rounded-lg text-primary">
                            <Users className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-gray-900">Social Vibe</h4>
                    </div>
                    <p className="text-sm text-gray-500">Meet other wakeboarders and anglers. Filter by skill level.</p>
                </div>

                <div className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-orange-100 p-2 rounded-lg text-secondary">
                            <Share2 className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-gray-900">Crowdsourcing</h4>
                    </div>
                    <p className="text-sm text-gray-500">Want a sunset slot? Create a request. If others join, an operator will take it.</p>
                </div>

                <div className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                            <Anchor className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-gray-900">Verified Fleet</h4>
                    </div>
                    <p className="text-sm text-gray-500">All operators are licensed and verified for safety and quality.</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ExplanationView;