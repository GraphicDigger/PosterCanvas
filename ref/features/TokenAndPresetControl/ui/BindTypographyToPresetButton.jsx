/** @jsxImportSource @emotion/react */
import { VarPresetIcon } from '../../../shared/assets/icons';
import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { WindowPopover, WindowTrigger, Window, WindowHead, WindowBody } from '../../../shared/uiKit/Window';
import { SlotBar, RightSlot } from '../../../shared/uiKit/SlotBar';
import { useElement } from '../../../entities/uiElement';
import { usePresets, EPreset, PRESET_TYPES } from '../../../entities/varPreset';
import { useTokenAndPresetControl, AddPresetButton } from '..';
import { useBoundVariableValue } from '../../../entities/binding';


export const BindTypographyToPresetButton = () => {

  const { focusedElement } = useElement();
  const { typographyCollectionPresets } = usePresets();
  const { styles } = useBoundVariableValue(focusedElement?.id);
  const { bindPresetToTypography } = useTokenAndPresetControl({ element: focusedElement });

  const handleBindTypographyWithStyle = (preset) => {
    bindPresetToTypography(preset);
  };

  return (
    <WindowPopover
      placement='left-start'
      offset={179}
      flip={true}
      shift={true}
      closeOnSelect={false}
    >
      <WindowTrigger>
        <ButtonTool>
          <VarPresetIcon />
        </ButtonTool>
      </WindowTrigger>
      <Window>
        <WindowHead >
          <SlotBar paddingVertical={0} paddingHorizontal={0}>
            <RightSlot>
              <AddPresetButton
                presetType={PRESET_TYPES.TYPOGRAPHY}
                styles={styles}
              />
            </RightSlot>
          </SlotBar>
        </WindowHead>
        <WindowBody>
          <EPreset
            uiView='list'
            presets={typographyCollectionPresets}
            onClick={handleBindTypographyWithStyle}
          />
        </WindowBody>
      </Window>
    </WindowPopover>
  );
};

