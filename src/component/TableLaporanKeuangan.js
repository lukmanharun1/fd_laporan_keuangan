import React, { useState } from "react";
import Table from "./Table";
import propTypes from "prop-types";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TableLaporanKeuangan(props) {
  const { dataTbody, namaLaporan, jenisLaporan } = props;
  const dataThead = [jenisLaporan];
  const propertiNamaLaporan = namaLaporan.replace("-", "_"); // neraca-keuangan -> neraca_keuangan
  const propertiLoop = [];

  const titleChart = {
    neraca_keuangan: "Neraca Keuangan",
    laba_rugi: "Laba Rugi",
    arus_kas: "Arus Kas",
    dividen: "Dividen",
  };
  const optionsChart = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#000",
        },
      },

      title: {
        display: true,
        color: "#000",
        text: `${titleChart[propertiNamaLaporan]} | ${jenisLaporan}`, // ambil dari nama laporan | jenis laporan
      },
    },
  };
  const dataTahun = dataTbody.map((data) => data.tanggal.split("-")[0]);

  const [labelChart, setLabelChart] = useState("");
  const [dataLabelChart, setDataLabelChart] = useState([]);
  const dataChart = {
    labels: dataTahun,
    datasets: [
      {
        label: labelChart, // ambil data table head yang di sedang hover
        data: dataLabelChart, // ambil data table body yang di sedang hover
        backgroundColor: "rgb(34, 197, 94)",
      },
    ],
  };

  const [isShowChart, setIsShowChart] = useState(false);
  const [isShowDataTable, setIsShowDataTable] = useState(true);
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
      "Laba Sebelum Pajak",
      "Laba Bersih"
    );
    propertiLoop.push(
      "pendapatan",
      "laba_kotor",
      "laba_usaha",
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

  function handleChart(e) {
    if (e.type === "mouseover") {
      const { label, properti } = e.target.dataset;
      const dataLabel = dataTbody.map(
        (data) => data[propertiNamaLaporan][properti]
      );
      setIsShowChart(true);
      setIsShowDataTable(false);
      setLabelChart(label);
      setDataLabelChart(dataLabel);
    } else if (e.type === "mouseout") {
      setIsShowChart(false);
      setIsShowDataTable(true);
    }
  }

  function formatLaporanKeuangan(num) {
    if (num <= 1_000_000_0 && num > 0) return num;
    const resultM = num / 1_000_000_000;
    if (resultM < 0) {
      return React.createElement(
        "span",
        {
          className: "text-red-400",
        },
        `(${(resultM * -1).toFixed(2)} M)`
      );
    }
    const resultT = resultM / 1000;
    if (resultT >= 1) {
      return `${resultT.toFixed(2)} T`;
    }
    return `${resultM.toFixed(2)} M`;
  }
  return (
    <>
      <Table
        dataThead={dataThead.map((data, i) => {
          return (
            <>
              {data}{" "}
              {data !== jenisLaporan ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height={`${namaLaporan === "neraca-keuangan" ? "20" : "24"}`}
                  width={`${namaLaporan === "neraca-keuangan" ? "20" : "24"}`}
                  className="inline fill-white cursor-pointer"
                  onMouseOver={handleChart}
                  onMouseOut={handleChart}
                  data-label={data}
                  data-properti={propertiLoop[i - 1]}
                >
                  {/* ukuruan icon */}
                  {namaLaporan === "neraca-keuangan" ? (
                    // icon chart 20 px
                    <path
                      d="M2.979 15.792 1.292 14.104 7.917 7.479 11.229 10.792 17.104 4.188 18.729 5.792 11.271 14.208 7.917 10.854Z"
                      data-label={data}
                      data-properti={propertiLoop[i - 1]}
                    />
                  ) : (
                    // icon chart 24px
                    <path
                      d="M3.5 18.5 2 17 9.5 9.5 13.5 13.5 20.6 5.5 22 6.9 13.5 16.5 9.5 12.5Z"
                      data-label={data}
                      data-properti={propertiLoop[i - 1]}
                    />
                  )}
                </svg>
              ) : (
                ""
              )}
            </>
          );
        })}
        classTr="bg-green-500 text-white"
        classTh={`p-2 ${namaLaporan === "neraca-keuangan" ? "text-sm" : ""}`}
      >
        {isShowDataTable &&
          dataTbody.map((data, i) => {
            return (
              <tr
                className="text-center"
                key={`table laporan keuangan ke ${i}`}
              >
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
      {isShowChart && (
        <Bar options={optionsChart} data={dataChart} width="90%" height="28%" />
      )}
    </>
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
