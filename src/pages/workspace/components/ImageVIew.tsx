import { ImageFile } from "./file-upload/FileDisplay";
import { Button } from "@/components/core/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { Stage, Layer, Image } from "react-konva";
import { useImage } from "./image-canvas/useImage";

interface ImageViewProps {
  file: ImageFile;
}

export function ImageView({ file }: ImageViewProps) {
  const [image] = useImage(file.src);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const handleResize = useCallback(() => {
    const container = containerRef.current;
    if (container !== null) {
      const rect = container.getBoundingClientRect();
      setContainerWidth(rect.width);
      setContainerHeight(rect.height);
    } else {
      setContainerWidth(0);
      setContainerHeight(0);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <>
      <Button className="absolute z-10 top-1 right-1" variant="outline">
        Reset
      </Button>
      <div className="w-full h-full" ref={containerRef}>
        <Stage width={containerWidth} height={containerHeight} draggable>
          <Layer>
            <Image image={image ?? undefined} />
          </Layer>
        </Stage>
      </div>
    </>
  );
}
