const API_BASE_URL = '/api';

// Upload API
const upload = {
  single: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload/single`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || data.status !== 'success') {
      throw new Error(data.message || 'File upload failed');
    }

    return data.file.path;
  },
};

// Buyers API
const buyers = {
  create: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/buyers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to create buyer');
    }

    return result;
  },
};

// Senders API
const senders = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/senders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch senders');
    }

    return result;
  },
  create: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/senders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to create sender');
    }

    return result;
  },
};

// Receivers API
const receivers = {
  create: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/receivers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to create receiver');
    }

    return result;
  },
};

// Travellers API
const travellers = {
  getAll: async (params?: { destinationCity?: string; currentLocation?: string; travellerType?: string; status?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.destinationCity) queryParams.append('destinationCity', params.destinationCity);
    if (params?.currentLocation) queryParams.append('currentLocation', params.currentLocation);
    if (params?.travellerType) queryParams.append('travellerType', params.travellerType);
    if (params?.status) queryParams.append('status', params.status);
    
    const url = `${API_BASE_URL}/travellers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch travellers');
    }

    return result;
  },
  create: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/travellers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to create traveller');
    }

    return result;
  },
};

// Partners API
const partners = {
  create: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/partners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to create partner');
    }

    return result;
  },
};

// Women Initiatives API
const womenInitiatives = {
  create: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/women-initiatives`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit application');
    }

    return result;
  },
};

// Premium API
const premium = {
  create: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/premium`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit premium application');
    }

    return result;
  },
};

// Users API
const users = {
  register: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      // Extract error message from response
      const errorMessage = result.message || result.error || 'Failed to register user';
      console.error('Registration error:', errorMessage, result);
      throw new Error(errorMessage);
    }

    return result;
  },
  login: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to login');
    }

    return result;
  },
  getMe: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to get user profile');
    }

    return result;
  },
};

// Export the API object
export const api = {
  upload,
  buyers,
  senders,
  receivers,
  travellers,
  partners,
  womenInitiatives,
  premium,
  users,
};
