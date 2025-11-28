import React, { useMemo } from 'react';
import { Stack } from '@/shared/uiKit/Stack';
import { Surface } from '@/shared/uiKit/Surface';
import { Tabs } from '@/shared/uiKit/Tabs';
import { useAgentRoleSettingsTabs } from '../model';
import { AGENT_TAB_CONTENT } from '@/entities/actorRole';
import { Viewer, ViewerWindow, ViewerPanel, ViewerPanelHeader, LeftSlot, ViewerPanelBody } from '@/shared/uiKit/Viewer';
import { FieldList, Field, Label, TextField, Select } from '@/shared/uiKit/Fields';
import { MenuItem } from '@/shared/uiKit/Menu';
import { useProjectMutation, useProjects } from '@/entities/project';
import { Text } from '@/shared/uiKit/Text';

export const ProjectDatabaseSettings = () => {

  const { updateProjectSettings } = useProjectMutation();
  const { selectedProject } = useProjects();

  const currentDatabaseType = selectedProject?.settings?.databaseType;


  const handleChangeDBType = (value) => {
    updateProjectSettings(selectedProject.id, { databaseType: value });
  };

  return (
    <Viewer groupId='databaseProjectSettings'>
      <ViewerWindow step={1} >
        <ViewerPanel anchor='left' >
          <ViewerPanelHeader title='Database Settings'>
          </ViewerPanelHeader>
          <ViewerPanelBody>
            <FieldList gap={3}>
              <Field direction='column'>
                <Label> Data type </Label>
                <Select
                  value={currentDatabaseType}
                  onChange={handleChangeDBType}
                >
                  <MenuItem value="sql">SQL</MenuItem>
                  <MenuItem value="postgresql">PostgreSQL</MenuItem>
                  <MenuItem value="graphql">GraphQL</MenuItem>
                  <MenuItem value="rest">REST</MenuItem>
                  <MenuItem value="supabase">Supabase</MenuItem>
                  <MenuItem value="mongodb">MongoDB</MenuItem>
                </Select>
              </Field>
              <Field direction='column'>
                <Label> {currentDatabaseType} settings </Label>
                <TextField />
              </Field>
            </FieldList>
          </ViewerPanelBody>
        </ViewerPanel>
      </ViewerWindow>
    </Viewer>
  );
};
