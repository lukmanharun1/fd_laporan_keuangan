export default (email) => {
  const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  if (regexEmail.test(email)) {
    return true;
  }
  return "Format email tidak valid";
};
