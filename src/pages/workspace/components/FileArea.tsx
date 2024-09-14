import { useFileUpload } from "@/hooks/useFileUpload";
import { useRef, useState } from "react";
import { FileDisplay, ImageFile } from "./file-upload/FileDisplay";
import { PlusIcon } from "lucide-react";

const ACCEPTABLE_FILE_UPLOAD_FORMATS = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

export function FileArea() {
  const [selectedFileId, setSelectedFileId] = useState<string>();
  const { onChange, fileList } = useFileUpload();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUploadClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!inputRef || !inputRef.current) return;

    inputRef.current.click();
  };

  const handleOnFileSelect = (file: ImageFile) => {
    setSelectedFileId(file.id);
  };

  return (
    <div className="flex flex-col grow gap-2">
      <div>
        <input
          ref={inputRef}
          hidden
          type="file"
          accept={ACCEPTABLE_FILE_UPLOAD_FORMATS.join(",")}
          multiple
          onChange={onChange}
        />
        <div
          className="flex items-center justify-center w-[100px] h-[100px] border rounded border-dotted hover:border-gray-700 cursor-pointer mr-2"
          onClick={handleFileUploadClick}
        >
          <div className="flex items-center">
            <PlusIcon width={16} height={16} className="mr-1" />
            <span className="text-sm">Upload</span>
          </div>
        </div>
        <div className="flex gap-2">
          {fileList.map((item) => (
            <FileDisplay
              key={item.id}
              file={item}
              onClick={handleOnFileSelect}
            />
          ))}
        </div>
      </div>
      <div className="flex grow items-center justify-center rounded border">
        {selectedFileId ?? "Upload or select an image"}
      </div>
    </div>
  );
}
