import React, { useCallback, useMemo } from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { TextField } from '../../../../shared/uiKit/Fields';
import {
  PROPERTY_TYPES,
  useElement,
  useElementMutations,
} from '../../../../entities/uiElement';
import { BindVariableToPropertyPicker } from '../../../../entities/binding';
import { useBoundVariableValue } from '../../../../entities/binding';

export const ContentControl = () => {

  const { focusedElement } = useElement();
  const { contentValue } = useBoundVariableValue(focusedElement?.id);
  const { updateContent } = useElementMutations();

  // console.log('[ContentControl] focusedElement', JSON.stringify(focusedElement, null, 2))

  const handleUpdateContent = useCallback((value) => {
    updateContent(focusedElement?.id, { text: value });
  }, [focusedElement?.id, updateContent]);

  const body = useMemo(() => {

    if (contentValue?.type === 'text') {
      return (
        <>
          <BindVariableToPropertyPicker
            propertyType={PROPERTY_TYPES.CONTENT}
            propertyValue={contentValue}
            width='fill'
            window={{
              offset: 16,
            }}
          >
            <TextField
              value={contentValue?.value}
              onChange={handleUpdateContent}
              bufferOnBlur
            />
          </BindVariableToPropertyPicker>
        </>
      );
    }

    if (contentValue?.type === 'image') {
      return (
        <BindVariableToPropertyPicker
          propertyType={PROPERTY_TYPES.CONTENT}
          propertyValue={contentValue}
          width='fill'
        >
          <TextField
            value={contentValue?.value}
            onChange={handleUpdateContent}
            bufferOnBlur
          />
        </BindVariableToPropertyPicker>
      );
    }

    return (
      <BindVariableToPropertyPicker
        propertyType={PROPERTY_TYPES.CONTENT}
        propertyValue={contentValue}
        width='fill'
      >
        <TextField
          value={contentValue?.value}
          onChange={handleUpdateContent}
          bufferOnBlur
        />
      </BindVariableToPropertyPicker>
    );

  }, [contentValue]);

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Content</SectionPanelName>
      </SectionPanelHeader>
      <SectionPanelBody>
        {body}
      </SectionPanelBody>
    </SectionPanel >
  );
};

