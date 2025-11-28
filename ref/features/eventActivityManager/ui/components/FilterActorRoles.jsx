import React, { useEffect } from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '@/shared/uiKit/SectionPanel';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { PlusIcon } from '@/shared/assets/icons';
import { useActorRoles, ActorRoleListItem } from '@/entities/actorRole';
import { List } from '@/shared/uiKit/List';

export const FilterActorRoles = () => {

  const { membersRoles } = useActorRoles();

  return (

    <SectionPanel dividerBottom >
      <SectionPanelHeader>
        <SectionPanelName>Roles</SectionPanelName>
        {/* <ButtonTool>
                    <PlusIcon />
                </ButtonTool> */}
      </SectionPanelHeader>
      <SectionPanelBody>
        <List gap={0}>
          {membersRoles?.map((role) => (
            <ActorRoleListItem key={role.id} actorRole={role} />
          ))}
        </List>
      </SectionPanelBody>
    </SectionPanel>


  );
};

