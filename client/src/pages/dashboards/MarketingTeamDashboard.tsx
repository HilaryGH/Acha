import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { logout } from '../../utils/auth';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: string;
  createdAt: string;
  department?: string;
}

interface Partner {
  _id: string;
  uniqueId: string;
  name: string;
  email: string;
  phone: string;
  registrationType: string;
  status: string;
  createdAt: string;
}

interface MarketingTeamDashboardProps {
  user: User;
}

function MarketingTeamDashboard({ user }: MarketingTeamDashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'analytics' | 'content' | 'settings'>('overview');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    activeCampaigns: 0,
    totalReach: 0,
    engagementRate: 0
  });
  const [users, setUsers] = useState<User[]>([]);
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, [activeTab]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'overview') {
        await loadOverviewStats();
      } else if (activeTab === 'analytics') {
        await loadAnalytics();
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadOverviewStats = async () => {
    try {
      // Load data for marketing insights
      const [usersRes, partnersRes] = await Promise.all([
        api.users.getAll().catch(() => ({ data: { users: [] } })),
        api.partners.getAll().catch(() => ({ data: { partners: [] } }))
      ]) as Array<{ data?: { users?: User[]; partners?: Partner[] } }>;

      const allUsers = (usersRes as any).data?.users || [];
      const allPartners = (partnersRes as any).data?.partners || [];

      // Calculate marketing metrics (placeholder calculations)
      const activeCampaigns = 3; // Placeholder
      const totalReach = allUsers.length + allPartners.length;
      const engagementRate = totalReach > 0 ? Math.round((allUsers.filter((u: User) => u.status === 'active').length / totalReach) * 100) : 0;

      setStats({
        activeCampaigns,
        totalReach,
        engagementRate
      });

      setUsers(allUsers);
      setPartners(allPartners);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadAnalytics = async () => {
    try {
      await loadOverviewStats();
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Marketing Dashboard</h1>
              <p className="text-sm text-pink-100 mt-1">Welcome, {user?.name || 'Marketing Team'}! 📢</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-pink-900 bg-white border border-white rounded-lg hover:bg-pink-50 transition-colors"
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
                { id: 'campaigns', label: 'Campaigns', icon: '🎯' },
                { id: 'analytics', label: 'Analytics', icon: '📈' },
                { id: 'content', label: 'Content', icon: '✍️' },
                { id: 'settings', label: 'Settings', icon: '⚙️' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-pink-600 text-pink-600'
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
            <>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading statistics...</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-pink-500">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeCampaigns}</p>
                        </div>
                        <div className="p-3 bg-pink-100 rounded-lg">
                          <span className="text-2xl">🎯</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Reach</p>
                          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalReach}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <span className="text-2xl">👁️</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.engagementRate}%</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                          <span className="text-2xl">❤️</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Growth Chart Placeholder */}
                  <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Chart visualization coming soon</p>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {activeTab === 'campaigns' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Marketing Campaigns</h3>
                <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                  Create Campaign
                </button>
              </div>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Social Media Campaign</h4>
                  <p className="text-sm text-gray-600 mb-4">Promoting Acha Delivery services across social platforms</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">Active</span>
                    <span className="text-gray-600">Reach: 1,234</span>
                    <span className="text-gray-600">Engagement: 89</span>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Email Newsletter</h4>
                  <p className="text-sm text-gray-600 mb-4">Monthly newsletter to all registered users</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">Active</span>
                    <span className="text-gray-600">Sent: 456</span>
                    <span className="text-gray-600">Open Rate: 23%</span>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Partner Recruitment Drive</h4>
                  <p className="text-sm text-gray-600 mb-4">Campaign to attract new delivery partners</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Planning</span>
                    <span className="text-gray-600">Target: 50 partners</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Marketing Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">User Demographics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Active Users</span>
                        <span className="font-medium">{users.filter(u => u.status === 'active').length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-pink-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Total Partners</span>
                        <span className="font-medium">{partners.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Campaign Performance</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Social Media</span>
                      <span className="text-sm font-medium">89% engagement</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Email Campaigns</span>
                      <span className="text-sm font-medium">23% open rate</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Website Traffic</span>
                      <span className="text-sm font-medium">+12% this month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Content Management</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Blog Posts</h4>
                  <p className="text-sm text-gray-600 mb-4">Manage blog content and articles</p>
                  <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm">
                    Create Post
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Social Media Content</h4>
                  <p className="text-sm text-gray-600 mb-4">Schedule and manage social media posts</p>
                  <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm">
                    Create Content
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Marketing Materials</h4>
                  <p className="text-sm text-gray-600 mb-4">Upload and manage marketing assets</p>
                  <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm">
                    Upload Materials
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Marketing Settings</h3>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Profile Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={user?.name || ''}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <input
                        type="text"
                        value={user?.department || ''}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MarketingTeamDashboard;
