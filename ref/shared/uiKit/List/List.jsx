/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export const List = ({
  children,
  size = 'small',

  gap = 1,
  padding,
  paddingLeft,
  paddingRight,

}) => {

  return (
    <StyledList
      gap={gap}
      padding={padding}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            size,
            onClick: (e) => {
              if (child.props.onClick) {
                child.props.onClick(e);
              }
            },
          });
        }
        return child;
      })}
    </StyledList>
  );
};

const StyledList = styled.div`
    display: flex;
    flex-direction: column; 
    gap: ${({ gap }) =>  typeof gap === 'number' ? `${gap * 4}px` : gap};
    width: 100%;
    padding: ${({ padding }) => padding ? typeof padding === 'number' ? `${padding * 4}px` : padding : 0};
    padding-left: ${({ paddingLeft }) => paddingLeft ? typeof paddingLeft === 'number' ? `${paddingLeft * 4}px` : paddingLeft : ''};
    padding-right: ${({ paddingRight }) => paddingRight ? typeof paddingRight === 'number' ? `${paddingRight * 4}px` : paddingRight : ''};
`;

List.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paddingLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paddingRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

