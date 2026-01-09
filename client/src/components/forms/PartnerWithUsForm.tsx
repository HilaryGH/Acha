import { useState } from 'react';
import { api } from '../../services/api';
import FileUpload from '../FileUpload';

function PartnerWithUsForm() {
  const [formData, setFormData] = useState({
    type: '', // Investor, Strategic Partner, Sponsorship
    partner: '', // Delivery Partner, Domestic Suppliers, Tour & Travel
    investmentType: '',
    name: '',
    companyName: '',
    email: '',
    phone: '',
    whatsapp: '',
    idDocument: '',
    license: '',
    tradeRegistration: '',
    enquiries: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await api.partners.create(formData);
      
      if (response.status === 'success') {
        setMessage({ type: 'success', text: 'Partner application submitted successfully!' });
        setFormData({
          type: '',
          partner: '',
          investmentType: '',
          name: '',
          companyName: '',
          email: '',
          phone: '',
          whatsapp: '',
          idDocument: '',
          license: '',
          tradeRegistration: '',
          enquiries: ''
        });
      } else {
        setMessage({ type: 'error', text: response.message || 'Failed to submit partner application' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Invest / Partner With Us</h2>
        
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Selection */}
          <div className="border-b pb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Partner Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="radio"
                  name="type"
                  value="Investor"
                  checked={formData.type === 'Investor'}
                  onChange={handleChange}
                  className="mr-3"
                  required
                />
                <span className="text-gray-700 font-medium">Investor</span>
              </label>
              <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="radio"
                  name="type"
                  value="Strategic Partner"
                  checked={formData.type === 'Strategic Partner'}
                  onChange={handleChange}
                  className="mr-3"
                  required
                />
                <span className="text-gray-700 font-medium">Strategic Partner</span>
              </label>
              <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="radio"
                  name="type"
                  value="Sponsorship"
                  checked={formData.type === 'Sponsorship'}
                  onChange={handleChange}
                  className="mr-3"
                  required
                />
                <span className="text-gray-700 font-medium">Sponsorship</span>
              </label>
            </div>
          </div>

          {/* Partner and Investment Type */}
          <div className="border-b pb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Partner Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Partner *</label>
                <select
                  name="partner"
                  value={formData.partner}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">-- Select Partner --</option>
                  <option value="Delivery Partner">Delivery Partner</option>
                  <option value="Domestic Suppliers">Domestic Suppliers</option>
                  <option value="Tour & Travel">Tour & Travel</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Type *</label>
                <select
                  name="investmentType"
                  value={formData.investmentType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">-- Select Investment Type --</option>
                  <option value="Equity Investment">Equity Investment</option>
                  <option value="Debt Financing">Debt Financing</option>
                  <option value="Strategic Partnership">Strategic Partnership</option>
                  <option value="Joint Venture">Joint Venture</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="border-b pb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="border-b pb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Attachments</h3>
            <div className="space-y-4">
              <FileUpload
                label="ID / Passport / Driving Licence"
                value={formData.idDocument}
                onChange={(filePath) => setFormData(prev => ({ ...prev, idDocument: filePath }))}
              />
              <FileUpload
                label="License"
                value={formData.license}
                onChange={(filePath) => setFormData(prev => ({ ...prev, license: filePath }))}
              />
              <FileUpload
                label="Trade Registration"
                value={formData.tradeRegistration}
                onChange={(filePath) => setFormData(prev => ({ ...prev, tradeRegistration: filePath }))}
              />
            </div>
          </div>

          {/* Enquiries */}
          <div className="pb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Enquiries</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type your message...</label>
              <textarea
                name="enquiries"
                value={formData.enquiries}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Type your message..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PartnerWithUsForm;

