import { useMemo } from 'react';
import { ButtonTool } from '../../../../../shared/uiKit/ButtonTool';
import { UnlinkIcon, ReferenceIcon } from '../../../../../shared/assets/icons';
import { WireframeBlockPicker } from './WireframeBlockPicker';
import { useWireframeControl } from '../../model';

export const ToggleLinkBlockButton = () => {
  const { unlinkWireframeBlock, elementBlockId } = useWireframeControl();

  const handleUnlink = () => {
    unlinkWireframeBlock(elementBlockId);
  };

  return useMemo(() => {
    if (elementBlockId) {
      return (
        <ButtonTool onClick={handleUnlink}>
          <UnlinkIcon />
        </ButtonTool>
      );
    }
    return (
      <WireframeBlockPicker windowSettings={{ offset: 207 }}>
        <ButtonTool>
          <ReferenceIcon />
        </ButtonTool>
      </WireframeBlockPicker>
    );
  }, [elementBlockId]);
};
