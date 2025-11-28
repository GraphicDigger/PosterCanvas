/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  FloatingPortal,
  FloatingFocusManager,
} from '@floating-ui/react';
import { usePopover } from './hooks/usePopover';


export const Popover = ({
  children,
  placement = 'left',
  offset: offsetProp = 4,
  shift: shiftProp = false,
  flip: flipProp = false,
  arrow: arrowPropProp = false,
  strategy = 'fixed',
  padding = 8,
  modal = false,
  sameWidth = false,

  closeOnSelect = true,
  closeOnFocusOut = true,
  initialOpen,
  openOnDoubleClick = false,
  onOpenChange,

  triggerComponent,
  contentComponent,
}) => {
  const {
    isOpen,
    setIsOpen,
    floating,
    interactions,
    headingId,
    arrowRef,
    arrowProp,
  } = usePopover({
    placement,
    offset: offsetProp,
    shift: shiftProp,
    flip: flipProp,
    arrow: arrowPropProp,
    strategy,
    padding,
    initialOpen,
  });

  const { trigger, content } = useMemo(() => ({
    trigger: React.Children.toArray(children).find(
      child => React.isValidElement(child) && child.type === triggerComponent,
    ),
    content: React.Children.toArray(children).find(
      child => React.isValidElement(child) && child.type === contentComponent,
    ),
  }), [children, triggerComponent, contentComponent]);

  if (!trigger || !content) {return null;}

  const handleTriggerClick = (e) => {
    const newIsOpen = !isOpen;

    if (!openOnDoubleClick) {
      setIsOpen(newIsOpen);
      // Вызываем onOpenChange если он передан
      if (onOpenChange) {
        onOpenChange(newIsOpen);
      }
    }

    if (trigger.props.onClick) {
      trigger.props.onClick(e);
    } else if (trigger.props.children?.props?.onClick) {
      trigger.props.children.props.onClick(e);
    }
  };

  const handleTriggerDoubleClick = (e) => {
    if (openOnDoubleClick) {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      // Вызываем onOpenChange если он передан
      if (onOpenChange) {
        onOpenChange(newIsOpen);
      }
    }

    if (trigger.props.onDoubleClick) {
      trigger.props.onDoubleClick(e);
    } else if (trigger.props.children?.props?.onDoubleClick) {
      trigger.props.children.props.onDoubleClick(e);
    }
  };

  const handleContentClick = (e) => {
    if (closeOnSelect) {
      setIsOpen(false);
      // Вызываем onOpenChange если он передан
      if (onOpenChange) {
        onOpenChange(false);
      }
    }
  };

  const triggerProps = {
    ...trigger.props,
    ref: floating.refs.setReference,
    ...interactions.getReferenceProps({
      onClick: handleTriggerClick,
      onDoubleClick: openOnDoubleClick ? handleTriggerDoubleClick : trigger.props.onDoubleClick,
      'aria-haspopup': 'dialog',
      'aria-expanded': isOpen,
      'aria-controls': isOpen ? interactions.getFloatingProps().id : undefined,
    }),
  };

  return (
    <>
      {React.cloneElement(trigger, triggerProps)}

      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager
            context={floating.context}
            modal={modal}
            closeOnFocusOut={closeOnFocusOut}
          >
            <StyledPopoverContent
              ref={floating.refs.setFloating}
              style={{
                ...floating.floatingStyles,
                width: sameWidth ? floating.refs.reference.current?.offsetWidth : 'auto',
              }}
              aria-labelledby={headingId}
              $strategy={strategy}
              onClick={handleContentClick}
              {...interactions.getFloatingProps()}
            >
              {arrowProp && (
                <StyledArrow
                  ref={arrowRef}
                  className="arrow"
                  style={floating.middlewareData.arrow ? {
                    left: floating.middlewareData.arrow.x,
                    top: floating.middlewareData.arrow.y,
                  } : {}}
                />
              )}
              {content}
            </StyledPopoverContent>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};

const StyledPopoverContent = styled.div`
    z-index: 1000;
    position: ${({ $strategy }) => $strategy};
`;

const StyledArrow = styled.div`
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
    transform: rotate(45deg);
`;

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  triggerComponent: PropTypes.elementType.isRequired,
  contentComponent: PropTypes.elementType.isRequired,

  placement: PropTypes.string,
  offset: PropTypes.number,
  shift: PropTypes.bool,
  flip: PropTypes.bool,
  arrow: PropTypes.bool,
  strategy: PropTypes.oneOf(['absolute', 'fixed']),
  padding: PropTypes.number,
  modal: PropTypes.bool,
  closeOnFocusOut: PropTypes.bool,
  sameWidth: PropTypes.bool,
  closeOnSelect: PropTypes.bool,
  openOnDoubleClick: PropTypes.bool,
  onOpenChange: PropTypes.func,
};
