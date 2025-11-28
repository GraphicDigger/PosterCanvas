import React from 'react';
import { useMemo } from 'react';
import { useKeyboard } from '@/shared/lib';
import { useTheme } from '@emotion/react';
import { SlotBar, LeftSlot as SlotBarLeftSlot, CenterSlot as SlotBarCenterSlot, RightSlot as SlotBarRightSlot } from '../SlotBar';
import { Typography } from '../Typography';
import { useViewer, useViewerStep, useViewerGroupId } from './model';
import { ButtonTool } from '../ButtonTool';
import { ArrowWithLegLeftIcon, CrossIcon } from '@/shared/assets/icons';
import { Button } from '../Button';
import { Divider } from '../Divider';

export const ViewerPanelHeader = ({
  children,
  title,
}) => {
  const theme = useTheme();
  const { getMode, goBack, closeViewerStep, getViewerData } = useViewer();
  const currentStep = useViewerStep();
  const contextGroupId = useViewerGroupId();
  const actualGroupId = contextGroupId;
  const mode = getMode();
  const data = getViewerData(currentStep - 1, actualGroupId);

  const handleClose = () => {
    console.log('ViewerPanelHeader handleClose:', { currentStep, actualGroupId, mode });
    if (currentStep) {
      closeViewerStep(currentStep, actualGroupId);
    }
  };

  const slots = useMemo(() => {
    const result = {
      left: null,
      center: null,
      right: null,
    };
    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) {return;}

      if (child.type === LeftSlot) {result.left = React.cloneElement(child, { title });}
      if (child.type === CenterSlot) {result.center = child;}
      if (child.type === RightSlot) {result.right = child;}
    });
    return result;
  }, [children]);

  const leftSlot = useMemo(() => {

    if (mode === 'single' && currentStep !== 1) {
      return (
        <LeftSlot>
          <Button color='default' onClick={() => goBack(actualGroupId)} startIcon={<ArrowWithLegLeftIcon />}>{data?.name || data?.title}</Button>
        </LeftSlot>
      );
    }
    if (title) {return <Typography variant='heading.xsmall' >{title}</Typography>;}
    return slots.left;

  }, [title, slots.left, mode, currentStep, data, actualGroupId]);

  return (
    <SlotBar divider backgroundColor={theme.sys.color.surface}>
      <SlotBarLeftSlot padding={2}>
        {leftSlot}
      </SlotBarLeftSlot>
      <SlotBarCenterSlot>
        {slots.center}
      </SlotBarCenterSlot>
      <SlotBarRightSlot>
        {slots.right}
        <ButtonTool onClick={handleClose}>
          <CrossIcon />
        </ButtonTool>
      </SlotBarRightSlot>
    </SlotBar>
  );
};

export const LeftSlot = ({ children }) => {
  return children;
};

export const CenterSlot = ({ children }) => {
  return children;
};

export const RightSlot = ({ children }) => {
  return children;
};
