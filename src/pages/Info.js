import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Dropdown from '../component/Dropdown';
import Heading from '../component/Heading';
import { SERVICE_LAPORAN_KEUANGAN } from '../config';
import TableLaporanKeuangan from '../component/TableLaporanKeuangan';
export default function Info() {
  // inisialisasi data laporan keuangan
  const [jenisLaporanKeuangan, setJenisLaporanKeuangan] = useState('neraca-keuangan');
  const [jenisTanggalLaporan, setJenisTanggalLaporan] = useState('TAHUNAN');
  const [namaEmiten, setNamaEmiten] = useState('Nama Emiten Tidak Ada');

  const [dataTbody, setDataTbody] = useState([]);
  const [optionsTanggalLaporan, setOptionsTanggalLaporan] = useState({
    'TAHUNAN': 'TAHUNAN',
    'Q3': 'Q3',
    'Q2': 'Q2',
    'Q1': 'Q1',
  })
  const optionsLaporanKeuangan = {
    'Neraca Keuangan': 'neraca-keuangan',
    'Laba Rugi': 'laba-rugi',
    'Arus Kas': 'arus-kas',
    'Dividen': 'dividen'
  };
  function handleOptionsLaporanKeuangan(e) {
    const { value } = e.target;
    const dataQ4 = {
      'TAHUNAN': 'TAHUNAN',
      'Q4': 'Q4',
      'Q3': 'Q3',
      'Q2': 'Q2',
      'Q1': 'Q1',
    }
    if (value === 'neraca-keuangan') {
      // neraca keuangan
      setOptionsTanggalLaporan({
        'TAHUNAN': 'TAHUNAN',
        'Q3': 'Q3',
        'Q2': 'Q2',
        'Q1': 'Q1',
      });
    } else if (value === 'laba-rugi') {
      // laba rugi
      setOptionsTanggalLaporan(dataQ4);
    } else if (value  === 'arus-kas') {
      // arus kas
      setOptionsTanggalLaporan(dataQ4);
    } else {
      // dividen
      setOptionsTanggalLaporan({
        'TAHUNAN': 'TAHUNAN'
      });
    }
    setJenisLaporanKeuangan(value);
  }

  function handleOptionsTanggalLaporan(e) {
    setJenisTanggalLaporan(e.target.value);
  }
  
  const params = useParams();
  const { kode_emiten } = params;
  useEffect(() => {
    document.title = `info laporan keuangan ${kode_emiten}`;
    // handle error neraca keuangan saat get Q4
    if (jenisLaporanKeuangan === 'neraca-keuangan' && jenisTanggalLaporan === 'Q4') {
      setJenisTanggalLaporan('TAHUNAN');
    }
    let urlLaporanKeuangan = `${SERVICE_LAPORAN_KEUANGAN}/${jenisLaporanKeuangan}/${kode_emiten}/${jenisTanggalLaporan}`;
    if (jenisLaporanKeuangan === 'dividen') {
      urlLaporanKeuangan = `${SERVICE_LAPORAN_KEUANGAN}/${jenisLaporanKeuangan}/${kode_emiten}`;
    }
    console.log(urlLaporanKeuangan);
    axios.get(urlLaporanKeuangan).then((laporanKeuangan) => {
      const { nama_emiten, data } = laporanKeuangan.data;
      setDataTbody(data);
      setNamaEmiten(nama_emiten);
    });
  }, [kode_emiten, jenisLaporanKeuangan, jenisTanggalLaporan]);
  return (
      <div className="mx-2">
        <Heading Tag='h3' className='text-center mt-3'>
          Laporan Keuangan {namaEmiten}
        </Heading>
        <Heading Tag='h4' className='mb-3'>Data Laporan Keuangan</Heading>
        <Dropdown options={optionsLaporanKeuangan} className='bg-green-500 p-2 text-white' onChange={handleOptionsLaporanKeuangan} />
        <Dropdown options={optionsTanggalLaporan} className='bg-green-500 p-2 text-white ml-3 mb-3' onChange={handleOptionsTanggalLaporan} />
        <Heading Tag='h5' className='inline-block ml-3'>Kode Emiten {kode_emiten}</Heading>
        {dataTbody.length > 0 && (
          <TableLaporanKeuangan dataTbody={dataTbody} namaLaporan={jenisLaporanKeuangan} jenisLaporan={jenisTanggalLaporan} />
        )}
      </div>
  );
}
