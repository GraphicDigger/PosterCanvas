// Получаем информацию об элементе под StyledSurface
export const getElementInfo = (event: React.MouseEvent) => {
  // Временно скрываем StyledSurface чтобы получить элемент под ним
  const surfaceElement = event.currentTarget;
  const originalDisplay = surfaceElement.style.display;
  surfaceElement.style.display = 'none';

  // Теперь получаем элемент под поверхностью
  const element = document.elementFromPoint(event.clientX, event.clientY);

  // Восстанавливаем отображение
  surfaceElement.style.display = originalDisplay;

  if (!element) {return null;}

  // Получаем информацию об элементе
  const rect = element.getBoundingClientRect();
  const elementInfo = {
    element,
    id: element.id,
    className: element.className,
    tagName: element.tagName,
    dataset: element.dataset,
    rect: {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    },
    // Относительные координаты клика внутри элемента
    relativeX: (event.clientX - rect.left) / rect.width,
    relativeY: (event.clientY - rect.top) / rect.height,
    // Абсолютные координаты клика
    absoluteX: event.clientX,
    absoluteY: event.clientY,
  };

  console.log('[getElementInfo] elementInfo:', elementInfo);
  return elementInfo;
};
