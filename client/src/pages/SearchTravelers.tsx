import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../services/api';

interface Traveller {
  _id: string;
  uniqueId: string;
  name: string;
  email: string;
  phone: string;
  currentLocation: string;
  destinationCity: string;
  departureDate: string;
  arrivalDate: string;
  departureTime: string;
  arrivalTime: string;
  travellerType: 'international' | 'domestic';
  status: string;
}

function SearchTravelers() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [travelers, setTravelers] = useState<Traveller[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState(query);
  const [searchType, setSearchType] = useState<'destination' | 'location' | 'both'>('both');

  useEffect(() => {
    if (query) {
      setSearchInput(query);
      // Use a small delay to ensure state is updated
      const timer = setTimeout(() => {
        searchTravelers(query);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setTravelers([]);
    }
  }, [query, searchType]);

  const searchTravelers = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setTravelers([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Build search parameters based on search type
      const params: any = {
        status: 'active'
      };

      // Set search parameters based on search type
      if (searchType === 'destination') {
        // Only search by destination
        params.destinationCity = searchQuery;
      } else if (searchType === 'location') {
        // Only search by current location
        params.currentLocation = searchQuery;
      } else {
        // Search both - send both parameters, backend will use OR
        params.destinationCity = searchQuery;
        params.currentLocation = searchQuery;
      }

      console.log('Searching with params:', params);
      const response = await api.travellers.search(params) as { status?: string; data?: Traveller[]; count?: number; travellers?: Traveller[] };
      
      console.log('Search response:', response);
      
      if (response.status === 'success') {
        // Handle both possible response formats
        const travellers = response.data || response.travellers || [];
        setTravelers(travellers);
        console.log('Found travelers:', travellers.length);
      } else {
        setError('Failed to search travelers');
        setTravelers([]);
      }
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'An error occurred while searching');
      setTravelers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set('q', searchInput.trim());
      window.location.href = `/search?${newSearchParams.toString()}`;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Search Travelers</h1>
          <p className="text-lg text-gray-600">Find travelers by destination or location</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Enter destination city or departure location..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value as 'destination' | 'location' | 'both')}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="both">Destination & Location</option>
                  <option value="destination">Destination Only</option>
                  <option value="location">Location Only</option>
                </select>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching travelers...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {query && (
              <div className="mb-6">
                <p className="text-gray-600">
                  {travelers.length > 0 
                    ? `Found ${travelers.length} traveler${travelers.length !== 1 ? 's' : ''} for "${query}"`
                    : `No travelers found for "${query}"`
                  }
                </p>
              </div>
            )}

            {travelers.length === 0 && !query && (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-gray-600 text-lg">Enter a search query to find travelers</p>
              </div>
            )}

            {travelers.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {travelers.map((traveler) => (
                  <div
                    key={traveler._id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{traveler.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {traveler.travellerType === 'international' ? '🌍 International' : '🚗 Domestic'} Traveler
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {traveler.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-700">From</p>
                          <p className="text-sm text-gray-900">{traveler.currentLocation}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-700">To</p>
                          <p className="text-sm text-gray-900">{traveler.destinationCity}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Departure</p>
                          <p className="text-sm text-gray-900">
                            {formatDate(traveler.departureDate)} at {traveler.departureTime || 'N/A'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Arrival</p>
                          <p className="text-sm text-gray-900">
                            {formatDate(traveler.arrivalDate)} at {traveler.arrivalTime || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Contact</p>
                          <p className="text-sm text-gray-900">{traveler.phone}</p>
                        </div>
                        <Link
                          to={`/post-order`}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
                        >
                          Post Order
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchTravelers;

