export const baseCode = (openFile) => {

  return {
    'package.json': JSON.stringify({
      'name': 'react-cra-stackblitz-preview',
      'version': '0.1.0',
      'private': true,
      'dependencies': {
        '@testing-library/jest-dom': '^5.16.4',
        '@testing-library/react': '^13.3.0',
        '@testing-library/user-event': '^13.5.0',
        'react': '^18.2.0',
        'react-dom': '^18.2.0',
        'react-router-dom': '^6.3.0',
        'react-scripts': '5.0.1',
        'web-vitals': '^2.1.4',
      },
      'scripts': {
        'start': 'react-scripts start',
        'build': 'react-scripts build',
        'test': 'react-scripts test',
        'eject': 'react-scripts eject',
      },
      'eslintConfig': {
        'extends': [
          'react-app',
          'react-app/jest',
        ],
      },
      'browserslist': {
        'production': [
          '>0.2%',
          'not dead',
          'not op_mini all',
        ],
        'development': [
          'last 1 chrome version',
          'last 1 firefox version',
          'last 1 safari version',
        ],
      },
    }, null, 2),

    'src/index.js': `import React from 'react';
import { createRoot } from 'react-dom/client';
import { ${openFile} } from '../${openFile}';

const container = document.getElementById('root');
if (container) {
const root = createRoot(container);
root.render(
<React.StrictMode>
<${openFile} />
</React.StrictMode>
);
} else {
console.error('Root element (#root) not found');
}
    `,

    'public/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>CRA Preview</title>
</head>
<body>
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
</body>
</html>
`,

  };
};
