import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import IconDownload from '../component/IconDownload';
import { SERVICE_LAPORAN_KEUANGAN } from '../config';
import Dropdown from '../component/Dropdown';
import IconHome from '../component/IconHome';
import IconInfo from '../component/IconInfo';
import { Link } from 'react-router-dom';


export default function DownloadLaporanKeuangan() {
  let params = useParams();
  const { kode_emiten, nama_emiten } = params;
  useEffect(async () => {
    // ambil data laporan keuangan
    const laporanKeuangan = await axios.get(`${SERVICE_LAPORAN_KEUANGAN}/laporan-keuangan/${kode_emiten}`);
  });
  
  const dataKuartal = {
    'Kuartal 1': '03-31',
    'Kuartal 2': '06-30',
    'Kuartal 3': '09-30',
    'Tahunan': '12-31'
  };
  // data nya dari 2010 sampai tahun sekarang
  const dataTahun = {};
  let awalTahun = 2010;
  let tahunSekarang = new Date().getFullYear();
  const selisihTahun = tahunSekarang - awalTahun;
  for (let i = -1; i < selisihTahun; i++) {
    dataTahun[awalTahun] = awalTahun;
    awalTahun++;
  }
  // async function handleDownload(e) {
  //   e.preventDefault();
  //   const kuartal = e.target.kuartal.value;
  //   const tahun = e.target.tahun.value;
  //   try {
  //     const findLaporanKeuangan = await axios.get(`${SERVICE_LAPORAN_KEUANGAN}/laporan-keuangan/${kode_emiten}/${tahun}-${kuartal}`);
  //     if (findLaporanKeuangan.status === 200) {
  //       // buka tab baru
  //       window.open(findLaporanKeuangan.data.download);
  //     }
  //   } catch (error) {
  //     alert('laporan keuangan tidak ada');
  //   }
  // }
  return (
    <>
      <div className="container mt-10">
        <h1 className='text-center text-3xl text-green-500 font-bold'>Download Laporan Keuangan</h1>
        <h2 className="text-center text-xl text-green-500 font-bold mt-3">{nama_emiten} ({kode_emiten})</h2>
        {/* <form action="" method='post' className='flex justify-center mt-5 relative' onSubmit={handleDownload}>
          <Link to='/'>
            <IconHome className='absolute left-[34%]' />
          </Link>
          <Link to={`/info/${kode_emiten}`}>
            <IconInfo className='absolute left-[37%]' />
          </Link>
          <Dropdown name="kuartal" className='bg-green-500 text-white p-1' options={dataKuartal} />
          <Dropdown name="tahun" className='bg-green-500 text-white p-1 mx-2'options={dataTahun} reverse="true" />
          <button type='submit'>
            <IconDownload />
          </button>
        </form> */}
      </div>
    </>
  );
}
