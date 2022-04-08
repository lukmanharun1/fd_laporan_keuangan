import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import DownloadLaporanKeuangan from './pages/DownloadLaporanKeuangan';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/download-laporan-keuangan/:kode_emiten/:nama_emiten' element={<DownloadLaporanKeuangan />} />
        </Routes> 
    </BrowserRouter>
  )
}
