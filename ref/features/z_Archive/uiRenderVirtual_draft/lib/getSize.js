
import { VariableSizeList } from 'react-window';

// Функция для получения высоты элемента по его индексу
const getItemSize = index => {
  const { node } = flattenedItems[index];
  return itemHeights[node.id] || estimatedItemHeight; // Используем сохраненную высоту или оценку
};

// Сброс кеша высот при изменении данных
const listRef = useRef();
useEffect(() => {
  if (listRef.current) {
    listRef.current.resetAfterIndex(0);
  }
}, [itemHeights]);

return (
  <VariableSizeList
    ref={listRef}
    height={600}
    itemCount={flattenedItems.length}
    itemSize={getItemSize}
    width="100%"
  >
    {ItemRenderer}
  </VariableSizeList>
);


// Кэш высот элементов, сохраняется между рендерами
const heightCache = useRef({});

// Функция для получения высоты элемента
const getItemSize = index => {
  const { node } = flattenedItems[index];

  // Если высота уже измерена, используем её
  if (heightCache.current[node.id]) {
    return heightCache.current[node.id];
  }

  // Иначе используем примерную оценку по типу элемента
  if (node.kind === ENTITY_KINDS.INSTANCE) {return 80;}
  if (node.tag === 'h1') {return 60;}
  return 40;
};

// Функция для сохранения измеренной высоты
const updateHeight = (id, height) => {
  if (heightCache.current[id] !== height) {
    heightCache.current[id] = height;
    if (listRef.current) {
      // Сообщаем списку, что размеры могли измениться
      listRef.current.resetAfterIndex(0);
    }
  }
};
