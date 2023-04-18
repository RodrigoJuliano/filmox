export const API_KEY = 'api_key=cd0ff970215f6575ac47e1a07dc0fee6';
export const BASE_URL = 'https://api.themoviedb.org/3';

export const getUrlDiscover = (page: number) =>
  `${BASE_URL}/discover/movie?page=${page}&${API_KEY}`;
export const getUrlDetails = (id: number) =>
  `${BASE_URL}/movie/${id}?${API_KEY}`;
