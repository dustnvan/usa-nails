const validatePhoneNum = (value) => {
  const digitsOnly = value.replace(/\D/g, '');
  if (digitsOnly.length === 0) {
    return 'Phone number is required.';
  } else if (digitsOnly.length !== 10) {
    return 'Phone number must be 10 digits.';
  } else {
    return '';
  }
};

const validateName = (name) => {
  if (name.trim() === '') {
    return 'Name is required.';
  } else {
    return '';
  }
};

export { validatePhoneNum, validateName };
