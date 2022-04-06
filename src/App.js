import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Emiten from './component/Emiten';
import env from "react-dotenv";
import queryParams from './helper/queryParams';
const { SERVICE_LAPORAN_KEUANGAN } = env;

export default class App extends Component {

  state = {
    emitens: [],
    cariEmiten: [],
    pagination: {},
    timeOutId: 0
  };
  handleCariKodeEmiten = async (e) => {
    clearTimeout(this.state.timeOutId);
    // buat jeda setengah detik saat pencarian lalu ambil data di server
    const timeOutId = setTimeout(async () => {
      const cariEmiten = e.target.value;
      if (cariEmiten.length > 0 && cariEmiten.length <= 4) {
        // cari kode emiten
          const getEmiten = await axios.get(queryParams(`${SERVICE_LAPORAN_KEUANGAN}/emiten`, {
            kode_emiten: cariEmiten,
            page: 1,
            per_page: 20
          }));
          this.setState({ cariEmiten: getEmiten.data.data.data });
        this.setState({ timeOutId });

      } else if (cariEmiten.length > 4 && cariEmiten.length <= 50) {
        // cari emiten
        const getEmiten = await axios.get(queryParams(`${SERVICE_LAPORAN_KEUANGAN}/emiten`, {
          nama_emiten: cariEmiten,
          pag: 1,
          per_page: 20
        }));
        this.setState({ cariEmiten: getEmiten.data.data.data });
      } else {
        // kembalikan data semula
        this.setState({ cariEmiten: this.state.emitens })
      }
    }, 500);
    this.setState({ timeOutId });
  }

  async componentDidMount() {
    // ambil seluruh data emiten
    const getAllEmiten = await axios.get(queryParams(`${SERVICE_LAPORAN_KEUANGAN}/emiten`, {
      page: 1,
      per_page: 20
    }));;
    const { pagination } = getAllEmiten.data.data;
    this.setState({ 
                    emitens: getAllEmiten.data.data.data,
                    cariEmiten: getAllEmiten.data.data.data,
                    pagination
                  });
  };
  render() {
    return (
     <div className="container mt-10">
        <h1 className='text-center text-3xl text-green-500 font-bold'>Daftar Saham Syariah</h1>
     
        <div className="flex justify-center">
            <table className="table-auto">
            <thead>
              <tr>
                <th colSpan={2}>
                <input type="text" placeholder='Cari Emiten' maxLength={50} className="mt-3 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 mb-2" onChange={this.handleCariKodeEmiten} />
                </th>
              </tr>
              <tr className='bg-green-500 text-white'>
                <th>No</th>
                <th>Kode Emiten</th>
                <th className='p-2'>Nama Emiten</th>
                <th className='p-2'>Jumlah Saham</th>
                <th className='p-2'>Laporan Keuangan</th>
              </tr>
            </thead>
            <tbody>
              
             <Emiten emiten={this.state.cariEmiten} />
            </tbody>
          </table>
        </div>
     </div>
    );
  }
}