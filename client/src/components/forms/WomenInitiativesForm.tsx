import { useState } from 'react';
import { api } from '../../services/api';
import FileUpload from '../FileUpload';
import SurveyModal from '../SurveyModal';

function WomenInitiativesForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    email: '',
    phone: '',
    whatsapp: '',
    telegram: '',
    location: '',
    city: '',
    idDocument: '',
    profilePhoto: '',
    certificates: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await api.womenInitiatives.create(formData);
      
      if (response.status === 'success') {
        setMessage({ type: 'success', text: 'Application submitted successfully!' });
        setFormData({
          fullName: '',
          age: '',
          email: '',
          phone: '',
          whatsapp: '',
          telegram: '',
          location: '',
          city: '',
          idDocument: '',
          profilePhoto: '',
          certificates: ''
        });
      } else {
        setMessage({ type: 'error', text: response.message || 'Failed to submit application' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/acha.png" 
            alt="Acha Logo" 
            className="h-12 md:h-16 object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold mb-5 text-gray-900">👩 Women Initiatives</h2>
        <p className="text-sm text-gray-600 mb-5">Join Women Initiatives - Empower yourself and join our community of amazing women</p>
        
        {message && (
          <div className={`mb-5 p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Basic Information */}
          <div className="border-b pb-5">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Age *</label>
                <input
                  type="number"
                  name="age"
                  required
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  min="18"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">WhatsApp (Optional)</label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="Enter your whatsapp (optional)"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Telegram (Optional)</label>
                <input
                  type="text"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleChange}
                  placeholder="Enter your telegram (optional)"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="border-b pb-5">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Location Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your location"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="border-b pb-5">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Attachments</h3>
            <div className="space-y-3">
              <div>
                <FileUpload
                  label="ID / Driving Licence / Passport"
                  value={formData.idDocument}
                  onChange={(filePath) => setFormData(prev => ({ ...prev, idDocument: filePath }))}
                />
                <p className="text-xs text-gray-500 mt-1">Max: 5MB</p>
              </div>
              <div>
                <FileUpload
                  label="Profile Photo"
                  value={formData.profilePhoto}
                  onChange={(filePath) => setFormData(prev => ({ ...prev, profilePhoto: filePath }))}
                />
                <p className="text-xs text-gray-500 mt-1">Max: 5MB</p>
              </div>
              <div>
                <FileUpload
                  label="Certificates (Optional)"
                  value={formData.certificates}
                  onChange={(filePath) => setFormData(prev => ({ ...prev, certificates: filePath }))}
                />
                <p className="text-xs text-gray-500 mt-1">Max: 5MB</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-5 rounded-lg text-sm text-white font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>

        {/* Survey Section */}
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-700 mb-3">Want to transform your business? Take our survey!</p>
          <button
            type="button"
            onClick={() => setIsSurveyOpen(true)}
            className="w-full py-2.5 px-5 rounded-lg text-sm text-white font-semibold transition-all duration-300 hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}
          >
            📋 Take Survey
          </button>
        </div>
      </div>

      <SurveyModal isOpen={isSurveyOpen} onClose={() => setIsSurveyOpen(false)} />
    </div>
  );
}

export default WomenInitiativesForm;

