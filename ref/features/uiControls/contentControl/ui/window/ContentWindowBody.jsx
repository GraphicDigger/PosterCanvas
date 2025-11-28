/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';
import { List } from '../../../../../shared/uiKit/List';
import { EProp, useProps } from '../../../../../entities/varProp';
import { EToken, useColorTokens } from '../../../../../entities/varToken';
import { useContentControl, CONTENT_KINDS } from '../../model';
import { useFocusEntity } from '../../../../../entities/uiFocus';
import { useElementById, useElementMutations } from '../../../../../entities/uiElement';
import { ENTITY_KINDS } from '../../../../../shared/constants';

export const ContentWindowBody = () => {

  const { focusEntity } = useFocusEntity();
  const { selectedTab } = useContentControl();
  const { colorTokens } = useColorTokens();
  const { selectedComponentProps } = useProps();

  const { updateElementContent } = useElementMutations();

  const handleUpdateContent = (prop) => {
    if (!prop) {return;}
    updateElementContent(focusEntity?.id, {
      binding: {
        elementId: focusEntity?.id,
        type: ENTITY_KINDS.PROP,
        id: prop?.id,
      },
    });
  };

  const content = useMemo(() => {
    if (selectedTab === CONTENT_KINDS.PROPS) {
      return (
        <>
          {selectedComponentProps.map((prop) => {
            return (
              <EProp
                key={prop.id}
                prop={prop}
                onClick={() => handleUpdateContent(prop)}
              />
            );
          })}
        </>
      );
    }

    if (selectedTab === CONTENT_KINDS.TOKEN) {
      return (
        <>
          {colorTokens.map((token) => (
            <EToken
              uiView='listItem'
              key={token.id}
              id={token.id}
              name={token.name}
              value={token.mode?.value}
            />
          ))}
        </>
      );
    }

    return null;
  }, [selectedTab, selectedComponentProps, colorTokens]);

  return (
    <List>
      {content}
    </List>
  );
};

