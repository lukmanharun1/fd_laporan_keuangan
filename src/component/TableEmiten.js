import React, { Component } from 'react'

import format from '../helper/format';
import IconDownload from './IconDownload';
import IconInfo from './IconInfo';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
export default class TableEmiten extends Component {
   
  render() {
    const { data } = this.props;
    if (data.length == 0) {
      return (
        <tr>
          <td></td>
          <td colSpan={3} className="text-red-400 text-xl">Data Emiten Tidak ada</td>
        </tr>
      )
    }
    return (
        <>
          {
            
            data.map((data, i) => {
              return (
                <tr key={`emiten ke-${i}`}>
                  <td >{++i}</td>
                  <td className='p-1'>{data.kode_emiten}</td>
                  <td className='p-1'>{data.nama_emiten}</td>
                  <td className='p-1'>{format(data.jumlah_saham)}</td>
                  <td className='p-1'>
                    {/* icon info */}
                    <Link to={`/info/${data.kode_emiten}`} className="inline-block mx-1">
                      <IconInfo />
                    </Link>
                    {/* icon download */}
                    <Link to={`/download-laporan-keuangan/${data.kode_emiten}/${data.nama_emiten}`} className="inline-block mx-1">
                      <IconDownload />
                    </Link>
                  </td>
                </tr>
              );
            })
          }
        </>
    );
  }
}

TableEmiten.propTypes = {
  data: propTypes.arrayOf(propTypes.object)
}