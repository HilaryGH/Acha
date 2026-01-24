import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 py-1.5 md:px-3 md:py-2 text-gray-700 font-medium text-sm hover:text-green-600 transition-colors rounded-lg hover:bg-gray-50"
        aria-label="Change language"
      >
        <span className="uppercase">{i18n.language}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </button>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="py-1">
              <button
                onClick={() => changeLanguage('en')}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                  i18n.language === 'en' ? 'bg-gray-50 text-green-600 font-semibold' : 'text-gray-700'
                }`}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage('am')}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                  i18n.language === 'am' ? 'bg-gray-50 text-green-600 font-semibold' : 'text-gray-700'
                }`}
              >
                አማርኛ
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LanguageSwitcher;

