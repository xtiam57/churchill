import { useState, useEffect } from 'react';

export function useGetImage({ filepath }) {
  const [bgBase64, setBgBase64] = useState(null);

  useEffect(() => {
    if (filepath) {
      if (typeof filepath === 'string' && filepath.startsWith('data:image/')) {
        setBgBase64(filepath); // Ya es base64, úsalo directo
      } else {
        window.electronAPI
          .getImageBase64(filepath)
          .then((base64) => setBgBase64(base64))
          .catch(() => setBgBase64(null));
      }
    } else {
      setBgBase64(null);
    }
  }, [filepath]);
  return { bgBase64 };
}
