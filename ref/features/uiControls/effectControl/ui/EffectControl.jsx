/** @jsxImportSource @emotion/react */
import React from 'react';
import { Shadow } from './components/Shadow';
import { List } from '../../../../shared/uiKit/List';
import { useShadow } from '../model';

export const EffectControl = () => {

  return (
    <List>
      <Shadow />
    </List>
  );
};

