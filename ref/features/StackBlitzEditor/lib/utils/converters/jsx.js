import { ENTITY_KINDS } from '../../../../../shared/constants/entityKinds';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import { updateInstance } from '../../../../../entities/uiInstance/model/store/slice';
import { store } from '../../../../../app/store';

// --- JSX Converter (structure -> JSX) ---
export function structureToJsx(element, { allProps = {}, instances = [] } = {}, indent = 2) {
  const tag = element.tag || 'div';
  const kind = element.kind || ENTITY_KINDS.ELEMENT;
  const selfClosingTags = ['img', 'input'];
  const indentStr = ' '.repeat(indent);
  const childIndent = ' '.repeat(indent + 2);

  const dataId = `data-id="${element.id}"`;
  const dataKind = `data-kind="${kind}"`;
  const dataInstanceRef = element.instanceRef ? `data-instance-ref="${element.instanceRef}"` : '';
  const dataName = element.name ? `data-name="${element.name}"` : '';
  const dataOwnershipType = `data-ownership-type="${element.ownership?.type || 'component'}"`;
  const componentId = element.ownership?.componentId || element.ownership?.id;
  const dataComponentId = componentId
    ? `data-component-id="${componentId}"`
    : '';

  const style = { ...(element.properties?.style || {}) };
  const contentInfo = element.properties?.content;
  let content = contentInfo?.text || '';

  // Check if any props are used in this element
  const hasPropBindings = !!(
    (contentInfo?.binding && contentInfo.binding.type === 'prop') ||
    (style.binding && Object.values(style.binding).some(b => b.type === 'prop'))
  );

  // Handle content binding
  if (contentInfo?.binding && allProps) {
    const prop = allProps[contentInfo.binding.id];
    if (prop) {
      content = `{props.${prop.name}}`;
      // Store prop path for easier debugging
      contentInfo.binding.propPath = `props.${prop.name}`;
    }
  }

  const rawState = element.properties?.state || {};
  const attributes = { ...(element.properties?.attributes || {}) };
  const events = element.properties?.events || {};

  // Handle special case for img src
  if (tag === 'img' && element.properties?.content?.src) {
    attributes.src = element.properties.content.src;
    content = ''; // Images shouldn't have text content
  }

  // Handle style bindings
  const boundStyles = {};
  if (style.binding && allProps) {
    for (const [styleProp, bindingInfo] of Object.entries(style.binding)) {
      const prop = allProps[bindingInfo.id];
      if (prop) {
        boundStyles[styleProp] = `props.${prop.name}`;
        // Store prop path for easier debugging
        bindingInfo.propPath = `props.${prop.name}`;
        delete style[styleProp];
      }
    }
  }

  // Normalize static style values
  const normalizedStyle = {};
  Object.entries(style).forEach(([key, value]) => {
    if (key === 'binding') {return;}
    const needsUnit = ['width', 'height', 'padding', 'margin', 'gap', 'fontSize'].some(prop =>
      key.toLowerCase().includes(prop.toLowerCase()),
    );
    normalizedStyle[key] = typeof value === 'number' && needsUnit ? `${value}px` : value;
  });

  const staticStyleStr = Object.keys(normalizedStyle).length > 0
    ? JSON.stringify(normalizedStyle, null, 2)
      .replace(/"/g, "'")
      .replace(/'([^']+)':/g, '$1:')
      .slice(1, -1)
      .trim()
    : '';

  const boundStyleStr = Object.entries(boundStyles)
    .map(([key, value]) => `${key}: ${value}`) // Removed extra quotes
    .join(', ');

  const styleObjectContent = [staticStyleStr, boundStyleStr].filter(Boolean).join(', ');

  const styleAttr = styleObjectContent
    ? `style={{ ${styleObjectContent} }}`
    : '';

  const attrStr = Object.entries(attributes)
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');

  const eventStr = Object.entries(events)
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');

  const stateAttrs = Object.entries(rawState)
    .map(([k, v]) => `data-state-${k}="${v}"`)
    .join(' ');

  const propString = [
    dataId,
    dataKind,
    dataInstanceRef,
    dataName,
    dataOwnershipType,
    dataComponentId,
    attrStr,
    eventStr,
    stateAttrs,
    styleAttr,
  ]
    .filter(Boolean)
    .join(' ');

  // If this is an instance, render the instance's name inside
  let instanceContent = '';
  if (kind === ENTITY_KINDS.INSTANCE && element.instanceRef && Array.isArray(instances)) {
    const foundInstance = instances.find(inst => inst.id === element.instanceRef);
    if (foundInstance && foundInstance.name) {
      instanceContent = foundInstance.name;
    }
  }

  const children = element.children || [];
  const renderedChildren = children
    .map((child) => structureToJsx(child, { allProps, instances }, indent + 2))
    .join('\n');

  let displayContent = content;
  if (kind === ENTITY_KINDS.INSTANCE) {
    displayContent = content || instanceContent;
  }

  const isBoundContent = displayContent.startsWith('{') && displayContent.endsWith('}');

  // Comment for prop bindings - now as a first child element rather than outside the element
  const propBindingComment = hasPropBindings ? `\n${childIndent}{/* Has prop bindings */}` : '';

  if (selfClosingTags.includes(tag)) {
    // Self-closing tags can't have comments inside, so we'll skip the comment for these
    return `${indentStr}<${tag} ${propString} />`;
  }

  if (children.length > 0) {
    // For elements with children, add comment as the first item inside the element
    return `${indentStr}<${tag} ${propString}>${propBindingComment}\n${childIndent}${displayContent}\n${renderedChildren}\n${indentStr}</${tag}>`;
  } else {
    // For elements without children, add comment before the content if there is any
    const contentWithComment = displayContent
      ? `${propBindingComment ? propBindingComment + '\n' + childIndent : ''}${isBoundContent ? displayContent : displayContent}`
      : propBindingComment;
    return `${indentStr}<${tag} ${propString}>${contentWithComment}</${tag}>`;
  }
}

