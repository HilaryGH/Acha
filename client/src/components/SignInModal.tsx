import { useState } from 'react';
import BuyerForm from './forms/BuyerForm';
import SenderForm from './forms/SenderForm';
import ReceiverForm from './forms/ReceiverForm';
import TravellerForm from './forms/TravellerForm';

type RegistrationType = 'buyer' | 'sender' | 'receiver' | 'traveller' | null;
type ViewMode = 'signin' | 'register';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('signin');
  const [registrationType, setRegistrationType] = useState<RegistrationType>(null);
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  if (!isOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement sign in logic
    console.log('Sign in:', signInData);
    // For now, just close the modal
    onClose();
  };

  const handleClose = () => {
    setViewMode('signin');
    setRegistrationType(null);
    setSignInData({ email: '', password: '' });
    onClose();
  };

  // If registration type is selected, show the registration form
  if (registrationType) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <button
              onClick={() => setRegistrationType(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6">
            {registrationType === 'buyer' && <BuyerForm />}
            {registrationType === 'sender' && <SenderForm />}
            {registrationType === 'receiver' && <ReceiverForm />}
            {registrationType === 'traveller' && <TravellerForm />}
          </div>
        </div>
      </div>
    );
  }

  // Registration type selection view
  if (viewMode === 'register') {
    const registrationTypes = [
      { id: 'buyer' as const, title: 'Buyer', description: 'Want to order items from abroad?', icon: '🛒' },
      { id: 'sender' as const, title: 'Sender', description: 'Have items to send?', icon: '📦' },
      { id: 'receiver' as const, title: 'Receiver', description: 'Expecting a delivery?', icon: '📬' },
      { id: 'traveller' as const, title: 'Traveller', description: 'Traveling and want to earn?', icon: '✈️' },
    ];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Register</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-6 text-center">Choose your role to get started</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {registrationTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setRegistrationType(type.id)}
                  className="bg-gray-50 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 border-transparent hover:border-blue-500"
                >
                  <div className="text-4xl mb-3 text-center">{type.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                    {type.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm mb-4">
                    {type.description}
                  </p>
                  <button
                    className="w-full py-2 px-4 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg text-sm"
                    style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}
                  >
                    Register as {type.title}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setViewMode('signin')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Already have an account? Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sign In view
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={signInData.email}
                onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={signInData.password}
                onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}
            >
              Sign In
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setViewMode('register')}
                className="w-full py-3 px-6 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-50"
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInModal;

