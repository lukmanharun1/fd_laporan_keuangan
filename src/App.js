import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Emiten from './component/Emiten';

// const [emiten, setEmiten] = useState([]);


export default class App extends Component {

  state = {
    emitens: [],
    cariKodeEmiten: [],
    pagination: {},
  };
  handleCariKodeEmiten = async (e) => {
    const kodeEmiten = e.target.value;
    if (kodeEmiten.length > 0 && kodeEmiten.length >= 4) {
      const getEmiten = await axios.get(`http://localhost:4000/emiten?kode_emiten=${kodeEmiten}`);

    }
    // this.setState({ emitens: getEmiten.data.data.data });
  }
 
  async componentDidMount() {
    const getAllEmiten = await axios.get(`http://localhost:4000/emiten?page=1&per_page=1000`);
    const { pagination } = getAllEmiten.data.data;
    this.setState({ emitens: getAllEmiten.data.data.data, pagination });
  };
  render() {
    return (
     <div className="container mt-10">
        <h1 className='text-center text-3xl text-green-500 font-bold'>Daftar Saham Syariah</h1>
        <input type="text" placeholder='Cari Emiten' maxLength={50} className="w-auto mt-3 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mx-auto block mb-5" onChange={this.handleCariKodeEmiten} />
     
        <div className="flex justify-center">
            <table className="table-auto">
            <thead>
              <tr className='bg-green-500 text-white'>
                <th className='p-2'>No</th>
                <th className='p-2'>Kode Emiten</th>
                <th className='p-2'>Nama Emiten</th>
                <th className='p-2'>Jumlah Saham</th>
              </tr>
            </thead>
            <tbody>
              
             <Emiten emiten={this.state.emitens} />
            </tbody>
          </table>
        </div>
      
       
     </div>
    );
  }
}