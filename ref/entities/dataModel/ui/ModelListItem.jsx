import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, ListItemText, ListItemEndSlot } from '../../../shared/uiKit/List';
import { SettingsIcon } from '../../../shared/assets/icons';
import { useDataModelStates } from '../model';
import { useGlobalModes, useDatabaseMode } from '../../mode/editorMode';

export const ModelListItem = ({
  model,
  onClick,
  rightSlot,
}) => {

  const { isDatabaseModeGlobal } = useGlobalModes();
  const { isSchemaInDatabaseMode } = useDatabaseMode();

  const {
    isModelSelected,
    isModelHovered,
    isModelFocused,
    handleHoverModel,
    handleFocusModel,
    handleSelectModel,
  } = useDataModelStates(model?.id);

  const handleClick = () => {
    handleSelectModel(model.id);
    onClick && onClick();
  };

  return (
    <ListItem>
      <ListItemButton
        filled={false}
        isSelected={isModelSelected}
        isHovered={isModelHovered}
        isFocused={isModelFocused}
        onClick={handleClick}
        onMouseEnter={() => handleHoverModel(model.id)}
        onMouseLeave={() => handleHoverModel(null)}
        onFocus={() => handleFocusModel(model.id)}
        onBlur={() => handleFocusModel(null)}
      >
        <ListItemText>
          {model?.label}
        </ListItemText>
        {(isModelHovered || isModelSelected) && (
          <ListItemEndSlot>
            {(isDatabaseModeGlobal && !isSchemaInDatabaseMode) && (
              rightSlot
            )}
          </ListItemEndSlot>
        )}
      </ListItemButton>
    </ListItem>
  );
};

