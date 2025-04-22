# Frontend (React)

This is the React frontend for the Inventory App, built with Vite, Tailwind CSS, and React Router.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in this folder (or copy from `.env.example`) and set your API URL if needed:
   ```
   VITE_API_URL=http://localhost:8080/api/items
   ```
   If not set, the app defaults to `http://localhost:8080/api/items`.

3. Start the development server:
   ```
   npm run dev
   ```
   Open the app in your browser (usually at http://localhost:5173).

## Structure
- `src/components/` - Reusable UI components
- `src/pages/` - Top-level pages/views
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utilities and API logic
- `src/styles/` - Tailwind and custom CSS

## API
Configure the backend API URL in `.env` or `src/lib/api.ts`.

## Features
- Inventory listing and add form
- Responsive design with Tailwind CSS
- Easy to extend for more features (edit, delete, authentication, etc.)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
