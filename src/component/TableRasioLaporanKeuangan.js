import React from "react";
import propTypes from "prop-types";
import Table from "./Table";
import Heading from "./Heading";

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

  // inisialisasi data thead
  const dataLikuiditas = [
    jenisLaporan,
    "Current Rasio",
    "Quick Rasio",
    "Cash Rasio",
  ];

  const dataSolvabilitas = [
    jenisLaporan,
    "Debt To Equity Rasio",
    "Net Gearing Rasio",
    "Interest Coverage Rasio",
  ];

  const dataProfitabilitas = [
    jenisLaporan,
    "Gross Profit Margin",
    "Operating Profit Margin",
    "Net Profit Margin",
    "Return On Equity",
    "Return On Aset",
  ];

  const dataValuasi = [
    jenisLaporan,
    "Book Value Per Share",
    "Price To Book Value",
    "EV/EBITDA",
    "Revenue Per Share",
    "Price To Sale",
    "Earning Per Share",
    "Price To Earning",
    "Cashflow Per Share",
    "Price To Cashflow",
  ];

  const dataHargaSaham = [jenisLaporan, "Harga Per Lembar"];
  return (
    <div className="mt-3">
      {/* menampilkan rasio likuiditas */}
      <div className="my-3">
        <Heading Tag="h4">Rasio Likuiditas</Heading>
        <Table
          dataThead={dataLikuiditas}
          classTr="bg-green-500 text-white"
          classTh="p-2"
        >
          {tanggal.map((dataTanggal, i) => {
            return (
              <tr
                className="text-center"
                key={`Rasio Likuiditas ${dataTanggal.split("-")[0]}`}
              >
                <td>{dataTanggal.split("-")[0]}</td>
                <td>{likuiditas.CRR[i]}</td>
                <td>{likuiditas.QR[i]}</td>
                <td>{likuiditas.CR[i]}</td>
              </tr>
            );
          })}
        </Table>
      </div>

      {/* menampilkan rasio solvabilitas */}
      <div className="my-3">
        <Heading Tag="h4">Rasio Solvabilitas</Heading>
        <Table
          dataThead={dataSolvabilitas}
          classTr="bg-green-500 text-white"
          classTh="p-2"
        >
          {tanggal.map((dataTanggal, i) => {
            return (
              <tr
                className="text-center"
                key={`Rasio Solvabilitas ${dataTanggal.split("-")[0]}`}
              >
                <td>{dataTanggal.split("-")[0]}</td>
                <td>{solvabilitas.DER[i]}</td>
                <td>{solvabilitas.NGR[i]}</td>
                <td>{solvabilitas.ICR[i]}</td>
              </tr>
            );
          })}
        </Table>
      </div>

      {/* menampilkan rasio profitabilitas */}
      <div className="my-3">
        <Heading Tag="h4">Rasio Profitabilitas</Heading>
        <Table
          dataThead={dataProfitabilitas}
          classTr="bg-green-500 text-white"
          classTh="p-2"
        >
          {tanggal.map((dataTanggal, i) => {
            return (
              <tr
                className="text-center"
                key={`Rasio Profitabilitas ${dataTanggal.split("-")[0]}`}
              >
                <td>{dataTanggal.split("-")[0]}</td>
                <td>{profitabilitas.GPM[i]}</td>
                <td>{profitabilitas.OPM[i]}</td>
                <td>{profitabilitas.NPM[i]}</td>
                <td>{profitabilitas.ROE[i]}</td>
                <td>{profitabilitas.ROA[i]}</td>
              </tr>
            );
          })}
        </Table>
      </div>

      {/* menampilkan harga saham */}
      <div className="my-3">
        <Heading Tag="h4">Harga Saham</Heading>
        <Table
          dataThead={dataHargaSaham}
          classTr="bg-green-500 text-white"
          classTh="p-2"
        >
          {tanggal.map((dataTanggal, i) => {
            return (
              <tr
                className="text-center"
                key={`Harga Saham ${dataTanggal.split("-")[0]}`}
              >
                <td>{dataTanggal.split("-")[0]}</td>
                <td>Rp.{harga_saham[i]}</td>
              </tr>
            );
          })}
        </Table>
      </div>

      {/* menampilkan dividen */}
      {jenisLaporan === "TAHUNAN" && dividen && (
        <div className="my-3">
          <Heading Tag="h4">Dividen</Heading>
          <Table
            dataThead={[
              jenisLaporan,
              "Dividen Per Share",
              "Dividen Yield",
              "Dividen Payout Rasio",
            ]}
            classTr="bg-green-500 text-white"
            classTh="p-2"
          >
            {tanggal.map((dataTanggal, i) => {
              return (
                <tr
                  className="text-center"
                  key={`Dividen ${dataTanggal.split("-")[0]}`}
                >
                  <td>{dataTanggal.split("-")[0]}</td>
                  <td>{dividen.DPS[i]}</td>
                  <td>{dividen.DY[i]}</td>
                  <td>{dividen.DPR[i]}</td>
                </tr>
              );
            })}
          </Table>
        </div>
      )}

      {/* menampilkan Valuasi */}
      <div className="my-3">
        <Heading Tag="h4">Rasio Valuasi</Heading>
        <Table
          dataThead={dataValuasi}
          classTr="bg-green-500 text-white text-sm"
          classTh="p-2"
        >
          {tanggal.map((dataTanggal, i) => {
            return (
              <tr
                className="text-center"
                key={`Rasio Valuasi ${dataTanggal.split("-")[0]}`}
              >
                <td>{dataTanggal.split("-")[0]}</td>
                <td>{valuasi.BVPS[i]}</td>
                <td>{valuasi.PBV[i]}</td>
                <td>{valuasi["EV/EBITDA"][i]}</td>
                <td>{valuasi.RPS[i]}</td>
                <td>{valuasi.PS[i]}</td>
                <td>{valuasi.EPS[i]}</td>
                <td>{valuasi.PER[i]}</td>
                <td>{valuasi.CFPS[i]}</td>
                <td>{valuasi.PCF[i]}</td>
              </tr>
            );
          })}
        </Table>
      </div>
    </div>
  );
}

RasioLaporanKeuangan.propTypes = {
  data: propTypes.object,
};
