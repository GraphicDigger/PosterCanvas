/** @jsxImportSource @emotion/react */
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '@/shared/uiKit/SectionPanel';
import { Field, Label, TextField } from '@/shared/uiKit/Fields';
import { Button } from '@/shared/uiKit/Button';
import { Box } from '@/shared/uiKit/Box';

export const TestDrive = () => {

  return (
    <>
      <SectionPanel dividerBottom>
        <SectionPanelHeader>
          <SectionPanelName>Argument 1</SectionPanelName>
          String
        </SectionPanelHeader>
        <SectionPanelBody>
          <Field>
            <Label>Value</Label>
            <TextField width={150} />
          </Field>
        </SectionPanelBody>
      </SectionPanel>


      <SectionPanel dividerBottom>
        <SectionPanelHeader>
          <SectionPanelName>Argument 2</SectionPanelName>
          String
        </SectionPanelHeader>
        <SectionPanelBody>
          <Field>
            <Label>Value</Label>
            <TextField width={150} />
          </Field>
        </SectionPanelBody>
      </SectionPanel>


      <SectionPanel dividerBottom>
        <SectionPanelHeader>
          <SectionPanelName>Return</SectionPanelName>
        </SectionPanelHeader>
        <SectionPanelBody>
          <TextField placeholder='return value' />
        </SectionPanelBody>
      </SectionPanel>


      <Box css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '16px',
        height: '100%',
      }}>
        <Button>Run Test</Button>
      </Box>
    </>

  );
};
