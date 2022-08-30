import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SERVICE_LAPORAN_KEUANGAN } from "config";
import { optionsTahun } from "constants/optionsTahun";
import { optionsJenisLaporan } from "constants/optionsJenisLaporan";
import { Heading, Button, Dropdown } from "components";
import Table, { TableDownload } from "components/Table";
import { IconHomeSVG, IconInfoSVG } from "components/SVG";
import formatTanggalLaporanKeuangan from "helpers/formatTanggalLaporanKeuangan";

import axios from "helpers/axios";
const dataThead = ["Nama File", "Download"];

export default function DownloadLaporanKeuangan() {
  const { kode_emiten, nama_emiten } = useParams();
  document.title = `Download Laporan Keuangan ${kode_emiten} | ${nama_emiten}`;
  const [jenisLaporan, setJenisLaporan] = useState(
    optionsJenisLaporan[0].value
  );
  const [tahun, setTahun] = useState(optionsTahun[0].value);

  const [dataLaporanKeuangan, setDataLaporanKeuangan] = useState({});
  const [tanggal, setTanggal] = useState(
    formatTanggalLaporanKeuangan(jenisLaporan, tahun)
  );

  function handleOptionsJenisLaporan(e) {
    const { value } = e.target;
    setJenisLaporan(value);
    setTanggal(formatTanggalLaporanKeuangan(value, tahun));
  }

  function handleOptionsTahun(e) {
    const { value } = e.target;
    setTahun(value);
    setTanggal(formatTanggalLaporanKeuangan(jenisLaporan, value));
  }

  useEffect(() => {
    // ambil data laporan keuangan
    async function fetchLaporanKeuangan() {
      try {
        const laporanKeuangan = await axios.get(
          `${SERVICE_LAPORAN_KEUANGAN}/laporan-keuangan/${kode_emiten}/${tanggal}`
        );
        setDataLaporanKeuangan(laporanKeuangan.data.data);
      } catch (error) {
        setDataLaporanKeuangan({});
      }
    }
    fetchLaporanKeuangan();
  }, [kode_emiten, tanggal]);
  return (
    <div className="container mt-3">
      <Heading Tag="h1" className="text-center">
        Download Laporan Keuangan
      </Heading>
      <Heading Tag="h3" className="text-center mt-3">
        {nama_emiten} ({kode_emiten})
      </Heading>
      <div className="flex justify-center mt-5 relative">
        <Button type="link" href="/">
          <IconHomeSVG className="fill-green-500" />
        </Button>
        <Button type="link" href={`/info/${kode_emiten}`}>
          <IconInfoSVG className="fill-green-500" />
        </Button>
      </div>
      <div className="flex justify-center mt-3">
        {/* dropdown jenis laporan */}
        <Dropdown
          options={optionsJenisLaporan}
          onChange={handleOptionsJenisLaporan}
          className="w-36 mr-3"
        />
        {/* dropdown tahun */}
        <Dropdown
          options={optionsTahun}
          onChange={handleOptionsTahun}
          className="w-36 ml-3"
        />
      </div>
      <div className="flex justify-center mt-3">
        <Table
          dataThead={dataThead}
          classTr="bg-green-500 text-white"
          classTh="p-2"
          classTable="text-center"
        >
          <TableDownload data={dataLaporanKeuangan} />
        </Table>
      </div>
    </div>
  );
}
