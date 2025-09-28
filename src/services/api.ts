import { API_CONFIG, getApiUrl, getBaseUrl } from '@/config/api';

// Tipos da API
export interface PetBookData {
  title: string;
  description?: string;
  pet_name: string;
  pet_species: string;
  pet_breed?: string;
  pet_age?: number;
  pet_gender?: 'male' | 'female';
  owner_name: string;
  owner_email: string;
}

export interface PetBookResponse {
  id: number;
  title: string;
  slug: string;
  description: string;
  pet_name: string;
  pet_species: string;
  pet_breed: string;
  pet_age: number;
  pet_gender: string;
  owner_name: string;
  owner_email: string;
  status: 'draft' | 'processing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
  completed_at?: string;
  site_url: string;
  download_url: string;
  images: PetImageResponse[];
}

export interface PetImageResponse {
  id: number;
  image: string;
  caption: string;
  order: number;
  uploaded_at: string;
}

export interface GeneratedSiteResponse {
  id: number;
  html_file: string;
  css_file: string;
  zip_file?: string;
  generation_log: string;
  file_size?: number;
  created_at: string;
}

// Função para fazer requisições HTTP
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = getApiUrl(endpoint);
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// Função para upload de arquivos
async function uploadFiles<T>(
  endpoint: string,
  formData: FormData
): Promise<T> {
  const url = getApiUrl(endpoint);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Upload Error:', error);
    throw error;
  }
}

// Serviços da API
export const apiService = {
  // Criar um novo livro de pet
  async createPetBook(data: PetBookData): Promise<PetBookResponse> {
    return apiRequest<PetBookResponse>('/pet-books/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Upload de imagens para um livro
  async uploadImages(petBookId: number, images: File[]): Promise<{ message: string; images: PetImageResponse[] }> {
    const formData = new FormData();
    images.forEach(image => {
      formData.append('images', image);
    });

    return uploadFiles(`/pet-books/${petBookId}/upload_images/`, formData);
  },

  // Gerar site estático
  async generateSite(petBookId: number): Promise<{ message: string; pet_book: PetBookResponse }> {
    return apiRequest(`/pet-books/${petBookId}/generate_site/`, {
      method: 'POST',
    });
  },

  // Obter detalhes de um livro
  async getPetBook(petBookId: number): Promise<PetBookResponse> {
    return apiRequest<PetBookResponse>(`/pet-books/${petBookId}/`);
  },

  // Listar todos os livros
  async listPetBooks(): Promise<{ results: PetBookResponse[] }> {
    return apiRequest<{ results: PetBookResponse[] }>('/pet-books/');
  },

  // Download do site gerado
  async downloadSite(petBookId: number): Promise<Blob> {
    const url = getApiUrl(`/pet-books/${petBookId}/download_site/`);
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Download Error:', error);
      throw error;
    }
  },

  // Preview do site gerado
  async previewSite(petBookId: number): Promise<string> {
    const url = getApiUrl(`/pet-books/${petBookId}/preview_site/`);
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.text();
    } catch (error) {
      console.error('Preview Error:', error);
      throw error;
    }
  },

  // Obter URL do site gerado
  getSiteUrl(petBookId: number): string {
    return `${getBaseUrl()}/media/generated_sites/${petBookId}/index.html`;
  },

  // Obter URL de download
  getDownloadUrl(petBookId: number): string {
    return `${getBaseUrl()}/media/generated_sites/${petBookId}/${petBookId}.zip`;
  }
};

// Função utilitária para converter dados do frontend para a API
export function convertToApiData(bookData: any, customerData: any): PetBookData {
  return {
    title: bookData.title || `As Aventuras de ${bookData.petData.name}`,
    description: bookData.petData.specialMoments || '',
    pet_name: bookData.petData.name,
    pet_species: bookData.petData.species,
    pet_breed: bookData.petData.breed || '',
    pet_age: bookData.petData.birthday ? 
      new Date().getFullYear() - new Date(bookData.petData.birthday).getFullYear() : 
      undefined,
    pet_gender: bookData.petData.gender || undefined,
    owner_name: customerData.name,
    owner_email: customerData.email,
  };
}
