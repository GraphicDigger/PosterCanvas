import { structureToJsx, jsxToStructure } from './converters/jsx';

// --- Registry for structure -> format (e.g., JSX, HTML, etc.) ---
const structureToFormat = {
  jsx: structureToJsx,
  // html: structureToHtml, // add more in the future
};

export function convertStructureTo(format, structure, options = {}) {
  if (!structureToFormat[format]) {throw new Error(`Unknown format: ${format}`);}
  return structureToFormat[format](structure, options);
}

// --- Registry for format -> structure (e.g., JSX, HTML, etc.) ---
const formatToStructure = {
  jsx: jsxToStructure,
  // html: htmlToStructure, // add more in the future
};

export function convertToStructure(format, code, options = {}) {
  if (!formatToStructure[format]) {throw new Error(`Unknown format: ${format}`);}
  return formatToStructure[format](code, options);
}
