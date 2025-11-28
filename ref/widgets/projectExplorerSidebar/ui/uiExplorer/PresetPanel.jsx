/** @jsxImportSource @emotion/react */
import React, { useCallback } from 'react';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { SectionPanel, SectionPanelHeader, SectionPanelBody } from '../../../../shared/uiKit/SectionPanel';
import { ButtonToolGroup } from '../../../../shared/uiKit/ButtonTool';
import { List } from '../../../../shared/uiKit/List';
import { SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { PlusIcon } from '../../../../shared/assets/icons';
import { EPresetCollection, usePresetCollections, usePresetCollectionMutation } from '../../../../entities/varPresetCollection';
import { AddCollection } from '../../../../features/TokenAndPresetControl';

export const PresetPanel = () => {

  const { allPresetCollections } = usePresetCollections();

  // console.log('[PresetPanel] allPresetCollections', allPresetCollections)

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Presets</SectionPanelName>
        <ButtonToolGroup fill={false}>
          <AddCollection type={ENTITY_KINDS.PRESET_COLLECTION} />
        </ButtonToolGroup>
      </SectionPanelHeader>
      {allPresetCollections.length > 0 && (
        <SectionPanelBody>
          <List gap='0'>
            {allPresetCollections.map(collection => (
              <EPresetCollection
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
