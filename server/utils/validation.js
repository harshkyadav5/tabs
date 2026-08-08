const MIN_LENGTH = 8;
const MAX_LENGTH = 72;

const COMMON_PASSWORDS = new Set([
  "password", "password1", "12345678", "123456789", "1234567890",
  "qwerty123", "qwertyuiop", "letmein123", "welcome123", "admin123",
  "iloveyou", "monkey123", "football", "abc123456", "password123",
  "changeme", "trustno1", "dragon123",
]);

function validatePasswordStrength(password, { username, email } = {}) {
  if (!password || typeof password !== "string") {
    return { valid: false, message: "Password is required." };
  }

  if (password.length < MIN_LENGTH) {
    return { valid: false, message: `Password must be at least ${MIN_LENGTH} characters.` };
  }

  if (password.length > MAX_LENGTH) {
    return { valid: false, message: `Password must be no more than ${MAX_LENGTH} characters.` };
  }

  const categories = [
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  if (categories < 3) {
    return {
      valid: false,
      message: "Password must include at least 3 of: lowercase letters, uppercase letters, numbers, and symbols.",
    };
  }

  if (COMMON_PASSWORDS.has(password.toLowerCase())) {
    return { valid: false, message: "This password is too common. Please choose a stronger one." };
  }

  const lowerPassword = password.toLowerCase();
  const usernamePart = username?.trim().toLowerCase();
  const emailLocalPart = email?.split("@")[0]?.trim().toLowerCase();

  if (usernamePart && usernamePart.length >= 3 && lowerPassword.includes(usernamePart)) {
    return { valid: false, message: "Password must not contain your username." };
  }

  if (emailLocalPart && emailLocalPart.length >= 3 && lowerPassword.includes(emailLocalPart)) {
    return { valid: false, message: "Password must not contain your email address." };
  }

  return { valid: true, message: null };
}

export { validatePasswordStrength };
