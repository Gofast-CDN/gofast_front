import React, { useEffect, useState } from "react";

interface SvgIconProps {
  color: string;
  svgContent: string;
  size: number | string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ color, svgContent, size }) => {
  const [svg, setSvg] = useState("");

  useEffect(() => {
    if (svgContent) {
      const svgWithColor = svgContent
        .replace("currentColor", color)
        .replace('width="24"', `width="${size}"`)
        .replace('height="24"', `height="${size}"`);
      setSvg(svgWithColor);
    }
  }, [color, svgContent, size]); // Ajout de size aux dépendances

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
