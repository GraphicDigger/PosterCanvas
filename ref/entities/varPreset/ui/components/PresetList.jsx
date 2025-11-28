import { List } from '../../../../shared/uiKit/List';
import { PresetListItem } from './PresetListItem';

export const PresetList = ({ presets, onClick }) => {
  return (
    <List>
      {presets.map(preset => (
        <PresetListItem
          key={preset.id}
          preset={preset}
          onClick={() => onClick(preset)}
        />
      ))}
    </List>
  );
};
