export const optionsTahun = []; // isi dari tahun 2010 ~ tahun sekarang
let tahunSekarang = new Date().getFullYear();
const selisihTahun = tahunSekarang - 2010;
for (let i = 0; i <= selisihTahun; i++) {
  optionsTahun.push({
    key: tahunSekarang,
    value: tahunSekarang,
  });
  tahunSekarang--;
}
