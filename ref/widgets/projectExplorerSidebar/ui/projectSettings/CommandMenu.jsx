/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTheme } from '@emotion/react';
import { SectionPanel, SectionPanelBody } from '../../../../shared/uiKit/SectionPanel';
import { Divider } from '../../../../shared/uiKit/Divider';
import { List, ListItem, ListItemButton } from '../../../../shared/uiKit/List';


export const CommandMenu = () => {

  const theme = useTheme();

  return (
    <SectionPanel>
      <Divider top left color={theme.sys.color.outline.default} />
      <SectionPanelBody marginTop>
        <List gap='0'>
          <ListItem>
            <ListItemButton filled={false}>
                            File
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton filled={false}>
                            Edit
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton filled={false}>
                            View
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton filled={false}>
                            Component
            </ListItemButton>
          </ListItem>
        </List>
      </SectionPanelBody>
      <Divider bottom left color={theme.sys.color.outline.default} />
    </SectionPanel>

  );
};
