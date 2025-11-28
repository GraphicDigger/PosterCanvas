// Utility to load CSS files dynamically using Vite's ?raw imports
export const loadCSSFiles = async () => {
  // Use dynamic import with ?raw to get the raw CSS string
  const [indexCSS, resetCSS, typographyCSS] = await Promise.all([
    import('/src/shared/styles/index.css?raw'),
    // import('/src/shared/styles/reset.css?raw'),
    // import('/src/shared/styles/typography.css?raw'),
  ]);

  return {
    'src/styles/index.css': indexCSS.default,
    // 'src/styles/reset.css': resetCSS.default,
    // 'src/styles/typography.css': typographyCSS.default,
  };
};

const getFallbackIndexCSS = () => `
// @import './reset.css';
// @import './typography.css';

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400,500;600;700&display=swap');

body {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
  line-height: 1.3;
  font-weight: 500;
  color: #303133;
  position: relative;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

h1, h2, h3, h4, h5, h6 {
  font-size: inherit;
  font-weight: inherit;
}

.light {
    background-color: white;
}

.dark {
    background-color: #1E1E1F;
}`;

const getFallbackResetCSS = () => `
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}

ul, ol, ul[role="list"], ol[role="list"] {
  list-style: none;
}

a, input, button {
  text-decoration: none;
  outline: none;
  color: inherit;
}

button {
  border: none;
  background: none;
  font: inherit;
  cursor: pointer;
}

input, textarea, select {
  font: inherit;
  border: none;
  background-color: transparent;
}

select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

main {
  flex-grow: 1;
}

footer {
  flex-shrink: 0;
}

body, h1, h2, h3, h4, p, figure, blockquote, dl, dd {
  margin: 0;
}

.btn {
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  background: none;
}

table {
  border-spacing: 0;
}`;

const getFallbackTypographyCSS = () => `
:root {
    --font-size-10: 10px;
    --font-size-12: 12px;
    --font-size-13: 13px;
    --font-size-14: 14px;
    --font-size-24: 24px;

    --font-weight-md: 500;
    --font-weight-sb: 600;
    --font-weight-bd: 700;

    --line-height-0: 100%;
    --line-height-1: 110%;
    --line-height-2: 120%;
    --line-height-3: 130%;
    --line-height-4: 140%;
    --line-height-5: 150%;
    --line-height-fix-14: 14px;
}

.body-10-md {
    font-size: var(--font-size-10);
    font-weight: var(--font-weight-md);
}

.body-10-sb {
    font-size: var(--font-size-10);
    font-weight: var(--font-weight-sb);
}

.body-12-md {
    font-size: var(--font-size-12);
    font-weight: var(--font-weight-md);
    line-height: var(--line-height-3);
}

.body-12-sb {
    font-size: var(--font-size-12);
    font-weight: var(--font-weight-sb);
    line-height: var(--line-height-3);
}

.body-12-bd {
    font-size: var(--font-size-12);
    font-weight: var(--font-weight-bd);
    line-height: var(--line-height-3);
}

.body-13-md {
    font-size: var(--font-size-13);
    font-weight: var(--font-weight-md);
}

.body-13-sb {
    font-size: var(--font-size-13);
    font-weight: var(--font-weight-sb);
}

.body-13-bd {
    font-size: var(--font-size-13);
    font-weight: var(--font-weight-bd);
}

.body-14-md {
    font-size: var(--font-size-14);
    font-weight: var(--font-weight-md);
}

.body-14-sb {
    font-size: var(--font-size-14);
    font-weight: var(--font-weight-sb);
}

.body-14-bd {
    font-size: var(--font-size-14);
    font-weight: var(--font-weight-bd);
}

.heading-24-bd {
    font-size: 24px;
    font-weight: var(--font-weight-bd);
}

.lh-0 { line-height: var(--line-height-0); }
.lh-1 { line-height: var(--line-height-1); }
.lh-2 { line-height: var(--line-height-2); }
.lh-3 { line-height: var(--line-height-3); }
.lh-4 { line-height: var(--line-height-4); }
.lh-5 { line-height: var(--line-height-5); }
.lh-fix-14 { line-height: var(--line-height-fix-14); }

.fw-md { font-weight: var(--font-weight-md); }
.fw-sb { font-weight: var(--font-weight-sb); }
.fw-bd { font-weight: var(--font-weight-bd); }

.fs-10 { font-size: var(--font-size-10); }
.fs-12 { font-size: var(--font-size-12); }
.fs-14 { font-size: var(--font-size-14); }`;
