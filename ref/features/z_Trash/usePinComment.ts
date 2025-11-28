import { useCallback, useState } from 'react';
import { PinModel, PinPosition } from '@/entities/comment/type';


export const usePinComment = () => {

  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });


  const getPinPosition = useCallback((
    pin: PinModel,
    targetId: string,
  ): PinPosition => {
    const targetElement = document.querySelector(`[data-ui-id="${targetId}"]`);
    if (!targetElement) {return { left: 0, top: 0 };}

    // Вычисляем позицию пина относительно верхнего левого угла целевого элемента
    const targetRect = targetElement.getBoundingClientRect();
    const relativeX = targetRect.width * pin.x;
    const relativeY = targetRect.height * pin.y;

    // Возвращаем абсолютные координаты относительно viewport
    return {
      left: targetRect.left + relativeX,
      top: targetRect.top + relativeY,
    };
  }, []);

  return {
    setWindowSize,
    getPinPosition,
  };
};
