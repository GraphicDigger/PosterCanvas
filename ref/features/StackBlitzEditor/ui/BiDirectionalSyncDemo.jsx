/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '../../../app/providers';
import { surfaceColors } from '../../../shared/styles';
import { Surface } from '../../../shared/uiKit/Surface';
import { Button } from '../../../shared/uiKit/Button';

const DemoContainer = styled.div`
  padding: 20px;
  background: ${props => surfaceColors(props.theme).saturate10};
  border-radius: 8px;
  margin: 10px;
`;

const DemoSection = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: ${props => surfaceColors(props.theme).saturate20};
  border-radius: 6px;
  border-left: 4px solid #007acc;
`;

const DemoTitle = styled.h3`
  margin: 0 0 10px 0;
  color: ${props => surfaceColors(props.theme).saturate90};
  font-size: 16px;
  font-weight: 600;
`;

const DemoDescription = styled.p`
  margin: 0 0 15px 0;
  color: ${props => surfaceColors(props.theme).saturate70};
  font-size: 14px;
  line-height: 1.4;
`;

const DemoSteps = styled.ol`
  margin: 0;
  padding-left: 20px;
  color: ${props => surfaceColors(props.theme).saturate70};
  font-size: 14px;
  line-height: 1.6;
`;

const DemoStep = styled.li`
  margin-bottom: 8px;
`;

const StatusIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 10px;
  
  &.active {
    background: #4caf50;
    color: white;
  }
  
  &.inactive {
    background: #f44336;
    color: white;
  }
`;

export const BiDirectionalSyncDemo = () => {
  const { theme } = useTheme();
  const [syncStatus, setSyncStatus] = useState('active');

  return (
    <Surface background={surfaceColors(theme).saturate5}>
      <DemoContainer theme={theme}>
        <DemoTitle>
          Bi-Directional Synchronization Demo
          <StatusIndicator className={syncStatus}>
            {syncStatus === 'active' ? '🔄 Active' : '⏸️ Inactive'}
          </StatusIndicator>
        </DemoTitle>

        <DemoDescription>
          This demo shows how changes in the control panel automatically sync with the StackBlitz editor and vice versa.
        </DemoDescription>

        <DemoSection theme={theme}>
          <DemoTitle>Control Panel → StackBlitz Editor</DemoTitle>
          <DemoDescription>
            When you change element properties in the control panel, they automatically update in the StackBlitz editor:
          </DemoDescription>
          <DemoSteps theme={theme}>
            <DemoStep>Select an element in the canvas</DemoStep>
            <DemoStep>Change background color in the Fill control</DemoStep>
            <DemoStep>Change text content in the Content control</DemoStep>
            <DemoStep>Watch the StackBlitz preview update automatically</DemoStep>
            <DemoStep>Check the props.js file - it will contain the new values</DemoStep>
          </DemoSteps>
        </DemoSection>

        <DemoSection theme={theme}>
          <DemoTitle>StackBlitz Editor → Control Panel</DemoTitle>
          <DemoDescription>
            When you edit code in the StackBlitz editor, changes reflect in the control panel:
          </DemoDescription>
          <DemoSteps theme={theme}>
            <DemoStep>Edit the component code in StackBlitz</DemoStep>
            <DemoStep>Add or modify prop bindings (e.g., props.backgroundColor)</DemoStep>
            <DemoStep>Save the file (Ctrl+S)</DemoStep>
            <DemoStep>Watch the control panel update with new bindings</DemoStep>
            <DemoStep>Element properties will show the new prop connections</DemoStep>
          </DemoSteps>
        </DemoSection>

        <DemoSection theme={theme}>
          <DemoTitle>Real-Time Monitoring</DemoTitle>
          <DemoDescription>
            The system continuously monitors for changes:
          </DemoDescription>
          <DemoSteps theme={theme}>
            <DemoStep>Element changes are checked every 1 second</DemoStep>
            <DemoStep>StackBlitz file changes are checked every 3 seconds</DemoStep>
            <DemoStep>All updates are debounced to prevent excessive API calls</DemoStep>
            <DemoStep>Console logs show detailed synchronization status</DemoStep>
          </DemoSteps>
        </DemoSection>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button
            onClick={() => setSyncStatus(syncStatus === 'active' ? 'inactive' : 'active')}
            variant="outlined"
          >
            {syncStatus === 'active' ? 'Pause Sync' : 'Resume Sync'}
          </Button>
        </div>
      </DemoContainer>
    </Surface>
  );
};
