import React from 'react';
import { Select } from '../../../../../shared/uiKit/Fields';
import { MenuItem } from '../../../../../shared/uiKit/Menu';
import { ListItem, ListItemButton, ListItemText } from '../../../../../shared/uiKit/List';
import { BindVariableToInstancePropPicker } from '../../../../../entities/binding';

export const DataValue = ({
  onChange,
  dataModels,
  currentModelId,
}) => {

  const handleChange = (value) => {
    const selectedModel = dataModels.find(opt => opt.id === value);
    if (selectedModel) {onChange(selectedModel.id);}
  };

  return (
    <Select
      width={150}
      value={currentModelId}
      onChange={handleChange}
    >
      {dataModels.map(model => (
        <MenuItem key={model.id} value={model.id}>
          {model.name}
        </MenuItem>
      ))}
    </Select>
  );
};
