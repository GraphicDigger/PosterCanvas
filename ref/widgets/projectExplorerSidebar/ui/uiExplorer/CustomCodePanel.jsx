/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '@/shared/uiKit/SectionPanel';
import { ButtonToolGroup, ButtonTool } from '@/shared/uiKit/ButtonTool';
import { List } from '@/shared/uiKit/List';
import { PlusIcon } from '@/shared/assets/icons';
import { SetAccessToCode } from '@/features/setAccessToСode';
import { CodeListItem } from '../../../../entities/code/ui/CodeListItem';
import { useCodes } from '../../../../entities/code/model';


export const CustomCodePanel = () => {

  const { customCodes } = useCodes();

  return (
    <>
      <SectionPanel dividerBottom>
        <SectionPanelHeader>
          <SectionPanelName>Custom Code</SectionPanelName>
          <ButtonToolGroup fill={false}>
            <ButtonTool>
              <PlusIcon />
            </ButtonTool>
          </ButtonToolGroup>
        </SectionPanelHeader>
        {customCodes && customCodes.length > 0 && (
          <SectionPanelBody>
            <List gap={0}>
              {customCodes && customCodes.map(code => (
                <CodeListItem
                  key={code.id}
                  id={code.id}
                  name={code.name}
                  actionSlot={<SetAccessToCode />}
                />
              ))}
            </List>
          </SectionPanelBody>
        )}
      </SectionPanel>

    </>
  );
};
