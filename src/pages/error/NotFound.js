import React from "react";
import { Heading, Button } from "components";
import { IllustrationPageNotFoundSVG } from "components/SVG";
document.title = "Page not found";
export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col">
      <IllustrationPageNotFoundSVG className="w-80 h-64 md:w-96 md:h-80" />
      <div className="w-80">
        <Heading className="text-center mb-3">Ups!</Heading>
        <p>
          Kami tidak dapat menemukan halaman yang Anda cari. Tenang, Anda masih
          bisa mencoba halaman lain.
        </p>
        <Button
          type="link"
          href="/"
          isPrimary
          className="mt-4 block text-center"
        >
          Kembali ke halaman utama
        </Button>
      </div>
    </div>
  );
}
