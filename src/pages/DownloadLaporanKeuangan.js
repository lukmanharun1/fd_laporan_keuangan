import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from '../component/Table';
import Heading from '../component/Heading';
import TableDownload from '../component/TableDownload';
import { SERVICE_LAPORAN_KEUANGAN } from '../config';
import IconHome from '../component/IconHome';
import IconInfo from '../component/IconInfo';
import Button from '../component/Button';
const dataThead = [
  'No',
  'Nama File',
  'Jenis Laporan',
  'Tanggal',
  'Download'
];

export default function DownloadLaporanKeuangan() {
  let params = useParams();
  const { kode_emiten, nama_emiten } = params;
  document.title = `Download Laporan Keuangan ${kode_emiten} | ${nama_emiten}`;
  const [dataLaporanKeuangan, setDataLaporanKeuangan] = useState([]);
  useEffect(() => {
    // ambil data laporan keuangan
    async function fetchLaporanKeuangan() {
    const laporanKeuangan = await axios.get(`${SERVICE_LAPORAN_KEUANGAN}/laporan-keuangan/${kode_emiten}`);
    setDataLaporanKeuangan(laporanKeuangan.data.data);
    }
    fetchLaporanKeuangan();
  }, [kode_emiten]);
  return (
    <div className="container mt-3">
      <Heading Tag='h1' className='text-center'>Download Laporan Keuangan</Heading>
      <Heading Tag='h3' className='text-center mt-3'>{nama_emiten} ({kode_emiten})</Heading>
      <div className="flex justify-center mt-5 relative">
        <Button type='link' href='/'>
          <IconHome />
        </Button>
        <Button type='link' href={`/info/${kode_emiten}`}>
          <IconInfo />
        </Button>
      </div>
      <div className="flex justify-center mt-3">
        <Table dataThead={dataThead} classTr='bg-green-500 text-white' classTh='p-2' classTable='text-center'>
          <TableDownload data={dataLaporanKeuangan} />
        </Table>
      </div>
    </div>
  );
}
