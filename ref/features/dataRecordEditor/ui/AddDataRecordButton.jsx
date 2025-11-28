import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { PlusIcon } from '../../../shared/assets/icons';
import { useRecordEditor } from '../model';
import { Button } from '../../../shared/uiKit/Button';

export const AddDataRecordButton = ({ uiView = 'button', onClick }) => {

  const { addDataRecord } = useRecordEditor();

  const handleAddDataRecord = () => {
    addDataRecord();
    onClick && onClick();
  };

  return (
    <>
      {uiView === 'button' && (
        <Button
          startIcon={<PlusIcon />}
          onClick={handleAddDataRecord}
        >
          New Item
        </Button>
      )}
      {uiView === 'icon' && (
        <ButtonTool onClick={handleAddDataRecord}>
          <PlusIcon />
        </ButtonTool>
      )}
    </>
  );
};
