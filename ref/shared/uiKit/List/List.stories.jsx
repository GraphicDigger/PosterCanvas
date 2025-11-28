import React, { useState } from 'react';

import { PlusIcon } from '../../../shared/assets/icons';

import { ActionWrapper } from '../ActionWrapper';
import { Preview } from '../Preview';

import { List } from './List';
import { ListItem } from './ListItem';
import { ListItemButton } from './ListItemButton';
import { ListItemText } from './ListItemText';
import { ListItemStartSlot } from './ListItemStartSlot';


export default {
  title: 'uiKit/List',
  component: ListItem,
};

const Template = (args) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '200px' }}>
      <ListItem>
        <ListItemButton>
          <ListItemText>
                        Color Token
          </ListItemText>
        </ListItemButton>
      </ListItem>
    </div>
  );
};

export const DefaultListItem = Template.bind({});
DefaultListItem.args = {
  beforeButtonIcon: 'arrow_down_xxs',
  startIcon: 'arrow_down_xxs',
  startChildren: <Preview backgroundColor="#ff0000" />,
  afterButtonIcon: 'cross_xxs',
  editable: true,
  filled: true,
  onEdit: (newContent) => console.log('Edited content:', newContent),
};

export const DefaultList = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'top', flexDirection: 'column', gap: '4px', height: '300px', width: '200px' }}>
      <List size='medium'>
        <ListItem>
          <ListItemButton>
            <ListItemStartSlot>
              <PlusIcon />
            </ListItemStartSlot>
            <ListItemText>
                            Color Token
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemStartSlot>
              <Preview size='small' />
            </ListItemStartSlot>
            <ListItemText>
                            Color Token
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemStartSlot>
              <Preview size='small' />
            </ListItemStartSlot>
            <ListItemText>
                            Color Token
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ActionWrapper action='collapse'>
          <ListItem>
            <ListItemButton onClick={handleClick}>
              <ListItemStartSlot>
                <PlusIcon />
              </ListItemStartSlot>
              <ListItemText>
                                Color Token
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </ActionWrapper>
        {open && (
          <>
            <ListItem>
              <ListItemButton>
                <ListItemStartSlot>
                  <Preview size='small' />
                </ListItemStartSlot>
                <ListItemText>
                                    Color Token
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemStartSlot>
                  <Preview size='small' />
                </ListItemStartSlot>
                <ListItemText>
                                    Color Token
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </div>
  );
};


export const EditableListItem = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'top', flexDirection: 'column', gap: '4px', height: '300px', width: '200px' }}>
      <List size='small'>
        <ListItem>
          <ListItemButton>
            <ListItemStartSlot>
              <PlusIcon />
            </ListItemStartSlot>
            <ListItemText editable>
                            Color Token
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