// --- JSX Converter (JSX -> structure) ---
export function jsxToStructure(code, options = {}) {
  const { allProps = {}, allPropValues = {} } = options;

  // Handle props whether they're an array or object
  const propsByName = {};
  const propsById = {};

  // If allProps is an array, convert to objects keyed by name and id
  if (Array.isArray(allProps)) {
    allProps.forEach(prop => {
      if (prop && prop.name) {
        propsByName[prop.name] = prop;
        propsById[prop.id] = prop;
      }
    });
  } else {
    // Handle case where allProps is already an object keyed by ID
    Object.values(allProps).forEach(prop => {
      if (prop && prop.name) {
        propsByName[prop.name] = prop;
        propsById[prop.id] = prop;
      }
    });
  }

  const toCamelCase = (str) =>
    str.replace(/-([a-z])/g, (match, char) => char.toUpperCase());

  const ast = parse(code, { sourceType: 'module', plugins: ['jsx', 'typescript'] });

  // Function to extract prop path from member expression
  function extractPropPath(node) {
    if (!node) {return null;}

    if (node.type === 'MemberExpression') {
      const objectPath = extractPropPath(node.object);
      const property = node.property.name || node.property.value;

      if (objectPath === 'props') {
        return `props.${property}`;
      } else if (objectPath) {
        return `${objectPath}.${property}`;
      }
    } else if (node.type === 'Identifier' && node.name === 'props') {
      return 'props';
    }

    return null;
  }

  function processJSXElement(node) {
    if (!node || node.type !== 'JSXElement') {return null;}

    const tag = node.openingElement.name.name;
    const props = {
      style: {},
      attributes: {},
      events: {},
      state: {
        isVisible: true,
        isDisabled: false,
        isLoading: false,
      },
      content: {},
    };

    let id = '';
    let kind = ENTITY_KINDS.ELEMENT;
    let instanceRef = null;
    let name = '';
    let ownershipType = ENTITY_KINDS.COMPONENT;
    let componentId = '';

    node.openingElement.attributes.forEach(attr => {
      if (attr.type === 'JSXAttribute') {
        const attrName = attr.name.name;

        if (attrName === 'data-id') {id = attr.value.value;}
        else if (attrName === 'data-kind') {kind = attr.value.value;}
        else if (attrName === 'data-instance-ref') {instanceRef = attr.value.value;}
        else if (attrName === 'data-name') {name = attr.value.value;}
        else if (attrName === 'data-ownership-type') {ownershipType = attr.value.value;}
        else if (attrName === 'data-component-id') {componentId = attr.value.value;}
        else if (attrName.startsWith('data-state-')) {
          const rawKey = attrName.replace('data-state-', '');
          const stateKey = toCamelCase(rawKey);
          props.state[stateKey] =
            attr.value.value === 'true' ? true :
              attr.value.value === 'false' ? false :
                attr.value.value;
        } else if (attrName === 'style' && attr.value?.expression?.properties) {
          // Don't initialize binding object yet - we'll only create it if we find actual bindings
          let hasBindings = false;
          const styleBindings = {};

          attr.value.expression.properties.forEach(p => {
            const styleKey = p.key.name || p.key.value;

            console.log('🔍 Parsing style property:', {
              styleKey,
              valueType: p.value.type,
              value: p.value,
              isStringLiteral: p.value.type === 'StringLiteral',
              isNumericLiteral: p.value.type === 'NumericLiteral',
              isMemberExpression: p.value.type === 'MemberExpression',
            });

            if (p.value.type === 'StringLiteral' || p.value.type === 'NumericLiteral') {
              props.style[styleKey] = p.value.value;

              // Check if this style property was previously a prop binding
              // For custom props (like backgroundColor: props.as), we need to check the current Redux state
              // to see if there was a binding for this property, regardless of the prop name
              console.log(`Found literal value: ${styleKey} = ${p.value.value}`);
              console.log(`This literal value will override any existing binding for ${styleKey} (including custom props)`);

              // Note: The binding removal will be handled by syncLiteralValuesToControlPanel
              // which compares the current Redux state with the new structure and removes
              // any bindings for properties that now have literal values
            } else if (p.value.type === 'MemberExpression') {
              // Extract the full prop path
              const propPath = extractPropPath(p.value);

              console.log('🔍 Processing MemberExpression:', {
                styleKey,
                propPath,
                startsWithProps: propPath && propPath.startsWith('props.'),
              });

              if (propPath && propPath.startsWith('props.')) {
                const propName = propPath.split('.')[1]; // Get the first property after 'props'
                const foundProp = propsByName[propName];

                console.log('🔍 Looking for prop:', {
                  propName,
                  foundProp,
                  availableProps: Object.keys(propsByName),
                });

                if (foundProp) {
                  // Get the current prop value (use default prop value if available, otherwise use defaultValue)
                  let currentPropValue = foundProp.defaultValue;
                  if (foundProp.values && foundProp.values.length > 0) {
                    const defaultPropValue = foundProp.values.find(v => v.isDefault);
                    if (defaultPropValue) {
                      currentPropValue = defaultPropValue.value;
                    } else {
                      // If no default is set, use the first available value
                      currentPropValue = foundProp.values[0].value;
                    }
                  }

                  styleBindings[styleKey] = {
                    type: 'prop',
                    id: foundProp.id,
                    propPath: propPath,
                    propName: propName,
                  };
                  // Don't set the literal value when creating a binding
                  // props.style[styleKey] = currentPropValue;
                  hasBindings = true;

                  // Debug info
                  console.log(`✅ Found style binding: ${styleKey} -> ${propPath} (ID: ${foundProp.id}, value: ${currentPropValue})`);
                } else {
                  console.log(`❌ Prop not found: ${propName}`);
                }
              } else {
                console.log(`❌ Not a props expression: ${propPath}`);
              }
            } else {
              console.log(`❌ Unhandled value type: ${p.value.type} for ${styleKey}`);
            }
          });

          // Only add binding object if we actually found bindings
          if (hasBindings) {
            props.style.binding = styleBindings;
            console.log('🔧 Created style bindings:', styleBindings);
          }

          console.log('🔧 Final style object:', props.style);
        } else if (attrName.startsWith('on')) {
          props.events[attrName] = attr.value?.value || '';
        } else {
          props.attributes[attrName] = attr.value?.value || '';
        }
      }
    });

    // Filter out our prop binding comments from children nodes
    const filteredChildren = node.children.filter(child => {
      // Skip prop binding comments
      if (child.type === 'JSXExpressionContainer' &&
          child.expression.type === 'JSXEmptyExpression' &&
          child.expression.innerComments &&
          child.expression.innerComments.some(comment => comment.value.includes('Has prop bindings'))) {
        return false;
      }
      return true;
    });

    if (filteredChildren.length > 0) {
      // Now process the first content child (text or expression)
      const contentChild = filteredChildren.find(
        child => child.type === 'JSXText' ||
        (child.type === 'JSXExpressionContainer' &&
         child.expression.type !== 'JSXEmptyExpression'),
      );

      if (contentChild) {
        if (contentChild.type === 'JSXText') {
          const textContent = contentChild.value.trim();
          if (textContent) {
            props.content.text = textContent;
            console.log(`Found literal text content: "${textContent}"`);
          }
        } else if (contentChild.type === 'JSXExpressionContainer') {
          if (contentChild.expression.type === 'MemberExpression') {
            // Extract the full prop path
            const propPath = extractPropPath(contentChild.expression);

            if (propPath && propPath.startsWith('props.')) {
              const propName = propPath.split('.')[1]; // Get the first property after 'props'
              const foundProp = propsByName[propName];
              if (foundProp) {
                props.content.binding = {
                  type: 'prop',
                  id: foundProp.id,
                  propPath: propPath,
                  propName: propName,
                };
                props.content.text = foundProp.defaultValue || '';

                // Debug info
                console.log(`Found content binding: ${propPath} (ID: ${foundProp.id})`);
              }
            }
          } else if (contentChild.expression.type === 'StringLiteral') {
            // Handle literal string content
            props.content.text = contentChild.expression.value;
            console.log(`Found literal string content: "${contentChild.expression.value}"`);
          } else {
            // Handle other expression types
            const codeFragment = code.substring(contentChild.start, contentChild.end);
            console.log('Found expression container:', codeFragment);
            // Store the raw expression for future use
            props.content.expression = codeFragment;
          }
        }
      }
    }

    // Process JSX elements in children (skipping comments and text nodes for children array)
    const children = filteredChildren
      .filter(c => c.type === 'JSXElement')
      .map(processJSXElement)
      .filter(Boolean);

    const element = {
      id,
      name,
      kind,
      tag,
      ownership: {
        type: ownershipType,
        componentId: componentId,
      },
      properties: props,
    };

    if (kind === ENTITY_KINDS.INSTANCE && instanceRef) {
      element.instanceRef = instanceRef;
      if (props.content && props.content.text) {
        store.dispatch(updateInstance({
          id: instanceRef,
          name: props.content.text,
        }));
      }
    }

    if (children.length > 0) {
      element.children = children;
    }

    return element;
  }

  let root = null;
  traverse(ast, {
    ReturnStatement(path) {
      const jsxEl = path.node.argument;
      if (jsxEl && jsxEl.type === 'JSXElement') {
        root = processJSXElement(jsxEl);
      }
    },
  });

  return root ? [root] : [];
}
