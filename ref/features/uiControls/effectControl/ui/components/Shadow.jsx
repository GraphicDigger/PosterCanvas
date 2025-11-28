import React, { useMemo } from 'react';
import { PlusIcon } from '../../../../../shared/assets/icons';
import { List, ListItem, ListItemText, ListItemButton, ListItemStartSlot, ListItemEndSlot } from '../../../../../shared/uiKit/List';
import { Preview } from '../../../../../shared/uiKit/Preview';
import { Text } from '../../../../../shared/uiKit/Text';
import { WindowPopover, WindowTrigger, Window, WindowHead, WindowBody, WindowTitle } from '../../../../../shared/uiKit/Window';
import { ButtonToolToggle } from '../../../../../shared/uiKit/ButtonTool';
import { Button } from '../../../../../shared/uiKit/Button';
import { Field, FieldList, Label, TextField } from '../../../../../shared/uiKit/Fields';
import { Stack } from '../../../../../shared/uiKit/Stack';
import { useShadow } from '../../model';
import { MinusIcon } from '../../../../../shared/assets/icons';
import { ActionWrapper, RightAction } from '../../../../../shared/uiKit/ActionWrapper';
import { ColorSwatch } from '../../../../../shared/uiKit/Color';


export const Shadow = () => {

  const shadowHook = useShadow();
  const { shadows, removeShadowAtIndex, setActiveShadow } = shadowHook;

  const handleRemoveShadow = (index) => removeShadowAtIndex(index);
  const handleSetActiveShadow = (index) => setActiveShadow(index);

  const renderShadows = useMemo(() => {
    return shadows.map((shadow, index) => {
      return (
        <WindowPopover
          key={index}
          closeOnSelect={false}
          placement='left-start'
          offset={16}
          onOpenChange={(isOpen) => {
            if (isOpen) {
              handleSetActiveShadow(index);
            }
          }}
        >
          <WindowTrigger>
            <ActionWrapper >
              <ColorSwatch
                name={shadow.inset ? 'Inside' : 'Outside'}
                value={shadow.color}
                rightSlot={
                  <Text color='disabled'>
                    {shadow.offsetX}.{shadow.offsetY}.{shadow.blurRadius}.{shadow.spreadRadius}
                  </Text>
                }
              />
              <RightAction onClick={() => handleRemoveShadow(index)}>
                <MinusIcon />
              </RightAction>
            </ActionWrapper>
          </WindowTrigger>
          <Window>
            <ShadowWindowHeader shadowHook={shadowHook} />
            <ShadowWindowBody shadowHook={shadowHook} />
          </Window>
        </WindowPopover>
      );
    });
  }, [shadows, handleSetActiveShadow]);

  return <List> {renderShadows} </List>;
};


const ShadowWindowHeader = ({ shadowHook }) => {
  const { updateShadowInset, activeShadow } = shadowHook;

  const currentInset = activeShadow?.inset ? 'Inside' : 'Outside';
  const handleChange = (value) => updateShadowInset(value);

  return (
    <WindowHead>
      <WindowTitle>Shadow</WindowTitle>
      <ButtonToolToggle
        style="primary"
        size="small"
        value={currentInset}
        onChange={handleChange}
      >
        <Button
          value="Outside"
          isSelected={currentInset === 'Outside'}
        >
          Outside
        </Button>

        <Button
          value="Inside"
          isSelected={currentInset === 'Inside'}
        >
          Inside
        </Button>
      </ButtonToolToggle>
    </WindowHead>
  );
};


const ShadowWindowBody = ({ shadowHook }) => {
  const {
    shadow,
    updateShadowOffsetX,
    updateShadowOffsetY,
    updateShadowBlurRadius,
    updateShadowSpreadRadius,
    updateShadowColor,
    updateShadowOpacity,
  } = shadowHook;

  console.log('[ShadowWindowBody]:', JSON.stringify(shadow, null, 2));

  return (
    <WindowBody>
      <Stack gap={1}>
        <FieldList gap={1}>
          <Field>
            <Label>X</Label>
            <TextField
              numeric
              allowNegative={true}
              width={150}
              value={shadow.x}
              onChange={updateShadowOffsetX}
            />
          </Field>
          <Field>
            <Label>Y</Label>
            <TextField
              numeric
              allowNegative={true}
              width={150}
              value={shadow.y}
              onChange={updateShadowOffsetY}
            />
          </Field>
          <Field>
            <Label>Blur</Label>
            <TextField
              numeric
              width={150}
              value={shadow.blur}
              onChange={updateShadowBlurRadius}
            />
          </Field>
          <Field>
            <Label>Size</Label>
            <TextField
              numeric
              width={150}
              value={shadow.spread}
              onChange={updateShadowSpreadRadius}
            />
          </Field>
          <Field>
            <Label>Color</Label>
            <TextField
              width={150}
              value={shadow.color}
              onChange={updateShadowColor}
            />
          </Field>
          <Field>
            <Label>Opacity</Label>
            <TextField
              numeric
              min={0}
              max={100}
              width={150}
              value={shadow.opacity}
              bufferOnBlur={true}
              onChange={updateShadowOpacity}
            />
          </Field>
        </FieldList>
      </Stack>
    </WindowBody>
  );
};
