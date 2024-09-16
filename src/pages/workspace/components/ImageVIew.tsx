import { ImageFile } from "./file-upload/FileDisplay";
import { Button } from "@/components/core/button";
import { useCallback, useEffect, useRef } from "react";
import PinchZoom from "react-quick-pinch-zoom";
import QuickPinchZoom, {
  make3dTransformValue,
  UpdateAction,
} from "react-quick-pinch-zoom";

interface ImageViewProps {
  file: ImageFile;
}

export function ImageView({ file }: ImageViewProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<PinchZoom>(null);

  const onUpdate = useCallback(({ x, y, scale }: UpdateAction) => {
    if (imgRef.current) {
      const value = make3dTransformValue({ x, y, scale });

      imgRef.current.style.setProperty("transform", value);
    }
  }, []);

  const reset = () => {
    if (containerRef.current) {
      containerRef.current.scaleTo({ x: 0, y: 0, scale: 1, animated: false });
    }
  };

  useEffect(() => {
    reset();
  }, [file.id]);

  return (
    <>
      <Button
        className="absolute z-10 top-1 right-1"
        variant="outline"
        onClick={reset}
      >
        Reset
      </Button>
      <QuickPinchZoom centerContained onUpdate={onUpdate} ref={containerRef}>
        <img
          ref={imgRef}
          className="w-full h-full "
          src={file.src}
          alt="selected-image"
        />
      </QuickPinchZoom>
    </>
  );
}
