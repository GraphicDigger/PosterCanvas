import React, { useState, useMemo, useRef } from 'react';
import {
  useFloating,
  useInteractions,
  useClick,
  useRole,
  useId,
  useDismiss,
  offset,
  flip,
  shift,
  autoUpdate,
  arrow,
} from '@floating-ui/react'; // docs: https://floating-ui.com/docs/useFloating

export const usePopover = ({
  placement = 'bottom',
  offset: offsetProp = 8,
  shift: shiftProp = false,
  flip: flipProp = false,
  arrow: arrowProp = false,
  strategy = 'fixed',
  padding = 8,
  initialOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const headingId = useId();
  const arrowRef = useRef(null);

  const middleware = useMemo(() => {
    const middlewares = [];
    middlewares.push(offset(offsetProp));
    if (flipProp) {middlewares.push(flip({ padding }));}
    if (shiftProp) {middlewares.push(shift({ padding }));}
    if (arrowProp) {middlewares.push(arrow({ element: arrowRef }));}
    return middlewares;
  }, [offsetProp, flipProp, shiftProp, arrowProp, padding]);

  const floating = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen, // Управляем состоянием через onOpenChange
    middleware,
    placement,
    strategy,
    whileElementsMounted: autoUpdate,
  });

  // useClick enabled: false, так как мы управляем открытием/закрытием вручную в Popover
  // useDismiss используется для закрытия по клику вне элемента, Esc и т.д.
  // useRole добавляет ARIA атрибуты
  const interactions = useInteractions([
    useClick(floating.context, { enabled: false }),
    useDismiss(floating.context),
    useRole(floating.context),
  ]);

  return {
    isOpen,
    setIsOpen, // Возвращаем setIsOpen для ручного управления, если нужно
    floating,
    interactions,
    headingId,
    arrowRef,
    arrowProp, // Возвращаем для условного рендеринга стрелки
  };
};
