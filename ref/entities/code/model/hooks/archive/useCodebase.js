import { useSelector } from 'react-redux';
import {
  selectFiles,
  selectFileTree,
  selectIsCodebaseInitialized,
  selectAllFiles,
  selectFilesByType,
  selectFileTreeBranch,
  selectFileByPath,
  selectFileContent,
  selectFileMetadata,
  selectFileExists,

} from '../../archive/selectorsCodebase';


//Хук для доступа к общей информации о файловой системе

export const useCodebase = () => {
  const files = useSelector(selectFiles);
  const fileTree = useSelector(selectFileTree);
  const allFiles = useSelector(selectAllFiles);
  const isInitialized = useSelector(selectIsCodebaseInitialized);

  return {
    files,
    fileTree,
    allFiles,
    isInitialized,
  };
};

//Хук для получения файла по пути
export const useFile = (path) => {
  const file = useSelector(state => selectFileByPath(state, path));
  const content = useSelector(state => selectFileContent(state, path));
  const metadata = useSelector(state => selectFileMetadata(state, path));
  const exists = useSelector(state => selectFileExists(state, path));

  return {
    file,
    content,
    metadata,
    exists,
  };
};

//Хук для работы с деревом файлов
export const useFileTree = (path = '') => {
  const fileTree = useSelector(state =>
    path ? selectFileTreeBranch(state, path) : selectFileTree(state),
  );

  return {
    fileTree,
  };
};

//Хук для получения файлов определенного типа
export const useFilesByType = (fileType) => {
  const files = useSelector(state => selectFilesByType(state, fileType));

  return {
    files,
  };
};

