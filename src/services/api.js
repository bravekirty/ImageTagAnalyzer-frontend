import axios from 'axios';

// Use absolute URL to your backend
const API_BASE_URL = 'https://imagetaganalyzer-backend-production.up.railway.app';

console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
});

// Add detailed request logging
api.interceptors.request.use(
    (config) => {
        console.log('🚀 Making API request to:', config.method?.toUpperCase(), config.url);
        console.log('📝 Full URL:', config.baseURL + config.url);
        return config;
    },
    (error) => {
        console.error('❌ Request error:', error);
        return Promise.reject(error);
    }
);

// Add response logging
api.interceptors.response.use(
    (response) => {
        console.log('✅ API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('❌ API Error:', error.response?.status, error.config?.url);
        console.error('Error details:', error.response?.data);
        return Promise.reject(error);
    }
);

export const uploadImage = (formData) => {
    return api.post('/image/upload/', formData, {
        params: {
            confidence_threshold: 30.0,
            language: 'en'
        },
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
};

export const getAnalytics = () => {
    return api.get('/analytics/top-tags/', {
        params: {
            limit: 5,
            min_confidence: 30.0
        }
    });
};

export const getImageStats = () => {
    return api.get('/analytics/stats/');
};

export const analyzeSampleImage = (sampleId, confidenceThreshold = 30.0) => {
    return api.post(`/sample-images/${sampleId}/analyze`, null, {
        params: { confidence_threshold: confidenceThreshold }
    });
};

export const getSampleImages = () => {
    console.log('📸 Getting sample images...');
    return api.get('/sample-images/');
};

export default api;