import React from 'react'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from './pages/Home';
import DownloadLaporanKeuangan from './pages/DownloadLaporanKeuangan';
import Info from './pages/Info';
import TambahEmiten from './pages/TambahEmiten';
import TambahLaporanKeuangan from './pages/TambahLaporanKeuangan';
export default function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/download-laporan-keuangan/:kode_emiten/:nama_emiten' element={<DownloadLaporanKeuangan />} />
          <Route path='/info/:kode_emiten' element={<Info />} />
          <Route path='/tambah-data-emiten' element={<TambahEmiten />} />
          <Route path='/tambah-data-laporan-keuangan/:kode_emiten' element={<TambahLaporanKeuangan />} /> 
        </Routes> 
    </Router>
  )
}
