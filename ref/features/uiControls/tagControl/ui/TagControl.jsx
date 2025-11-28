/** @jsxImportSource @emotion/react */
import React from 'react';
import { Select } from '../../../../shared/uiKit/Fields';
import { useElement, useElementMutations, getElementTagsByType } from '../../../../entities/uiElement';
import { MenuItemRadio } from '../../../../shared/uiKit/Menu';

export const TagControl = () => {

  const { focusedElement } = useElement();
  const { updateElement  } = useElementMutations();
  const tags = getElementTagsByType(focusedElement?.type);

  const handleChange = (value) => {
    updateElement(focusedElement.id, { ...focusedElement, tag: value });
  };

  return (
    <Select
      value={focusedElement?.tag}
      onChange={(value) => handleChange(value)}
      width={150}
      variant='radio'
    >
      {tags.map((tag) => (
        <MenuItemRadio key={tag} value={tag} name="radioGroup">
          {tag}
        </MenuItemRadio>
      ))}
    </Select>
  );
};

