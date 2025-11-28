/** @jsxImportSource @emotion/react */
import React from 'react';
import { Field, Label, TextField } from '../../../../../shared/uiKit/Fields';
import { ButtonToolToggle, ButtonTool } from '../../../../../shared/uiKit/ButtonTool';
import { TextAlignLeftIcon, TextAlignCenterIcon, TextAlignRightIcon } from '../../../../../shared/assets/icons';


export const alignments = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
};

export const AlignField = ({ value, onChange }) => {

  return (
    <Field>
      <Label>Align</Label>
      <ButtonToolToggle
        width={150}
        value={value}
        onChange={onChange}
      >
        <ButtonTool width='100%' value={alignments.LEFT}>
          <TextAlignLeftIcon />
        </ButtonTool>
        <ButtonTool width='100%' value={alignments.CENTER}>
          <TextAlignCenterIcon />
        </ButtonTool>
        <ButtonTool width='100%' value={alignments.RIGHT}>
          <TextAlignRightIcon />
        </ButtonTool>
      </ButtonToolToggle>
    </Field>
  );
};

