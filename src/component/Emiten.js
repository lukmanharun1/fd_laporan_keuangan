import React, { Component } from 'react'

import format from '../helper/format';
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
                </tr>
              );
            })
          }
        </>
    );
  }
}
