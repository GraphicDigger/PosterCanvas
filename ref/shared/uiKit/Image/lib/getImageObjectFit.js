/**
 * Определяет objectFit на основе соотношения сторон изображения
 * @param {number} naturalWidth - Естественная ширина изображения
 * @param {number} naturalHeight - Естественная высота изображения
 * @param {string} defaultObjectFit - Значение по умолчанию
 * @returns {string} - Значение objectFit
 */
export const getImageObjectFit = (naturalWidth, naturalHeight, defaultObjectFit = 'cover') => {
  if (naturalWidth > naturalHeight) {
    return 'contain';
  }
  return defaultObjectFit;
};
