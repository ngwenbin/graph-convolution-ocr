import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { ImageFile } from "./file-upload/FileDisplay";
import { Button } from "@/components/core/button";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface ImageViewProps {
  file: ImageFile;
}

export function ImageView({ file }: ImageViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const [imageNaturalWidth, setImageNaturalWidth] = useState<number>(0);
  const [imageNaturalHeight, setImageNaturalHeight] = useState<number>(0);

  const imageScale = useMemo(() => {
    if (
      containerWidth === 0 ||
      containerHeight === 0 ||
      imageNaturalWidth === 0 ||
      imageNaturalHeight === 0
    )
      return 0;
    const scale = Math.min(
      containerWidth / imageNaturalWidth,
      containerHeight / imageNaturalHeight
    );
    return scale;
  }, [containerWidth, containerHeight, imageNaturalWidth, imageNaturalHeight]);

  const handleResize = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
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

  const handleImageOnLoad = (image: HTMLImageElement) => {
    setImageNaturalWidth(image.naturalWidth);
    setImageNaturalHeight(image.naturalHeight);
  };

  useEffect(() => {
    setLoading(true);
    const image = new Image();
    image.onload = async () => {
      handleImageOnLoad(image);
      await new Promise((res) => {
        setTimeout(res, 500);
      });
      setLoading(false);
    };
    image.src = file.src;
  }, [file.src]);

  return (
    <div className="w-full h-full bg-gray-100" ref={containerRef}>
      {!loading && imageScale > 0 && (
        <TransformWrapper
          key={`${containerWidth}x${containerHeight}`}
          initialScale={imageScale}
          minScale={imageScale * 0.8}
          centerOnInit
          pinch={{
            disabled: true,
          }}
          doubleClick={{
            mode: "reset",
          }}
        >
          {({ resetTransform }) => (
            <>
              <Button
                variant="outline"
                className="absolute top-1 right-1 z-10"
                onClick={() => resetTransform()}
              >
                Reset
              </Button>
              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={file.src}
                  alt="selected-image"
                  onLoad={() => resetTransform()}
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      )}
    </div>
  );
}
