import { ImageFile } from "@/pages/workspace/components/file-upload/FileDisplay";
import { nanoid } from "nanoid";
import { useState } from "react";

export function useFileUpload() {
  const [fileList, setFileList] = useState<ImageFile[]>([]);

  const handleOnFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const formattedFiles: ImageFile[] = Array.from(files).map((fileItem) => ({
        id: nanoid(),
        src: URL.createObjectURL(fileItem),
        name: fileItem.name,
      }));

      setFileList((curr) => [...curr, ...formattedFiles]);
    }
  };

  return {
    fileList,
    setFileList,
    onChange: handleOnFileChange,
  };
}
