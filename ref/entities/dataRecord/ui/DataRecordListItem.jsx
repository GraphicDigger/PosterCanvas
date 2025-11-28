import React, { useEffect } from 'react';
import { ListItem, ListItemButton, ListItemText, ListItemEndSlot } from '../../../shared/uiKit/List';
import { SettingsIcon } from '../../../shared/assets/icons';
import { useDataRecordStates } from '../model';
import { useDataRecords } from '../model';
export const DataRecordListItem = ({
  record,
  onClick,
}) => {

  const {
    isHovered,
    isFocused,
    isSelected,
    handleHover,
    handleFocus,
    handleSelect,
  } = useDataRecordStates(record.id);

  const handleClick = () => {
    handleSelect(record.id);
    if (onClick) {onClick();}
  };

  const { getRecordDisplayValue } = useDataRecords();

  return (
    <ListItem>
      <ListItemButton
        filled={false}
        isSelected={isSelected}
        isHovered={isHovered}
        isFocused={isFocused}
        onClick={handleClick}
        onMouseEnter={() => handleHover(record.id)}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleFocus(record.id)}
        onBlur={() => handleFocus(null)}
      >
        <ListItemText>
          {getRecordDisplayValue(record.id)}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

