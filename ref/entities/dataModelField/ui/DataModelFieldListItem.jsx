import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemEndSlot, ListItemStartSlot, ListItemText } from '../../../shared/uiKit/List';
import { useDataModelFieldStates } from '../model';
import { Text } from '../../../shared/uiKit/Text';
import { MODEL_FIELD_CONFIG } from '../model';

export const DataModelFieldListItem = forwardRef(({ onClick, field }, ref) => {

  const {
    isFocused,
    isSelected,
    handleHoverField,
    handleFocusField,
    handleSelectField,
  } = useDataModelFieldStates(field.id);

  const handleClick = (id) => {
    handleSelectField(id);
    onClick();
  };

  const FieldIconComponent = MODEL_FIELD_CONFIG.find(f => f.type === field.type)?.icon;

  return (
    <ListItem>
      <ListItemButton
        ref={ref}
        isSelected={isSelected}
        isFocused={isFocused}
        onClick={() => handleClick(field.id)}
        onMouseEnter={() => handleHoverField(field.id)}
        onMouseLeave={() => handleHoverField(null)}
        onFocus={() => handleFocusField(field.id)}
        onBlur={() => handleFocusField(null)}
      >
        <ListItemStartSlot>
          {FieldIconComponent && <FieldIconComponent />}
        </ListItemStartSlot>
        <ListItemText>{field.label}</ListItemText>
        {field.isRequired && (
          <ListItemEndSlot spacing={8}>
            <Text>Required</Text>
          </ListItemEndSlot>
        )}
      </ListItemButton>
    </ListItem>
  );
});

