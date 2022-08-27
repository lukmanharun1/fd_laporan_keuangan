export default function formatTanggal(jenisLaporan, tahun) {
  const dataTanggal = {
    Q1: `${tahun}-03-31`,
    Q2: `${tahun}-06-30`,
    Q3: `${tahun}-09-30`,
    TAHUNAN: `${tahun}-12-31`,
  };
  return dataTanggal[jenisLaporan];
}
