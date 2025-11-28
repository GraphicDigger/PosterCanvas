// shared/lib/api/mockDataRegistry.ts
type MockDataLoader<T> = () => T[];

class MockDataRegistry {

  private registry = new Map<string, MockDataLoader<any>>();

  // Регистрируем загрузчик mock данных для сущности
  register<T>(
    entityName: string,
    loader: MockDataLoader<T>,
  ): void {
    this.registry.set(entityName, loader);
    // console.log(`📝 Mock data registered for entity: ${entityName}`);
  }

  // Получаем mock данные для сущности
  getData<T>(entityName: string): T[] {
    // console.log(`🔍 Requesting mock data for entity: ${entityName}`);
    // console.log(`📦 Available entities:`, Array.from(this.registry.keys()));

    const loader = this.registry.get(entityName);
    if (!loader) {
      // console.warn(`❌ No mock data registered for entity: ${entityName}`);
      return [];
    }

    try {
      const data = loader();
      // console.log(`✅ Loaded ${data.length} items for ${entityName}`);
      return data;
    } catch (error) {
      console.error(`❌ Failed to load mock data for ${entityName}:`, error);
      return [];
    }
  }
}

export const mockDataRegistry = new MockDataRegistry();
