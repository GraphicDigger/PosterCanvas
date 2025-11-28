/** @jsxImportSource @emotion/react */
import React from 'react';
import { LayoutFreeIcon } from '../../../../shared/assets/icons';
import { ActionWrapper, RightAction } from '../../../../shared/uiKit/ActionWrapper';
import { ButtonToolToggle, ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { Button } from '../../../../shared/uiKit/Button';
import { DropdownPopover, DropdownTrigger, Dropdown } from '../../../../shared/uiKit/DropdownMenu';
import { MenuItemRadio } from '../../../../shared/uiKit/Menu';
import { DotsIcon } from '../../../../shared/assets/icons';
import { useChangeProperty, useAbsoluteProperty } from '../model';

export const ChangePositionProperty = () => {

  const { currentMode, changePositionMode, POSITION_MODES } = useChangeProperty();

  const isStatic = currentMode === POSITION_MODES.STATIC;
  const isAuto = currentMode === POSITION_MODES.AUTO;
  const isFree = currentMode === POSITION_MODES.FREE;
  const isFixed = currentMode === POSITION_MODES.FIXED;
  const isSticky = currentMode === POSITION_MODES.STICKY;

  const { clearProperties } = useAbsoluteProperty();

  const handleChangeMode = (mode) => {
    changePositionMode(mode);
    if (mode !== POSITION_MODES.FREE && mode !== POSITION_MODES.FIXED) {
      clearProperties();
    }
  };

  return (
    <ActionWrapper width="fit" >

      <ButtonToolToggle value={currentMode} onChange={handleChangeMode}>
        <Button value={POSITION_MODES.AUTO} content='text'> Auto </Button>
        <ButtonTool value={POSITION_MODES.FREE}> <LayoutFreeIcon /> </ButtonTool>
        {isStatic && <Button value={POSITION_MODES.STATIC} content='text'> Static </Button>}
        {isFixed && <Button value={POSITION_MODES.FIXED} content='text'> Fixed </Button>}
        {isSticky && <Button value={POSITION_MODES.STICKY} content='text'> Sticky </Button>}
      </ButtonToolToggle>

      <RightAction>
        <DropdownPopover placement='left-start' offset={4}>
          <DropdownTrigger>
            <RightAction>
              <DotsIcon />
            </RightAction>
          </DropdownTrigger>
          <Dropdown>
            <MenuItemRadio checked={isStatic} onChange={() => handleChangeMode(POSITION_MODES.STATIC)}>Static</MenuItemRadio>
            <MenuItemRadio checked={isAuto} onChange={() => handleChangeMode(POSITION_MODES.AUTO)}>Relative</MenuItemRadio>
            <MenuItemRadio checked={isFree} onChange={() => handleChangeMode(POSITION_MODES.FREE)}>Absolute</MenuItemRadio>
            <MenuItemRadio checked={isFixed} onChange={() => handleChangeMode(POSITION_MODES.FIXED)}>Fixed</MenuItemRadio>
            <MenuItemRadio checked={isSticky} onChange={() => handleChangeMode(POSITION_MODES.STICKY)}>Sticky</MenuItemRadio>
          </Dropdown>
        </DropdownPopover>
      </RightAction>

    </ActionWrapper>

  );
};
