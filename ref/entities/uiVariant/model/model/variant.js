
export class Variant {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.kind = data.kind;
    this.parentId = data.parentId;
  }
}


const variantExample = {
  id: 'variant-1',
  name: 'Default',
  componentId: 'component-1', // ссылка на родительский компонент
  order: 0, // порядок в списке вариантов компонента
  isDefault: true,
  props: {}, // специфичные пропсы варианта
  layout: {}, // специфичная для варианта верстка
  elements: [], // элементы варианта
};
