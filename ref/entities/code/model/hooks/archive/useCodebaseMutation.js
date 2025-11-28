import { useDispatch } from 'react-redux';
import { updateFile, addFile, deleteFile } from '../../../codebase/model/store/slice';


export const useCodebaseMutation = () => {
  const dispatch = useDispatch();

  //Функция для обновления содержимого файла
  const updateFileHandler = (path, content) => {
    dispatch(updateFile({ path, content }));
  };

  //Функция для добавления нового файла
  const addFileHandler = (path, file) => {
    dispatch(addFile({ path, file }));
  };

  //Функция для удаления файла
  const removeFileHandler = (path) => {
    dispatch(deleteFile({ path }));
  };

  return {
    addFile: addFileHandler,
    updateFile: updateFileHandler,
    removeFile: removeFileHandler,
  };
};
