import axios from 'axios';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { env } from 'process';

const instance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 1000 * 60 * 60 * 12,
  headers: {
    "Content-Type" : "application/json"
  },
});

interface CustomSession extends Session {
  accessToken?: string;
}


instance.interceptors.request.use(
    async (request) => {
        const session : CustomSession | null = await getSession();
        if(session && session.accessToken) {
            request.headers.Authorization = `Bearer ${session.accessToken}`
        }
        return request;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);



instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
    return Promise.reject(error)
});


export default instance;