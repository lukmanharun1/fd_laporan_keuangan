import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from '../component/Table';
import TableDownload from '../component/TableDownload';
import { SERVICE_LAPORAN_KEUANGAN } from '../config';
import IconHome from '../component/IconHome';
import IconInfo from '../component/IconInfo';
import { Link } from 'react-router-dom';
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
    <>
      <div className="container mt-10">
        <h1 className='text-center text-3xl text-green-500 font-bold'>Download Laporan Keuangan</h1>
        <h2 className="text-center text-xl text-green-500 font-bold mt-3">{nama_emiten} ({kode_emiten})</h2>
       <div className="flex justify-center mt-5 relative">
        <Link to='/'>
          <IconHome  />
        </Link>
        <Link to={`/info/${kode_emiten}`}>
          <IconInfo  />
        </Link>
       </div>
        <div className="flex justify-center mt-3">
          <Table dataThead={dataThead} classTr='bg-green-500 text-white' classTh='p-2' classTable='text-center'>
            <TableDownload data={dataLaporanKeuangan} />
          </Table>
        </div>
      </div>
    </>
  );
}
