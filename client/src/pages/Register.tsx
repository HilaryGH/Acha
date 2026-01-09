import { useState } from 'react';
import IndividualForm from '../components/forms/IndividualForm';
import DeliveryPartnerForm from '../components/forms/DeliveryPartnerForm';

type RegistrationType = 'individual' | 'delivery-partner' | null;

function Register() {
  const [selectedType, setSelectedType] = useState<RegistrationType>(null);

  if (selectedType === 'individual') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setSelectedType(null)}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Registration Types
          </button>
          <IndividualForm />
        </div>
      </div>
    );
  }

  if (selectedType === 'delivery-partner') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setSelectedType(null)}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Registration Types
          </button>
          <DeliveryPartnerForm />
        </div>
      </div>
    );
  }

  const registrationTypes = [
    { id: 'individual' as const, title: 'Individual', description: 'Register as an individual user', icon: '👤' },
    { id: 'delivery-partner' as const, title: 'Delivery Partner', description: 'Join our delivery network and start earning.', icon: '🚚' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Register</h1>
          <p className="text-lg text-gray-600">
            Choose your registration type to get started
          </p>
        </div>

        {/* Registration Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {registrationTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className="bg-white rounded-xl shadow-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-2xl mb-1.5 text-center">{type.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-1.5 text-center">
                {type.title}
              </h3>
              <p className="text-gray-600 text-center text-sm mb-3">
                {type.description}
              </p>
              <button
                className="w-full py-1.5 px-4 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg text-sm"
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
