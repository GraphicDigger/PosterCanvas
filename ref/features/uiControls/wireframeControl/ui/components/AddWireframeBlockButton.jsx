/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { ButtonTool } from '../../../../../shared/uiKit/ButtonTool';
import { Button } from '../../../../../shared/uiKit/Button';
import { PlusIcon } from '../../../../../shared/assets/icons';
import { useWireframeControl } from '../../model';

export const AddWireframeBlockButton = ({
  screenId,
  variant = 'icon',
}) => {
  const {
    createWireframeBlock,
    createUnlinkedWireframeBlock,
    createLinkedWireframeBlock,
    handleSelectScreen,
  } = useWireframeControl();

  const handleClick = () => {
    createWireframeBlock(screenId);
  };

  return (
    variant === 'icon' ? (
      <ButtonTool onClick={handleClick}>
        <PlusIcon />
      </ButtonTool>
    ) : (
      <Button onClick={handleClick} color="default" startIcon={<PlusIcon />}>
                Add Block
      </Button>
    )
  );
};

AddWireframeBlockButton.propTypes = {
  variant: PropTypes.oneOf(['icon', 'text']),
  screenId: PropTypes.string,
};
