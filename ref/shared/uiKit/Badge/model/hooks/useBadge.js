import React, { useState, useMemo } from 'react';
// Импортируем сам компонент Badge для проверки child.type в useMemo для slots
// Это может создать мягкую циклическую зависимость, если Badge также импортирует этот хук напрямую.
// Если возникнут проблемы, можно передать Badge как аргумент в хук.
import { Badge } from '../../Badge';

export const useBadge = ({ isVisible, children, onClick, showOnHover }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const isBadgeVisible = useMemo(() => {
    if (showOnHover) {
      return isHovered;
    }
    if (isVisible !== undefined) {
      return isVisible;
    }
    return true;
  }, [showOnHover, isHovered, isVisible]);

  const slots = useMemo(() => {
    const result = {
      badge: null,
      content: [],
    };

    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) {return;}
      if (child.type === Badge) {
        result.badge = child;
      } else {
        result.content.push(child);
      }
    });
    return result;
  }, [children]);

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    isBadgeVisible,
    slots,
    handleClick,
  };
};
