import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Divider } from '../Divider';
import { CrossIcon } from '../../assets/icons';
import { ButtonTool } from '../ButtonTool';
import { useDialog } from './models';
import { SlotBar, RightSlot } from '../SlotBar';

export const DialogHeader = ({ children, className, onClose }) => {

  const { close } = useDialog();
  const theme = useTheme();

  const handleClose = () => {
    close();
    onClose?.();
  };

  const isSlotBar = React.isValidElement(children) && children.type === SlotBar;

  if (isSlotBar) {
    const hasRightSlot = React.Children.toArray(children.props.children).some(
      child => React.isValidElement(child) && child.type === RightSlot,
    );
    const enabledSlotBar = React.cloneElement(children, { ...children.props },
      [
        ...React.Children.toArray(children.props.children),
        !hasRightSlot && (
          <RightSlot key="close-button" padding={0}>
            <ButtonTool onClick={close}>
              <CrossIcon />
            </ButtonTool>
          </RightSlot>
        ),
      ].filter(Boolean),
    );

    return (
      <StyledHeader className={className} isSlotBar={isSlotBar}>
        {enabledSlotBar}
        <Divider bottom left color={theme.sys.color.outline.low} />
      </StyledHeader>
    );
  }

  return (
    <StyledHeader className={className}>
      {children}
      <ButtonTool onClick={handleClose}>
        <CrossIcon />
      </ButtonTool>
      <Divider bottom left />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    padding: ${({ isSlotBar }) => !isSlotBar ? '0 8px 0 16px' : '0'};
`;

DialogHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
