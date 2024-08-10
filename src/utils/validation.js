export function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export function isValidPassword(pass) {
  return /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])/.test(pass);
}

export function isValidPhone(phone){
  return /^[789]\d{9,9}$/.test(phone)
}

export function isValidHashtag(str){
  return /^#[A-Za-z0-9_]+(?:\s+#[A-Za-z0-9_]+)*$/.test(str);
}
