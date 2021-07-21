import isValidDomain from './domain-validator';

describe('Domain Validator', () => {
  it('should return true for valid domains', () => {
    const validDomains = ['www.google.com', 'google.com', 'www.google.com.br', 'google.com.br'];
    validDomains.forEach(domain => expect(isValidDomain(domain)).toBe(true));
  });

  it('should return false for invalid domains', () => {
    const invalidDomains = ['www', '', null, undefined, 'a.b.c', 'any_string'];
    invalidDomains.forEach(domain => expect(isValidDomain(domain)).toBe(false));
  });
});
