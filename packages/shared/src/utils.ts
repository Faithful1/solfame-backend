// API utilities for frontend-backend communication
const DEFAULT_API_BASE = 'http://localhost:3000/api';
const DEFAULT_AUDIO_SERVICE_BASE = 'http://localhost:8000';

export class ApiClient {
  private baseUrl: string;
  private audioServiceUrl: string;

  constructor(
    baseUrl: string = DEFAULT_API_BASE,
    audioServiceUrl: string = DEFAULT_AUDIO_SERVICE_BASE
  ) {
    this.baseUrl = baseUrl;
    this.audioServiceUrl = audioServiceUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  }

  async audioService<T>(endpoint: string, data?: any): Promise<T> {
    const url = `${this.audioServiceUrl}${endpoint}`;
    const options: RequestInit = {
      method: data ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  }
}

// Validation utilities
export const validateYouTubeUrl = (url: string): boolean => {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]+/;
  return youtubeRegex.test(url);
};

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const getJobStatusColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'text-yellow-600 bg-yellow-50';
    case 'processing':
      return 'text-blue-600 bg-blue-50';
    case 'completed':
      return 'text-green-600 bg-green-50';
    case 'failed':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};
