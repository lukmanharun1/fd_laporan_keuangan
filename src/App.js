import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import DownloadLaporanKeuangan from './pages/DownloadLaporanKeuangan';
import Info from './pages/Info';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/download-laporan-keuangan/:kode_emiten/:nama_emiten' element={<DownloadLaporanKeuangan />} />
            <Route path='/info/:kode_emiten' element={<Info />} />
        </Routes> 
    </BrowserRouter>
  )
}
