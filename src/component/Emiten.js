import React, { Component } from 'react'

import format from '../helper/format';
import InfoIcon from '../asset/icon/info.svg';
import IconDownload from './IconDownload';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
export default class Emiten extends Component {
   
  render() {
    const { data } = this.props;
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
                      <img src={InfoIcon} alt={`info laporan keuangan ${data.nama_emiten}`} />
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

Emiten.propTypes = {
  data: propTypes.arrayOf(propTypes.object)
}