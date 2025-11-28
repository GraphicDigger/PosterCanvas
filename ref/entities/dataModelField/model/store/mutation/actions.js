

export const actionsMutation = {

  //Добавляет или обновляет несколько полей модели данных в состоянии
  upsertDataModelFields: (state, action) => {
    action.payload.forEach(field => {
      if (!field || !field.id) {return;} // Пропускаем невалидные поля
      if (!state.entities[field.id]) {
        // Если поля нет, добавляем id (если его еще нет в массиве)
        if (!state.ids.includes(field.id)) {
          state.ids.push(field.id);
        }
      }
      // Добавляем или обновляем поле в entities
      state.entities[field.id] = field;
    });
  },

  //Обновляет одно поле модели данных.
  updateDataModelField: (state, action) => {
    const { id, changes } = action.payload;
    if (state.entities[id]) {
      // Применяем изменения к существующему полю
      state.entities[id] = { ...state.entities[id], ...changes };
    }
  },

  //Обновляет несколько полей модели данных.
  updateDataModelFields: (state, action) => {
    action.payload.forEach(update => {
      const { id, changes } = update;
      if (state.entities[id]) {
        // Применяем изменения к существующему полю
        state.entities[id] = { ...state.entities[id], ...changes };
      }
    });
  },

  //Добавляет одно новое поле модели данных.
  addDataModelField: (state, action) => {
    const field = action.payload;
    if (!field || !field.id) {return;} // Пропускаем невалидные поля
    // Добавляем только если такого ID еще нет
    if (!state.entities[field.id]) {
      state.ids.push(field.id);
      state.entities[field.id] = field;
    }
  },

  //Удаляет одно поле модели данных по ID.
  removeDataModelField: (state, action) => {
    const idToRemove = action.payload;
    // Удаляем ID из массива ids
    state.ids = state.ids.filter(id => id !== idToRemove);
    // Удаляем поле из объекта entities
    delete state.entities[idToRemove];
  },

  //Заменяет все поля для указанной модели новым набором полей.
  setDataModelFieldsForModel: (state, action) => {
    const { modelId, fields } = action.payload;

    // 1. Найти и удалить все существующие поля для этой модели
    const remainingIds = [];
    const remainingEntities = {};
    state.ids.forEach(id => {
      if (state.entities[id]?.modelId !== modelId) {
        remainingIds.push(id);
        remainingEntities[id] = state.entities[id];
      }
    });
    state.ids = remainingIds;
    state.entities = remainingEntities;

    // 2. Добавить новые поля
    fields.forEach(field => {
      if (!field || !field.id) {return;} // Пропускаем невалидные
      if (!state.entities[field.id]) { // Избегаем дублирования ID
        state.ids.push(field.id);
      }
      state.entities[field.id] = field;
    });
  },
};
