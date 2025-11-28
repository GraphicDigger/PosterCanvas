// Основная структура API
import { ENTITY_KINDS } from '../../../../shared/constants';
export const apis = [
  // Connector (Custom APIs)
  {
    id: 'api-1',
    kind: ENTITY_KINDS.API,
    name: 'Custom API',
    categoryId: 'custom-api-category',
    connectorId: 'connector-1',
  },
  {
    id: 'api-2',
    kind: ENTITY_KINDS.API,
    name: 'API 2',
    categoryId: 'custom-api-category',
    connectorId: 'connector-2',
  },

  // Predefined Category APIs
  {
    id: 'api-10',
    kind: ENTITY_KINDS.API,
    name: 'CMS Api',
    categoryId: 'category-2',
    connectorId: 'connector-10',
  },
  {
    id: 'api-11',
    kind: ENTITY_KINDS.API,
    name: 'Collaboration Api',
    categoryId: 'category-3',
    connectorId: 'connector-11',
  },
  {
    id: 'api-12',
    kind: ENTITY_KINDS.API,
    name: 'Developer Tools Api',
    categoryId: 'category-4',
    connectorId: 'connector-12',
  },
  {
    id: 'api-13',
    kind: ENTITY_KINDS.API,
    name: 'Documents Api',
    categoryId: 'category-5',
    connectorId: 'connector-13',
  },
  {
    id: 'api-14',
    kind: ENTITY_KINDS.API,
    name: 'SEO Api',
    categoryId: 'category-6',
    connectorId: 'connector-14',
  },
  {
    id: 'api-15',
    kind: ENTITY_KINDS.API,
    name: 'Stripe',
    categoryId: 'category-7',
    connectorId: 'connector-15',
  },
  {
    id: 'api-16',
    kind: ENTITY_KINDS.API,
    name: 'Marketing automation Api',
    categoryId: 'category-8',
    connectorId: 'connector-16',
  },
  {
    id: 'api-17',
    kind: ENTITY_KINDS.API,
    name: 'Analitics Api',
    categoryId: 'category-9',
    connectorId: 'connector-17',
  },
];
