import React from "react";
import IconDownload from "./IconDownload";
import propTypes from "prop-types";
import Button from "./Button";
export default function TableDownload(props) {
  const { data } = props;
  if (Object.keys(data).length === 0) {
    return (
      <tr>
        <td colSpan={2} className="text-red-400 text-xl">
          Data Laporan Keuangan Tidak ada
        </td>
      </tr>
    );
  }
  return (
    <tr>
      <td className="p-1">{data.nama_file}</td>
      <td className="p-1">
        {/* icon download */}
        <Button
          type="link"
          isExternal
          href={data.download}
          target="_blank"
          className="inline-block mx-1"
        >
          <IconDownload />
        </Button>
      </td>
    </tr>
  );
}

TableDownload.propTypes = {
  data: propTypes.object.isRequired,
};
