import React from 'react';
import { useActorRoles, useActorRoleMutations } from '@/entities/actorRole/model';
import { Field, Label, Select, TextField } from '@/shared/uiKit/Fields';
import { MenuItem } from '@/shared/uiKit/Menu';
import { useActorPositions } from '@/entities/actorPosition';
import { MenuItemCheckbox } from '@/shared/uiKit/Menu';


export const AgentGeneralSettings = () => {

  return (
    <>
      <RoleField />
      <PositionField />
    </>
  );
};


export const MemberGeneralSettings = () => {

  return (
    <>
      <RoleField />
      <PositionField />
      <AgentField />
    </>
  );
};


export const RoleField = () => {
  const { selectedActorRole } = useActorRoles();
  const { updateActorRoleName } = useActorRoleMutations();

  const handleUpdateActorRoleName = (value) => {
    updateActorRoleName(value);
  };

  return (
    <Field direction='column'>
      <Label>Role name</Label>
      <TextField value={selectedActorRole?.name} onChange={handleUpdateActorRoleName} />
    </Field>
  );
};


export const PositionField = () => {
  const { selectedActorRole } = useActorRoles();
  const { updateActorRolePosition } = useActorRoleMutations();
  const { allActorPositions } = useActorPositions();
  const handleUpdateActorRolePosition = (value) => {
    updateActorRolePosition(value);
  };
  return (
    <Field direction='column'>
      <Label>Position</Label>
      <Select value={selectedActorRole?.positionId} onChange={handleUpdateActorRolePosition}>
        {allActorPositions.map((position) => (
          <MenuItem key={position.id} value={position.id}>{position.name}</MenuItem>
        ))}
      </Select>
    </Field>
  );
};


export const AgentField = () => {
  const { selectedActorRole, agentsRoles } = useActorRoles();
  const { updateActorRoleAgentRoleId } = useActorRoleMutations();

  const handleUpdateActorRoleAgentRoleId = (value) => {
    updateActorRoleAgentRoleId(value);
  };

  return (
    <Field direction='column'>
      <Label>Agent</Label>
      <Select
        value={selectedActorRole?.agentRoleId || []}
        onChange={handleUpdateActorRoleAgentRoleId}
        placeholder='Select an agent'
        multiple
      >
        {agentsRoles.map((role) => (
          <MenuItemCheckbox
            key={role.id}
            value={role.id}
          >
            {role.name}
          </MenuItemCheckbox>
        ))}
      </Select>
    </Field>
  );
};

