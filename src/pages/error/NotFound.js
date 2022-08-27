import React from "react";
import { Heading, Button } from "components";
document.title = "Page not found";
export default function NotFound() {
  return (
    <div className="flex justify-center flex-col">
      <Heading Tag="h1">404</Heading>
      <Heading Tag="h3">
        Ups! Kami tidak dapat menemukan halaman yang Anda cari. <br /> Tenang,
        Anda masih bisa mencoba halaman lain.
      </Heading>
      <Button type="link" href="/" isPrimary>
        Back to home
      </Button>
    </div>
  );
}
