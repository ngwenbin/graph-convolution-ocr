import { useEffect, useState } from "react";

export function useImage(url: string) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(
    function () {
      if (!url) return;
      const img = new Image();
      img.src = url;

      function onload() {
        setImage(img);
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

  return [image];
}
