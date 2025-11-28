import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Divider } from '../Divider';
import { SlotBar } from '../SlotBar';
import { Stack } from '../Stack';


export const DialogFooter = ({ children, className }) => {

  const theme = useTheme();

  const isSlotBar = React.isValidElement(children) && children.type === SlotBar;

  if (isSlotBar) {
    const enabledSlotBar = React.cloneElement(children, { ...children.props },
      [...React.Children.toArray(children.props.children)].filter(Boolean),
    );
    return (
      <StyledFooter className={className} isSlotBar={isSlotBar}>
        {enabledSlotBar}
        <Divider bottom left color={theme.sys.color.outline.low} />
      </StyledFooter>
    );
  }

  return (
    <StyledFooter className={className}>
      <Stack gap={2} padding={2} justify='center'>
        {children}
      </Stack>
      <Divider top left color={theme.sys.color.outline.low} />
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    padding: ${({ isSlotBar }) => isSlotBar ? '0' : '0 8px'};
`;

DialogFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
