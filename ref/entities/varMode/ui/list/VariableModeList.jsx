/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '../../../../shared/uiKit/List';
import { VariableModeListItem } from '../listItem';
import { Stack } from '../../../../shared/uiKit/Stack';
import { VariableModeSettingsWindow } from './VariableModeSettingsWindow';
import { ActionWrapper, RightAction } from '../../../../shared/uiKit/ActionWrapper';
import { MinusIcon } from '../../../../shared/assets/icons';
import { useVariableModeMutation } from '../../model';


export const VariableModeList = ({
  type,
  variableModes,
  onRemoveMode,
}) => {

  const handleRemoveMode = (variableModeId) => {
    onRemoveMode && onRemoveMode(variableModeId);
  };

  const content = useMemo(() => {

    return (
      <>
        {variableModes?.map((variableMode) => (
          <VariableModeSettingsWindow key={variableMode.id} variableMode={variableMode}>
            <ActionWrapper>
              <VariableModeListItem variableMode={variableMode} />
              {!variableMode.isProtected &&
                                <RightAction onClick={() => handleRemoveMode(variableMode.id)}>
                                  <MinusIcon />
                                </RightAction>
              }
            </ActionWrapper>
          </VariableModeSettingsWindow >

        ))}
      </>
    );

  }, [variableModes, onRemoveMode]);

  return (
    <List gap={1}>
      {content}
    </List>
  );
};

