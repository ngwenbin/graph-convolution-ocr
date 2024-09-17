import { ImageFile } from "./file-upload/FileDisplay";
import { Button } from "@/components/core/button";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Stage, Layer, Image, Line } from "react-konva";
import { useImage } from "./image-canvas/useImage";
import Konva from "konva";

type BoundaryBoxType = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
  x4: number;
  y4: number;
};

interface ImageViewProps {
  file: ImageFile;
  boundaryBoxes?: BoundaryBoxType[];
}

export function ImageView({ file, boundaryBoxes }: ImageViewProps) {
  const { image, dimensions } = useImage(file.src);
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const { width: imageWidth, height: imageHeight } = dimensions ?? {};

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

  const reset = () => {
    if (stageRef.current) {
      stageRef.current.position({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    reset();
  }, [file.src]);

  const posX = imageWidth ? (containerWidth - imageWidth) / 2 : 0;
  const posY = imageHeight ? (containerHeight - imageHeight) / 2 : 0;

  const boxes: number[][] = useMemo(() => {
    if (boundaryBoxes) {
      return boundaryBoxes.map((boundary) => Object.values(boundary));
    }
    return [];
  }, [boundaryBoxes]);

  return (
    <>
      <Button
        className="absolute z-10 top-1 right-1"
        variant="outline"
        onClick={reset}
      >
        Reset
      </Button>
      <div className="w-full h-full" ref={containerRef}>
        <Stage
          ref={stageRef}
          width={containerWidth}
          height={containerHeight}
          draggable
        >
          <Layer>
            <Image stroke="red" image={image ?? undefined} x={posX} y={posY} />
          </Layer>
          {boxes.length > 0 ? (
            <Layer x={posX} y={posY}>
              {boxes.map((item) => (
                <Line points={item} stroke="green" strokeWidth={1} closed />
              ))}
            </Layer>
          ) : (
            <></>
          )}
        </Stage>
      </div>
    </>
  );
}
