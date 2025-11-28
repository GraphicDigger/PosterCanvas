import React, { useState, useEffect } from 'react';
import { Surface } from '@/shared/uiKit/Surface';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '@/shared/uiKit/SectionPanel';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { PlusIcon, CrossIcon } from '@/shared/assets/icons';
import { SlotBar, LeftSlot, RightSlot } from '@/shared/uiKit/SlotBar';
import { Text } from '@/shared/uiKit/Text';
import { TextField, Field, Label, Select } from '@/shared/uiKit/Fields';
import { Stack } from '@/shared/uiKit/Stack';
import { Button } from '@/shared/uiKit/Button';
import { ActionWrapper, RightAction } from '@/shared/uiKit/ActionWrapper';
import { MenuItem } from '@/shared/uiKit/Menu';
import { useApiCallMutations, useApiCall, USE_AS } from '@/entities/api';
import { ViewerPanel, ViewerPanelHeader, ViewerPanelBody } from '@/shared/uiKit/Viewer';


export const ApiCall = () => {
  const {
    selectedCall,
    selectedCallId,
  } = useApiCall();


  const {
    addCallHeader,
    removeCallHeader,
    addCallParameter,
    removeCallParameter,
    updateCallHeaderKey,
    updateCallHeaderValue,
    updateCallParameterKey,
    updateCallParameterValue,
    updateCallUseAs,
    updateCallDataType,
    updateCallRequestType,
  } = useApiCallMutations();

  const { updateCallValue } = useApiCallMutations();

  const handleUpdateCallValue = (value) => {
    updateCallValue(value);
  };

  const handleUpdateUseAs = (value) => {
    updateCallUseAs(value);
  };

  const handleUpdateCallDataType = (value) => {
    updateCallDataType(value);
  };

  const handleUpdateCallRequestType = (value) => {
    updateCallRequestType(value);
  };

  const handleAddCallHeader = () => {
    addCallHeader();
  };

  const handleRemoveCallHeader = (headerId) => {
    removeCallHeader(headerId);
  };

  const handleAddCallParameter = () => {
    addCallParameter();
  };

  const handleRemoveCallParameter = (parameterId) => {
    removeCallParameter(parameterId);
  };

  const handleUpdateCallHeaderKey = (headerId) => (value) => {
    updateCallHeaderKey(headerId, value);
  };

  const handleUpdateCallHeaderValue = (headerId) => (value) => {
    updateCallHeaderValue(headerId, value);
  };

  const handleUpdateCallParameterKey = (parameterId) => (value) => {
    updateCallParameterKey(parameterId, value);
  };

  const handleUpdateCallParameterValue = (parameterId) => (value) => {
    updateCallParameterValue(parameterId, value);
  };


  console.log('selectedCall', selectedCall);
  // console.log('[ApiCall] selectedCall', selectedCall);

  if (!selectedCall) {
    return null;
  }

  return (
    <ViewerPanel anchor='left' minWidth={400}>
      <ViewerPanelHeader title={selectedCall?.name} />
      <ViewerPanelBody padding={0}>

        <SectionPanel dividerBottom>
          <SectionPanelBody>
            <Stack direction='column' gap={3}>
              <Field direction='column'>
                <Label> Use as </Label>
                <Select value={selectedCall.useAs} onChange={handleUpdateUseAs}>
                  <MenuItem value="data">Data</MenuItem>
                  <MenuItem value="file">File</MenuItem>
                </Select>
              </Field>
              <Field direction='column'>
                <Label> Data type </Label>
                <Select value={selectedCall.dataType} onChange={handleUpdateCallDataType}>
                  <MenuItem value="json">JSON</MenuItem>
                  <MenuItem value="form">Form Data</MenuItem>
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="binary">Binary</MenuItem>
                </Select>
              </Field>
              <Field direction='column'>
                <Label> Request type </Label>
                <Select value={selectedCall.requestType} onChange={handleUpdateCallRequestType}>
                  <MenuItem value="get">GET</MenuItem>
                  <MenuItem value="post">POST</MenuItem>
                  <MenuItem value="put">PUT</MenuItem>
                  <MenuItem value="delete">DELETE</MenuItem>
                </Select>
              </Field>
              <Field direction='column'>
                <Label> Value </Label>
                <TextField
                  value={selectedCall.value}
                  onChange={handleUpdateCallValue}
                />
              </Field>
            </Stack>
          </SectionPanelBody>
        </SectionPanel>

        <SectionPanel dividerBottom>
          <SectionPanelHeader>
            <SectionPanelName>Headers</SectionPanelName>
            <ButtonTool onClick={handleAddCallHeader}>
              <PlusIcon />
            </ButtonTool>
          </SectionPanelHeader>
          {selectedCall.headers.length > 0 && (
            <SectionPanelBody>
              <Stack gap={4}>
                {selectedCall.headers.map((header) => (
                  <ActionWrapper key={header.id}>
                    <Stack direction='row' gap={2}>
                      <Field direction='column' key={header.id}>
                        <Label>
                                                    Key
                        </Label>
                        <TextField
                          value={header.key}
                          onChange={handleUpdateCallHeaderKey(header.id)}
                        />
                      </Field>
                      <Field direction='column'>
                        <Label>
                                                    Value
                        </Label>
                        <TextField
                          value={header.value}
                          onChange={handleUpdateCallHeaderValue(header.id)}
                        />
                      </Field>
                    </Stack>
                    <RightAction onClick={() => handleRemoveCallHeader(header.id)}>
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
            <SectionPanelName>Parameters</SectionPanelName>
            <ButtonTool onClick={handleAddCallParameter}>
              <PlusIcon />
            </ButtonTool>
          </SectionPanelHeader>
          {selectedCall.parameters.length > 0 && (
            <SectionPanelBody>
              <Stack gap={4}>
                {selectedCall.parameters.map((parameter) => (
                  <ActionWrapper key={parameter.id}>
                    <Stack direction='row' gap={2}>
                      <Field direction='column' key={parameter.id}>
                        <Label>
                                                    Key
                        </Label>
                        <TextField
                          value={parameter.key}
                          onChange={handleUpdateCallParameterKey(parameter.id)}
                        />
                      </Field>
                      <Field direction='column'>
                        <Label>
                                                    Value
                        </Label>
                        <TextField
                          value={parameter.value}
                          onChange={handleUpdateCallParameterValue(parameter.id)}
                        />
                      </Field>
                    </Stack>
                    <RightAction onClick={() => handleRemoveCallParameter(parameter.id)}>
                      <CrossIcon />
                    </RightAction>
                  </ActionWrapper>
                ))}
              </Stack>
            </SectionPanelBody>
          )}
        </SectionPanel>

      </ViewerPanelBody >
    </ViewerPanel>
  );
};
