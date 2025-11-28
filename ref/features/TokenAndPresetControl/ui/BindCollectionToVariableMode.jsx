/** @jsxImportSource @emotion/react */
import React from 'react';
import { PlusIcon, ReferenceIcon, UnlinkIcon } from '../../../shared/assets/icons';
import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { WindowPopover, WindowTrigger, Window, WindowHead, WindowTitle, WindowBody } from '../../../shared/uiKit/Window';
import { List, ListItem, ListItemButton, ListItemText, ListItemEndSlot } from '../../../shared/uiKit/List';
import { ButtonToolGroup } from '../../../shared/uiKit/ButtonTool';
import { useVariableModes, VARIABLE_MODE_TYPE } from '../../../entities/varMode';
import { useTokenAndPresetControl } from '..';
import { VARIABLE_MODE_GROUP_TYPE } from '../../../entities/varModeGroup';
import { useTokenCollection } from '../../../entities/varTokenCollection';

export const BindCollectionToVariableMode = ({
  type,
  collectionId,
  modeGroup,
  defaultMode,
}) => {

  const {
    unbindCollectionFromVariableModeGroup,
    bindCollectionToVariableModeGroup,
  } = useTokenAndPresetControl({ type, collectionId });

  const handleBindToVariableModeGroup = (modeGroupType) => {
    if (modeGroup?.type && modeGroup.type === modeGroupType) {
      unbindCollectionFromVariableModeGroup();
    } else {
      bindCollectionToVariableModeGroup(modeGroupType);
    }
  };

  return (
    <WindowPopover
      placement='left-start'
      offset={179}
      flip={true}
      shift={true}
      closeOnSelect={false}
    >
      <WindowTrigger>
        {defaultMode?.isGlobal ?
          <ButtonTool>
            <UnlinkIcon />
          </ButtonTool>
          :
          <ButtonTool>
            <ReferenceIcon />
          </ButtonTool>
        }
      </WindowTrigger>
      <Window>
        <WindowHead paddingRight={8}>
          <WindowTitle>Global Modes</WindowTitle>
          <ButtonToolGroup fill={false}>
            <ButtonTool>
              <PlusIcon />
            </ButtonTool>
          </ButtonToolGroup>
        </WindowHead>
        <WindowBody>
          <List>
            <ListItem>
              <ListItemButton onClick={() => handleBindToVariableModeGroup(VARIABLE_MODE_GROUP_TYPE.BREAKPOINT)}>
                <ListItemText>
                                    Breakpoint
                </ListItemText>
                {modeGroup?.type === VARIABLE_MODE_GROUP_TYPE.BREAKPOINT &&
                                    <ListItemEndSlot spacing={4}>
                                      <UnlinkIcon />
                                    </ListItemEndSlot>
                }
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => handleBindToVariableModeGroup(VARIABLE_MODE_GROUP_TYPE.THEME)}>
                <ListItemText>
                                    Theme
                </ListItemText>
                {modeGroup?.type === VARIABLE_MODE_GROUP_TYPE.THEME &&
                                    <ListItemEndSlot spacing={4}>
                                      <UnlinkIcon />
                                    </ListItemEndSlot>
                }
              </ListItemButton>
            </ListItem>
          </List>
        </WindowBody>
      </Window>
    </WindowPopover>
  );
};

