import { Preview } from '../Preview';

export const ColorPreview = ({ color, onClick }) => {
  return (
    <Preview
      backgroundColor={color}
      width={16}
      height={16}
      onClick={onClick}
    />
  );
};
