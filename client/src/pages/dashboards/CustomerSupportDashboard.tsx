import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: string;
  createdAt: string;
}

interface CustomerSupportDashboardProps {
  user: User;
}

function CustomerSupportDashboard({ user }: CustomerSupportDashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'users' | 'messages' | 'settings'>('overview');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('logout'));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Customer Support Dashboard</h1>
              <p className="text-sm text-teal-100 mt-1">Welcome, {user?.name || 'Support Agent'}! 💬</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-teal-900 bg-white border border-white rounded-lg hover:bg-teal-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'tickets', label: 'Support Tickets', icon: '🎫' },
                { id: 'users', label: 'Users', icon: '👥' },
                { id: 'messages', label: 'Messages', icon: '💬' },
                { id: 'settings', label: 'Settings', icon: '⚙️' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal-600 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-lg">
                    <span className="text-2xl">🎫</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Responses</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <span className="text-2xl">⏳</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Support Tickets</h3>
              <div className="text-center py-12">
                <p className="text-gray-600">Support ticket management interface coming soon</p>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">User Inquiries</h3>
              <div className="text-center py-12">
                <p className="text-gray-600">User inquiry management interface coming soon</p>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Messages</h3>
              <div className="text-center py-12">
                <p className="text-gray-600">Message center coming soon</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Support Settings</h3>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Profile Settings</h4>
                  <p className="text-sm text-gray-600">Update your customer support profile</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerSupportDashboard;







