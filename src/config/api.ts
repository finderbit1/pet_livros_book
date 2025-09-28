// Configuração da API
export const API_CONFIG = {
  // URL base da API - altere aqui para produção
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  
  // URLs para diferentes ambientes
  ENDPOINTS: {
    PET_BOOKS: '/pet-books/',
    PET_IMAGES: '/pet-images/',
  },
  
  // Configurações de timeout
  TIMEOUT: 30000, // 30 segundos
  
  // Configurações de upload
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
};

// Função para obter a URL completa da API
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Função para obter a URL base sem /api
export const getBaseUrl = (): string => {
  return API_CONFIG.BASE_URL.replace('/api', '');
};
