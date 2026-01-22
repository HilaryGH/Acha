const API_BASE_URL = '/api';

// Helper function to get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// Helper function to make API requests
const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Upload API
const upload = {
  single: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const token = getAuthToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/upload/single`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Upload failed' }));
      throw new Error(error.message || `Upload failed! status: ${response.status}`);
    }

    const data = await response.json();
    return data.file?.path || data.filePath || '';
  },
};

// Users API
const users = {
  register: async (data: any) => {
    return request('/users/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  login: async (data: any) => {
    return request('/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  getMe: async () => {
    return request('/users/me');
  },
};

// Buyers API
const buyers = {
  getAll: async () => {
    return request('/buyers');
  },
  getById: async (id: string) => {
    return request(`/buyers/${id}`);
  },
  create: async (data: any) => {
    return request('/buyers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: string, data: any) => {
    return request(`/buyers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (id: string) => {
    return request(`/buyers/${id}`, {
      method: 'DELETE',
    });
  },
};

// Travellers API
const travellers = {
  getAll: async () => {
    return request('/travellers');
  },
  getById: async (id: string) => {
    return request(`/travellers/${id}`);
  },
  create: async (data: any) => {
    return request('/travellers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: string, data: any) => {
    return request(`/travellers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (id: string) => {
    return request(`/travellers/${id}`, {
      method: 'DELETE',
    });
  },
};

// Senders API
const senders = {
  getAll: async () => {
    return request('/senders');
  },
  getById: async (id: string) => {
    return request(`/senders/${id}`);
  },
  create: async (data: any) => {
    return request('/senders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: string, data: any) => {
    return request(`/senders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (id: string) => {
    return request(`/senders/${id}`, {
      method: 'DELETE',
    });
  },
};

// Receivers API
const receivers = {
  getAll: async () => {
    return request('/receivers');
  },
  getById: async (id: string) => {
    return request(`/receivers/${id}`);
  },
  create: async (data: any) => {
    return request('/receivers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: string, data: any) => {
    return request(`/receivers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (id: string) => {
    return request(`/receivers/${id}`, {
      method: 'DELETE',
    });
  },
};

// Premium API
const premium = {
  getAll: async () => {
    return request('/premium');
  },
  getById: async (id: string) => {
    return request(`/premium/${id}`);
  },
  create: async (data: any) => {
    return request('/premium', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: string, data: any) => {
    return request(`/premium/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Partners API
const partners = {
  getAll: async () => {
    return request('/partners');
  },
  getById: async (id: string) => {
    return request(`/partners/${id}`);
  },
  create: async (data: any) => {
    return request('/partners', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: string, data: any) => {
    return request(`/partners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (id: string) => {
    return request(`/partners/${id}`, {
      method: 'DELETE',
    });
  },
};

// Women Initiatives API
const womenInitiatives = {
  getAll: async () => {
    return request('/women-initiatives');
  },
  getById: async (id: string) => {
    return request(`/women-initiatives/${id}`);
  },
  create: async (data: any) => {
    return request('/women-initiatives', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: string, data: any) => {
    return request(`/women-initiatives/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (id: string) => {
    return request(`/women-initiatives/${id}`, {
      method: 'DELETE',
    });
  },
};

// Export the API object
export const api = {
  upload,
  users,
  buyers,
  travellers,
  senders,
  receivers,
  premium,
  partners,
  womenInitiatives,
};
