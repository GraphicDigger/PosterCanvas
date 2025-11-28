import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemStartSlot,
  ListItemEndSlot,
} from '@/shared/uiKit/List';
import {
  VariableNumberIcon,
  VariableStringIcon,
  VariableBoolIcon,
  VariableColorIcon,
  VariableImageIcon,
  VariableVideoIcon,
  VariableDataIcon,
} from '@/shared/assets/icons';
import { VARIABLE_TYPES, VARIABLE_CONFIG } from '@/shared/constants';
import { useVariableState } from '../model';
import { Text } from '@/shared/uiKit/Text';
import { useDataModel } from '../../dataModel';

export const DataVariableListItem = ({ variable, onClick }) => {

  const { model } = useDataModel(variable.value?.id);
  const {
    isSelected,
    isFocused,
    isHovered,
    handleHover,
    handleSelect,
    handleFocus,
  } = useVariableState(variable.id);

  const handleClick = (id) => {
    handleSelect(id);
    onClick && onClick();
  };

  const modelName = useMemo(() => {
    if (variable.type === VARIABLE_TYPES.DATA) {
      return model?.name || 'No Model';
    }
    return 'No Model';
  }, [variable, model]);

  const variableValue = useMemo(() => {
    if (variable.type !== VARIABLE_TYPES.DATA) {
      // Convert any value to string, handle null/undefined
      if (variable.value === null || variable.value === undefined) {
        return 'No Value';
      }
      return String(variable.value);
    }
    return 'No Value';
  }, [variable]);

  return (
    <ListItem>
      <ListItemButton
        isSelected={isSelected}
        isHovered={isHovered}
        isFocused={isFocused}
        onClick={() => handleClick(variable.id)}
        onMouseEnter={() => handleHover(variable.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(variable.id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemStartSlot>
          {VARIABLE_CONFIG[variable.type]?.icon}
        </ListItemStartSlot>
        <ListItemText>
          {variable.name}
        </ListItemText >
        <ListItemEndSlot spacing={4}>
          {variable.type === VARIABLE_TYPES.DATA
            ? <Text color='disabled'>{modelName}</Text>
            : <Text color='disabled'>{variableValue}</Text>
          }
        </ListItemEndSlot>
      </ListItemButton>
    </ListItem>
  );
};

DataVariableListItem.propTypes = {
  variable: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.any,
  }).isRequired,
  onClick: PropTypes.func,
};

