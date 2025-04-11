import { ChangeEvent } from "react";
import { FormProps } from "../types";
import CertificateImage from "../assets/certificate_template.jpg";
import { Link } from "react-router-dom";

type Props = {
  formData: FormProps;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onGenerate: () => void;
  showPreview: boolean;
  photoUrl: string
};

export function Preview({
  formData,
  onChange,
  onGenerate,
  photoUrl,
  showPreview,
}: Props) {
  const {
    brand,
    certificateUrl,
    date,
    material,
    name,
    style,
  } = formData;

  return (
    <div className="flex flex-col items-center justify-center p-4 w-1/2">
      <div className="w-[350px] relative mb-10">
        <img
          src={CertificateImage}
          alt="certificate"
          className="w-full h-full object-cover"
        />

        {showPreview && (
          <>
            {/* Name */}
            <div className="absolute top-[60px] left-28 text-[0.6rem]">
              {name}
            </div>

            {/* Brand */}
            <div className="absolute top-[85px] left-44 text-[0.6rem]">
              {brand}
            </div>

            {/* Material */}
            <div className="absolute top-[106px] left-44 text-[0.6rem]">
              {material}
            </div>

            {/* Certificate URL */}
            <div className="absolute top-[130px] left-[12.5rem] text-[0.6rem]">
              <span className="whitespace-nowrap overflow-hidden text-ellipsis block max-w-[110px]">
                {certificateUrl || "[generated]"}
              </span>
            </div>

            {/* Serial Number */}
            <div className="absolute top-[155px] left-[12.5rem] text-[0.6rem]">
              {style}
            </div>

            {/* Photo of Style# */}
            <div className="absolute top-[95px] left-9 w-[80px] h-[70px]">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Style"
                  className="w-full h-full object-contain"
                />
              ) : null}
            </div>

            {/* Date */}
            <div className="absolute top-[175px] left-11 text-[0.6rem]">
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
        <Link to={formData.certificateUrl}>
          <button className="border px-2">Certificate</button>
        </Link>
      </div>
    </div>
  );
}
