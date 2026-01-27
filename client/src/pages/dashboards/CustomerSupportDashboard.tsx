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
}

interface Order {
  _id: string;
  uniqueId: string;
  status: string;
  orderInfo: {
    productName: string;
  };
  createdAt: string;
  updatedAt?: string;
}

interface CustomerSupportDashboardProps {
  user: User;
}

function CustomerSupportDashboard({ user }: CustomerSupportDashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'users' | 'messages' | 'settings'>('overview');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    openTickets: 0,
    pendingResponses: 0,
    resolvedToday: 0
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadDashboardData();
  }, [activeTab]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'overview') {
        await loadOverviewStats();
      } else if (activeTab === 'tickets') {
        await loadOrders();
      } else if (activeTab === 'users') {
        await loadUsers();
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadOverviewStats = async () => {
    try {
      const [ordersRes, usersRes] = await Promise.all([
        api.orders.getAll().catch(() => ({ data: { orders: [] } })),
        api.users.getAll().catch(() => ({ data: { users: [] } }))
      ]) as Array<{ data?: { orders?: Order[]; users?: User[] } }>;

      const allOrders = (ordersRes as any).data?.orders || [];
      const allUsers = (usersRes as any).data?.users || [];

      // Calculate support metrics
      const openTickets = allOrders.filter((o: Order) => 
        ['pending', 'matched', 'assigned'].includes(o.status)
      ).length;

      const pendingResponses = allOrders.filter((o: Order) => 
        o.status === 'pending'
      ).length;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const resolvedToday = allOrders.filter((o: Order) => {
        if (o.status === 'completed' || o.status === 'delivered') {
          const resolvedDate = new Date(o.updatedAt || o.createdAt);
          return resolvedDate >= today;
        }
        return false;
      }).length;

      setStats({
        openTickets,
        pendingResponses,
        resolvedToday
      });

      setOrders(allOrders);
      setUsers(allUsers);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadOrders = async () => {
    try {
      const response = await api.orders.getAll() as { data?: { orders?: Order[] } };
      setOrders(response.data?.orders || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await api.users.getAll() as { data?: { users?: User[] } };
      setUsers(response.data?.users || []);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleLogout = () => {
    logout(navigate);
  };

  const filteredOrders = orders.filter(o => 
    filterStatus === 'all' || o.status === filterStatus
  );

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
            <>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading statistics...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.openTickets}</p>
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
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingResponses}</p>
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
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.resolvedToday}</p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-lg">
                        <span className="text-2xl">✅</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'tickets' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Support Tickets</h3>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="matched">Matched</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_transit">In Transit</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading tickets...</p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No support tickets found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div 
                      key={order._id} 
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/order-tracking/${order._id}`)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">
                              Ticket #{order.uniqueId || order._id.slice(-8)}
                            </h4>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              order.status === 'completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p><span className="font-medium">Product:</span> {order.orderInfo?.productName || 'N/A'}</p>
                            <p className="mt-1"><span className="font-medium">Created:</span> {new Date(order.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/order-tracking/${order._id}`);
                          }}
                          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm ml-4"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">User Inquiries</h3>
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading users...</p>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No users found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.slice(0, 20).map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.phone || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              u.status === 'active' ? 'bg-green-100 text-green-800' :
                              u.status === 'suspended' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {u.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Messages</h3>
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-gray-600 mb-2">Message center coming soon</p>
                <p className="text-sm text-gray-500">Direct messaging with customers will be available here</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Support Settings</h3>
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
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Notification Preferences</h4>
                  <div className="mt-4 space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Email notifications for new tickets</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">SMS notifications for urgent issues</span>
                    </label>
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

export default CustomerSupportDashboard;
