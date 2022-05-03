module.exports = (kodeEmiten) => {
  if (kodeEmiten.length === 4) {
    const aplhabert = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
                  'J','K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
                ];
    for (const huruf of kodeEmiten.split('')) {
     if (!aplhabert.includes(huruf.toUpperCase())) {
       return 'Kode Emiten Tidak Valid';
     }
    }
    return true;
  }
  return 'Kode Emiten Harus 4 Huruf';
}