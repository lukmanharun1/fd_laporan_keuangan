import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import propTypes from "prop-types";

export default function TableLaporanKeuangan(props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const { dataTbody, namaLaporan, jenisLaporan } = props;
  const labels = [];
  const propertiNamaLaporan = namaLaporan.replace("-", "_"); // neraca-keuangan -> neraca_keuangan
  const propertiLoop = [];

  const dataTahun = dataTbody.map((data) => data.tanggal.split("-")[0]);
  const title = {
    neraca_keuangan: "Neraca Keuangan",
    laba_rugi: "Laba Rugi",
    arus_kas: "Arus Kas",
    dividen: "Dividen",
  };
  const optionsChart = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#000",
        },
      },

      title: {
        display: true,
        color: "#22c55e",
        text: `${title[propertiNamaLaporan]} | ${jenisLaporan}`,
      },
    },
  };
  const datasets = [];
  const backgroundColors = [];
  if (namaLaporan === "neraca-keuangan") {
    // neraca keuangan
    labels.push(
      "Aset",
      "Kas Setara Kas",
      "Persediaan",
      "Piutang",
      "Aset Lancar",
      "Aset Tidak Lancar",
      "Liabilitas Jangka Pendek",
      "Liabilitas Berbunga",
      "Liabilitas Jangka Panjang",
      "Ekuitas"
    );
    backgroundColors.push(
      "rgb(255, 255, 0)", // Aset
      "rgb(50, 225, 0)", // Kas Dan Setara Kas
      "rgb(80, 225, 0)", // Persediaan
      "rgb(120, 255, 0)", // Piutang
      "rgb(150, 255, 0)", // Aset Lancar
      "rgb(255, 150, 0)", // Aset Tidak Lancar
      "rgb(200, 00, 00)", // Liabilitas Jangka Pendek
      "rgb(255, 0, 00)", // Liabilitas Berbunga
      "rgb(150, 0, 0)", // Liabilitas Jangka Panjang
      "rgb(0, 255, 0)" // Ekuitas
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
    labels.push(
      "Pendapatan",
      "Laba Kotor",
      "Laba Usaha",
      "Beban Bunga",
      "Laba Sebelum Pajak",
      "Laba Bersih"
    );
    backgroundColors.push(
      "rgb(255, 255, 0)", // Pendapatan
      "rgb(170, 255, 0)", // Laba Kotor
      "rgb(110, 255, 0)", // Laba Usaha
      "rgb(255, 0, 0)", // Beban Bunga
      "rgb(70, 255, 0)", // Laba Sebelum Pajak
      "rgb(0, 255, 0)" // Laba Bersih
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
    labels.push("Operasi", "Investasi", "Pendanaan");
    backgroundColors.push(
      "rgb(0, 255, 0)", // Operasi
      "rgb(255, 255, 0)", // Investasi
      "rgb(255, 0, 0)"
    );
    propertiLoop.push("operasi", "investasi", "pendanaan");
  } else {
    // berarti dividen
    labels.push("Rupiah");
    backgroundColors.push(
      "rgb(0, 255, 0)" // Rupiah
    );
    propertiLoop.push("cash");
  }
  labels.forEach((label, i) => {
    const data = dataTbody.map((data) => {
      return data[propertiNamaLaporan]
        ? data[propertiNamaLaporan][propertiLoop[i]]
        : "";
    });
    datasets.push({
      label,
      data,
      backgroundColor: backgroundColors[i],
    });
  });

  const dataChart = {
    labels: dataTahun,
    datasets,
  };
  return (
    <div className="mt-2">
      <Bar options={optionsChart} data={dataChart} width="90%" height="32%" />
    </div>
  );
}
TableLaporanKeuangan.propTypes = {
  dataTbody: propTypes.array,
  namaLaporan: propTypes.oneOf([
    "neraca-keuangan",
    "laba-rugi",
    "arus-kas",
    "dividen",
  ]).isRequired,
  jenisLaporan: propTypes.oneOf(["TAHUNAN", "Q4", "Q3", "Q2", "Q1"]).isRequired,
};
