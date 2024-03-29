import React from "react";
import Table from "components/Table";
import propTypes from "prop-types";

export default function LaporanKeuangan(props) {
  const { dataTbody, namaLaporan, jenisLaporan } = props;
  const dataThead = [jenisLaporan];
  const propertiNamaLaporan = namaLaporan.replace("-", "_"); // neraca-keuangan -> neraca_keuangan
  const propertiLoop = [];

  const dataTahun = dataTbody.map((data) => data.tanggal.split("-")[0]);

  if (namaLaporan === "neraca-keuangan") {
    // neraca keuangan
    dataThead.push(
      "Aset",
      "Kas Dan Setara Kas",
      "Persediaan",
      "Piutang",
      "Aset Lancar",
      "Aset Tidak Lancar",
      "Liabilitas Jangka Pendek",
      "Liabilitas Berbunga",
      "Liabilitas Jangka Panjang",
      "Ekuitas"
    );
    propertiLoop.push(
      "aset",
      "kas_dan_setara_kas",
      "persediaan",
      "piutang",
      "aset_lancar",
      "aset_tidak_lancar",
      "liabilitas_jangka_pendek",
      "liabilitas_berbunga",
      "liabilitas_jangka_panjang",
      "ekuitas"
    );
  } else if (namaLaporan === "laba-rugi") {
    // laba rugi
    dataThead.push(
      "Pendapatan",
      "Laba Kotor",
      "Laba Usaha",
      "Beban Bunga",
      "Laba Sebelum Pajak",
      "Laba Bersih"
    );
    propertiLoop.push(
      "pendapatan",
      "laba_kotor",
      "laba_usaha",
      "beban_bunga",
      "laba_sebelum_pajak",
      "laba_bersih"
    );
  } else if (namaLaporan === "arus-kas") {
    // arus kas
    dataThead.push("Operasi", "Investasi", "Pendanaan");
    propertiLoop.push("operasi", "investasi", "pendanaan");
  } else {
    // berarti dividen
    propertiLoop.push("cash");
    dataThead.push("Rupiah");
  }

  function formatLaporanKeuangan(num) {
    if (num <= 1_000_000_0 && num > 0) return num;
    const resultM = num / 1_000_000_000;
    const resultT = resultM / 1000;

    if (resultM < 0) {
      if (resultM <= -1000) {
        return React.createElement(
          "span",
          {
            className: "text-red-400",
          },
          `(${(resultT * -1).toFixed(2)} T)`
        );
      }
      return React.createElement(
        "span",
        {
          className: "text-red-400",
        },
        `(${(resultM * -1).toFixed(2)} M)`
      );
    }

    if (resultT >= 1) {
      return `${resultT.toFixed(2)} T`;
    }
    return `${resultM.toFixed(2)} M`;
  }
  return (
    <>
      <Table
        dataThead={dataThead}
        classTr="bg-green-500 text-white"
        classTh={`p-2 ${namaLaporan === "neraca-keuangan" ? "text-sm" : ""}`}
      >
        {dataTbody.map((data, i) => {
          return (
            <tr className="text-center" key={`table laporan keuangan ke ${i}`}>
              <td className="p-1">{dataTahun[i]}</td>
              {propertiLoop.map((properti, i) => {
                return (
                  <td key={`data laporan keuangan ke ${i}`}>
                    {data[propertiNamaLaporan]
                      ? formatLaporanKeuangan(
                          data[propertiNamaLaporan][properti]
                        )
                      : ""}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </Table>
    </>
  );
}
LaporanKeuangan.propTypes = {
  dataTbody: propTypes.array,
  namaLaporan: propTypes.oneOf([
    "neraca-keuangan",
    "laba-rugi",
    "arus-kas",
    "dividen",
  ]).isRequired,
  jenisLaporan: propTypes.oneOf(["TAHUNAN", "Q4", "Q3", "Q2", "Q1"]).isRequired,
};
