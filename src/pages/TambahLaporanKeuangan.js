import React, { useState } from 'react';
import Heading from '../component/Heading';
import Button from '../component/Button';
import IconAdd from '../component/IconAdd';
import InputLabel from '../component/InputLabel';
import axios from 'axios';
import { SERVICE_LAPORAN_KEUANGAN } from '../config';
import Swal from 'sweetalert2';
import IconArrowBack from '../component/IconArrowBack';
import validateKodeEmiten from '../helper/validateKodeEmiten';
import Dropdown from '../component/Dropdown';
import Border from '../component/Border';
import { Navigate, useParams } from 'react-router-dom';

export default function TambahEmiten() {
  const params = useParams();
  const { kode_emiten } = params;
  const title = `Tambah Data Laporan Keuangan ${kode_emiten}`;
  document.title = title;
  const optionsJenisLaporan = {
    'Q1': 'Q1',
    'Q2': 'Q2',
    'Q3': 'Q3',
    'TAHUNAN': 'TAHUNAN',
  }
  const optionsTahun = {}; // isi dari tahun 2010 ~ tahun sekarang
  let tahun2010 = 2010;
  const selisihTahun = new Date().getFullYear() - tahun2010;
  for (let i = 0; i <= selisihTahun; i++) {
    optionsTahun[tahun2010] = tahun2010;
    tahun2010++;
  }

  return (
    <div className="mx-2">
      <Button type='link' href={`/info/${kode_emiten}`} className='md:ml-40 block absolute'>
        <IconArrowBack className='fill-green-500' />
      </Button>
      <Heading Tag='h2' className='text-center mt-3'>{title}</Heading>
      <div className="flex justify-center mt-3">
        <form action="/" method="post">
          {/* jenis laporan | tahun */}
          <div className="grid grid-cols-2 gap-x-2">
            <Heading Tag='h3'>Jenis Laporan</Heading>
            <Heading Tag='h3'>Tahun</Heading>
            <Dropdown options={optionsJenisLaporan} className='mt-2' />
            <Dropdown options={optionsTahun} reverse className='mt-2' />
          </div>
          {/* file laporan keuangan */}
          <InputLabel
            className='mt-2'
            accept='application/pdf'
            htmlFor='file_laporan_keuangan'
            classInput='w-80'
            classLabel='block'
            type='file'>
            File Laporan Keuangan <small className='text-red-400'>.pdf</small>
          </InputLabel>
          {/* neraca keuangan */}
          <Heading Tag='h3' className='mt-2'>
            Neraca Keuangan{" "}
            <small className='text-red-400'>*</small>
          </Heading>
          <Border className='p-2'>
             {/* aset */}
             <InputLabel
              htmlFor='aset'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Aset
            </InputLabel>
            {/* kas dan setara kas */}
            <InputLabel
              className='mt-2'
              htmlFor='kas_dan_setara_kas'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Kas Dan Setara Kas
            </InputLabel>
            {/* persediaan */}
            <InputLabel
              className='mt-2'
              htmlFor='persediaan'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Persediaan
            </InputLabel>
            {/* piutang */}
            <InputLabel
              className='mt-2'
              htmlFor='piutang'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Piutang
            </InputLabel>
            {/* aset lancar */}
            <InputLabel
              className='mt-2'
              htmlFor='aset_lancar'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Aset Lancar
            </InputLabel>
            {/* aset tidak lancar */}
            <InputLabel
              className='mt-2'
              htmlFor='aset_tidak_lancar'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Aset Tidak Lancar
            </InputLabel>
            {/* liabilitas jangka pendek */}
            <InputLabel
              className='mt-2'
              htmlFor='liabilitas_jangka_pendek'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Liabilitas Jangka Pendek
            </InputLabel>
            {/* liabilitas berbunga */}
            <InputLabel
              className='mt-2'
              htmlFor='liabilitas_berbunga'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Liabilitas Berbunga
            </InputLabel>
            {/* liabilitas jangka panjang */}
            <InputLabel
              className='mt-2'
              htmlFor='liabilitas_jangka_panjang'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Liabilitas Jangka Panjang
            </InputLabel>
            {/* ekuitas */}
            <InputLabel
              className='mt-2'
              htmlFor='ekuitas'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Ekuitas
            </InputLabel>
          </Border>
          {/* laba rugi */}
          <Heading Tag='h3' className='mt-2'>
            Laba Rugi{" "}
            <small className='text-red-400'>*</small>
          </Heading>
          <Border className="p-2">
            {/* pendapatan */}
             <InputLabel
              htmlFor='pendapatan'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Pendapatan
            </InputLabel>
            {/* laba kotor */}
            <InputLabel
              className='mt-2'
              htmlFor='laba_kotor'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Laba Kotor
            </InputLabel>
            {/* laba usaha */}
            <InputLabel
              className='mt-2'
              htmlFor='laba_usaha'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Laba Usaha
            </InputLabel>
            {/* laba sebelum pajak */}
             <InputLabel
              className='mt-2'
              htmlFor='laba_sebelum_pajak'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Laba Sebelum Pajak
            </InputLabel>
            {/* laba bersih */}
            <InputLabel
              className='mt-2'
              htmlFor='laba_bersih'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Laba Bersih
            </InputLabel>
          </Border>
          {/* arus kas */}
          <Heading Tag='h3' className='mt-2'>
            Arus Kas{" "}
            <small className='text-red-400'>*</small>
          </Heading>
          <Border className="p-2">
            {/* operasi */}
            <InputLabel
              htmlFor='operasi'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Operasi
            </InputLabel>
            {/* investasi */}
            <InputLabel
              className='mt-2'
              htmlFor='investasi'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Investasi
            </InputLabel>
            {/* pendanaan */}
            <InputLabel
              className='mt-2'
              htmlFor='pendanaan'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Pendanaan
            </InputLabel>
          </Border>
          {/* dividen */}
          <Heading Tag='h3' className='mt-2'>
            Dividen
          </Heading>
          <Border className="p-2">
            {/* rupiah */}
            <InputLabel
              className='mt-2'
              htmlFor='rupiah'
              classInput='w-72'
              classLabel='block'
              type='number'>
              Rupiah
            </InputLabel>
          </Border>
          <Button isPrimary type='submit' className='mt-2 w-80 mb-10'>
            <IconAdd className='inline fill-white' />
            Data Laporan Keuangan
          </Button>
        </form>
      </div>
    </div>
  )
}