export const checkValidData = (name, email, password) => {
  if (!email?.trim()) return "Email is required";
  if (!password?.trim()) return "Password is required";
  
  // Optional name validation
  if (name !== undefined && name !== null) {
    const trimmedName = name.trim();
    if (trimmedName.length > 0) {  
      if (trimmedName.length < 2 || trimmedName.length > 50) {
        return "Name must be 2-50 characters";
      }
      const isNameValid = /^[a-zA-Zàáâäãåąčćęèéêëėįìíîïıłńòóôöõøùúûüųūÿýżźñæœçğıõãñßøüċđħĵȕ\w\s\-']{2,50}$/.test(trimmedName);
      if (!isNameValid) {
        return "Name can only contain letters, spaces, hyphens, or apostrophes";
      }
    }
  }
  
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s]).{8,}$/.test(password);
  
  if (!isEmailValid) return "Please enter a valid email address";
  if (!isPasswordValid) return "Password must be 8+ chars with uppercase, lowercase, number, and special char";
  
  return null;
};

