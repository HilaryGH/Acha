import { useState } from 'react';
import { api } from '../../services/api';
import FileUpload from '../FileUpload';
import DeliveryFeeDisplay from '../DeliveryFeeDisplay';

function PremiumForm() {
  const [formData, setFormData] = useState({
    category: '', // Delivery Partners or Corporate Clients
    deliveryPartnerType: '', // Cycle Riders, E Bike Riders, Motorcycle Riders
    subscriptionType: '', // Monthly or Annual
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    companyName: '', // For Corporate Clients
    location: '',
    city: '',
    idDocument: '',
    license: '',
    tradeRegistration: '' // For Corporate Clients
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Pricing information
  const pricing = {
    'cycle-riders': { monthly: 200, annual: 1500 },
    'e-bike-riders': { monthly: 300, annual: 2500 },
    'motorcycle-riders': { monthly: 400, annual: 3000 },
    'corporate-clients': { monthly: 2000, annual: 10000 }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getPrice = () => {
    if (!formData.subscriptionType) return null;
    
    if (formData.category === 'corporate-clients') {
      return pricing['corporate-clients'][formData.subscriptionType as 'monthly' | 'annual'];
    } else if (formData.deliveryPartnerType) {
      const key = formData.deliveryPartnerType as keyof typeof pricing;
      return pricing[key]?.[formData.subscriptionType as 'monthly' | 'annual'];
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await api.premium.create(formData);
      
      if (response.status === 'success') {
        setMessage({ type: 'success', text: 'Premium subscription application submitted successfully!' });
        setFormData({
          category: '',
          deliveryPartnerType: '',
          subscriptionType: '',
          name: '',
          email: '',
          phone: '',
          whatsapp: '',
          companyName: '',
          location: '',
          city: '',
          idDocument: '',
          license: '',
          tradeRegistration: ''
        });
      }
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to submit application. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <img src="/acha.png" alt="Acha Logo" className="h-12 md:h-16 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-5 text-gray-900">⭐ Acha Premium Community</h2>
        
        {message && (
          <div className={`mb-5 p-3 rounded-lg text-sm ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Selection */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Category --</option>
              <option value="delivery-partners">Delivery Partners (Cycle, E-bike & Motorcycle Riders)</option>
              <option value="corporate-clients">Corporate Clients</option>
            </select>
          </div>

          {/* Delivery Partner Type (only if Delivery Partners selected) */}
          {formData.category === 'delivery-partners' && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Delivery Partner Type *
                </label>
                <select
                  name="deliveryPartnerType"
                  value={formData.deliveryPartnerType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Select Type --</option>
                  <option value="cycle-riders">Cycle Riders</option>
                  <option value="e-bike-riders">E Bike Riders</option>
                  <option value="motorcycle-riders">Motorcycle Riders</option>
                </select>
              </div>
              
              {/* Delivery Fee Display */}
              {formData.deliveryPartnerType && (
                <DeliveryFeeDisplay 
                  mechanism={formData.deliveryPartnerType.replace('-riders', '-rider') as any} 
                  className="mt-2"
                />
              )}
            </>
          )}

          {/* Subscription Type */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Subscription Type *
            </label>
            <select
              name="subscriptionType"
              value={formData.subscriptionType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Subscription --</option>
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
            </select>
          </div>

          {/* Price Display */}
          {getPrice() && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-semibold text-blue-900">
                Subscription Fee: {getPrice()} birr ({formData.subscriptionType === 'monthly' ? 'Monthly' : 'Annual'})
              </p>
            </div>
          )}

          {/* Company Name (for Corporate Clients) */}
          {formData.category === 'corporate-clients' && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company name"
              />
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              WhatsApp (Optional)
            </label>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your WhatsApp number"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your location"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your city"
            />
          </div>

          {/* ID Document */}
          <FileUpload
            label="ID / Driving Licence / Passport"
            value={formData.idDocument}
            onChange={(value) => setFormData(prev => ({ ...prev, idDocument: value }))}
          />

          {/* License */}
          <FileUpload
            label="License"
            value={formData.license}
            onChange={(value) => setFormData(prev => ({ ...prev, license: value }))}
          />

          {/* Trade Registration (for Corporate Clients) */}
          {formData.category === 'corporate-clients' && (
            <FileUpload
              label="Trade Registration"
              value={formData.tradeRegistration}
              onChange={(value) => setFormData(prev => ({ ...prev, tradeRegistration: value }))}
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-5 rounded-lg text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PremiumForm;

