const regExp = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);

const isValidDomain = (domain: string): boolean => {
  return !!domain && regExp.test(domain);
};

export default isValidDomain;
