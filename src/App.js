import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "pages/Home";
import DownloadLaporanKeuangan from "pages/DownloadLaporanKeuangan";
import Info from "pages/Info";
import TambahEmiten from "pages/TambahEmiten";
import TambahLaporanKeuangan from "pages/TambahLaporanKeuangan";

import Register from "pages/auth/Register";
import Activation from "pages/auth/Activation";
import NotFound from "pages/error/NotFound";
import Login from "pages/auth/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/download-laporan-keuangan/:kode_emiten/:nama_emiten"
          element={<DownloadLaporanKeuangan />}
        />
        <Route path="/info/:kode_emiten" element={<Info />} />
        <Route path="/tambah-data-emiten" element={<TambahEmiten />} />
        <Route
          path="/tambah-data-laporan-keuangan/:kode_emiten"
          element={<TambahLaporanKeuangan />}
        />

        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/activation/:token" element={<Activation />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
