import { useEffect, useState } from "react";

interface ImageDimensions {
  width: number;
  height: number;
}

export function useImage(url: string) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [dimensions, setDimensions] = useState<ImageDimensions>();

  useEffect(
    function () {
      if (!url) return;
      const img = new Image();
      img.src = url;

      function onload() {
        setImage(img);
        setDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      }

      function onerror() {
        setImage(null);
      }

      img.addEventListener("load", onload);
      img.addEventListener("error", onerror);

      return function cleanup() {
        img.removeEventListener("load", onload);
        img.removeEventListener("error", onerror);
      };
    },
    [url]
  );

  return { image, dimensions };
}
