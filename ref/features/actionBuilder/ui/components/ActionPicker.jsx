import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from '../../../../shared/uiKit/List';
import { WindowPopover, WindowTrigger, Window, WindowHead, WindowBody, WindowTitle } from '../../../../shared/uiKit/Window';
import { ACTION_GROUPS } from '../../../../entities/action/model';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { PlusIcon } from '../../../../shared/assets/icons';
import { ActionListItem, ACTION_TYPES, useActions, useActionCrud } from '../../../../entities/action';
import { useChangeAction } from '../../model';

export const ActionPicker = ({
  triggerSlot,
  actionId,
  ...props
}) => {
  const { handleUpdateActionType } = useChangeAction();

  const { handleCreateCustomAction } = useActionCrud();
  const { customActions } = useActions();

  const handleSelectAction = (selectedActionId, selectedType) => {
    // if this is custom action, copy its configuration
    const customAction = customActions.find(action => action.id === selectedType);
    if (customAction) {
      handleUpdateActionType(actionId, {
        type: ACTION_TYPES.CUSTOM_ACTION,
        config: customAction.config,
      });
    } else {
      handleUpdateActionType(actionId, selectedType);
    }
  };

  console.log('customActions', customActions);

  return (
    <WindowPopover {...props}>
      <WindowTrigger>
        {triggerSlot}
      </WindowTrigger>
      <Window>
        <WindowHead paddingRight={8}>
          <WindowTitle>
                        Action Types
          </WindowTitle>
          <ButtonTool onClick={handleCreateCustomAction}>
            <PlusIcon />
          </ButtonTool>
        </WindowHead>
        <WindowBody>
          <List>
            {customActions.length > 0 && (
              <React.Fragment>
                <ListItem>
                                    Custom Actions
                </ListItem>
                {customActions.map(action => (
                  <ActionListItem
                    key={action.id}
                    action={action}
                    onClick={() => handleSelectAction(actionId, action.id)}
                  />
                ))}
              </React.Fragment>
            )}

            {Object.entries(ACTION_GROUPS).map(([groupKey, group]) => (
              <React.Fragment key={groupKey}>
                <ListItem>
                  {group.label}
                </ListItem>
                {group.actions.map(actionType => (
                  <ActionListItem
                    key={actionType}
                    action={{
                      id: actionType,
                      type: actionType,
                      name: actionType,
                      trigger: null,
                    }}
                    onClick={() => handleSelectAction(actionId, actionType)}
                  />
                ))}
              </React.Fragment>
            ))}
          </List>
        </WindowBody>
      </Window>
    </WindowPopover>
  );
};
