import React, { Component } from 'react'

import format from '../helper/format';
import InfoIcon from '../asset/icon/info.svg';
import downloadIcon from '../asset/icon/download.svg';
export default class Emiten extends Component {
   
  render() {
    const { emiten } = this.props;
    return (
        <>
          {
            emiten.map((data, i) => {
              return (
                <tr key={`emiten ke-${i}`}>
                  <td >{++i}</td>
                  <td className='p-1'>{data.kode_emiten}</td>
                  <td className='p-1'>{data.nama_emiten}</td>
                  <td className='p-1'>{format(data.jumlah_saham)}</td>
                  <td className='p-1'>
                    <a href={`/info/${data.kode_emiten}`} className="inline-block mx-1 fill-green-500">
                     <img src={InfoIcon} alt={`info laporan keuangan ${data.nama_emiten}`} />
                    </a>
                    <a href={`/download-laporan-keuangan/${data.kode_emiten}`} className="inline-block mx-1">
                      <img src={downloadIcon} alt={`/download laporan keuangan ${data.nama_emiten}`} />
                    </a>
                  </td>
                </tr>
              );
            })
          }
        </>
    );
  }
}
