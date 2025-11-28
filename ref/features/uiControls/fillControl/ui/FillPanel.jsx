import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '../../../../shared/uiKit/SectionPanel';
import { List } from '../../../../shared/uiKit/List';
import { AddBackgroundColorButton } from './AddBackgroundColor';
import { useFill } from '../model';
import { FillControl } from './components/FillControls';

export const FillPanel = () => {

  const {
    backgroundColorValue,
    backgroundImageValue
  } = useFill();

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Fill</SectionPanelName>
        <AddBackgroundColorButton />
      </SectionPanelHeader>
      {(backgroundColorValue || backgroundImageValue) && (
        <SectionPanelBody>
          <List>
            <FillControl />
          </List>
        </SectionPanelBody>
      )}
    </SectionPanel >
  );
};
