export interface ImageFile {
  id: string;
  src: string;
  name: string;
}

interface FileDisplayProps {
  file: ImageFile;
  onClick: (file: ImageFile) => void;
}

export function FileDisplay({ file, onClick }: FileDisplayProps) {
  const { src } = file;

  const handleClick = () => {
    onClick(file);
  };

  return (
    <div
      className="w-[100px] h-[100px] border rounded hover:border-black"
      onClick={handleClick}
    >
      <img src={src} className="object-contain w-full h-full" />
    </div>
  );
}
