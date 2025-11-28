
export const getPinPosition = (pin, targetId) => {
  const targetElement = document.querySelector(`[data-ui-id="${targetId}"]`);
  if (!targetElement) {return { left: 0, top: 0 };}

  // Вычисляем позицию пина относительно верхнего левого угла целевого элемента
  const targetRect = targetElement.getBoundingClientRect();
  const relativeX = targetRect.width * pin.x;
  const relativeY = targetRect.height * pin.y;

  // Возвращаем абсолютные координаты относительно viewport
  return {
    x: targetRect.left + relativeX,
    y: targetRect.top + relativeY,
  };
};
