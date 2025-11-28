/** @jsxImportSource @emotion/react */
import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useImageFit } from './model';

export const Image = memo(({
  src,
  alt,
  width,
  height,
  fill = false,
  aspectRatio,
  objectFit = 'cover',
  autoFit = false, // cover or contain
  objectPosition = 'center',
  className,
  ...props
}) => {
  const imageRef = useRef(null);
  const coverOrContain = useImageFit(imageRef, src, objectFit, autoFit);

  if (fill) {
    return (
      <StyledFillImage
        className={className}
        aspectRatio={aspectRatio}
      >
        <FillImageTag
          ref={imageRef}
          src={src}
          alt={alt}
          objectFit={coverOrContain}
          objectPosition={objectPosition}
          {...props}
        />
      </StyledFillImage>
    );
  }

  return (
    <ImageTag
      ref={imageRef}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      objectFit={coverOrContain}
      objectPosition={objectPosition}
      {...props}
    />
  );
});

const StyledFillImage = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    aspect-ratio: ${({ aspectRatio }) => aspectRatio};
`;

const FillImageTag = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: ${({ objectFit }) => objectFit};
    object-position: ${({ objectPosition }) => objectPosition};
`;

const ImageTag = styled.img`
    width: ${({ width }) => width ? `${width}px` : '100%'};
    height: ${({ height }) => height ? `${height}px` : '100%'};
    display: block;
    object-fit: ${({ objectFit }) => objectFit};
    object-position: ${({ objectPosition }) => objectPosition};
`;

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fill: PropTypes.bool,
  aspectRatio: PropTypes.string,
  objectFit: PropTypes.oneOf(['contain', 'cover', 'fill', 'none', 'scale-down']),
  objectPosition: PropTypes.string,
  className: PropTypes.string,
  autoFit: PropTypes.bool,
};
