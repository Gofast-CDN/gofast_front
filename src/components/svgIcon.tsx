import React, { useEffect, useState } from "react";

const SvgIcon = ({ color, svgContent, size }) => {
  const [svg, setSvg] = useState("");

  useEffect(() => {
    if (svgContent) {
      const svgWithColor = svgContent
        .replaceAll("currentColor", color)
        .replaceAll('width="24"', `width="${size}"`)
        .replaceAll('height="24"', `height="${size}"`);
      setSvg(svgWithColor);
    }
  }, [color, svgContent]);

  return (
    <div>
      {svg ? (
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <p>Chargement du SVG...</p>
      )}
    </div>
  );
};

export default SvgIcon;
