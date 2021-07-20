import { GeolocationInfo } from '../models/geolocation-info';

const baseUrl = `https://geo.ipify.org/api/v1?apiKey=${process.env.NEXT_PUBLIC_IPIFY_KEY}`;

export const getGeolocationInfoByIpAddress = async (ipAddress: string): Promise<GeolocationInfo> => {
  const response = await fetch(`${baseUrl}&ipAddress=${ipAddress}`);
  return handleResponse(response);
};

export const getGeolocationInfoByDomain = async (domain: string): Promise<GeolocationInfo> => {
  const response = await fetch(`${baseUrl}&domain=${domain}`);
  return handleResponse(response);
};

const handleResponse = (response: Response): Promise<GeolocationInfo> => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(new Error('Whoops! Something went wrong...'));
};
