/** @jsxImportSource @emotion/react */
import React from 'react';
import { MinusIcon } from '../../../../shared/assets/icons';
import { useElement, useElementMutations } from '../../../../entities/uiElement';
import { TextField } from '../../../../shared/uiKit/Fields';
import { ActionWrapper, RightAction } from '../../../../shared/uiKit/ActionWrapper';


export const ClassControl = () => {

  const { focusedElement, elementCssClasses } = useElement();
  const { updateAttribute, removeAttribute } = useElementMutations();

  const handleChange = (attr, value) => {
    updateAttribute(focusedElement.id, { ...attr, value: value });
  };

  const handleRemoveAttribute = (attrId) => {
    removeAttribute(focusedElement.id, attrId);
  };

  return (
    <>
      {elementCssClasses.map((cssClass) => (
        <ActionWrapper key={cssClass.id}>
          <TextField value={cssClass.value} onChange={(value) => handleChange(cssClass, value)} />
          <RightAction onClick={() => handleRemoveAttribute(cssClass.id)}>
            <MinusIcon />
          </RightAction>
        </ActionWrapper>
      ))}
    </>
  );
};

