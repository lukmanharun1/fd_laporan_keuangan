import React from "react";
import propTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
export default function RasioLaporanKeuangan({ data, jenisLaporan }) {
  const {
    tanggal,
    harga_saham,
    likuiditas,
    solvabilitas,
    profitabilitas,
    dividen,
    valuasi,
  } = data;
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  // inisialisasi data chart
  const dataLikuiditas = [
    {
      label: "Current Rasio",
      properti: "CRR",
      color: "rgb(0, 255, 0)",
    },
    {
      label: "Quick Rasio",
      properti: "QR",
      color: "rgb(0, 200, 0)",
    },
    {
      label: "Cash Rasio",
      properti: "CR",
      color: "rgb(0, 150, 0)",
    },
  ];

  const dataSolvabilitas = [
    {
      label: "Debt To Equity Rasio",
      properti: "DER",
      color: "rgb(200, 255, 0)",
    },
    {
      label: "Net Gearing Rasio",
      properti: "NGR",
      color: "rgb(255, 200, 0)",
    },
    {
      label: "Interest Coverage Rasio",
      properti: "ICR",
      color: "rgb(0, 255, 0)",
    },
  ];

  const dataProfitabilitas = [
    {
      label: "Gross Profit Margin",
      properti: "GPM",
      color: "rgb(255, 255, 0)",
    },
    {
      label: "Operating Profit Margin",
      properti: "OPM",
      color: "rgb(110, 255, 0)",
    },
    {
      label: "Net Profit Margin",
      properti: "NPM",
      color: "rgb(127, 127, 0)",
    },
    {
      label: "Return On Equity",
      properti: "ROE",
      color: "rgb(70, 255, 0)",
    },
    {
      label: "Return On Aset",
      properti: "ROA",
      color: "rgb(200, 200, 0)",
    },
  ];

  const dataHargaSaham = [
    {
      label: "Harga Per Lembar",
      color: "rgb(0, 255, 0)",
    },
  ];
  const dataValuasi1 = [
    {
      label: "Book Value Per Share",
      properti: "BVPS",
      color: "rgb(0, 255, 0)",
    },
    {
      label: "Revenue Per Share",
      properti: "RPS",
      color: "rgb(255, 255, 0)",
    },
    {
      label: "Earning Per Share",
      properti: "EPS",
      color: "rgb(150, 255, 0)",
    },
    {
      label: "Cashflow Per Share",
      properti: "CFPS",
      color: "rgb(200, 255, 0)",
    },
  ];
  const dataValuasi2 = [
    {
      label: "Price To Book Value",
      properti: "PBV",
      color: "rgb(0, 255, 0)",
    },
    {
      label: "EV/EBITDA",
      properti: "EV/EBITDA",
      color: "rgb(110, 255, 0)",
    },
    {
      label: "Price To Sale",
      properti: "PS",
      color: "rgb(255, 255, 0)",
    },
    {
      label: "Price To Earning",
      properti: "PER",
      color: "rgb(150, 255, 0)",
    },
    {
      label: "Price To Cashflow",
      properti: "PCF",
      color: "rgb(200, 255, 0)",
    },
  ];
  function dataLineChart(datas = [], dataProp = [], labels, text) {
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
          text,
        },
      },
    };

    const datasets = datas.map((data) => {
      return {
        label: data.label,
        // data: dataProp[data?.properti]?.map((data) => parseFloat(data)),
        data: data.properti
          ? dataProp[data.properti].map((data) => parseFloat(data))
          : dataProp,
        borderColor: data.color,
        backgroundColor: data.color,
      };
    });
    const dataChart = {
      labels,
      datasets,
    };

    return [optionsChart, dataChart];
  }
  const labels = tanggal.map((dataTanggal) => dataTanggal.split("-")[0]);

  // data chart rasio likuiditas
  const [optionsChartLikuiditas, dataChartLikuiditas] = dataLineChart(
    dataLikuiditas,
    likuiditas,
    labels,
    `Rasio Likuiditas | ${jenisLaporan}`
  );

  // data chart rasio solvabilitas
  const [optionsChartSolvabilitas, dataChartSolvabilitas] = dataLineChart(
    dataSolvabilitas,
    solvabilitas,
    labels,
    `Rasio Solvabilitas | ${jenisLaporan}`
  );

  // data chart rasio profitabilitas
  const [optionsChartProfitabiltas, dataChartProfitabiltas] = dataLineChart(
    dataProfitabilitas,
    profitabilitas,
    labels,
    `Rasio Pofitabilitas | ${jenisLaporan}`
  );

  // data chart harga saham
  const [optionsChartHargaSaham, dataChartHargaSaham] = dataLineChart(
    dataHargaSaham,
    harga_saham,
    labels,
    `Harga Saham | ${jenisLaporan}`
  );

  let optionsChartDividen = {};
  let dataChartDividen = {};
  if (jenisLaporan === "TAHUNAN" && dividen) {
    // data chart dividen
    const dataDividen = [
      {
        label: "Dividen Per Share",
        properti: "DPS",
        color: "rgb(0, 200, 0)",
      },
      {
        label: "Dividen Yield",
        properti: "DY",
        color: "rgb(0, 255, 0)",
      },
      {
        label: "Dividen Payout Rasio",
        properti: "DPR",
        color: "rgb(255, 100, 0)",
      },
    ];
    const labelsDividen = dividen.tanggal.map((data) => data.split("-")[0]);
    [optionsChartDividen, dataChartDividen] = dataLineChart(
      dataDividen,
      dividen,
      labelsDividen,
      `Dividen | ${jenisLaporan}`
    );
  }

  // data chart valuasi1
  const datasetsValuasi1 = dataValuasi1.map((data) => {
    return {
      label: data.label,
      data: valuasi[data.properti],
      borderColor: data.color,
      backgroundColor: data.color,
    };
  });
  // data chart valuasi2
  const datasetsValuasi2 = dataValuasi2.map((data) => {
    return {
      label: data.label,
      data: valuasi[data.properti].map((data) => parseFloat(data)),
      borderColor: data.color,
      backgroundColor: data.color,
    };
  });
  const optionsChartValuasi = {
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
        text: `Valuasi | ${jenisLaporan}`,
      },
    },
  };
  const dataChartValuasi1 = {
    labels,
    datasets: datasetsValuasi1,
  };
  const dataChartValuasi2 = {
    labels,
    datasets: datasetsValuasi2,
  };
  return (
    <div className="mt-2">
      {/* menampilkan line chart rasio likuiditas */}
      <Line
        options={optionsChartLikuiditas}
        data={dataChartLikuiditas}
        width="90%"
        height="25%"
        className="mb-3"
      />
      {/* menampilkan line chart rasio solvabilitas */}
      <Line
        options={optionsChartSolvabilitas}
        data={dataChartSolvabilitas}
        width="90%"
        height="25%"
        className="mb-3"
      />
      {/* menampilkan line chart rasio profitabiltas */}
      <Line
        options={optionsChartProfitabiltas}
        data={dataChartProfitabiltas}
        width="90%"
        height="30%"
        className="mb-3"
      />
      {/* menampilkan line chart harga saham */}
      <Line
        options={optionsChartHargaSaham}
        data={dataChartHargaSaham}
        width="90%"
        height="20%"
        className="mb-3"
      />
      {/* menampilkan line chart dividen */}
      {jenisLaporan === "TAHUNAN" && dividen && (
        <Line
          options={optionsChartDividen}
          data={dataChartDividen}
          width="90%"
          height="25%"
          className="mb-3"
        />
      )}

      {/* menampilkan line chart valuasi 1 */}
      <Line
        options={optionsChartValuasi}
        data={dataChartValuasi1}
        width="90%"
        height="27%"
        className="mb-3"
      />
      {/* menampilkan line chart valuasi 2 */}
      <Line
        options={optionsChartValuasi}
        data={dataChartValuasi2}
        width="90%"
        height="30%"
        className="mb-3"
      />
    </div>
  );
}

RasioLaporanKeuangan.propTypes = {
  data: propTypes.object,
  jenisLaporan: propTypes.oneOf(["Q1", "Q2", "Q3", "Q4", "TAHUNAN"]),
};
