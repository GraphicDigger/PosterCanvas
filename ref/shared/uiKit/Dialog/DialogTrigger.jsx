import React from 'react';
import PropTypes from 'prop-types';
import { useDialog } from './models';

export const DialogTrigger = ({ children, asChild }) => {
  const { toggle } = useDialog();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e) => {
        children.props.onClick?.(e);
        toggle();
      },
    });
  }
  return (
    <button type="button" onClick={toggle}>
      {children}
    </button>
  );
};

DialogTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  asChild: PropTypes.bool,
};
