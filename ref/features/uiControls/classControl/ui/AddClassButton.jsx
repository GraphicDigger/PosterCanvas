/** @jsxImportSource @emotion/react */
import React from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { PlusIcon, SearchIcon } from '../../../../shared/assets/icons';
import { Field, Label, TextField } from '../../../../shared/uiKit/Fields';
import { WindowPopover, WindowTrigger, Window, WindowHead, WindowBody } from '../../../../shared/uiKit/Window';
import { SlotBar, RightSlot } from '../../../../shared/uiKit/SlotBar';
import { List } from '../../../../shared/uiKit/List';
import { useElement, useElementMutations } from '../../../../entities/uiElement';
import { EHtmlAttr, useHtmlAttrs } from '../../../../entities/htmlAttribute';
import { Scrollbar } from '../../../../shared/uiKit/Scrollbar';

export const AddClassButton = () => {

  const { focusedElement } = useElement();
  const { allHtmlAttrs } = useHtmlAttrs();
  const { updateAttribute } = useElementMutations();

  const handleAddClass = (attr) => {
    if (!focusedElement) {return;}

    updateAttribute(focusedElement.id, {
      name: 'className',
      value: 'class',
    });
  };

  return (
    <ButtonTool onClick={() => handleAddClass()}>
      <PlusIcon />
    </ButtonTool>
  );
};

