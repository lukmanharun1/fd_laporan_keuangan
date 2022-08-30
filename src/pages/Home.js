import React, { useState, useEffect } from "react";
import axios from "axios";
import Table, { TableEmiten } from "components/Table";
import { Heading, Button } from "components";
import { SERVICE_LAPORAN_KEUANGAN } from "config";
import queryParams from "helpers/queryParams";
import { IconAddSVG } from "components/SVG";
const dataThead = [
  "No",
  "Kode Emiten",
  "Nama Emiten",
  "Jumlah Saham",
  "Laporan Keuangan",
];

export default function Home() {
  const [dataEmiten, setDataEmiten] = useState([]);
  const [cariEmiten, setCariEmiten] = useState([]);
  const [timeoutId, setTimeoutId] = useState(0);
  const token = localStorage.getItem("token");

  const handleCariKodeEmiten = async (e) => {
    clearTimeout(timeoutId);
    // buat jeda 1/2 detik saat pencarian lalu ambil data di server
    const timeOutId = setTimeout(async () => {
      const cariEmiten = e.target.value;
      if (cariEmiten.length > 0 && cariEmiten.length <= 4) {
        // cari kode emiten
        const getEmiten = await axios.get(
          queryParams(`${SERVICE_LAPORAN_KEUANGAN}/emiten`, {
            kode_emiten: cariEmiten,
            page: 1,
            per_page: 1000,
          }),
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCariEmiten(getEmiten.data.data.data);
        setTimeoutId(timeOutId);
      } else if (cariEmiten.length > 4 && cariEmiten.length <= 50) {
        // cari emiten
        const getEmiten = await axios.get(
          queryParams(`${SERVICE_LAPORAN_KEUANGAN}/emiten`, {
            nama_emiten: cariEmiten,
            pag: 1,
            per_page: 20,
          }),
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCariEmiten(getEmiten.data.data.data);
        this.setState({ cariEmiten: getEmiten.data.data.data });
      } else {
        // kembalikan data semula
        setCariEmiten(dataEmiten);
      }
    }, 500);
    setTimeoutId(timeOutId);
  };
  const title = "Daftar Saham Syariah";
  document.title = title;
  useEffect(() => {
    axios
      .get(
        queryParams(`${SERVICE_LAPORAN_KEUANGAN}/emiten`, {
          page: 1,
          per_page: 1000,
        }),
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((getAllEmiten) => {
        const { data } = getAllEmiten.data.data;
        setDataEmiten(data);
        setCariEmiten(data);
      });
  }, []);
  return (
    <>
      <Heading Tag="h1" className="text-center mt-5">
        {title}
      </Heading>
      <div className="container mt-5 mx-2 md:mx-10">
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Cari Emiten"
            maxLength={50}
            className="m-3 p-3 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-green-500 focus:ring-1 placeholder:text-gray-500 focus:ring-green-500 -ml-[22%] w-56 md:w-64 h-10 justify-items-center"
            onChange={handleCariKodeEmiten}
          />
          <Button
            isPrimary
            href="/tambah-data-emiten"
            type="link"
            className="mt-3 h-10"
          >
            <IconAddSVG className="inline fill-white" />
            Data Emiten
          </Button>
        </div>
        <div className="flex justify-center">
          <Table
            dataThead={dataThead}
            classTr="bg-green-500 text-white"
            classTh="p-2"
          >
            <TableEmiten data={cariEmiten} />
          </Table>
        </div>
      </div>
    </>
  );
}
