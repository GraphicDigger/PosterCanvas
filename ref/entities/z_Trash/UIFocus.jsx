import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { useFocusEntity } from '../uiFocus';
import { ENTITY_KINDS } from '../../../shared/constants';
import { useElement } from '../../../entities/uiElement';

export const UIFocus = () => {
  const { focusEntity } = useFocusEntity();
  const [elementBounds, setElementBounds] = useState(null);
  const observerRef = useRef(null);
  const { isFocusedBodyElement } = useElement();

  useEffect(() => {
    if (!focusEntity.id) {
      setElementBounds(null);
      return;
    }

    // НЕ показываем рамку для КОМПОНЕНТОВ (у них свой холст)
    if (focusEntity.kind === ENTITY_KINDS.COMPONENT) {
      setElementBounds(null);
      return;
    }

    const findAndTrackElement = () => {
      // Ищем элемент по data-атрибутам или по ID
      const element = document.querySelector(`[data-ui-id="${focusEntity.id}"]`) ||
                      document.querySelector(`[data-element-id="${focusEntity.id}"]`) ||
                      document.getElementById(focusEntity.id);

      if (element) {
        const updateBounds = () => {
          // Специальная обработка для инстансов с display: contents
          if (focusEntity.kind === ENTITY_KINDS.INSTANCE) {
            const instanceElement = element;

            // Находим все дочерние элементы инстанса
            const childElements = Array.from(instanceElement.children).filter(child =>
              child.hasAttribute('data-ui-id') || child.tagName !== 'SCRIPT',
            );

            if (childElements.length === 0) {
              // Если нет дочерних элементов, используем первый доступный дочерний элемент
              const firstChild = instanceElement.children[0];
              if (firstChild) {
                const rect = firstChild.getBoundingClientRect();
                setElementBounds({
                  left: rect.left,
                  top: rect.top,
                  width: rect.width,
                  height: rect.height,
                });
              }
              return;
            }

            // Вычисляем общие границы всех дочерних элементов
            const rects = childElements.map(child => child.getBoundingClientRect());
            const minLeft = Math.min(...rects.map(r => r.left));
            const minTop = Math.min(...rects.map(r => r.top));
            const maxRight = Math.max(...rects.map(r => r.right));
            const maxBottom = Math.max(...rects.map(r => r.bottom));

            setElementBounds({
              left: minLeft,
              top: minTop,
              width: maxRight - minLeft,
              height: maxBottom - minTop,
            });
          } else {
            // Для обычных элементов используем стандартный подход
            const rect = element.getBoundingClientRect();
            setElementBounds({
              left: rect.left,
              top: rect.top,
              width: rect.width,
              height: rect.height,
            });
          }
        };

        updateBounds();

        // Отслеживаем изменения размеров и позиции
        if (observerRef.current) {
          observerRef.current.disconnect();
        }

        observerRef.current = new ResizeObserver(updateBounds);
        observerRef.current.observe(element);

        // Также отслеживаем скролл
        const handleScroll = () => updateBounds();
        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', handleScroll);

        return () => {
          window.removeEventListener('scroll', handleScroll, true);
          window.removeEventListener('resize', handleScroll);
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        };
      }
    };

    const cleanup = findAndTrackElement();

    // Если элемент не найден сразу, пробуем найти его через короткий промежуток
    const timeoutId = setTimeout(findAndTrackElement, 100);
    return () => {
      cleanup?.();
      clearTimeout(timeoutId);
    };
  }, [focusEntity.id, focusEntity.kind]);

  if (!focusEntity.id || !elementBounds || focusEntity.kind === ENTITY_KINDS.SCREEN || isFocusedBodyElement) {
    return null;
  }

  return (
    <FocusFrame
      bounds={elementBounds}
      entityKind={focusEntity.kind}
    />
  );
};

const FocusFrame = ({ bounds, entityKind }) => {
  return (
    <FocusOverlay
      style={{
        left: bounds.left - 2,
        top: bounds.top - 2,
        width: bounds.width + 4,
        height: bounds.height + 4,
      }}
    >
      <FocusFrameBorder entityKind={entityKind} />
    </FocusOverlay>
  );
};

const FocusOverlay = styled.div`
    position: fixed;
    pointer-events: none;
    z-index: 1000;
`;

const FocusFrameBorder = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid ${({ entityKind }) => {
    switch (entityKind) {
    case ENTITY_KINDS.INSTANCE:
      return '#8B5CF6'; // Фиолетовый для инстансов
    case ENTITY_KINDS.COMPONENT:
      return '#10B981'; // Зеленый для компонентов
    case ENTITY_KINDS.ELEMENT:
    case ENTITY_KINDS.TEXT_ELEMENT:
      return '#007AFF'; // Синий для элементов
    default:
      return '#007AFF'; // Синий по умолчанию
    }
  }};
    border-radius: 2px;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.8);
    background: transparent;
`;

// const FocusHandles = styled.div`
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
// `;

// const FocusHandle = styled.div`
//     position: absolute;
//     width: 8px;
//     height: 8px;
//     background: #007AFF;
//     border: 1px solid white;
//     border-radius: 50%;
//     transform: translate(-50%, -50%);

//     ${({ position }) => {
//         switch (position) {
//             case 'top-left':
//                 return 'top: 0; left: 0;';
//             case 'top-right':
//                 return 'top: 0; right: 0; transform: translate(50%, -50%);';
//             case 'bottom-left':
//                 return 'bottom: 0; left: 0; transform: translate(-50%, 50%);';
//             case 'bottom-right':
//                 return 'bottom: 0; right: 0; transform: translate(50%, 50%);';
//             default:
//                 return '';
//         }
//     }}
// `;
