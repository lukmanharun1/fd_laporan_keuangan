export default (password) => {
  if (password.length < 8) {
    return "Password minimal 8 karakter";
  }
  let isLower,
    isUpper,
    isSymbol,
    isNumber = false;

  const alphaberts = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const symbols = ["!", "@", "#", "$", "%", "^", "&", "*"];
  for (const pass of password) {
    if (!isLower && alphaberts.includes(pass)) isLower = true;
    else if (
      !isUpper &&
      alphaberts.includes(pass.toLowerCase()) &&
      pass === pass.toUpperCase()
    )
      isUpper = true;
    else if (!isSymbol && symbols.includes(pass)) isSymbol = true;
    else if (!isNumber && parseInt(pass) >= 0) isNumber = true;

    if (isLower && isUpper && isSymbol && isNumber) break;
  }

  if (!isLower) {
    return "Password harus ada huruf kecil";
  }
  if (!isUpper) {
    return "Password harus ada huruf besar";
  }
  if (!isSymbol) {
    return "Password harus ada simbol";
  }
  if (!isNumber) {
    return "Password harus ada nomor";
  }
  return true;
};
