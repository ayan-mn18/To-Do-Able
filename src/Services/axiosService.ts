import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseUrl = "http://localhost:8000/api";
const axiosService = async <T>(
    url: string,
    method: AxiosRequestConfig['method'],
    data?: any,
  ): Promise<AxiosResponse<T>> => {
    const config: AxiosRequestConfig = {
      method,
      url: `${baseUrl}${url}`,
      data,
    };
  
    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export default axiosService;