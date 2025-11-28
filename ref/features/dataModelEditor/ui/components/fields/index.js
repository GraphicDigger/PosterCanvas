import { MODEL_FIELD_TYPES } from '../../../../../entities/dataModel';
import { Text } from './Text';
import { MultistyleText } from './MultistyleText';
import { Number } from './Number';
import { Boolean } from './Boolean';
import { Image } from './Image';
import { ImageGallery } from './ImageGallery';
import { Video } from './Video';
import { Color } from './Color';
import { Option } from './Option';
import { File } from './File';
import { Reference } from './Reference';
import { MultiReference } from './MultiReference';
import { Json } from './Json';
import { DateTime } from './DateTime';

export const FIELD_SETTINGS_COMPONENTS = {
  [MODEL_FIELD_TYPES.TEXT]: Text,
  [MODEL_FIELD_TYPES.MULTISTYLE_TEXT]: MultistyleText,
  [MODEL_FIELD_TYPES.NUMBER]: Number,
  [MODEL_FIELD_TYPES.BOOLEAN]: Boolean,
  [MODEL_FIELD_TYPES.IMAGE]: Image,
  [MODEL_FIELD_TYPES.IMAGES_GALLERY]: ImageGallery,
  [MODEL_FIELD_TYPES.VIDEO]: Video,
  [MODEL_FIELD_TYPES.COLOR]: Color,
  [MODEL_FIELD_TYPES.OPTION]: Option,
  [MODEL_FIELD_TYPES.FILE]: File,
  [MODEL_FIELD_TYPES.REFERENCE]: Reference,
  [MODEL_FIELD_TYPES.MULTI_REFERENCE]: MultiReference,
  [MODEL_FIELD_TYPES.JSON]: Json,
  [MODEL_FIELD_TYPES.DATE_TIME]: DateTime,
};
