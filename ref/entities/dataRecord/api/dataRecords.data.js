import { ENTITY_KINDS } from '../../../shared/constants';
import abstractImage from '../../../shared/assets/dummy/abstract.jpg';
import abstractImage2 from '../../../shared/assets/dummy/chris-nguyen-aTX_bRaOZnA-unsplash.jpg';
import abstractImage3 from '../../../shared/assets/dummy/martin-blaszkiewicz-kMeQ3zam1ac-unsplash.jpg';
import abstractImage4 from '../../../shared/assets/dummy/steven-binotto-0X0ecI9uDTM-unsplash.jpg';
import abstractImage5 from '../../../shared/assets/dummy/steven-binotto-ElIOUx7VZ8M-unsplash.jpg';
import abstractImage6 from '../../../shared/assets/dummy/steven-binotto-FKJlmUu5JrM-unsplash.jpg';

export const dataRecords = [

  // model0: default
  {
    id: 'id-default-1-model0',
    kind: ENTITY_KINDS.DATA_RECORD,
    modelId: 'model0',
    name: 'Default Record',
  },
  {
    id: 'id-default-2-model0',
    kind: ENTITY_KINDS.DATA_RECORD,
    modelId: 'model0',
    name: 'Default Record 2',
  },
  {
    id: 'id-default-3-model0',
    kind: ENTITY_KINDS.DATA_RECORD,
    modelId: 'model0',
    name: 'Default Record 3',
  },


  // model1: members
  {
    id: 'id-member-1-model1',
    kind: ENTITY_KINDS.DATA_RECORD,
    modelId: 'model1',
    name: 'Darrell Steward',
    role: 'id-role-designer-model2',
    email: 'darrell.steward@example.com',
    public: true,
    avatar: abstractImage,
    // updatedAt: '2025-01-17T12:00:00Z',
    // createdAt: '2025-01-17T12:00:00Z',
  },
  {
    id: 'id-member-2-model1',
    kind: ENTITY_KINDS.DATA_RECORD,
    modelId: 'model1',
    name: 'Bessie Cooper',
    role: 'id-role-sales-manager-model2',
    email: 'bessie.cooper@example.com',
    public: true,
    avatar: abstractImage2,
    // updatedAt: '2025-01-17T12:00:00Z',
    //         createdAt: '2025-01-17T12:00:00Z',
  },
  {
    id: 'id-member-3-model1',
    kind: ENTITY_KINDS.DATA_RECORD,
    modelId: 'model1',
    name: 'Annette Black',
    role: 'id-role-developer-model2', //  model2-id-4
    email: 'annette.black@example.com',
    public: true,
    avatar: abstractImage3,
    // updatedAt: '2025-01-17T12:00:00Z',
    // createdAt: '2025-01-17T12:00:00Z',
  },
  {
    id: 'id-member-4-model1',
    kind: ENTITY_KINDS.DATA_RECORD,
    modelId: 'model1',
    name: 'Jacob Jones',
    role: 'id-role-developer-model2', //  model2-id-4
    email: 'jacob.jones@example.com',
    public: true,
    avatar: abstractImage4,
    // updatedAt: '2025-01-17T12:00:00Z',
    // createdAt: '2025-01-17T12:00:00Z',
  },


  // model2: roles
  {
    id: 'id-role-designer-model2',
    kind: ENTITY_KINDS.DATA_RECORD,
    modelId: 'model2',
    name: 'Designer',
    permissions: ['read', 'write', 'delete'],
    public: true,
    // updatedAt: '2025-01-17T12:00:00Z',
    // createdAt: '2025-01-17T12:00:00Z',
  },
  {
    id: 'id-role-sales-manager-model2',
    kind: ENTITY_KINDS.DATA_RECORD,
    modelId: 'model2',
    name: 'Sales Manager',
    public: true,
    // updatedAt: '2025-01-17T12:00:00Z',
    // createdAt: '2025-01-17T12:00:00Z',
  },
  {
    id: 'id-role-developer-model2',
    kind: ENTITY_KINDS.DATA_RECORD,
    modelId: 'model2',
    name: 'Developer',
    public: true,
    // updatedAt: '2025-01-17T12:00:00Z',
    // createdAt: '2025-01-17T12:00:00Z',
  },
  {
    id: 'id-role-marketer-model2',
    kind: ENTITY_KINDS.DATA_RECORD,
    modelId: 'model2',
    name: 'Marketer',
    public: true,
    // updatedAt: '2025-01-17T12:00:00Z',
    // createdAt: '2025-01-17T12:00:00Z',
  },
];

