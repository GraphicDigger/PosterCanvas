// /** @jsxImportSource @emotion/react */
// import { MODEL_FIELD_TYPES } from '@/entities/dataModel';
// import {
//   MultistyleText,
//   ImageGallery,
//   Image,
//   Video,
//   File,
//   Reference,
//   MultiReference,
// } from '@/features/dataRecordEditor';

// export const getRecordFieldSettings = ({ type, fieldValue }) => {
//   const FIELD_COMPONENTS = {
//     [MODEL_FIELD_TYPES.MULTISTYLE_TEXT]: MultistyleText,
//     [MODEL_FIELD_TYPES.IMAGES_GALLERY]: ImageGallery,
//     // [MODEL_FIELD_TYPES.IMAGE]: Image,
//     // [MODEL_FIELD_TYPES.VIDEO]: Video,
//     // [MODEL_FIELD_TYPES.FILE]: File,
//     // [MODEL_FIELD_TYPES.REFERENCE]: Reference,
//     // [MODEL_FIELD_TYPES.MULTI_REFERENCE]: MultiReference,
//   };

//   const Component = FIELD_COMPONENTS[type];
//   if (!Component) {return null;}

//   return <Component fieldValue={fieldValue} />;
// };
