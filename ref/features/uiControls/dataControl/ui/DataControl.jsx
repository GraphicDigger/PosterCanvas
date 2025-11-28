/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { ENTITY_KINDS } from '@/shared/constants';
import { PlusIcon, MinusIcon } from '@/shared/assets/icons';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '@/shared/uiKit/SectionPanel';
import { ButtonTool, ButtonToolGroup } from '@/shared/uiKit/ButtonTool';
import { useElement } from '@/entities/uiElement';
import { DataVariableListItem } from '@/entities/varVariableData';
import { PropListItem } from '@/entities/varProp';
import { DataPicker, useBindElementToVariable, UnbindElementFromVariableButton } from '@/entities/binding';


export const DataControl = () => {

  const { elementBoundVariables } = useElement();

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Data</SectionPanelName>
        <ButtonToolGroup fill={false}>
          {elementBoundVariables.length > 0 ?
            <UnbindElementFromVariableButton />
            :
            <DataPicker >
              <ButtonTool>
                <PlusIcon />
              </ButtonTool>
            </DataPicker>
          }
        </ButtonToolGroup>
      </SectionPanelHeader>
      {elementBoundVariables.length > 0 &&
                <SectionPanelBody>
                  {elementBoundVariables.map((variable) => (
                    <DataPicker key={variable.id} windowSetting={{ offset: 16 }}>
                      <DataControlItem
                        key={variable.id}
                        variable={variable}
                      />
                    </DataPicker>
                  ))}
                </SectionPanelBody>
      }
    </SectionPanel>
  );
};


export const DataControlItem = ({ variable, onClick }) => {

  const render = useMemo(() => {

    if (variable.kind === ENTITY_KINDS.DATA_VARIABLE) {
      return <DataVariableListItem variable={variable} />;

    } if (variable.kind === ENTITY_KINDS.PROP) {
      return <PropListItem prop={variable} />;
    }

    return null;
  }, [variable]);

  return (
    <StyledProxy onClick={onClick}>
      {render}
    </StyledProxy>
  );
};


const StyledProxy = styled.div`
    display: contents;
`;
