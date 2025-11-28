import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { MinusIcon, CheckIcon } from '../../../shared/assets/icons';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemEndSlot,
} from '../../../shared/uiKit/List';
import { ActionWrapper, RightAction, LeftAction } from '../../../shared/uiKit/ActionWrapper';
import { Badge } from '../../../shared/uiKit/Badge';
import { usePropValueStates, usePropValueMutation } from '../model';
import { useTheme } from '@emotion/react';

export const PropValueListItem = ({ prop }) => {
  const theme = useTheme();

  const {
    handleHover,
    handleSelect,
    handleFocus,
    isSelected,
    isFocused,
    isHovered,
  } = usePropValueStates(prop.id);

  const { deletePropValue, changeDefaultPropValue } = usePropValueMutation();

  const handleClick = useCallback((id) => {
    handleSelect(id);
  }, [handleSelect]);

  const handleDeletePropValue = useCallback((id) => {
    deletePropValue(id);
  }, [deletePropValue]);

  const handleChangeDefaultPropValue = useCallback((id) => {
    changeDefaultPropValue(id);
  }, [changeDefaultPropValue]);


  return (
    <ActionWrapper>
      <LeftAction
        isVisible={prop.isDefault ? true : undefined}
        onClick={() => handleChangeDefaultPropValue(prop.id)}
      ><Badge color={theme.sys.color.primary}/>
      </LeftAction>
      <ListItem>
        <ListItemButton
          isSelected={isSelected}
          isHovered={isHovered}
          isFocused={isFocused}
          onClick={() => handleClick(prop.id)}
          onMouseEnter={() => handleHover(prop.id)}
          onMouseLeave={() => handleHover(null)}
          onFocus={() => handleFocus(prop.id)}
          onBlur={() => handleFocus(null)}
        >
          <ListItemText>
            {prop.name}
          </ListItemText>
          <ListItemEndSlot spacing={4}>
            <ListItemText>
              {prop.value}
            </ListItemText>
          </ListItemEndSlot>
        </ListItemButton>
      </ListItem>
      <RightAction onClick={() => handleDeletePropValue(prop.id)}>
        <MinusIcon />
      </RightAction>
    </ActionWrapper>
  );
};


PropValueListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
