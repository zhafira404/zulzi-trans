import api from './api'; 

export const getPublicReviews = () => {
  return api.get('/reviews/public'); 
};