/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export const AvatarGroup = memo(({
  children,
  max,
  spacing = 8,
  size = 'medium',
}) => {
  const avatars = React.Children.toArray(children);
  const totalAvatars = avatars.length;
  const displayCount = max ? Math.min(max, totalAvatars) : totalAvatars;
  const extraCount = totalAvatars - displayCount;

  const visibleAvatars = avatars.slice(0, displayCount).map((avatar, index) => (
    <AvatarWrapper
      key={index}
      spacing={spacing}
      isLast={index === displayCount - 1}
    >
      {React.cloneElement(avatar, {
        size,
        border: true,
      })}
    </AvatarWrapper>
  ));

  return (
    <StyledContainer>
      <StyledAvatarGroup>
        {visibleAvatars}
      </StyledAvatarGroup>
      {extraCount > 0 && (
        <StyledExtraCount>
                    +{extraCount}
        </StyledExtraCount>
      )}
    </StyledContainer>
  );
});

AvatarGroup.displayName = 'AvatarGroup';

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
`;

const StyledAvatarGroup = styled.div`
    display: flex;
    flex-direction: row-reverse;
`;

const AvatarWrapper = styled.div`
    display: flex;
    margin-left: ${({ spacing, isFirst, isLast }) =>
    isFirst || isLast ? 0 : -spacing}px;
`;

const StyledExtraCount = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 6px;
`;

AvatarGroup.propTypes = {
  children: PropTypes.node,
  max: PropTypes.number,
  spacing: PropTypes.number,
  size: PropTypes.oneOf(['small', 'default', 'large', 'xlarge']),
};
