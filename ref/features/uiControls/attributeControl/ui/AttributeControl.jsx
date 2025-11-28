/** @jsxImportSource @emotion/react */
import React from 'react';
import { Field, Label, TextField } from '../../../../shared/uiKit/Fields';
import { useElement, useElementMutations } from '../../../../entities/uiElement';
import { EHtmlAttr } from '../../../../entities/htmlAttribute';
import { ActionWrapper } from '../../../../shared/uiKit/ActionWrapper';
import { MinusIcon } from '../../../../shared/assets/icons';
import { RightAction } from '../../../../shared/uiKit/ActionWrapper';

export const AttributeControl = () => {

  const { focusedElement, elementAttributes } = useElement();
  const { updateAttribute, removeAttribute } = useElementMutations();

  const handleUpdateAttribute = (attr, value) => {
    updateAttribute(focusedElement.id, { ...attr, value: value });
  };

  const handleRemoveAttribute = (attrId) => {
    removeAttribute(focusedElement.id, attrId);
  };

  // console.log('focusedElement', JSON.stringify(focusedElement, null, 2));

  return (

    elementAttributes?.map((attr) => (
      <ActionWrapper key={attr.id}>
        <EHtmlAttr
          uiView='textField'
          attr={attr}
          onChange={(value) => handleUpdateAttribute(attr, value)}
        />
        <RightAction onClick={() => handleRemoveAttribute(attr.id)}>
          <MinusIcon />
        </RightAction>
      </ActionWrapper >
    ))

  );
};

