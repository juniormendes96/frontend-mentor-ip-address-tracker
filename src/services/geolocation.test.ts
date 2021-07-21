import { getGeolocationInfoByDomain, getGeolocationInfoByIpAddress } from './geolocation';

const baseUrl = `https://geo.ipify.org/api/v1?apiKey=${process.env.NEXT_PUBLIC_IPIFY_KEY}`;

const mockFetch = (data: any = {}, ok = true) => {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok,
      json: () => data
    })
  );
};

describe('Geolocation Service', () => {
  describe('getGeolocationInfoByIpAddress', () => {
    it('should call fetch with correct url', async () => {
      window.fetch = mockFetch();

      await getGeolocationInfoByIpAddress('any_ip');
      expect(window.fetch).toHaveBeenCalledWith(`${baseUrl}&ipAddress=any_ip`);
    });

    it('should return data on success', async () => {
      const expectedResponse = { country: 'Brazil' };
      window.fetch = mockFetch(expectedResponse);

      const actualResponse = await getGeolocationInfoByIpAddress('any_ip');
      expect(expectedResponse).toEqual(actualResponse);
    });

    it('should reject on failure', async () => {
      window.fetch = mockFetch({}, false);
      await expect(getGeolocationInfoByIpAddress('any_ip')).rejects.toEqual(new Error('Whoops! Something went wrong...'));
    });
  });

  describe('getGeolocationInfoByDomain', () => {
    it('should call fetch with correct url', async () => {
      window.fetch = mockFetch();

      await getGeolocationInfoByDomain('any_domain');
      expect(window.fetch).toHaveBeenCalledWith(`${baseUrl}&domain=any_domain`);
    });

    it('should return data on success', async () => {
      const expectedResponse = { country: 'Brazil' };
      window.fetch = mockFetch(expectedResponse);

      const actualResponse = await getGeolocationInfoByDomain('any_domain');
      expect(expectedResponse).toEqual(actualResponse);
    });

    it('should reject on failure', async () => {
      window.fetch = mockFetch({}, false);
      await expect(getGeolocationInfoByDomain('any_domain')).rejects.toEqual(new Error('Whoops! Something went wrong...'));
    });
  });
});
