import axios from "axios";
import { useSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Your API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const { data: session } = useSession();

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
