function postedAt(date: string): string {
  const now = new Date();
  const posted = new Date(date);
  const diff = now.getTime() - posted.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) {
    return `${diffDays} days ago`;
  } if (diffHours > 0) {
    return `${diffHours} hours ago`;
  } if (diffMinutes > 0) {
    return `${diffMinutes} minutes ago`;
  } if (diffSeconds > 0) {
    return `${diffSeconds} seconds ago`;
  }
  return 'just now';
}

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

export { postedAt, handleErrorLoginRegister };