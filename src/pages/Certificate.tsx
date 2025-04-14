import { useEffect, useRef, useState } from "react";
import CertificateImage from "../assets/certificate_template.jpg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Certificate() {
  const [data, setData] = useState({
    name: "",
    invoice: "",
    platform: "",
    date: "",
    brand: "",
    material: "",
    style: "",
    photoUrl: "",
  });
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const name = searchParams.get("name") || "";
    const invoice = searchParams.get("invoice") || "";
    const platform = searchParams.get("platform") || "";
    const date = searchParams.get("date") || "";
    const brand = searchParams.get("brand") || "";
    const material = searchParams.get("material") || "";
    const style = searchParams.get("style") || "";
    const photoUrl = searchParams.get("photoUrl") || "";

    setData({
      name,
      invoice,
      platform,
      date,
      brand,
      material,
      style,
      photoUrl,
    });

    const timeout = setTimeout(() => {
      if (certificateRef.current) {
        html2canvas(certificateRef.current, {
          scale: 2, // Supaya tidak blur
          useCORS: true, // Jika ada gambar dari domain lain
        }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pxToMm = (px: number) => (px * 25.4) / 96;
          const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: [pxToMm(canvas.width), pxToMm(canvas.height)],
          });
          pdf.addImage(imgData, "PNG", 0, 0, pxToMm(canvas.width), pxToMm(canvas.height));
          pdf.save("certificate.pdf");
        });
      }
    }, 500); // Delay sedikit supaya semua elemen pasti ter-render

    return () => clearTimeout(timeout);
  }, []);

  const { brand, date, material, name, style, invoice, photoUrl } = data;

  return (
    <section className="">
      <div
        className="absolute -z-10 opacity-0 pointer-events-none"
      >
        <div
          ref={certificateRef}
          id="certificate"
          className="w-[1200px] h-[800px] relative bg-white"
        >
          <img
            src={CertificateImage}
            alt="certificate"
            crossOrigin="anonymous"
            className="w-full h-full object-contain"
          />

          {/* Semua posisi di bawah ini gunakan ukuran tetap (tanpa md:, lg:) */}
          <div className="absolute top-[200px] left-[360px] text-[20px]">
            {name}
          </div>

          <div className="absolute top-[280px] left-[590px] text-[20px]">
            {brand}
          </div>

          <div className="absolute top-[350px] left-[610px] text-[20px]">
            {material}
          </div>

          <div className="absolute top-[425px] left-[675px] text-[20px]">
            {invoice}
          </div>

          <div className="absolute top-[495px] left-[675px] text-[20px]">
            {style}
          </div>

          <div className="absolute top-[290px] left-[140px] w-[240px] h-auto">
            {photoUrl && (
              <img
                src={photoUrl}
                alt="Style"
                className="w-full h-full object-contain"
              />
            )}
          </div>

          <div className="absolute top-[563px] left-[200px] text-[20px]">
            {date}
          </div>
        </div>
      </div>

      {/* <div className="absolute -z-10 opacity-0 pointer-events-none">
        <div
          ref={certificateRef}
          id="certificate"
          className="w-[375px] md:w-[700px] lg:w-[900px] h-full mx-auto relative"
        >
          <img
            src={CertificateImage}
            alt="certificate"
            crossOrigin="anonymous"
            className="w-full h-full object-contain"
          />

          <div className="absolute top-[3.75rem] left-28 md:top-[7.85rem] md:left-[13rem] lg:top-[10.15rem] lg:left-[17rem] text-[0.5rem] md:text-xs lg:text-base">
            {name}
          </div>

          <div className="absolute top-[5.5rem] left-[11.8rem] md:top-[11.1rem] md:left-[21.5rem] lg:top-[14.25rem] lg:left-[28rem] text-[0.5rem] md:text-xs lg:text-base">
            {brand}
          </div>

          <div className="absolute top-[7rem] left-48 md:top-[13.8rem] md:left-[22.5rem] lg:top-[17.85rem] lg:left-[29rem] text-[0.5rem] md:text-xs lg:text-base">
            {material}
          </div>

          <div className="absolute top-[8.5rem] left-[13.5rem] md:top-[16.55rem] md:left-[25rem] lg:top-[21.25rem] lg:left-[32rem] text-[0.5rem] md:text-xs lg:text-base">
            {invoice}
          </div>

          <div className="absolute top-[9.9rem] left-[13.5rem] md:top-[19.5rem] md:left-[25rem] lg:top-[24.85rem] lg:left-[32rem] text-[0.5rem] md:text-xs lg:text-base">
            {style}
          </div>

          <div className="absolute top-[6.15rem] lg:top-[15rem] left-[2.55rem] md:top-[11.25rem] md:left-[4.7rem] lg:left-[6.5rem] w-[80px] md:w-[150px] lg:w-[180px] h-auto">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Style"
                className="w-full h-full object-contain"
              />
            ) : null}
          </div>

          <div className="absolute top-[11.4rem] left-12 md:top-[22.25rem] md:left-[7rem] lg:top-[28.5rem] lg:left-36 text-[0.5rem] md:text-xs lg:text-base">
            {date}
          </div>
        </div>
      </div> */}
      {/* <div
        id="certificate"
        className="w-[375px] md:w-[700px] lg:w-[900px] h-full mx-auto relative"
      >
        <img
          src={CertificateImage}
          alt="certificate"
          crossOrigin="anonymous"
          className="w-full h-full object-contain"
        />

        <div className="absolute top-[3.85rem] left-28 md:top-[8rem] md:left-[13rem] lg:top-[10.25rem] lg:left-[17rem] text-xs lg:text-base">
          {name}
        </div>

        <div className="absolute top-[5.5rem] left-[11.8rem] md:top-[11.2rem] md:left-[21.5rem] lg:top-[14.25rem] lg:left-[28rem] text-xs lg:text-base">
          {brand}
        </div>

        <div className="absolute top-[7rem] left-48 md:top-[13.8rem] md:left-[22.5rem] lg:top-[18rem] lg:left-[29rem] text-xs lg:text-base">
          {material}
        </div>

        <div className="absolute top-[8.7rem] left-[13.5rem] md:top-[16.7rem] md:left-[25rem] lg:top-[21.5rem] lg:left-[32rem] text-xs lg:text-base">
          {invoice}
        </div>

        <div className="absolute top-[10.1rem] left-[13.5rem] md:top-[19.5rem] md:left-[25rem] lg:top-[25rem] lg:left-[32rem] text-xs lg:text-base">
          {style}
        </div>

        <div className="absolute top-28 lg:top-[15rem] left-11 md:top-[11.25rem] md:left-[4.7rem] lg:left-[6rem] w-16 md:w-[150px] lg:w-[180px] h-auto">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Style"
              className="w-full h-full object-contain"
            />
          ) : null}
        </div>

        <div className="absolute top-[11.5rem] left-12 md:top-[22.25rem] md:left-[7rem] lg:top-[28.5rem] lg:left-36 text-xs lg:text-base">
          {date}
        </div>
      </div> */}
    </section>
  );
}
