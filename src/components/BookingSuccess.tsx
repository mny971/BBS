import React from 'react';
import { Check, X, MessageCircle, Calendar, Share } from 'lucide-react';
import { Session } from '../types';

interface BookingSuccessProps {
  session: Session;
  onClose: () => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ session, onClose }) => {
  
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(`Hi! I just booked a seat for ${session.title} on ${session.timeStart.toDateString()}. Excited to join!`)}`;

  // Generate Google Calendar Link
  const getGoogleCalendarLink = () => {
    const start = session.timeStart.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const end = new Date(session.timeStart.getTime() + session.durationMinutes * 60000).toISOString().replace(/-|:|\.\d\d\d/g, "");
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(session.title)}&dates=${start}/${end}&details=${encodeURIComponent("Booked via BookBySeat. Location: " + session.meetingPoint)}&location=${encodeURIComponent(session.location)}&sf=true&output=xml`;
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-white/90 backdrop-blur-xl animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-gray-100 p-8 text-center transform transition-all animate-scale-up relative">
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-green-50">
            <Check className="w-10 h-10 text-success" strokeWidth={3} />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">You're In!</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Seat reserved for <span className="font-bold text-gray-900">{session.title}</span>. We'll notify you when the trip is confirmed.
        </p>

        <div className="space-y-3">
            <a 
               href={whatsappLink}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center justify-center gap-2 w-full bg-success hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-success/30"
             >
               <MessageCircle className="w-5 h-5" />
               <span>Join Group Chat</span>
             </a>
            
            <a
              href={getGoogleCalendarLink()}
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 w-full bg-white border border-gray-200 text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
                <Calendar className="w-5 h-5 text-primary" />
                <span>Add to Calendar</span>
            </a>

            <button 
                onClick={onClose}
                className="w-full text-gray-400 text-sm font-medium py-2 hover:text-gray-600 transition-colors"
            >
                Skip
            </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;