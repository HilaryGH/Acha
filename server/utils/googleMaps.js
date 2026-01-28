/**
 * Google Maps API utility for distance calculation
 */

// Use node's built-in https module or axios if available
let httpClient;
try {
  httpClient = require('axios');
} catch (e) {
  // Fallback to node's https module
  const https = require('https');
  httpClient = {
    get: (url) => {
      return new Promise((resolve, reject) => {
        https.get(url, (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            try {
              resolve({ data: JSON.parse(data) });
            } catch (e) {
              reject(e);
            }
          });
        }).on('error', reject);
      });
    }
  };
}

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

/**
 * Calculate distance between two locations using Google Maps Distance Matrix API
 * @param {string} origin - Origin address/city
 * @param {string} destination - Destination address/city
 * @returns {Promise<{distance: number, duration: number, distanceText: string, durationText: string}>}
 */
async function calculateDistance(origin, destination) {
  if (!GOOGLE_MAPS_API_KEY) {
    console.warn('Google Maps API key not configured. Using fallback distance calculation.');
    // Fallback: estimate distance based on city names (very rough)
    return {
      distance: 0,
      duration: 0,
      distanceText: 'Distance calculation unavailable',
      durationText: 'Duration calculation unavailable',
      isEstimated: true
    };
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${GOOGLE_MAPS_API_KEY}&units=metric`;
    
    const response = await httpClient.get(url);
    const data = response.data;

    if (data.status === 'OK' && data.rows[0] && data.rows[0].elements[0]) {
      const element = data.rows[0].elements[0];
      
      if (element.status === 'OK') {
        return {
          distance: element.distance.value / 1000, // Convert meters to kilometers
          duration: element.duration.value / 60, // Convert seconds to minutes
          distanceText: element.distance.text,
          durationText: element.duration.text,
          isEstimated: false
        };
      }
    }

    // If API call failed, return estimated values
    return {
      distance: 0,
      duration: 0,
      distanceText: 'Distance calculation unavailable',
      durationText: 'Duration calculation unavailable',
      isEstimated: true
    };
  } catch (error) {
    console.error('Error calculating distance:', error);
    return {
      distance: 0,
      duration: 0,
      distanceText: 'Distance calculation unavailable',
      durationText: 'Duration calculation unavailable',
      isEstimated: true
    };
  }
}

/**
 * Check if two locations are in the same city (for local delivery)
 * @param {string} location1 - First location
 * @param {string} location2 - Second location
 * @returns {boolean}
 */
function isLocalDelivery(location1, location2) {
  // Simple check: if locations contain similar city names, consider it local
  const normalize = (str) => str.toLowerCase().trim().replace(/[^\w\s]/g, '');
  const loc1 = normalize(location1);
  const loc2 = normalize(location2);
  
  // Check if one contains the other or vice versa
  return loc1.includes(loc2) || loc2.includes(loc1) || loc1 === loc2;
}

module.exports = {
  calculateDistance,
  isLocalDelivery
};

