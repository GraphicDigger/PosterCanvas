import React from 'react';
import { RoleField, PositionField, AgentField } from '.';
import { Stack } from '../../../../../shared/uiKit/Stack';

export const MemberGeneralSettings = () => {

  return (
    <>
      <RoleField />
      <PositionField />
      <AgentField />
    </>
  );
};
