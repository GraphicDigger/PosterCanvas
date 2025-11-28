/** @jsxImportSource @emotion/react */
import React, { memo, useMemo } from 'react';
import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Avatar } from '../Avatar';
import { useBadge } from './model/hooks/useBadge';
import { DotBind } from '../DotBind';

export const Badge = memo(({
  style = 'dot',
  content,
  position = 'center',
  color,
  avatar,
  children,
  isVisible,
  showOnHover = false,
  hidden = false,
  onClick,
}) => {
  const theme = useTheme();

  const {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    isBadgeVisible,
    slots,
    handleClick,
  } = useBadge({ isVisible, children, onClick, showOnHover });

  const renderBadge = () => {
    if (!isBadgeVisible) {
      return null;
    }

    switch (style) {
    case 'avatar':
      return (
        <Avatar
          src={avatar?.src}
          bgColor={avatar?.bgColor}
          size="small"
          border
        >
          {avatar?.icon}
        </Avatar>
      );
    case 'dotBind':
      return <DotBind onClick={onClick} />;
    case 'number':
      return <NumberBadgeStyled color={color} theme={theme}>{content}</NumberBadgeStyled>;
    case 'dot':
    default:
      return <DotBadgeStyled onClick={onClick} color={color} theme={theme} />;
    }
  };

  return (
    <ProxyStyled
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {slots.content}
      <WrapperStyled position={position} hidden={hidden} onClick={handleClick}>
        {slots.badge && React.cloneElement(slots.badge, {
          isVisible: slots.badge.props.showOnHover ? isHovered : slots.badge.props.isVisible,
        })}
        {renderBadge()}
      </WrapperStyled>
    </ProxyStyled>
  );
});

const ProxyStyled = styled.div`
    display: contents;
`;

const WrapperStyled = styled.div`
    position: absolute;
    display: ${({ hidden }) => hidden ? 'none' : 'block'};
    z-index: 1;
    ${({ position }) => {
    switch (position) {
    case 'top-left':
      return `
                    top: 0;
                    left: 0;
                    transform: translate(-25%, -25%);
                `;
    case 'top-right':
      return `
                    top: 0;
                    right: 0;
                    transform: translate(25%, -25%);
                `;
    case 'bottom-left':
      return `
                    bottom: 0;
                    left: 0;
                    transform: translate(-25%, 25%);
                `;
    case 'bottom-right':
      return `
                    bottom: 0;
                    right: 0;
                    transform: translate(15%, 15%);
                `;
    case 'center':
      return `
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                `;
    default:
      return '';
    }
  }}
`;

const DotBadgeStyled = styled.div`
    width: 8px;
    height: 8px;
    background-color: ${({ color, theme }) => color || theme.sys.color.primary};
    border-radius: 50%;
    outline: 2px solid #fff;
    cursor: ${({ onClick }) => onClick ? 'pointer' : 'default'};
    &.badge-area 
`;

const NumberBadgeStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    background-color: ${({ color, theme }) => color || theme.sys.color.primary};
    border-radius: 10px;
    color: #fff;
    font-size: 12px;
    outline: 2px solid #fff;

`;

Badge.propTypes = {
  style: PropTypes.oneOf(['dot', 'number', 'avatar', 'dotBind']),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  position: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right', 'center']),
  color: PropTypes.string,
  wrapperWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  avatar: PropTypes.shape({
    src: PropTypes.string,
    icon: PropTypes.node,
    bgColor: PropTypes.string,
  }),
  children: PropTypes.node,
  isVisible: PropTypes.bool,
  onClick: PropTypes.func,
  showOnHover: PropTypes.bool,
};
