import React from 'react';
import { Field, TextFieldMultiple } from '@/shared/uiKit/Fields';
import { useActorRoles, useActorRoleMutations } from '@/entities/actorRole/model';


export const AgentPromptSettings = () => {

  return (
    <>
      <PromptField />
    </>
  );
};


export const PromptField = () => {

  const { selectedActorRole } = useActorRoles();
  const { updateActorRolePrompt } = useActorRoleMutations();

  const handleUpdateActorRolePrompt = (value) => {
    updateActorRolePrompt(value);
  };

  return (
    <Field direction='column'>
      <TextFieldMultiple
        value={selectedActorRole?.prompt}
        onChange={handleUpdateActorRolePrompt}
        placeholder='Enter prompt'
      />
    </Field>
  );
};
