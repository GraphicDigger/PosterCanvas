import { ENTITY_KINDS } from '../../../shared/constants';
import websiteScreenshot from '../../../shared/assets/dummy/website.webp';
import websiteScreenshotHomepage from '../../../shared/assets/dummy/website_homepage.webp';

export const screens = [
  {
    id: 'screen-01',
    name: 'Nested component',
    kind: ENTITY_KINDS.SCREEN,
    preview: websiteScreenshotHomepage,
    doc: 'About screen',
  },

  {
    id: 'screen-02',
    name: 'Img Tag binding',
    preview: websiteScreenshot,
    kind: ENTITY_KINDS.SCREEN,
    doc: 'About screen',
  },

  {
    id: 'screen-03',
    name: 'Background Image binding',
    preview: websiteScreenshot,
    kind: ENTITY_KINDS.SCREEN,
    doc: 'About screen',
  },

  {
    id: 'screen-04',
    name: 'Text Style',
    preview: websiteScreenshot,
    kind: ENTITY_KINDS.SCREEN,
    doc: 'About screen',
  },

  {
    id: 'screen-05',
    name: 'Border Style',
    preview: websiteScreenshot,
    kind: ENTITY_KINDS.SCREEN,
    doc: 'About screen',
  },

  {
    id: 'screen-06',
    preview: websiteScreenshot,
    name: 'Card Instance with Array Prop',
    kind: ENTITY_KINDS.SCREEN,
    doc: 'About screen',
  },

  {
    id: 'screen-07',
    preview: websiteScreenshot,
    name: 'Card Instance inside the Box Element',
    kind: ENTITY_KINDS.SCREEN,
    doc: 'About screen',
  },
  {
    id: 'screen-08',
    preview: websiteScreenshot,
    name: 'Widgets test',
    kind: ENTITY_KINDS.SCREEN,
    doc: 'About screen',
  },


  // {
  //     id: 'crm-member-list',
  //     name: 'Members',
  //     kind: ENTITY_KINDS.SCREEN,
  //     preview: websiteScreenshot,
  // },
  // {
  //     id: 'crm-task-manager',
  //     name: 'Task Manager',
  //     kind: ENTITY_KINDS.SCREEN,
  //     preview: websiteScreenshot,
  // },
  // {
  //     id: 'screen-03',
  //     name: 'Screen 03',
  //     kind: ENTITY_KINDS.SCREEN,
  //     componentIds: ['component-03', 'component-04'],
  //     elementIds: ['3', '4'],
  //     codesIds: ['screen-code-03', 'screen-style-03'],
  //     preview: websiteScreenshot,
  //     wireframeBlockIds: ['wireframe-block-01', 'wireframe-block-02', 'wireframe-block-05'],
  // },
  // {
  //     id: 'screen-04',
  //     name: 'Screen 04',
  //     kind: ENTITY_KINDS.SCREEN,
  //     componentIds: ['component-04', 'component-05'],
  //     elementIds: ['4', '5'],
  //     codesIds: ['screen-code-04', 'screen-style-04'],
  //     preview: websiteScreenshot,
  //     wireframeBlockIds: ['wireframe-block-01', 'wireframe-block-02', 'wireframe-block-05'],
  // },
  // {
  //     id: 'screen-05',
  //     name: 'Screen 05',
  //     kind: ENTITY_KINDS.SCREEN,
  //     componentIds: ['component-05'],
  //     elementIds: ['5'],
  //     codesIds: ['screen-code-05', 'screen-style-05'],
  //     preview: websiteScreenshot,
  //     wireframeBlockIds: ['wireframe-block-01', 'wireframe-block-02', 'wireframe-block-05'],
  // },
  // {
  //     id: 'screen-06',
  //     name: 'Screen 06',
  //     kind: ENTITY_KINDS.SCREEN,
  //     componentIds: [],
  //     elementIds: [],
  //     codesIds: ['screen-code-06', 'screen-style-06'],
  //     preview: websiteScreenshot,
  //     wireframeBlockIds: ['wireframe-block-01', 'wireframe-block-02', 'wireframe-block-05'],
  // },

];
