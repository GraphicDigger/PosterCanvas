/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

export const ButtonToolMultiToggle = ({
  children,
  background = true,
  value = [],
  onChange,
  color = 'default',
  variant = 'blank',
  size = 'small',
  disabled = false,
  width,
}) => {
  const theme = useTheme();

  const getRoundedStyle = (currentValue, index, totalChildren) => {
    const isSelected = value.includes(currentValue);
    const currentValueIndex = value.indexOf(currentValue);

    // Если кнопка выбрана
    if (isSelected) {
      // Проверяем, есть ли соседние выбранные значения
      const prevValue = React.Children.toArray(children)[index - 1]?.props.value;
      const nextValue = React.Children.toArray(children)[index + 1]?.props.value;
      const isPrevSelected = value.includes(prevValue);
      const isNextSelected = value.includes(nextValue);

      if (isPrevSelected && isNextSelected) { return 'none'; }
      if (isPrevSelected) { return 'right'; }
      if (isNextSelected) { return 'left'; }
      return 'all';
    }

    // Если кнопка не выбрана
    const prevValue = React.Children.toArray(children)[index - 1]?.props.value;
    const nextValue = React.Children.toArray(children)[index + 1]?.props.value;
    const isPrevSelected = value.includes(prevValue);
    const isNextSelected = value.includes(nextValue);

    const handleClick = (itemValue, onClick) => {
      if (!disabled) {
        const newValue = value.includes(itemValue)
          ? value.filter(v => v !== itemValue)
          : [...value, itemValue].sort((a, b) => {
            // Сортируем по порядку появления в children
            const aIndex = React.Children.toArray(children).findIndex(child => child.props.value === a);
            const bIndex = React.Children.toArray(children).findIndex(child => child.props.value === b);
            return aIndex - bIndex;
          });

        onChange?.(newValue);
        if (onClick) {onClick(itemValue);}
      }
    };

    const clonedChildren = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        const itemValue = child.props.value;
        if (itemValue === undefined) {
          console.warn('ButtonToolMultiToggle: Each child must have a value prop');
          return child;
        }
        return React.cloneElement(child, {
          variant,
          color,
          size,
          disabled,
          isSelected: value.includes(itemValue),
          rounded: getRoundedStyle(itemValue, index, React.Children.count(children)),
          onClick: () => handleClick(itemValue, child.props.onClick),
        });
      }
      return child;
    });

    return (
      <GroupContainer
        background={background}
        theme={theme}
        width={width}
        disabled={disabled}
      >
        {clonedChildren}
      </GroupContainer>
    );
  };
};

const GroupContainer = styled.div`
    display: flex;
    background-color: ${({ background, theme }) =>
    background ? theme.sys.color.surfaceContainer.low : 'transparent'
};
    padding: 0;
    border-radius: ${({ theme }) => theme.ref.borderRadius.medium};
    width: ${({ width }) => width ? `${width}px` : 'auto'};
    opacity: ${({ disabled }) => disabled ? 0.5 : 1};
`;

ButtonToolMultiToggle.propTypes = {
  children: PropTypes.node.isRequired,
  background: PropTypes.bool,
  value: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'tertiary']),
  variant: PropTypes.oneOf(['blank', 'lite', 'filled']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  width: PropTypes.number,
};
