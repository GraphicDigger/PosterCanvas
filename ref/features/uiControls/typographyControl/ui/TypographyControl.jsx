/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTypographyStyle } from '../model';
import {
  FontFamilyField,
  WeightField,
  SizeField,
  LineField,
  LetterField,
  AlignField,
} from './fields';


export const TypographyControl = () => {

  const {
    fontFamily,
    fontWeight,
    fontSize,
    lineHeight,
    letterSpacing,
    textAlign,
    updateFontFamily,
    updateFontWeight,
    updateFontSize,
    updateLineHeight,
    updateLetterSpacing,
    updateTextAlign,
  } = useTypographyStyle();

  return (
    <>
      <FontFamilyField
        value={fontFamily}
        onChange={updateFontFamily}
      />
      <WeightField
        value={fontWeight}
        onChange={updateFontWeight}
      />
      <SizeField
        value={fontSize}
        onChange={updateFontSize}
      />
      <LineField
        value={lineHeight}
        onChange={updateLineHeight}
      />
      <LetterField
        value={letterSpacing}
        onChange={updateLetterSpacing}
      />
      <AlignField
        value={textAlign}
        onChange={updateTextAlign}
      />
    </>
  );
};

