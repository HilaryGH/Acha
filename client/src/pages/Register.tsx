import { useState } from 'react';
import BuyerForm from '../components/forms/BuyerForm';
import SenderForm from '../components/forms/SenderForm';
import ReceiverForm from '../components/forms/ReceiverForm';
import TravellerForm from '../components/forms/TravellerForm';

type RegistrationType = 'buyer' | 'sender' | 'receiver' | 'traveller' | null;

function Register() {
  const [selectedType, setSelectedType] = useState<RegistrationType>(null);

  const registrationTypes = [
    { id: 'buyer' as const, title: 'Buyer', description: 'Want to order items from abroad? Register as a buyer.', icon: '🛒' },
    { id: 'sender' as const, title: 'Sender', description: 'Have items to send? Register as a sender.', icon: '📦' },
    { id: 'receiver' as const, title: 'Receiver', description: 'Expecting a delivery? Register as a receiver.', icon: '📬' },
    { id: 'traveller' as const, title: 'Traveller', description: 'Traveling and want to earn? Register as a traveller.', icon: '✈️' },
  ];

  if (selectedType) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => setSelectedType(null)}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Registration Types
          </button>

          {selectedType === 'buyer' && <BuyerForm />}
          {selectedType === 'sender' && <SenderForm />}
          {selectedType === 'receiver' && <ReceiverForm />}
          {selectedType === 'traveller' && <TravellerForm />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Register</h1>
          <p className="text-lg text-gray-600">
            Choose your role to get started
          </p>
        </div>

        {/* Registration Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {registrationTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-6xl mb-4 text-center">{type.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                {type.title}
              </h3>
              <p className="text-gray-600 text-center mb-6">
                {type.description}
              </p>
              <button
                className="w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}
              >
                Register as {type.title}
              </button>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Register?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🔒</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure Platform</h3>
                <p className="text-gray-600 text-sm">
                  Your information is safe and secure with us
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚡</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Quick Setup</h3>
                <p className="text-gray-600 text-sm">
                  Get started in just a few minutes
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">🌍</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Global Network</h3>
                <p className="text-gray-600 text-sm">
                  Connect with people worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
