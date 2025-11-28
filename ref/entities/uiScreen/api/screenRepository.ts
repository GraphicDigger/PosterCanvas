// entities/uiScreen/api/ScreenRepository.ts
import { BaseRepository } from '@/shared/services/api/baseRepository';
import type { Screen } from '../types';
import type { DataSource } from '@/shared/services/api/types';

// Репозиторий экранов - только бизнес-логика, вся работа с источниками данных делегирована адаптерам

export class ScreenRepository extends BaseRepository<Screen> {

  // Конструктор делегирует создание объекта родительскому классу BaseRepository
  // который автоматически создает нужный адаптер (MockAdapter, RestAdapter, etc.)
  // в зависимости от выбранного пользователем источника данных

  constructor(dataSource: DataSource, entityName: string) {
    super(dataSource, entityName); // вызов конструктора BaseRepository
  }
  // Здесь можно добавить специфичную для Screen бизнес-логику
}
