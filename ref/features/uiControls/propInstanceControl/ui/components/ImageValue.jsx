import React, { memo } from 'react';
import { TextField } from '../../../../../shared/uiKit/Fields';
import { BindVariableToInstancePropPicker } from '../../../../../entities/binding';
import { ListItem, ListItemButton, ListItemText, ListItemStartSlot } from '../../../../../shared/uiKit/List';
import { Preview } from '../../../../../shared/uiKit/Preview';

export const ImageValue = memo(({
  propId,
  instanceId,
  value,
  onChange,
}) => {
  return (
    <BindVariableToInstancePropPicker
      propId={propId}
      instanceId={instanceId}
      propertyValue={value}
      window={{ offset: 85 }}
      width={150}
    >
      <ListItem>
        <ListItemButton>
          <ListItemStartSlot>
            <Preview imageUrl={value} size='small' />
          </ListItemStartSlot>
          <ListItemText>
            {value}
          </ListItemText>
        </ListItemButton>
      </ListItem>
    </BindVariableToInstancePropPicker>
  );
});
