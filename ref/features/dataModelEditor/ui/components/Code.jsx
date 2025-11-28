/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '../../../../app/providers';
import { surfaceColors } from '../../../../shared/styles';
import { useDataModels } from '../../../../entities/dataModel';
import { Surface } from '../../../../shared/uiKit/Surface';
import { useDataModelFields } from '../../../../entities/dataModelField';
import { Divider } from '../../../../shared/uiKit/Divider';

export const Code = () => {
  const { allModels } = useDataModels();
  const { allModelFields } = useDataModelFields();

  console.log('[Code] allModelFields', allModelFields);

  return (
    <Surface width='500px' borderRadius={0} elevation={0} padding={30}>
      <StyledPre>
        {allModels.map(model => {
          // Фильтруем поля, принадлежащие данной модели
          const modelFields = allModelFields.filter(field => field.modelId === model.id);

          return (
            <div key={model.id}>
              {`Table ${model.name} {
    ${modelFields.map(field => `${field.name} ${field.type}`).join('\n    ')}
}`}
            </div>
          );
        })}
      </StyledPre>
      <Divider orientation='vertical' right top />
    </Surface>
  );
};

const StyledPre = styled.pre`
    margin: 0;
    width: 100%;
    font-family: Consolas, Monaco, 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.5;
    color: white;
`;

