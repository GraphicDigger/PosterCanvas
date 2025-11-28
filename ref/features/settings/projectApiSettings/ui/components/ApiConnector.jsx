import React, { useState, memo } from 'react';
import { ViewerPanel, ViewerPanelHeader, ViewerPanelBody, ViewerTrigger } from '@/shared/uiKit/Viewer';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '@/shared/uiKit/SectionPanel';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { PlusIcon, CrossIcon } from '@/shared/assets/icons';
import { SlotBar, LeftSlot } from '@/shared/uiKit/SlotBar';
import { Text } from '@/shared/uiKit/Text';
import { List, ListItem, ListItemButton } from '@/shared/uiKit/List';
import { TextField, Field, Label } from '@/shared/uiKit/Fields';
import { Stack } from '@/shared/uiKit/Stack';
import { ApiCallListItem, useApi, useApiMutations, useApiCallMutations, useApiCall } from '@/entities/api';
import { ActionWrapper, RightAction } from '@/shared/uiKit/ActionWrapper';

export const ApiConnector = memo(() => {

  const {
    selectedApi,
    selectedApiId,
    connector,
    allApis,
  } = useApi();

  const {
    selectedCallId,
    selectedCall,
  } = useApiCall();

  // console.log('[ApiConnector] selectedApi', selectedApi);

  const {
    updateApiName,
    updateApiAuthentication,
    updateApiKeyName,
    updateApiKeyValue,
    addApiHeader,
    removeApiHeader,
    updateApiHeaderKey,
    updateApiHeaderValue,
    addApiParameter,
    removeApiParameter,
    updateApiParameterKey,
    updateApiParameterValue,
  } = useApiMutations();

  const {
    addCall,
    removeCall,
  } = useApiCallMutations();

  // console.log('selectedApi', selectedApi);

  const handleApiNameChange = (value) => {
    updateApiName(value);
  };

  const handleAuthenticationChange = (value) => {
    updateApiAuthentication(value);
  };

  const handleKeyNameChange = (value) => {
    updateApiKeyName(value);
  };

  const handleKeyValueChange = (value) => {
    updateApiKeyValue(value);
  };

  const handleAddApiHeader = () => {
    addApiHeader();
  };

  const handleRemoveApiHeader = (headerId) => {
    removeApiHeader(headerId);
  };

  const handleHeaderKeyChange = (headerId) => (value) => {
    updateApiHeaderKey(headerId, value);
  };

  const handleHeaderValueChange = (headerId) => (value) => {
    updateApiHeaderValue(headerId, value);
  };

  const handleAddParameter = () => {
    addApiParameter();
  };

  const handleRemoveParameter = (parameterId) => {
    removeApiParameter(parameterId);
  };

  const handleParameterKeyChange = (parameterId) => (value) => {
    updateApiParameterKey(parameterId, value);
  };

  const handleParameterValueChange = (parameterId) => (value) => {
    updateApiParameterValue(parameterId, value);
  };

  const handleAddCall = () => {
    addCall();
  };

  const handleRemoveCall = (callId) => {
    removeCall(callId);
  };

  return (
    <ViewerPanel
      minWidth={300}
      width={400}
      maxWidth={500}
      anchor='left'
    >
      <ViewerPanelHeader title={selectedApi?.name} />
      <ViewerPanelBody padding={0}>

        <SectionPanel dividerBottom>
          <SectionPanelBody>
            <Stack gap={3}>
              <Field direction='column'>
                <Label> Api Name </Label>
                <TextField
                  value={selectedApi?.name}
                  onChange={handleApiNameChange}
                />
              </Field>
              <Field direction='column'>
                <Label> Authentication </Label>
                <TextField
                  value={connector?.authentication}
                  onChange={handleAuthenticationChange} />
              </Field>
              <Field direction='column'>
                <Label> Key Name </Label>
                <TextField
                  value={connector?.keyName}
                  onChange={handleKeyNameChange} />
              </Field>
              <Field direction='column'>
                <Label> Key Value </Label>
                <TextField
                  value={connector?.keyValue}
                  onChange={handleKeyValueChange} />
              </Field>
            </Stack>
          </SectionPanelBody>
        </SectionPanel>

        <SectionPanel dividerBottom>
          <SectionPanelHeader>
            <SectionPanelName>Shared headers for all calls</SectionPanelName>
            <ButtonTool onClick={handleAddApiHeader}>
              <PlusIcon />
            </ButtonTool>
          </SectionPanelHeader>
          {connector?.headers && connector?.headers?.length > 0 && (
            <SectionPanelBody>
              <Stack gap={4}>
                {connector?.headers?.map((header) => (
                  <ActionWrapper key={header.id}>
                    <Stack direction='row' gap={2}>
                      <Field direction='column'>
                        <Label> Key </Label>
                        <TextField
                          value={header.key}
                          onChange={handleHeaderKeyChange(header.id)} />
                      </Field>
                      <Field direction='column'>
                        <Label> Value </Label>
                        <TextField
                          value={header.value}
                          onChange={handleHeaderValueChange(header.id)} />
                      </Field>
                    </Stack>
                    <RightAction onClick={() => handleRemoveApiHeader(header.id)}>
                      <CrossIcon />
                    </RightAction>
                  </ActionWrapper>
                ))}
              </Stack>
            </SectionPanelBody>
          )}
        </SectionPanel>

        <SectionPanel dividerBottom>
          <SectionPanelHeader>
            <SectionPanelName>Shared parameters for all calls</SectionPanelName>
            <ButtonTool onClick={handleAddParameter}>
              <PlusIcon />
            </ButtonTool>
          </SectionPanelHeader>
          {connector?.parameters && connector?.parameters?.length > 0 && (
            <SectionPanelBody>
              <Stack gap={4}>
                {connector?.parameters?.map((param) => (
                  <ActionWrapper key={param.id}>
                    <Stack direction='row' gap={2}>
                      <Field direction='column'>
                        <Label> Key </Label>
                        <TextField
                          value={param.key}
                          onChange={handleParameterKeyChange(param.id)} />
                      </Field>
                      <Field direction='column'>
                        <Label> Value </Label>
                        <TextField
                          value={param.value}
                          onChange={handleParameterValueChange(param.id)} />
                      </Field>
                    </Stack>
                    <RightAction onClick={() => handleRemoveParameter(param.id)}>
                      <CrossIcon />
                    </RightAction>
                  </ActionWrapper>
                ))}
              </Stack>
            </SectionPanelBody>
          )}
        </SectionPanel>

        <SectionPanel dividerBottom>
          <SectionPanelHeader>
            <SectionPanelName>API Calls</SectionPanelName>
            <ButtonTool onClick={handleAddCall}>
              <PlusIcon />
            </ButtonTool>
          </SectionPanelHeader>
          {connector?.calls && connector?.calls?.length > 0 && (
            <SectionPanelBody>
              <List>
                {connector?.calls?.map((call) => (
                  <ViewerTrigger key={call.id} step={4} groupId='apiProjectSettings'>
                    <ApiCallListItem
                      key={call.id}
                      id={call.id}
                      name={call.name}
                      removeCall={handleRemoveCall}
                    />
                  </ViewerTrigger>
                ))}
              </List>
            </SectionPanelBody>
          )}
        </SectionPanel>

      </ViewerPanelBody>
    </ViewerPanel>
  );
});
