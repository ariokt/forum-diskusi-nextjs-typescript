const handleErrorLoginRegister = (email: string, password: string, konfirmasiPassword: string | null = null): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\\|\[\]{};:'",.<>?]).{6,}$/;

  if (emailRegex.test(email) === false && email.length > 0) {
    return 'Email belum sesuai!';
  }
  if (passwordRegex.test(password) === false && password.length > 0) {
    return 'Password belum sesuai!';
  }
  if (password !== konfirmasiPassword && password.length > 0 && (konfirmasiPassword && konfirmasiPassword.length > 0)) {
    return 'Password dan Ulangi Password tidak sesuai!'
  }
  return '';
}

export default handleErrorLoginRegister;