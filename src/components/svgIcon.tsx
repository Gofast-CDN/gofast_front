import React, { useEffect, useState } from 'react';

const SvgIcon = ({ color, svgContent, size }) => {
  const [svg, setSvg] = useState('');

  useEffect(() => {
    if (svgContent) {
      // On remplace toutes les occurrences de `fill` dans le SVG par la couleur passée en prop
      const svgWithColor = svgContent.replaceAll("currentColor", color).replaceAll('width="24"', `width=""${size}`).replaceAll('height="24"', `height=""${size}`);
      setSvg(svgWithColor);
    }
  }, [color, svgContent]);

  // Vérification de l'élément SVG avant l'injection
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
