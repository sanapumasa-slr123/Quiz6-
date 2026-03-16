/**
 * Validation helper functions for forms
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // Password must be at least 8 characters
  return password.length >= 8;
};

export const validatePhoneNumber = (phone) => {
  // Basic phone validation (at least 10 digits)
  const phoneRegex = /\d{10,}/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const validateServiceForm = (formData) => {
  const errors = {};

  if (!formData.service_name || formData.service_name.trim() === '') {
    errors.service_name = 'Service name is required';
  }

  if (!formData.description || formData.description.trim() === '') {
    errors.description = 'Description is required';
  }

  if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
    errors.price = 'Price must be a valid number greater than 0';
  }

  if (!formData.duration_of_service || formData.duration_of_service.trim() === '') {
    errors.duration_of_service = 'Duration is required';
  }

  return errors;
};

export const validateRating = (rating) => {
  const num = parseFloat(rating);
  return !isNaN(num) && num >= 0 && num <= 5;
};

export const validateUsername = (username) => {
  // Username must be at least 3 characters
  return username.length >= 3;
};

export const validateNotEmpty = (value) => {
  return value && value.trim() !== '';
};

export const checkFormValid = (formData, requiredFields) => {
  for (let field of requiredFields) {
    if (!formData[field] || formData[field].toString().trim() === '') {
      return false;
    }
  }
  return true;
};
