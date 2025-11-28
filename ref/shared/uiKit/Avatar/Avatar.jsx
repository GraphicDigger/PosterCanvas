/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { sizeMap } from './constants';
import { AvatarIcon } from '../../assets/icons';


export const Avatar = ({
  size = 'medium',
  shape = 'circle',
  children,
  src,
  alt,
  bgColor,
  border,
  onClick,
}) => {
  const theme = useTheme();

  const content = useMemo(() => {
    if (src) {
      return <StyledAvatarImage src={src} alt={alt} />;
    }
    if (children) {
      return children;
    }
    return <AvatarIcon size='s' color={theme.comp.avatar.icon.default} />;
  }, [src, children, alt]);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <AvatarContainer onClick={handleClick}>
      <StyledAvatar
        size={size}
        shape={shape}
        bgColor={bgColor}
        border={border}
        theme={theme}
      >
        {content}
      </StyledAvatar>
    </AvatarContainer>
  );
};

const AvatarContainer = styled.div`
    position: relative;
    width: fit-content;
    cursor: ${({ onClick }) => onClick ? 'pointer' : 'default'};
`;

const StyledAvatar = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ size }) => sizeMap[size]};
    height: ${({ size }) => sizeMap[size]};
    background-color: ${({ theme, bgColor }) => bgColor || theme.comp.avatar.background.default};
    border: 1px solid ${({ theme }) => theme.comp.avatar.outline.default};
    border-radius: ${({ shape }) => shape === 'circle' ? '50%' : '4px'};
    font-size: ${({ size }) => parseInt(sizeMap[size]) / 2.5}px;
    user-select: none;
    overflow: hidden;
    outline: ${({ border }) => border ? '2px solid #fff' : 'none'};
`;

const StyledAvatarImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

Avatar.propTypes = {
  shape: PropTypes.oneOf(['circle', 'square']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  children: PropTypes.node,
  src: PropTypes.string,
  bgColor: PropTypes.string,
};
