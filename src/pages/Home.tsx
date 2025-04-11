import { ChangeEvent } from "react";
import { Form } from "../components/Form";
import { Preview } from "../components/Preview";
import { FormProps } from "../types";

type Props = {
  formData: FormProps;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onGenerate: () => void;
  showPreview: boolean;
  photoUrl: string;
};

export default function Home({
  formData,
  onChange,
  onGenerate,
  showPreview,
  photoUrl,
}: Props) {
  return (
    <div className="flex flex-col items-center p-4 text-sm">
      <h1 className="text-xl font-bold">- WANG101 -</h1>
      <p className="mb-4">Certificate Generator</p>

      <div className="flex border border-black divide-x w-[800px]">
        {/* Form */}
        <Form formData={formData} onChange={onChange} />

        {/* Preview */}
        <Preview
          formData={formData}
          onChange={onChange}
          onGenerate={onGenerate}
          showPreview={showPreview}
          photoUrl={photoUrl}
        />
      </div>
    </div>
  );
}
