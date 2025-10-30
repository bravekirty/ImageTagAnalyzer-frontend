import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const uploadImage = (formData) => {
    return api.post('/image/upload/', formData, {  // Fixed endpoint path
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
    return api.get('/sample-images/');
};

// Add error handling interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        throw error;
    }
);

export default api;