import React from 'react';
import styled from '@emotion/styled';
import { SlotBar, LeftSlot, RightSlot } from '../../../../shared/uiKit/SlotBar';
import { CrossIcon } from '../../../../shared/assets/icons';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { Text } from '../../../../shared/uiKit/Text';
import { useGlobalModes } from '../../../../entities/mode/editorMode';

export const DetailHeader = () => {

  const { resetGlobalMode } = useGlobalModes();


  return (
    <SlotBar divider >
      <LeftSlot>
        <Text className='body-12-bd'>
                    Resource source
        </Text>
      </LeftSlot>
      <RightSlot>
        <ButtonTool onClick={resetGlobalMode}>
          <CrossIcon />
        </ButtonTool>
      </RightSlot>
    </SlotBar>

  );
};
