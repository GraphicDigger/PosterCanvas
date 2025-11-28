import { useEffect, useState } from 'react';
import { getImageObjectFit } from '../../lib/getImageObjectFit';

/**
 * Хук для автоматического определения objectFit изображения
 * @param {React.RefObject} imageRef - Реф изображения
 * @param {string} src - URL изображения
 * @param {string} defaultObjectFit - Значение objectFit по умолчанию
 * @param {boolean} autoFit - Включить автоопределение
 * @returns {string} Текущее значение objectFit
 */
export const useImageFit = (imageRef, src, defaultObjectFit = 'cover', autoFit = false) => {
  const [imageObjectFit, setImageObjectFit] = useState(defaultObjectFit);

  useEffect(() => {
    if (!autoFit) {
      setImageObjectFit(defaultObjectFit);
      return;
    }

    const handleLoad = () => {
      if (imageRef.current) {
        const { naturalWidth, naturalHeight } = imageRef.current;
        setImageObjectFit(getImageObjectFit(naturalWidth, naturalHeight, defaultObjectFit));
      }
    };

    if (imageRef.current) {
      if (imageRef.current.complete) {
        handleLoad();
      } else {
        imageRef.current.addEventListener('load', handleLoad);
      }
    }

    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener('load', handleLoad);
      }
    };
  }, [src, defaultObjectFit, autoFit, imageRef]);

  return imageObjectFit;
};
