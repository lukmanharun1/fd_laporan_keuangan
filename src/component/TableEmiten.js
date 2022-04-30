import React from 'react';
import format from '../helper/format';
import IconDownload from './IconDownload';
import IconInfo from './IconInfo';
import propTypes from 'prop-types';
import Button from './Button';
export default function TableEmiten(props) {
  const { data } = props;
  if (data.length === 0) {
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
                <Button type='link' href={`/info/${data.kode_emiten}`} className="inline-block mx-1">
                  <IconInfo />
                </Button>
                {/* icon download */}
                <Button type='link' href={`/download-laporan-keuangan/${data.kode_emiten}/${data.nama_emiten}`} className="inline-block mx-1">
                  <IconDownload />
                </Button>
              </td>
            </tr>
          );
        })
      }
    </>
  );
}

TableEmiten.propTypes = {
  data: propTypes.arrayOf(propTypes.object)
}