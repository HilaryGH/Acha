const API_BASE_URL = '/api';

// Upload file helper
const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_BASE_URL}/upload/single`, {
    method: 'POST',
    body: formData
  });
  
  const result = await response.json();
  if (result.status === 'success') {
    return result.file.path;
  } else {
    throw new Error(result.message || 'File upload failed');
  }
};

export const api = {
  // File upload
  upload: {
    single: uploadFile
  },
  // Travellers
  travellers: {
    getAll: () => fetch(`${API_BASE_URL}/travellers`).then(res => res.json()),
    getById: (id: string) => fetch(`${API_BASE_URL}/travellers/${id}`).then(res => res.json()),
    create: (data: any) => fetch(`${API_BASE_URL}/travellers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    update: (id: string, data: any) => fetch(`${API_BASE_URL}/travellers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    delete: (id: string) => fetch(`${API_BASE_URL}/travellers/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
  },

  // Buyers
  buyers: {
    getAll: () => fetch(`${API_BASE_URL}/buyers`).then(res => res.json()),
    getById: (id: string) => fetch(`${API_BASE_URL}/buyers/${id}`).then(res => res.json()),
    create: (data: any) => fetch(`${API_BASE_URL}/buyers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    update: (id: string, data: any) => fetch(`${API_BASE_URL}/buyers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    delete: (id: string) => fetch(`${API_BASE_URL}/buyers/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
  },

  // Senders
  senders: {
    getAll: () => fetch(`${API_BASE_URL}/senders`).then(res => res.json()),
    getById: (id: string) => fetch(`${API_BASE_URL}/senders/${id}`).then(res => res.json()),
    create: (data: any) => fetch(`${API_BASE_URL}/senders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    update: (id: string, data: any) => fetch(`${API_BASE_URL}/senders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    delete: (id: string) => fetch(`${API_BASE_URL}/senders/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
  },

  // Receivers
  receivers: {
    getAll: () => fetch(`${API_BASE_URL}/receivers`).then(res => res.json()),
    getById: (id: string) => fetch(`${API_BASE_URL}/receivers/${id}`).then(res => res.json()),
    create: (data: any) => fetch(`${API_BASE_URL}/receivers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    update: (id: string, data: any) => fetch(`${API_BASE_URL}/receivers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    delete: (id: string) => fetch(`${API_BASE_URL}/receivers/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
  }
};

