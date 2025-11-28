import React, { memo, useState, useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { CodeIcon } from '../../../shared/assets/icons';
import { Window, WindowHead, WindowBody, WindowTitle, WindowPopover, WindowTrigger } from '../../../shared/uiKit/Window';
import { SlotBar, LeftSlot, RightSlot } from '../../../shared/uiKit/SlotBar';
import { ButtonTool, ButtonToolGroup } from '../../../shared/uiKit/ButtonTool';
import { List } from '../../../shared/uiKit/List';
import { DataModelFieldListItem } from '../../dataModelField';
import { useDataModels } from '../model';
import { useDataModelStates } from '../model';
import { useDataModelFields } from '../../dataModelField';
import { Box } from '../../../shared/uiKit/Box';
import { Stack } from '../../../shared/uiKit/Stack';
import { PlusIcon, MinusIcon, CrossIcon, CheckIcon } from '../../../shared/assets/icons';


export const ModelCard = memo(({
  model,
  addModelFieldSlot,
  modelFields,
  fieldSettingsSlot,
}) => {

  const theme = useTheme();
  const [isCodeView, setIsCodeView] = useState(false);
  const { selectedModel } = useDataModels();
  const { handleSelectModel } = useDataModelStates();
  const { allModelFields } = useDataModelFields();

  const handleCodeViewToggle = useCallback(() => {
    setIsCodeView(prev => !prev);
  }, []);

  const handleSelectDataModel = useCallback(() => {
    handleSelectModel(model.id);
  }, [model]);

  const codeView = useMemo(() => {
    const modelFields = allModelFields.filter(field => field.modelId === model.id);

    return (
      <StyledPre>
        {`Table ${model.name} {
    ${modelFields.map(field => `${field.name} ${field.type}`).join('\n    ')}
}`}
      </StyledPre>
    );
  }, [model, allModelFields]);

  return (
    <Window
      backgroundColor={theme.sys.color.surfaceContainer.lowest}
      onClick={handleSelectDataModel}
    >
      <WindowHead noPadding>
        <SlotBar paddingVertical={0} paddingHorizontal={0}>
          <LeftSlot padding={1} >
            <WindowTitle>
              {model.label}
            </WindowTitle>
          </LeftSlot>
          <RightSlot>
            {addModelFieldSlot}
            <ButtonTool onClick={handleCodeViewToggle}>
              <CodeIcon />
            </ButtonTool>
          </RightSlot>
        </SlotBar>
      </WindowHead>
      <WindowBody>
        {isCodeView ? codeView : (
          <StyledList>
            {modelFields?.map(field => (
              <WindowPopover
                key={field.id}
                placement="right"
                offset={17}
                shift={true}
                flip={true}
                arrow={true}
                closeOnSelect={false}
              >
                <WindowTrigger>
                  <DataModelFieldListItem uiView='listItem' field={field} />
                </WindowTrigger>
                <Window>
                  <WindowHead>
                    <WindowTitle>
                      {field.label}
                    </WindowTitle>
                    <ButtonToolGroup fill={false}>
                      <ButtonTool>
                        <CrossIcon />
                      </ButtonTool>
                      <ButtonTool>
                        <CheckIcon />
                      </ButtonTool>
                    </ButtonToolGroup>
                  </WindowHead>
                  <WindowBody>
                    {fieldSettingsSlot}
                  </WindowBody>
                </Window>
              </WindowPopover>
            ))}
          </StyledList>
        )}
      </WindowBody>
    </Window>
  );
});

const StyledPre = styled.pre`
    margin: 0;
    width: 100%;
    white-space: pre;
    font-family: Consolas, Monaco, 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.5;
    color: white;
`;

const StyledList = styled(List)`
    position: relative;
`;
