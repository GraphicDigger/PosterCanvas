/** @jsxImportSource @emotion/react */
import React from 'react';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { List } from '../../../../shared/uiKit/List';
import { ButtonToolGroup } from '../../../../shared/uiKit/ButtonTool';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { ETokenCollection, useTokenCollection } from '../../../../entities/varTokenCollection';
import { AddCollection } from '../../../../features/TokenAndPresetControl';
import { useToken } from '../../../../entities/varToken';

export const TokenPanel = () => {

  const { allTokenCollections } = useTokenCollection();
  const { allTokens } = useToken();

  // console.log(' [TokenPanel] allTokens', allTokens)

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Tokens</SectionPanelName>
        <ButtonToolGroup fill={false}>
          <AddCollection type={ENTITY_KINDS.TOKEN_COLLECTION} />
        </ButtonToolGroup>
      </SectionPanelHeader>
      {allTokenCollections.length > 0 && (
        <SectionPanelBody>
          <List gap='0'>
            {allTokenCollections.map(collection => (
              <ETokenCollection
                key={collection.id}
                collection={collection}
              />
            ))}
          </List>
        </SectionPanelBody>
      )}
    </SectionPanel>
  );
};
