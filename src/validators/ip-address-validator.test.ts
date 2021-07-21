import isValidIpAddress from './ip-address-validator';

describe('Ip Address Validator', () => {
  it('should return true for valid ip addresses', () => {
    const validIpAddresses = ['1.1.1.1', '8.8.8.8', '192.168.0.1', '123.123.123.123'];
    validIpAddresses.forEach(ip => expect(isValidIpAddress(ip)).toBe(true));
  });

  it('should return false for invalid domains', () => {
    const invalidIpAddresses = ['any_string', '', null, undefined, '1.1.1', '1234'];
    invalidIpAddresses.forEach(ip => expect(isValidIpAddress(ip)).toBe(false));
  });
});
