import { useState } from 'react';

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SurveyModal({ isOpen, onClose }: SurveyModalProps) {
  const [surveyData, setSurveyData] = useState<any>({
    ageGroup: '',
    education: '',
    currentStatus: '',
    currentlyRide: '',
    ridingExperience: '',
    trafficExperience: '',
    validLicense: '',
    vehicleAccess: '',
    priorDeliveryWork: '',
    priorDeliveryDetails: '',
    usedApps: '',
    appExamples: '',
    customerFacing: '',
    customerFacingDetails: '',
    skillRatings: {},
    strongestSkills: '',
    skillsToImprove: '',
    personalGoals: ''
  });

  if (!isOpen) return null;

  const skillsToRate = [
    'Knowing Addis Ababa areas and shortcuts',
    'Basic vehicle care (e.g., checking tires, charging e-bike)',
    'Balancing/carrying loads/packages',
    'Time management in busy/traffic conditions',
    'Communication (Amharic / English / other languages)',
    'Using mobile money/apps for payments'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSurveyData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSkillRatingChange = (skill: string, value: string) => {
    setSurveyData((prev: any) => ({
      ...prev,
      skillRatings: { ...prev.skillRatings, [skill]: value }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit survey data to backend
    console.log('Survey Data:', surveyData);
    alert('Thank you for completing the Current Skills & Experience Questionnaire! Your responses will help us understand your background and design appropriate training.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Current Skills & Experience Questionnaire</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ✖ Close
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-600 mb-6">Help us understand your background and skills. Please answer all questions honestly.</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Basic Profile */}
            <div className="border-b pb-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">1. Basic Profile</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age group *</label>
                  <select
                    name="ageGroup"
                    value={surveyData.ageGroup}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="18-24">18–24</option>
                    <option value="25-34">25–34</option>
                    <option value="35+">35+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Highest education *</label>
                  <select
                    name="education"
                    value={surveyData.education}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="none">None</option>
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="tvet-college">TVET/College</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current status *</label>
                  <select
                    name="currentStatus"
                    value={surveyData.currentStatus}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="housework">Housework only</option>
                    <option value="informal-work">Other informal work</option>
                    <option value="gig-work">Gig work</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Riding & Vehicle Access */}
            <div className="border-b pb-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">2. Riding & Vehicle Access</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Do you currently ride? *</label>
                  <select
                    name="currentlyRide"
                    value={surveyData.currentlyRide}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="bicycle-daily">Bicycle (daily)</option>
                    <option value="bicycle-occasionally">Bicycle (occasionally)</option>
                    <option value="e-bike">E-bike</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="no">No</option>
                    <option value="sometimes">Sometimes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years of riding experience (any vehicle) *</label>
                  <select
                    name="ridingExperience"
                    value={surveyData.ridingExperience}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="none">None</option>
                    <option value="<1">Less than 1 year</option>
                    <option value="1-3">1–3 years</option>
                    <option value=">3">More than 3 years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience riding in Addis Ababa traffic/congestion? *</label>
                  <select
                    name="trafficExperience"
                    value={surveyData.trafficExperience}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="none">None</option>
                    <option value="limited">Limited</option>
                    <option value="regular">Regular</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valid license? (Motorcycle) *</label>
                  <select
                    name="validLicense"
                    value={surveyData.validLicense}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="not-needed">Not needed yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Own or access to vehicle? *</label>
                  <select
                    name="vehicleAccess"
                    value={surveyData.vehicleAccess}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="bicycle">Bicycle</option>
                    <option value="e-bike">E-bike</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Work & Tech Experience */}
            <div className="border-b pb-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">3. Work & Tech Experience</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Any prior delivery, courier, or transport work? *</label>
                  <select
                    name="priorDeliveryWork"
                    value={surveyData.priorDeliveryWork}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                {surveyData.priorDeliveryWork === 'yes' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">If yes: Type, vehicle, duration</label>
                    <textarea
                      name="priorDeliveryDetails"
                      value={surveyData.priorDeliveryDetails}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Please provide details about your prior delivery work..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Used delivery/ride apps or smartphones for work? *</label>
                  <select
                    name="usedApps"
                    value={surveyData.usedApps}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                {surveyData.usedApps === 'yes' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Examples:</label>
                    <input
                      type="text"
                      name="appExamples"
                      value={surveyData.appExamples}
                      onChange={handleChange}
                      placeholder="e.g., Uber, Bolt, local delivery apps..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer-facing experience (e.g., selling, hospitality)? *</label>
                  <select
                    name="customerFacing"
                    value={surveyData.customerFacing}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                {surveyData.customerFacing === 'yes' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Briefly:</label>
                    <textarea
                      name="customerFacingDetails"
                      value={surveyData.customerFacingDetails}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Please briefly describe your customer-facing experience..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Section 4: Rate Your Current Level */}
            <div className="border-b pb-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                4. Rate your current level (1 = No experience → 5 = Strong/expert)
              </h4>
              <div className="space-y-4">
                {skillsToRate.map((skill, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {skill}
                    </label>
                    <div className="flex gap-4 items-center">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <label key={rating} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name={`skill_${index}`}
                            value={rating.toString()}
                            checked={surveyData.skillRatings?.[skill] === rating.toString()}
                            onChange={() => handleSkillRatingChange(skill, rating.toString())}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">{rating}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Open-ended Questions */}
            <div className="pb-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">5. Open-ended Questions</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What are your strongest current skills/assets for this work?
                  </label>
                  <textarea
                    name="strongestSkills"
                    value={surveyData.strongestSkills}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Please describe your strongest skills and assets..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Which skills do you most want to improve first?
                  </label>
                  <textarea
                    name="skillsToImprove"
                    value={surveyData.skillsToImprove}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Please describe which skills you want to improve..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Any personal goals (e.g., income target, independence, family support) this job could help achieve?
                  </label>
                  <textarea
                    name="personalGoals"
                    value={surveyData.personalGoals}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Please share your personal goals..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-xs text-blue-800">
                We respect your privacy. Your responses help us understand your background and design appropriate training programs.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-5 rounded-lg text-sm text-white font-semibold transition-all duration-300 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #1E88E5 0%, #26C6DA 50%, #43A047 100%)' }}
            >
              Submit Questionnaire
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SurveyModal;
