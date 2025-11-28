/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useTheme } from '@emotion/react';

export const Typography = forwardRef(({
  children,
  variant = 'body.xsmall',
  color = 'primary',
  size,
  weight,
  lineHeight,
  letterSpacing,
  tag = 'p',
  className,
  ...props
}, ref) => {
  const theme = useTheme();

  // variant
  const [category, variantSize] = variant.split('.');
  const variantStyles = theme.sys.typography[category]?.[variantSize] ?? theme.sys.typography.body.xsmall;

  // color
  const textColor = theme.sys.typography.color[color] ?? theme.sys.typography.color.primary;

  // font weight
  const fontWeight =
  typeof weight === 'number' ? weight
    : weight && theme.sys.typography.weight[weight] ? theme.sys.typography.weight[weight]
      : variantStyles.fontWeight ?? theme.ref.font.weightMedium;

  // custom sizes
  const customStyles = css`
    ${size != null && `font-size: ${typeof size === 'number' ? `${size}px` : size};`}
    ${lineHeight != null && `line-height: ${typeof lineHeight === 'number' ? `${lineHeight}px` : lineHeight};`}
    ${letterSpacing != null && `letter-spacing: ${typeof letterSpacing === 'number' ? `${letterSpacing}px` : letterSpacing};`}
`;

  return (
    <StyledTypography
      ref={ref}
      as={tag}
      className={className}
      theme={theme}
      css={css`
        font-size: ${variantStyles.fontSize};
        line-height: ${variantStyles.lineHeight};
        font-weight: ${fontWeight};
        letter-spacing: ${variantStyles.letterSpacing};
        color: ${textColor};
        ${customStyles};
      `}
      {...props}
    >
      {children}
    </StyledTypography>
  );
});

const StyledTypography = styled.span`
  font-family: ${({ theme }) => theme.ref.font.family};
  margin: 0;
`;

Typography.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'body.xxsmall',
    'body.xsmall',
    'body.small',
    'body.medium',
    'heading.small',
    'heading.medium',
  ]),
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'disabled',
    'link',
    'success',
    'warning',
    'error',
  ]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  weight: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['medium', 'semibold', 'bold'])]),
  letterSpacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tag: PropTypes.string,
  className: PropTypes.string,
};

Typography.displayName = 'Typography';
