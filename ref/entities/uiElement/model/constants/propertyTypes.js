export const PROPERTY_TYPES = {
  STYLE: 'style',
  CONTENT: 'content',
  STATE: 'state',
  ATTRIBUTES: 'attributes',
  EVENTS: 'events',
};

export const STYLE_PROPERTIES = {
  backgroundColor: 'backgroundColor',
  backgroundImage: 'backgroundImage',
  color: 'color',
  width: 'width',
  height: 'height',
  display: 'display',
  justifyContent: 'justifyContent',
  alignItems: 'alignItems',
  flexDirection: 'flexDirection',
  flexWrap: 'flex-wrap',
  gap: 'gap',
  gapRow: 'row-gap',
  gapColumn: 'column-gap',
  minWidth: 'min-width',
  maxWidth: 'max-width',
  minHeight: 'min-height',
  maxHeight: 'max-height',
  padding: 'padding',
  paddingTop: 'padding-top',
  paddingRight: 'padding-right',
  paddingBottom: 'padding-bottom',
  paddingLeft: 'padding-left',
  margin: 'margin',
  marginTop: 'margin-top',
  marginRight: 'margin-right',
  marginBottom: 'margin-bottom',
  marginLeft: 'margin-left',
  overflow: 'overflow',
  fontSize: 'fontSize',
  fontWeight: 'fontWeight',
  fontFamily: 'fontFamily',
  lineHeight: 'lineHeight',
  letterSpacing: 'letterSpacing',
  textAlign: 'textAlign',
  textTransform: 'textTransform',
  position: 'position',
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  transform: 'transform',
  // border
  border: 'border',
  borderTop: 'borderTop',
  borderRight: 'borderRight',
  borderBottom: 'borderBottom',
  borderLeft: 'borderLeft',

  borderColor: 'borderColor',
  borderTopColor: 'borderTopColor',
  borderRightColor: 'borderRightColor',
  borderBottomColor: 'borderBottomColor',
  borderLeftColor: 'borderLeftColor',

  borderWidth: 'borderWidth',
  borderTopWidth: 'borderTopWidth',
  borderRightWidth: 'borderRightWidth',
  borderBottomWidth: 'borderBottomWidth',
  borderLeftWidth: 'borderLeftWidth',

  borderRadius: 'borderRadius',
  borderTopLeftRadius: 'borderTopLeftRadius',
  borderTopRightRadius: 'borderTopRightRadius',
  borderBottomLeftRadius: 'borderBottomLeftRadius',
  borderBottomRightRadius: 'borderBottomRightRadius',

  boxShadow: 'boxShadow',
};

export const CONTENT_PROPERTIES = {
  text: 'text',
  image: 'image',
  video: 'video',
  audio: 'audio',
  link: 'link',
};

export const PROPERTIES = {
  [PROPERTY_TYPES.STYLE]: STYLE_PROPERTIES,
  [PROPERTY_TYPES.CONTENT]: CONTENT_PROPERTIES,
  // [PROPERTY_TYPES.STATE]: STATE_PROPERTIES,
  // [PROPERTY_TYPES.ATTRIBUTES]: ATTRIBUTES_PROPERTIES,
  // [PROPERTY_TYPES.EVENTS]: EVENTS_PROPERTIES
};

