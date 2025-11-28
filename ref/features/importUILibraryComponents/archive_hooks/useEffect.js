// // Эффект для генерации кода компонентов после их импорта
// useEffect(() => {
//     // Проверяем, есть ли выбранные компоненты и загружены ли уже компоненты
//     if (!selectedComponentsIds.length || !allComponents || !allComponents.length) return;

//     // Для каждого выбранного ID ищем соответствующий компонент
//     const componentsToProcess = selectedComponentsIds
//         .map(componentId => allComponents.find(c => c.id === componentId))
//         .filter(component => component); // Отфильтровываем неопределенные компоненты

//     if (componentsToProcess.length === 0) return;

//     // console.log('Генерация кода для компонентов:', componentsToProcess);

//     // Генерируем код только для найденных компонентов
//     componentsToProcess.forEach(component => {
//         try {
//             const jsxCode = generateComponentCode(component);

//             if (jsxCode) {
//                 // console.log(`Сгенерирован код для компонента ${component.name}`);

//                 // Проверяем, есть ли у компонента codesIds
//                 if (component.codesIds && component.codesIds.length > 0) {
//                     // Обновляем первый код (обычно JSX)
//                     addCode({
//                         id: component.codesIds[0],
//                         content: jsxCode
//                     });
//                 }
//             }
//         } catch (error) {
//             console.error(`Ошибка при генерации кода для ${component.name}:`, error);
//         }
//     });
// }, [selectedComponentsIds, allComponents, generateComponentCode, addCode]);
