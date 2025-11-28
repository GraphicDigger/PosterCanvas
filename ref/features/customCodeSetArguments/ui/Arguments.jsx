/** @jsxImportSource @emotion/react */
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '../../../shared/uiKit/SectionPanel';
import { Divider } from '../../../shared/uiKit/Divider';
import { Field, Label, TextField, Select } from '../../../shared/uiKit/Fields';
import { lineColors } from '../../../shared/styles';
import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { ActionWrapper } from '../../../shared/uiKit/ActionWrapper';

import { PlusIcon, DragDropIcon } from '../../../shared/assets/icons';

const returnOptions = [
  { value: 'boolean', label: 'Boolean' },
  { value: 'string', label: 'String' },
  { value: 'number', label: 'Number' },
];


export const Arguments = () => {


  return (
    <>
      <SectionPanel>
        <SectionPanelBody marginTop >
          <Field>
            <Label>Return</Label>
            <Select width={150} options={returnOptions} optionsFullWidth />
          </Field>
        </SectionPanelBody>
      </SectionPanel>


      <SectionPanel dividerBottom>
        <SectionPanelHeader>
          <SectionPanelName>Arguments</SectionPanelName>
          <ButtonTool>
            <PlusIcon />
          </ButtonTool>
        </SectionPanelHeader>
      </SectionPanel>


      <SectionPanel dividerBottom>
        <SectionPanelHeader>
          <ActionWrapper beforeButtonIcon={<DragDropIcon />}>
            Argument 1
          </ActionWrapper>
        </SectionPanelHeader>
        <SectionPanelBody>
          <Field>
            <Label>Type</Label>
            <Select width={150} options={returnOptions} optionsFullWidth />
          </Field>
          <Field>
            <Label>Name</Label>
            <TextField width={150} />
          </Field>
        </SectionPanelBody>
      </SectionPanel>


      <SectionPanel dividerBottom>
        <SectionPanelHeader>
          <ActionWrapper beforeButtonIcon={<DragDropIcon />}>
            Argument 2
          </ActionWrapper>
        </SectionPanelHeader>
        <SectionPanelBody>
          <Field>
            <Label>Type</Label>
            <Select width={150} options={returnOptions} optionsFullWidth />
          </Field>
          <Field>
            <Label>Name</Label>
            <TextField width={150} />
          </Field>
        </SectionPanelBody>
      </SectionPanel>
    </>

  );
};
