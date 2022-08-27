import React from "react";
import format from "helpers/format";
import { IconDownloadSVG, IconInfoSVG } from "components/SVG";
import propTypes from "prop-types";
import { Button } from "components";
export default function Emiten(props) {
  const { data } = props;
  if (data.length === 0) {
    return (
      <tr>
        <td></td>
        <td colSpan={3} className="text-red-400 text-xl">
          Data Emiten Tidak ada
        </td>
      </tr>
    );
  }
  return (
    <>
      {data.map((data, i) => {
        return (
          <tr key={`emiten ke-${i}`}>
            <td>{++i}</td>
            <td className="p-1">{data.kode_emiten}</td>
            <td className="p-1">{data.nama_emiten}</td>
            <td className="p-1">{format(data.jumlah_saham)}</td>
            <td className="p-1">
              {/* icon info */}
              <Button
                type="link"
                href={`/info/${data.kode_emiten}`}
                className="inline-block mx-1"
              >
                <IconInfoSVG className="fill-green-500" />
              </Button>
              {/* icon download */}
              <Button
                type="link"
                href={`/download-laporan-keuangan/${data.kode_emiten}/${data.nama_emiten}`}
                className="inline-block mx-1"
              >
                <IconDownloadSVG className="fill-green-500" />
              </Button>
            </td>
          </tr>
        );
      })}
    </>
  );
}

Emiten.propTypes = {
  data: propTypes.arrayOf(propTypes.object),
};
