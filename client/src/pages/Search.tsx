import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      // TODO: Implement actual search functionality
      setLoading(true);
      // Simulate search
      setTimeout(() => {
        setResults([]);
        setLoading(false);
      }, 500);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Search Results
          {query && <span className="text-gray-600 text-xl">: "{query}"</span>}
        </h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        ) : query ? (
          results.length > 0 ? (
            <div className="space-y-4">
              {results.map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  {/* Search results will be displayed here */}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-gray-600 text-lg">
                No results found for "{query}". Try different keywords.
              </p>
            </div>
          )
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-600 text-lg">Enter a search query to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;

