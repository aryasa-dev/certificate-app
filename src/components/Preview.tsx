import { ChangeEvent } from "react";
import { FormProps } from "../types";
import CertificateImage from "../assets/certificate_template.jpg";

type Props = {
  formData: FormProps;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onGenerate: () => void;
  showPreview: boolean;
  photoUrl: string;
  downloadPdf: () => void
};

export function Preview({
  formData,
  onChange,
  onGenerate,
  photoUrl,
  showPreview,
  downloadPdf
}: Props) {
  const {
    brand,
    invoice,
    // certificateUrl,
    date,
    material,
    name,
    style,
  } = formData;

  // function handleDownload() {
  //   const element = document.getElementById("certificate");
  //   if (!element) return;

  //   html2canvas(element, {
  //     scale: 2,
  //     useCORS: true,
  //   }).then((canvas) => {
  //     const link = document.createElement("a");
  //     link.download = "certificate.png";
  //     link.href = canvas.toDataURL("image/png");
  //     link.click();
  //   });
  // }

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full md:w-1/2">
      {/* <div ref={certificateRef} className="w-[300px] lg:w-[350px] relative mb-10">
        <img
          src={CertificateImage}
          alt="certificate"
          className="w-full h-full object-cover"
        />

        {showPreview && (
          <>
            <div className="absolute top-[3rem] left-24 md:top-[50px] lg:top-[45px] md:left-24 lg:left-[6.5rem] text-[0.6rem]">
              {name}
            </div>

            <div className="absolute top-[4.3rem] left-[9.5rem] md:top-[70px] lg:top-[80px] md:left-[9.5rem] lg:left-44 text-[0.6rem]">
              {brand}
            </div>

            <div className="absolute top-[5.5rem] left-[10rem] md:top-[90px] lg:top-[97px] md:left-40 lg:left-[11.5rem] text-[0.6rem]">
              {material}
            </div>

            <div className="absolute top-[6.6rem] left-44 md:top-[110px] lg:top-[120px] md:left-44 lg:left-[12.5rem] text-[0.6rem]">
              {invoice}
            </div>

            <div className="absolute top-[7.85rem] left-44 md:top-[130px] lg:top-[145px] md:left-44 lg:left-[12.5rem] text-[0.6rem]">
              {style}
            </div>

            <div className="absolute top-20 left-9 md:top-[80px] lg:top-[95px] md:left-8 lg:left-9 w-14 h-auto md:w-[60px] lg:w-[80px] md:h-[55px] lg:h-[65px]">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Style"
                  className="w-full h-full object-contain"
                />
              ) : null}
            </div>

            <div className="absolute top-[9rem] left-10 md:top-[148px] lg:top-[165px] md:left-9 lg:left-12 text-[0.6rem]">
              {date}
            </div>
          </>
        )}
      </div> */}
      <div className="w-[300px] lg:w-[350px] relative mb-10">
        <img
          src={CertificateImage}
          alt="certificate"
          className="w-full h-full object-cover"
        />

        {showPreview && (
          <>
            {/* Name */}
            <div className="absolute top-[3rem] left-24 md:top-[50px] lg:top-[60px] md:left-24 lg:left-28 text-[0.6rem]">
              {name}
            </div>

            {/* Brand */}
            <div className="absolute top-[4.3rem] left-[9.5rem] md:top-[70px] lg:top-[85px] md:left-[9.5rem] lg:left-44 text-[0.6rem]">
              {brand}
            </div>

            {/* Material */}
            <div className="absolute top-[5.5rem] left-[10rem] md:top-[90px] lg:top-[106px] md:left-40 lg:left-44 text-[0.6rem]">
              {material}
            </div>

            {/* Invoice */}
            <div className="absolute top-[6.6rem] left-44 md:top-[110px] lg:top-[130px] md:left-44 lg:left-[12.5rem] text-[0.6rem]">
              {invoice}
            </div>

            {/* Serial Number */}
            <div className="absolute top-[7.85rem] left-44 md:top-[130px] lg:top-[155px] md:left-44 lg:left-[12.5rem] text-[0.6rem]">
              {style}
            </div>

            {/* Photo of Style# */}
            <div className="absolute top-20 left-9 md:top-[80px] lg:top-[95px] md:left-8 lg:left-9 w-14 h-auto md:w-[60px] lg:w-[80px] md:h-[60px] lg:h-[70px]">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Style"
                  className="w-full h-full object-contain"
                />
              ) : null}
            </div>

            {/* Date */}
            <div className="absolute top-[9rem] left-10 md:top-[148px] lg:top-[175px] md:left-9 lg:left-11 text-[0.6rem]">
              {date}
            </div>
          </>
        )}
      </div>

      <label>
        Certificate URL:
        <textarea
          name="certificateUrl"
          value={formData.certificateUrl}
          onChange={onChange}
          className="border w-full px-2"
        />
      </label>

      <div className="flex gap-2 mt-2">
        <button className="border px-2" onClick={onGenerate}>
          Generate
        </button>
        <button className="border px-2" onClick={downloadPdf}>
          Certificate
        </button>
        {/* <Link to={formData.certificateUrl}>
        </Link> */}
      </div>
    </div>
  );
}
