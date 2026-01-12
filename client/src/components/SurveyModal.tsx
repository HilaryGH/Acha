import { useState } from 'react';

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SurveyModal({ isOpen, onClose }: SurveyModalProps) {
  const [selectedSurvey, setSelectedSurvey] = useState('');
  const [surveyData, setSurveyData] = useState<any>({});

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSurveyData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSurveyData((prev: any) => {
      const current = prev[name] || [];
      if (checked) {
        return { ...prev, [name]: [...current, e.target.value] };
      } else {
        return { ...prev, [name]: current.filter((item: string) => item !== e.target.value) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Survey is currently inactive. Thank you for your interest!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Quick Survey</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ✖ Hide Survey
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Women's Initiative Surveys</h3>
          <p className="text-sm text-gray-600 mb-6">Help us tailor programs by sharing your experience.</p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Survey</label>
            <select
              value={selectedSurvey}
              onChange={(e) => setSelectedSurvey(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">-- Select Survey --</option>
              <option value="service-providers">Female Delivery Partners Capacity Building Survey</option>
              <option value="underprivileged">Underprivileged Women Training Needs Assessment</option>
            </select>
          </div>

          {selectedSurvey === 'service-providers' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800 font-medium">Survey is inactive.</p>
              </div>

              <div className="border-b pb-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Demographic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Provider Type</label>
                    <input
                      type="text"
                      name="providerType"
                      value={surveyData.providerType || ''}
                      onChange={handleChange}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location (city/state/region)</label>
                    <input
                      type="text"
                      name="location"
                      value={surveyData.location || ''}
                      onChange={handleChange}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years in Operation</label>
                    <select
                      name="yearsInOperation"
                      value={surveyData.yearsInOperation || ''}
                      onChange={handleChange}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    >
                      <option value="">Select</option>
                      <option value="0-1">0-1 years</option>
                      <option value="2-5">2-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Employees</label>
                    <select
                      name="numberOfEmployees"
                      value={surveyData.numberOfEmployees || ''}
                      onChange={handleChange}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    >
                      <option value="">Select</option>
                      <option value="1-5">1-5</option>
                      <option value="6-10">6-10</option>
                      <option value="11-20">11-20</option>
                      <option value="20+">20+</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-b pb-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Current Business Model</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description of Services Offered</label>
                    <textarea
                      name="servicesDescription"
                      value={surveyData.servicesDescription || ''}
                      onChange={handleChange}
                      rows={3}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Revenue Streams</label>
                    <textarea
                      name="revenueStreams"
                      value={surveyData.revenueStreams || ''}
                      onChange={handleChange}
                      rows={3}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Market</label>
                    <textarea
                      name="targetMarket"
                      value={surveyData.targetMarket || ''}
                      onChange={handleChange}
                      rows={3}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              <div className="border-b pb-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Business Model Innovation</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interest in New Business Models</label>
                    <select
                      name="interestInNewModels"
                      value={surveyData.interestInNewModels || ''}
                      onChange={handleChange}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    >
                      <option value="">Select</option>
                      <option value="very-interested">Very Interested</option>
                      <option value="somewhat-interested">Somewhat Interested</option>
                      <option value="not-interested">Not Interested</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Areas for Innovation</label>
                    <textarea
                      name="areasForInnovation"
                      value={surveyData.areasForInnovation || ''}
                      onChange={handleChange}
                      rows={3}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Barriers to Innovation</label>
                    <textarea
                      name="barriersToInnovation"
                      value={surveyData.barriersToInnovation || ''}
                      onChange={handleChange}
                      rows={3}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              <div className="border-b pb-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Expansion Strategies</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Expansion Plans</label>
                    <select
                      name="expansionPlans"
                      value={surveyData.expansionPlans || ''}
                      onChange={handleChange}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="considering">Considering</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Desired Areas for Expansion</label>
                    <textarea
                      name="desiredExpansion"
                      value={surveyData.desiredExpansion || ''}
                      onChange={handleChange}
                      rows={3}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Challenges to Expansion</label>
                    <textarea
                      name="expansionChallenges"
                      value={surveyData.expansionChallenges || ''}
                      onChange={handleChange}
                      rows={3}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              <div className="border-b pb-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Digital Literacy Needs</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Digital Tools Used</label>
                    <textarea
                      name="digitalTools"
                      value={surveyData.digitalTools || ''}
                      onChange={handleChange}
                      rows={3}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Training Needs in Digital Literacy</label>
                    <textarea
                      name="digitalTrainingNeeds"
                      value={surveyData.digitalTrainingNeeds || ''}
                      onChange={handleChange}
                      rows={3}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Training Formats</label>
                    <textarea
                      name="trainingFormats"
                      value={surveyData.trainingFormats || ''}
                      onChange={handleChange}
                      rows={3}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              <div className="pb-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Feedback and Suggestions</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Supports Needed</label>
                    <textarea
                      name="additionalSupports"
                      value={surveyData.additionalSupports || ''}
                      onChange={handleChange}
                      rows={3}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Challenges Not Addressed</label>
                    <textarea
                      name="unaddressedChallenges"
                      value={surveyData.unaddressedChallenges || ''}
                      onChange={handleChange}
                      rows={3}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Suggestions for Training Topics</label>
                    <textarea
                      name="trainingTopicSuggestions"
                      value={surveyData.trainingTopicSuggestions || ''}
                      onChange={handleChange}
                      rows={3}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-xs text-blue-800">We respect your privacy. Responses help us build impactful programs.</p>
              </div>

              <button
                type="submit"
                disabled
                className="w-full py-2.5 px-5 rounded-lg text-sm text-white font-semibold bg-gray-400 cursor-not-allowed"
              >
                Submit Survey
              </button>
            </form>
          )}

          {selectedSurvey === 'underprivileged' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800 font-medium">Survey is inactive.</p>
              </div>

              <div className="border-b pb-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Demographic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={surveyData.name || ''}
                      onChange={handleChange}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={surveyData.phone || ''}
                      onChange={handleChange}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      value={surveyData.email || ''}
                      onChange={handleChange}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={surveyData.age || ''}
                      onChange={handleChange}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
                    <select
                      name="maritalStatus"
                      value={surveyData.maritalStatus || ''}
                      onChange={handleChange}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    >
                      <option value="">Select</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Educational Background</label>
                    <select
                      name="education"
                      value={surveyData.education || ''}
                      onChange={handleChange}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    >
                      <option value="">Select</option>
                      <option value="no-formal">No Formal Education</option>
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                      <option value="high-school">High School</option>
                      <option value="college">College/University</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      value={surveyData.occupation || ''}
                      onChange={handleChange}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              <div className="border-b pb-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Skills and Experience</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Areas Currently Involved In</label>
                    <div className="space-y-2">
                      {['Infant Care', 'Food Preparation', 'Nutrition and Dietary Services', 'Spa and Beauty Services', 'Fashion and Design'].map((area) => (
                        <label key={area} className="flex items-center">
                          <input
                            type="checkbox"
                            name="areasInvolved"
                            value={area}
                            checked={(surveyData.areasInvolved || []).includes(area)}
                            onChange={handleCheckboxChange}
                            disabled
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                    <input
                      type="text"
                      name="yearsOfExperience"
                      value={surveyData.yearsOfExperience || ''}
                      onChange={handleChange}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specific Skills Possessed</label>
                    <textarea
                      name="specificSkills"
                      value={surveyData.specificSkills || ''}
                      onChange={handleChange}
                      rows={3}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              <div className="border-b pb-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Training Needs</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skills Needing Improvement</label>
                    <div className="space-y-2">
                      {['Infant Care Techniques', 'Healthy Cooking Practices', 'Nutritional Knowledge', 'Spa Treatments', 'Beauty Techniques', 'Fashion Design Skills'].map((skill) => (
                        <label key={skill} className="flex items-center">
                          <input
                            type="checkbox"
                            name="skillsNeedingImprovement"
                            value={skill}
                            checked={(surveyData.skillsNeedingImprovement || []).includes(skill)}
                            onChange={handleCheckboxChange}
                            disabled
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">{skill}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Training Format</label>
                    <select
                      name="preferredFormat"
                      value={surveyData.preferredFormat || ''}
                      onChange={handleChange}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    >
                      <option value="">Select</option>
                      <option value="in-person">In-Person</option>
                      <option value="online">Online</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="workshop">Workshop</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Duration</label>
                    <select
                      name="preferredDuration"
                      value={surveyData.preferredDuration || ''}
                      onChange={handleChange}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    >
                      <option value="">Select</option>
                      <option value="1-day">1 Day</option>
                      <option value="1-week">1 Week</option>
                      <option value="2-weeks">2 Weeks</option>
                      <option value="1-month">1 Month</option>
                      <option value="3-months">3 Months</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-b pb-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Barriers and Challenges</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Challenges in Accessing Training</label>
                    <div className="space-y-2">
                      {['Lack of financial resources', 'Transportation issues', 'Time constraints (work/family)', 'Lack of information about available programs'].map((challenge) => (
                        <label key={challenge} className="flex items-center">
                          <input
                            type="checkbox"
                            name="challenges"
                            value={challenge}
                            checked={(surveyData.challenges || []).includes(challenge)}
                            onChange={handleCheckboxChange}
                            disabled
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">{challenge}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Other Challenges</label>
                    <textarea
                      name="otherChallenges"
                      value={surveyData.otherChallenges || ''}
                      onChange={handleChange}
                      rows={3}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments or Suggestions</label>
                    <textarea
                      name="additionalComments"
                      value={surveyData.additionalComments || ''}
                      onChange={handleChange}
                      rows={3}
                      disabled
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-xs text-blue-800">We respect your privacy. Responses help us build impactful programs.</p>
              </div>

              <button
                type="submit"
                disabled
                className="w-full py-2.5 px-5 rounded-lg text-sm text-white font-semibold bg-gray-400 cursor-not-allowed"
              >
                Submit Survey
              </button>
            </form>
          )}

          {!selectedSurvey && (
            <div className="text-center py-8 text-gray-500">
              <p>Please select a survey to begin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SurveyModal;




