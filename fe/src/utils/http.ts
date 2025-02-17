import axios, { AxiosError, type AxiosInstance } from 'axios';
import { AuthResponse } from '../types/auth.type';
import { clearTokenFromLS, getTokenFromLS, saveTokenToLS } from './auth';

class Http {
  instance: AxiosInstance;
  private token: string;

  constructor() {
    console.log(123123);

    this.token = getTokenFromLS();
    this.instance = axios.create({
      baseURL: 'http://localhost:5000',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers['Authorization'] = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === '/api/auth/register' || url === '/api/auth/login') {
          this.token = (response.data as AuthResponse).data.token;
          saveTokenToLS(this.token);
        } else if (url == '/api/auth/logout') {
          this.token = '';
          clearTokenFromLS();
        }
        return response;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
