export function emailValid(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }