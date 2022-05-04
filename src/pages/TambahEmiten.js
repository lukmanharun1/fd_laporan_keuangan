import React, { useState } from 'react';
import Heading from '../component/Heading';
import Button from '../component/Button';
import IconAdd from '../component/IconAdd';
import axios from 'axios';
import { SERVICE_LAPORAN_KEUANGAN } from '../config';
import Swal from 'sweetalert2';
import IconArrowBack from '../component/IconArrowBack';
import validateKodeEmiten from '../helper/validateKodeEmiten';
import { Navigate } from 'react-router-dom';

export default function TambahEmiten() {
  const initialState = {
    nama_emiten: '',
    kode_emiten: '',
    jumlah_saham: '',
  }
 
  const [validation, setValidation] = useState(initialState);
  const [isBackToHome, setIsBackToHome] = useState(false);
  async function handleTambahDataEmiten(e) {
    e.preventDefault();
    // inisialisasi
    const namaEmiten = e.target.nama_emiten.value;
    const kodeEmiten = e.target.kode_emiten.value;
    const jumlahSaham = e.target.jumlah_saham.value;

    // cek nama emiten harus panjang lebih dari 10 huruf
    if (namaEmiten.length < 10) {
      initialState.nama_emiten = 'Nama Emiten Harus Lebih dari 10 huruf';
      setValidation({
        ...initialState
      });
    } else {
      initialState.nama_emiten = '';
      setValidation({
        ...initialState
      });
    }

    // cek kode emiten harus panjang 4 dan harus alphabert
    const isValidKodeEmiten = validateKodeEmiten(kodeEmiten); // false | string
    if (typeof isValidKodeEmiten === 'string') {
      initialState.kode_emiten = isValidKodeEmiten
      setValidation({
        ...initialState,
      });
    } else {
      initialState.kode_emiten = '';
      setValidation({
        ...initialState,
      });
    }
    // cek jumlah saham harus lebih dari 10 juta
    if (jumlahSaham < 10_000_000) {
      initialState.jumlah_saham = 'Jumlah Saham Harus Lebih Dari 10 Juta';
      setValidation({
        ...initialState,
      });
    } else {
      initialState.jumlah_saham = '';
      setValidation({
        ...initialState,
      });
    }

    // cek seluruh validation dan send server
    if (!initialState.nama_emiten && !initialState.kode_emiten && !initialState.jumlah_saham) {
      try {
        const createEmiten = await axios.post(`${SERVICE_LAPORAN_KEUANGAN}/emiten`, {
          nama_emiten: namaEmiten,
          kode_emiten: kodeEmiten,
          jumlah_saham: jumlahSaham
        });
        Swal.fire({
            customClass: {
              confirmButton: 'p-2 text-white bg-green-500 rounded-sm',
            },
            buttonsStyling: false,
            title: createEmiten.data.message,
            confirmButtonText: 'Okey Berhasil',
            icon: 'success',
          });
        setIsBackToHome(true);
      } catch (error) {
        Swal.fire({
          customClass: {
            confirmButton: 'p-2 text-white bg-red-500 rounded-sm',
          },
          buttonsStyling: false,
          title: 'Data Emiten Gagal Ditambahkan',
          confirmButtonText: 'Maaf Sayang Sekali',
          icon: 'error',
        })
      }
    }
  }
  const title = 'Tambah Data Emiten Syariah';
  document.title = title;
  return (
    <div className="mx-2">
      {isBackToHome && <Navigate to={'/'}  />}
      <Button type='link' href='/' className='md:ml-40 block absolute'>
        <IconArrowBack className='fill-green-500' />
      </Button>
      <Heading Tag='h1' className='text-center mt-3'>{title}</Heading>
      <div className="flex justify-center mt-3">
        <form action="/" method="post" onSubmit={handleTambahDataEmiten}>
          {/* nama emiten */}
          <label htmlFor="nama_emiten" className='block mt-3 text-green-500 font-semibold text-lg'>Nama Emiten</label>
          <input
            type="text"
            id='nama_emiten'
            maxLength={255}
            placeholder='contoh: PT TELKOM INDONESIA TBK'
            className='block p-2 w-80 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500' />
          {/* validation nama emiten */}
          <Heading Tag='h5' color='text-red-400'>{validation.nama_emiten}</Heading>
          {/* kode emiten */}
          <label htmlFor="kode_emiten" className='block mt-3 text-green-500 font-semibold text-lg'>Kode Emiten</label>
          <input 
            type="text"
            id='kode_emiten'
            maxLength={4}
            placeholder='contoh: TLKM'
            className='block p-2 w-80 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500' />
           {/* validation kode emiten */}
          <Heading Tag='h5' color='text-red-400'>{validation.kode_emiten}</Heading>
          {/* jumlah saham */}
          <label htmlFor="jumlah_saham" className='block mt-3 text-green-500 font-semibold text-lg'>Jumlah Saham</label>
          <input
            type="number"
            id='jumlah_saham'
            placeholder='minimal 10 juta'
            className='block p-2 w-80 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500' />
          {/* validation jumlah saham */}
          <Heading Tag='h5' color='text-red-400'>{validation.jumlah_saham}</Heading>
          <Button isPrimary type='submit' className='mt-3 w-80'>
            <IconAdd className='inline fill-white' />
            Data Emiten
          </Button>
        </form>
      </div>
    </div>
  )
}
