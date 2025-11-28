import React, { useEffect } from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '../../../../shared/uiKit/SectionPanel';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { PlusIcon } from '../../../../shared/assets/icons';
import { useWorkspaces, WorkspaceListItem } from '../../../../entities/workspace';
import { List } from '../../../../shared/uiKit/List';

export const FilterWorkspaces = () => {

  const { allWorkspaces } = useWorkspaces();

  return (

    <SectionPanel dividerBottom >
      <SectionPanelHeader>
        <SectionPanelName >Workspaces</SectionPanelName>
        {/* <ButtonTool>
                    <PlusIcon />
                </ButtonTool> */}
      </SectionPanelHeader>
      <SectionPanelBody>
        <List gap={0}>
          {allWorkspaces?.map((workspace) => (
            <WorkspaceListItem key={workspace.id} workspace={workspace} />
          ))}
        </List>
      </SectionPanelBody>
    </SectionPanel>


  );
};

