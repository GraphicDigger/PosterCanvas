/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useTheme } from '../../../app/providers';
import { surfaceColors } from '../../../shared/styles';

import { ButtonIcon } from './ButtonIcon';

export const ButtonIconGroup = ({
  icons,
  variant = 'blank',
  color = 'default',
  size = 'small',
  background = false,
  onClick,
}) => {
  const { theme } = useTheme();
  const groupStyle = css`
        display: flex;
        background-color: ${background && surfaceColors(theme).saturate10};
        padding: 0;
        border-radius: 8px;
    `;

  return (
    <div css={groupStyle}>
      {icons.map((iconName, index) => (
        <ButtonIcon
          key={index}
          variant={variant}
          color={color}
          size={size}
          iconName={iconName}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

ButtonIconGroup.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.string).isRequired,
  variant: PropTypes.oneOf(['blank', 'filled']),
  color: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  background: PropTypes.bool,
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
};
