import { useState } from 'react';
import TravellerForm from '../components/forms/TravellerForm';
import BuyerForm from '../components/forms/BuyerForm';
import SenderForm from '../components/forms/SenderForm';
import ReceiverForm from '../components/forms/ReceiverForm';

function Register() {
  const [activeTab, setActiveTab] = useState<'traveller' | 'buyer' | 'sender' | 'receiver'>('traveller');

  const tabs = [
    { id: 'traveller' as const, label: 'Traveller', icon: '✈️' },
    { id: 'buyer' as const, label: 'Buyer', icon: '🛒' },
    { id: 'sender' as const, label: 'Sender', icon: '📦' },
    { id: 'receiver' as const, label: 'Receiver', icon: '📬' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Join Acha Delivery</h1>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              style={activeTab === tab.id ? { background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' } : {}}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="mt-8">
          {activeTab === 'traveller' && <TravellerForm />}
          {activeTab === 'buyer' && <BuyerForm />}
          {activeTab === 'sender' && <SenderForm />}
          {activeTab === 'receiver' && <ReceiverForm />}
        </div>
      </div>
    </div>
  );
}

export default Register;



