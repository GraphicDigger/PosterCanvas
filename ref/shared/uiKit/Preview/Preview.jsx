import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { VisibleIcon, ImagePlaceholderIcon } from '../../../shared/assets/icons';
import { Backdrop } from '../Backdrop';
import { SIZE_MAP, FIT_MODES } from './model';

export const Preview = ({
  size = 'small',
  width,
  height,
  fit = false,
  backgroundColor,
  imageUrl,
  hovered = false,
  onClick,
  onError,
  hasError,
  alt,
  aspectRatio = '1.25',
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const fitMode = fit ? FIT_MODES.CONTAIN : FIT_MODES.COVER;

  return (
    <StyledContainer
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      theme={theme}
      size={size}
      width={width}
      height={height}
      sizeType={size}
      backgroundColor={backgroundColor}
      aspectRatio={aspectRatio}
    >
      <StyledPreview
        backgroundColor={backgroundColor}
        imageUrl={!hasError ? imageUrl : ''}
        onError={onError}
        alt={alt}
        fitMode={fitMode}
      >
        {hovered && isHovered && size !== 'small' &&
                    <>
                      <Backdrop />
                      <VisibleIcon color={colors.white100} />
                    </>
        }
        {(hasError) &&
                    <ImagePlaceholderIcon />
        }
      </StyledPreview>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
    position: relative;
    width: ${({ size, width }) => {
    if (width) { return typeof width === 'number' ? `${width}px` : width; }
    if (size) { return SIZE_MAP[size]; }
    return '100%';
  }};
    height: ${({ size, height }) => {
    if (height) { return typeof height === 'number' ? `${height}px` : height; }
    if (size) { return SIZE_MAP[size]; }
    return 'auto';
  }};
    aspect-ratio: ${({ aspectRatio, height }) => height ? 'auto' : aspectRatio};
    flex-shrink: 0;
    padding: ${({ sizeType }) => sizeType === 'small' ? '0' : '4px'};
    background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
    border-radius: ${({ sizeType }) => sizeType === 'small' ? '4px' : '4px'};
    outline: ${({ theme }) => `1px solid ${theme.sys.color.outline.default}`};
    overflow: hidden;
    cursor: pointer;
    
`;

const StyledPreview = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    background-image: ${({ imageUrl }) => imageUrl ? `url(${imageUrl})` : 'none'};
    background-size: ${({ fitMode }) => fitMode};
    background-position: center;
    background-repeat: no-repeat;
`;

Preview.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  backgroundColor: PropTypes.string,
  imageUrl: PropTypes.string,
  hovered: PropTypes.bool,
  hasError: PropTypes.bool,
  onClick: PropTypes.func,
  onError: PropTypes.func,
  alt: PropTypes.string,
  fit: PropTypes.bool,
  aspectRatio: PropTypes.string,
};
