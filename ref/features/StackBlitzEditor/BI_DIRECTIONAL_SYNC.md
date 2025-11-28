# Bi-Directional Synchronization

This document explains how the bi-directional synchronization works between the control panel and the StackBlitz editor.

## Overview

The system provides real-time synchronization between:
1. **Control Panel Changes** → **StackBlitz Editor** (Element properties → Props file)
2. **StackBlitz Editor Changes** → **Control Panel** (Code changes → Element structure)

## How It Works

### 1. Control Panel → StackBlitz Editor

When you change properties in the control panel (like background color, text content, etc.):

1. **Redux Store Update**: The change is saved to the Redux store via `updateElementStyle`, `updateElementContent`, etc.
2. **Element Monitoring**: The `StackBlitzProject` component monitors all elements in the Redux store every second
3. **Prop Detection**: When element changes are detected, the system:
   - Extracts prop bindings from the current component structure
   - Finds which props are bound to the changed elements
   - Updates the prop values based on the new element properties
4. **Props File Update**: The updated props are written to the `src/props.js` file in StackBlitz
5. **Live Preview**: The StackBlitz preview automatically re-renders with the new prop values

### 2. StackBlitz Editor → Control Panel

When you edit code in the StackBlitz editor:

1. **File Monitoring**: The system monitors the `src/ComponentName.tsx` file every 3 seconds
2. **Structure Parsing**: Changes are parsed into element structure using `convertToStructure`
3. **Prop Binding Extraction**: New prop bindings are extracted from the updated code
4. **Redux Dispatch**: Element changes are dispatched to the Redux store via `updateElement`
5. **UI Update**: The control panel automatically reflects the new element properties

## Key Components

### StackBlitzProject.jsx
- Main orchestrator for bi-directional sync
- Monitors Redux store for element changes
- Updates StackBlitz props file when elements change
- Monitors StackBlitz file changes and updates Redux store

### propsSync.js Utilities
- `extractPropBindingsFromElement`: Finds which props are used in component structure
- `updatePropsFromElementChanges`: Updates prop values based on element changes
- `extractPropertyValueFromElement`: Extracts current values from element properties
- `updatePropsInStackBlitz`: Updates the props file in StackBlitz VM

## Debugging

The system includes comprehensive logging:

- `🔄 Elements changed, checking for prop updates...` - Element changes detected
- `🔄 Updating prop [name]: [oldValue] → [newValue]` - Prop value updates
- `📝 Updating props file with element changes` - Props file being updated
- `✅ Props file updated with element changes` - Success confirmation

## Usage Example

1. **Change Background Color in Control Panel**:
   - Select an element
   - Change background color in Fill control
   - System detects element change
   - Updates corresponding prop in StackBlitz
   - Preview shows new background color

2. **Edit Code in StackBlitz**:
   - Modify component code to use different props
   - System detects file change
   - Parses new structure
   - Updates element properties in control panel
   - Control panel reflects new bindings

## Performance Considerations

- Element monitoring runs every 1 second
- File monitoring runs every 3 seconds
- Debounced updates prevent excessive API calls
- Deep comparison prevents unnecessary updates

## Troubleshooting

If synchronization isn't working:

1. Check browser console for error messages
2. Verify that props are properly bound in the component structure
3. Ensure the StackBlitz VM is ready before monitoring starts
4. Check that element properties are being updated in Redux store 