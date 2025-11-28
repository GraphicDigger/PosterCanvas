/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { PlusIcon } from '@/shared/assets/icons';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '@/shared/uiKit/SectionPanel';
import { ButtonTool, ButtonToolGroup } from '@/shared/uiKit/ButtonTool';
import { ListItemButton, List, ListItemText, ListItem, ListItemStartSlot } from '@/shared/uiKit/List';
import { Preview } from '@/shared/uiKit/Preview';

const statics = [
  { id: 1, name: 'Image.jpg', icon: <Preview size='small' /> },
  { id: 2, name: 'Image.png', icon: <Preview size='small' /> },
  { id: 3, name: 'Image.svg', icon: <Preview size='small' /> },
];

export const StaticPanel = () => {
  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Static</SectionPanelName>
        <ButtonToolGroup fill={false}>
          <ButtonTool>
            <PlusIcon />
          </ButtonTool>
          <ButtonTool>
            <PlusIcon />
          </ButtonTool>
        </ButtonToolGroup>
      </SectionPanelHeader>
      <SectionPanelBody>
        <List gap='0'>
          {statics.map(stat => (
            <ListItem key={stat.id}>
              <ListItemButton filled={false}>
                <ListItemStartSlot>
                  {stat.icon}
                </ListItemStartSlot>
                <ListItemText>
                  {stat.name}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </SectionPanelBody>
    </SectionPanel>
  );
};
