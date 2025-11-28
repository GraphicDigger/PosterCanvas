/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

/**
 * CardList - компонент для отображения списка карточек
 * Автоматически передает size и compact дочерним ItemCard компонентам
 */
export const CardList = ({
  children,
  size = 'medium',
  compact = false,
  gap = 4,
  padding,
  paddingLeft,
  paddingRight,
  ...props
}) => {
  return (
    <StyledCardList
      gap={gap}
      padding={padding}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      compact={compact}
      {...props}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          // Проверяем, является ли дочерний элемент ItemCard или компонентом, который принимает size/compact
          const childType = child.type?.displayName || child.type?.name;

          // Передаем size и compact дочернему элементу
          return React.cloneElement(child, {
            size: child.props.size !== undefined ? child.props.size : size,
            compact: child.props.compact !== undefined ? child.props.compact : compact,
            ...child.props, // Сохраняем остальные пропсы
          });
        }
        return child;
      })}
    </StyledCardList>
  );
};

const StyledCardList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ gap, compact }) => compact ? '0' : `${gap * 4}px`};
    width: 100%;
    min-width: 0;
    padding: ${({ padding }) => padding ? typeof padding === 'number' ? `${padding * 4}px` : padding : 0};  
`;

CardList.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  compact: PropTypes.bool,
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paddingLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paddingRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

