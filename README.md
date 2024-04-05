# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

### Getting Started

To install project dependencies, use npm:

```bash
npm i

To Start the development server:
npm start

Two official plugins are currently available:

@vitejs/plugin-react which uses Babel for Fast Refresh.
@vitejs/plugin-react-swc which uses SWC for Fast Refresh.
Expanding the ESLint Configuration
If you're developing a production application, we recommend updating the configuration to enable type-aware lint rules:


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

Configure the top-level parserOptions property as follows:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

Replace plugin:@typescript-eslint/recommended with plugin:@typescript-eslint/recommended-type-checked or plugin:@typescript-eslint/strict-type-checked.

Optionally, add plugin:@typescript-eslint/stylistic-type-checked.

Install eslint-plugin-react and add plugin:react/recommended & plugin:react/jsx-runtime to the extends list.

Additional Resources
For more detailed information and advanced usage, refer to the official documentation of Vite, React, and TypeScript.