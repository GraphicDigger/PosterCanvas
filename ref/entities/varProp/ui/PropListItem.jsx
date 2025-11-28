import React, { useMemo, forwardRef } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemStartSlot,
  ListItemEndSlot,
} from '../../../shared/uiKit/List';
import { Text } from '../../../shared/uiKit/Text';
import {
  VariableNumberIcon,
  VariableStringIcon,
  VariableBoolIcon,
  VariableColorIcon,
  VariableImageIcon,
  VariableVideoIcon,
  VariableDataIcon,
  MinusIcon,
} from '../../../shared/assets/icons';
import { usePropStates } from '../model';
import { useDataModel } from '../../dataModel';
import { VARIABLE_TYPES, VARIABLE_CONFIG } from '@/shared/constants';

export const PropListItem = forwardRef(({
  prop,
  actionsSlot,
  onClick,
  ...props
}, ref) => {

  const { model } = useDataModel(prop.defaultValue.modelId);
  const {
    handleHover,
    handleSelect,
    handleFocus,
    isSelected,
    isFocused,
    isHovered,
  } = usePropStates(prop.id);

  const handleClick = (e) => {
    handleSelect(prop.id);
    if (onClick) {onClick(e);}
  };

  const modelName = useMemo(() => {
    if (prop.type === VARIABLE_TYPES.DATA) {
      return model?.name;
    }
  }, [prop, model]);

  return (
    <ListItem>
      <ListItemButton
        ref={ref}
        isSelected={isSelected}
        isHovered={isHovered}
        isFocused={isFocused}
        onMouseEnter={() => handleHover(prop.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(prop.id)}
        onBlur={() => handleFocus(null)}
        onClick={handleClick}
        {...props}
      >
        <ListItemStartSlot>
          {VARIABLE_CONFIG[prop.type]?.icon}
        </ListItemStartSlot>

        <ListItemText>
          {prop.name}
        </ListItemText>

        <ListItemEndSlot spacing={actionsSlot ? 0 : 4}>
          {isHovered && actionsSlot ? (
            actionsSlot
          ) : prop.type === VARIABLE_TYPES.DATA ? (
            <Text color="disabled">{modelName}</Text>
          ) : (
            <Text color="disabled">{prop.value}</Text>
          )}
        </ListItemEndSlot>

      </ListItemButton>
    </ListItem>
  );
});
