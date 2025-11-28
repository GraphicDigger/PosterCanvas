import {
  form,
  canvases,
  buttonComponent,
  ImgTagBindingToData,
  backgroundImageBindingToData,
  textStyle,
  boxStyle,
  cardsWithArrayProp,
  card,
} from './data';


export const elements = [

  ...canvases,
  // elements with body
  ...form,
  ...buttonComponent,
  ...ImgTagBindingToData,
  ...backgroundImageBindingToData,
  ...textStyle,
  ...boxStyle,
  ...cardsWithArrayProp,
  ...card,

];
