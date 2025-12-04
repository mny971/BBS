import React, { useState } from 'react';
import { Operator, RiderProfileData } from '../types';
import { Users, Anchor, TrendingUp, Plus, Save } from 'lucide-react';

interface AdminDashboardProps {
  operators: Operator[];
  riders: RiderProfileData[];
  onAddOperator: (op: Operator) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ operators, riders, onAddOperator }) => {
  const [activeTab, setActiveTab] = useState<'OPERATORS' | 'RIDERS'>('OPERATORS');
  const [showAddOp, setShowAddOp] = useState(false);
  const [newOp, setNewOp] = useState<Partial<Operator>>({
      category: 'wakeboarding',
      city: 'dubai',
      emoji: '🏄'
  });
  const [opLangs, setOpLangs] = useState<string[]>(['English']);

  const handleAddLanguage = (lang: string) => {
      if (opLangs.includes(lang)) {
          setOpLangs(opLangs.filter(l => l !== lang));
      } else {
          setOpLangs([...opLangs, lang]);
      }
  };

  const handleCreate = () => {
      const op: Operator = {
          id: `op-${Date.now()}`,
          name: newOp.name || 'New Operator',
          category: newOp.category as any,
          city: newOp.city as any,
          location: newOp.location || 'Dubai Marina',
          rating: 5.0,
          reviews: 0,
          sessions: 0,
          emoji: newOp.category === 'wakeboarding' ? '🏄' : '🎣',
          pricing: 'Varies',
          description: 'New partner added by admin.',
          // In a real app, languages would be stored on the operator or captain level. 
          // For now we assume this configures their default captain profile.
      };
      onAddOperator(op);
      setShowAddOp(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Platform Admin</h1>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="text-xs font-bold text-gray-400 uppercase mb-1">Total Operators</div>
              <div className="text-2xl font-bold">{operators.length}</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="text-xs font-bold text-gray-400 uppercase mb-1">Total Riders</div>
              <div className="text-2xl font-bold">142</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="text-xs font-bold text-gray-400 uppercase mb-1">Revenue</div>
              <div className="text-2xl font-bold text-success">AED 45k</div>
          </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden min-h-[400px]">
          <div className="flex border-b border-gray-100">
              <button onClick={() => setActiveTab('OPERATORS')} className={`flex-1 py-4 text-sm font-bold ${activeTab === 'OPERATORS' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>Operators</button>
              <button onClick={() => setActiveTab('RIDERS')} className={`flex-1 py-4 text-sm font-bold ${activeTab === 'RIDERS' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>Riders</button>
          </div>

          <div className="p-4">
              {activeTab === 'OPERATORS' && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-900">Fleet List</h3>
                        <button onClick={() => setShowAddOp(true)} className="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                            <Plus className="w-3 h-3" /> Add New
                        </button>
                    </div>
                    <div className="space-y-2">
                        {operators.map(op => (
                            <div key={op.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{op.emoji}</span>
                                    <div>
                                        <div className="font-bold text-sm text-gray-900">{op.name}</div>
                                        <div className="text-xs text-gray-500">{op.city} • {op.category}</div>
                                    </div>
                                </div>
                                <div className="text-xs font-bold text-gray-400">ID: {op.id}</div>
                            </div>
                        ))}
                    </div>
                  </>
              )}
              {activeTab === 'RIDERS' && (
                  <div className="text-center text-gray-400 py-10">Rider list placeholder</div>
              )}
          </div>
      </div>

      {showAddOp && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
              <div className="bg-white rounded-2xl w-full max-w-md p-6">
                  <h3 className="text-lg font-bold mb-4">Onboard Operator</h3>
                  <div className="space-y-4">
                      <input placeholder="Operator Name" className="w-full p-2 border rounded-lg text-sm" onChange={e => setNewOp({...newOp, name: e.target.value})} />
                      <input placeholder="Location (e.g. Dubai Marina)" className="w-full p-2 border rounded-lg text-sm" onChange={e => setNewOp({...newOp, location: e.target.value})} />
                      <div className="grid grid-cols-2 gap-2">
                          <select className="p-2 border rounded-lg text-sm" onChange={e => setNewOp({...newOp, city: e.target.value as any})}>
                              <option value="dubai">Dubai</option>
                              <option value="abudhabi">Abu Dhabi</option>
                          </select>
                          <select className="p-2 border rounded-lg text-sm" onChange={e => setNewOp({...newOp, category: e.target.value as any})}>
                              <option value="wakeboarding">Wake</option>
                              <option value="fishing">Fishing</option>
                          </select>
                      </div>
                      
                      {/* Instructor Languages */}
                      <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Instructor Languages</label>
                          <div className="flex flex-wrap gap-2">
                              {['English', 'Russian', 'Arabic', 'French', 'Chinese'].map(lang => (
                                  <button 
                                    key={lang}
                                    onClick={() => handleAddLanguage(lang)}
                                    className={`px-3 py-1 rounded-full text-xs font-bold border ${opLangs.includes(lang) ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-200'}`}
                                  >
                                      {lang}
                                  </button>
                              ))}
                          </div>
                      </div>

                      <button onClick={handleCreate} className="w-full bg-primary text-white font-bold py-3 rounded-lg mt-4">Confirm Onboarding</button>
                      <button onClick={() => setShowAddOp(false)} className="w-full text-gray-500 font-bold py-2 text-sm">Cancel</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminDashboard;