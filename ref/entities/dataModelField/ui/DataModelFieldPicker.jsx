/** @jsxImportSource @emotion/react */
import React, { useCallback, useState, useEffect } from 'react';
import { WindowPopover, WindowTrigger, Window, WindowBody } from '@/shared/uiKit/Window';
import { List, ListItem, ListItemButton, ListItemText } from '@/shared/uiKit/List';
import { ActionWrapper } from '@/shared/uiKit/ActionWrapper';
import { useDataModelFields } from '../model';

export const DataModelFieldPicker = ({ modelId, onClick, children }) => {

  const { modelFieldsByModelId } = useDataModelFields();
  const dataModelFields = modelFieldsByModelId(modelId);

  return (
    <WindowPopover
      placement='left-start'
      offset={16}
      flip={true}
      shift={true}
      closeOnSelect={false}
    >
      <WindowTrigger>
        <ActionWrapper>
          {children}
        </ActionWrapper>
      </WindowTrigger>
      <Window>
        <WindowBody>
          <List>
            {dataModelFields.map((field) => (
              <ListItem>
                <ListItemButton onClick={() => onClick(field)} >
                  <ListItemText>
                    {field.name}
                  </ListItemText >
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </WindowBody>
      </Window>
    </WindowPopover>
  );
};
