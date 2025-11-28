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

export const AddAttributeButton = () => {

  const { focusedElement } = useElement();
  const { allHtmlAttrs } = useHtmlAttrs();
  const { updateAttribute } = useElementMutations();

  const handleAddAttribute = (attr) => {
    if (!focusedElement) {return;}

    const newAttr = {
      name: attr.jsxName,
      value: attr.value || '',
    };

    updateAttribute(focusedElement.id, newAttr);
  };

  return (
    <WindowPopover
      placement='left-start'
      offset={207}
      flip={true}
      shift={true}
      closeOnSelect={false}
    >
      <WindowTrigger>
        <ButtonTool>
          <PlusIcon />
        </ButtonTool>
      </WindowTrigger>
      <Window>
        <WindowHead padding={8}>
          <SlotBar paddingVertical={0} paddingHorizontal={0}>
            <RightSlot>
              <ButtonTool>
                <SearchIcon />
              </ButtonTool>
            </RightSlot>
          </SlotBar>
        </WindowHead>
        <WindowBody>
          <Scrollbar height={300}>
            <List>
              {allHtmlAttrs.map((attr) => (
                <EHtmlAttr key={attr.id} attr={attr} onClick={() => handleAddAttribute(attr)} />
              ))}
            </List>
          </Scrollbar>
        </WindowBody>
      </Window>
    </WindowPopover>

  );
};

