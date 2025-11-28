
export const initialCodebaseState = {
  files: {},
  fileTree: {},
  initialized: false,
};

export const actionsCodebase = {
  initCodebase: (state, action) => {
    // Выполняется однократно при первой инициализации
    if (!state.initialized) {
      state.files = action.payload.files;
      state.fileTree = action.payload.fileTree;
      state.initialized = true;
    }
  },
  updateFile: (state, action) => {
    const { path, content } = action.payload;
    if (state.files[path]) {
      state.files[path].content = content;
    }
  },
  addFile: (state, action) => {
    const { path, file } = action.payload;
    state.files[path] = file;

    // Также обновляем дерево файлов
    // ...логика для добавления в fileTree
  },
  deleteFile: (state, action) => {
    const { path } = action.payload;
    delete state.files[path];

    // Также обновляем дерево файлов
    // ...логика для удаления из fileTree
  },
};
